import raw from "../__fixtures__/yahoo-scoreboard.json";
import expected from "../__fixtures__/scoreboard.json";
import { normalizeScoreboard } from "../normalize";

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- poking at Yahoo's loosely-shaped JSON
const clone = (): any => JSON.parse(JSON.stringify(raw));

describe("normalizeScoreboard", () => {
  it("turns Yahoo's scoreboard response into the simplified shape", () => {
    expect(normalizeScoreboard(raw, expected.updatedAt)).toEqual(expected);
  });

  it("maps Yahoo matchup statuses", () => {
    const withStatus = (status: string) => {
      const copy = clone();
      copy.fantasy_content.league[1].scoreboard[0].matchups[0].matchup.status = status;
      return normalizeScoreboard(copy, "").matchups[0].status;
    };

    expect(withStatus("preevent")).toBe("upcoming");
    expect(withStatus("midevent")).toBe("live");
    expect(withStatus("postevent")).toBe("final");
  });

  it("picks up the team logo", () => {
    const copy = clone();
    const meta = copy.fantasy_content.league[1].scoreboard[0].matchups[0].matchup[0].teams[0].team[0];
    meta.push({
      team_logos: [{ team_logo: { size: "large", url: "https://example.com/logo.png" } }],
    });

    expect(normalizeScoreboard(copy, "").matchups[0].teams[0].logoUrl).toBe(
      "https://example.com/logo.png"
    );
  });

  it("tolerates teams with no logo, manager, or projections", () => {
    const copy = clone();
    copy.fantasy_content.league[1].scoreboard[0].matchups[0].matchup[0].teams[0].team = [
      [{ team_key: "461.l.12345.t.1" }, [], { name: "Bare Team" }],
      { team_points: { total: "0" } },
    ];

    expect(normalizeScoreboard(copy, "").matchups[0].teams[0]).toEqual({
      key: "461.l.12345.t.1",
      name: "Bare Team",
      manager: null,
      logoUrl: null,
      points: 0,
      projectedPoints: null,
      winProbability: null,
    });
  });

  it("rejects a response that isn't a league scoreboard", () => {
    expect(() => normalizeScoreboard({ error: "nope" }, "")).toThrow(/fantasy_content\.league/);
  });
});
