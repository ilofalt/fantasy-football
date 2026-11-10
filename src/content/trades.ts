import type { Trade } from "@/lib/trades/types";

// Every trade in the 2026 league, newest first. Points are Yahoo fantasy
// points in league scoring, per NFL week, counted from the first week each
// player could score for his new team.
//
// Last updated: Week 9 final, including Monday night (Nov 9, 2026).
export const TRADES_UPDATED = "Week 9 final · Mon Nov 9, 2026";

export const trades: Trade[] = [
  {
    id: "nicholas-chris-oct-28",
    date: "2026-10-28",
    weeksCounted: [8, 9],
    sides: [
      {
        manager: "Nicholas",
        received: [{ name: "DeMario Douglas", position: "WR · NE", weeklyPointsSinceTrade: [15.1, 11.7], note: "Since dropped" }],
      },
      {
        manager: "Chris",
        received: [{ name: "Josh Downs", position: "WR · IND", weeklyPointsSinceTrade: [9.6, 2.9] }],
      },
    ],
    verdict: null,
    headline: "Douglas outscores Downs, but not for Nicholas. Did the AI sign off on this?",
    writeUp: [
      "A one-for-one swap of receivers: Nicholas sent Josh Downs to Chris for DeMario Douglas. Downs was Chris's own 9th-round pick, and Chris had dropped him on Oct 21.",
      "Nicholas dropped Douglas on Saturday's waivers to claim Dylan Sampson, and Douglas then scored 15.1 on Sunday. Downs scored 9.6 on Chris's bench, which Chris didn't notice because he was in a League of Legends match.",
      "On paper Nicholas' side is ahead, but none of those points counted for him. Douglas is now on Zachary's roster and scored 11.7 in Week 9; Downs had 2.9 for Chris. With Douglas gone from Nicholas' team, we're still calling it even.",
    ],
  },
  {
    id: "ray-lanny-oct-14",
    date: "2026-10-14",
    weeksCounted: [6, 7, 8, 9],
    sides: [
      {
        manager: "Raymond",
        received: [
          { name: "Amon-Ra St. Brown", position: "WR · DET", weeklyPointsSinceTrade: [null, 19.2, 7.6, 10.6], note: "Bye in Week 6" },
          { name: "Javonte Williams", position: "RB · DAL", weeklyPointsSinceTrade: [13.0, 25.5, 7.7, 20.9] },
          { name: "Blake Corum", position: "RB · LAR", weeklyPointsSinceTrade: [14.0, 19.6, 14.8, 13.8] },
        ],
      },
      {
        manager: "lanny",
        received: [
          { name: "Bijan Robinson", position: "RB · ATL", weeklyPointsSinceTrade: [5.8, 15.7, 8.6, 25.2] },
          { name: "Chase Brown", position: "RB · CIN", weeklyPointsSinceTrade: [null, 7.3, 9.1, 9.5], note: "Bye in Week 6" },
          { name: "Jameson Williams", position: "WR · DET", weeklyPointsSinceTrade: [null, 23.1, 14.5, 4.5], note: "Bye in Week 6" },
        ],
      },
    ],
    verdict: "Raymond",
    headline: "Bijan has his best game for lanny, and Ray, annoyingly, still wins the week.",
    writeUp: [
      "The biggest trade of the season: a 3-for-3 where Ray, who apparently decided the best running back in the deal was the problem, sent Bijan Robinson, Chase Brown, and Jameson Williams to lanny for Amon-Ra St. Brown, Javonte Williams, and Blake Corum.",
      "Week 1 was skewed by byes. Week 7 wasn't, and Ray lucked into it anyway: Javonte Williams scored 25.5, Amon-Ra came back with 19.2, and Corum added 19.6, all against 46.1 from lanny's three. Ray now leads 91.3 to 51.9.",
      "It also decided the head-to-head game. Ray beat lanny 110.80 to 102.26 in Week 7, even with Caleb Williams (22.62) and Corum (19.6) rotting on his bench, with Javonte and Amon-Ra both starting. Jameson Williams (23.1) was lanny's best player.",
      "Bijan has 30.1 points in three games for lanny after averaging about 24 a game before the trade. Week 8 was lanny's first win of the trade, 32.2 to 30.1, but Ray still leads 121.4 to 84.1. Even a broken clock.",
      "Week 9: Bijan scored 25.2, his best game for lanny, but Javonte Williams (20.9), Corum (13.8), and Amon-Ra (10.6) won the week 45.3 to 39.2. Ray leads 166.7 to 123.3, and he is 3-6 anyway, which tells you everything. Fuck Ray.",
    ],
  },
  {
    id: "isaiah-daniel-oct-13",
    date: "2026-10-13",
    weeksCounted: [6, 7, 8, 9],
    sides: [
      {
        manager: "Isaiah",
        received: [{ name: "Bhayshul Tuten", position: "RB · JAX", weeklyPointsSinceTrade: [23.2, null, 30.4, 9.4], note: "Bye in Week 7" }],
      },
      {
        manager: "Daniel",
        received: [
          { name: "George Pickens", position: "WR · DAL", weeklyPointsSinceTrade: [9.8, 13.2, 5.8, 0], note: "Out in Week 9" },
        ],
      },
    ],
    verdict: "Isaiah",
    headline: "Isaiah leads the trade by 34. Daniel won the game.",
    writeUp: [
      "A straight swap: Isaiah sent George Pickens to Daniel for Bhayshul Tuten, Daniel's 3rd-round pick. Isaiah picked on the worst team in league history, which is the only fight a man under 200 pounds can win.",
      "Tuten responded with 23.2 points in Week 6, his best game of the season. Pickens had 9.8 that week in a loss at Green Bay.",
      "Jacksonville was on bye in Week 7, and Pickens scored 13.2 in Dallas' 38-21 win at Philadelphia. That makes it 23.2 to 23.0, close enough to call even.",
      "Tuten came back in Week 8 with 30.4 points in Jacksonville's 42-7 win over Indianapolis, the best game by anyone in this trade. Pickens had 5.8. Isaiah now leads 53.6 to 28.8.",
      "Week 9 was the rematch. Tuten scored 9.4 and Pickens was out, so Isaiah extended his lead to 63.0 to 28.8. But Daniel won the game 101.80 to 100.98. The worst team in league history beat victim weight.",
    ],
  },
  {
    id: "andrew-nicholas-oct-6",
    date: "2026-10-06",
    weeksCounted: [5, 6, 7, 8, 9],
    sides: [
      {
        manager: "Andrew",
        received: [
          { name: "Mike Evans", position: "WR · SF", weeklyPointsSinceTrade: [22.3, 10.9, 0, null, 0], note: "Out in Week 9" },
          { name: "Jeremiyah Love", position: "RB · ARI", weeklyPointsSinceTrade: [2.2, 0, 0, 2.8, 0], note: "On IR" },
        ],
      },
      {
        manager: "Nicholas",
        received: [
          { name: "Garrett Wilson", position: "WR · NYJ", weeklyPointsSinceTrade: [18.4, 5.9, 3.1, 11.3, 0], note: "Out in Week 9" },
          { name: "Quinshon Judkins", position: "RB · CLE", weeklyPointsSinceTrade: [6.0, 0, 25.9, 5.9, 5.5] },
        ],
      },
    ],
    verdict: "Nicholas",
    headline: "Judkins comes back with 25.9, and the trade flips to Nicholas.",
    writeUp: [
      "A 2-for-2: Andrew sent Garrett Wilson and Quinshon Judkins to Nicholas for Mike Evans and Jeremiyah Love. Andrew has made three pickups all season and spent the rest of it looking at cars.",
      "Evans carried Andrew's side early with 33.2 points in two games, then scored zero in Week 7. Love has 5.0 points in five weeks and is now on IR.",
      "Judkins returned in Week 7 and scored 25.9 in Cleveland's win at Tennessee, the most by any player in this trade. Nicholas now leads 59.3 to 35.4.",
      "The catch: Judkins was on Nicholas' bench, and Nicholas lost by 36.78. The trade is working. The lineup decisions, which we assume were outsourced to a chatbot, aren't.",
      "Week 8: Wilson 11.3 and Judkins 5.9 for Nicholas, Love 2.8 for Andrew with Evans on bye. Week 9: Judkins 5.5, with Evans and Wilson both out. Nicholas leads 82.0 to 38.2.",
    ],
  },
  {
    id: "andrew-chris-oct-6",
    date: "2026-10-06",
    weeksCounted: [5, 6, 7, 8, 9],
    sides: [
      {
        manager: "Andrew",
        received: [
          { name: "Denzel Boston", position: "WR · CLE", weeklyPointsSinceTrade: [12.12, 2.0, 3.7, 5.2, 11.3] },
          { name: "Adonai Mitchell", position: "WR · NYJ", weeklyPointsSinceTrade: [0, 0, 0, 23.2, 0], note: "Since dropped" },
        ],
      },
      {
        manager: "Chris",
        received: [
          { name: "Zach Charbonnet", position: "RB · SEA", weeklyPointsSinceTrade: [0, 0, 0, 3.4, 10.6], note: "Back from the PUP list in Week 8" },
        ],
      },
    ],
    verdict: "Andrew",
    headline: "Chris is paying for a stash that hasn't played yet.",
    writeUp: [
      "Chris gave up rookie WR Denzel Boston and Adonai Mitchell for Zach Charbonnet, who hadn't played this season and was still on the PUP list. Chris made the deal during a League of Legends loading screen, we assume.",
      "Boston has 34.3 points for Andrew since the trade, including 11.3 in Week 9. Mitchell, long since dropped, scored 23.2 on waivers in Week 8.",
      "This is a bet on Charbonnet returning for the second half. He returned in Week 8 with 3.4 and scored 10.6 in Week 9, his best game yet. Andrew still leads 57.5 to 14.0, and still hasn't checked.",
    ],
  },
  {
    id: "ray-nicholas-oct-2",
    date: "2026-10-02",
    weeksCounted: [4, 5, 6, 7, 8, 9],
    sides: [
      {
        manager: "Raymond",
        received: [
          { name: "Ollie Gordon II", position: "RB · MIA", weeklyPointsSinceTrade: [17.5, 17.8, null, 19.8, 8.9, 7.4], note: "Bye in Week 6" },
          { name: "Kenyon Sadiq", position: "TE · NYJ", weeklyPointsSinceTrade: [0, 0, 1.7, 0.6, 2.7, 5.9], note: "Since dropped" },
        ],
      },
      {
        manager: "Nicholas",
        received: [
          { name: "Stefon Diggs", position: "WR · WAS", weeklyPointsSinceTrade: [4.0, 0, 11.9, null, 11.3, 5.6], note: "Bye in Week 7" },
          { name: "Noah Fant", position: "TE · NO", weeklyPointsSinceTrade: [0, 0.7, 0, 1.1, null, 1.7], note: "Since dropped" },
        ],
      },
    ],
    verdict: "Raymond",
    headline: "The most lopsided trade of the season.",
    writeUp: [
      "The first trade of the year: Ray, fleecing a new guy, sent Stefon Diggs and Noah Fant to Nicholas for Ollie Gordon II and Kenyon Sadiq.",
      "Gordon became Miami's lead back almost immediately and has 71.4 points in five games since the trade. Diggs has 32.8, including 5.6 in Week 9. Fant has 3.5.",
      "Both tight ends have since been dropped, so this comes down to Gordon vs. Diggs. Ray leads 82.3 to 36.3, the one thing that's gone right for him all year, and Gordon outscored Diggs again in Week 9 (7.4 plus 5.9 from Sadiq, to 5.6 plus 1.7 from Fant).",
    ],
  },
];
