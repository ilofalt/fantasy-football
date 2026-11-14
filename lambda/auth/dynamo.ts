import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  DeleteCommand,
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  TransactWriteCommand,
} from "@aws-sdk/lib-dynamodb";
import type { AuthStore, Session, User } from "./core";

// One table, string key `pk`:
//   USER#<email>      the account
//   MANAGER#<name>    claims a manager so two accounts can't share one
//   SESSION#<hash>    a login session; `ttl` lets DynamoDB expire it
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
  };
}
