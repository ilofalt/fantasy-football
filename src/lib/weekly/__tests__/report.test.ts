import { buildReport, managerLines, matchupResults, perfectLineup } from "../report";
import type { WeekData, WeeklyPlayer, WeeklyTeam } from "../types";
import { weeklyData } from "@/content/weekly";

const p = (name: string, position: string, slot: string, points: number): WeeklyPlayer => ({
  name,
  position,
  nflTeam: "XX",
  slot,
  points,
  projected: 0,
  statLine: "",
});

const team = (manager: string, players: WeeklyPlayer[], projected = 100): WeeklyTeam => ({
  manager,
  points: Math.round(players.filter((x) => !["BN", "IR"].includes(x.slot)).reduce((s, x) => s + x.points, 0) * 100) / 100,
  projected,
  players,
});

const starters = (pre: string, base: number) => [
  p(`${pre} QB`, "QB", "QB", base + 10),
  p(`${pre} RB1`, "RB", "RB", base),
  p(`${pre} RB2`, "RB", "RB", base),
  p(`${pre} WR1`, "WR", "WR", base),
  p(`${pre} WR2`, "WR", "WR", base),
  p(`${pre} TE`, "TE", "TE", base),
  p(`${pre} FLEX`, "WR", "W/R/T", base),
  p(`${pre} K`, "K", "K", 5),
  p(`${pre} DEF`, "DEF", "DEF", 5),
];

describe("perfectLineup", () => {
  it("swaps in a better bench player, including through the flex, and ignores IR", () => {
    const t = team("A", [
      ...starters("A", 10),
      p("Bench QB", "QB", "BN", 30),
      p("Bench TE", "TE", "BN", 15),
      p("Injured WR", "WR", "IR", 50),
    ]);
    // Bench QB is +10 over the starter and bench TE is +5; the IR player can't be used.
    expect(perfectLineup(t).points).toBe(t.points + 15);
  });

  it("uses a bench RB in the flex", () => {
    const t = team("A", [...starters("A", 10), p("Bench RB", "RB", "BN", 25)]);
    expect(perfectLineup(t).points).toBe(t.points + 15);
  });
});

describe("report awards", () => {
  const week: WeekData = {
    week: 1,
    updated: "2026-01-01",
    matchups: [
      ["Best", "Blowout"],
      ["Close", "Bench"],
    ],
    teams: [
      team("Best", starters("Best", 20), 100),
      team("Blowout", starters("Blowout", 5), 100),
      team("Close", starters("Close", 12), 200),
      team("Bench", [...starters("Bench", 11), p("Bench Star", "WR", "BN", 40)], 50),
    ],
  };

  it("finds the blowout and the narrow victory by percentage margin", () => {
    const results = matchupResults(week);
    expect(results[0].winner.manager).toBe("Best");
    const cards = buildReport(week);
    expect(cards.find((c) => c.id === "biggest-blowout")?.text).toContain("Best beat Blowout");
    expect(cards.find((c) => c.id === "narrow-victory")?.text).toContain("Close beat Bench");
  });

  it("names the worst manager and who they left on the bench", () => {
    const worst = buildReport(week).find((c) => c.id === "worst-manager");
    expect(worst?.kind === "manager" && worst.manager).toBe("Bench");
    expect(worst?.text).toContain("Bench Star");
  });

  it("finds over- and under-achievers against projection", () => {
    const cards = buildReport(week);
    expect(cards.find((c) => c.id === "overachiever")?.text).toContain("Bench beat their projection");
    expect(cards.find((c) => c.id === "below-expectation")?.text).toContain("Close missed their projection");
  });

  it("finds the best benchwarmer by position", () => {
    const wr = buildReport(week).find((c) => c.id === "wr-benchwarmer");
    expect(wr?.kind === "player" && wr.player.name).toBe("Bench Star");
  });
});

describe("weekly data", () => {
  it.each(weeklyData.map((w) => [w.week, w]))("week %s starters add up to each team's score", (_n, week) => {
    for (const line of managerLines(week)) {
      const t = week.teams.find((x) => x.manager === line.manager)!;
      const started = t.players.filter((x) => !["BN", "IR"].includes(x.slot)).reduce((s, x) => s + x.points, 0);
      expect(started).toBeCloseTo(t.points, 1);
    }
  });

  it.each(weeklyData.map((w) => [w.week, w]))("week %s has 12 teams in 6 matchups", (_n, week) => {
    expect(week.teams).toHaveLength(12);
    expect(week.matchups).toHaveLength(6);
    const names = new Set(week.teams.map((t) => t.manager));
    for (const [a, b] of week.matchups) {
      expect(names.has(a) && names.has(b)).toBe(true);
    }
  });
});
