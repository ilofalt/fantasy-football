// One-time Yahoo OAuth setup. Run it yourself in a terminal (it's interactive):
//
//   node scripts/yahoo-auth.mjs
//
// It asks for your Yahoo app's Client ID and Secret, has you approve access in
// the browser (Yahoo then shows a code), trades the code for a refresh token,
// and stores all three as
// SecureString parameters in AWS SSM, where the scoreboard Lambda reads them.
// Nothing is written to disk or printed.
import { createInterface } from "node:readline/promises";
import { exec } from "node:child_process";
import { PutParameterCommand, SSMClient } from "@aws-sdk/client-ssm";

const PARAM_PREFIX = "/fantasy-football/yahoo";
// "oob" (out-of-band): Yahoo displays the code instead of redirecting. Yahoo
// rejects the app's registered https URI, but accepts oob. Must match the
// Lambda's YAHOO_REDIRECT_URI.
const REDIRECT_URI = "oob";

const rl = createInterface({ input: process.stdin, output: process.stdout });

const clientId = (await rl.question("Yahoo Client ID: ")).trim();
const clientSecret = (await rl.question("Yahoo Client Secret: ")).trim();

const authUrl =
  "https://api.login.yahoo.com/oauth2/request_auth?" +
  new URLSearchParams({ client_id: clientId, redirect_uri: REDIRECT_URI, response_type: "code" });

console.log(`\nOpen this URL, sign in, and approve access:\n\n  ${authUrl}\n`);
const opener =
  process.platform === "win32"
    ? `start "" "${authUrl}"`
    : process.platform === "darwin"
      ? `open "${authUrl}"`
      : `xdg-open "${authUrl}"`;
exec(opener, () => {});

// Accept either the bare code or a URL containing ?code=...
const answer = (await rl.question("Paste the code Yahoo shows you: ")).trim();
rl.close();
const code = answer.includes("code=") ? new URL(answer).searchParams.get("code") : answer;
if (!code) {
  console.error("No code found in that URL.");
  process.exit(1);
}

const res = await fetch("https://api.login.yahoo.com/oauth2/get_token", {
  method: "POST",
  headers: {
    Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
    "Content-Type": "application/x-www-form-urlencoded",
  },
  body: new URLSearchParams({ grant_type: "authorization_code", code, redirect_uri: REDIRECT_URI }),
});
if (!res.ok) {
  console.error(`Token exchange failed: ${res.status} ${await res.text()}`);
  process.exit(1);
}
const { refresh_token: refreshToken } = await res.json();

const ssm = new SSMClient({ region: "us-east-1" });
for (const [name, value] of Object.entries({
  client_id: clientId,
  client_secret: clientSecret,
  refresh_token: refreshToken,
})) {
  await ssm.send(
    new PutParameterCommand({
      Name: `${PARAM_PREFIX}/${name}`,
      Value: value,
      Type: "SecureString",
      Overwrite: true,
    })
  );
}

console.log(
  `\nStored Yahoo credentials under ${PARAM_PREFIX} in SSM. The scoreboard Lambda will pick them up on its next run.`
);
