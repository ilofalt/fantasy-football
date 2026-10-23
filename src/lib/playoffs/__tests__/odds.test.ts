import { mulberry32, pct, playoffOdds, teamModel } from "../odds";
import type { StandingRow } from "../seed";

const row = (manager: string, wins: number, losses: number, pointsFor: number): StandingRow => ({
  manager, wins, losses, ties: 0, pointsFor, pointsAgainst: 0, streak: "",
});

describe("playoff odds", () => {
  it("is deterministic for a seed", () => {
    const a = mulberry32(7);
    const b = mulberry32(7);
    expect([a(), a(), a()]).toEqual([b(), b(), b()]);
  });

  it("shrinks team means toward the league mean", () => {
    const m = teamModel({ A: [120, 120], B: [80, 80] }, 2);
    expect(m.leagueMean).toBe(100);
    expect(m.means.A).toBe(110);
    expect(m.means.B).toBe(90);
  });

  it("locks in teams that have clinched and sums seeds correctly", () => {
    const names = ["A", "B", "C", "D", "E", "F", "G", "H"];
    const standings = names.map((n, i) => row(n, 7 - i, i, 700 - i * 10));
    const scores = Object.fromEntries(names.map((n, i) => [n, [110 - i * 3, 105 - i * 3, 100 - i * 3]]));
    const schedule = [{ week: 8, games: [["A", "H"], ["B", "G"], ["C", "F"], ["D", "E"]] as [string, string][] }];
    const odds = playoffOdds({ standings, scores, schedule, sims: 2000 });
    const by = Object.fromEntries(odds.map((o) => [o.manager, o]));
    expect(by.A.playoffs).toBe(1);
    expect(by.A.bye).toBe(1);
    expect(by.H.playoffs).toBe(0);
    // Six playoff spots, two byes, one champion, one last place per sim.
    const sum = (k: "playoffs" | "bye" | "title" | "lastPlace" | "firstSeed") => odds.reduce((s, o) => s + o[k], 0);
    expect(sum("playoffs")).toBeCloseTo(6);
    expect(sum("bye")).toBeCloseTo(2);
    expect(sum("title")).toBeCloseTo(1);
    expect(sum("lastPlace")).toBeCloseTo(1);
    expect(sum("firstSeed")).toBeCloseTo(1);
    expect(by.A.title).toBeGreaterThan(by.F.title);
    expect(by.A.avgWins).toBeGreaterThanOrEqual(7);
  });

  it("formats percentages without fake certainty", () => {
    expect(pct(0)).toBe("0%");
    expect(pct(0.001)).toBe("<1%");
    expect(pct(0.42)).toBe("42%");
    expect(pct(0.999)).toBe(">99%");
    expect(pct(1)).toBe("100%");
  });
});
