import type { GameType, History, HistoryGame } from "./types";

export const slug = (name: string) => name.toLowerCase();

/** One game from one manager's point of view. */
export interface ManagerGame {
  year: number;
  week: number;
  opponent: string;
  pf: number;
  pa: number;
  result: "W" | "L" | "T";
  type: GameType;
}

export interface Record {
  wins: number;
  losses: number;
  ties: number;
  pf: number;
  pa: number;
  games: number;
}

const chrono = (x: { year: number; week: number }, y: { year: number; week: number }) =>
  x.year - y.year || x.week - y.week;

function fromSide(g: HistoryGame, name: string): ManagerGame | null {
  if (g.a !== name && g.b !== name) return null;
  const mine = g.a === name;
  const pf = mine ? g.aScore : g.bScore;
  const pa = mine ? g.bScore : g.aScore;
  return {
    year: g.year,
    week: g.week,
    opponent: mine ? g.b : g.a,
    pf,
    pa,
    result: pf > pa ? "W" : pf < pa ? "L" : "T",
    type: g.type,
  };
}

/** Every game a manager played, oldest first. */
export function managerGames(history: History, name: string, types: GameType[] = ["regular", "playoff", "consolation"]) {
  return history.games
    .map((g) => fromSide(g, name))
    .filter((g): g is ManagerGame => g !== null && types.includes(g.type))
    .sort(chrono);
}

export function tally(games: ManagerGame[]): Record {
  return games.reduce<Record>(
    (r, g) => ({
      wins: r.wins + (g.result === "W" ? 1 : 0),
      losses: r.losses + (g.result === "L" ? 1 : 0),
      ties: r.ties + (g.result === "T" ? 1 : 0),
      pf: r.pf + g.pf,
      pa: r.pa + g.pa,
      games: r.games + 1,
    }),
    { wins: 0, losses: 0, ties: 0, pf: 0, pa: 0, games: 0 }
  );
}

export const winPct = (r: Record) => (r.games ? (r.wins + r.ties / 2) / r.games : 0);
export const recordText = (r: Record) => (r.ties ? `${r.wins}-${r.losses}-${r.ties}` : `${r.wins}-${r.losses}`);

/** Everyone who has played in the league, current managers first. */
export function allManagers(history: History): { current: string[]; former: string[] } {
  const latest = Math.max(...history.games.map((g) => g.year));
  const names = new Set(history.games.flatMap((g) => [g.a, g.b]));
  const current = new Set(history.games.filter((g) => g.year === latest).flatMap((g) => [g.a, g.b]));
  const sort = (xs: string[]) => xs.sort((x, y) => x.localeCompare(y, undefined, { sensitivity: "base" }));
  return { current: sort([...current]), former: sort([...names].filter((n) => !current.has(n))) };
}

export interface SeasonLine {
  year: number;
  record: Record;
  /** Final place and league size, if the season is over. */
  finish: number | null;
  teams: number;
  champion: boolean;
  lastPlace: boolean;
  madePlayoffs: boolean;
}

export function seasonLines(history: History, name: string): SeasonLine[] {
  return history.seasons
    .filter((s) => history.games.some((g) => g.year === s.year && (g.a === name || g.b === name)))
    .map((s) => {
      const regular = managerGames(history, name, ["regular"]).filter((g) => g.year === s.year);
      const teams = new Set(history.games.filter((g) => g.year === s.year).flatMap((g) => [g.a, g.b])).size;
      const place = s.finish ? s.finish.indexOf(name) + 1 : 0;
      return {
        year: s.year,
        record: tally(regular),
        finish: place || null,
        teams,
        champion: place === 1,
        lastPlace: s.finish !== null && place === s.finish.length,
        madePlayoffs: history.games.some((g) => g.year === s.year && g.type === "playoff" && (g.a === name || g.b === name)),
      };
    });
}

