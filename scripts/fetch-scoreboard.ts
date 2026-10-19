// Fetches the real league scoreboard from Yahoo into public/data/ so
// `npm run dev` shows live data. Uses the same credentials (SSM) and code as
// the Lambda. Run with: npm run scoreboard:local [league_id]
//
// With no league ID it lists your NFL leagues; with exactly one, it uses it.
import { mkdirSync, writeFileSync } from "node:fs";
import { SSMClient } from "@aws-sdk/client-ssm";
import { createYahooClient } from "../lambda/scoreboard/yahoo";
import { normalizeScoreboard } from "../src/lib/scoreboard/normalize";

const yahoo = createYahooClient({
  redirectUri: "oob",
  ssm: new SSMClient({ region: "us-east-1" }),
});

// Yahoo nests leagues deep inside users/games; just collect anything that
// looks like a league.
function findLeagues(node: unknown, found: { key: string; name: string }[] = []) {
  if (Array.isArray(node)) node.forEach((n) => findLeagues(n, found));
  else if (node && typeof node === "object") {
    const obj = node as Record<string, unknown>;
    if (typeof obj.league_key === "string" && typeof obj.name === "string") {
      found.push({ key: obj.league_key, name: obj.name });
    }
    Object.values(obj).forEach((v) => findLeagues(v, found));
  }
  return found;
}

async function main() {
  let leagueId = process.argv[2];

  if (!leagueId) {
    const leagues = findLeagues(await yahoo.get("/users;use_login=1/games;game_keys=nfl/leagues"));
    if (leagues.length === 0) throw new Error("No NFL leagues found for this Yahoo account.");
    for (const l of leagues) console.log(`  ${l.key.split(".l.")[1]}  ${l.name}`);
    if (leagues.length > 1) {
      console.log("\nMultiple leagues — rerun with the league ID: npm run scoreboard:local <league_id>");
      return;
    }
    leagueId = leagues[0].key.split(".l.")[1];
  }

  const scoreboard = normalizeScoreboard(
    await yahoo.get(`/league/nfl.l.${leagueId}/scoreboard`),
    new Date().toISOString()
  );
  mkdirSync("public/data", { recursive: true });
  writeFileSync("public/data/scoreboard.json", JSON.stringify(scoreboard, null, 2) + "\n");
  console.log(
    `\n${scoreboard.leagueName} (league ${leagueId}): week ${scoreboard.week}, ${scoreboard.matchups.length} matchups → public/data/scoreboard.json`
  );
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
