import { createServer } from "node:http";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
import { route } from "../lambda/auth/handler";
import type { AuthStore, Session, User } from "../lambda/auth/core";

// Local stand-in for the auth Lambda + DynamoDB: same request handling, with
// accounts kept in a JSON file so they survive restarts. `next dev` proxies
// /api/* here (see next.config.mjs).

const PORT = Number(process.env.AUTH_PORT ?? 8787);
const FILE = "node_modules/.cache/dev-auth.json";

interface Data {
  users: Record<string, User>;
  sessions: Record<string, Session>;
}

const data: Data = existsSync(FILE) ? JSON.parse(readFileSync(FILE, "utf8")) : { users: {}, sessions: {} };
const save = () => {
  mkdirSync(dirname(FILE), { recursive: true });
  writeFileSync(FILE, JSON.stringify(data, null, 2));
};

const store: AuthStore = {
  async createUser(user) {
    if (data.users[user.email]) return "email-taken";
    if (Object.values(data.users).some((u) => u.manager === user.manager)) return "manager-taken";
    data.users[user.email] = user;
    save();
    return "ok";
  },
  async getUser(email) {
    return data.users[email] ?? null;
  },
  async putSession(hash, session) {
    data.sessions[hash] = session;
    save();
  },
  async getSession(hash) {
    return data.sessions[hash] ?? null;
  },
  async deleteSession(hash) {
    delete data.sessions[hash];
    save();
  },
};

createServer(async (req, res) => {
  const chunks: Buffer[] = [];
  for await (const chunk of req) chunks.push(chunk as Buffer);
  const url = new URL(req.url ?? "/", "http://localhost");

  const result = await route(store, {
    rawPath: url.pathname,
    headers: { "content-type": req.headers["content-type"], cookie: req.headers.cookie },
    body: chunks.length ? Buffer.concat(chunks).toString("utf8") : undefined,
    requestContext: { http: { method: req.method ?? "GET" } },
  });

  res.writeHead(result.statusCode, {
    ...result.headers,
    // Plain http://localhost: drop `Secure` so every browser keeps the cookie.
    ...(result.cookies ? { "set-cookie": result.cookies.map((c) => c.replace("; Secure", "")) } : {}),
  });
  res.end(result.body);
}).listen(PORT, () => console.log(`Dev auth server on http://localhost:${PORT}`));
