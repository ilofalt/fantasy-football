import { renderWithTheme, screen, within } from "@/test-utils";
import Playoffs from "../Playoffs";
import { standings } from "@/content/standings";
import { seedTeams } from "@/lib/playoffs/seed";

describe("Playoffs", () => {
  const seeded = seedTeams(standings);
  const at = (seed: number) => seeded.find((t) => t.seed === seed)!.manager;

  it("shows the playoff bracket's first round and byes", () => {
    renderWithTheme(<Playoffs />);
    const bracket = screen.getByRole("region", { name: "Playoff bracket" });
    const games = within(bracket).getAllByTestId("first-round-matchup");
    expect(games[0]).toHaveTextContent(at(3));
    expect(games[0]).toHaveTextContent(at(6));
    expect(games[1]).toHaveTextContent(at(4));
    expect(games[1]).toHaveTextContent(at(5));
    const byes = within(bracket).getAllByTestId("bye-team");
    expect(byes.map((b) => b.textContent)).toEqual([expect.stringContaining(at(1)), expect.stringContaining(at(2))]);
  });

  it("shows the Toilet Bowl's first round and byes", () => {
    renderWithTheme(<Playoffs />);
    const bracket = screen.getByRole("region", { name: "Toilet Bowl bracket" });
    const games = within(bracket).getAllByTestId("first-round-matchup");
    expect(games[0]).toHaveTextContent(at(7));
    expect(games[0]).toHaveTextContent(at(10));
    expect(games[1]).toHaveTextContent(at(8));
    expect(games[1]).toHaveTextContent(at(9));
    const byes = within(bracket).getAllByTestId("bye-team");
    expect(byes[0]).toHaveTextContent(at(11));
    expect(byes[1]).toHaveTextContent(at(12));
  });

  it("lists all 12 teams in seed order in the standings table", () => {
    renderWithTheme(<Playoffs />);
    const rows = within(screen.getByRole("table")).getAllByRole("row").slice(1);
    expect(rows).toHaveLength(12);
    rows.forEach((r, i) => expect(r).toHaveTextContent(seeded[i].manager));
  });
});
