import type { TradedPlayer, TradeSide } from "./types";

/** Points a player has scored since the trade. Unplayed weeks and byes count as zero. */
export function playerTotal(player: TradedPlayer): number {
  return player.weeklyPointsSinceTrade.reduce<number>((sum, pts) => sum + (pts ?? 0), 0);
}

/** Points everyone a manager received has scored since the trade. */
export function sideTotal(side: TradeSide): number {
  return side.received.reduce((sum, player) => sum + playerTotal(player), 0);
}

/** Round to 2 decimals so floating-point sums display cleanly. */
export function formatPoints(points: number): string {
  return (Math.round(points * 100) / 100).toFixed(2);
}
