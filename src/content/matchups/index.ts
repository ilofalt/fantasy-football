import type { WeekMatchups } from "@/lib/matchups/types";
import week8 from "./week-8.json";

// The current week's matchups with full rosters. To update, replace this with
// the new week's file (same shape as week-8.json). The Matchups tab shows this
// snapshot unless the live scoreboard (written by the Lambda) is for a newer week.
export const currentMatchups: WeekMatchups = week8 as WeekMatchups;
