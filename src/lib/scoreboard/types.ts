// The simplified scoreboard shape the Lambda writes to S3 and the page reads.

export type MatchupStatus = "upcoming" | "live" | "final";

export interface ScoreboardTeam {
  key: string;
  name: string;
  manager: string | null;
  logoUrl: string | null;
  points: number;
  projectedPoints: number | null;
  winProbability: number | null;
}

export interface Matchup {
  status: MatchupStatus;
  isPlayoffs: boolean;
  teams: [ScoreboardTeam, ScoreboardTeam];
}

export interface Scoreboard {
  leagueName: string;
  leagueUrl: string | null;
  week: number;
  updatedAt: string;
  matchups: Matchup[];
}
