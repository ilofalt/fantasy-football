import { PLAYOFF_TEAMS, type StandingRow } from "./seed";

// Exact "what has to happen" logic for the playoff race, by wins only.
//
// Points for (the tiebreaker) can't be planned for, so every check is
// conservative about ties: a team has only "clinched" if no set of results can
// even tie enough teams with it, and it's only "eliminated" if it can't even
// tie its way in. Each check asks whether the remaining games can be assigned
// so that enough teams finish above (or below) a line, which is a small
// bipartite matching problem: each game hands one win to one of its two teams.

export type Game = [string, string];
export interface ScheduleWeek {
  week: number;
  games: Game[];
}

export interface Situation {
  /** Wins so far, ties counted as half. */
  wins: Record<string, number>;
  /** Unplayed games, earliest first. */
  games: Game[];
  gameWeeks: number[];
}

export function situation(standings: StandingRow[], schedule: ScheduleWeek[]): Situation {
  const wins: Record<string, number> = {};
  for (const r of standings) wins[r.manager] = r.wins + r.ties / 2;
  const games: Game[] = [];
  const gameWeeks: number[] = [];
  for (const w of schedule)
    for (const g of w.games) {
      games.push([g[0], g[1]]);
      gameWeeks.push(w.week);
    }
  return { wins, games, gameWeeks };
}

/** The situation after one game is decided. */
export function withResult(s: Situation, winner: string, loser: string): Situation {
  const i = s.games.findIndex(([a, b]) => (a === winner && b === loser) || (a === loser && b === winner));
  if (i < 0) return s;
  return {
    wins: { ...s.wins, [winner]: (s.wins[winner] ?? 0) + 1 },
    games: s.games.filter((_, k) => k !== i),
    gameWeeks: s.gameWeeks.filter((_, k) => k !== i),
  };
}

/** Most games that can each give a win to a team still under its cap. */
function maxAssign(games: Game[], cap: Record<string, number>): number {
  const load: Record<string, number> = {};
  const owner: (string | null)[] = games.map(() => null);
  const byTeam: Record<string, number[]> = {};
  const room = (t: string) => (cap[t] ?? 0) - (load[t] ?? 0);

  function place(g: number, seen: Set<string>): boolean {
    for (const t of games[g]) {
      if (seen.has(t) || (cap[t] ?? 0) <= 0) continue;
      seen.add(t);
      if (room(t) > 0) {
        assign(g, t);
        return true;
      }
      // Team is full: try to move one of its games to that game's other team.
      for (const other of byTeam[t] ?? []) {
        if (place2(other, t, seen)) {
          assign(g, t);
          return true;
        }
      }
    }
    return false;
  }
  function place2(g: number, from: string, seen: Set<string>): boolean {
    const to = games[g][0] === from ? games[g][1] : games[g][0];
    if (seen.has(to) || (cap[to] ?? 0) <= 0) return false;
    seen.add(to);
    const moveHere = () => {
      unassign(g);
      assign(g, to);
      return true;
    };
    if (room(to) > 0) return moveHere();
    for (const other of byTeam[to] ?? []) if (other !== g && place2(other, to, seen)) return moveHere();
    return false;
  }
  function assign(g: number, t: string) {
    owner[g] = t;
    load[t] = (load[t] ?? 0) + 1;
    (byTeam[t] ??= []).push(g);
  }
  function unassign(g: number) {
    const t = owner[g];
    if (!t) return;
    load[t] -= 1;
    byTeam[t] = byTeam[t].filter((x) => x !== g);
    owner[g] = null;
  }

  let n = 0;
  for (let g = 0; g < games.length; g++) if (place(g, new Set())) n++;
  return n;
}

function* subsets<T>(items: T[], k: number, start = 0, picked: T[] = []): Generator<T[]> {
  if (picked.length === k) {
    yield picked;
    return;
  }
  for (let i = start; i <= items.length - (k - picked.length); i++) yield* subsets(items, k, i + 1, [...picked, items[i]]);
}

const remaining = (games: Game[], t: string) => games.filter((g) => g[0] === t || g[1] === t).length;

/** Gives every one of `m`'s remaining games to m (or to the opponent). */
function settle(s: Situation, m: string, mWins: boolean): { wins: Record<string, number>; games: Game[] } {
  const wins = { ...s.wins };
  const games: Game[] = [];
  for (const g of s.games) {
    if (g[0] !== m && g[1] !== m) games.push(g);
    else {
      const winner = mWins ? m : g[0] === m ? g[1] : g[0];
      wins[winner] += 1;
    }
  }
  return { wins, games };
}

/**
 * Can `spots` - 1 or fewer teams finish ahead of `m` given m's final win total?
 * Returns the easiest set of other results that does it, or null.
 */
