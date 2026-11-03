import type { WeekMatchups } from "@/lib/matchups/types";
import week9 from "./week-9.json";

// The current week's matchups with full rosters. To update, replace this with
// the new week's file (same shape as week-9.json). The Matchups tab shows this
// snapshot unless the live scoreboard (written by the Lambda) is for a newer week.
export const currentMatchups: WeekMatchups = week9 as WeekMatchups;
