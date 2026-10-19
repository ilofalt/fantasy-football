import { GetParametersCommand, PutParameterCommand, SSMClient } from "@aws-sdk/client-ssm";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { normalizeScoreboard } from "../../src/lib/scoreboard/normalize";

// Runs on a schedule: refreshes the Yahoo OAuth token, fetches the league
// scoreboard, and writes the simplified JSON into the site bucket where the
// static page picks it up. Credentials never leave AWS.

const PARAM_PREFIX = process.env.PARAM_PREFIX!; // e.g. /fantasy-football/yahoo
const LEAGUE_KEY = process.env.LEAGUE_KEY!; // e.g. nfl.l.12345
const BUCKET = process.env.BUCKET!;
const OBJECT_KEY = process.env.OBJECT_KEY!; // e.g. data/scoreboard.json
const REDIRECT_URI = process.env.YAHOO_REDIRECT_URI!; // must match the Yahoo app's registered URI

const ssm = new SSMClient({});
const s3 = new S3Client({});

async function getCredentials() {
  const names = ["client_id", "client_secret", "refresh_token"].map((n) => `${PARAM_PREFIX}/${n}`);
  const { Parameters = [] } = await ssm.send(
    new GetParametersCommand({ Names: names, WithDecryption: true })
  );
  const byName = Object.fromEntries(Parameters.map((p) => [p.Name, p.Value]));
  const [clientId, clientSecret, refreshToken] = names.map((n) => byName[n]);
  if (!clientId || !clientSecret || !refreshToken) {
    throw new Error(`Missing Yahoo credentials under ${PARAM_PREFIX} — run scripts/yahoo-auth.mjs`);
  }
  return { clientId, clientSecret, refreshToken };
}

async function getAccessToken() {
  const { clientId, clientSecret, refreshToken } = await getCredentials();
  const res = await fetch("https://api.login.yahoo.com/oauth2/get_token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
      redirect_uri: REDIRECT_URI,
    }),
  });
  if (!res.ok) {
    throw new Error(`Yahoo token refresh failed: ${res.status} ${(await res.text()).slice(0, 500)}`);
  }
  const token = (await res.json()) as { access_token: string; refresh_token?: string };

  // Yahoo may rotate the refresh token; keep the stored one current.
  if (token.refresh_token && token.refresh_token !== refreshToken) {
    await ssm.send(
      new PutParameterCommand({
        Name: `${PARAM_PREFIX}/refresh_token`,
        Value: token.refresh_token,
        Type: "SecureString",
        Overwrite: true,
      })
    );
  }
  return token.access_token;
}

export async function handler() {
  const accessToken = await getAccessToken();
  const res = await fetch(
    `https://fantasysports.yahooapis.com/fantasy/v2/league/${LEAGUE_KEY}/scoreboard?format=json`,
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
  if (!res.ok) {
    throw new Error(`Yahoo scoreboard request failed: ${res.status} ${(await res.text()).slice(0, 500)}`);
  }

  const scoreboard = normalizeScoreboard(await res.json(), new Date().toISOString());

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
