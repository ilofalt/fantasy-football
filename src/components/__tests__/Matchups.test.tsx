import { renderWithTheme, screen, within } from "@/test-utils";
import sample from "@/lib/scoreboard/__fixtures__/scoreboard.json";
import { fireEvent } from "@testing-library/react";
import Matchups from "../Matchups";
import { currentMatchups } from "@/content/matchups";

function mockFetch(response: Partial<Response>) {
  global.fetch = jest.fn().mockResolvedValue(response) as jest.Mock;
}

describe("Matchups (live scoreboard)", () => {
  it("renders every matchup with both managers' real names and their scores", async () => {
    mockFetch({ ok: true, json: async () => sample });
    renderWithTheme(<Matchups snapshot={null} />);

    expect(await screen.findByRole("heading", { name: "Week 7 Matchups" })).toBeInTheDocument();

    const cards = screen.getAllByRole("article");
    expect(cards).toHaveLength(sample.matchups.length);

    const first = within(cards[0]);
    // Names come from the team key (t.1 is Isaiah, t.2 is Nicholas), never the Yahoo team name.
    expect(first.getByText("Isaiah")).toBeInTheDocument();
    expect(first.getByText("Nicholas")).toBeInTheDocument();
    expect(first.getAllByTestId("team-points").map((el) => el.textContent)).toEqual(["87.34", "79.10"]);
    expect(first.getByText("Live")).toBeInTheDocument();
  });

  it("never shows Yahoo team names", async () => {
    mockFetch({ ok: true, json: async () => sample });
    renderWithTheme(<Matchups snapshot={null} />);
    await screen.findByRole("heading", { name: "Week 7 Matchups" });
    for (const m of sample.matchups) {
      for (const t of m.teams) expect(screen.queryByText(t.name)).toBeNull();
    }
  });

  it("links the league name to Yahoo", async () => {
    mockFetch({ ok: true, json: async () => sample });
    renderWithTheme(<Matchups snapshot={null} />);

    expect(await screen.findByRole("link", { name: "Sample League" })).toHaveAttribute(
      "href",
      sample.leagueUrl
    );
  });

  it("shows a friendly message when the scoreboard can't be loaded", async () => {
    mockFetch({ ok: false, status: 403 });
    renderWithTheme(<Matchups snapshot={null} />);

    expect(await screen.findByText(/Matchups aren't available right now/)).toBeInTheDocument();
  });

  it("shows an empty state when there are no matchups", async () => {
    mockFetch({ ok: true, json: async () => ({ ...sample, matchups: [] }) });
    renderWithTheme(<Matchups snapshot={null} />);

    expect(await screen.findByText("No matchups this week.")).toBeInTheDocument();
  });
});

describe("Matchups (weekly snapshot with rosters)", () => {
  beforeEach(() => window.history.replaceState(null, "", "/"));

  it("shows the snapshot's matchups as upcoming, with projections and no live points", async () => {
    mockFetch({ ok: true, json: async () => ({ ...sample, week: currentMatchups.week - 1 }) });
    renderWithTheme(<Matchups />);
    expect(await screen.findByRole("heading", { name: `Week ${currentMatchups.week} Matchups` })).toBeInTheDocument();
    const cards = screen.getAllByRole("article");
    expect(cards).toHaveLength(currentMatchups.matchups.length);
    const [a, b] = currentMatchups.matchups[0].teams;
    const first = within(cards[0]);
    expect(first.getByText(a.manager)).toBeInTheDocument();
    expect(first.getByText(b.manager)).toBeInTheDocument();
    expect(first.getAllByTestId("team-points").map((el) => el.textContent)).toEqual([
      a.projected.toFixed(2),
      b.projected.toFixed(2),
    ]);
    expect(first.getAllByText("Upcoming")).toHaveLength(1);
  });

  it("prefers the live scoreboard when it's for a newer week", async () => {
    mockFetch({ ok: true, json: async () => ({ ...sample, week: currentMatchups.week + 1 }) });
    renderWithTheme(<Matchups />);
    expect(await screen.findByRole("heading", { name: `Week ${currentMatchups.week + 1} Matchups` })).toBeInTheDocument();
    expect(screen.getAllByText("Isaiah").length).toBeGreaterThan(0);
  });

  it("opens a matchup's lineups with photos and player headshots when clicked", async () => {
    mockFetch({ ok: false, status: 404 });
    renderWithTheme(<Matchups />);
    const m = currentMatchups.matchups[0];
    const [a, b] = m.teams;
    fireEvent.click(screen.getByRole("button", { name: `View lineups: ${a.manager} vs. ${b.manager}` }));

    const dialog = await screen.findByRole("dialog");
    expect(within(dialog).getByRole("heading", { name: `Week ${currentMatchups.week}: ${a.manager} vs. ${b.manager}` })).toBeInTheDocument();
    expect(within(dialog).getByRole("img", { name: a.manager })).toBeInTheDocument();
    const qb = a.players.find((p) => p.slot === "QB")!;
    if (qb.imageUrl) expect(within(dialog).getByRole("img", { name: qb.name })).toHaveAttribute("src", qb.imageUrl);
    expect(within(within(dialog).getByRole("list", { name: "Starters" })).getAllByRole("listitem")).toHaveLength(9);
    expect(window.location.hash).toBe(`#matchups/${m.id}`);
  });

  it("opens a matchup from a deep link", async () => {
    mockFetch({ ok: false, status: 404 });
    const m = currentMatchups.matchups[2];
    window.history.replaceState(null, "", `/#matchups/${m.id}`);
    renderWithTheme(<Matchups />);
    const dialog = await screen.findByRole("dialog");
    expect(within(dialog).getByRole("heading", { name: new RegExp(`${m.teams[0].manager} vs. ${m.teams[1].manager}`) })).toBeInTheDocument();
  });
});
