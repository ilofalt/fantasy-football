import { createServer } from "node:http";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";
import { route } from "../lambda/auth/handler";
import { createMemoryStore, type MemoryData } from "../lambda/auth/memory";

// Local stand-in for the auth Lambda + DynamoDB: same request handling, with
// accounts and bets kept in a JSON file so they survive restarts. `next dev`
// proxies /api/* here (see next.config.mjs).

const PORT = Number(process.env.AUTH_PORT ?? 8787);
const FILE = "node_modules/.cache/dev-auth.json";

const data: MemoryData = existsSync(FILE)
  ? JSON.parse(readFileSync(FILE, "utf8"))
  : { users: {}, sessions: {}, bets: {} };

const store = createMemoryStore(data, (d) => {
  mkdirSync(dirname(FILE), { recursive: true });
  writeFileSync(FILE, JSON.stringify(d, null, 2));
});

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
