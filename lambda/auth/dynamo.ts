import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DeleteCommand,
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  ScanCommand,
  TransactWriteCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
import type { Bet } from "../../src/lib/bets/types";
import type { AuthStore, Session, User } from "./core";

/** A stored bet item back to a Bet (drops the key). */
function toBet(item: Record<string, unknown>): Bet {
  const bet = { ...item };
  delete bet.pk;
  return bet as unknown as Bet;
}

// One table, string key `pk`:
//   USER#<email>      the account
//   MANAGER#<name>    claims a manager so two accounts can't share one
//   SESSION#<hash>    a login session; `ttl` lets DynamoDB expire it
//   BET#<id>          a side bet (a handful per week, so listing is a small scan)
export function createDynamoStore(table: string, client = DynamoDBDocumentClient.from(new DynamoDBClient({}))): AuthStore {
  return {
    async createUser(user) {
      try {
        await client.send(
          new TransactWriteCommand({
            TransactItems: [
              {
                Put: {
                  TableName: table,
                  Item: { pk: `USER#${user.email}`, ...user },
                  ConditionExpression: "attribute_not_exists(pk)",
                },
              },
              {
                Put: {
                  TableName: table,
                  Item: { pk: `MANAGER#${user.manager}`, email: user.email },
                  ConditionExpression: "attribute_not_exists(pk)",
                },
              },
            ],
          })
        );
        return "ok";
      } catch (err) {
        const reasons = (err as { CancellationReasons?: { Code?: string }[] }).CancellationReasons;
        if (reasons?.[0]?.Code === "ConditionalCheckFailed") return "email-taken";
        if (reasons?.[1]?.Code === "ConditionalCheckFailed") return "manager-taken";
        throw err;
      }
    },

    async getUser(email) {
      const { Item } = await client.send(new GetCommand({ TableName: table, Key: { pk: `USER#${email}` } }));
      return Item ? ({ email: Item.email, manager: Item.manager, passwordHash: Item.passwordHash } as User) : null;
    },

    async putSession(tokenHash, session) {
      await client.send(
        new PutCommand({
          TableName: table,
          Item: { pk: `SESSION#${tokenHash}`, ...session, ttl: session.expiresAt },
        })
      );
    },

    async getSession(tokenHash) {
      const { Item } = await client.send(new GetCommand({ TableName: table, Key: { pk: `SESSION#${tokenHash}` } }));
      return Item ? ({ email: Item.email, manager: Item.manager, expiresAt: Item.expiresAt } as Session) : null;
    },

    async deleteSession(tokenHash) {
      await client.send(new DeleteCommand({ TableName: table, Key: { pk: `SESSION#${tokenHash}` } }));
    },

    async listBets() {
      const bets: Bet[] = [];
      let key: Record<string, unknown> | undefined;
      do {
        const page = await client.send(
          new ScanCommand({
            TableName: table,
            FilterExpression: "begins_with(pk, :p)",
            ExpressionAttributeValues: { ":p": "BET#" },
            ExclusiveStartKey: key,
          })
        );
        for (const item of page.Items ?? []) bets.push(toBet(item));
        key = page.LastEvaluatedKey;
      } while (key);
      return bets;
    },

    async getBet(id) {
      const { Item } = await client.send(new GetCommand({ TableName: table, Key: { pk: `BET#${id}` } }));
      return Item ? toBet(Item) : null;
    },

    async createBet(bet) {
      await client.send(new PutCommand({ TableName: table, Item: { pk: `BET#${bet.id}`, ...bet } }));
    },

    async updateBet(id, from, patch, expectAmount) {
      const keys = Object.keys(patch);
      try {
        await client.send(
          new UpdateCommand({
            TableName: table,
            Key: { pk: `BET#${id}` },
            UpdateExpression: `SET ${keys.map((k, i) => `#k${i} = :v${i}`).join(", ")}`,
            ConditionExpression: expectAmount === undefined ? "#status = :from" : "#status = :from AND #amount = :expected",
            ExpressionAttributeNames: {
              "#status": "status",
              ...(expectAmount === undefined ? {} : { "#amount": "amount" }),
              ...Object.fromEntries(keys.map((k, i) => [`#k${i}`, k])),
            },
            ExpressionAttributeValues: {
              ":from": from,
              ...(expectAmount === undefined ? {} : { ":expected": expectAmount }),
              ...Object.fromEntries(keys.map((k, i) => [`:v${i}`, (patch as Record<string, unknown>)[k]])),
            },
          })
        );
        return true;
      } catch (err) {
        if ((err as { name?: string }).name === "ConditionalCheckFailedException") return false;
        throw err;
      }
    },
  };
}
