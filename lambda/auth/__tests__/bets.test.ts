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

  it("lets another manager accept once, taking the opposite team", async () => {
    const { store, nicholas, andrew, isaiah } = await setup();
    const [{ id }] = bets(await call(store, "POST", "/api/bets", matchup, nicholas));

    expect((await call(store, "POST", `/api/bets/${id}/accept`, { seen: 5 }, nicholas)).statusCode).toBe(400);

    const matched = await call(store, "POST", `/api/bets/${id}/accept`, { seen: 5 }, andrew);
    expect(bets(matched)[0]).toMatchObject({ status: "matched", taker: "Andrew" });
    expect(opposingTeam(bets(matched)[0])).toBe("Nicholas");

    expect((await call(store, "POST", `/api/bets/${id}/accept`, { seen: 5 }, isaiah)).statusCode).toBe(409);
  });

  it("lets the bettor withdraw an open bet, but not someone else", async () => {
    const { store, nicholas, andrew } = await setup();
    const [{ id }] = bets(await call(store, "POST", "/api/bets", matchup, nicholas));
    expect((await call(store, "POST", `/api/bets/${id}/cancel`, {}, andrew)).statusCode).toBe(403);
    const cancelled = await call(store, "POST", `/api/bets/${id}/cancel`, {}, nicholas);
    expect(bets(cancelled)[0].status).toBe("cancelled");
    expect((await call(store, "POST", `/api/bets/${id}/accept`, { seen: 5 }, andrew)).statusCode).toBe(409);
  });

  it("only the commissioner settles, and the right manager wins", async () => {
    const { store, nicholas, andrew, isaiah } = await setup();
    const [{ id }] = bets(await call(store, "POST", "/api/bets", matchup, nicholas)); // Nicholas backs Isaiah
    await call(store, "POST", `/api/bets/${id}/accept`, { seen: 5 }, andrew); // Andrew backs Nicholas

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

    await call(store, "POST", `/api/bets/${id}/accept`, { seen: 5 }, andrew);
    expect((await call(store, "POST", `/api/bets/${id}/cancel`, {}, nicholas)).statusCode).toBe(403);
    expect(bets(await call(store, "POST", `/api/bets/${id}/cancel`, {}, isaiah))[0].status).toBe("cancelled");
  });

  describe("counters", () => {
    const counter = (store: Store, id: string, amount: number, seen: number, cookie: string) =>
      call(store, "POST", `/api/bets/${id}/counter`, { amount, seen }, cookie);

    async function open() {
      const ctx = await setup();
      const [{ id }] = bets(await call(ctx.store, "POST", "/api/bets", matchup, ctx.nicholas)); // Nicholas, 5 on Isaiah
      return { ...ctx, id };
    }

    it("locks the bet to the two managers once it's countered", async () => {
      const { store, id, nicholas, andrew, isaiah } = await open();
      const res = await counter(store, id, 20, 5, andrew);
      expect(bets(res)[0]).toMatchObject({ status: "countered", amount: 20, taker: "Andrew", offeredBy: "Andrew", bettor: "Nicholas" });

      // A third manager is shut out, even with the right amount in hand.
      const third = await call(store, "POST", `/api/bets/${id}/accept`, { seen: 20 }, isaiah);
      expect(third.statusCode).toBe(403);
      expect(JSON.parse(third.body).error).toContain("between Nicholas and Andrew");
      expect((await counter(store, id, 7, 20, isaiah)).statusCode).toBe(403);

      // Andrew made the offer, so only Nicholas can answer it.
      expect((await call(store, "POST", `/api/bets/${id}/accept`, { seen: 20 }, andrew)).statusCode).toBe(403);
      expect((await counter(store, id, 7, 20, andrew)).statusCode).toBe(403);
      expect((await call(store, "POST", `/api/bets/${id}/accept`, { seen: 20 }, nicholas)).statusCode).toBe(200);
    });

    it("lets them trade offers, higher or lower, until one accepts at the amount on the table", async () => {
      const { store, id, nicholas, andrew } = await open();
      await counter(store, id, 20, 5, andrew);
      const back = await counter(store, id, 12, 20, nicholas);
      expect(bets(back)[0]).toMatchObject({ status: "countered", amount: 12, offeredBy: "Nicholas", taker: "Andrew" });
      const lower = await counter(store, id, 3, 12, andrew);
      expect(bets(lower)[0]).toMatchObject({ amount: 3, offeredBy: "Andrew" });

      const accepted = await call(store, "POST", `/api/bets/${id}/accept`, { seen: 3 }, nicholas);
      expect(bets(accepted)[0]).toMatchObject({ status: "matched", amount: 3, bettor: "Nicholas", taker: "Andrew" });
    });

    it("rejects an accept or counter made against a stale amount", async () => {
      const { store, id, nicholas, andrew } = await open();
      await counter(store, id, 20, 5, andrew);
      await counter(store, id, 12, 20, nicholas);
      // Andrew is still looking at Nicholas's old 5, or his own 20.
      expect((await call(store, "POST", `/api/bets/${id}/accept`, { seen: 5 }, andrew)).statusCode).toBe(409);
      expect((await call(store, "POST", `/api/bets/${id}/accept`, { seen: 20 }, andrew)).statusCode).toBe(409);
      expect((await counter(store, id, 8, 20, andrew)).statusCode).toBe(409);
    });

    it("needs a different, valid amount", async () => {
      const { store, id, andrew } = await open();
      expect((await counter(store, id, 5, 5, andrew)).statusCode).toBe(400);
      expect((await counter(store, id, 0, 5, andrew)).statusCode).toBe(400);
      expect((await counter(store, id, 2.5, 5, andrew)).statusCode).toBe(400);
      expect((await counter(store, id, 5000, 5, andrew)).statusCode).toBe(400);
      expect(bets(await call(store, "GET", "/api/bets", undefined, andrew))[0].status).toBe("open");
    });

    it("won't let the bettor counter their own open bet", async () => {
      const { store, id, nicholas } = await open();
      expect((await counter(store, id, 9, 5, nicholas)).statusCode).toBe(400);
    });

    it("lets either side walk away from a countered bet, but nobody else", async () => {
      const { store, id, nicholas, andrew, isaiah } = await open();
      await counter(store, id, 20, 5, andrew);
      const third = await signUp(store, "Daniel");
      expect((await call(store, "POST", `/api/bets/${id}/cancel`, {}, third)).statusCode).toBe(403);
      expect(bets(await call(store, "POST", `/api/bets/${id}/cancel`, {}, andrew))[0].status).toBe("cancelled");

      const again = bets(await call(store, "POST", "/api/bets", matchup, nicholas)).find((b) => b.status === "open")!;
      await counter(store, again.id, 9, 5, andrew);
      expect(bets(await call(store, "POST", `/api/bets/${again.id}/cancel`, {}, nicholas)).find((b) => b.id === again.id)!.status).toBe("cancelled");

      const third2 = bets(await call(store, "POST", "/api/bets", matchup, nicholas)).find((b) => b.status === "open")!;
      await counter(store, third2.id, 9, 5, andrew);
      expect((await call(store, "POST", `/api/bets/${third2.id}/cancel`, {}, isaiah)).statusCode).toBe(200); // commissioner voids
    });

    it("only counts a countered bet against whoever made the offer", async () => {
      const { store, id, nicholas, andrew } = await open();
      const after = bets(await counter(store, id, 20, 5, andrew));
      expect(faabOnTheLine(after, "Andrew")).toBe(20);
      expect(faabOnTheLine(after, "Nicholas")).toBe(0);
      const back = bets(await counter(store, id, 12, 20, nicholas));
      expect(faabOnTheLine(back, "Nicholas")).toBe(12);
      expect(faabOnTheLine(back, "Andrew")).toBe(0);
    });
  });

  it("counts FAAB on the line for open and matched bets", async () => {
    const { store, nicholas, andrew } = await setup();
    const [{ id }] = bets(await call(store, "POST", "/api/bets", matchup, nicholas));
    expect(faabOnTheLine(bets(await call(store, "GET", "/api/bets", undefined, andrew)), "Nicholas")).toBe(5);
    expect(faabOnTheLine(bets(await call(store, "GET", "/api/bets", undefined, andrew)), "Andrew")).toBe(0);
    const matched = bets(await call(store, "POST", `/api/bets/${id}/accept`, { seen: 5 }, andrew));
    expect(faabOnTheLine(matched, "Andrew")).toBe(5);
    expect(faabOnTheLine(matched, "Nicholas")).toBe(5);
  });
});
