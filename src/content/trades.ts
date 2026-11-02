import type { Trade } from "@/lib/trades/types";

// Every trade in the 2026 league, newest first. Points are Yahoo fantasy
// points in league scoring, per NFL week, counted from the first week each
// player could score for his new team.
//
// Last updated: Week 8 in progress, Sunday night (Nov 1, 2026). Week 8
// numbers are partial: the Sunday and Monday night games aren't final.
export const TRADES_UPDATED = "Week 8 in progress · Sun Nov 1, 2026";

export const trades: Trade[] = [
  {
    id: "nicholas-chris-oct-28",
    date: "2026-10-28",
    weeksCounted: [8],
    sides: [
      {
        manager: "Nicholas",
        received: [{ name: "DeMario Douglas", position: "WR · NE", weeklyPointsSinceTrade: [15.1], note: "Since dropped" }],
      },
      {
        manager: "Chris",
        received: [{ name: "Josh Downs", position: "WR · IND", weeklyPointsSinceTrade: [9.6] }],
      },
    ],
    verdict: null,
    headline: "Douglas outscores Downs, but not for Nicholas.",
    writeUp: [
      "A one-for-one swap of receivers: Nicholas sent Josh Downs to Chris for DeMario Douglas. Downs was Chris's own 9th-round pick, and Chris had dropped him on Oct 21.",
      "Nicholas dropped Douglas on Saturday's waivers to claim Dylan Sampson, and Douglas then scored 15.1 on Sunday. Downs scored 9.6 on Chris's bench.",
      "On paper Nicholas' side is ahead, but none of those points counted for him. One week in, with Douglas already gone, we're calling it even.",
    ],
  },
  {
    id: "ray-lanny-oct-14",
    date: "2026-10-14",
    weeksCounted: [6, 7, 8],
    sides: [
      {
        manager: "Raymond",
        received: [
          { name: "Amon-Ra St. Brown", position: "WR · DET", weeklyPointsSinceTrade: [null, 19.2, 7.6], note: "Bye in Week 6" },
          { name: "Javonte Williams", position: "RB · DAL", weeklyPointsSinceTrade: [13.0, 25.5, 7.2] },
          { name: "Blake Corum", position: "RB · LAR", weeklyPointsSinceTrade: [14.0, 19.6, 14.8] },
        ],
      },
      {
        manager: "lanny",
        received: [
          { name: "Bijan Robinson", position: "RB · ATL", weeklyPointsSinceTrade: [5.8, 15.7, 8.6] },
          { name: "Chase Brown", position: "RB · CIN", weeklyPointsSinceTrade: [null, 7.3, 9.1], note: "Bye in Week 6" },
          { name: "Jameson Williams", position: "WR · DET", weeklyPointsSinceTrade: [null, 23.1, 14.0], note: "Bye in Week 6" },
        ],
      },
    ],
    verdict: "Raymond",
    headline: "Ray leads by 37 after three weeks.",
    writeUp: [
      "The biggest trade of the season: a 3-for-3 where Ray sent Bijan Robinson, Chase Brown, and Jameson Williams to lanny for Amon-Ra St. Brown, Javonte Williams, and Blake Corum.",
      "Week 1 was skewed by byes. Week 7 wasn't, and Ray won it anyway: Javonte Williams scored 25.5, Amon-Ra came back with 19.2, and Corum added 19.6, all against 46.1 from lanny's three. Ray now leads 91.3 to 51.9.",
      "It also decided the head-to-head game. Ray beat lanny 110.80 to 102.26 in Week 7, with Javonte and Amon-Ra both starting. Jameson Williams (23.1) was lanny's best player.",
      "Bijan has 30.1 points in three games for lanny after averaging about 24 a game before the trade. Week 8 was close (29.6 to 31.7, lanny's first win of the trade), but Ray still leads 120.9 to 83.6. Every player in this trade is done for Week 8.",
    ],
  },
  {
    id: "isaiah-daniel-oct-13",
    date: "2026-10-13",
    weeksCounted: [6, 7, 8],
    sides: [
      {
        manager: "Isaiah",
        received: [{ name: "Bhayshul Tuten", position: "RB · JAX", weeklyPointsSinceTrade: [23.2, null, 30.4], note: "Bye in Week 7" }],
      },
      {
        manager: "Daniel",
        received: [
          { name: "George Pickens", position: "WR · DAL", weeklyPointsSinceTrade: [9.8, 13.2, 5.8] },
        ],
      },
    ],
    verdict: "Isaiah",
    headline: "Tuten comes back from his bye with 30.4.",
    writeUp: [
      "A straight swap: Isaiah sent George Pickens to Daniel for Bhayshul Tuten, Daniel's 3rd-round pick.",
      "Tuten responded with 23.2 points in Week 6, his best game of the season. Pickens had 9.8 that week in a loss at Green Bay.",
      "Jacksonville was on bye in Week 7, and Pickens scored 13.2 in Dallas' 38-21 win at Philadelphia. That makes it 23.2 to 23.0, close enough to call even.",
      "Tuten came back in Week 8 with 30.4 points in Jacksonville's 42-7 win over Indianapolis, the best game by anyone in this trade. Pickens had 5.8. Isaiah now leads 53.6 to 28.8.",
    ],
  },
  {
    id: "andrew-nicholas-oct-6",
    date: "2026-10-06",
    weeksCounted: [5, 6, 7, 8],
    sides: [
      {
        manager: "Andrew",
        received: [
          { name: "Mike Evans", position: "WR · SF", weeklyPointsSinceTrade: [22.3, 10.9, 0, null], note: "Bye in Week 8" },
          { name: "Jeremiyah Love", position: "RB · ARI", weeklyPointsSinceTrade: [2.2, 0, 0, 2.8], note: "Questionable" },
        ],
      },
      {
        manager: "Nicholas",
        received: [
          { name: "Garrett Wilson", position: "WR · NYJ", weeklyPointsSinceTrade: [18.4, 5.9, 3.1, 11.3] },
          { name: "Quinshon Judkins", position: "RB · CLE", weeklyPointsSinceTrade: [6.0, 0, 25.9, 5.9] },
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
      "Week 8 so far: Wilson 11.3 and Judkins 5.9 for Nicholas, Love 2.8 for Andrew with Evans on bye. Nicholas leads 76.5 to 38.2.",
    ],
  },
  {
    id: "andrew-chris-oct-6",
    date: "2026-10-06",
    weeksCounted: [5, 6, 7, 8],
    sides: [
      {
        manager: "Andrew",
        received: [
          { name: "Denzel Boston", position: "WR · CLE", weeklyPointsSinceTrade: [12.12, 2.0, 3.7, 5.2] },
          { name: "Adonai Mitchell", position: "WR · NYJ", weeklyPointsSinceTrade: [0, 0, 0, 23.2], note: "Since dropped" },
        ],
      },
      {
        manager: "Chris",
        received: [
          { name: "Zach Charbonnet", position: "RB · SEA", weeklyPointsSinceTrade: [0, 0, 0, null], note: "Plays Monday night" },
        ],
      },
    ],
    verdict: "Andrew",
    headline: "Chris is paying for a stash that hasn't played yet.",
    writeUp: [
      "Chris gave up rookie WR Denzel Boston and Adonai Mitchell for Zach Charbonnet, who hasn't played this season and is still on the PUP list.",
      "Boston has 23.0 points for Andrew since the trade, including 5.2 in Week 8. Mitchell, long since dropped, scored 23.2 on waivers this week. Charbonnet still has zero.",
      "This is a bet on Charbonnet returning for the second half. He's in Chris's Week 8 lineup for Monday night against Chicago. Until he scores, Andrew wins by default.",
    ],
  },
  {
    id: "ray-nicholas-oct-2",
    date: "2026-10-02",
    weeksCounted: [4, 5, 6, 7, 8],
    sides: [
      {
        manager: "Raymond",
        received: [
          { name: "Ollie Gordon II", position: "RB · MIA", weeklyPointsSinceTrade: [17.5, 17.8, null, 19.8, 8.9], note: "Bye in Week 6" },
          { name: "Kenyon Sadiq", position: "TE · NYJ", weeklyPointsSinceTrade: [0, 0, 1.7, 0.6, 2.7], note: "Since dropped" },
        ],
      },
      {
        manager: "Nicholas",
        received: [
          { name: "Stefon Diggs", position: "WR · WAS", weeklyPointsSinceTrade: [4.0, 0, 11.9, null, 9.8], note: "Playing Sunday night" },
          { name: "Noah Fant", position: "TE · NO", weeklyPointsSinceTrade: [0, 0.7, 0, 1.1, null], note: "Since dropped" },
        ],
      },
    ],
    verdict: "Raymond",
    headline: "The most lopsided trade of the season.",
    writeUp: [
      "The first trade of the year: Ray sent Stefon Diggs and Noah Fant to Nicholas for Ollie Gordon II and Kenyon Sadiq.",
      "Gordon became Miami's lead back almost immediately and has 55.1 points in three games since the trade, including 19.8 in Week 7. Diggs has 15.9 and was on bye in Week 7. Fant has less than 2.",
      "Both tight ends have since been dropped, so this comes down to Gordon vs. Diggs. Ray leads 69.0 to 27.5, with Diggs at 9.8 at halftime of Sunday night's game.",
    ],
  },
];
