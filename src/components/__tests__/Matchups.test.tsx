import { renderWithTheme, screen, within } from "@/test-utils";
import sample from "@/lib/scoreboard/__fixtures__/scoreboard.json";
import Matchups from "../Matchups";

function mockFetch(response: Partial<Response>) {
  global.fetch = jest.fn().mockResolvedValue(response) as jest.Mock;
}

describe("Matchups", () => {
  it("renders every matchup with both teams and their scores", async () => {
    mockFetch({ ok: true, json: async () => sample });
    renderWithTheme(<Matchups />);

    expect(await screen.findByRole("heading", { name: "Week 7 Matchups" })).toBeInTheDocument();

    const cards = screen.getAllByRole("article");
    expect(cards).toHaveLength(sample.matchups.length);

    const first = within(cards[0]);
    expect(first.getByText("Hurts So Good")).toBeInTheDocument();
    expect(first.getByText("Kamara Chameleon")).toBeInTheDocument();
    expect(first.getAllByTestId("team-points").map((el) => el.textContent)).toEqual(["87.34", "79.10"]);
    expect(first.getByText("Live")).toBeInTheDocument();
  });

  it("links the league name to Yahoo", async () => {
    mockFetch({ ok: true, json: async () => sample });
    renderWithTheme(<Matchups />);

    expect(await screen.findByRole("link", { name: "Sample League" })).toHaveAttribute(
      "href",
      sample.leagueUrl
    );
  });

  it("shows a friendly message when the scoreboard can't be loaded", async () => {
    mockFetch({ ok: false, status: 403 });
    renderWithTheme(<Matchups />);

    expect(await screen.findByText(/Matchups aren't available right now/)).toBeInTheDocument();
  });

  it("shows an empty state when there are no matchups", async () => {
    mockFetch({ ok: true, json: async () => ({ ...sample, matchups: [] }) });
    renderWithTheme(<Matchups />);

    expect(await screen.findByText("No matchups this week.")).toBeInTheDocument();
  });
});
