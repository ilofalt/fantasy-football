// Hand-written league news, newest first. Edit this file to publish a new
// story; the News tab renders whatever is here.
//
// Last updated: Week 12 in progress, after Friday's Broncos-Steelers game (Nov 27, 2026).

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
    id: "week-12-thanksgiving",
    category: "Recap",
    title: "Week 12 through Friday: Gibbs drops 48, Chris wins two trades in a morning, and Zachary benches 30 points of defense",
    dek: "Five NFL games are done. Matthew is already at 109.70, Chris is up 33.90 on Isaiah, and Nicholas still hasn't scored a point.",
    date: "2026-11-27",
    paragraphs: [
      "Chris made two trades on Tuesday morning. First he got Caleb Williams, Blake Corum, and Ollie Gordon II from Ray for Josh Allen, then he flipped Zach Charbonnet to Daniel for DJ Moore. Two days later, Williams scored 25.8 and Corum 31.0, the second-best game by anyone so far this week. Chris, that's a great week of work. We're all really proud of you. The full breakdowns are on the Trades tab.",
      "Ray started his new quarterback, Josh Allen, who threw two interceptions for 7.54 points. Jared Goff scored 17.32 on Ray's bench, next to Rome Odunze's 23.20. Ray has 40.52 points on his bench and trails Matthew by 50.76. Fuck Ray.",
      "Matthew is at 109.70 before Sunday. Jahmyr Gibbs ran for 205 yards and three touchdowns for 48.20, the best game in the league so far, and DeVonta Smith caught 200 yards and two touchdowns for 35.00 in Philadelphia's 39-38 win at Dallas. Matthew has already clinched his first playoff spot ever and still keeps acting like he's never been here before. That's because he hasn't.",
      "Isaiah is at 13.40 against Chris. He started Braelon Allen, who plays Sunday, over Kyle Monangai, who scored two touchdowns on Thanksgiving for 16.40 on Isaiah's bench. The commissioner can't lift a lineup decision, either.",
      "Friday: Pittsburgh beat Denver 27-5, and the Steelers defense scored 30.00 with two touchdowns, two interceptions, and three sacks. All of it went on Officer Zachary's bench, because he started the Patriots. That's a lot of evidence to leave in the locker. Bo Nix threw two interceptions and lost a fumble for 3.96 for Ethan, whose quarterback had about as much shine on Friday as Ethan's head. Chris Boswell kicked for 11.00, and Isaiah climbed to 24.40. Getting outweighed is nothing new for a man at victim weight. Jonah Coleman added 8.70 for Noah, with DK Metcalf's touchdown (10.10) on his bench. Nicholas switched his quarterback from Brock Purdy to Deshaun Watson, which is exactly what a chatbot would suggest if you asked it how to make your week more interesting.",
      "Elsewhere: Through Thursday, Daniel led Noah 49.14 to 10.60 behind Dak Prescott's 27.04. Noah's tight end, Colston Loveland, lost a fumble for -1.50 and left with a knee injury, and he's likely headed to IR, which mostly worries Noah as a dynasty asset. Ethan leads Zachary 52.30 to 23.50 behind D'Andre Swift's 25.70; Officer Zachary correctly benched Patrick Mahomes (7.66), and his report will say so. lanny leads Jonathan 45.62 to 11.30, and Jonathan's tight end Dallas Goedert had 1.40, which he points out would be more in PPR. Andrew leads Nicholas 16.40 to 0.00 thanks to CeeDee Lamb, which means Andrew's lineup was set, which means someone set it.",
    ],
    list: [
      { label: "Matthew 109.70 · Raymond 58.94", detail: "Gibbs 48.20 and DeVonta Smith 35.00. Ray left Odunze (23.20) and Goff (17.32) on his bench and started Allen (7.54)" },
      { label: "Chris 58.30 · Isaiah 24.40", detail: "Corum 31.00 and Caleb Williams 25.80, both added Tuesday. Isaiah benched Monangai's 16.40 and got 11.00 from Boswell on Friday. Chris has earned this one, and we couldn't be happier for him" },
      { label: "Ethan 56.26 · Zachary 23.50", detail: "Swift 25.70, Watson 14.00, LaPorta 11.90, Nix 3.96. Saquon Barkley scored 0.70, which is still more than Ethan has on top of his head. Zachary left the Steelers' 30.00 on his bench" },
      { label: "Daniel 49.14 · Noah 19.30", detail: "Dak 27.04. Loveland -1.50 and hurt, Coleman 8.70. The worst team in league history is winning by 29.84" },
      { label: "lanny 53.62 · Jonathan 11.30", detail: "Kyren Williams 14.00, Love 11.12, and the Broncos defense 8.00 for lanny. Jonathan has Burrow, Henry, Higgins, and London on Sunday" },
      { label: "Andrew 22.00 · Nicholas 0.00", detail: "Lamb 16.40 and Jaylen Warren 5.60. Nicholas' only Thursday player, Konata Mumpfield (8.90), was on his bench. Ask the chatbot why" },
    ],
    outro: "Still to come: a full Sunday and Panthers-Buccaneers on Monday night. Standings, the Playoff Picture, and the Weekly Report update after Monday's game.",
  },
  {
    id: "week-11-recap",
    category: "Recap",
    title: "Week 11 final: Matthew wins his sixth straight, Zachary posts the top score, and Nicholas scores 60.70",
    dek: "Matthew is a win over Ray away from the 1st seed. Isaiah falls to 9th, and Noah vs. Daniel in Week 12 is an elimination game.",
    date: "2026-11-23",
    recapWeek: 11,
    paragraphs: [
      "Zachary finally started Patrick Mahomes, and Mahomes threw for 324 yards and 3 touchdowns (24.96). With Bucky Irving (20.0) and James Cook III (18.2), Zachary beat Isaiah 122.66 to 93.04, the top score of the week, with a perfect lineup. He's 6-5 and the 5th seed. Isaiah has lost three straight, fell to 9th, and is down to an 8.8% chance at the playoffs. The only thing lighter than his odds is Isaiah.",
      "Matthew beat Jonathan 120.88 to 95.00 behind Jahmyr Gibbs (27.8) and Emmett Johnson (24.8), and he did it with the Lions defense Jonathan dropped a week earlier. That's six straight wins and a 10-1 record, and a win over Raymond in Week 12 clinches the 1st seed in the first playoff appearance of his life. Jonathan started Dalton Kincaid at tight end with a projection of 0, got 0, and still found time to drop Puka Nacua, a receiver, which seems like a strange move for a PPR merchant.",
      "Nicholas scored 60.70, the second-lowest score of the season. His kicker scored -0.6, his defense -2.5, and Mark Andrews, whom he added, dropped, and re-added this week, scored 1.4. Ethan won 99.10 to 60.70 behind Chuba Hubbard's 30.0 to snap a three-game skid, with Bo Nix, Nicholas's September drop, scoring 12.5. The AI has been asked for comment and is still thinking.",
      "lanny beat Noah 118.76 to 113.10 for his third straight win. Noah benched Ladd McConkey (18.2) and started DK Metcalf (0.2), the exact reverse of last week's mistake, and would have won by 12.34 with McConkey in the lineup. Andrew made two pickups, both started, and snapped his five-game losing streak by beating Daniel 107.46 to 88.40. Someone check on him. Raymond beat Chris 111.74 to 88.72 with Jared Goff (21.86) on his bench, his second straight win. Fuck Ray. Chris's Texans defense scored 18.5, and we're all very proud of him.",
    ],
    list: [
      { label: "Zachary 122.66 · Isaiah 93.04", detail: "The top score of the week, with a perfect lineup. Officer Zachary closes the case. Isaiah has lost three straight and is now in the featherweight division of the standings" },
      { label: "Matthew 120.88 · Jonathan 95.00", detail: "Six straight wins. Jonathan started a tight end projected for 0. Matthew can clinch the 1st seed on Sunday, if someone explains to him what that means" },
      { label: "lanny 118.76 · Noah 113.10", detail: "lanny's third straight win. Noah left McConkey's 18.2 on the bench and lost by 5.66, probably while setting his dynasty lineup" },
      { label: "Raymond 111.74 · Chris 88.72", detail: "Ray wins with 21.86 on his bench, again. Chris got 18.5 from his Texans defense, and he should be really proud of that" },
      { label: "Andrew 107.46 · Daniel 88.40", detail: "Andrew made two pickups and won. Daniel's three-game streak ends, and the worst team in league history is back in last place" },
      { label: "Ethan 99.10 · Nicholas 60.70", detail: "Ethan's losing streak is over and his head is gleaming again. Nicholas's kicker and defense combined for -3.1; the chatbot did not see that coming" },
    ],
    outro: "Standings: Matthew 10-1; Ethan, Jonathan, and lanny 7-4; Zachary and Nicholas 6-5; Raymond and Andrew 5-6; Isaiah 4-7; Chris, Noah, and Daniel 3-8. Nicholas holds the 6th seed, a game ahead of Raymond and Andrew. See the Playoff Picture tab for every team's path in.",
  },
  {
    id: "week-12-preview",
    category: "Preview",
    title: "Week 12 preview: Matthew can clinch the 1st seed, and Noah vs. Daniel is an elimination game",
    dek: "What to watch in every matchup on Thanksgiving week. Projections are Yahoo's as of Monday night, before waivers.",
    date: "2026-11-23",
    paragraphs: [
      "Three weeks are left in the regular season. Nobody has a bye-week starter this time, so if your lineup goes wrong, it's on you. Waivers clear Wednesday, and Thanksgiving games start Thursday, so set your lineups early.",
    ],
    list: [
      {
        label: "Raymond (5-6) vs. Matthew (10-1) · Proj: Raymond 122.81, Matthew 102.08",
        detail: "A win clinches the 1st seed for Matthew. Ray has the highest projection of the week and leads the all-time series 5-2, but Ray has had the highest projection plenty of times this season. Ray needs the win more: a loss ends his hopes of a bye and leaves him two games out of 6th with two to play. Somehow he'll find a way to bench the wrong quarterback again.",
      },
      {
        label: "Noah (3-8) vs. Daniel (3-8) · Proj: Noah 102.15, Daniel 102.11",
        detail: "An elimination game, projected to be decided by 0.04 points. The loser is mathematically out of the playoffs. Noah won the Week 1 meeting 116.92 to 64.68 and leads the series 2-1. Daniel has Dak Prescott, who's averaged over 30 points in the last three weeks; Noah has a dynasty team to think about. The worst team in league history, playing for its life.",
      },
      {
        label: "Isaiah (4-7) vs. Chris (3-8) · Proj: Chris 107.22, Isaiah 98.91",
        detail: "Chris beat Isaiah 149.36 to 105.64 in Week 1, and Yahoo likes him again. He's having such a good week already, and we believe in him. Isaiah needs to win out and get help just to have a chance, and he's an underdog to a 3-8 team. Victim weight, victim projection.",
      },
      {
        label: "Nicholas (6-5) vs. Andrew (5-6) · Proj: Andrew 101.12, Nicholas 100.16",
        detail: "For the 6th seed, more or less. A win ties Andrew with Nicholas at 6-6. Nicholas has Quinshon Judkins and Brock Bowers on his bench as of Monday night; the AI will presumably sort that out. Andrew has Mike Evans on his bench again. He's opened the app twice in one week now, so maybe he'll notice.",
      },
      {
        label: "lanny (7-4) vs. Jonathan (7-4) · Proj: lanny 114.49, Jonathan 97.44",
        detail: "Two of the three 7-4 teams, both chasing the 2nd seed and a bye. lanny has won three straight; Jonathan just lost his. Jonathan has Matthew Stafford (17.15) on his bench and a list of complaints about the scoring settings ready to go. The series is 4-4.",
      },
      {
        label: "Ethan (7-4) vs. Zachary (6-5) · Proj: Zachary 107.36, Ethan 98.64",
        detail: "Ethan beat Zachary 160.86 to 67.16 in Week 1, the biggest margin of the season. Zachary has Jayden Daniels (22.59), the top projection on either roster, on his bench behind Mahomes, and Ethan has Jaxon Smith-Njigba (17.84) on his. Expect a lot of glare from one side and a lot of paperwork from the other.",
      },
    ],
    outro: "On waivers: Fernando Mendoza (24.88), Justin Herbert (23.94), Cam Ward (22.72), Ted Hurst III (19.6), and Baker Mayfield (19.58) all scored big in Week 11 while unrostered. Herbert is the one Andrew dropped three weeks ago, back when Andrew still didn't open the app.",
  },
  {
    id: "week-12-matchup-of-the-week",
    category: "Matchup of the Week",
    title: "Week 12: Noah vs. Daniel, and the loser is eliminated",
    dek: "Two 3-8 teams, a 0.04-point projection, and nothing left to lose except everything.",
    date: "2026-11-23",
    paragraphs: [
      "Both teams are 3-8 and tied for last. Whoever loses on Sunday is mathematically out of the playoffs. Whoever wins still needs a small miracle: four teams ahead of them would all have to collapse. Our playoff model gives both of them under 0.1%, but a win keeps them alive for one more week, and that's something.",
      "Yahoo has it as close as a projection can get: Noah 102.15, Daniel 102.11. Dak Prescott (20.91) and Ja'Marr Chase (16.54) lead Daniel's lineup. Kirk Cousins (18.0), Justin Jefferson (14.78), and Jonah Coleman, coming off a 34.9-point game, lead Noah's.",
      "Noah won the Week 1 meeting 116.92 to 64.68, when Daniel's season was just beginning to become the worst in league history. Since then, Daniel has posted the best score of a week (148.82 in Week 10), and Noah has posted the lowest score of the season (52.30, also in Week 10).",
      "Our pick: Daniel, by a hair. Noah has left a starter's worth of points on his bench two weeks in a row, and he'll be checking his dynasty trade offers during the late games.",
    ],
  },
  {
    id: "week-11-awards",
    category: "Awards",
    title: "Week 11 awards",
    dek: "The best, worst, luckiest, and unluckiest of the week.",
    date: "2026-11-23",
    paragraphs: [],
    list: [
      { label: "Top score: Zachary, 122.66", detail: "A perfect lineup, with Mahomes back where he belongs. Officer Zachary would like to thank the department." },
      { label: "Lowest score: Nicholas, 60.70", detail: "The second-lowest score of the season. His kicker and defense combined for -3.1. The AI is filing a bug report." },
      { label: "Biggest blowout: Ethan over Nicholas by 38.40", detail: "Bo Nix, whom Nicholas dropped in September, scored 12.5 against him. Ethan polished his head for the occasion." },
      { label: "Closest game: lanny over Noah by 5.66", detail: "Noah benched Ladd McConkey's 18.2 and started DK Metcalf's 0.2. lanny celebrated with a booster box; Noah went back to his dynasty roster." },
      { label: "Luckiest win: Andrew", detail: "107.46 was only the 6th-best score of the week, and he left Mike Evans's 19.9 on his bench. But he made two pickups, and the universe rewarded him." },
      { label: "Unluckiest loss: Noah", detail: "113.10 was the 4th-best score of the week and would have beaten eight teams. It didn't beat lanny." },
      { label: "Player of the week: Dak Prescott, 37.4", detail: "325 yards, 4 passing touchdowns, and a rushing touchdown, for Daniel, who lost anyway. Jonah Coleman (34.9) was second, also in a loss." },
      { label: "Best player nobody had: Fernando Mendoza, 24.88", detail: "Justin Herbert (23.94) and Cam Ward (22.72) were also unrostered." },
      { label: "Bench of the week: Noah", detail: "Ladd McConkey scored 18.2 on the bench while DK Metcalf started and scored 0.2. Starting McConkey would have won by 12.34. Last week he did the exact opposite. The dynasty team is fine, though." },
    ],
  },
  {
    id: "week-11-power-rankings",
    category: "Power Rankings",
    title: "Power Rankings: Matthew takes No. 1, and it isn't close anymore",
    dek: "Based on all-play record (how each team would do against every team every week), with playoff odds from 10,000 simulations.",
    date: "2026-11-23",
    paragraphs: [
      "All-play record strips out schedule luck: it counts how often each team outscored the rest of the league each week. Records and all-play are through Week 11.",
    ],
    list: [
      { label: "1. Matthew (10-1, all-play 89-32)", detail: "Six straight wins, the best all-play record, and a 98% chance at the 1st seed. First playoff appearance of his life, and he might be the favorite (33% to win the title). Someone get this man a rulebook." },
      { label: "2. Ethan (7-4, all-play 86-34)", detail: "Snapped a three-game skid and still leads the league in points (1,358.56). Playoff odds 99.7%, bye odds 59%. The only thing in the league shinier than his playoff odds is his head." },
      { label: "3. Jonathan (7-4, all-play 74-47)", detail: "His streak ended with a 0-point tight end, and he dropped Puka Nacua. Playoff odds 99.5%. Still convinced he'd be 9-2 in PPR." },
      { label: "4. Raymond (5-6, all-play 71-49)", detail: "Two straight wins, fourth in all-play, and 7th in the standings, which sums up Ray perfectly. Playoff odds 29%. Gets Matthew next, and has a quarterback controversy every week. Fuck Ray." },
      { label: "5. Zachary (6-5, all-play 66-55)", detail: "The top score of the week, with a perfect lineup. Playoff odds 84%. Serving and protecting the 5th seed." },
      { label: "6. lanny (7-4, all-play 59-62)", detail: "Three straight wins with a below-.500 all-play record. Playoff odds 96%. The best luck in the league, and the best collection of holos." },
      { label: "7. Nicholas (6-5, all-play 59-62)", detail: "Scored 60.70 and still holds the 6th seed. Playoff odds 70%. The model needs retraining." },
      { label: "8. Isaiah (4-7, all-play 55-66)", detail: "Three straight losses and 9th in the standings. Playoff odds 8.8%, which, like Isaiah, isn't much to look at." },
      { label: "9. Chris (3-8, all-play 44-77)", detail: "Won the Downs trade this week, and his Texans defense scored 18.5! Playoff odds are small, but we believe in him, and that's what counts." },
      { label: "10. Noah (3-8, all-play 44-77)", detail: "Lost by 5.66 with 18 points on his bench. Faces Daniel in an elimination game. His dynasty team is presumably undefeated." },
      { label: "11. Andrew (5-6, all-play 43-78)", detail: "Made two pickups and broke a five-game skid. Playoff odds 14%. If he keeps opening the app, who knows. (He won't.)" },
      { label: "12. Daniel (3-8, all-play 35-86)", detail: "Back in last place. Dak scored 37.4, his receivers didn't show up, and the worst team in league history has to beat Noah to stay alive." },
    ],
  },
  {
    id: "week-11-waiver-wire",
    category: "Waiver Wire",
    title: "Waiver Wire: Andrew makes two pickups, and Ethan finds Chimere Dike",
    dek: "Who found points on the wire this week, and who dropped them. Full lists are on the Waiver Wire tab.",
    date: "2026-11-23",
    paragraphs: ["Points are Week 11 fantasy points scored for the team that picked the player up."],
    list: [
      { label: "Chimere Dike (WR) · Ethan · 13.88", detail: "A Thursday free agent and the top pickup of the week. Ethan made four pickups; if only hair were on waivers." },
      { label: "Samaje Perine (RB) · Jonathan · 12.20", detail: "$6, started right away. Jonathan would like his catches to count extra. They don't." },
      { label: "Lions (D/ST) · Matthew · 8.50", detail: "Jonathan dropped them, Matthew paid $3, and they scored against Jonathan. First-timer luck." },
      { label: "Kirk Cousins (QB) · Noah · 8.40", detail: "$6 to cover Drake Maye's bye. Noah lost by 5.66, so it was close to worth it." },
      { label: "Cameron Dicker (K) · Andrew · 8.20", detail: "Andrew made a waiver claim. Let that sink in." },
      { label: "Chig Okonkwo (TE) · Andrew · 8.10", detail: "And then he made another one, the same day. Andrew won. Coincidence? Probably." },
    ],
    outro: "The ones that got away: Ethan dropped Aaron Rodgers (17.48) after one week, Nicholas dropped the 49ers (16.0) for Mark Andrews (1.4), and Raymond dropped the Giants (10.0) for the Bengals (0.5). lanny got 84.9 points from pickups, the most in the league, and moved to second in season pickup points (533.4), behind Noah (545.6).",
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
