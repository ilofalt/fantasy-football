import { GetParametersCommand, PutParameterCommand, SSMClient } from "@aws-sdk/client-ssm";

// Yahoo Fantasy API access using the credentials scripts/yahoo-auth.mjs
// stored in SSM. Shared by the Lambda and the local fetch script.

export const PARAM_PREFIX = "/fantasy-football/yahoo";
const API_BASE = "https://fantasysports.yahooapis.com/fantasy/v2";

interface YahooClientOptions {
  redirectUri: string; // must match the Yahoo app's registered Redirect URI
  ssm?: SSMClient;
}

export function createYahooClient({ redirectUri, ssm = new SSMClient({}) }: YahooClientOptions) {
  async function getCredentials() {
    const names = ["client_id", "client_secret", "refresh_token"].map((n) => `${PARAM_PREFIX}/${n}`);
    const { Parameters = [] } = await ssm.send(
      new GetParametersCommand({ Names: names, WithDecryption: true })
    );
    const byName = Object.fromEntries(Parameters.map((p) => [p.Name, p.Value]));
    const [clientId, clientSecret, refreshToken] = names.map((n) => byName[n]);
    if (!clientId || !clientSecret || !refreshToken) {
      throw new Error(`Missing Yahoo credentials under ${PARAM_PREFIX} — run npm run yahoo:auth`);
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
        redirect_uri: redirectUri,
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

  let accessToken: Promise<string> | null = null;

  return {
    /** GET a Fantasy API path (e.g. "/league/nfl.l.123/scoreboard") as JSON. */
    async get(path: string): Promise<unknown> {
      accessToken ??= getAccessToken();
      const res = await fetch(`${API_BASE}${path}?format=json`, {
        headers: { Authorization: `Bearer ${await accessToken}` },
      });
      if (!res.ok) {
        throw new Error(`Yahoo request ${path} failed: ${res.status} ${(await res.text()).slice(0, 500)}`);
      }
      return res.json();
    },
  };
}
