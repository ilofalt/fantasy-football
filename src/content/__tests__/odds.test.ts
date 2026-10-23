import { history } from "../history";
import { odds, seasonScores } from "../odds";
import { REMAINING_SCHEDULE } from "../schedule";
import { standings, STANDINGS_THROUGH_WEEK, REGULAR_SEASON_WEEKS } from "../standings";

describe("league history and odds content", () => {
  it("matches the standings for the current season", () => {
    for (const row of standings) {
      const scores = seasonScores[row.manager];
      expect(scores).toHaveLength(STANDINGS_THROUGH_WEEK);
      expect(scores.reduce((s, x) => s + x, 0)).toBeCloseTo(row.pointsFor, 1);
    }
  });

  it("uses only real names, never team names", () => {
    const names = new Set(history.games.flatMap((g) => [g.a, g.b]));
    for (const n of names) expect(n).toMatch(/^[A-Za-z]+$/);
  });

  it("schedules every manager once per remaining week", () => {
    expect(REMAINING_SCHEDULE.map((w) => w.week)).toEqual(
      Array.from({ length: REGULAR_SEASON_WEEKS - STANDINGS_THROUGH_WEEK }, (_, i) => STANDINGS_THROUGH_WEEK + 1 + i)
    );
    const managers = standings.map((s) => s.manager).sort();
    for (const w of REMAINING_SCHEDULE) expect(w.games.flat().sort()).toEqual(managers);
  });

  it("has sensible odds for every manager", () => {
    expect(odds).toHaveLength(12);
    expect(odds.reduce((s, o) => s + o.playoffs, 0)).toBeCloseTo(6);
    expect(odds.reduce((s, o) => s + o.title, 0)).toBeCloseTo(1);
  });
});
