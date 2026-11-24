import type { StandingRow } from "@/lib/playoffs/seed";

// Regular-season standings, hand-updated after each week's games are final.
// Seeds and both brackets on the Playoff Picture tab are computed from this.

export const STANDINGS_THROUGH_WEEK = 11;
export const REGULAR_SEASON_WEEKS = 14;

export const standings: StandingRow[] = [
  { manager: "Matthew", wins: 10, losses: 1, ties: 0, pointsFor: 1324.76, pointsAgainst: 1161.26, streak: "W6" },
  { manager: "Ethan", wins: 7, losses: 4, ties: 0, pointsFor: 1358.56, pointsAgainst: 1162.78, streak: "W1" },
  { manager: "Jonathan", wins: 7, losses: 4, ties: 0, pointsFor: 1272.56, pointsAgainst: 1136.98, streak: "L1" },
  { manager: "lanny", wins: 7, losses: 4, ties: 0, pointsFor: 1179.58, pointsAgainst: 1267.38, streak: "W3" },
  { manager: "Zachary", wins: 6, losses: 5, ties: 0, pointsFor: 1206.36, pointsAgainst: 1177.06, streak: "W1" },
  { manager: "Nicholas", wins: 6, losses: 5, ties: 0, pointsFor: 1141.34, pointsAgainst: 1125.38, streak: "L1" },
  { manager: "Raymond", wins: 5, losses: 6, ties: 0, pointsFor: 1197.84, pointsAgainst: 1222.9, streak: "W2" },
  { manager: "Andrew", wins: 5, losses: 6, ties: 0, pointsFor: 1082.7, pointsAgainst: 1106.18, streak: "W1" },
  { manager: "Isaiah", wins: 4, losses: 7, ties: 0, pointsFor: 1199.22, pointsAgainst: 1221.56, streak: "L3" },
  { manager: "Chris", wins: 3, losses: 8, ties: 0, pointsFor: 1129.14, pointsAgainst: 1239.9, streak: "L3" },
  { manager: "Noah", wins: 3, losses: 8, ties: 0, pointsFor: 1061.42, pointsAgainst: 1174.04, streak: "L3" },
  { manager: "Daniel", wins: 3, losses: 8, ties: 0, pointsFor: 1056.06, pointsAgainst: 1214.12, streak: "L1" },
];

export const bubbleNotes: string[] = [
  "Matthew (10-1) has clinched a playoff spot, the first of his life, and clinches the 1st seed with a win over Raymond in Week 12. Our model gives him a 98% chance at it either way. Someone should probably tell him there's no trophy for the regular season.",
  "Ethan, Jonathan, and lanny are all 7-4 and fighting for the 2nd seed and the last bye. lanny plays Jonathan this week, so one of them drops to 7-5. Ethan, with the most points in the league, has a 59% chance at the bye and a head that reflects well under pressure.",
  "Zachary and Nicholas are 6-5 and hold the 5th and 6th seeds, a game ahead of Raymond and Andrew. Nicholas plays Andrew this week; if Andrew wins, they're tied at 6-6. Zachary has an 84% chance to make it and is asking everyone to stay behind the tape.",
  "Raymond and Andrew are 5-6. Ray has the 4th-best all-play record in the league and the 7th-best record, which is the Ray experience in one sentence. Andrew made two pickups and won, and if he keeps it up he might sneak in. He won't, but he might.",
  "Isaiah is 4-7 and alive, barely: he needs to win out, Nicholas to lose all three, Andrew to lose two, and Ray to lose one. Chris is 3-8 and a loss to Isaiah would end his season, but we believe in him. Noah and Daniel are 3-8 and play each other, and the loser is eliminated. The worst team in league history is officially on the clock.",
];
