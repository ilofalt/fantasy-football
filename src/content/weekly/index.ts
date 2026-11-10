import type { WeekData } from "@/lib/weekly/types";
import week9 from "./week-9.json";
import week8 from "./week-8.json";
import week7 from "./week-7.json";
import week6 from "./week-6.json";

// One file per week of lineups, newest first. To publish a new weekly report,
// add week-N.json (same shape as week-9.json) and put it at the top of this list.
export const weeklyData: WeekData[] = [week9 as WeekData, week8 as WeekData, week7 as WeekData, week6 as WeekData];
