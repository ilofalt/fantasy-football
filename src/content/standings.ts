import type { StandingRow } from "@/lib/playoffs/seed";

// Regular-season standings, hand-updated after each week's games are final.
// Seeds and both brackets on the Playoff Picture tab are computed from this.

export const STANDINGS_THROUGH_WEEK = 10;
export const REGULAR_SEASON_WEEKS = 14;

export const standings: StandingRow[] = [
  { manager: "Matthew", wins: 9, losses: 1, ties: 0, pointsFor: 1203.88, pointsAgainst: 1066.26, streak: "W5" },
  { manager: "Jonathan", wins: 7, losses: 3, ties: 0, pointsFor: 1177.56, pointsAgainst: 1016.1, streak: "W4" },
  { manager: "Ethan", wins: 6, losses: 4, ties: 0, pointsFor: 1259.46, pointsAgainst: 1102.08, streak: "L3" },
  { manager: "Nicholas", wins: 6, losses: 4, ties: 0, pointsFor: 1080.64, pointsAgainst: 1026.28, streak: "W2" },
  { manager: "lanny", wins: 6, losses: 4, ties: 0, pointsFor: 1060.82, pointsAgainst: 1154.28, streak: "W2" },
  { manager: "Zachary", wins: 5, losses: 5, ties: 0, pointsFor: 1083.7, pointsAgainst: 1084.02, streak: "L1" },
  { manager: "Isaiah", wins: 4, losses: 6, ties: 0, pointsFor: 1106.18, pointsAgainst: 1098.9, streak: "L2" },
  { manager: "Raymond", wins: 4, losses: 6, ties: 0, pointsFor: 1086.1, pointsAgainst: 1134.18, streak: "W1" },
  { manager: "Andrew", wins: 4, losses: 6, ties: 0, pointsFor: 975.24, pointsAgainst: 1017.78, streak: "L5" },
  { manager: "Chris", wins: 3, losses: 7, ties: 0, pointsFor: 1040.42, pointsAgainst: 1128.16, streak: "L2" },
  { manager: "Daniel", wins: 3, losses: 7, ties: 0, pointsFor: 967.66, pointsAgainst: 1106.66, streak: "W3" },
  { manager: "Noah", wins: 3, losses: 7, ties: 0, pointsFor: 948.32, pointsAgainst: 1055.28, streak: "L2" },
];

export const bubbleNotes: string[] = [
  "Matthew (9-1) has clinched a playoff spot, the first of his life, and has an 85% chance at the 1st seed. Jonathan (7-3) is two games back and plays him in Week 11. Ethan has no hair to lose over it, but he's lost three straight anyway.",
  "Ethan, Nicholas, and lanny are all 6-4 and hold seeds 3 through 5. Nicholas plays Ethan this week in their first-ever meeting; the AI has already run the numbers. lanny gets Noah, who may not set his lineup, which is the easiest draw in Pokémon or football.",
  "Zachary (5-5) holds the 6th seed by a game over Isaiah, Raymond, and Andrew, despite losing to Ray. Zachary plays Isaiah this week; if Isaiah wins, they're tied and Isaiah's 22.48-point edge in points for wins the tiebreaker. Unlike his scale, the tiebreaker is on his side.",
  "Raymond is 4-6 with the 4th-best all-play record in the league, a rare skill. He's a game out with four to play and needs help, which he has never once given anyone else. Andrew has lost five straight and has three bye-week starters for Week 11; he'll find out when he gets back from the dealership.",
  "Chris, Daniel, and Noah are 3-7 and still alive, barely. Daniel has won three straight and needs to win out plus a lot of help: Zachary would have to lose three of his last four, Isaiah and Ray two each, and Andrew and Chris one each. Still the worst team in league history, now with a winning streak and a pulse.",
];
