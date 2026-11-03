import type { StandingRow } from "@/lib/playoffs/seed";

// Regular-season standings, hand-updated after each week's games are final.
// Seeds and both brackets on the Playoff Picture tab are computed from this.

export const STANDINGS_THROUGH_WEEK = 8;
export const REGULAR_SEASON_WEEKS = 14;

export const standings: StandingRow[] = [
  { manager: "Matthew", wins: 7, losses: 1, ties: 0, pointsFor: 935.32, pointsAgainst: 852.58, streak: "W3" },
  { manager: "Ethan", wins: 6, losses: 2, ties: 0, pointsFor: 1028.66, pointsAgainst: 838.28, streak: "L1" },
  { manager: "Jonathan", wins: 5, losses: 3, ties: 0, pointsFor: 934.28, pointsAgainst: 856.94, streak: "W2" },
  { manager: "Isaiah", wins: 4, losses: 4, ties: 0, pointsFor: 886.6, pointsAgainst: 858.34, streak: "W1" },
  { manager: "Zachary", wins: 4, losses: 4, ties: 0, pointsFor: 878.58, pointsAgainst: 861.8, streak: "L1" },
  { manager: "lanny", wins: 4, losses: 4, ties: 0, pointsFor: 834.64, pointsAgainst: 958.74, streak: "L2" },
  { manager: "Nicholas", wins: 4, losses: 4, ties: 0, pointsFor: 813.0, pointsAgainst: 789.78, streak: "L3" },
  { manager: "Andrew", wins: 4, losses: 4, ties: 0, pointsFor: 777.62, pointsAgainst: 782.06, streak: "L3" },
  { manager: "Raymond", wins: 3, losses: 5, ties: 0, pointsFor: 842.18, pointsAgainst: 905.44, streak: "L1" },
  { manager: "Chris", wins: 3, losses: 5, ties: 0, pointsFor: 824.44, pointsAgainst: 880.72, streak: "W2" },
  { manager: "Noah", wins: 3, losses: 5, ties: 0, pointsFor: 802.12, pointsAgainst: 810.14, streak: "W1" },
  { manager: "Daniel", wins: 1, losses: 7, ties: 0, pointsFor: 717.04, pointsAgainst: 879.66, streak: "W1" },
];

export const bubbleNotes: string[] = [
  "Five teams are 4-4, and they hold seeds 4 through 8 on points for. Isaiah jumped from 9th to 4th with the week's top score; lanny holds the 6th seed, 21.64 points ahead of Nicholas.",
  "Matthew is alone in 1st at 7-1 after winning by 1.14. Ethan is 6-2 but has scored 93.34 more points than anyone else.",
  "Raymond is 3-5 but has more points for (842.18) than three of the 4-4 teams, including lanny. He's one game out with six weeks left.",
  "Daniel got his first win, 121.80 to 75.04 over Raymond. At 1-7 he's three games out of 6th with six weeks to go.",
];
