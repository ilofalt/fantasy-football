// `npm run dev` has no Lambda writing data/scoreboard.json, so serve the
// sample scoreboard locally. public/data/ is gitignored and excluded from
// the S3 sync, so this never reaches the live site.
import { cpSync, mkdirSync } from "node:fs";

mkdirSync("public/data", { recursive: true });
cpSync("src/lib/scoreboard/__fixtures__/scoreboard.json", "public/data/scoreboard.json");
