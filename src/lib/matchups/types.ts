// A week's matchups with full rosters (src/content/matchups/week-N.json),
// used for the clickable matchup detail view.

export interface RosterPlayer {
  /** Lineup slot: QB, RB, WR, TE, W/R/T, K, DEF, BN, or IR. */
  slot: string;
  name: string;
  position: string;
  nflTeam: string;
  /** Yahoo's projection. Kept in the data but never displayed. */
  projected: number;
  /** Actual fantasy points scored, once the game has been played. */
  points?: number;
  /** Kickoff or status, e.g. "Sun 2:25 pm vs LAR" or "Bye". */
  game: string;
  imageUrl: string | null;
}

// Teams are always identified by the manager's real name, never the Yahoo team name.
export interface RosterTeam {
  manager: string;
  record: string;
  rank: number;
  logoUrl: string | null;
  /** Yahoo's projected total for the starting lineup. Kept in the data but never displayed. */
  projected: number;
  /** Actual points scored by the starting lineup, once games have been played. */
  points?: number;
  players: RosterPlayer[];
}

export interface RosterMatchup {
  /** Stable id for deep links, e.g. "isaiah-vs-jonathan". */
  id: string;
  teams: [RosterTeam, RosterTeam];
}

export interface WeekMatchups {
  week: number;
  updated: string;
  note?: string;
  matchups: RosterMatchup[];
}

export const STARTING_SLOTS = ["QB", "RB", "RB", "WR", "WR", "TE", "W/R/T", "K", "DEF"] as const;

/**
 * Pair up both teams' starters slot by slot (QB vs QB, RB1 vs RB1, ...), then
 * their bench and IR players. An empty slot is null.
 */
export function lineupRows(a: RosterTeam, b: RosterTeam) {
  const take = (team: RosterTeam) => {
    const pool = [...team.players];
    const starters = STARTING_SLOTS.map((slot) => {
      const i = pool.findIndex((p) => p.slot === slot);
      return i === -1 ? null : pool.splice(i, 1)[0];
    });
    return { starters, bench: pool.filter((p) => p.slot === "BN" || p.slot === "IR") };
  };
  const left = take(a);
  const right = take(b);
  const starters = STARTING_SLOTS.map((slot, i) => ({ slot, left: left.starters[i], right: right.starters[i] }));
  const benchLength = Math.max(left.bench.length, right.bench.length);
  const bench = Array.from({ length: benchLength }, (_, i) => ({
    left: left.bench[i] ?? null,
    right: right.bench[i] ?? null,
  }));
  return { starters, bench };
}
