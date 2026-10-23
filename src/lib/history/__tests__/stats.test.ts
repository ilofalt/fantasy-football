import type { History } from "../types";
import {
  allManagers,
  bestAndWorstWeek,
  currentStreak,
  headToHead,
  longestStreak,
  managerGames,
  nemesisAndVictim,
  opponents,
  recordText,
  rivalries,
  seasonLines,
  tally,
  winPct,
} from "../stats";

const g = (year: number, week: number, a: string, aScore: number, b: string, bScore: number, type: "regular" | "playoff" | "consolation" = "regular") => ({
  year, week, a, aScore, b, bScore, type,
});

const history: History = {
  updated: "test",
  seasons: [
    { year: 2024, finish: ["Ann", "Bob", "Cal", "Old"] },
    { year: 2025, finish: null },
  ],
  games: [
    g(2024, 1, "Ann", 100, "Bob", 90),
    g(2024, 1, "Cal", 80, "Old", 70),
    g(2024, 2, "Bob", 120, "Ann", 110),
    g(2024, 2, "Old", 95, "Cal", 60),
    g(2024, 3, "Ann", 130, "Cal", 70),
    g(2024, 3, "Bob", 85, "Old", 80),
    g(2024, 4, "Ann", 105, "Bob", 100, "playoff"),
    g(2024, 4, "Cal", 88, "Old", 77, "consolation"),
    g(2025, 1, "Ann", 90, "Bob", 99),
    g(2025, 1, "Cal", 100, "Dee", 100),
  ],
};

describe("history stats", () => {
  it("lists a manager's games from their side, oldest first", () => {
    const games = managerGames(history, "Bob");
    expect(games.map((x) => [x.year, x.week, x.opponent, x.pf, x.pa, x.result])).toEqual([
      [2024, 1, "Ann", 90, 100, "L"],
      [2024, 2, "Ann", 120, 110, "W"],
      [2024, 3, "Old", 85, 80, "W"],
      [2024, 4, "Ann", 100, 105, "L"],
      [2025, 1, "Ann", 99, 90, "W"],
    ]);
    expect(managerGames(history, "Bob", ["regular"])).toHaveLength(4);
  });

  it("tallies records, ties, and win percentage", () => {
    const r = tally(managerGames(history, "Cal"));
    expect(r).toMatchObject({ wins: 2, losses: 2, ties: 1, games: 5 });
    expect(recordText(r)).toBe("2-2-1");
    expect(winPct(r)).toBeCloseTo(0.5);
    expect(recordText(tally(managerGames(history, "Ann")))).toBe("3-2");
  });

  it("splits current and former managers", () => {
    expect(allManagers(history)).toEqual({ current: ["Ann", "Bob", "Cal", "Dee"], former: ["Old"] });
  });

  it("builds season lines with finish, titles, and playoff trips", () => {
    const [y24, y25] = seasonLines(history, "Ann");
    expect(y24).toMatchObject({ year: 2024, finish: 1, teams: 4, champion: true, lastPlace: false, madePlayoffs: true });
    expect(recordText(y24.record)).toBe("2-1");
    expect(y25).toMatchObject({ year: 2025, finish: null, champion: false });
    expect(seasonLines(history, "Old")[0]).toMatchObject({ lastPlace: true, madePlayoffs: false });
    expect(seasonLines(history, "Old")).toHaveLength(1);
  });

  it("computes head-to-head with a regular/postseason split", () => {
    const h = headToHead(history, "Ann", "Bob");
    expect(recordText(h.overall)).toBe("2-2");
    expect(recordText(h.regular)).toBe("1-2");
    expect(recordText(h.postseason)).toBe("1-0");
    expect(currentStreak(h.games)).toBe("L1");
  });

  it("finds streaks", () => {
    const games = managerGames(history, "Ann");
    expect(longestStreak(games, "W")).toBe(2);
    expect(longestStreak(games, "L")).toBe(1);
    expect(currentStreak([])).toBeNull();
  });

  it("finds opponents, nemesis, and favorite victim", () => {
    expect(opponents(history, "Ann")[0].opponent).toBe("Bob");
    const { nemesis, victim } = nemesisAndVictim(history, "Ann", 1);
    expect(nemesis).toBeNull(); // 2-2 vs Bob isn't a losing record
    expect(victim?.opponent).toBe("Cal");
    expect(nemesisAndVictim(history, "Cal", 1).nemesis?.opponent).toBe("Ann");
  });

  it("finds best and worst weeks", () => {
    const { best, worst } = bestAndWorstWeek(history, "Ann");
    expect(best?.pf).toBe(130);
    expect(worst?.pf).toBe(90);
  });

  it("lists every pairing once with margins", () => {
    const all = rivalries(history);
    const annBob = all.find((r) => r.a === "Ann" && r.b === "Bob");
    expect(annBob?.h2h.games).toHaveLength(4);
    expect(annBob?.avgMargin).toBeCloseTo((10 + 10 + 5 + 9) / 4);
    expect(all.filter((r) => [r.a, r.b].includes("Ann") && [r.a, r.b].includes("Bob"))).toHaveLength(1);
    expect(rivalries(history, 3).map((r) => `${r.a}-${r.b}`)).toEqual(["Ann-Bob", "Cal-Old"]);
  });
});
