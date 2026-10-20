import type { StandingRow } from "@/lib/playoffs/seed";

// Regular-season standings, hand-updated after each week's games are final.
// Seeds and both brackets on the Playoff Picture tab are computed from this.

export const STANDINGS_THROUGH_WEEK = 6;
export const REGULAR_SEASON_WEEKS = 14;

export const standings: StandingRow[] = [
  { manager: "Ethan", wins: 5, losses: 1, ties: 0, pointsFor: 794.96, pointsAgainst: 580.26, streak: "W2" },
  { manager: "Matthew", wins: 5, losses: 1, ties: 0, pointsFor: 725.58, pointsAgainst: 650.28, streak: "W1" },
  { manager: "Nicholas", wins: 4, losses: 2, ties: 0, pointsFor: 660.92, pointsAgainst: 574.32, streak: "L1" },
  { manager: "lanny", wins: 4, losses: 2, ties: 0, pointsFor: 631.56, pointsAgainst: 691.94, streak: "W1" },
  { manager: "Andrew", wins: 4, losses: 2, ties: 0, pointsFor: 625.12, pointsAgainst: 586.48, streak: "L1" },
  { manager: "Jonathan", wins: 3, losses: 3, ties: 0, pointsFor: 667.02, pointsAgainst: 645.76, streak: "L1" },
  { manager: "Isaiah", wins: 3, losses: 3, ties: 0, pointsFor: 641.92, pointsAgainst: 644.84, streak: "W1" },
  { manager: "Zachary", wins: 3, losses: 3, ties: 0, pointsFor: 639.3, pointsAgainst: 658.16, streak: "W2" },
  { manager: "Raymond", wins: 2, losses: 4, ties: 0, pointsFor: 656.34, pointsAgainst: 681.38, streak: "W2" },
  { manager: "Noah", wins: 2, losses: 4, ties: 0, pointsFor: 592.62, pointsAgainst: 629.66, streak: "L2" },
  { manager: "Chris", wins: 1, losses: 5, ties: 0, pointsFor: 630.98, pointsAgainst: 713.98, streak: "L5" },
  { manager: "Daniel", wins: 0, losses: 6, ties: 0, pointsFor: 497.16, pointsAgainst: 706.42, streak: "L6" },
];

export const bubbleNotes: string[] = [
  "Three teams are 3-3. Jonathan holds the 6th seed on points for, 25.10 ahead of Isaiah and 27.72 ahead of Zachary. Isaiah and Jonathan play each other in Week 7.",
  "lanny and Andrew are both 4-2, separated by 6.44 points for. Today they'd play each other in the first round.",
  "Raymond is 2-4 but has the third-best all-play record in the league. He's one game out of the playoffs with eight weeks left.",
  "Daniel is three games out of 6th place with eight weeks to go. Mathematically alive; realistically playing for the Toilet Bowl.",
];
