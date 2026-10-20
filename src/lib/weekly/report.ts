import type { WeekData, WeeklyPlayer, WeeklyTeam } from "./types";

// Sleeper-style weekly report, computed entirely from a week's lineups.
//
// League lineup: QB, RB, RB, WR, WR, TE, W/R/T (flex), K, DEF. A team's
// "perfect lineup" is the highest-scoring legal lineup from its starters and
// bench; IR players can't be started, so they don't count.

const FLEX = new Set(["RB", "WR", "TE"]);
const STARTING_SLOTS = new Set(["QB", "RB", "WR", "TE", "W/R/T", "K", "DEF"]);

export function isStarter(p: WeeklyPlayer): boolean {
  return STARTING_SLOTS.has(p.slot);
}

const round2 = (n: number) => Math.round(n * 100) / 100;

/** Best legal lineup from everyone not on IR. Greedy is optimal for this format. */
export function perfectLineup(team: WeeklyTeam): { points: number; players: WeeklyPlayer[] } {
  const pool = team.players.filter((p) => p.slot !== "IR");
  const best = (pos: string, n: number, exclude: Set<WeeklyPlayer> = new Set()) =>
    pool
      .filter((p) => p.position === pos && !exclude.has(p))
      .sort((a, b) => b.points - a.points)
      .slice(0, n);

  const core = [...best("QB", 1), ...best("RB", 2), ...best("WR", 2), ...best("TE", 1)];
  const used = new Set(core);
  const flex = pool
    .filter((p) => FLEX.has(p.position) && !used.has(p))
    .sort((a, b) => b.points - a.points)
    .slice(0, 1);
  const players = [...core, ...flex, ...best("K", 1), ...best("DEF", 1)];
  return { points: round2(players.reduce((s, p) => s + p.points, 0)), players };
}

export interface ManagerLine {
  manager: string;
  points: number;
  projected: number;
  perfect: number;
  /** points / perfect, 0–1. */
  efficiency: number;
  /** Points the perfect lineup would have added. */
  leftOnBench: number;
  /** Bench players who were in the perfect lineup. */
  shouldHaveStarted: WeeklyPlayer[];
}

export function managerLines(week: WeekData): ManagerLine[] {
  return week.teams.map((t) => {
    const perfect = perfectLineup(t);
    return {
      manager: t.manager,
      points: t.points,
      projected: t.projected,
      perfect: perfect.points,
      efficiency: perfect.points > 0 ? t.points / perfect.points : 1,
      leftOnBench: round2(Math.max(0, perfect.points - t.points)),
      shouldHaveStarted: perfect.players.filter((p) => !isStarter(p)),
    };
  });
}

export interface MatchupResult {
  winner: { manager: string; points: number };
  loser: { manager: string; points: number };
  /** Winning margin as a fraction of the loser's score. */
  margin: number;
}

export function matchupResults(week: WeekData): MatchupResult[] {
  const pts = new Map(week.teams.map((t) => [t.manager, t.points]));
  return week.matchups.map(([a, b]) => {
    const [w, l] = (pts.get(a) ?? 0) >= (pts.get(b) ?? 0) ? [a, b] : [b, a];
    const wp = pts.get(w) ?? 0;
    const lp = pts.get(l) ?? 0;
    return { winner: { manager: w, points: wp }, loser: { manager: l, points: lp }, margin: lp > 0 ? (wp - lp) / lp : 0 };
  });
}

export type ReportCard =
  | { kind: "manager"; id: string; title: string; emoji: string; text: string; manager: string; points: number }
  | {
      kind: "matchup";
      id: string;
      title: string;
      emoji: string;
      text: string;
      winner: { manager: string; points: number };
      loser: { manager: string; points: number };
    }
  | {
      kind: "player";
      id: string;
      title: string;
      emoji: string;
      text: string;
      manager: string;
      player: WeeklyPlayer;
    };

const pct = (x: number) => `${Math.round(x * 100)}%`;
const pct1 = (x: number) => `${(Math.round(x * 1000) / 10).toFixed(1)}%`;
const fmt = (n: number) => n.toFixed(2);

const POSITIONS = ["QB", "RB", "WR", "TE"] as const;

function bestPlayer(week: WeekData, pos: string, bench: boolean) {
  let top: { manager: string; player: WeeklyPlayer } | null = null;
  for (const t of week.teams) {
    for (const p of t.players) {
      if (p.position !== pos) continue;
      if (bench ? p.slot !== "BN" : !isStarter(p)) continue;
      if (!top || p.points > top.player.points) top = { manager: t.manager, player: p };
    }
  }
  return top;
}

