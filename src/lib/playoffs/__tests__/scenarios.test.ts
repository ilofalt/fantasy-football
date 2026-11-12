import { standings } from "@/content/standings";
import { REMAINING_SCHEDULE } from "@/content/schedule";
import { clinched, controlsDestiny, eliminated, pathIn, situation, withResult, type Game } from "../scenarios";

// Brute force over every result of the last two weeks (4,096 outcomes),
// starting from standings shifted so the race is tight.
const late = REMAINING_SCHEDULE.slice(-2);
const start = standings.map((r, i) => ({ ...r, wins: [10, 9, 8, 8, 8, 7, 7, 7, 6, 6, 6, 5][i], losses: 12 - [10, 9, 8, 8, 8, 7, 7, 7, 6, 6, 6, 5][i] }));

function outcomes() {
  const games: Game[] = late.flatMap((w) => w.games);
  const out: Record<string, number>[] = [];
  for (let mask = 0; mask < 1 << games.length; mask++) {
    const w: Record<string, number> = Object.fromEntries(start.map((r) => [r.manager, r.wins]));
    games.forEach((g, i) => (w[(mask >> i) & 1 ? g[0] : g[1]] += 1));
    out.push(w);
  }
  return out;
}

describe("scenarios", () => {
  const s = situation(start, late);
  const all = outcomes();
  for (const r of start) {
    const m = r.manager;
    it(`matches brute force for ${m}`, () => {
      // Clinched: in every outcome, at most 5 others have >= m's wins.
      const brute = (fn: (w: Record<string, number>) => boolean) => all.every(fn);
      const above = (w: Record<string, number>, strict: boolean) =>
        Object.keys(w).filter((t) => t !== m && (strict ? w[t] > w[m] : w[t] >= w[m])).length;
      expect(clinched(s, m)).toBe(brute((w) => above(w, false) <= 5));
      // Eliminated: in every outcome, 6+ others have more wins (can't even tie in).
      expect(eliminated(s, m)).toBe(brute((w) => above(w, true) >= 6));
      // Path exists exactly when not eliminated.
      expect(pathIn(s, m) === null).toBe(eliminated(s, m));
      const mWinsAll = all.filter((w) => w[m] === r.wins + 2);
      expect(controlsDestiny(s, m)).toBe(mWinsAll.every((w) => above(w, false) <= 5));
    });
  }
  it("applies a result", () => {
    const t = withResult(s, "Isaiah", "Raymond");
    expect(t.games.length).toBe(s.games.length - 1);
    expect(t.wins.Isaiah).toBe(s.wins.Isaiah + 1);
  });
});
