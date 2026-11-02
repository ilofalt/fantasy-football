import type { HistoryGame } from "@/lib/history/types";
import type { TradedPlayer, TradeSide } from "./types";

/** Points a player has scored since the trade. Unplayed weeks and byes count as zero. */
export function playerTotal(player: TradedPlayer): number {
  return player.weeklyPointsSinceTrade.reduce<number>((sum, pts) => sum + (pts ?? 0), 0);
}

/** Points everyone a manager received has scored since the trade. */
export function sideTotal(side: TradeSide): number {
  return side.received.reduce((sum, player) => sum + playerTotal(player), 0);
}

export interface RecordSinceTrade {
  wins: number;
  losses: number;
  ties: number;
  /** Counted weeks with no final result yet (e.g. a week still in progress). */
  pending: number[];
}

/**
 * A manager's regular-season record in the weeks counted since a trade, from
 * the league's final results. Weeks with no final game yet are listed as pending.
 */
export function recordSinceTrade(games: HistoryGame[], manager: string, year: number, weeks: number[]): RecordSinceTrade {
  const record: RecordSinceTrade = { wins: 0, losses: 0, ties: 0, pending: [] };
  for (const week of weeks) {
    const game = games.find(
      (g) => g.year === year && g.week === week && g.type === "regular" && (g.a === manager || g.b === manager)
    );
    if (!game) {
      record.pending.push(week);
      continue;
    }
    const [mine, theirs] = game.a === manager ? [game.aScore, game.bScore] : [game.bScore, game.aScore];
    if (mine > theirs) record.wins += 1;
    else if (mine < theirs) record.losses += 1;
    else record.ties += 1;
  }
  return record;
}

/** "2-1", "1-0-1", or null before any counted week is final. */
export function formatRecord(r: RecordSinceTrade): string | null {
  if (r.wins + r.losses + r.ties === 0) return null;
  return r.ties ? `${r.wins}-${r.losses}-${r.ties}` : `${r.wins}-${r.losses}`;
}

/** Round to 2 decimals so floating-point sums display cleanly. */
export function formatPoints(points: number): string {
  return (Math.round(points * 100) / 100).toFixed(2);
}
