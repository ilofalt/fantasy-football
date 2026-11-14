// Each manager's remaining FAAB, hand-updated from Yahoo. The SportsBook tab
// shows this (minus whatever they have riding on open bets) and won't let a
// manager bet more than they have.
//
// Seeded as a $100 budget minus the season FAAB spent on the Waiver Wire tab,
// with Nicholas set to $0. Check these against Yahoo, and update them after
// the commissioner settles bets and moves FAAB around.

export const FAAB_UPDATED = "Week 9 final · Mon Nov 9, 2026";

export const FAAB_BALANCES: Record<string, number> = {
  Isaiah: 0,
  Nicholas: 0,
  Andrew: 95,
  Noah: 16,
  lanny: 65,
  Daniel: 0,
  Ethan: 26,
  Chris: 7,
  Jonathan: 67,
  Raymond: 62,
  Zachary: 53,
  Matthew: 63,
};

// While the SportsBook is just a test, anyone with no FAAB left plays with this much.
export const PLAY_MONEY_FAAB = 100;

/** The FAAB a manager can bet with, and whether it's the play-money handout. */
export function faabFor(manager: string): { balance: number; playMoney: boolean } {
  const real = FAAB_BALANCES[manager] ?? 0;
  return real > 0 ? { balance: real, playMoney: false } : { balance: PLAY_MONEY_FAAB, playMoney: true };
}
