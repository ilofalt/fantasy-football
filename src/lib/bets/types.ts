// Side bets on a single matchup, paid in FAAB. A bet is one-on-one: the bettor
// picks a winner and puts up an amount, and one other manager matches it by
// taking the other team. The league commissioner settles it afterward and
// moves the FAAB in Yahoo by hand.

export const COMMISSIONER_TITLE = "Great and Powerful League Commissioner";
export const MAX_BET = 1000;

export type BetStatus = "open" | "matched" | "settled" | "cancelled";

export interface Bet {
  id: string;
  week: number;
  matchupId: string;
  /** The two managers in the matchup. */
  teams: [string, string];
  /** The team the bettor says will win. */
  pick: string;
  amount: number;
  bettor: string;
  /** The manager who matched the bet, taking the team that wasn't picked. */
  taker: string | null;
  status: BetStatus;
  /** The manager who won the bet, once settled. */
  winner: string | null;
  /** Epoch milliseconds. */
  createdAt: number;
}

/** The team the matcher is backing: whichever one the bettor didn't pick. */
export const opposingTeam = (bet: Pick<Bet, "teams" | "pick">) =>
  bet.teams[0] === bet.pick ? bet.teams[1] : bet.teams[0];

/** FAAB a manager has riding on bets that haven't been settled yet. */
export function faabOnTheLine(bets: Bet[], manager: string): number {
  return bets
    .filter((b) => (b.status === "open" && b.bettor === manager) || (b.status === "matched" && (b.bettor === manager || b.taker === manager)))
    .reduce((sum, b) => sum + b.amount, 0);
}

/** Net FAAB a manager has won (positive) or lost (negative) on settled bets. */
export function settledNet(bets: Bet[], manager: string): number {
  return bets
    .filter((b) => b.status === "settled" && (b.bettor === manager || b.taker === manager))
    .reduce((sum, b) => sum + (b.winner === manager ? b.amount : -b.amount), 0);
}
