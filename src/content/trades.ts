import type { Trade } from "@/lib/trades/types";

// Every trade in the 2026 league, newest first. Points are Yahoo fantasy
// points in league scoring, per NFL week, counted from the first week each
// player could score for his new team.
//
// Last updated: Week 7 final, including Monday night (Oct 27, 2026).
export const TRADES_UPDATED = "Week 7 final · Tue Oct 27, 2026";

export const trades: Trade[] = [
  {
    id: "ray-lanny-oct-14",
    date: "2026-10-14",
    weeksCounted: [6, 7],
    sides: [
      {
        manager: "Raymond",
        received: [
          { name: "Amon-Ra St. Brown", position: "WR · DET", weeklyPointsSinceTrade: [null, 19.2], note: "Bye in Week 6" },
          { name: "Javonte Williams", position: "RB · DAL", weeklyPointsSinceTrade: [13.0, 25.5] },
          { name: "Blake Corum", position: "RB · LAR", weeklyPointsSinceTrade: [14.0, 19.6] },
        ],
      },
      {
        manager: "lanny",
        received: [
          { name: "Bijan Robinson", position: "RB · ATL", weeklyPointsSinceTrade: [5.8, 15.7] },
          { name: "Chase Brown", position: "RB · CIN", weeklyPointsSinceTrade: [null, 7.3], note: "Bye in Week 6" },
          { name: "Jameson Williams", position: "WR · DET", weeklyPointsSinceTrade: [null, 23.1], note: "Bye in Week 6" },
        ],
      },
    ],
    verdict: "Raymond",
    headline: "Ray wins the rematch too, and now leads by almost 40.",
    writeUp: [
      "The biggest trade of the season: a 3-for-3 where Ray sent Bijan Robinson, Chase Brown, and Jameson Williams to lanny for Amon-Ra St. Brown, Javonte Williams, and Blake Corum.",
      "Week 1 was skewed by byes. Week 7 wasn't, and Ray won it anyway: Javonte Williams scored 25.5, Amon-Ra came back with 19.2, and Corum added 19.6, all against 46.1 from lanny's three. Ray now leads 91.3 to 51.9.",
      "It also decided the head-to-head game. Ray beat lanny 110.80 to 102.26 in Week 7, with Javonte and Amon-Ra both starting. Jameson Williams (23.1) was lanny's best player.",
      "Bijan has 21.5 points in two games for lanny after averaging about 24 a game before the trade. We still think he's the best player in the deal, but Ray has the better three-man package so far, and a 2-0 head start.",
    ],
  },
  {
    id: "isaiah-daniel-oct-13",
    date: "2026-10-13",
    weeksCounted: [6, 7],
    sides: [
      {
        manager: "Isaiah",
        received: [{ name: "Bhayshul Tuten", position: "RB · JAX", weeklyPointsSinceTrade: [23.2, null], note: "Bye in Week 7" }],
      },
      {
        manager: "Daniel",
        received: [
          { name: "George Pickens", position: "WR · DAL", weeklyPointsSinceTrade: [9.8, 13.2] },
        ],
      },
    ],
    verdict: null,
    headline: "Pickens closes the gap to 0.2 points while Tuten sits on bye.",
    writeUp: [
      "A straight swap: Isaiah sent George Pickens to Daniel for Bhayshul Tuten, Daniel's 3rd-round pick.",
      "Tuten responded with 23.2 points in Week 6, his best game of the season. Pickens had 9.8 that week in a loss at Green Bay.",
      "Jacksonville was on bye in Week 7, and Pickens scored 13.2 in Dallas' 38-21 win at Philadelphia. That makes it 23.2 to 23.0, close enough to call even.",
      "Tuten is back in Week 8 and projects for about 15. For now this is the rare part of Daniel's season that's gone to plan.",
    ],
  },
  {
    id: "andrew-nicholas-oct-6",
    date: "2026-10-06",
    weeksCounted: [5, 6, 7],
    sides: [
      {
        manager: "Andrew",
        received: [
          { name: "Mike Evans", position: "WR · SF", weeklyPointsSinceTrade: [22.3, 10.9, 0], note: "Questionable" },
          { name: "Jeremiyah Love", position: "RB · ARI", weeklyPointsSinceTrade: [2.2, 0, 0], note: "Questionable" },
        ],
      },
      {
        manager: "Nicholas",
        received: [
          { name: "Garrett Wilson", position: "WR · NYJ", weeklyPointsSinceTrade: [18.4, 5.9, 3.1] },
          { name: "Quinshon Judkins", position: "RB · CLE", weeklyPointsSinceTrade: [6.0, 0, 25.9] },
        ],
      },
    ],
    verdict: "Nicholas",
    headline: "Judkins comes back with 25.9, and the trade flips to Nicholas.",
    writeUp: [
      "A 2-for-2: Andrew sent Garrett Wilson and Quinshon Judkins to Nicholas for Mike Evans and Jeremiyah Love.",
      "Evans carried Andrew's side early with 33.2 points in two games, then scored zero in Week 7. Both he and Love are questionable, and Love still has 2.2 points in three weeks.",
      "Judkins returned in Week 7 and scored 25.9 in Cleveland's win at Tennessee, the most by any player in this trade. Nicholas now leads 59.3 to 35.4.",
      "The catch: Judkins was on Nicholas' bench, and Nicholas lost by 36.78. The trade is working. The lineup decisions aren't.",
    ],
  },
  {
    id: "andrew-chris-oct-6",
    date: "2026-10-06",
    weeksCounted: [5, 6, 7],
    sides: [
      {
        manager: "Andrew",
        received: [
          { name: "Denzel Boston", position: "WR · CLE", weeklyPointsSinceTrade: [12.12, 2.0, 3.7] },
          { name: "Adonai Mitchell", position: "WR · NYJ", weeklyPointsSinceTrade: [0, 0, 0], note: "Since dropped" },
        ],
      },
      {
        manager: "Chris",
        received: [
          { name: "Zach Charbonnet", position: "RB · SEA", weeklyPointsSinceTrade: [0, 0, 0], note: "Questionable" },
        ],
      },
    ],
    verdict: "Andrew",
    headline: "Chris is paying for a stash that hasn't played yet.",
    writeUp: [
      "Chris gave up rookie WR Denzel Boston and Adonai Mitchell for Zach Charbonnet, who hasn't played this season and is still on the PUP list.",
      "Boston has 17.8 points for Andrew since the trade, including 3.7 in Week 7. Mitchell was dropped, and Charbonnet still has zero.",
      "This is a bet on Charbonnet returning for the second half. He's questionable for Monday night against Chicago, and Chris has him in his Week 8 lineup. Until he scores, Andrew wins by default.",
    ],
  },
  {
    id: "ray-nicholas-oct-2",
    date: "2026-10-02",
    weeksCounted: [4, 5, 6, 7],
    sides: [
      {
        manager: "Raymond",
        received: [
          { name: "Ollie Gordon II", position: "RB · MIA", weeklyPointsSinceTrade: [17.5, 17.8, null, 19.8], note: "Bye in Week 6" },
          { name: "Kenyon Sadiq", position: "TE · NYJ", weeklyPointsSinceTrade: [0, 0, 1.7, 0.6], note: "Since dropped" },
        ],
      },
      {
        manager: "Nicholas",
        received: [
          { name: "Stefon Diggs", position: "WR · WAS", weeklyPointsSinceTrade: [4.0, 0, 11.9, null], note: "Bye in Week 7" },
          { name: "Noah Fant", position: "TE · NO", weeklyPointsSinceTrade: [0, 0.7, 0, 1.1], note: "Since dropped" },
        ],
      },
    ],
    verdict: "Raymond",
    headline: "The most lopsided trade of the season.",
    writeUp: [
      "The first trade of the year: Ray sent Stefon Diggs and Noah Fant to Nicholas for Ollie Gordon II and Kenyon Sadiq.",
      "Gordon became Miami's lead back almost immediately and has 55.1 points in three games since the trade, including 19.8 in Week 7. Diggs has 15.9 and was on bye in Week 7. Fant has less than 2.",
      "Both tight ends have since been dropped, so this comes down to Gordon vs. Diggs. Ray leads 57.4 to 17.7, more than three to one.",
    ],
  },
];
