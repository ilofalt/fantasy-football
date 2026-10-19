// Hand-written league news, newest first. Edit this file to publish a new
// story; the News tab renders whatever is here.

export type NewsCategory = "Recap" | "Matchup of the Week" | "Waiver Wire" | "Power Rankings" | "Feature";

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
    title: "Week 6: Isaiah posts the top score, Daniel falls to 0-6",
    dek: "Results as of Sunday night. One game is still waiting on Monday night.",
    date: "2026-10-18",
    paragraphs: [
      "Isaiah had the best score of the week so far, 125.24, and beat Noah by 38 to get back to .500. Ethan kept rolling with a win over Andrew and is the league's only 5-1 team if Matthew loses.",
      "lanny got his first win with Bijan Robinson on the roster, edging Chris 100.42 to 93.78. Chris drops to 1-5, and has now allowed the most points in the league.",
      "Raymond finally got a result to match his scoring, beating Jonathan 100.30 to 71.88. Daniel lost to Zachary 100.70 to 68.96 and is now 0-6, the worst start in league history.",
    ],
    list: [
      { label: "Isaiah 125.24 · Noah 87.20", detail: "Final" },
      { label: "Ethan 106.12 · Andrew 71.24", detail: "Ethan wins" },
      { label: "lanny 100.42 · Chris 93.78", detail: "Final" },
      { label: "Raymond 100.30 · Jonathan 71.88", detail: "Raymond wins" },
      { label: "Zachary 100.70 · Daniel 68.96", detail: "Zachary wins" },
      { label: "Matthew 97.02 · Nicholas 58.60", detail: "Nicholas has players left Monday night" },
    ],
  },
  {
    id: "week-7-matchup-of-the-week",
    category: "Matchup of the Week",
    title: "Week 7: lanny vs. Raymond, one week after the blockbuster",
    dek: "The two managers behind the season's biggest trade play each other right away.",
    date: "2026-10-18",
    paragraphs: [
      "Five days after swapping six players, lanny and Raymond meet in Week 7. Bijan Robinson faces the team that drafted him, and Amon-Ra St. Brown and Chase Brown both come back from their byes, so this is the first real look at both sides of the deal.",
      "Yahoo projects Raymond to win, 108.11 to 101.55. Raymond's team has scored like a 3-2 team despite its record, and Javonte Williams has been one of the most reliable RBs in the league. lanny has the best player on the field in Bijan, plus Kyren Williams in the same backfield.",
      "Our pick: lanny, narrowly. Bijan's floor is higher than anyone Raymond received, and a 24-point game from him swings this.",
    ],
    outro: "Also worth watching: Daniel (0-6) vs. Chris (1-5) for the bottom of the standings. One of them gets a win, at least.",
  },
  {
    id: "week-6-waiver-wire",
    category: "Waiver Wire",
    title: "Waiver Wire: the best Week 6 pickups",
    dek: "Who found points on the wire this week, and who let a 28-point QB walk.",
    date: "2026-10-18",
    paragraphs: ["Points are Week 6 fantasy points scored for the team that picked the player up."],
    list: [
      { label: "Michael Penix Jr. (QB) · Matthew · 23.10", detail: "Free-agent pickup Thursday. The best waiver move of the week, and he's helping Matthew to a likely 5-1 start." },
      { label: "Chris Boswell (K) · Isaiah · 17.90", detail: "Picked up Friday. A kicker scoring 17.9 is the kind of luck that wins matchups, and it helped Isaiah post the week's top score." },
      { label: "Aaron Rodgers (QB) · Ethan · 17.02", detail: "Friday free-agent pickup as a bye-week fill-in. Even Ethan's backups are producing." },
      { label: "Dameon Pierce (RB) · Daniel · 13.50", detail: "Daniel spent $26 of FAAB on him overnight Saturday. Isaiah had picked him up Wednesday and let him go." },
      { label: "Tyler Huntley (QB) · Matthew · 13.40", detail: "A second QB added the same week as Penix. Matthew is covering his bases." },
      { label: "Hunter Henry (TE) · Zachary · 12.80", detail: "A Saturday pickup that paid off right away." },
    ],
    outro: "The one that got away: Daniel added Saints QB Tyler Shough on Saturday, dropped him, and watched him score 28.46, the most of any QB on the wire. Shough is on waivers until Oct 21 and is the top pickup target for Week 7.",
  },
  {
    id: "week-6-power-rankings",
    category: "Power Rankings",
    title: "Power Rankings: Ethan in a tier of his own",
    dek: "Based on all-play record (how each team would do against every team every week), plus trades.",
    date: "2026-10-18",
    paragraphs: [
      "All-play record strips out schedule luck: it counts how often each team outscored the rest of the league each week. Records and all-play are through Week 5.",
    ],
    list: [
      { label: "1. Ethan (4-1, all-play 45-10)", detail: "Scoring almost 138 points a week, 15 more than anyone else. The clear favorite." },
      { label: "2. Matthew (4-1, all-play 40-15)", detail: "Second in scoring, and the record is earned. The only real threat to Ethan right now." },
      { label: "3. Jonathan (3-2, all-play 36-19)", detail: "Had the best draft in the league and scores like a top-three team. Due for more wins." },
      { label: "4. lanny (3-2, all-play 25-30)", detail: "Ranked on what comes next: Bijan Robinson and Kyren Williams together make this backfield one of the best in the league." },
      { label: "5. Raymond (1-4, all-play 31-24)", detail: "The unluckiest team in the league, with the toughest schedule. Scores like a 3-2 team." },
      { label: "6. Nicholas (4-1, all-play 32-23)", detail: "Good, not great, and helped by a soft schedule. The record will cool off." },
      { label: "7. Andrew (4-1, all-play 28-27)", detail: "League-average scoring with a 4-1 record. The luckiest start in the league." },
      { label: "8. Isaiah (2-3, all-play 22-33)", detail: "The most consistent team in the league, but at about 100 points a week. Needs more upside to win." },
      { label: "9. Zachary (2-3, all-play 21-34)", detail: "The biggest week-to-week swings in the league. Could beat anyone or lose to anyone." },
      { label: "10. Chris (1-4, all-play 23-32)", detail: "Josh Allen, Jonathan Taylor, and Trey McBride, with almost nothing at WR. One trade from being dangerous." },
      { label: "11. Noah (2-3, all-play 21-34)", detail: "Drake Maye has carried this team. The rest of the draft hasn't." },
      { label: "12. Daniel (0-5, all-play 6-49)", detail: "Outscored the rest of the league only 6 times in 55 tries. See our feature on the worst start ever." },
    ],
  },
  {
    id: "worst-start-ever",
    category: "Feature",
    title: "Daniel's 0-6 is the worst start in league history",
    dek: "We went back through every season since 2022 to check.",
    date: "2026-10-18",
    paragraphs: [
      "No team in league history had ever started 0-5 before this season. Daniel is now 0-6, with the fewest points through five weeks of any team since 2022 (412.44) and an all-play record of 6-49.",
      "The closest comparison is Abiy's 2024 team, which started 1-5. That team actually scored slightly fewer points through six weeks, thanks to a 36.91-point Week 6, but it had a win, and its all-play record was more than twice as good.",
      "It hasn't been all Daniel's fault. His opponents have averaged nearly 117 points a week, close to the hardest schedule on record. But the draft didn't help: his first five picks have produced the fewest points of any team in the league.",
      "He was one of the league's best managers before this year, going 11-3 in 2024 and 8-6 in 2025. Everyone has a bad season. This is just the worst one we've seen.",
    ],
  },
  {
    id: "draft-report-card",
    category: "Feature",
    title: "Draft report card, six weeks in",
    dek: "Grading every draft by how many points its picks have scored, no matter where they play now.",
    date: "2026-10-18",
    paragraphs: [
      "We added up every point each team's 14 draft picks have scored this season. The league average is about 670.",
    ],
    list: [
      { label: "Best: Ethan · 810 points", detail: "Jaxon Smith-Njigba in round 1, then Christian Watson, Chuba Hubbard, and D'Andre Swift in the middle rounds. It's why he's 4-1." },
      { label: "Runner-up: Jonathan · 782 points", detail: "Derrick Henry, Joe Burrow, and Matthew Stafford in round 11. Eleven of his 14 picks are still on his roster." },
      { label: "Worst: Daniel · 594 points", detail: "His first five picks have produced 194 points, the fewest in the league. Josh Jacobs in round 2 has barely played." },
      { label: "Close behind: Noah · 559 points", detail: "The fewest total points of any draft. Drake Maye in round 5 is the only big hit." },
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
    outro: "Watch this space: Ethan's 2026 team is outscoring 82% of the league each week, the best rate in league history. If he keeps it up, he'll top this list.",
  },
];