export function buildReport(week: WeekData): ReportCard[] {
  const lines = managerLines(week);
  const results = matchupResults(week);
  const cards: ReportCard[] = [];

  // Best/worst manager by lineup efficiency; ties go to the higher score.
  const byEff = [...lines].sort((a, b) => b.efficiency - a.efficiency || b.points - a.points);
  const best = byEff[0];
  const worst = byEff[byEff.length - 1];
  const alsoPerfect = byEff
    .filter((l) => l !== best && l.efficiency >= 0.9999)
    .map((l) => `${l.manager} (${fmt(l.points)})`);
  cards.push({
    kind: "manager",
    id: "best-manager",
    title: "Best Manager",
    emoji: "🔥",
    text:
      best.efficiency >= 0.9999
        ? `${best.manager} set a perfect lineup: every point possible (${fmt(best.perfect)}).` +
          (alsoPerfect.length ? ` ${alsoPerfect.join(" and ")} also set a perfect lineup.` : "")
        : `${best.manager} set a lineup that was ${pct(best.efficiency)} of their perfect possible lineup (${fmt(best.perfect)}).`,
    manager: best.manager,
    points: best.points,
  });
  cards.push({
    kind: "manager",
    id: "worst-manager",
    title: "Worst Manager",
    emoji: "🤔",
    text:
      `${worst.manager} set the worst lineup and only scored ${pct(worst.efficiency)} of their perfect possible lineup (${fmt(worst.perfect)}).` +
      (worst.shouldHaveStarted.length
        ? ` Left on the bench: ${worst.shouldHaveStarted.map((p) => `${p.name} (${fmt(p.points)})`).join(", ")}.`
        : ""),
    manager: worst.manager,
    points: worst.points,
  });

  const byMargin = [...results].sort((a, b) => b.margin - a.margin);
  const blowout = byMargin[0];
  const narrow = byMargin[byMargin.length - 1];
  cards.push({
    kind: "matchup",
    id: "biggest-blowout",
    title: "Biggest Blowout",
    emoji: "😂",
    text: `${blowout.winner.manager} beat ${blowout.loser.manager} by a margin of ${pct1(blowout.margin)}!`,
    winner: blowout.winner,
    loser: blowout.loser,
  });
  cards.push({
    kind: "matchup",
    id: "narrow-victory",
    title: "Narrow Victory",
    emoji: "😱",
    text: `${narrow.winner.manager} beat ${narrow.loser.manager} by a margin of ${pct1(narrow.margin)}!`,
    winner: narrow.winner,
    loser: narrow.loser,
  });

  const byPoints = [...lines].sort((a, b) => b.points - a.points);
  const high = byPoints[0];
  const low = byPoints[byPoints.length - 1];
  cards.push({ kind: "manager", id: "highest-scorer", title: "Highest Scorer", emoji: "😎", text: `${high.manager} put up the top score of the week.`, manager: high.manager, points: high.points });
  cards.push({ kind: "manager", id: "lowest-scorer", title: "Lowest Scorer", emoji: "💩", text: `${low.manager} put up the lowest score of the week.`, manager: low.manager, points: low.points });

  const vsProj = (l: ManagerLine) => (l.projected > 0 ? (l.points - l.projected) / l.projected : 0);
  const byProj = [...lines].sort((a, b) => vsProj(b) - vsProj(a));
  const over = byProj[0];
  const under = byProj[byProj.length - 1];
  cards.push({
    kind: "manager",
    id: "overachiever",
    title: "Overachiever",
    emoji: "🤓",
    text: `${over.manager} beat their projection (${fmt(over.projected)}) by ${pct(vsProj(over))}!`,
    manager: over.manager,
    points: over.points,
  });
  cards.push({
    kind: "manager",
    id: "below-expectation",
    title: "Below Expectation",
    emoji: "💀",
    text: `${under.manager} missed their projection (${fmt(under.projected)}) by ${pct(-vsProj(under))}!`,
    manager: under.manager,
    points: under.points,
  });

  for (const pos of POSITIONS) {
    const top = bestPlayer(week, pos, false);
    if (top)
      cards.push({
        kind: "player",
        id: `${pos.toLowerCase()}-of-the-week`,
        title: `${pos} of the Week`,
        emoji: "⭐",
        text: `${top.manager} started the best ${pos} of the week!`,
        manager: top.manager,
        player: top.player,
      });
  }
  for (const pos of POSITIONS) {
    const top = bestPlayer(week, pos, true);
    if (top && top.player.points > 0)
      cards.push({
        kind: "player",
        id: `${pos.toLowerCase()}-benchwarmer`,
        title: `${pos} Benchwarmer of the Week`,
        emoji: "👀",
        text: `${top.manager} had the best ${pos} on the bench this week!`,
        manager: top.manager,
        player: top.player,
      });
  }
  return cards;
}
