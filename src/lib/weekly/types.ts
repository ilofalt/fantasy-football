// Shape of a week's lineup data (src/content/weekly/week-N.json).

export type Position = "QB" | "RB" | "WR" | "TE" | "K" | "DEF";

/** Lineup slot the player was in: a starting slot, "BN" for bench, or "IR". */
export type Slot = "QB" | "RB" | "WR" | "TE" | "W/R/T" | "K" | "DEF" | "BN" | "IR";

export interface WeeklyPlayer {
  name: string;
  position: string;
  nflTeam: string;
  slot: string;
  points: number;
  projected: number;
  statLine: string;
  /** Yahoo headshot (or team logo for a D/ST); null if Yahoo has none. */
  imageUrl?: string | null;
}

export interface WeeklyTeam {
  manager: string;
  /** Final score, as Yahoo has it (includes stat corrections). */
  points: number;
  /** Yahoo's original projected total for the week. */
  projected: number;
  /** The manager's Yahoo team logo. */
  logoUrl?: string | null;
  players: WeeklyPlayer[];
}

export interface WeekData {
  week: number;
  /** ISO date the data was pulled. */
  updated: string;
  /** Each pair of managers who played each other. */
  matchups: [string, string][];
  teams: WeeklyTeam[];
}
