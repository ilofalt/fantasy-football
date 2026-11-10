// Hand-written league news, newest first. Edit this file to publish a new
// story; the News tab renders whatever is here.
//
// Last updated: Week 9 final, including Monday night (Nov 9, 2026).

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
    id: "week-9-recap",
    category: "Recap",
    title: "Week 9 final: Daniel edges Isaiah by 0.82, and Zachary wins on Monday night",
    dek: "Isaiah drops out of the playoff picture, three teams are tied at 5-4, and Matthew is two games clear in 1st.",
    date: "2026-11-09",
    paragraphs: [
      "Daniel beat Isaiah 101.80 to 100.98, the second-closest game of the season and Daniel's second straight win. He did it with Dak Prescott (19.5) on the bench. Isaiah had Omarion Hampton (7.0) on his bench while Josh Jacobs scored 0.5; that swap alone would have won it. The loss drops Isaiah from 4th to 7th.",
      "Zachary trailed Chris by 4.88 going into Monday night and won 105.26 to 96.20. James Cook III (19.2) and Will Reichard (9.6) outscored Josh Allen (14.86) in Buffalo's game at Minnesota.",
      "Nicholas posted the week's top score, 128.88, and beat Raymond, who was as overmatched as usual, to snap a three-game losing streak. lanny beat Ethan 114.98 to 104.78 behind Jordan Love's 36.68, Ethan's second straight loss. Matthew beat Noah by 32.48 for his fourth straight win, and Jonathan beat Andrew, whose C.J. Stroud had the best game of the week (37.36).",
    ],
    list: [
      { label: "Nicholas 128.88 · Raymond 117.90", detail: "Nicholas has the top score of the week and snaps a three-game skid. Ray loses, which is tradition at this point" },
      { label: "Matthew 126.38 · Noah 93.90", detail: "Matthew wins by 32.48, the biggest margin of the week, and moves to 8-1" },
      { label: "Jonathan 124.52 · Andrew 106.86", detail: "Jonathan's third straight win; Andrew has lost four straight" },
      { label: "lanny 114.98 · Ethan 104.78", detail: "lanny wins; Ethan has lost two straight" },
      { label: "Zachary 105.26 · Chris 96.20", detail: "Zachary comes back on Monday night" },
      { label: "Daniel 101.80 · Isaiah 100.98", detail: "Daniel wins by 0.82, his second straight win" },
    ],
    outro: "Standings: Matthew 8-1; Ethan and Jonathan 6-3; Zachary, lanny, and Nicholas 5-4; Isaiah and Andrew 4-5; Raymond (of course), Chris, and Noah 3-6; Daniel 2-7. Nicholas holds the 6th seed, one game ahead of Isaiah. See the Playoff Picture tab for the current bracket.",
  },
  {
    id: "week-10-preview",
    category: "Preview",
    title: "Week 10 preview: Isaiah vs. Nicholas for the 6th seed, and Ethan's bye-week disaster",
    dek: "What to watch in every matchup. Projections are Yahoo's as of Tuesday morning, before waivers.",
    date: "2026-11-09",
    paragraphs: [
      "Five weeks are left. Chicago, Denver, Philadelphia, and Tampa Bay are on bye, and it hits Ethan hardest: Bo Nix, D'Andre Swift, Saquon Barkley, and Chase McLaughlin are all on bye, and he has three empty lineup spots. Waivers clear Wednesday.",
    ],
    list: [
      {
        label: "Isaiah (4-5) vs. Nicholas (5-4) · Proj: Isaiah 107.76, Nicholas 105.93",
        detail: "The first time these two have played, with the 6th seed at stake. Isaiah has 45.70 more points for, so a win would pull him even with Nicholas and ahead on the tiebreaker. He swapped Chris Boswell in for Cairo Santos, who's on bye. See Matchup of the Week.",
      },
      {
        label: "Daniel (2-7) vs. Ethan (6-3) · Proj: Daniel 80.28, Ethan 72.73",
        detail: "Yahoo projects the team with the league's worst record over the team with the most points. Ethan benched his four bye-week starters but has nobody to replace three of them, so his QB, RB, and K slots are empty for now. Daniel has won two straight and is 0-3 against Ethan all-time.",
      },
      {
        label: "Raymond (3-6) vs. Zachary (5-4) · Proj: Raymond 115.39, Zachary 97.42",
        detail: "Ray is two games out and can't afford another loss, which has never stopped him before. Yahoo likes him on paper, but Yahoo has liked Ray on paper all season. Zachary benched Bucky Irving (bye) for Tony Pollard. Ray leads the series 4-2. Fuck Ray.",
      },
      {
        label: "Andrew (4-5) vs. lanny (5-4) · Proj: Andrew 102.54, lanny 102.54",
        detail: "A dead-even projection. Andrew has lost four straight but moved Jaylen Warren into J.K. Dobbins' spot; lanny still has the Broncos D/ST, on bye, in his lineup. The all-time series is 3-3.",
      },
      {
        label: "Chris (3-6) vs. Matthew (8-1) · Proj: Matthew 115.42, Chris 110.64",
        detail: "Matthew has won four straight. Chris has Josh Allen projected for 25.55, the most of any player this week. The series is 4-4.",
      },
      {
        label: "Noah (3-6) vs. Jonathan (6-3) · Proj: Jonathan 100.05, Noah 81.90",
        detail: "Noah has Jonah Coleman and Colston Loveland on bye. Jonathan has won three straight. The series is 1-1.",
      },
    ],
    outro: "On waivers: Kayshon Boutte (26.5), Shedeur Sanders (23.68), Corey Kiner (22.46), and the Giants D/ST (20) all scored big in Week 9 while unrostered, and Cam Little (19.1) was on waivers after Raymond, in a classic Ray move, cut him.",
  },
  {
    id: "week-10-matchup-of-the-week",
    category: "Matchup of the Week",
    title: "Week 10: Isaiah vs. Nicholas, with the 6th seed on the line",
    dek: "Two teams that have never played, one game apart in the standings.",
    date: "2026-11-09",
    paragraphs: [
      "Nicholas is 5-4 and holds the last playoff spot after the week's top score (128.88). Isaiah is 4-5 after losing to Daniel by 0.82, but he's scored 45.70 more points, so a win would pull him even on record and ahead on the tiebreaker.",
      "After Tuesday's lineup changes, Yahoo has it nearly even: Isaiah 107.76, Nicholas 105.93. Brock Purdy (projected 22.77) and Christian McCaffrey (19.54) lead Nicholas' lineup. Isaiah's best projected players are Trevor Lawrence (21.20) and Bhayshul Tuten (16.48), and Chris Boswell replaces Cairo Santos, who's on bye.",
      "Our pick: Isaiah, narrowly. He's outscored Nicholas in five of nine weeks this season, and Nicholas' scores have swung from 68.66 to 128.88.",
    ],
  },
  {
    id: "week-9-awards",
    category: "Awards",
    title: "Week 9 awards",
    dek: "The best, worst, luckiest, and unluckiest of the week.",
    date: "2026-11-09",
    paragraphs: [],
    list: [
      { label: "Top score: Nicholas, 128.88", detail: "Brock Purdy scored 28.78 and the 49ers D/ST, a $0 waiver claim, scored 24." },
      { label: "Lowest score: Noah, 93.90", detail: "Ladd McConkey scored 0 and Ashton Jeanty scored 3." },
      { label: "Biggest blowout: Matthew over Noah by 32.48", detail: "Kenneth Walker III scored 36.3 for Matthew." },
      { label: "Closest game: Daniel over Isaiah by 0.82", detail: "The second-closest game of the season, after Daniel's 0.12-point loss to Chris in Week 7." },
      { label: "Luckiest win: Daniel", detail: "101.80 was only the 9th-best score of the week. It beat Isaiah." },
      { label: "Unluckiest loss: Raymond", detail: "117.90 was the 4th-best score of the week and would have beaten eight teams. It didn't beat Nicholas. Ray finds a way, and the way is always losing." },
      { label: "Player of the week: C.J. Stroud, 37.36", detail: "The top score by any player, for Andrew, who lost anyway. Jordan Love (36.68) and Kenneth Walker III (36.3) were right behind him." },
      { label: "Best player nobody had: Kayshon Boutte, 26.5", detail: "Shedeur Sanders (23.68) and the Giants D/ST (20) were also on waivers." },
      { label: "Bench of the week: Isaiah", detail: "Omarion Hampton scored 7.0 on the bench while Josh Jacobs scored 0.5 in his lineup. Starting Hampton would have beaten Daniel by 5.68." },
    ],
  },
  {
    id: "week-9-power-rankings",
    category: "Power Rankings",
    title: "Power Rankings: Ethan slips but stays on top",
    dek: "Based on all-play record (how each team would do against every team every week), plus trades.",
    date: "2026-11-09",
    paragraphs: [
      "All-play record strips out schedule luck: it counts how often each team outscored the rest of the league each week. Records and all-play are through Week 9.",
    ],
    list: [
      { label: "1. Ethan (6-3, all-play 74-25)", detail: "Two straight losses, but still the league's best all-play record and 125.9 points a week. Four starters on bye in Week 10 is a problem." },
      { label: "2. Matthew (8-1, all-play 69-30)", detail: "Four straight wins and a two-game lead for the 1st seed." },
      { label: "3. Jonathan (6-3, all-play 65-34)", detail: "Three straight wins, averaging 130.6 over that stretch." },
      { label: "4. Raymond (3-6, all-play 57-42)", detail: "Fourth in all-play, 9th in the standings. The roster is good; the guy running it is the problem. Also left 17.56 points on his bench in Week 9. Fuck Ray." },
      { label: "5. Zachary (5-4, all-play 53-46)", detail: "Won on Monday night and holds the 4th seed." },
      { label: "6. Nicholas (5-4, all-play 50-49)", detail: "The week's top score and back in the 6th seed." },
      { label: "7. Isaiah (4-5, all-play 48-51)", detail: "Lost by 0.82 with 7 points on the bench. Fourth in points for, 7th in the standings." },
      { label: "8. lanny (5-4, all-play 47-52)", detail: "Beat Ethan behind Jordan Love's 36.68 and holds the 5th seed." },
      { label: "9. Andrew (4-5, all-play 36-63)", detail: "Four straight losses, even with Stroud's 37.36 in Week 9." },
      { label: "10. Chris (3-6, all-play 36-63)", detail: "Led Zachary going into Monday night and lost." },
      { label: "11. Noah (3-6, all-play 36-63)", detail: "The lowest score of Week 9, and two starters on bye in Week 10." },
      { label: "12. Daniel (2-7, all-play 23-76)", detail: "Two straight wins. Projected to beat Ethan in Week 10." },
    ],
  },
  {
    id: "week-9-waiver-wire",
    category: "Waiver Wire",
    title: "Waiver Wire: defenses rule, and Bo Nix finally gets a start",
    dek: "Who found points on the wire this week, and who dropped a 19-point kicker. Full lists are on the Waiver Wire tab.",
    date: "2026-11-09",
    paragraphs: ["Points are Week 9 fantasy points scored for the team that picked the player up."],
    list: [
      { label: "49ers (D/ST) · Nicholas · 24.00", detail: "A $0 claim and the top-scoring pickup of the week." },
      { label: "Bo Nix (QB) · Ethan · 17.18", detail: "Nicholas, Isaiah, and Matthew all let him go. Ethan started him." },
      { label: "Bills (D/ST) · Ethan · 17.00", detail: "Added Sunday, three days after Jonathan dropped them." },
      { label: "Chiefs (D/ST) · Isaiah · 16.50", detail: "Isaiah's best defense of the season, in a 0.82-point loss." },
      { label: "Tyler Bass (K) · Noah · 13.60", detail: "A $2 kicker who scored on Monday night." },
      { label: "Drew Lock (QB) · Daniel · 13.10", detail: "Started over Dak Prescott, and Daniel won anyway." },
    ],
    outro: "The ones that got away: Raymond, a man who should not be trusted with a waiver wire, dropped Cam Little, who scored 19.1 on waivers, and Matthew dropped Kirk Cousins (16.14) a week after Cousins won him a game. Chris got 68.1 points from pickups, the most of anyone this week.",
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
      "Raymond's 2024 team is the best champion, which he would very much like you to remember. It went 10-4, then won two playoff games for a league-record 12 wins.",
      "On the other end, Abiy finished in the bottom three in all four seasons he played, never finished better than 9th, and scored about 14 points a week below average.",
    ],
    outro: "Watch this space: Ethan's 2026 team has outscored 79% of the league week to week, the best rate in league history. If he keeps it up, he'll top this list.",
  },
];
