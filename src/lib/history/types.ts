// League history since 2022 (src/content/history/history.json). Every team is
// identified by the manager's real name.

export type GameType = "regular" | "playoff" | "consolation";

export interface HistoryGame {
  year: number;
  week: number;
  a: string;
  aScore: number;
  b: string;
  bScore: number;
  /** "playoff" is the championship bracket; "consolation" is the Toilet Bowl side. */
  type: GameType;
}

export interface HistorySeason {
  year: number;
  /** Final standings, champion first. null for a season in progress. */
  finish: string[] | null;
}

export interface History {
  updated: string;
  seasons: HistorySeason[];
  games: HistoryGame[];
}
