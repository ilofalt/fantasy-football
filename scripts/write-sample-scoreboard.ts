// Regenerates the normalized sample scoreboard from the raw Yahoo fixture.
// Run with: npx esbuild scripts/write-sample-scoreboard.ts --bundle --platform=node | node
import { writeFileSync } from "node:fs";
import raw from "../src/lib/scoreboard/__fixtures__/yahoo-scoreboard.json";
import { normalizeScoreboard } from "../src/lib/scoreboard/normalize";

const scoreboard = normalizeScoreboard(raw, "2026-10-18T20:00:00.000Z");
writeFileSync(
  "src/lib/scoreboard/__fixtures__/scoreboard.json",
  JSON.stringify(scoreboard, null, 2) + "\n"
);
