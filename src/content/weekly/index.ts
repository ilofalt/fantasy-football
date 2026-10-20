import type { WeekData } from "@/lib/weekly/types";
import week6 from "./week-6.json";

// One file per week of lineups, newest first. To publish a new weekly report,
// add week-N.json (same shape as week-6.json) and put it at the top of this list.
export const weeklyData: WeekData[] = [week6 as WeekData];
