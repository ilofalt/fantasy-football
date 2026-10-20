import { gamesBack, seedTeams, toiletBowlBracket, winnersBracket, type StandingRow } from "../seed";
import { standings } from "@/content/standings";

const row = (manager: string, wins: number, losses: number, pointsFor: number): StandingRow => ({
  manager,
  wins,
  losses,
  ties: 0,
  pointsFor,
  pointsAgainst: 0,
  streak: "W1",
});

const twelve = Array.from({ length: 12 }, (_, i) => row(`T${i + 1}`, 12 - i, i, 1000 - i));

describe("seedTeams", () => {
  it("orders by record, then by points for", () => {
    const seeded = seedTeams([row("A", 3, 3, 600), row("B", 4, 2, 500), row("C", 3, 3, 650)]);
    expect(seeded.map((t) => [t.manager, t.seed])).toEqual([
      ["B", 1],
      ["C", 2],
      ["A", 3],
    ]);
  });

  it("counts a tie as half a win", () => {
    const seeded = seedTeams([row("A", 3, 3, 900), { ...row("B", 3, 2, 100), ties: 1 }]);
    expect(seeded[0].manager).toBe("B");
  });
});

describe("brackets", () => {
  const seeded = seedTeams(twelve);

  it("gives seeds 1 and 2 a bye, with 3 vs 6 and 4 vs 5", () => {
    const b = winnersBracket(seeded);
    expect(b.byes.map((t) => t.seed)).toEqual([1, 2]);
    expect(b.firstRound.map((m) => [m.higher.seed, m.lower.seed])).toEqual([
      [3, 6],
      [4, 5],
    ]);
  });

  it("gives seeds 11 and 12 the Toilet Bowl bye, with 7 vs 10 and 8 vs 9", () => {
    const b = toiletBowlBracket(seeded);
    expect(b.byes.map((t) => t.seed)).toEqual([11, 12]);
    expect(b.firstRound.map((m) => [m.higher.seed, m.lower.seed])).toEqual([
      [7, 10],
      [8, 9],
    ]);
  });
});

describe("gamesBack", () => {
  const seeded = seedTeams([
    ...Array.from({ length: 5 }, (_, i) => row(`Top${i}`, 6, 0, 900 - i)),
    row("Sixth", 3, 3, 700),
    row("TiedOut", 3, 3, 650),
    row("OneBack", 2, 4, 800),
    row("TwoBack", 1, 5, 800),
  ]);
  const find = (m: string) => seeded.find((t) => t.manager === m)!;

  it("is null for playoff teams", () => {
    expect(gamesBack(find("Sixth"), seeded)).toBeNull();
  });

  it("shows 0 for a team with the same record that is out on the tiebreaker", () => {
    expect(gamesBack(find("TiedOut"), seeded)).toBe("0");
  });

  it("counts whole games back", () => {
    expect(gamesBack(find("OneBack"), seeded)).toBe("1");
    expect(gamesBack(find("TwoBack"), seeded)).toBe("2");
  });
});

describe("standings data", () => {
  it("has 12 teams with the same number of games played", () => {
    expect(standings).toHaveLength(12);
    const games = new Set(standings.map((r) => r.wins + r.losses + r.ties));
    expect(games.size).toBe(1);
  });

  it("has as many wins as losses across the league", () => {
    const wins = standings.reduce((n, r) => n + r.wins, 0);
    const losses = standings.reduce((n, r) => n + r.losses, 0);
    expect(wins).toBe(losses);
  });
});
