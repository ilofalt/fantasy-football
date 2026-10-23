// Real names for each team in the league, keyed by Yahoo team number (the N in
// a team key like "461.l.55635.t.N"). The site always shows these names, never
// the Yahoo team names.
export const MANAGERS_BY_TEAM: Record<string, string> = {
  "1": "Isaiah",
  "2": "Nicholas",
  "3": "Andrew",
  "4": "Noah",
  "5": "lanny",
  "6": "Daniel",
  "7": "Ethan",
  "8": "Chris",
  "9": "Jonathan",
  "10": "Raymond",
  "11": "Zachary",
  "12": "Matthew",
};

/** The real name for a team, from its Yahoo team key. */
export function managerForTeamKey(key: string): string | null {
  const n = key.match(/\.t\.(\d+)$/)?.[1];
  return (n && MANAGERS_BY_TEAM[n]) || null;
}
