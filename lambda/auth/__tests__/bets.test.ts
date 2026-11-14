/** @jest-environment node */
import { COMMISSIONER } from "../../../src/content/managers";
import { type Bet, faabOnTheLine, opposingTeam, settledNet } from "../../../src/lib/bets/types";
import { route } from "../handler";
import { createMemoryStore } from "../memory";

type Store = ReturnType<typeof createMemoryStore>;

const call = (store: Store, method: string, path: string, body?: unknown, cookie?: string) =>
  route(store, {
    rawPath: path,
    headers: { "content-type": "application/json" },
    cookies: cookie ? [cookie] : undefined,
    body: body === undefined ? undefined : JSON.stringify(body),
    requestContext: { http: { method } },
  });

async function signUp(store: Store, manager: string) {
  const res = await call(store, "POST", "/api/auth/signup", {
    email: `${manager}@example.com`,
    password: "pw12",
    manager,
  });
  return res.cookies![0].split(";")[0];
}

const bets = (res: { body: string }): Bet[] => JSON.parse(res.body).bets;
const matchup = { week: 10, matchupId: "isaiah-vs-nicholas", teams: ["Isaiah", "Nicholas"], pick: "Isaiah", amount: 5 };

async function setup() {
  const store = createMemoryStore();
  const cookies = {
    isaiah: await signUp(store, COMMISSIONER),
    nicholas: await signUp(store, "Nicholas"),
    andrew: await signUp(store, "Andrew"),
  };
  return { store, ...cookies, cookies };
}

describe("sportsbook", () => {
  it("requires login", async () => {
    const { store } = await setup();
    expect((await call(store, "GET", "/api/bets")).statusCode).toBe(401);
    expect((await call(store, "POST", "/api/bets", matchup)).statusCode).toBe(401);
  });

  it("places an open bet that every manager can see", async () => {
    const { store, nicholas, andrew } = await setup();
    const placed = await call(store, "POST", "/api/bets", matchup, nicholas);
    expect(placed.statusCode).toBe(200);
    const [bet] = bets(placed);
    expect(bet).toMatchObject({ bettor: "Nicholas", pick: "Isaiah", amount: 5, status: "open", taker: null });
    expect(bets(await call(store, "GET", "/api/bets", undefined, andrew))).toHaveLength(1);
  });

  it("rejects bad bets", async () => {
    const { store, nicholas } = await setup();
    for (const bad of [
      { ...matchup, amount: 0 },
      { ...matchup, amount: 2.5 },
      { ...matchup, amount: 5000 },
      { ...matchup, pick: "Andrew" },
      { ...matchup, teams: ["Isaiah", "Isaiah"] },
      { ...matchup, teams: ["Isaiah", "Nobody"] },
      { ...matchup, matchupId: "" },
    ]) {
      expect((await call(store, "POST", "/api/bets", bad, nicholas)).statusCode).toBe(400);
    }
  });

  it("lets another manager match once, taking the opposite team", async () => {
    const { store, nicholas, andrew, isaiah } = await setup();
    const [{ id }] = bets(await call(store, "POST", "/api/bets", matchup, nicholas));

    expect((await call(store, "POST", `/api/bets/${id}/match`, {}, nicholas)).statusCode).toBe(400);

    const matched = await call(store, "POST", `/api/bets/${id}/match`, {}, andrew);
    expect(bets(matched)[0]).toMatchObject({ status: "matched", taker: "Andrew" });
    expect(opposingTeam(bets(matched)[0])).toBe("Nicholas");

    expect((await call(store, "POST", `/api/bets/${id}/match`, {}, isaiah)).statusCode).toBe(409);
  });

  it("lets the bettor withdraw an open bet, but not someone else", async () => {
    const { store, nicholas, andrew } = await setup();
    const [{ id }] = bets(await call(store, "POST", "/api/bets", matchup, nicholas));
    expect((await call(store, "POST", `/api/bets/${id}/cancel`, {}, andrew)).statusCode).toBe(403);
    const cancelled = await call(store, "POST", `/api/bets/${id}/cancel`, {}, nicholas);
    expect(bets(cancelled)[0].status).toBe("cancelled");
    expect((await call(store, "POST", `/api/bets/${id}/match`, {}, andrew)).statusCode).toBe(409);
  });

  it("only the commissioner settles, and the right manager wins", async () => {
    const { store, nicholas, andrew, isaiah } = await setup();
    const [{ id }] = bets(await call(store, "POST", "/api/bets", matchup, nicholas)); // Nicholas backs Isaiah
    await call(store, "POST", `/api/bets/${id}/match`, {}, andrew); // Andrew backs Nicholas

    expect((await call(store, "POST", `/api/bets/${id}/settle`, { winner: "Isaiah" }, nicholas)).statusCode).toBe(403);
    expect((await call(store, "POST", `/api/bets/${id}/settle`, { winner: "Andrew" }, isaiah)).statusCode).toBe(400);

    const settled = bets(await call(store, "POST", `/api/bets/${id}/settle`, { winner: "Nicholas" }, isaiah));
    expect(settled[0]).toMatchObject({ status: "settled", winner: "Andrew" });
    expect(settledNet(settled, "Andrew")).toBe(5);
    expect(settledNet(settled, "Nicholas")).toBe(-5);
    expect(faabOnTheLine(settled, "Andrew")).toBe(0);
  });

  it("can't settle an open bet; the commissioner can void a matched one", async () => {
    const { store, nicholas, andrew, isaiah } = await setup();
    const [{ id }] = bets(await call(store, "POST", "/api/bets", matchup, nicholas));
    expect((await call(store, "POST", `/api/bets/${id}/settle`, { winner: "Isaiah" }, isaiah)).statusCode).toBe(409);

    await call(store, "POST", `/api/bets/${id}/match`, {}, andrew);
    expect((await call(store, "POST", `/api/bets/${id}/cancel`, {}, nicholas)).statusCode).toBe(403);
    expect(bets(await call(store, "POST", `/api/bets/${id}/cancel`, {}, isaiah))[0].status).toBe("cancelled");
  });

  it("counts FAAB on the line for open and matched bets", async () => {
    const { store, nicholas, andrew } = await setup();
    const [{ id }] = bets(await call(store, "POST", "/api/bets", matchup, nicholas));
    expect(faabOnTheLine(bets(await call(store, "GET", "/api/bets", undefined, andrew)), "Nicholas")).toBe(5);
    expect(faabOnTheLine(bets(await call(store, "GET", "/api/bets", undefined, andrew)), "Andrew")).toBe(0);
    const matched = bets(await call(store, "POST", `/api/bets/${id}/match`, {}, andrew));
    expect(faabOnTheLine(matched, "Andrew")).toBe(5);
    expect(faabOnTheLine(matched, "Nicholas")).toBe(5);
  });
});
