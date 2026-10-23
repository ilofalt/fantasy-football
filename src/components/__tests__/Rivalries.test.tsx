import { fireEvent, renderWithTheme, screen, within } from "@/test-utils";
import Rivalries, { pairFromId, pairId } from "../Rivalries";
import { history } from "@/content/history";
import { headToHead, recordText } from "@/lib/history/stats";

beforeEach(() => {
  window.history.replaceState(null, "", "/#rivalries");
  Element.prototype.scrollIntoView = jest.fn();
});

describe("Rivalries", () => {
  it("parses and builds pair links", () => {
    expect(pairId("Isaiah", "lanny")).toBe("isaiah-vs-lanny");
    expect(pairFromId("isaiah-vs-lanny")).toEqual(["Isaiah", "lanny"]);
    expect(pairFromId("isaiah-vs-isaiah")).toBeNull();
    expect(pairFromId("nobody-vs-isaiah")).toBeNull();
  });

  it("defaults to Isaiah vs. Jonathan with their real record", () => {
    renderWithTheme(<Rivalries />);
    const h = headToHead(history, "Isaiah", "Jonathan");
    const card = screen.getByRole("region", { name: "Head to head" });
    expect(within(card).getByTestId("h2h-wins-left")).toHaveTextContent(String(h.overall.wins));
    expect(within(card).getByTestId("h2h-wins-right")).toHaveTextContent(String(h.overall.losses));
    expect(within(card).getAllByRole("row")).toHaveLength(h.games.length + 1);
  });

  it("opens the pair named in the URL", () => {
    window.history.replaceState(null, "", "/#rivalries/chris-vs-lanny");
    renderWithTheme(<Rivalries />);
    const h = headToHead(history, "Chris", "lanny");
    expect(screen.getByRole("link", { name: "Copy link to Chris vs. lanny" })).toBeInTheDocument();
    expect(within(screen.getByRole("region", { name: "Head to head" })).getAllByRole("row")).toHaveLength(h.games.length + 1);
  });

  it("clicking a grid cell loads that rivalry and updates the link", () => {
    renderWithTheme(<Rivalries />);
    const h = headToHead(history, "Daniel", "Ethan");
    fireEvent.click(screen.getByRole("button", { name: `Daniel vs. Ethan: ${h.games.length ? recordText(h.overall) : "never played"}` }));
    expect(window.location.hash).toBe("#rivalries/daniel-vs-ethan");
    expect(screen.getByRole("link", { name: "Copy link to Daniel vs. Ethan" })).toBeInTheDocument();
  });

  it("shows this week's games and the league's best rivalries", () => {
    renderWithTheme(<Rivalries />);
    expect(screen.getByRole("heading", { name: /Week 7's history/ })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Most played: Chris vs\. lanny/ })).toBeInTheDocument();
    expect(screen.getAllByRole("button", { name: /^\w+ vs\. \w+: / })).toHaveLength(12 * 11);
  });
});
