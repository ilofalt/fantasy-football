// Hand-written league news, newest first. Edit this file to publish a new
// story; the News tab renders whatever is here.
//
// Last updated: Week 9 in progress, Sunday night (Nov 8, 2026). The Week 8
// stories are final; the Week 9 update is not.

export type NewsCategory =
  | "Recap"
  | "Preview"
  | "Matchup of the Week"
  | "Awards"
  | "Waiver Wire"
  | "Power Rankings"
  | "Feature";

export interface NewsListItem {
  label: string;
  detail: string;
}

export interface NewsArticle {
  id: string;
  category: NewsCategory;
  title: string;
  /** One-line summary shown under the title. */
  dek: string;
  /** ISO date. */
  date: string;
  paragraphs: string[];
  list?: NewsListItem[];
  /** Optional closing paragraph shown after the list. */
  outro?: string;
}

export const news: NewsArticle[] = [
  {
    id: "week-9-sunday-update",
    category: "Recap",
    title: "Week 9 in progress: Daniel wins again, and three games come down to Monday night",
    dek: "Scores as of Sunday night. Bills-Vikings on Monday decides Chris vs. Zachary and finishes three other games.",
    date: "2026-11-08",
    paragraphs: [
      "This week isn't over. Every player still to play is in Monday night's Bills-Vikings game. Two games are already final, and Yahoo's win probabilities for the rest are below. We'll post the full recap once Monday's game is in.",
      "Daniel beat Isaiah 102.30 to 100.98, his second straight win and his third in three tries against Isaiah all-time. He did it with Dak Prescott (19.5) on the bench and Drew Lock (13.1) starting. Isaiah got 25.9 from Matthew Golden, the best game by anyone in the matchup, but only 0.5 from Josh Jacobs. Ja'Marr Chase had 25.5 for Daniel.",
      "Nicholas beat Raymond 128.88 to 117.90 to snap a three-game losing streak, with Brock Purdy scoring 28.78 in the first-ever meeting between the two.",
      "The best game left is Chris vs. Zachary: Chris leads 81.34 to 76.46 with Josh Allen to play, and Zachary has James Cook III and Will Reichard. Yahoo has it 55-45 for Chris.",
    ],
    list: [
      { label: "Nicholas 128.88 · Raymond 117.90", detail: "Final. Nicholas snaps a three-game losing streak." },
      { label: "Matthew 126.38 · Noah 73.00", detail: "Noah has Justin Jefferson and Tyler Bass left. Yahoo: Matthew 98%." },
      { label: "Jonathan 120.72 · Andrew 107.36", detail: "Andrew is done; Jonathan has Dalton Kincaid left. C.J. Stroud's 37.36 for Andrew is the top score by any player so far this week. Yahoo: Jonathan 99%." },
      { label: "lanny 114.98 · Ethan 87.78", detail: "lanny is done, behind Jordan Love's 36.68; Ethan has the Bills D/ST left. Yahoo: lanny 99%." },
      { label: "Daniel 102.30 · Isaiah 100.98", detail: "Final. Daniel's second straight win." },
      { label: "Chris 81.34 · Zachary 76.46", detail: "Chris has Josh Allen; Zachary has James Cook III and Will Reichard. Yahoo: Chris 55%." },
    ],
    outro: "If every current leader wins: Matthew 8-1; Ethan and Jonathan 6-3; lanny and Nicholas 5-4; Isaiah, Zachary, Andrew, and Chris 4-5; Raymond and Noah 3-6; Daniel 2-7. Isaiah would most likely hold the 6th seed on points for. Standings, the Playoff Picture, the Weekly Report, and the Waiver Wire stay at Week 8 until Week 9 is final.",
  },
  {
    id: "week-8-recap",
    category: "Recap",
    title: "Week 8 final: Daniel wins, Isaiah jumps to 4th, Matthew survives by 1.14",
    dek: "The league's only winless team is winless no more, and five teams are now tied at 4-4.",
    date: "2026-11-02",
    paragraphs: [
      "Daniel beat Raymond 121.80 to 75.04 for his first win of the season. It was his best score of the year by more than 23 points, led by Tyler Allgeier, a free agent he picked up on Wednesday, with 34.6.",
      "Isaiah posted the week's top score, 156.00, and beat lanny by 55.18. Bhayshul Tuten (30.4) and Braelon Allen (25.8) led the way. The win moves Isaiah from 9th to 4th, the best of the five 4-4 teams on points for.",
      "Matthew beat Zachary 120.22 to 119.08. Kirk Cousins, claimed for $2 after Chris dropped him on Tuesday, scored 29.68. Zachary had Patrick Mahomes and his 25.94 points on the bench. Jonathan beat Ethan 154.58 to 122.50 behind Joe Burrow's 42.98, the second-best game by any player this season.",
    ],
    list: [
      { label: "Isaiah 156.00 · lanny 100.82", detail: "Isaiah wins by 55.18, the biggest margin of the week, and moves into the 4th seed" },
      { label: "Jonathan 154.58 · Ethan 122.50", detail: "Jonathan wins his second straight and moves to 5-3" },
      { label: "Daniel 121.80 · Raymond 75.04", detail: "Daniel's first win of the season" },
      { label: "Matthew 120.22 · Zachary 119.08", detail: "Matthew wins by 1.14 and is alone in 1st at 7-1" },
      { label: "Noah 106.06 · Andrew 69.28", detail: "Noah wins; Andrew has lost three straight" },
      { label: "Chris 95.26 · Nicholas 68.66", detail: "Chris wins his second straight; Nicholas has the week's lowest score" },
    ],
    outro: "Standings: Matthew 7-1; Ethan 6-2; Jonathan 5-3; Isaiah, Zachary, lanny, Nicholas, and Andrew 4-4; Raymond, Chris, and Noah 3-5; Daniel 1-7. lanny holds the 6th seed by 21.64 points over Nicholas. See the Playoff Picture tab for the current bracket.",
  },
  {
    id: "week-9-preview",
    category: "Preview",
    title: "Week 9 preview: the Tuten trade rematch, and Zachary's bye-week problem",
    dek: "What to watch in every matchup. Projections are Yahoo's as of Monday night, before waivers.",
    date: "2026-11-02",
    paragraphs: [
      "Six weeks are left in the regular season. Pittsburgh and Tennessee are on bye, which takes a starter away from Isaiah, Daniel, Andrew, and Noah, and two from Zachary. Waivers clear Wednesday.",
    ],
    list: [
      {
        label: "Isaiah (4-4) vs. Daniel (1-7) · Proj: Isaiah 91.24, Daniel 88.63",
        detail: "The closest projection of the week, and the two sides of the Tuten-for-Pickens trade. Daniel is 2-0 against Isaiah all-time. Each loses a Steeler to the bye: Isaiah's kicker, Chris Boswell, and Daniel's RB, Rico Dowdle. See Matchup of the Week.",
      },
      {
        label: "lanny (4-4) vs. Ethan (6-2) · Proj: lanny 117.34, Ethan 111.76",
        detail: "lanny holds the last playoff spot and projects higher than the league's best team. Ethan is 4-1 against lanny all-time.",
      },
      {
        label: "Chris (3-5) vs. Zachary (4-4) · Proj: Chris 109.39, Zachary 81.56",
        detail: "Zachary has Tony Pollard and the Steelers D/ST in his lineup, and both are on bye. Chris has won two straight and leads the all-time series 4-2.",
      },
      {
        label: "Andrew (4-4) vs. Jonathan (5-3) · Proj: Jonathan 114.41, Andrew 77.08",
        detail: "Andrew has lost three straight and has Jaylen Warren on bye. Jonathan is 6-1 against Andrew all-time. Andrew still has all $100 of his FAAB budget.",
      },
      {
        label: "Noah (3-5) vs. Matthew (7-1) · Proj: Matthew 120.82, Noah 90.96",
        detail: "Matthew has won three straight. Noah is without DK Metcalf, on bye.",
      },
      {
        label: "Nicholas (4-4) vs. Raymond (3-5) · Proj: Nicholas 112.90, Raymond 109.66",
        detail: "The first time these two have ever played, and a must-win for both. Nicholas has lost three straight; Raymond is one game out with more points for than three of the 4-4 teams.",
      },
    ],
    outro: "On waivers: Cam Ward (27.76), Adonai Mitchell (23.2), Chimere Dike (21.32), and Bo Nix (19.78) all scored big in Week 8 while unrostered.",
  },
  {
    id: "week-9-matchup-of-the-week",
    category: "Matchup of the Week",
    title: "Week 9: Isaiah vs. Daniel, three weeks after the Tuten trade",
    dek: "The 4th seed against the team that just got its first win.",
    date: "2026-11-02",
    paragraphs: [
      "On Oct 13, Isaiah sent George Pickens to Daniel for Bhayshul Tuten. Tuten has 53.6 points since, including 30.4 in Week 8. Pickens has 28.8. They meet for the first time since the trade, and Yahoo projects the closest game of the week: Isaiah 91.24, Daniel 88.63.",
      "Isaiah is coming off the week's top score (156.00) and sits 4th on points for. Daniel just scored a season-high 121.80 and has won the only two times these teams have played, in 2024 and 2025.",
      "Our pick: Isaiah. His lineup is deeper, and Daniel's best week came against a Raymond team that scored 75. But Daniel has beaten Isaiah twice before, so don't count on it.",
    ],
  },
  {
    id: "week-8-awards",
    category: "Awards",
    title: "Week 8 awards",
    dek: "The best, worst, luckiest, and unluckiest of the week.",
    date: "2026-11-02",
    paragraphs: [],
    list: [
      { label: "Top score: Isaiah, 156.00", detail: "His best week of the season and the third-highest score in the league this year." },
      { label: "Lowest score: Nicholas, 68.66", detail: "Zay Flowers scored 0 and Spencer Shrader scored 1." },
      { label: "Biggest blowout: Isaiah over lanny by 55.18", detail: "lanny's Buccaneers D/ST scored 21 and it didn't matter." },
      { label: "Closest game: Matthew over Zachary by 1.14", detail: "Matthew's Kirk Cousins, a $2 waiver claim, scored 29.68." },
      { label: "Luckiest win: Chris", detail: "95.26 was only the 9th-best score of the week. It beat Nicholas." },
      { label: "Unluckiest loss: Ethan", detail: "122.50 was the 3rd-best score of the week and would have beaten nine teams. It didn't beat Jonathan." },
      { label: "Player of the week: Joe Burrow, 42.98", detail: "The second-best game by any player this season, behind Josh Allen's 44.82 in Week 2. Tee Higgins added 32." },
      { label: "Best player nobody had: Cam Ward, 27.76", detail: "Daniel had him for about a minute during the Oct 21 QB carousel. Adonai Mitchell (23.2) and Chimere Dike (21.32) were also on waivers." },
      { label: "Bench of the week: Zachary", detail: "Patrick Mahomes scored 25.94 on the bench while Jayden Daniels scored 15.48. Starting Mahomes would have won by more than 9. Ethan also benched Kyler Murray (21.4) and started Lamar Jackson (0)." },
    ],
  },
  {
    id: "week-8-power-rankings",
    category: "Power Rankings",
    title: "Power Rankings: Ethan still on top, Isaiah climbs",
    dek: "Based on all-play record (how each team would do against every team every week), plus trades.",
    date: "2026-11-02",
    paragraphs: [
      "All-play record strips out schedule luck: it counts how often each team outscored the rest of the league each week. Records and all-play are through Week 8.",
    ],
    list: [
      { label: "1. Ethan (6-2, all-play 70-18)", detail: "Lost to Jonathan's 154.58 with the third-best score of the week. Still scoring 128.6 a week, 11.7 more than anyone else." },
      { label: "2. Matthew (7-1, all-play 59-29)", detail: "Alone in 1st after a 1.14-point win. The Kirk Cousins claim was the move of the week." },
      { label: "3. Jonathan (5-3, all-play 56-32)", detail: "Two straight wins, and Joe Burrow just had the second-best game of the season. 116.8 a week, nearly even with Matthew." },
      { label: "4. Raymond (3-5, all-play 49-39)", detail: "Fourth in all-play, 9th in the standings. Scored 75.04 in Week 8, his second-worst week, and lost to the team that hadn't won all year." },
      { label: "5. Zachary (4-4, all-play 48-40)", detail: "Lost by 1.14 with Mahomes on the bench, and has two starters on bye in Week 9." },
      { label: "6. Isaiah (4-4, all-play 46-42)", detail: "The week's top score and up to the 4th seed. Tuten and Braelon Allen give him one of the league's best backfields." },
      { label: "7. lanny (4-4, all-play 40-48)", detail: "Two straight losses, but he still holds the 6th seed." },
      { label: "8. Nicholas (4-4, all-play 39-49)", detail: "Three straight losses and the week's lowest score. Out of the playoff picture for now." },
      { label: "9. Chris (3-5, all-play 35-53)", detail: "Two straight wins. The Cousins drop hurt Zachary more than it hurt him." },
      { label: "10. Noah (3-5, all-play 36-52)", detail: "Back in the win column, with Drake Maye (23.46) and a $2 Jaguars defense (25)." },
      { label: "11. Andrew (4-4, all-play 30-58)", detail: "Three straight losses and the second-worst all-play record. Still 4-4." },
      { label: "12. Daniel (1-7, all-play 20-68)", detail: "Finally. 121.80, his best week by far, and his first win." },
    ],
  },
  {
    id: "week-8-waiver-wire",
    category: "Waiver Wire",
    title: "Waiver Wire: Allgeier and Cousins swing two games",
    dek: "Who found points on the wire this week, and who gave a starting QB to a rival. Full lists are on the Waiver Wire tab.",
    date: "2026-11-02",
    paragraphs: ["Points are Week 8 fantasy points scored for the team that picked the player up."],
    list: [
      { label: "Tyler Allgeier (RB) · Daniel · 34.60", detail: "A Wednesday free agent and the top-scoring pickup of the week. Daniel's first win." },
      { label: "Kirk Cousins (QB) · Matthew · 29.68", detail: "A $2 claim after Chris dropped him. Matthew won by 1.14." },
      { label: "Jaguars (D/ST) · Noah · 25.00", detail: "A $2 defense that held Indianapolis to 7." },
      { label: "Buccaneers (D/ST) · lanny · 21.00", detail: "Added Sunday morning, after 31 on waivers in Week 7." },
      { label: "Bills (D/ST) · Jonathan · 17.50", detail: "On the bench, in a 32-point win." },
      { label: "Commanders (D/ST) · Isaiah · 16.50", detail: "Part of the week's top score." },
    ],
    outro: "The one that got away: Chris dropped Kirk Cousins on Tuesday to make room with Josh Allen back. Cousins scored 29.68 for Matthew, who beat Zachary by 1.14. Isaiah's 82.0 points from pickups were the most in the league this week.",
  },
  {
    id: "worst-start-ever",
    category: "Feature",
    title: "Daniel's 0-6 is the worst start in league history",
    dek: "We went back through every season since 2022 to check.",
    date: "2026-10-19",
    paragraphs: [
      "It's official. No team in league history had ever started 0-5, let alone 0-6, before this season. Daniel's all-play record is 8-58: in six weeks, he has outscored another team only eight times.",
      "The closest comparison is Abiy's 2024 team, which started 1-5. That team actually scored fewer points through six weeks (467.24 to Daniel's 497.16), thanks to a 36.91-point Week 6, but it had a win, and its all-play record (15-51) was nearly twice as good.",
      "It hasn't all been Daniel's fault. His opponents have averaged almost 118 points a week, the second-hardest schedule in the league. But the draft didn't help: his first five picks have scored the fewest points in the league, and his 2nd-round pick, Josh Jacobs, hasn't scored a point.",
      "He was one of the league's best managers before this year, going 11-3 in 2024 and 8-6 in 2025. Everyone has a bad season. This is just the worst one we've seen. His best shot at a first win is Week 7, against 1-5 Chris.",
    ],
  },
  {
    id: "draft-report-card",
    category: "Feature",
    title: "Draft report card, through Week 6",
    dek: "Grading every draft by how many points its picks have scored, no matter where they play now.",
    date: "2026-10-19",
    paragraphs: [
      "We added up every point each team's 14 draft picks have scored this season, including players who have since been traded or dropped. The league average is about 767.",
    ],
    list: [
      { label: "Best: Ethan · 915 points", detail: "Jaxon Smith-Njigba in round 1, then D'Andre Swift, Davante Adams, Christian Watson, and Chuba Hubbard. It's why he's 5-1." },
      { label: "Runner-up: Isaiah · 852 points", detail: "De'Von Achane at #5 was a miss (21 points, now a free agent), but Trevor Lawrence in round 7 and Matthew Golden in round 11 made up for it." },
      { label: "Third: Jonathan · 837 points", detail: "Derrick Henry, Joe Burrow, and Matthew Stafford in round 11." },
      { label: "Best first five rounds: Matthew · 448 points", detail: "Jahmyr Gibbs and Kenneth Walker III are two of the best RBs in the league." },
      { label: "Worst first five rounds: Daniel · 228 points", detail: "Ja'Marr Chase at #1 overall has 60 points, and Josh Jacobs in round 2 has none." },
      { label: "Worst overall: Noah · 632 points", detail: "The fewest points of any draft. Drake Maye in round 5 (125 points) is the only big hit." },
    ],
  },
  {
    id: "best-teams-ever",
    category: "Feature",
    title: "History corner: the best teams in league history",
    dek: "Ranked by all-play record over the regular season, 2022 to 2025.",
    date: "2026-10-18",
    paragraphs: [
      "Isaiah's 2022 team is the best by the numbers. It scored the most points in league history (1,713) and had the top score of the week five times, but went 9-5 and lost in the final to Chris.",
      "Raymond's 2024 team is the best champion. It went 10-4, then won two playoff games for a league-record 12 wins.",
      "On the other end, Abiy finished in the bottom three in all four seasons he played, never finished better than 9th, and scored about 14 points a week below average.",
    ],
    outro: "Watch this space: Ethan's 2026 team has outscored 79% of the league week to week, the best rate in league history. If he keeps it up, he'll top this list.",
  },
];
