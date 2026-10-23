import type { History } from "@/lib/history/types";
import data from "./history.json";

// Every game since the league moved to Yahoo in 2022, by manager name.
// Regenerate history.json from Yahoo's league history after each week.
export const history = data as History;
