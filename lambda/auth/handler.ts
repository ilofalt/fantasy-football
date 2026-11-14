import { cancelBet, listBets, matchBet, placeBet, settleBet } from "./bets";
import { type AuthResult, type AuthStore, SESSION_SECONDS, currentUser, login, logout, me, signup } from "./core";
import { createDynamoStore } from "./dynamo";

// Lambda Function URL handler (payload format v2) behind CloudFront at /api/auth/*.
// Same origin as the site, so the session cookie is a plain first-party cookie.

export const COOKIE_NAME = "ff_session";

export interface HttpEvent {
  rawPath: string;
  cookies?: string[];
  headers?: Record<string, string | undefined>;
  body?: string;
  isBase64Encoded?: boolean;
  requestContext: { http: { method: string } };
}

const json = (status: number, body: unknown, cookies?: string[]) => ({
  statusCode: status,
  headers: { "content-type": "application/json", "cache-control": "no-store" },
  ...(cookies ? { cookies } : {}),
  body: JSON.stringify(body),
});

function sessionCookie(token: string | null | undefined): string[] | undefined {
  if (token === undefined) return undefined;
  const attrs = "Path=/; HttpOnly; Secure; SameSite=Lax";
  return [
    token === null
      ? `${COOKIE_NAME}=; ${attrs}; Max-Age=0`
      : `${COOKIE_NAME}=${token}; ${attrs}; Max-Age=${SESSION_SECONDS}`,
  ];
}

function tokenFrom(event: HttpEvent): string | undefined {
  const pairs = [...(event.cookies ?? []), ...(event.headers?.cookie?.split(/;\s*/) ?? [])];
  return pairs.find((c) => c.startsWith(`${COOKIE_NAME}=`))?.slice(COOKIE_NAME.length + 1) || undefined;
}

function parseBody(event: HttpEvent): Record<string, unknown> | null {
  if (!event.body) return {};
  try {
    const raw = event.isBase64Encoded ? Buffer.from(event.body, "base64").toString("utf8") : event.body;
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : null;
  } catch {
    return null;
  }
}

export async function route(store: AuthStore, event: HttpEvent) {
  const method = event.requestContext.http.method;
  const path = event.rawPath.replace(/\/+$/, "");
  const token = tokenFrom(event);
  const respond = (r: AuthResult) => json(r.status, r.body, sessionCookie(r.token));

  if (method === "GET" && path === "/api/auth/me") return respond(await me(store, token));

  if (path === "/api/bets" || path.startsWith("/api/bets/")) {
    const user = await currentUser(store, token);
    if (!user) return json(401, { error: "Log in to use the SportsBook." });
    if (method === "GET" && path === "/api/bets") return respond(await listBets(store));
  }

  if (method === "POST") {
    // Browsers can't send JSON cross-site without a preflight, which blocks forged form posts.
    if (!event.headers?.["content-type"]?.startsWith("application/json")) {
      return json(415, { error: "Expected JSON." });
    }
    const body = parseBody(event);
    if (!body) return json(400, { error: "Invalid request." });

    if (path === "/api/auth/signup") return respond(await signup(store, body));
    if (path === "/api/auth/login") return respond(await login(store, body));
    if (path === "/api/auth/logout") return respond(await logout(store, token));

    if (path.startsWith("/api/bets")) {
      const user = (await currentUser(store, token))!; // checked above
      if (path === "/api/bets") return respond(await placeBet(store, user.manager, body));
      const [, , , id, action] = path.split("/");
      if (action === "match") return respond(await matchBet(store, user.manager, id));
      if (action === "cancel") return respond(await cancelBet(store, user.manager, id));
      if (action === "settle") return respond(await settleBet(store, user.manager, id, body.winner));
    }
  }

  return json(404, { error: "Not found." });
}

let store: AuthStore | undefined;

export const handler = (event: HttpEvent) => route((store ??= createDynamoStore(process.env.TABLE!)), event);
