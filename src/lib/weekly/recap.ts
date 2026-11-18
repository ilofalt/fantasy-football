import type { WeekData, WeeklyPlayer } from "./types";
import { isStarter, managerLines } from "./report";

// One manager's numbers for a finished week, for the personalized recap pop-up.

export interface ManagerRecap {
  week: number;
  manager: string;
  opponent: string;
  points: number;
  opponentPoints: number;
  projected: number;
  won: boolean;
  tied: boolean;
  /** Where their score ranked among all teams that week, 1 = highest. */
  scoreRank: number;
  teamCount: number;
  /** Their highest-scoring starter. */
  topPlayer: WeeklyPlayer | null;
  /** Points the perfect lineup would have added. */
  leftOnBench: number;
  /** Bench players who belonged in the perfect lineup. */
  shouldHaveStarted: WeeklyPlayer[];
}

export function managerRecap(week: WeekData, manager: string): ManagerRecap | null {
  const pair = week.matchups.find((m) => m.includes(manager));
  const team = week.teams.find((t) => t.manager === manager);
  if (!pair || !team) return null;
  const opponent = pair[0] === manager ? pair[1] : pair[0];
  const opp = week.teams.find((t) => t.manager === opponent);
  if (!opp) return null;

  const line = managerLines(week).find((l) => l.manager === manager)!;
  const starters = team.players.filter(isStarter);
  const topPlayer = starters.reduce<WeeklyPlayer | null>((top, p) => (!top || p.points > top.points ? p : top), null);

  return {
    week: week.week,
    manager,
    opponent,
    points: team.points,
    opponentPoints: opp.points,
    projected: team.projected,
    won: team.points > opp.points,
    tied: team.points === opp.points,
    scoreRank: 1 + week.teams.filter((t) => t.points > team.points).length,
    teamCount: week.teams.length,
    topPlayer,
    leftOnBench: line.leftOnBench,
    shouldHaveStarted: line.shouldHaveStarted,
  };
}

/** 1 → "1st", 2 → "2nd", 11 → "11th". */
export function ordinal(n: number): string {
  const s = n % 100 >= 11 && n % 100 <= 13 ? "th" : ({ 1: "st", 2: "nd", 3: "rd" } as Record<number, string>)[n % 10] ?? "th";
  return `${n}${s}`;
}
