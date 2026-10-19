import { renderWithTheme, screen, within } from "@/test-utils";
import Trades, { tradeLedger } from "../Trades";
import { trades } from "@/content/trades";
import type { Trade } from "@/lib/trades/types";

const sample: Trade[] = [
  {
    id: "t1",
    date: "2026-10-01",
    weeksCounted: [5, 6],
    sides: [
      { manager: "A", received: [{ name: "P1", position: "RB", weeklyPointsSinceTrade: [10, 5] }] },
      { manager: "B", received: [{ name: "P2", position: "WR", weeklyPointsSinceTrade: [3, null] }] },
    ],
    verdict: "A",
    headline: "h",
    writeUp: [],
  },
  {
    id: "t2",
    date: "2026-10-08",
    weeksCounted: [6],
    sides: [
      { manager: "B", received: [{ name: "P3", position: "TE", weeklyPointsSinceTrade: [20] }] },
      { manager: "C", received: [{ name: "P4", position: "QB", weeklyPointsSinceTrade: [4] }] },
    ],
    verdict: "B",
    headline: "h",
    writeUp: [],
  },
];

describe("tradeLedger", () => {
  it("nets points received against points given up, across trades, best first", () => {
    expect(tradeLedger(sample)).toEqual([
      { manager: "A", net: 12, trades: 1 },
      { manager: "B", net: 4, trades: 2 },
      { manager: "C", net: -16, trades: 1 },
    ]);
  });
});

describe("Trades", () => {
  it("renders a card for every trade plus the leaderboard", () => {
    renderWithTheme(<Trades />);
    expect(screen.getAllByRole("article")).toHaveLength(trades.length);
    expect(screen.getByRole("list", { name: "Trade leaderboard" })).toBeInTheDocument();
  });

  it("labels each trade with its verdict", () => {
    renderWithTheme(<Trades />);
    const cards = screen.getAllByRole("article");
    trades.forEach((trade, i) => {
      const label = trade.verdict ? `${trade.verdict} winning` : "Too close to call";
      expect(within(cards[i]).getByText(label)).toBeInTheDocument();
    });
  });

  it("shows every traded player", () => {
    renderWithTheme(<Trades />);
    for (const trade of trades) {
      for (const side of trade.sides) {
        for (const player of side.received) {
          expect(screen.getByText(player.name)).toBeInTheDocument();
        }
      }
    }
  });
});