function bestPath(wins: Record<string, number>, games: Game[], m: string, spots: number, tiesOk: boolean) {
  const W = wins[m];
  const others = Object.keys(wins).filter((t) => t !== m);
  const free = Math.min(spots - 1, others.length);
  let best: { above: string[]; limits: { manager: string; maxWins: number; mustLose: number; left: number }[]; cost: number } | null = null;
  for (const above of subsets(others, free)) {
    const capped = others.filter((t) => !above.includes(t));
    const cap: Record<string, number> = {};
    let ok = true;
    for (const t of capped) {
      cap[t] = (tiesOk ? W : W - 1) - wins[t];
      if (cap[t] < 0) ok = false;
    }
    if (!ok) continue;
    const among = games.filter((g) => capped.includes(g[0]) && capped.includes(g[1]));
    if (maxAssign(among, cap) !== among.length) continue;
    const limits = capped
      .map((t) => ({ manager: t, maxWins: wins[t] + cap[t], left: remaining(games, t), mustLose: Math.max(0, remaining(games, t) - cap[t]) }))
      .filter((l) => l.mustLose > 0);
    const cost = limits.reduce((s, l) => s + l.mustLose, 0);
    if (!best || cost < best.cost) best = { above, limits, cost };
  }
  return best;
}

/** True if some set of results puts `spots` other teams at or above m's wins. */
function canBePassed(wins: Record<string, number>, games: Game[], m: string, spots: number): boolean {
  const L = wins[m];
  const others = Object.keys(wins).filter((t) => t !== m);
  if (others.length < spots) return false;
  for (const group of subsets(others, spots)) {
    const need: Record<string, number> = {};
    let total = 0;
    for (const t of group) {
      need[t] = Math.max(0, L - wins[t]);
      total += need[t];
    }
    const relevant = games.filter((g) => group.includes(g[0]) || group.includes(g[1]));
    if (maxAssign(relevant, need) === total) return true;
  }
  return false;
}

export function clinched(s: Situation, m: string, spots = PLAYOFF_TEAMS): boolean {
  const { wins, games } = settle(s, m, false);
  return !canBePassed(wins, games, m, spots);
}

/** In with no help as long as m wins every remaining game. */
export function controlsDestiny(s: Situation, m: string, spots = PLAYOFF_TEAMS): boolean {
  const { wins, games } = settle(s, m, true);
  return !canBePassed(wins, games, m, spots);
}

export function eliminated(s: Situation, m: string, spots = PLAYOFF_TEAMS): boolean {
  const { wins, games } = settle(s, m, true);
  return bestPath(wins, games, m, spots, true) === null;
}

export interface Path {
  /** m's record if they win out. */
  finalWins: number;
  /** Whether m would also need to win the points-for tiebreaker. */
  needsTiebreak: boolean;
  /** Teams that have to finish at or below a win total, and how many of their games they must lose. */
  limits: { manager: string; maxWins: number; mustLose: number; left: number }[];
}

/** The simplest way into the top `spots` for m, assuming m wins out. */
export function pathIn(s: Situation, m: string, spots = PLAYOFF_TEAMS): Path | null {
  const { wins, games } = settle(s, m, true);
  const clean = bestPath(wins, games, m, spots, false);
  if (clean) return { finalWins: wins[m], needsTiebreak: false, limits: clean.limits };
  const tie = bestPath(wins, games, m, spots, true);
  if (tie) return { finalWins: wins[m], needsTiebreak: true, limits: tie.limits };
  return null;
}

/** Most of m's remaining games m can lose and still have a way in (ties allowed). */
export function lossesToSpare(s: Situation, m: string, spots = PLAYOFF_TEAMS): number {
  const mine = s.games.map((g, i) => [g, i] as const).filter(([g]) => g[0] === m || g[1] === m);
  let spare = -1;
  for (let k = 0; k <= mine.length; k++) {
    let any = false;
    for (const lost of subsets(mine, k)) {
      let t = s;
      for (const [g] of lost) t = withResult(t, g[0] === m ? g[1] : g[0], m);
      if (!eliminated(t, m, spots)) {
        any = true;
        break;
      }
    }
    if (!any) break;
    spare = k;
  }
  return spare;
}

export interface WeekOutlook {
  opponent: string | null;
  clinchesWithWin: boolean;
  eliminatedWithLoss: boolean;
}

/** What this week's game alone can do for m, whatever happens elsewhere. */
export function thisWeek(s: Situation, m: string, week: number, spots = PLAYOFF_TEAMS): WeekOutlook {
  const i = s.games.findIndex((g, k) => s.gameWeeks[k] === week && (g[0] === m || g[1] === m));
  if (i < 0) return { opponent: null, clinchesWithWin: false, eliminatedWithLoss: false };
  const g = s.games[i];
  const opp = g[0] === m ? g[1] : g[0];
  return {
    opponent: opp,
    clinchesWithWin: !clinched(s, m, spots) && clinched(withResult(s, m, opp), m, spots),
    eliminatedWithLoss: !eliminated(s, m, spots) && eliminated(withResult(s, opp, m), m, spots),
  };
}
