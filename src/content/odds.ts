import { history } from "./history";
import { REMAINING_SCHEDULE } from "./schedule";
import { standings, STANDINGS_THROUGH_WEEK } from "./standings";
import { playoffOdds, teamModel } from "@/lib/playoffs/odds";

const SEASON = 2026;

/** Every score posted this season through the last final week. */
export const seasonScores: Record<string, number[]> = {};
for (const g of history.games) {
  if (g.year !== SEASON || g.week > STANDINGS_THROUGH_WEEK || g.type !== "regular") continue;
  (seasonScores[g.a] ??= []).push(g.aScore);
  (seasonScores[g.b] ??= []).push(g.bScore);
}

// Computed once at build time (static export), seeded so it's stable.
export const odds = playoffOdds({
  standings,
  scores: seasonScores,
  schedule: REMAINING_SCHEDULE.filter((w) => w.week > STANDINGS_THROUGH_WEEK),
});

export const oddsFor = (manager: string) => odds.find((o) => o.manager === manager) ?? null;

const { means: modelMeans } = teamModel(seasonScores);

/**
 * Playoff odds with some of the remaining games already decided (winner,
 * loser). Each decided game adds the teams' model averages to points for.
 * Fewer sims than the main table, since these run in the browser on demand.
 */
export function oddsGiven(results: [string, string][], sims = 3000) {
  const rows = standings.map((r) => ({ ...r }));
  const schedule = REMAINING_SCHEDULE.filter((w) => w.week > STANDINGS_THROUGH_WEEK).map((w) => ({ ...w, games: [...w.games] }));
  for (const [winner, loser] of results) {
    for (const w of schedule) {
      const i = w.games.findIndex(([a, b]) => (a === winner && b === loser) || (a === loser && b === winner));
      if (i < 0) continue;
      w.games.splice(i, 1);
      const win = rows.find((r) => r.manager === winner);
      const lose = rows.find((r) => r.manager === loser);
      if (win && lose) {
        win.wins += 1;
        lose.losses += 1;
        win.pointsFor += modelMeans[winner] ?? 0;
        lose.pointsFor += modelMeans[loser] ?? 0;
      }
      break;
    }
  }
  return playoffOdds({ standings: rows, scores: seasonScores, schedule, sims });
}
