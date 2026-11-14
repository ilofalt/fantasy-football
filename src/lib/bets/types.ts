// Side bets on a single matchup, paid in FAAB. A bet is one-on-one: the bettor
// picks a winner and puts up an amount, and one other manager accepts it by
// taking the other team. Instead of accepting, that manager can counter with a
// different amount; from then on the bet is locked between the two of them,
// trading offers until one accepts. The league commissioner settles it
// afterward and moves the FAAB in Yahoo by hand.

export const COMMISSIONER_TITLE = "Great and Powerful League Commissioner";
export const MAX_BET = 1000;

/**
 * open: waiting for someone to accept or counter.
 * countered: locked between the bettor and `taker`, who are trading offers.
 */
export type BetStatus = "open" | "countered" | "matched" | "settled" | "cancelled";

export interface Bet {
  id: string;
  week: number;
  matchupId: string;
  /** The two managers in the matchup. */
  teams: [string, string];
  /** The team the bettor says will win. */
  pick: string;
  /** The amount currently on the table. */
  amount: number;
  bettor: string;
  /** The second manager: whoever accepted, or first countered. Takes the team that wasn't picked. */
  taker: string | null;
  status: BetStatus;
  /** Who proposed the current amount. The other party is the one who can answer it. */
  offeredBy: string;
  /** The manager who won the bet, once settled. */
  winner: string | null;
  /** Epoch milliseconds. */
  createdAt: number;
}

/** The team the taker is backing: whichever one the bettor didn't pick. */
export const opposingTeam = (bet: Pick<Bet, "teams" | "pick">) =>
  bet.teams[0] === bet.pick ? bet.teams[1] : bet.teams[0];

/** In a countered bet, the manager whose turn it is to accept, counter, or walk away. */
export const responderOf = (bet: Pick<Bet, "bettor" | "taker" | "offeredBy">) =>
  bet.offeredBy === bet.bettor ? bet.taker : bet.bettor;

/**
 * FAAB a manager has committed to a bet. An open bet counts for the bettor; a
 * countered one only for whoever made the offer on the table (the other side
 * hasn't agreed to anything yet); a matched one counts for both.
 */
export function exposure(bet: Bet, manager: string): number {
  if (bet.status === "open") return bet.bettor === manager ? bet.amount : 0;
  if (bet.status === "countered") return bet.offeredBy === manager ? bet.amount : 0;
  if (bet.status === "matched") return bet.bettor === manager || bet.taker === manager ? bet.amount : 0;
  return 0;
}

/** FAAB a manager has riding on bets that haven't been settled yet. */
export function faabOnTheLine(bets: Bet[], manager: string): number {
  return bets.reduce((sum, b) => sum + exposure(b, manager), 0);
}

/** Net FAAB a manager has won (positive) or lost (negative) on settled bets. */
export function settledNet(bets: Bet[], manager: string): number {
  return bets
    .filter((b) => b.status === "settled" && (b.bettor === manager || b.taker === manager))
    .reduce((sum, b) => sum + (b.winner === manager ? b.amount : -b.amount), 0);
}
