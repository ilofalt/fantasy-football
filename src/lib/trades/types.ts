// Shapes for the hand-maintained trade tracker (src/content/trades.ts).

export interface TradedPlayer {
  name: string;
  /** e.g. "RB · ATL" */
  position: string;
  /**
   * Fantasy points per week since the trade, in week order. `null` marks a
   * week that hasn't been played yet (e.g. a Monday night game still to come)
   * or a bye, and counts as zero in totals.
   */
  weeklyPointsSinceTrade: (number | null)[];
  /** Short status note, e.g. "Bye in Week 6" or "Plays Monday night". */
  note?: string;
}

export interface TradeSide {
  manager: string;
  received: TradedPlayer[];
}

export interface Trade {
  id: string;
  /** ISO date the trade was processed. */
  date: string;
  /** NFL weeks counted as "since the trade", e.g. [5, 6]. */
  weeksCounted: number[];
  sides: [TradeSide, TradeSide];
  /** Manager currently winning the trade, or null if it's too close to call. */
  verdict: string | null;
  headline: string;
  writeUp: string[];
}
