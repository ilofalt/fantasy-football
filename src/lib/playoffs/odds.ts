import { PLAYOFF_TEAMS, type StandingRow } from "./seed";

// Monte Carlo playoff odds. Each remaining game is simulated by drawing both
// teams' scores from a normal distribution: the mean is the team's average
// this season pulled toward the league average (six games is a small sample),
// and the spread is the league-wide week-to-week standard deviation. Seeds are
// set by wins, then points for, the same as Yahoo. The playoffs (6 teams,
// reseeded, ties to the higher seed) are simulated too, for title odds.

export interface TeamOdds {
  manager: string;
  playoffs: number;
  bye: number;
  firstSeed: number;
  title: number;
  lastPlace: number;
  avgWins: number;
  avgSeed: number;
}

export interface OddsInput {
  standings: StandingRow[];
  /** Every score each manager has posted this season. */
  scores: Record<string, number[]>;
  /** Remaining regular-season games. */
  schedule: { week: number; games: [string, string][] }[];
  sims?: number;
  seed?: number;
  /** Games' worth of league-average weight in each team's mean. */
  shrink?: number;
}

/** Small, fast, seedable PRNG so the odds are the same on every build. */
export function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function normal(rand: () => number) {
  const u = 1 - rand();
  const v = rand();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}

const mean = (xs: number[]) => xs.reduce((s, x) => s + x, 0) / (xs.length || 1);

export function teamModel(scores: Record<string, number[]>, shrink = 4) {
  const all = Object.values(scores).flat();
  const leagueMean = mean(all);
  const means: Record<string, number> = {};
  let ss = 0;
  let df = 0;
  for (const [m, xs] of Object.entries(scores)) {
    const mu = mean(xs);
    means[m] = (xs.length * mu + shrink * leagueMean) / (xs.length + shrink);
    ss += xs.reduce((s, x) => s + (x - mu) ** 2, 0);
    df += Math.max(xs.length - 1, 0);
  }
  return { leagueMean, means, sd: df ? Math.sqrt(ss / df) : 20 };
}

export function playoffOdds({ standings, scores, schedule, sims = 10000, seed = 2026, shrink = 4 }: OddsInput): TeamOdds[] {
  const rand = mulberry32(seed);
  const { means, sd, leagueMean } = teamModel(scores, shrink);
  const names = standings.map((s) => s.manager);
  const idx = new Map(names.map((n, i) => [n, i]));
  const n = names.length;
  const mu = names.map((m) => means[m] ?? leagueMean);
  const tally = names.map(() => ({ playoffs: 0, bye: 0, firstSeed: 0, title: 0, lastPlace: 0, wins: 0, seed: 0 }));
  const draw = (i: number) => mu[i] + sd * normal(rand);

  const wins = new Float64Array(n);
  const pf = new Float64Array(n);
  for (let s = 0; s < sims; s++) {
    standings.forEach((r, i) => {
      wins[i] = r.wins + r.ties / 2;
      pf[i] = r.pointsFor;
    });
    for (const { games } of schedule) {
      for (const [a, b] of games) {
        const i = idx.get(a);
        const j = idx.get(b);
        if (i === undefined || j === undefined) continue;
        const x = draw(i);
        const y = draw(j);
        pf[i] += x;
        pf[j] += y;
        if (x > y) wins[i] += 1;
        else if (y > x) wins[j] += 1;
        else {
          wins[i] += 0.5;
          wins[j] += 0.5;
        }
      }
    }
    const order = [...Array(n).keys()].sort((p, q) => wins[q] - wins[p] || pf[q] - pf[p]);
    order.forEach((t, k) => {
      tally[t].wins += wins[t];
      tally[t].seed += k + 1;
      if (k < PLAYOFF_TEAMS) tally[t].playoffs++;
      if (k < 2) tally[t].bye++;
    });
    tally[order[0]].firstSeed++;
    tally[order[n - 1]].lastPlace++;

    // Playoffs: seed index 0..5. Higher seed (lower index) wins ties.
    const game = (p: number, q: number) => {
      const [hi, lo] = p < q ? [p, q] : [q, p];
      return draw(order[hi]) >= draw(order[lo]) ? hi : lo;
    };
    const r1 = [game(2, 5), game(3, 4)].sort((p, q) => p - q);
    const semis = [game(0, r1[1]), game(1, r1[0])];
    tally[order[game(semis[0], semis[1])]].title++;
  }

  return names.map((manager, i) => ({
    manager,
    playoffs: tally[i].playoffs / sims,
    bye: tally[i].bye / sims,
    firstSeed: tally[i].firstSeed / sims,
    title: tally[i].title / sims,
    lastPlace: tally[i].lastPlace / sims,
    avgWins: tally[i].wins / sims,
    avgSeed: tally[i].seed / sims,
  }));
}

/** Percent for display: "<1%" and ">99%" instead of rounding to 0 or 100. */
export function pct(p: number): string {
  if (p === 0) return "0%";
  if (p === 1) return "100%";
  if (p < 0.005) return "<1%";
  if (p > 0.995) return ">99%";
  return `${Math.round(p * 100)}%`;
}
