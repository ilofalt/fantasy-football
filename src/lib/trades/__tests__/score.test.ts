import { formatPoints, formatRecord, playerTotal, recordSinceTrade, sideTotal } from "../score";
import { trades } from "@/content/trades";

describe("record since trade", () => {
  const g = (week: number, a: string, aScore: number, b: string, bScore: number) => ({
    year: 2026, week, a, aScore, b, bScore, type: "regular" as const,
  });
  const games = [g(5, "A", 100, "B", 90), g(6, "C", 80, "A", 95), g(7, "A", 70, "D", 110), g(6, "B", 88, "D", 88)];

  it("counts wins and losses from either side of a game and lists weeks without a result", () => {
    expect(recordSinceTrade(games, "A", 2026, [5, 6, 7, 8])).toEqual({ wins: 2, losses: 1, ties: 0, pending: [8] });
    expect(formatRecord(recordSinceTrade(games, "A", 2026, [5, 6, 7]))).toBe("2-1");
  });

  it("shows ties, and nothing before any counted week is final", () => {
    expect(formatRecord(recordSinceTrade(games, "B", 2026, [5, 6]))).toBe("0-1-1");
    expect(formatRecord(recordSinceTrade(games, "B", 2026, [8]))).toBeNull();
  });
});

describe("trade scoring", () => {
  it("sums a player's weeks, counting unplayed weeks and byes as zero", () => {
    expect(playerTotal({ name: "A", position: "RB", weeklyPointsSinceTrade: [10.5, null, 4.25] })).toBe(14.75);
  });

  it("sums every player a manager received", () => {
    const side = {
      manager: "X",
      received: [
        { name: "A", position: "RB", weeklyPointsSinceTrade: [10, 2] },
        { name: "B", position: "WR", weeklyPointsSinceTrade: [null, 3.3] },
      ],
    };
    expect(sideTotal(side)).toBeCloseTo(15.3);
  });

  it("formats points without floating-point noise", () => {
    expect(formatPoints(0.1 + 0.2)).toBe("0.30");
    expect(formatPoints(35.3)).toBe("35.30");
  });
});

describe("trade data", () => {
  it.each(trades.map((t) => [t.id, t]))("%s has one weekly score per counted week", (_id, trade) => {
    for (const side of trade.sides) {
      for (const player of side.received) {
        expect(player.weeklyPointsSinceTrade).toHaveLength(trade.weeksCounted.length);
      }
    }
  });

  it.each(trades.map((t) => [t.id, t]))("%s names a verdict that is one of its two managers", (_id, trade) => {
    if (trade.verdict !== null) {
      expect(trade.sides.map((s) => s.manager)).toContain(trade.verdict);
    }
  });
});
