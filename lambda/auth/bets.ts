import { randomBytes } from "node:crypto";
import { COMMISSIONER } from "../../src/content/managers";
import { MAX_BET } from "../../src/lib/bets/types";
import { type AuthResult, type AuthStore, MANAGER_NAMES } from "./core";

// Side bets on matchups. Every call needs a logged-in manager; the handler
// passes who they are. The bettor-facing balance check (can't bet more FAAB
// than you have) lives in the page, because balances are a hand-updated file
// the Lambda doesn't see; the commissioner settles everything by hand anyway.

const fail = (status: number, error: string): AuthResult => ({ status, body: { error } });

async function ok(store: AuthStore): Promise<AuthResult> {
  const bets = (await store.listBets()).sort((a, b) => b.createdAt - a.createdAt);
  return { status: 200, body: { bets } };
}

export const listBets = ok;

export async function placeBet(
  store: AuthStore,
  manager: string,
  input: { week?: unknown; matchupId?: unknown; teams?: unknown; pick?: unknown; amount?: unknown }
): Promise<AuthResult> {
  const { week, matchupId, teams, pick, amount } = input;
  if (!Number.isInteger(week) || (week as number) < 1 || (week as number) > 30) return fail(400, "Pick a matchup.");
  if (typeof matchupId !== "string" || !matchupId || matchupId.length > 60) return fail(400, "Pick a matchup.");
  if (
    !Array.isArray(teams) ||
    teams.length !== 2 ||
    teams[0] === teams[1] ||
    !teams.every((t) => typeof t === "string" && MANAGER_NAMES.includes(t))
  ) {
    return fail(400, "Pick a matchup.");
  }
  if (typeof pick !== "string" || !teams.includes(pick)) return fail(400, "Pick who wins.");
  if (!Number.isInteger(amount) || (amount as number) < 1 || (amount as number) > MAX_BET) {
    return fail(400, `Bet a whole number of FAAB, 1 to ${MAX_BET}.`);
  }

  await store.createBet({
    id: randomBytes(6).toString("hex"),
    week: week as number,
    matchupId,
    teams: teams as [string, string],
    pick,
    amount: amount as number,
    bettor: manager,
    taker: null,
    status: "open",
    winner: null,
    createdAt: Date.now(),
  });
  return ok(store);
}

export async function matchBet(store: AuthStore, manager: string, id: string): Promise<AuthResult> {
  const bet = await store.getBet(id);
  if (!bet) return fail(404, "That bet doesn't exist.");
  if (bet.bettor === manager) return fail(400, "You can't match your own bet.");
  if (bet.status !== "open") return fail(409, "That bet was already taken or withdrawn.");
  if (!(await store.updateBet(id, "open", { status: "matched", taker: manager }))) {
    return fail(409, "That bet was already taken or withdrawn.");
  }
  return ok(store);
}

/** The bettor can withdraw an open bet; the commissioner can void any unsettled one. */
export async function cancelBet(store: AuthStore, manager: string, id: string): Promise<AuthResult> {
  const bet = await store.getBet(id);
  if (!bet) return fail(404, "That bet doesn't exist.");
  const isCommissioner = manager === COMMISSIONER;
  if (bet.status === "settled" || bet.status === "cancelled") return fail(409, "That bet is already closed.");
  if (bet.status === "matched" && !isCommissioner) return fail(403, "Only the commissioner can void a matched bet.");
  if (bet.status === "open" && bet.bettor !== manager && !isCommissioner) return fail(403, "That isn't your bet.");
  if (!(await store.updateBet(id, bet.status, { status: "cancelled" }))) {
    return fail(409, "That bet just changed. Refresh and try again.");
  }
  return ok(store);
}

export async function settleBet(store: AuthStore, manager: string, id: string, winnerTeam: unknown): Promise<AuthResult> {
  if (manager !== COMMISSIONER) return fail(403, "Only the commissioner settles bets.");
  const bet = await store.getBet(id);
  if (!bet) return fail(404, "That bet doesn't exist.");
  if (bet.status !== "matched" || !bet.taker) return fail(409, "Only a matched bet can be settled.");
  if (typeof winnerTeam !== "string" || !bet.teams.includes(winnerTeam)) return fail(400, "Pick which team won.");
  const winner = winnerTeam === bet.pick ? bet.bettor : bet.taker;
  if (!(await store.updateBet(id, "matched", { status: "settled", winner }))) {
    return fail(409, "That bet just changed. Refresh and try again.");
  }
  return ok(store);
}
