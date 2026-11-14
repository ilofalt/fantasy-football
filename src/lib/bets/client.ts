import type { Bet } from "./types";

export type BetsResponse = { bets: Bet[]; error?: undefined } | { bets?: undefined; error: string };

const UNAVAILABLE = "The SportsBook isn't available right now.";

async function request(path: string, init?: RequestInit): Promise<BetsResponse> {
  try {
    const res = await fetch(`/api/bets${path}`, {
      credentials: "same-origin",
      ...init,
      headers: init?.body ? { "content-type": "application/json" } : undefined,
    });
    const data = await res.json();
    if (!res.ok) return { error: typeof data?.error === "string" ? data.error : UNAVAILABLE };
    return { bets: data.bets };
  } catch {
    return { error: UNAVAILABLE };
  }
}

const post = (path: string, body: unknown) => request(path, { method: "POST", body: JSON.stringify(body) });

export interface NewBet {
  week: number;
  matchupId: string;
  teams: [string, string];
  pick: string;
  amount: number;
}

export const fetchBets = () => request("");
export const placeBet = (bet: NewBet) => post("", bet);
export const matchBet = (id: string) => post(`/${id}/match`, {});
export const cancelBet = (id: string) => post(`/${id}/cancel`, {});
export const settleBet = (id: string, winner: string) => post(`/${id}/settle`, { winner });
