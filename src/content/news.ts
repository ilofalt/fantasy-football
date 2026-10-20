// Hand-written league news, newest first. Edit this file to publish a new
// story; the News tab renders whatever is here.
//
// Last updated: Week 6 final, including Monday night and stat corrections
// (Oct 19, 2026).

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
    id: "week-6-recap",
    category: "Recap",
    title: "Week 6 final: Isaiah drops 139, Daniel is officially 0-6",
    dek: "Matthew holds off Nicholas on Monday night, and three teams are now tied at 3-3 for the last playoff spot.",
    date: "2026-10-19",
    paragraphs: [
      "Isaiah posted the week's top score, a season-high 139.14, and beat Noah by 51.94 to get back to .500. Ethan beat Andrew 106.12 to 84.24, ending Andrew's four-game win streak, and Matthew held off Nicholas 111.02 to 103.16 once Monday night was done. That leaves Ethan and Matthew tied at 5-1 at the top.",
      "lanny edged Chris 100.54 to 93.78 in his first week with Bijan Robinson. Chris has now lost five straight. Raymond beat Jonathan 108.80 to 69.98, the lowest score of the week.",
      "Daniel's kicker needed about 20 points on Monday night and got 4.3. Zachary wins 121.70 to 84.72, and Daniel is the first team in league history to start 0-6.",
    ],
    list: [
      { label: "Isaiah 139.14 · Noah 87.20", detail: "Isaiah wins by 51.94, the biggest margin of the week" },
      { label: "Zachary 121.70 · Daniel 84.72", detail: "Zachary wins; Daniel falls to 0-6" },
      { label: "Matthew 111.02 · Nicholas 103.16", detail: "Matthew wins and moves to 5-1" },
      { label: "Raymond 108.80 · Jonathan 69.98", detail: "Raymond wins" },
      { label: "Ethan 106.12 · Andrew 84.24", detail: "Ethan wins and moves to 5-1" },
      { label: "lanny 100.54 · Chris 93.78", detail: "lanny wins the closest game of the week" },
    ],
    outro: "Standings: Ethan and Matthew 5-1; Nicholas, lanny, and Andrew 4-2; Jonathan, Isaiah, and Zachary 3-3; Raymond and Noah 2-4; Chris 1-5; Daniel 0-6. See the Playoff Picture tab for what the bracket would look like today.",
  },
  {
    id: "week-7-preview",
    category: "Preview",
    title: "Week 7 preview: a play-in game, a trade rematch, and the Toilet Bowl preview",
    dek: "What to watch in every matchup. Projections are Yahoo's as of Monday night, before waivers.",
    date: "2026-10-19",
    paragraphs: [
      "Eight weeks are left in the regular season, and Week 7 has something for everyone: the two teams fighting over the last playoff spot play each other, the two managers from the season's biggest trade meet again, and the league's two worst teams square off.",
    ],
    list: [
      {
        label: "Isaiah (3-3) vs. Jonathan (3-3) · Proj: Jonathan 109.26, Isaiah 81.02",
        detail: "A play-in game in October. Jonathan holds the 6th seed over Isaiah by 25.10 points for. The winner moves to 4-3 and the loser drops to 3-4. Isaiah's lineup projects for just 81 after his 139-point week, so expect roster moves before Sunday.",
      },
      {
        label: "lanny (4-2) vs. Raymond (2-4) · Proj: Raymond 108.01, lanny 101.84",
        detail: "The blockbuster rematch. Bijan Robinson faces the team that drafted him, and Amon-Ra St. Brown and Chase Brown are back from their byes. See Matchup of the Week.",
      },
      {
        label: "Andrew (4-2) vs. Matthew (5-1) · Proj: Andrew 93.97, Matthew 77.70",
        detail: "Upset alert. Matthew has the league's second-best scoring team, but Yahoo projects him for under 78. A loss could drop him into a tie with whichever 4-2 teams win.",
      },
      {
        label: "Noah (2-4) vs. Ethan (5-1) · Proj: Ethan 98.99, Noah 86.56",
        detail: "Ethan has outscored 52 of 66 possible opponents this year. Noah needs a big Drake Maye game to keep pace.",
      },
      {
        label: "Nicholas (4-2) vs. Zachary (3-3) · Proj: Nicholas 103.54, Zachary 65.51",
        detail: "Zachary scored 121.70 last week but has the lowest projection of Week 7. Bad news for one of the three teams tied at 3-3.",
      },
      {
        label: "Daniel (0-6) vs. Chris (1-5) · Proj: Chris 85.98, Daniel 85.32",
        detail: "The Toilet Bowl preview, and the closest projection of the week. Chris dropped David Montgomery, his 4th-round pick, on Monday morning. Daniel has never had a better chance at his first win.",
      },
    ],
    outro: "Also watch the waiver wire: Tyler Shough (93 points in five weeks for Ray, then 28.46 on Sunday while unrostered) clears waivers on Wednesday. Andrew still has all $100 of his FAAB budget. Isaiah has $0.",
  },
  {
    id: "week-7-matchup-of-the-week",
    category: "Matchup of the Week",
    title: "Week 7: lanny vs. Raymond, one week after the blockbuster",
    dek: "The two managers behind the season's biggest trade play each other right away.",
    date: "2026-10-19",
    paragraphs: [
      "A week after swapping six players, lanny and Raymond meet in Week 7. Bijan Robinson faces the team that drafted him, and Amon-Ra St. Brown and Chase Brown both come back from their byes, so this is the first real look at both sides of the deal.",
      "Yahoo projects Raymond to win, 108.01 to 101.84. Raymond is only 2-4, but his all-play record (39-27) is third-best in the league, and Javonte Williams has been one of the most reliable RBs anywhere. lanny is 4-2 and has the best player on the field in Bijan, plus Kyren Williams in the same backfield.",
      "Our pick: lanny, narrowly. Bijan's floor is higher than anyone Raymond received, and a 24-point game from him swings this.",
    ],
  },
  {
    id: "week-6-awards",
    category: "Awards",
    title: "Week 6 awards",
    dek: "The best, worst, luckiest, and unluckiest of the week.",
    date: "2026-10-19",
    paragraphs: [],
    list: [
      { label: "Top score: Isaiah, 139.14", detail: "His best week of the season, powered by Trevor Lawrence (28.34) and Bhayshul Tuten (23.2), the RB he traded for last week." },
      { label: "Lowest score: Jonathan, 69.98", detail: "The only score under 84 this week." },
      { label: "Biggest blowout: Isaiah over Noah by 51.94", detail: "Noah's 87.20 was his lowest score since Week 3." },
      { label: "Closest game: lanny over Chris by 6.76", detail: "The only game decided by less than 7." },
      { label: "Luckiest win: lanny", detail: "100.54 was only the 7th-best score of the week, and it still won." },
      { label: "Unluckiest loss: Nicholas", detail: "103.16 would have beaten six other teams. It didn't beat Matthew." },
      { label: "Player of the week: Kenneth Walker III, 29.9", detail: "The top-scoring player on any roster, for Matthew." },
      { label: "Best player nobody had: Tyler Shough, 28.46", detail: "Dropped by Ray on Wednesday and by Daniel on Sunday morning. The Titans D/ST also scored 26.5 on waivers." },
      { label: "Moral victory: Daniel", detail: "His 84.72 outscored both Andrew and Jonathan. He still lost by 37." },
    ],
  },
  {
    id: "week-6-power-rankings",
    category: "Power Rankings",
    title: "Power Rankings: Ethan and Matthew pull away",
    dek: "Based on all-play record (how each team would do against every team every week), plus trades.",
    date: "2026-10-19",
    paragraphs: [
      "All-play record strips out schedule luck: it counts how often each team outscored the rest of the league each week. Records and all-play are through Week 6.",
    ],
    list: [
      { label: "1. Ethan (5-1, all-play 52-14)", detail: "Scoring 132.5 a week, 11.6 more than anyone else. Still the clear favorite." },
      { label: "2. Matthew (5-1, all-play 49-17)", detail: "Second in scoring, and the record is earned. Kenneth Walker III has been one of the best RBs in the league." },
      { label: "3. Raymond (2-4, all-play 39-27)", detail: "Third in all-play, 9th in the standings. The unluckiest team in the league, and the blockbuster trade added Amon-Ra St. Brown and Javonte Williams." },
      { label: "4. Nicholas (4-2, all-play 38-28)", detail: "Lost a close one to Matthew, but this is a real top-four team." },
      { label: "5. Jonathan (3-3, all-play 36-30)", detail: "Had the league's worst week (69.98) but is still a top-five scoring team. Holds the 6th seed on points." },
      { label: "6. lanny (4-2, all-play 30-36)", detail: "Ranked on what comes next: Bijan Robinson and Kyren Williams make this backfield one of the best in the league." },
      { label: "7. Isaiah (3-3, all-play 33-33)", detail: "The week's top score got him back to .500. A win over Jonathan in Week 7 would put him in the playoff picture." },
      { label: "8. Zachary (3-3, all-play 31-35)", detail: "Scored 121.70 this week after a 67 in Week 1. The league's biggest week-to-week swings." },
      { label: "9. Andrew (4-2, all-play 29-37)", detail: "Below-average scoring and a 4-2 record. Mike Evans and C.J. Stroud help, but the luck is running out." },
      { label: "10. Chris (1-5, all-play 27-39)", detail: "Five straight losses, the most points allowed in the league, and he just dropped his 4th-round pick." },
      { label: "11. Noah (2-4, all-play 24-42)", detail: "Drake Maye has carried this team. The rest of the draft hasn't." },
      { label: "12. Daniel (0-6, all-play 8-58)", detail: "Outscored the rest of the league 8 times in 66 tries. See our feature on the worst start ever." },
    ],
  },
  {
    id: "week-6-waiver-wire",
    category: "Waiver Wire",
    title: "Waiver Wire: lanny cleans up in Week 6",
    dek: "Who found points on the wire this week, and who let a 28-point QB walk. Full lists are on the Waiver Wire tab.",
    date: "2026-10-19",
    paragraphs: ["Points are Week 6 fantasy points scored for the team that picked the player up."],
    list: [
      { label: "Tre Tucker (WR) · lanny · 23.70", detail: "A free agent on Wednesday and the top-scoring pickup of the week." },
      { label: "Michael Penix Jr. (QB) · Matthew · 23.10", detail: "A Thursday add who helped Matthew to 5-1." },
      { label: "Jaylin Noel (WR) · Raymond · 21.38", detail: "A $5 claim in the same week as Ray's blockbuster trade." },
      { label: "Tyler Bass (K) · lanny · 18.70", detail: "lanny's second top-five pickup of the week." },
      { label: "Chiefs (D/ST) · Jonathan · 18.00", detail: "A $15 bid, repaid with 18 points against the Chargers after a stat correction." },
      { label: "Chris Boswell (K) · Isaiah · 17.90", detail: "Picked up Friday, and a big part of the week's top score." },
    ],
    outro: "The one that got away: Ray dropped Saints QB Tyler Shough on Oct 14 after 93 points in five weeks, Daniel picked him up and dropped him too, and Shough scored 28.46 on Sunday while sitting on waivers. He clears waivers Wednesday and is the top pickup target for Week 7.",
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
