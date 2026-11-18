// Hand-written league news, newest first. Edit this file to publish a new
// story; the News tab renders whatever is here.
//
// Last updated: Week 10 final, including Monday night (Nov 16, 2026).

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
  /** Set on a week's final recap to link to that week's personalized manager recaps. */
  recapWeek?: number;
}

export const news: NewsArticle[] = [
  {
    id: "week-10-recap",
    category: "Recap",
    title: "Week 10 final: Daniel drops 148.82, Matthew clinches, and Noah posts the season's lowest score",
    dek: "Matthew is the first team into the playoffs, the first trip of his life. Isaiah falls a game behind Zachary for 6th, and the worst team in league history has won three straight.",
    date: "2026-11-16",
    recapWeek: 10,
    paragraphs: [
      "Daniel beat Ethan 148.82 to 126.02, the top score of the week and his best of the season by 27 points (a stat correction shaved 0.50 off Sunday night's 149.32). Dak Prescott scored 36.42 a week after Daniel benched him, George Pickens scored 36.00, and Ja'Marr Chase added 27.60. Pickens came from Isaiah in their October trade. It's Daniel's third straight win, and for the first time all season he isn't in last place. He's still the worst team in league history; he just has company now. Ethan has lost three straight despite scoring the most points in the league, and the glare off his head can't distract from it anymore.",
      "Matthew beat Chris 142.18 to 119.78 behind Jahmyr Gibbs (42.70) and Emmett Johnson (33.60). At 9-1 he has clinched a playoff spot, the first team in this season and the first playoff berth of his life. Someone should explain to him that there are more games after this. Chris left Seth McGowan (18.64) and Josh Downs (13.2) on his bench while starting Chris Rodriguez Jr. (1.0) at flex. He set that lineup during a League of Legends queue, presumably.",
      "Isaiah needed 32.76 from Omarion Hampton on Monday night to catch Nicholas. Hampton scored 20.00, and Isaiah lost 138.76 to 118.60 to Christian McCaffrey's 45.80, the best game by any player this week. At 4-6, Isaiah is now a game behind Zachary for the last playoff spot, and the only thing lighter than his playoff odds is Isaiah himself. Andrew needed 25 from the Ravens defense and got 4.5, losing to lanny 111.20 to 90.76. That's five straight losses for Andrew, who might want to check his lineup between car auctions.",
      "Noah scored 52.30, the lowest score of the season, when Ladd McConkey got 0 on Monday night. Jonathan won by 66.46, the third-biggest margin of the year, with Matthew Stafford (20.76) on his bench, and he still wants you to know it would have been worse in PPR. Raymond beat Zachary 126.02 to 99.86 with Cam Skattebo's 28.20 on his bench, and Zachary benched Patrick Mahomes (35.92) for Jayden Daniels (23.76). Officer Zachary has opened an internal investigation. Ray won, which is annoying. Fuck Ray.",
    ],
    list: [
      { label: "Daniel 148.82 · Ethan 126.02", detail: "Daniel's best score of the season and third straight win. Ethan's third straight loss, and his scalp has never looked shinier" },
      { label: "Matthew 142.18 · Chris 119.78", detail: "Matthew is 9-1 and in the playoffs for the first time in his life. Chris benched 31.84 points and probably didn't notice" },
      { label: "Nicholas 138.76 · Isaiah 118.60", detail: "McCaffrey scored 45.80. Nicholas's chatbot gets the credit; Isaiah gets two straight losses and stays under 200 pounds" },
      { label: "Raymond 126.02 · Zachary 99.86", detail: "Ray wins with 28.20 on his bench, which is the most Ray way possible to win. Zachary benched Mahomes; the department is reviewing the footage" },
      { label: "Jonathan 118.76 · Noah 52.30", detail: "The lowest score of the season. Noah spent the week on his dynasty team and it showed. Jonathan's fourth straight win" },
      { label: "lanny 111.20 · Andrew 90.76", detail: "lanny wins with the 9th-best score of the week and can buy another booster box. Andrew has lost five straight and may not know it" },
    ],
    outro: "Standings: Matthew 9-1 (clinched); Jonathan 7-3; Ethan, Nicholas, and lanny 6-4; Zachary 5-5; Isaiah, Raymond, and Andrew 4-6; Chris, Daniel, and Noah 3-7. Zachary holds the 6th seed, a game ahead of Isaiah, Raymond, and Andrew. See the Playoff Picture tab for every team's path in.",
  },
  {
    id: "week-11-preview",
    category: "Preview",
    title: "Week 11 preview: the top two meet, Isaiah and Zachary play for 6th, and a lot of bye-week starters",
    dek: "What to watch in every matchup. Projections are Yahoo's as of Monday night, before waivers.",
    date: "2026-11-16",
    paragraphs: [
      "Four weeks are left. Atlanta, Cleveland, Green Bay, the Rams, New England, and Seattle are all on bye, and as of Monday night 16 starters across the league were on bye teams, including three each for Andrew and Jonathan. Waivers clear Wednesday.",
    ],
    list: [
      {
        label: "Jonathan (7-3) vs. Matthew (9-1) · Proj: Matthew 98.07, Jonathan 77.71",
        detail: "The top two teams. Jonathan has three bye-week starters (Kaleb Johnson, Drake London, and Tyler Higbee); Matthew has Tucker Kraft and the Browns on bye. Jonathan leads the series 6-4 and won both meetings last year, and a win keeps him in the race for a bye. Expect him to complain that it would be a bigger win in PPR.",
      },
      {
        label: "Nicholas (6-4) vs. Ethan (6-4) · Proj: Nicholas 100.99, Ethan 67.93",
        detail: "The first time these two have played. Ethan has Jaxon Smith-Njigba and Christian Watson, both on bye, in his lineup, and Bo Nix (projected 19.03) on his bench behind Aaron Rodgers. He's lost three straight and is running out of hair to pull. Nicholas has no bye-week problems, because the AI checks.",
      },
      {
        label: "Isaiah (4-6) vs. Zachary (5-5) · Proj: Zachary 95.70, Isaiah 93.33",
        detail: "For the 6th seed. A win pulls Isaiah even with Zachary, and he has 22.48 more points for, so he'd hold the tiebreaker. Zachary has DeMario Douglas (bye) in his lineup and Patrick Mahomes (projected 21.59) on the bench again; Isaiah has Matthew Golden (bye). Zachary leads the series 6-4. Isaiah is giving up a lot of weight in this one, but he gives up weight in every one.",
      },
      {
        label: "Chris (3-7) vs. Raymond (4-6) · Proj: Raymond 119.80, Chris 100.69",
        detail: "Ray has the highest projection of the week, and Yahoo has projected Ray well all season, which has never meant anything. Chris has a 2.9% chance at the playoffs and Josh Allen projected for 25.58, the most of any player. Chris leads the series 4-2, if he can stay logged out of League long enough to set a lineup.",
      },
      {
        label: "Andrew (4-6) vs. Daniel (3-7) · Proj: Daniel 88.45, Andrew 80.49",
        detail: "Andrew has three bye-week starters: Denzel Boston, Harold Fannin Jr., and his kicker, Jason Myers. He'll fix it as soon as he's done browsing car listings, which is to say he won't. Daniel has Kyle Pitts and the Seahawks on bye, has won three straight, and leads the series 2-0.",
      },
      {
        label: "Noah (3-7) vs. lanny (6-4) · Proj: lanny 97.39, Noah 65.94",
        detail: "Noah has Drake Maye and Jadarian Price, both on bye, in his lineup, and Jonah Coleman (projected 16.19) on his bench. He'll get around to it once his dynasty team is sorted out. lanny has Bijan on bye but on the bench, which counts as a set lineup by this league's standards.",
      },
    ],
    outro: "On waivers: Deshaun Watson (23.88), Cam Ward (21.14), Josh Cameron (19.88), Joey Slye (17.7), and the Dolphins D/ST (17.5) all scored big in Week 10 while unrostered. Justin Herbert, whom Andrew dropped two weeks ago, scored 16.76.",
  },
  {
    id: "week-11-matchup-of-the-week",
    category: "Matchup of the Week",
    title: "Week 11: Isaiah vs. Zachary for the last playoff spot",
    dek: "Zachary holds the 6th seed by a game. Isaiah has the points. One of them is leaving Sunday on the outside.",
    date: "2026-11-16",
    paragraphs: [
      "Zachary is 5-5 and holds the 6th seed despite losing to Raymond, which says a lot about the bottom of this league. Isaiah is 4-6 after two straight losses, but he's scored 22.48 more points than Zachary, so a win ties them and puts Isaiah ahead on the tiebreaker. Our playoff model gives Zachary a 62% chance to make it and Isaiah 33%.",
      "Yahoo has it nearly even: Zachary 95.70, Isaiah 93.33. Jayden Daniels (21.96) and James Cook III (18.98) lead Zachary's lineup, with Mahomes (21.59) parked on the bench for the second straight week, which Officer Zachary is calling standard procedure. Trevor Lawrence (18.78) and Bhayshul Tuten (15.41) lead Isaiah's. Both have a receiver on bye in the lineup, so waivers might decide this one.",
      "They've played ten times, and Zachary leads 6-4. They split last year: Isaiah won 105.01 to 52.17 in Week 12, then Zachary won 118.20 to 104.20 in Week 15.",
      "Our pick: Zachary, narrowly. We picked Isaiah last week and he lost by 20, so take this as a jinx in his favor. A man who weighs under 200 pounds needs all the help he can get.",
    ],
  },
  {
    id: "week-10-awards",
    category: "Awards",
    title: "Week 10 awards",
    dek: "The best, worst, luckiest, and unluckiest of the week.",
    date: "2026-11-16",
    paragraphs: [],
    list: [
      { label: "Top score: Daniel, 148.82", detail: "Dak Prescott 36.42, George Pickens 36.00, Ja'Marr Chase 27.60. The worst team in league history put up the best score of the week. Nobody is more confused than Daniel." },
      { label: "Lowest score: Noah, 52.30", detail: "The lowest score of the season. Ladd McConkey scored 0 on Monday night, Drake Maye scored 3.52, and Noah's dynasty team is fine, thanks for asking." },
      { label: "Biggest blowout: Jonathan over Noah by 66.46", detail: "The third-biggest margin of the season. Jonathan did it with Joe Burrow's 33.16 and a defense he picked up on Thursday, neither of which caught a pass." },
      { label: "Closest game: Nicholas over Isaiah by 20.16", detail: "Every game this week was decided by more than 20 points. Isaiah got the closest loss, which is like being the heaviest guy in the flyweight division." },
      { label: "Luckiest win: lanny", detail: "111.20 was only the 9th-best score of the week, and it beat Andrew, who didn't notice. lanny is celebrating with a booster box." },
      { label: "Unluckiest loss: Ethan", detail: "126.02 tied for the 4th-best score of the week and would have beaten seven teams. It ran into Daniel's best game of the year. Ethan took it bald-faced." },
      { label: "Player of the week: Christian McCaffrey, 45.80", detail: "161 receiving yards and three touchdowns for Nicholas. Jahmyr Gibbs (42.70) was second. The AI started him; the AI gets the award." },
      { label: "Best player nobody had: Deshaun Watson, 23.88", detail: "Cam Ward (21.14) and Josh Cameron (19.88) were also unrostered." },
      { label: "Bench of the week: Zachary", detail: "Patrick Mahomes scored 35.92 on Zachary's bench while Jayden Daniels scored 23.76 in his lineup. He lost by 26.16, so it wouldn't have saved him, but it's still going in his file." },
    ],
  },
  {
    id: "week-10-power-rankings",
    category: "Power Rankings",
    title: "Power Rankings: Ethan is No. 1 on paper, Matthew is No. 1 where it counts",
    dek: "Based on all-play record (how each team would do against every team every week), with playoff odds from 10,000 simulations.",
    date: "2026-11-16",
    paragraphs: [
      "All-play record strips out schedule luck: it counts how often each team outscored the rest of the league each week. Records and all-play are through Week 10.",
    ],
    list: [
      { label: "1. Ethan (6-4, all-play 81-28)", detail: "Three straight losses, but still the most points in the league (1,259.46) and the best all-play record. Bo Nix is on his bench and two receivers on bye are in his lineup. Playoff odds 99%, and his hairline odds a lot lower." },
      { label: "2. Matthew (9-1, all-play 79-31)", detail: "Clinched. Five straight wins, an 85% chance at the 1st seed, and his first playoff appearance ever. He's asking whether the trophy comes with instructions." },
      { label: "3. Jonathan (7-3, all-play 70-40)", detail: "Four straight wins, averaging 132.6 over his last three. A PPR merchant thriving in a league with no PPR. Playoff odds 99.8%, bye odds 51%." },
      { label: "4. Raymond (4-6, all-play 64-45)", detail: "Fourth in all-play, 8th in the standings, and finally won a game, with 28.20 on his bench. Playoff odds 20%. Somehow still the most frustrating team to watch. Fuck Ray." },
      { label: "5. Nicholas (6-4, all-play 59-51)", detail: "Two straight wins and the week's best player. Playoff odds 88%. Credit to whichever chatbot set the lineup." },
      { label: "6. Zachary (5-5, all-play 55-55)", detail: "Exactly average, and holding the 6th seed by a game. Mahomes is on his bench again for Week 11. Playoff odds 62%. Keep it moving, folks." },
      { label: "7. Isaiah (4-6, all-play 52-58)", detail: "Two straight losses and a game out of 6th. Averaging 125.2 over his last three, the only number attached to Isaiah that's going up. Playoff odds 33%." },
      { label: "8. lanny (6-4, all-play 50-60)", detail: "Two straight wins, the latest with the 9th-best score of the week. Playoff odds 86%, the best return on luck since his last Charizard pull." },
      { label: "9. Chris (3-7, all-play 42-68)", detail: "Benched 31.84 points in a 22.40-point loss. Playoff odds 2.9%. The Rift is calling, and he's answering." },
      { label: "10. Andrew (4-6, all-play 37-73)", detail: "Five straight losses and three bye-week starters for Week 11. Playoff odds 9%. He's checked his car's oil more recently than his lineup." },
      { label: "11. Noah (3-7, all-play 36-74)", detail: "The lowest score of the season and two bye-week starters for Week 11. Now in last place by points for. His dynasty team is 11-0, probably." },
      { label: "12. Daniel (3-7, all-play 34-76)", detail: "The week's top score and three straight wins, and still last in all-play. The worst team in league history is no longer the worst team in the standings. Small victories." },
    ],
  },
  {
    id: "week-10-waiver-wire",
    category: "Waiver Wire",
    title: "Waiver Wire: lanny cashes in on Ray's mistake, and Jonathan buys back his own defense",
    dek: "Who found points on the wire this week, and who dropped them. Full lists are on the Waiver Wire tab.",
    date: "2026-11-16",
    paragraphs: ["Points are Week 10 fantasy points scored for the team that picked the player up."],
    list: [
      { label: "Cam Little (K) · lanny · 21.00", detail: "The kicker Ray dropped two weeks ago. lanny paid $5 and got the top-scoring pickup of the week. Classic Ray." },
      { label: "Colts (D/ST) · Jonathan · 17.50", detail: "A Thursday free agent, started in a 66-point win. Defenses don't catch passes, so Jonathan didn't complain about the scoring." },
      { label: "Rams (D/ST) · lanny · 16.50", detail: "Chris dropped them on Nov 3. lanny paid $5, the price of a couple of booster packs." },
      { label: "Aaron Rodgers (QB) · Ethan · 15.62", detail: "Ethan dropped Lamar Jackson for him, and Lamar scored 0. The one thing that went right for Ethan this week." },
      { label: "Aaron Jones Sr. (RB) · Ethan · 13.00", detail: "Jonathan dropped him Wednesday; Ethan claimed him Saturday and started him." },
      { label: "Bills (D/ST) · Jonathan · 12.50", detail: "Jonathan dropped them on Nov 5, then paid $5 to get them back on Nov 14, then benched them. PPR merchant logic." },
    ],
    outro: "The ones that got away: Jonathan dropped the Lions (15.0) to buy back the Bills, and Noah cut Alvin Kamara (14.4) on Saturday night, a day before his 52.30-point week. Matthew got 83.9 points from pickups, the most in the league, and climbed to second in season pickup points (459.2) behind Noah (467.5).",
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
