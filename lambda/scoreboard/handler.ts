import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { normalizeScoreboard } from "../../src/lib/scoreboard/normalize";
import { createYahooClient } from "./yahoo";

// Runs on a schedule: fetches the league scoreboard from Yahoo and writes the
// simplified JSON into the site bucket where the static page picks it up.
// Credentials never leave AWS.

const LEAGUE_KEY = process.env.LEAGUE_KEY!; // e.g. nfl.l.12345
const BUCKET = process.env.BUCKET!;
const OBJECT_KEY = process.env.OBJECT_KEY!; // e.g. data/scoreboard.json
const REDIRECT_URI = process.env.YAHOO_REDIRECT_URI!; // must match the Yahoo app's registered URI

const s3 = new S3Client({});

export async function handler() {
  const yahoo = createYahooClient({ redirectUri: REDIRECT_URI });
  const scoreboard = normalizeScoreboard(
    await yahoo.get(`/league/${LEAGUE_KEY}/scoreboard`),
    new Date().toISOString()
  );

  await s3.send(
    new PutObjectCommand({
      Bucket: BUCKET,
      Key: OBJECT_KEY,
      Body: JSON.stringify(scoreboard),
      ContentType: "application/json",
      // Short TTL so CloudFront serves fresh scores without invalidations.
      CacheControl: "public, max-age=60",
    })
  );

  console.log(`Wrote week ${scoreboard.week} scoreboard (${scoreboard.matchups.length} matchups)`);
}
