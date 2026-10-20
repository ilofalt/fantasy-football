// League playoff format:
// - Top 6 make the playoffs. Seeds 1 and 2 get a first-round bye; 3 plays 6
//   and 4 plays 5. The bracket reseeds after round 1, so the top remaining
//   seed plays the lowest remaining seed.
// - Seeds 7-12 play the Toilet Bowl. 7 plays 10 and 8 plays 9; 11 and 12 get
//   a first-round bye.
// Regular-season ties are broken by total points for (Yahoo's rule).

export interface StandingRow {
  manager: string;
  wins: number;
  losses: number;
  ties: number;
  pointsFor: number;
  pointsAgainst: number;
  /** e.g. "W2" or "L1" */
  streak: string;
}

export interface SeededTeam extends StandingRow {
  seed: number;
}

export interface BracketMatchup {
  higher: SeededTeam;
  lower: SeededTeam;
}

export interface Bracket {
  byes: SeededTeam[];
  firstRound: BracketMatchup[];
}

export const PLAYOFF_TEAMS = 6;

export function winPct(row: StandingRow): number {
  const games = row.wins + row.losses + row.ties;
  return games === 0 ? 0 : (row.wins + row.ties / 2) / games;
}

/** Sort by win percentage, then points for, and number the seeds from 1. */
export function seedTeams(rows: StandingRow[]): SeededTeam[] {
  return [...rows]
    .sort((a, b) => winPct(b) - winPct(a) || b.pointsFor - a.pointsFor)
    .map((row, i) => ({ ...row, seed: i + 1 }));
}

function bySeed(seeded: SeededTeam[], seed: number): SeededTeam {
  const team = seeded.find((t) => t.seed === seed);
  if (!team) throw new Error(`No team at seed ${seed}`);
  return team;
}

export function winnersBracket(seeded: SeededTeam[]): Bracket {
  const s = (n: number) => bySeed(seeded, n);
  return {
    byes: [s(1), s(2)],
    firstRound: [
      { higher: s(3), lower: s(6) },
      { higher: s(4), lower: s(5) },
    ],
  };
}

export function toiletBowlBracket(seeded: SeededTeam[]): Bracket {
  const s = (n: number) => bySeed(seeded, n);
  return {
    byes: [s(11), s(12)],
    firstRound: [
      { higher: s(7), lower: s(10) },
      { higher: s(8), lower: s(9) },
    ],
  };
}

/**
 * Games behind the last playoff spot (seed 6), as a display string.
 * Teams in the playoffs get null; a team tied with the 6th seed but behind on
 * points for gets "0".
 */
export function gamesBack(team: SeededTeam, seeded: SeededTeam[]): string | null {
  if (team.seed <= PLAYOFF_TEAMS) return null;
  const cutoff = bySeed(seeded, PLAYOFF_TEAMS);
  const gb = (cutoff.wins - team.wins + (team.losses - cutoff.losses)) / 2;
  return String(gb);
}
