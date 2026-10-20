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

    fireEvent.click(screen.getByRole("tab", { name: "Playoff Picture" }));
    expect(screen.getByRole("heading", { level: 2, name: "Playoff Picture" })).toBeInTheDocument();
    expect(window.location.hash).toBe("#playoffs");

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

  it("falls back to Matchups for an unknown hash", () => {
    window.history.replaceState(null, "", "/#nope");
    renderWithTheme(<LeagueTabs />);
    expect(screen.getByRole("tab", { name: "Matchups" })).toHaveAttribute("aria-selected", "true");
  });
});
