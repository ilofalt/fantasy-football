import { fireEvent, renderWithTheme, screen } from "@/test-utils";
import LeagueTabs from "../LeagueTabs";

beforeEach(() => {
  global.fetch = jest.fn(() => new Promise(() => {})) as jest.Mock;
  window.history.replaceState(null, "", "/");
});

describe("LeagueTabs", () => {
  it("starts on Matchups", () => {
    renderWithTheme(<LeagueTabs />);
    expect(screen.getByRole("tab", { name: "Matchups" })).toHaveAttribute("aria-selected", "true");
    expect(document.querySelector("#matchups")).not.toBeNull();
  });

  it("switches between every tab and updates the URL hash", () => {
    renderWithTheme(<LeagueTabs />);

    fireEvent.click(screen.getByRole("tab", { name: "News" }));
    expect(screen.getByRole("heading", { name: "League News" })).toBeInTheDocument();
    expect(window.location.hash).toBe("#news");

    fireEvent.click(screen.getByRole("tab", { name: "Weekly Report" }));
    expect(screen.getByRole("heading", { level: 2, name: /Week \d+ Report/ })).toBeInTheDocument();
    expect(window.location.hash).toBe("#report");

    fireEvent.click(screen.getByRole("tab", { name: "Playoff Picture" }));
    expect(screen.getByRole("heading", { level: 2, name: "Playoff Picture" })).toBeInTheDocument();
    expect(window.location.hash).toBe("#playoffs");

    fireEvent.click(screen.getByRole("tab", { name: "Rivalries" }));
    expect(screen.getByRole("heading", { level: 2, name: "Rivalries" })).toBeInTheDocument();
    expect(window.location.hash).toBe("#rivalries");

    fireEvent.click(screen.getByRole("tab", { name: "Managers" }));
    expect(screen.getByRole("heading", { level: 2, name: "Managers" })).toBeInTheDocument();
    expect(window.location.hash).toBe("#managers");

    fireEvent.click(screen.getByRole("tab", { name: "Track Trades" }));
    expect(screen.getByRole("heading", { level: 2, name: "Track Trades" })).toBeInTheDocument();
    expect(window.location.hash).toBe("#trades");

    fireEvent.click(screen.getByRole("tab", { name: "Waiver Wire" }));
    expect(screen.getByRole("heading", { level: 2, name: "Waiver Wire" })).toBeInTheDocument();
    expect(window.location.hash).toBe("#waivers");

    fireEvent.click(screen.getByRole("tab", { name: "Matchups" }));
    expect(window.location.hash).toBe("");
  });

  it("opens the tab named in the URL hash", () => {
    window.history.replaceState(null, "", "/#trades");
    renderWithTheme(<LeagueTabs />);
    expect(screen.getByRole("tab", { name: "Track Trades" })).toHaveAttribute("aria-selected", "true");
  });

  it("opens the tab from a deep link to a specific item and scrolls to it", () => {
    const scrollIntoView = jest.fn();
    Element.prototype.scrollIntoView = scrollIntoView;
    window.history.replaceState(null, "", "/#news/week-8-preview");
    renderWithTheme(<LeagueTabs />);
    expect(screen.getByRole("tab", { name: "News" })).toHaveAttribute("aria-selected", "true");
    expect(document.getElementById("week-8-preview")).not.toBeNull();
    expect(scrollIntoView).toHaveBeenCalled();
  });

  it("falls back to Matchups for an unknown hash", () => {
    window.history.replaceState(null, "", "/#nope");
    renderWithTheme(<LeagueTabs />);
    expect(screen.getByRole("tab", { name: "Matchups" })).toHaveAttribute("aria-selected", "true");
  });
});
