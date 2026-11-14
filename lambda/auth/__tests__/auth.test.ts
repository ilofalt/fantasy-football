/** @jest-environment node */
import { MANAGER_NAMES, SESSION_SECONDS } from "../core";
import { COOKIE_NAME, route } from "../handler";
import { createMemoryStore as memoryStore } from "../memory";

const post = (path: string, body: unknown, cookie?: string) => ({
  rawPath: path,
  headers: { "content-type": "application/json" },
  cookies: cookie ? [cookie] : undefined,
  body: JSON.stringify(body),
  requestContext: { http: { method: "POST" } },
});
const get = (path: string, cookie?: string) => ({
  rawPath: path,
  cookies: cookie ? [cookie] : undefined,
  requestContext: { http: { method: "GET" } },
});
const cookieOf = (res: { cookies?: string[] }) => res.cookies?.[0].split(";")[0];

const account = { email: "Ethan@Example.com", password: "pw12", manager: MANAGER_NAMES[0] };

describe("auth", () => {
  it("signs up, remembers the session, and identifies the manager", async () => {
    const store = memoryStore();
    const res = await route(store, post("/api/auth/signup", account));
    expect(res.statusCode).toBe(200);
    expect(JSON.parse(res.body).user).toEqual({ email: "ethan@example.com", manager: account.manager });

    const setCookie = res.cookies![0];
    expect(setCookie).toContain(`${COOKIE_NAME}=`);
    expect(setCookie).toContain("HttpOnly");
    expect(setCookie).toContain("Secure");
    expect(setCookie).toContain(`Max-Age=${SESSION_SECONDS}`);

    const who = await route(store, get("/api/auth/me", cookieOf(res)));
    expect(JSON.parse(who.body).user.manager).toBe(account.manager);
  });

  it("is logged out without a valid cookie", async () => {
    const store = memoryStore();
    expect(JSON.parse((await route(store, get("/api/auth/me"))).body).user).toBeNull();
    const bogus = await route(store, get("/api/auth/me", `${COOKIE_NAME}=nope`));
    expect(JSON.parse(bogus.body).user).toBeNull();
  });

  it("logs in with a case-insensitive email and rejects a wrong password", async () => {
    const store = memoryStore();
    await route(store, post("/api/auth/signup", account));
    const ok = await route(store, post("/api/auth/login", { email: " ETHAN@example.com ", password: "pw12" }));
    expect(ok.statusCode).toBe(200);
    const bad = await route(store, post("/api/auth/login", { email: account.email, password: "wrong" }));
    expect(bad.statusCode).toBe(401);
    const unknown = await route(store, post("/api/auth/login", { email: "x@y.co", password: "pw12" }));
    expect(unknown.statusCode).toBe(401);
    expect(unknown.body).toBe(bad.body);
  });

  it("allows one account per email and per manager", async () => {
    const store = memoryStore();
    await route(store, post("/api/auth/signup", account));
    const sameEmail = await route(store, post("/api/auth/signup", { ...account, manager: MANAGER_NAMES[1] }));
    expect(sameEmail.statusCode).toBe(409);
    const sameManager = await route(store, post("/api/auth/signup", { ...account, email: "other@example.com" }));
    expect(sameManager.statusCode).toBe(409);
    expect(JSON.parse(sameManager.body).error).toContain(account.manager);
  });

  it("caps accounts at 12, one per manager", async () => {
    const store = memoryStore();
    expect(MANAGER_NAMES).toHaveLength(12);
    for (const [i, manager] of MANAGER_NAMES.entries()) {
      const res = await route(store, post("/api/auth/signup", { email: `m${i}@example.com`, password: "pw12", manager }));
      expect(res.statusCode).toBe(200);
    }
    for (const manager of [...MANAGER_NAMES, "Thirteenth"]) {
      const res = await route(store, post("/api/auth/signup", { email: "extra@example.com", password: "pw12", manager }));
      expect(res.statusCode).toBeGreaterThanOrEqual(400);
    }
  });

  it("validates sign-up fields", async () => {
    const store = memoryStore();
    for (const bad of [
      { ...account, email: "not-an-email" },
      { ...account, password: "abc" },
      { ...account, manager: "Nobody" },
    ]) {
      expect((await route(store, post("/api/auth/signup", bad))).statusCode).toBe(400);
    }
  });

  it("logs out by deleting the session and clearing the cookie", async () => {
    const store = memoryStore();
    const signedIn = await route(store, post("/api/auth/signup", account));
    const cookie = cookieOf(signedIn);
    const out = await route(store, post("/api/auth/logout", {}, cookie));
    expect(out.cookies![0]).toContain("Max-Age=0");
    expect(JSON.parse((await route(store, get("/api/auth/me", cookie))).body).user).toBeNull();
  });

  it("rejects non-JSON posts and unknown routes", async () => {
    const store = memoryStore();
    const form = { ...post("/api/auth/login", {}), headers: { "content-type": "text/plain" } };
    expect((await route(store, form)).statusCode).toBe(415);
    expect((await route(store, get("/api/auth/nope"))).statusCode).toBe(404);
  });
});
