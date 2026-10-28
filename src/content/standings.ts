import type { StandingRow } from "@/lib/playoffs/seed";

// Regular-season standings, hand-updated after each week's games are final.
// Seeds and both brackets on the Playoff Picture tab are computed from this.

export const STANDINGS_THROUGH_WEEK = 7;
export const REGULAR_SEASON_WEEKS = 14;

export const standings: StandingRow[] = [
  { manager: "Ethan", wins: 6, losses: 1, ties: 0, pointsFor: 906.16, pointsAgainst: 683.7, streak: "W3" },
  { manager: "Matthew", wins: 6, losses: 1, ties: 0, pointsFor: 815.1, pointsAgainst: 733.5, streak: "W2" },
  { manager: "Jonathan", wins: 4, losses: 3, ties: 0, pointsFor: 779.7, pointsAgainst: 734.44, streak: "W1" },
  { manager: "Zachary", wins: 4, losses: 3, ties: 0, pointsFor: 759.5, pointsAgainst: 741.58, streak: "W3" },
  { manager: "Nicholas", wins: 4, losses: 3, ties: 0, pointsFor: 744.34, pointsAgainst: 694.52, streak: "L2" },
  { manager: "lanny", wins: 4, losses: 3, ties: 0, pointsFor: 733.82, pointsAgainst: 802.74, streak: "L1" },
  { manager: "Andrew", wins: 4, losses: 3, ties: 0, pointsFor: 708.34, pointsAgainst: 676.0, streak: "L2" },
  { manager: "Raymond", wins: 3, losses: 4, ties: 0, pointsFor: 767.14, pointsAgainst: 783.64, streak: "W3" },
  { manager: "Isaiah", wins: 3, losses: 4, ties: 0, pointsFor: 730.6, pointsAgainst: 757.52, streak: "L1" },
  { manager: "Chris", wins: 2, losses: 5, ties: 0, pointsFor: 729.18, pointsAgainst: 812.06, streak: "W1" },
  { manager: "Noah", wins: 2, losses: 5, ties: 0, pointsFor: 696.06, pointsAgainst: 740.86, streak: "L3" },
  { manager: "Daniel", wins: 0, losses: 7, ties: 0, pointsFor: 595.24, pointsAgainst: 804.62, streak: "L7" },
];

export const bubbleNotes: string[] = [
  "Five teams are 4-3, and they hold seeds 3 through 7. Jonathan (779.70 PF) is 3rd and Andrew (708.34) is the one left out, 25.48 points behind lanny for the 6th seed.",
  "Raymond is 3-4 but has the league's third-best all-play record (47-30) and more points for than four of the five 4-3 teams. He's one game out and has won three straight.",
  "Isaiah is 3-4 after losing the Week 7 play-in game to Jonathan. He plays lanny, the current 6th seed, in Week 8.",
  "Daniel is four games out of 6th place with seven weeks to go. He lost Week 7 by 0.12 points.",
];
