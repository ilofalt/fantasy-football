import type { StandingRow } from "@/lib/playoffs/seed";

// Regular-season standings, hand-updated after each week's games are final.
// Seeds and both brackets on the Playoff Picture tab are computed from this.

export const STANDINGS_THROUGH_WEEK = 9;
export const REGULAR_SEASON_WEEKS = 14;

export const standings: StandingRow[] = [
  { manager: "Matthew", wins: 8, losses: 1, ties: 0, pointsFor: 1061.7, pointsAgainst: 946.48, streak: "W4" },
  { manager: "Ethan", wins: 6, losses: 3, ties: 0, pointsFor: 1133.44, pointsAgainst: 953.26, streak: "L2" },
  { manager: "Jonathan", wins: 6, losses: 3, ties: 0, pointsFor: 1058.8, pointsAgainst: 963.8, streak: "W3" },
  { manager: "Zachary", wins: 5, losses: 4, ties: 0, pointsFor: 983.84, pointsAgainst: 958.0, streak: "W1" },
  { manager: "lanny", wins: 5, losses: 4, ties: 0, pointsFor: 949.62, pointsAgainst: 1063.52, streak: "W1" },
  { manager: "Nicholas", wins: 5, losses: 4, ties: 0, pointsFor: 941.88, pointsAgainst: 907.68, streak: "W1" },
  { manager: "Isaiah", wins: 4, losses: 5, ties: 0, pointsFor: 987.58, pointsAgainst: 960.14, streak: "L1" },
  { manager: "Andrew", wins: 4, losses: 5, ties: 0, pointsFor: 884.48, pointsAgainst: 906.58, streak: "L4" },
  { manager: "Raymond", wins: 3, losses: 6, ties: 0, pointsFor: 960.08, pointsAgainst: 1034.32, streak: "L2" },
  { manager: "Chris", wins: 3, losses: 6, ties: 0, pointsFor: 920.64, pointsAgainst: 985.98, streak: "L1" },
  { manager: "Noah", wins: 3, losses: 6, ties: 0, pointsFor: 896.02, pointsAgainst: 936.52, streak: "L1" },
  { manager: "Daniel", wins: 2, losses: 7, ties: 0, pointsFor: 818.84, pointsAgainst: 980.64, streak: "W2" },
];

export const bubbleNotes: string[] = [
  "Three teams are 5-4 and hold seeds 4 through 6: Zachary, lanny, and Nicholas. Nicholas has the last playoff spot, 7.74 points for behind lanny.",
  "Isaiah fell from 4th to 7th after losing to Daniel by 0.82. He's one game behind Nicholas and has scored 45.70 more points, so a tie would go his way.",
  "Raymond is 3-6 but has the 6th-most points in the league (960.08). He's two games out with five weeks left.",
  "Matthew (8-1) has won four straight and leads Ethan and Jonathan by two games for the 1st seed.",
  "Daniel has won two straight and is three games out of 6th place with five weeks to go.",
];