export interface HeadToHead {
  a: string;
  b: string;
  /** All meetings from a's point of view, oldest first. */
  games: ManagerGame[];
  overall: Record;
  regular: Record;
  postseason: Record;
}

export function headToHead(history: History, a: string, b: string): HeadToHead {
  const games = managerGames(history, a).filter((g) => g.opponent === b);
  return {
    a,
    b,
    games,
    overall: tally(games),
    regular: tally(games.filter((g) => g.type === "regular")),
    postseason: tally(games.filter((g) => g.type !== "regular")),
  };
}

/** Current streak ("W3"), counting the most recent games. */
export function currentStreak(games: ManagerGame[]): string | null {
  if (!games.length) return null;
  const last = games[games.length - 1].result;
  let n = 0;
  for (let i = games.length - 1; i >= 0 && games[i].result === last; i--) n++;
  return `${last}${n}`;
}

export function longestStreak(games: ManagerGame[], result: "W" | "L"): number {
  let best = 0;
  let run = 0;
  for (const g of games) {
    run = g.result === result ? run + 1 : 0;
    best = Math.max(best, run);
  }
  return best;
}

export interface OpponentLine {
  opponent: string;
  record: Record;
  pct: number;
}

/** A manager's record against everyone they've played, most-played first. */
export function opponents(history: History, name: string): OpponentLine[] {
  const byOpp = new Map<string, ManagerGame[]>();
  for (const g of managerGames(history, name)) byOpp.set(g.opponent, [...(byOpp.get(g.opponent) ?? []), g]);
  return [...byOpp.entries()]
    .map(([opponent, gs]) => {
      const record = tally(gs);
      return { opponent, record, pct: winPct(record) };
    })
    .sort((x, y) => y.record.games - x.record.games || y.pct - x.pct || x.opponent.localeCompare(y.opponent));
}

/** The opponent a manager does worst against (nemesis) and best against (victim), with a minimum number of games. */
export function nemesisAndVictim(history: History, name: string, minGames = 3) {
  const eligible = opponents(history, name).filter((o) => o.record.games >= minGames);
  const byPct = [...eligible].sort((x, y) => x.pct - y.pct || y.record.games - x.record.games);
  const nemesis = byPct[0] ?? null;
  const victim = byPct.length > 1 ? byPct[byPct.length - 1] : null;
  return {
    nemesis: nemesis && nemesis.pct < 0.5 ? nemesis : null,
    victim: victim && victim.pct > 0.5 ? victim : null,
  };
}

export function bestAndWorstWeek(history: History, name: string) {
  const games = managerGames(history, name);
  const best = games.reduce<ManagerGame | null>((m, g) => (!m || g.pf > m.pf ? g : m), null);
  const worst = games.reduce<ManagerGame | null>((m, g) => (!m || g.pf < m.pf ? g : m), null);
  return { best, worst };
}

export interface Rivalry {
  a: string;
  b: string;
  h2h: HeadToHead;
  /** Average winning margin across all meetings. */
  avgMargin: number;
  /** Combined average score. */
  avgCombined: number;
}

/** Every pair of managers who have played at least `minGames` times. */
export function rivalries(history: History, minGames = 1): Rivalry[] {
  const pairs = new Map<string, [string, string]>();
  for (const g of history.games) {
    const [x, y] = [g.a, g.b].sort((p, q) => p.localeCompare(q));
    pairs.set(`${x}|${y}`, [x, y]);
  }
  return [...pairs.values()]
    .map(([a, b]) => {
      const h2h = headToHead(history, a, b);
      const n = h2h.games.length || 1;
      return {
        a,
        b,
        h2h,
        avgMargin: h2h.games.reduce((s, g) => s + Math.abs(g.pf - g.pa), 0) / n,
        avgCombined: h2h.games.reduce((s, g) => s + g.pf + g.pa, 0) / n,
      };
    })
    .filter((r) => r.h2h.games.length >= minGames);
}
