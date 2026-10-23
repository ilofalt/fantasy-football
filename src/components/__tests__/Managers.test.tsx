import { fireEvent, renderWithTheme, screen } from "@/test-utils";
import Managers, { managerFromSlug } from "../Managers";

beforeEach(() => {
  window.history.replaceState(null, "", "/#managers");
  window.scrollTo = jest.fn();
});

describe("Managers", () => {
  it("finds managers by link slug", () => {
    expect(managerFromSlug("lanny")).toBe("lanny");
    expect(managerFromSlug("isaiah")).toBe("Isaiah");
    expect(managerFromSlug("nope")).toBeNull();
  });

  it("lists current and former managers", () => {
    renderWithTheme(<Managers />);
    expect(screen.getAllByRole("button", { name: /^Open .+'s page$/ })).toHaveLength(14);
    expect(screen.getByRole("heading", { name: "Former managers" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Open Abiy's page" })).toBeInTheDocument();
  });

  it("opens a manager's page with titles, seasons, and 2026 odds", () => {
    renderWithTheme(<Managers />);
    fireEvent.click(screen.getByRole("button", { name: "Open Raymond's page" }));
    expect(window.location.hash).toBe("#managers/raymond");
    expect(screen.getByRole("heading", { level: 2, name: "Raymond" })).toBeInTheDocument();
    expect(screen.getAllByText("2024 title").length).toBeGreaterThan(0);
    expect(screen.getByRole("table", { name: "Raymond's seasons" })).toHaveTextContent("1st of 12");
    expect(screen.getByLabelText("Champion")).toBeInTheDocument();
    expect(screen.getByText("Make playoffs")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Isaiah/ })).toHaveAttribute("href", "#rivalries/raymond-vs-isaiah");

    fireEvent.click(screen.getByRole("button", { name: "All managers" }));
    expect(window.location.hash).toBe("#managers");
  });

  it("opens a former manager's page from the URL without 2026 odds", () => {
    window.history.replaceState(null, "", "/#managers/varron");
    renderWithTheme(<Managers />);
    expect(screen.getByRole("heading", { level: 2, name: "Varron" })).toBeInTheDocument();
    expect(screen.getByText(/Former manager/)).toBeInTheDocument();
    expect(screen.queryByText("Make playoffs")).toBeNull();
  });
});
