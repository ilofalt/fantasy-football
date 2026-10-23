import { history } from "./history";
import { REMAINING_SCHEDULE } from "./schedule";
import { standings, STANDINGS_THROUGH_WEEK } from "./standings";
import { playoffOdds } from "@/lib/playoffs/odds";

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
