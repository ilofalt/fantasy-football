import { lineupRows, type RosterPlayer, type RosterTeam } from "../types";
import { currentMatchups } from "@/content/matchups";
import { ordinal, shortName } from "@/components/MatchupDetail";

const p = (slot: string, name: string): RosterPlayer => ({
  slot,
  name,
  position: "RB",
  nflTeam: "XX",
  projected: 10,
  game: "Sun",
  imageUrl: null,
});
const team = (players: RosterPlayer[]): RosterTeam => ({
  manager: "M",
  record: "0-0",
  rank: 1,
  logoUrl: null,
  projected: 0,
  players,
});

describe("lineupRows", () => {
  it("pairs starters slot by slot, leaving gaps for empty slots", () => {
    const a = team([p("QB", "A QB"), p("RB", "A RB1"), p("RB", "A RB2"), p("W/R/T", "A Flex")]);
    const b = team([p("RB", "B RB1"), p("QB", "B QB")]);
    const { starters } = lineupRows(a, b);
    expect(starters.map((r) => [r.slot, r.left?.name ?? null, r.right?.name ?? null])).toEqual([
      ["QB", "A QB", "B QB"],
      ["RB", "A RB1", "B RB1"],
      ["RB", "A RB2", null],
      ["WR", null, null],
      ["WR", null, null],
      ["TE", null, null],
      ["W/R/T", "A Flex", null],
      ["K", null, null],
      ["DEF", null, null],
    ]);
  });

  it("pads the shorter bench", () => {
    const { bench } = lineupRows(team([p("BN", "a1"), p("BN", "a2"), p("IR", "a3")]), team([p("BN", "b1")]));
    expect(bench.map((r) => [r.left?.name ?? null, r.right?.name ?? null])).toEqual([
      ["a1", "b1"],
      ["a2", null],
      ["a3", null],
    ]);
  });
});

describe("ordinal", () => {
  it.each([
    [1, "1st"],
    [2, "2nd"],
    [3, "3rd"],
    [4, "4th"],
    [11, "11th"],
    [12, "12th"],
    [13, "13th"],
    [21, "21st"],
  ])("%i is %s", (n, s) => expect(ordinal(n)).toBe(s));
});

describe("current matchups data", () => {
  it("has six matchups with twelve different managers", () => {
    expect(currentMatchups.matchups).toHaveLength(6);
    const managers = currentMatchups.matchups.flatMap((m) => m.teams.map((t) => t.manager));
    expect(new Set(managers).size).toBe(12);
  });

  it("projects each team's total as the sum of its starters", () => {
    for (const m of currentMatchups.matchups) {
      for (const t of m.teams) {
        const starters = t.players.filter((x) => x.slot !== "BN" && x.slot !== "IR");
        expect(starters.reduce((s, x) => s + x.projected, 0)).toBeCloseTo(t.projected, 1);
      }
    }
  });

  it("doesn't leak Thursday night results", () => {
    const games = currentMatchups.matchups.flatMap((m) => m.teams.flatMap((t) => t.players.map((x) => x.game)));
    expect(games.some((g) => /^Final/.test(g))).toBe(false);
  });
});

describe("shortName", () => {
  it("abbreviates the first name", () => {
    expect(shortName({ name: "Amon-Ra St. Brown", position: "WR" })).toBe("A. St. Brown");
    expect(shortName({ name: "Geno Smith", position: "QB" })).toBe("G. Smith");
  });

  it("leaves defenses and one-word names alone", () => {
    expect(shortName({ name: "Texans", position: "DEF" })).toBe("Texans");
    expect(shortName({ name: "Cher", position: "WR" })).toBe("Cher");
  });
});
