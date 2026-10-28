// Hand-written league news, newest first. Edit this file to publish a new
// story; the News tab renders whatever is here.
//
// Last updated: Week 7 final, including Monday night (Oct 27, 2026).

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
    id: "week-7-recap",
    category: "Recap",
    title: "Week 7 final: Daniel loses by 0.12, Jonathan wins the play-in",
    dek: "Chris snaps his five-game losing streak by the second-smallest margin in league history, and five teams are now 4-3.",
    date: "2026-10-27",
    paragraphs: [
      "Chris beat Daniel 98.20 to 98.08, the second-closest regular-season game in league history (Isaiah beat Andrew by 0.04 in 2025). Daniel had Luther Burden III and his 21.7 points on the bench while Rico Dowdle scored 11.1 in his flex spot. It's also the second time Daniel has lost by exactly 0.12: Zachary beat him 117.39 to 117.27 in the 2024 playoffs. Daniel is 0-7.",
      "Jonathan won the play-in game, beating Isaiah 112.68 to 88.68 behind Joe Burrow's 29.38. Isaiah dropped Geno Smith on Saturday to claim Aaron Rodgers; Geno scored 24.98 on waivers and Rodgers scored 13.58.",
      "Zachary posted the week's top score, 120.20, and beat Nicholas by 36.78. Tony Pollard (37.0) was the best player in the league this week. Raymond beat lanny 110.80 to 102.26 in the blockbuster rematch, and Ethan and Matthew both won to stay 6-1.",
    ],
    list: [
      { label: "Zachary 120.20 · Nicholas 83.42", detail: "Zachary wins by 36.78, the biggest margin of the week" },
      { label: "Jonathan 112.68 · Isaiah 88.68", detail: "Jonathan wins the play-in and moves to 4-3" },
      { label: "Ethan 111.20 · Noah 103.44", detail: "Ethan wins his third straight and stays in 1st" },
      { label: "Raymond 110.80 · lanny 102.26", detail: "Raymond wins the trade rematch, his third straight win" },
      { label: "Chris 98.20 · Daniel 98.08", detail: "Chris wins by 0.12; Daniel falls to 0-7" },
      { label: "Matthew 89.52 · Andrew 83.22", detail: "Matthew wins the lowest-scoring game of the week and moves to 6-1" },
    ],
    outro: "Standings: Ethan and Matthew 6-1; Jonathan, Zachary, Nicholas, lanny, and Andrew 4-3; Raymond and Isaiah 3-4; Chris and Noah 2-5; Daniel 0-7. Andrew is the 4-3 team on the outside, 25.48 points behind lanny for the 6th seed. See the Playoff Picture tab for the current bracket.",
  },
  {
    id: "week-8-preview",
    category: "Preview",
    title: "Week 8 preview: 1st vs. 3rd, and Isaiah gets a shot at the 6th seed",
    dek: "What to watch in every matchup. Projections are Yahoo's as of Tuesday afternoon, before waivers.",
    date: "2026-10-27",
    paragraphs: [
      "Seven weeks are left. San Francisco, Houston, New Orleans, and the Giants are on bye, which hits Zachary and Noah hardest. Waivers clear Wednesday.",
    ],
    list: [
      {
        label: "Ethan (6-1) vs. Jonathan (4-3) · Proj: Jonathan 119.95, Ethan 115.29",
        detail: "The league's best team against the hottest QB of Week 7. Ethan is 2-0 against Jonathan all-time. See Matchup of the Week.",
      },
      {
        label: "Isaiah (3-4) vs. lanny (4-3) · Proj: lanny 113.37, Isaiah 93.50",
        detail: "lanny holds the 6th seed, one game ahead of Isaiah. A win gets Isaiah back to .500 and level with lanny on record. George Kittle is on bye in Isaiah's lineup, and the all-time series is 3-3.",
      },
      {
        label: "Zachary (4-3) vs. Matthew (6-1) · Proj: Matthew 96.32, Zachary 82.30",
        detail: "Zachary has Malik Nabers and Christian Kirk in his lineup, and both are on bye. Matthew's QB, Tyler Shough, is on bye too. Zachary leads the all-time series 4-2.",
      },
      {
        label: "Nicholas (4-3) vs. Chris (2-5) · Proj: Nicholas 106.56, Chris 105.76",
        detail: "The closest projection of the week, and the first time these two have ever played. Josh Allen is back from his bye for Chris, but Chris has no defense in his lineup after dropping the Jets on Tuesday.",
      },
      {
        label: "Andrew (4-3) vs. Noah (2-5) · Proj: Andrew 95.05, Noah 82.48",
        detail: "Alvin Kamara and the 49ers D/ST are both on bye in Noah's lineup. Andrew is the odd team out of the playoff picture right now and still has all $100 of his FAAB budget.",
      },
      {
        label: "Daniel (0-7) vs. Raymond (3-4) · Proj: Raymond 92.19, Daniel 81.64",
        detail: "Woody Marks is on bye for Daniel, and Ka'imi Fairbairn is on bye for Ray. Ray has won three straight. Daniel has lost by 0.12. The series is 2-2.",
      },
    ],
    outro: "On waivers: the Buccaneers D/ST scored 31 in Week 7 while unrostered, and Malik Willis (28.52), Bo Nix (27.78), and Geno Smith (24.98) are all available at QB. Isaiah has $0 of FAAB left; Andrew and Ray have plenty.",
  },
  {
    id: "week-8-matchup-of-the-week",
    category: "Matchup of the Week",
    title: "Week 8: Ethan vs. Jonathan, 1st place against the 3rd seed",
    dek: "Jonathan projects higher than the best team in the league.",
    date: "2026-10-27",
    paragraphs: [
      "Ethan is 6-1 and has outscored 61 of 77 possible opponents this season. He's averaging 129.5 points a week, 13 more than anyone else. Jonathan is 4-3, the 3rd seed, and has the league's fourth-best all-play record (46-31).",
      "Yahoo likes Jonathan, 119.95 to 115.29. Joe Burrow just scored 29.38, and Puka Nacua and Derrick Henry give him two more starters projected for 17 or more. Ethan's QB is Kyler Murray, a $1 pickup last week, with Jaxon Smith-Njigba projected for 20.21.",
      "Our pick: Ethan. He's beaten Jonathan both times they've played, and he's scored under 111 only twice this year.",
    ],
  },
  {
    id: "week-7-awards",
    category: "Awards",
    title: "Week 7 awards",
    dek: "The best, worst, luckiest, and unluckiest of the week.",
    date: "2026-10-27",
    paragraphs: [],
    list: [
      { label: "Top score: Zachary, 120.20", detail: "Tony Pollard (37.0) and Bucky Irving (28.0) combined for 65." },
      { label: "Lowest score: Andrew, 83.22", detail: "Breece Hall scored 0 and the Ravens D/ST scored -3.5." },
      { label: "Biggest blowout: Zachary over Nicholas by 36.78", detail: "Nicholas had Quinshon Judkins (25.9) and Jacoby Brissett (18.48) on his bench." },
      { label: "Closest game: Chris over Daniel by 0.12", detail: "The second-closest regular-season game in league history." },
      { label: "Luckiest win: Matthew", detail: "89.52 was only the 9th-best score of the week. It beat Andrew." },
      { label: "Unluckiest loss: Noah", detail: "103.44 was the 5th-best score of the week and would have beaten seven teams. It didn't beat Ethan." },
      { label: "Player of the week: Tony Pollard, 37.0", detail: "129 rushing yards and three touchdowns, for Zachary." },
      { label: "Best player nobody had: Buccaneers D/ST, 31", detail: "The top defense of the week was on waivers. So were Malik Willis (28.52) and Bo Nix (27.78), though Daniel had Willis for about a minute." },
      { label: "Bench of the week: Daniel", detail: "Luther Burden III scored 21.7 on the bench. Starting him over Rico Dowdle (11.1) would have won the game." },
    ],
  },
  {
    id: "week-7-power-rankings",
    category: "Power Rankings",
    title: "Power Rankings: Ethan and Matthew hold, Raymond keeps climbing",
    dek: "Based on all-play record (how each team would do against every team every week), plus trades.",
    date: "2026-10-27",
    paragraphs: [
      "All-play record strips out schedule luck: it counts how often each team outscored the rest of the league each week. Records and all-play are through Week 7.",
    ],
    list: [
      { label: "1. Ethan (6-1, all-play 61-16)", detail: "Scoring 129.5 a week, 13.1 more than anyone else. Still the clear favorite." },
      { label: "2. Matthew (6-1, all-play 52-25)", detail: "Won Week 7 with 89.52, his second-lowest score of the year. Still second in all-play by a wide margin." },
      { label: "3. Jonathan (4-3, all-play 46-31)", detail: "Won the play-in game, and Joe Burrow is back to being Joe Burrow. Third in scoring at 111.4 a week." },
      { label: "4. Raymond (3-4, all-play 47-30)", detail: "Third in all-play, 8th in the standings. Three straight wins, and the blockbuster trade is paying off." },
      { label: "5. Zachary (4-3, all-play 42-35)", detail: "The week's top score and three straight wins. Week 8's byes make this a tough week to keep it going." },
      { label: "6. Nicholas (4-3, all-play 39-38)", detail: "Two straight losses, and 67.6 points on the bench in Week 7. The roster is better than the results." },
      { label: "7. lanny (4-3, all-play 36-41)", detail: "Holds the 6th seed. Bijan Robinson and Kyren Williams are still the reason to believe." },
      { label: "8. Isaiah (3-4, all-play 35-42)", detail: "Lost the play-in game and gets lanny next, with the 6th seed on the line." },
      { label: "9. Chris (2-5, all-play 32-45)", detail: "Snapped a five-game losing streak by 0.12. Omar Cooper Jr. was a $3 hit." },
      { label: "10. Andrew (4-3, all-play 29-48)", detail: "The lowest score of the week and the second-worst all-play record. 4-3 is a gift." },
      { label: "11. Noah (2-5, all-play 31-46)", detail: "Drake Maye scored 29.44 and Noah still lost. Three straight losses." },
      { label: "12. Daniel (0-7, all-play 12-65)", detail: "His best score of the season, and a loss by 0.12. It's that kind of year." },
    ],
  },
  {
    id: "week-7-waiver-wire",
    category: "Waiver Wire",
    title: "Waiver Wire: Omar Cooper Jr. wins Chris a game",
    dek: "Who found points on the wire this week, and who let a 25-point QB walk. Full lists are on the Waiver Wire tab.",
    date: "2026-10-27",
    paragraphs: ["Points are Week 7 fantasy points scored for the team that picked the player up."],
    list: [
      { label: "Omar Cooper Jr. (WR) · Chris · 19.00", detail: "A $3 claim and the top-scoring pickup of the week. Chris won by 0.12." },
      { label: "Tyler Shough (QB) · Matthew · 15.32", detail: "Dropped by Ray and Daniel, claimed for $0 by Matthew, and started right away." },
      { label: "Kyler Murray (QB) · Ethan · 14.90", detail: "A $1 starting QB for the first-place team." },
      { label: "Aaron Rodgers (QB) · Isaiah · 13.58", detail: "Started, then dropped on Tuesday." },
      { label: "Chase McLaughlin (K) · Ethan · 11.60", detail: "One of four useful Ethan pickups this week." },
      { label: "Rico Dowdle (RB) · Daniel · 11.10", detail: "A good pickup in the wrong lineup slot. See the awards." },
    ],
    outro: "The ones that got away: Isaiah dropped Geno Smith (24.98) for Rodgers and Cam Skattebo (20.6) for the Cardinals D/ST (-3.5), and Matthew dropped Michael Penix Jr. (20.42) and Tyler Huntley (16.12). Daniel also added and dropped 12 QBs in three minutes on Wednesday morning, which we're not counting.",
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
