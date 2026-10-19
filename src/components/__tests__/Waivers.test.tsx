import { renderWithTheme, screen, within } from "@/test-utils";
import Waivers, { acquiredLabel } from "../Waivers";
import {
  CURRENT_WEEK,
  managerDropRecords,
  managerWaiverRecords,
  seasonDrops,
  seasonPickups,
  weekDrops,
  weekPickups,
} from "@/content/waivers";

describe("Waivers", () => {
  it("lists this week's and the season's best pickups in order", () => {
    renderWithTheme(<Waivers />);
    const week = screen.getByRole("list", { name: `Best pickups of Week ${CURRENT_WEEK}` });
    const season = screen.getByRole("list", { name: "Best pickups of the season" });
    expect(within(week).getAllByRole("listitem")).toHaveLength(weekPickups.length);
    expect(within(season).getAllByRole("listitem")).toHaveLength(seasonPickups.length);
    expect(within(week).getAllByRole("listitem")[0]).toHaveTextContent(weekPickups[0].player);
  });

  it("lists this week's and the season's worst drops, and points given away", () => {
    renderWithTheme(<Waivers />);
    const week = screen.getByRole("list", { name: `Worst drops of Week ${CURRENT_WEEK}` });
    const season = screen.getByRole("list", { name: "Worst drops of the season" });
    const givenAway = screen.getByRole("list", { name: "Points given away" });
    expect(within(week).getAllByRole("listitem")).toHaveLength(weekDrops.length);
    expect(within(season).getAllByRole("listitem")).toHaveLength(seasonDrops.length);
    expect(within(givenAway).getAllByRole("listitem")).toHaveLength(managerDropRecords.length);
    expect(within(season).getAllByRole("listitem")[0]).toHaveTextContent(`Dropped by ${seasonDrops[0].manager}`);
  });

  it("shows every manager in the waiver table", () => {
    renderWithTheme(<Waivers />);
    const table = screen.getByRole("table");
    for (const m of managerWaiverRecords) {
      expect(within(table).getByRole("cell", { name: m.manager })).toBeInTheDocument();
    }
  });

  it("describes how a player was acquired", () => {
    const base = { player: "P", position: "WR", manager: "M", added: "Oct 14", points: 1, weeksOnRoster: 1, blurb: "" };
    expect(acquiredLabel({ ...base, method: "Free agent", cost: 0 })).toBe("Free agent · Oct 14");
    expect(acquiredLabel({ ...base, method: "Waiver", cost: 15 })).toBe("$15 waiver claim · Oct 14");
    expect(acquiredLabel({ ...base, method: "Waiver", cost: 0 })).toBe("$0 waiver claim · Oct 14");
  });
});

describe("waiver data", () => {
  it.each([
    ["week", weekPickups],
    ["season", seasonPickups],
  ])("%s pickups are sorted by points, highest first", (_label, list) => {
    const points = list.map((p) => p.points);
    expect(points).toEqual([...points].sort((a, b) => b - a));
  });

  it.each([
    ["week", weekDrops],
    ["season", seasonDrops],
  ])("%s drops are sorted by points after the drop, highest first", (_label, list) => {
    const points = list.map((d) => d.pointsAfter);
    expect(points).toEqual([...points].sort((a, b) => b - a));
  });
});
