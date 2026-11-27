import type { Trade } from "@/lib/trades/types";

// Every trade in the 2026 league, newest first. Points are Yahoo fantasy
// points in league scoring, per NFL week, counted from the first week each
// player could score for his new team.
//
// Last updated: Week 12 in progress, after the Thanksgiving games (Nov 27, 2026).
// Older trades count through Week 11 final; the two Nov 24 trades show Week 12 so far.
export const TRADES_UPDATED = "Week 12 through Thanksgiving · Fri Nov 27, 2026";

export const trades: Trade[] = [
  {
    id: "daniel-chris-nov-24",
    date: "2026-11-24",
    weeksCounted: [12],
    sides: [
      {
        manager: "Chris",
        received: [{ name: "DJ Moore", position: "WR · BUF", weeklyPointsSinceTrade: [1.5] }],
      },
      {
        manager: "Daniel",
        received: [{ name: "Zach Charbonnet", position: "RB · SEA", weeklyPointsSinceTrade: [null], note: "Plays Sunday at SF" }],
      },
    ],
    verdict: null,
    headline: "Two trades in one morning. Chris is in his GM era, and we're here for it.",
    writeUp: [
      "Three hours after the Ray trade, Chris sent Zach Charbonnet to Daniel for DJ Moore. Chris took Charbonnet off Andrew's hands back on Oct 6, when he was still on the PUP list, nursed him back to a starting role, and has now turned him into a starting receiver. That's patience and good timing, Chris. Daniel, owner of the worst team in league history, gets a running back to go with it.",
      "Week 12 (so far): Moore started for Chris and caught 15 yards' worth of passes, 1.5 points, in Buffalo's 13-10 Thanksgiving-night win over Kansas City. Charbonnet plays Sunday at San Francisco.",
      "Too early to call. Moore's 1.5 is technically a lead, the same way Daniel's roster is technically a fantasy football team.",
    ],
  },
  {
    id: "chris-raymond-nov-24",
    date: "2026-11-24",
    weeksCounted: [12],
    sides: [
      {
        manager: "Chris",
        received: [
          { name: "Caleb Williams", position: "QB · CHI", weeklyPointsSinceTrade: [25.8] },
          { name: "Blake Corum", position: "RB · LAR", weeklyPointsSinceTrade: [31.0] },
          { name: "Ollie Gordon II", position: "RB · MIA", weeklyPointsSinceTrade: [null], note: "Plays Sunday vs NYJ" },
        ],
      },
      {
        manager: "Raymond",
        received: [{ name: "Josh Allen", position: "QB · BUF", weeklyPointsSinceTrade: [7.54] }],
      },
    ],
    verdict: "Chris",
    headline: "Chris wins a trade before Sunday even starts. Ray benched the better quarterback to lose it.",
    writeUp: [
      "A 3-for-1: Ray sent Caleb Williams, Blake Corum, and Ollie Gordon II to Chris for Josh Allen. Ray got Corum from lanny and Gordon from Nicholas in his two earlier trades, so he has now cashed in the only two good decisions he's made all season for one quarterback.",
      "Week 12 (so far): Chris started both new guys right away, and it paid off. Caleb Williams threw for 345 yards and two touchdowns for 25.8 points in Chicago's 39-35 win at Detroit, and Corum ran for 184 yards and a touchdown for 31.0 against Green Bay. That's 56.8 points from the trade before Sunday, which is also most of Chris's 58.30 against Isaiah.",
      "Ray started Allen over Jared Goff. Allen threw for 81 yards and two interceptions for 7.54 points. Goff scored 17.32 on Ray's bench. Ray traded three players to get a worse game out of his quarterback than the one he already had. Fuck Ray.",
      "Chris leads 56.8 to 7.54, with Gordon still to play Sunday against the Jets. Chris, you saw something here that nobody else in this league saw. Trust your gut, buddy. It's working.",
    ],
  },
  {
    id: "nicholas-chris-oct-28",
    date: "2026-10-28",
    weeksCounted: [8, 9, 10, 11],
    sides: [
      {
        manager: "Nicholas",
        received: [{ name: "DeMario Douglas", position: "WR · NE", weeklyPointsSinceTrade: [15.1, 11.7, 0.4, null], note: "Since dropped" }],
      },
      {
        manager: "Chris",
        received: [{ name: "Josh Downs", position: "WR · IND", weeklyPointsSinceTrade: [9.6, 2.9, 13.2, 7.4] }],
      },
    ],
    verdict: null,
    headline: "Chris wins the trade! We always believed in you, buddy.",
    writeUp: [
      "A one-for-one swap of receivers: Nicholas sent Josh Downs to Chris for DeMario Douglas. Downs was Chris's own 9th-round pick, and Chris had dropped him on Oct 21.",
      "Nicholas dropped Douglas on Saturday's waivers to claim Dylan Sampson, and Douglas then scored 15.1 on Sunday. Downs scored 9.6 on Chris's bench, where Chris was keeping him safe.",
      "On paper Nicholas' side is ahead, but none of those points counted for him. Douglas is now on Zachary's roster and scored 11.7 in Week 9; Downs had 2.9 for Chris. With Douglas gone from Nicholas' team, we're still calling it even.",
      "Week 10: Downs scored 13.2 on Chris's bench while Chris started Chris Rodriguez Jr. (1.0) at flex and lost by 22.40. Douglas scored 0.4 for Zachary. Douglas leads 27.2 to 25.7 overall, none of it for Nicholas.",
      "Week 11: Chris started Downs, and Downs scored 7.4. Douglas was on bye. That puts Downs ahead 33.1 to 27.2, so Chris has officially won this trade. We knew you could do it, Chris. The whole league is so proud of you.",
    ],
  },
  {
    id: "ray-lanny-oct-14",
    date: "2026-10-14",
    weeksCounted: [6, 7, 8, 9, 10, 11],
    sides: [
      {
        manager: "Raymond",
        received: [
          { name: "Amon-Ra St. Brown", position: "WR · DET", weeklyPointsSinceTrade: [null, 19.2, 7.6, 10.6, 22.8, 10.2], note: "Bye in Week 6" },
          { name: "Javonte Williams", position: "RB · DAL", weeklyPointsSinceTrade: [13.0, 25.5, 7.7, 20.9, 8.7, 23.6] },
          { name: "Blake Corum", position: "RB · LAR", weeklyPointsSinceTrade: [14.0, 19.6, 14.8, 13.8, 21.9, null], note: "Traded to Chris on Nov 24" },
        ],
      },
      {
        manager: "lanny",
        received: [
          { name: "Bijan Robinson", position: "RB · ATL", weeklyPointsSinceTrade: [5.8, 15.7, 8.6, 25.2, 15.7, null] },
          { name: "Chase Brown", position: "RB · CIN", weeklyPointsSinceTrade: [null, 7.3, 9.1, 9.5, 23.8, 4.1], note: "Bye in Week 6" },
          { name: "Jameson Williams", position: "WR · DET", weeklyPointsSinceTrade: [null, 23.1, 14.5, 4.5, 6, 16.8], note: "Bye in Week 6" },
        ],
      },
    ],
    verdict: "Raymond",
    headline: "Ray wins the trade again and wins another game. Unbearable.",
    writeUp: [
      "The biggest trade of the season: a 3-for-3 where Ray, who apparently decided the best running back in the deal was the problem, sent Bijan Robinson, Chase Brown, and Jameson Williams to lanny for Amon-Ra St. Brown, Javonte Williams, and Blake Corum.",
      "Week 1 was skewed by byes. Week 7 wasn't, and Ray lucked into it anyway: Javonte Williams scored 25.5, Amon-Ra came back with 19.2, and Corum added 19.6, all against 46.1 from lanny's three. Ray now leads 91.3 to 51.9.",
      "It also decided the head-to-head game. Ray beat lanny 110.80 to 102.26 in Week 7, even with Caleb Williams (22.62) and Corum (19.6) rotting on his bench, with Javonte and Amon-Ra both starting. Jameson Williams (23.1) was lanny's best player.",
      "Bijan has 30.1 points in three games for lanny after averaging about 24 a game before the trade. Week 8 was lanny's first win of the trade, 32.2 to 30.1, but Ray still leads 121.4 to 84.1. Even a broken clock.",
      "Week 9: Bijan scored 25.2, his best game for lanny, but Javonte Williams (20.9), Corum (13.8), and Amon-Ra (10.6) won the week 45.3 to 39.2. Ray leads 166.7 to 123.3, and he is 3-6 anyway, which tells you everything. Fuck Ray.",
      "Week 10: Amon-Ra (22.8) and Corum (21.9) led Ray's side to a 53.4 to 45.5 week, even with Chase Brown scoring 23.8 for lanny. Ray now leads 220.1 to 168.8, and he actually won his game, beating Zachary with 28.2 points on his bench. Even when it goes right for Ray, it's ugly.",
      "Week 11: Javonte Williams scored 23.6 and Amon-Ra 10.2, with Corum and Bijan both on bye. Jameson Williams scored 16.8 for lanny and Chase Brown 4.1. Ray leads 253.9 to 189.7 and has won two straight. lanny has won three straight himself, so he can afford to look away. Fuck Ray anyway.",
    ],
  },
  {
    id: "isaiah-daniel-oct-13",
    date: "2026-10-13",
    weeksCounted: [6, 7, 8, 9, 10, 11],
    sides: [
      {
        manager: "Isaiah",
        received: [{ name: "Bhayshul Tuten", position: "RB · JAX", weeklyPointsSinceTrade: [23.2, null, 30.4, 9.4, 19.8, 6.3], note: "Bye in Week 7" }],
      },
      {
        manager: "Daniel",
        received: [
          { name: "George Pickens", position: "WR · DAL", weeklyPointsSinceTrade: [9.8, 13.2, 5.8, 0, 36, 19.3], note: "Out in Week 9, 36 in Week 10" },
        ],
      },
    ],
    verdict: "Isaiah",
    headline: "Isaiah's lead is down to 5 points, about what he'd lose in a sauna.",
    writeUp: [
      "A straight swap: Isaiah sent George Pickens to Daniel for Bhayshul Tuten, Daniel's 3rd-round pick. Isaiah picked on the worst team in league history, which is the only fight a man under 200 pounds can win.",
      "Tuten responded with 23.2 points in Week 6, his best game of the season. Pickens had 9.8 that week in a loss at Green Bay.",
      "Jacksonville was on bye in Week 7, and Pickens scored 13.2 in Dallas' 38-21 win at Philadelphia. That makes it 23.2 to 23.0, close enough to call even.",
      "Tuten came back in Week 8 with 30.4 points in Jacksonville's 42-7 win over Indianapolis, the best game by anyone in this trade. Pickens had 5.8. Isaiah now leads 53.6 to 28.8.",
      "Week 9 was the rematch. Tuten scored 9.4 and Pickens was out, so Isaiah extended his lead to 63.0 to 28.8. But Daniel won the game 101.80 to 100.98. The worst team in league history beat victim weight.",
      "Week 10: Pickens scored 36.0, the biggest game by anyone in this trade, in Daniel's 148.82-point win over Ethan. Tuten had 19.8 for Isaiah, who lost anyway. Isaiah's lead is down to 82.8 to 64.8, and shrinking faster than Isaiah's chances of ever hitting 200 pounds.",
      "Week 11: Pickens scored 19.3 for Daniel, and Tuten scored 6.3 for Isaiah. Isaiah leads 89.1 to 84.1. Pickens has outscored Tuten in three of the last four weeks, so next week this trade probably belongs to the worst team in league history. Isaiah is on a three-game losing streak, which is the only streak he can bulk up.",
    ],
  },
  {
    id: "andrew-nicholas-oct-6",
    date: "2026-10-06",
    weeksCounted: [5, 6, 7, 8, 9, 10, 11],
    sides: [
      {
        manager: "Andrew",
        received: [
          { name: "Mike Evans", position: "WR · SF", weeklyPointsSinceTrade: [22.3, 10.9, 0, null, 0, 0, 19.9], note: "Scoreless in Weeks 9 and 10" },
          { name: "Jeremiyah Love", position: "RB · ARI", weeklyPointsSinceTrade: [2.2, 0, 0, 2.8, 0, 0, 0], note: "On IR" },
        ],
      },
      {
        manager: "Nicholas",
        received: [
          { name: "Garrett Wilson", position: "WR · NYJ", weeklyPointsSinceTrade: [18.4, 5.9, 3.1, 11.3, 0, 10.6, 4.9] },
          { name: "Quinshon Judkins", position: "RB · CLE", weeklyPointsSinceTrade: [6.0, 0, 25.9, 5.9, 5.5, 15.1, null] },
        ],
      },
    ],
    verdict: "Nicholas",
    headline: "Mike Evans finally scores, on Andrew's bench, naturally.",
    writeUp: [
      "A 2-for-2: Andrew sent Garrett Wilson and Quinshon Judkins to Nicholas for Mike Evans and Jeremiyah Love. Andrew has made three pickups all season and spent the rest of it looking at cars.",
      "Evans carried Andrew's side early with 33.2 points in two games, then scored zero in Week 7. Love has 5.0 points in five weeks and is now on IR.",
      "Judkins returned in Week 7 and scored 25.9 in Cleveland's win at Tennessee, the most by any player in this trade. Nicholas now leads 59.3 to 35.4.",
      "The catch: Judkins was on Nicholas' bench, and Nicholas lost by 36.78. The trade is working. The lineup decisions, which we assume were outsourced to a chatbot, aren't.",
      "Week 8: Wilson 11.3 and Judkins 5.9 for Nicholas, Love 2.8 for Andrew with Evans on bye. Week 9: Judkins 5.5, with Evans and Wilson both out. Nicholas leads 82.0 to 38.2.",
      "Week 10: Judkins 15.1 and Wilson 10.6 for Nicholas, who beat Isaiah. Evans scored 0 on Andrew's bench and Love is still on IR. Nicholas leads 107.7 to 38.2, and Andrew hasn't opened the app to find out.",
      "Week 11: Evans scored 19.9, his best game since the trade, on Andrew's bench while Jordyn Tyson started and scored 1.5. Wilson had 4.9 for Nicholas, with Judkins on bye. Nicholas leads 112.6 to 58.1. Andrew made two pickups this week, bringing his season total to five. Someone check on him. He still hasn't found the bench.",
    ],
  },
  {
    id: "andrew-chris-oct-6",
    date: "2026-10-06",
    weeksCounted: [5, 6, 7, 8, 9, 10, 11],
    sides: [
      {
        manager: "Andrew",
        received: [
          { name: "Denzel Boston", position: "WR · CLE", weeklyPointsSinceTrade: [12.12, 2.0, 3.7, 5.2, 11.3, 3.82, null] },
          { name: "Adonai Mitchell", position: "WR · NYJ", weeklyPointsSinceTrade: [0, 0, 0, 23.2, 0, 7.4, 3.5], note: "Since dropped" },
        ],
      },
      {
        manager: "Chris",
        received: [
          { name: "Zach Charbonnet", position: "RB · SEA", weeklyPointsSinceTrade: [0, 0, 0, 3.4, 10.6, 11.9, null], note: "Traded to Daniel on Nov 24" },
        ],
      },
    ],
    verdict: "Andrew",
    headline: "Chris is building for the future, and we love that for him.",
    writeUp: [
      "Chris gave up rookie WR Denzel Boston and Adonai Mitchell for Zach Charbonnet, who hadn't played this season and was still on the PUP list. Chris saw the long-term vision, which is a very mature thing to do.",
      "Boston has 34.3 points for Andrew since the trade, including 11.3 in Week 9. Mitchell, long since dropped, scored 23.2 on waivers in Week 8.",
      "This is a bet on Charbonnet returning for the second half. He returned in Week 8 with 3.4 and scored 10.6 in Week 9, his best game yet. Andrew still leads 57.5 to 14.0, and still hasn't checked.",
      "Week 10: Charbonnet scored 11.9, his best game yet. Boston had 3.82 for Andrew, and Mitchell scored 7.4 on Isaiah's bench. Andrew leads 68.7 to 25.9.",
      "Week 11: Charbonnet and Boston were both on bye, and Mitchell scored 3.5 on Isaiah's bench. Andrew leads 72.2 to 25.9. Charbonnet has scored more every week he's played, so Chris's patience is paying off, a little at a time. Good things come to those who wait, Chris.",
    ],
  },
  {
    id: "ray-nicholas-oct-2",
    date: "2026-10-02",
    weeksCounted: [4, 5, 6, 7, 8, 9, 10, 11],
    sides: [
      {
        manager: "Raymond",
        received: [
          { name: "Ollie Gordon II", position: "RB · MIA", weeklyPointsSinceTrade: [17.5, 17.8, null, 19.8, 8.9, 7.4, 13.5, 8.2], note: "Traded to Chris on Nov 24" },
          { name: "Kenyon Sadiq", position: "TE · NYJ", weeklyPointsSinceTrade: [0, 0, 1.7, 0.6, 2.7, 5.9, 0.3, 4], note: "Since dropped" },
        ],
      },
      {
        manager: "Nicholas",
        received: [
          { name: "Stefon Diggs", position: "WR · WAS", weeklyPointsSinceTrade: [4.0, 0, 11.9, null, 11.3, 5.6, 15.3, 5.5], note: "Bye in Week 7" },
          { name: "Noah Fant", position: "TE · NO", weeklyPointsSinceTrade: [0, 0.7, 0, 1.1, null, 1.7, 0, 2.4], note: "Since dropped" },
        ],
      },
    ],
    verdict: "Raymond",
    headline: "The most lopsided trade of the season.",
    writeUp: [
      "The first trade of the year: Ray, fleecing a new guy, sent Stefon Diggs and Noah Fant to Nicholas for Ollie Gordon II and Kenyon Sadiq.",
      "Gordon became Miami's lead back almost immediately and has 71.4 points in five games since the trade. Diggs has 32.8, including 5.6 in Week 9. Fant has 3.5.",
      "Both tight ends have since been dropped, so this comes down to Gordon vs. Diggs. Ray leads 82.3 to 36.3, the one thing that's gone right for him all year, and Gordon outscored Diggs again in Week 9 (7.4 plus 5.9 from Sadiq, to 5.6 plus 1.7 from Fant).",
      "Week 10 went to Nicholas for once: Diggs scored 15.3 to Gordon's 13.5 (plus 0.3 from Sadiq). Ray still leads 96.1 to 51.6. It's Ray's best trade and his team is 4-6, which is about right.",
      "Week 11: Gordon scored 8.2 on Ray's bench, Sadiq 4.0 for nobody, Diggs 5.5 for Nicholas, and Fant 2.4 for nobody. Ray leads 108.3 to 59.5. Nicholas scored 60.70 this week, his lowest of the season, and presumably has a chatbot drafting a strongly worded email to Ray.",
    ],
  },
];
