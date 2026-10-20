import { renderWithTheme, screen } from "@/test-utils";
import WeeklyReport from "../WeeklyReport";
import { weeklyData } from "@/content/weekly";
import { buildReport } from "@/lib/weekly/report";

describe("WeeklyReport", () => {
  it("renders every award for the latest week", () => {
    renderWithTheme(<WeeklyReport />);
    const cards = buildReport(weeklyData[0]);
    expect(screen.getByRole("heading", { level: 2, name: `Week ${weeklyData[0].week} Report` })).toBeInTheDocument();
    expect(screen.getAllByRole("article")).toHaveLength(cards.length);
    expect(screen.getByRole("heading", { name: /Best Manager/ })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /QB Benchwarmer of the Week/ })).toBeInTheDocument();
  });

  it("shows lineup efficiency for all 12 managers", () => {
    renderWithTheme(<WeeklyReport />);
    const rows = screen.getByRole("table", { name: "Lineup efficiency" }).querySelectorAll("tbody tr");
    expect(rows).toHaveLength(12);
  });

  it("gives every award a copyable link", () => {
    renderWithTheme(<WeeklyReport />);
    expect(screen.getByRole("link", { name: "Copy link to Best Manager" })).toHaveAttribute("href", "#report/best-manager");
  });
});
