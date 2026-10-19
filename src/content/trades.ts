import type { Trade } from "@/lib/trades/types";

// Every trade in the 2026 league, newest first. Points are Yahoo fantasy
// points in league scoring, per NFL week, counted from the first week each
// player could score for his new team.
//
// Last updated: Sunday night, Week 6 (Oct 18, 2026). Sunday night and Monday
// night games were still to be played or in progress, so a few Week 6 numbers
// will move.
export const TRADES_UPDATED = "Week 6 · Sun Oct 18, 2026";

export const trades: Trade[] = [
  {
    id: "ray-lanny-oct-14",
    date: "2026-10-14",
    weeksCounted: [6],
    sides: [
      {
        manager: "Raymond",
        received: [
          { name: "Amon-Ra St. Brown", position: "WR · DET", weeklyPointsSinceTrade: [null], note: "Bye in Week 6" },
          { name: "Javonte Williams", position: "RB · DAL", weeklyPointsSinceTrade: [12.0], note: "Sunday night game in progress" },
          { name: "Blake Corum", position: "RB · LAR", weeklyPointsSinceTrade: [14.0] },
        ],
      },
      {
        manager: "lanny",
        received: [
          { name: "Bijan Robinson", position: "RB · ATL", weeklyPointsSinceTrade: [5.8] },
          { name: "Chase Brown", position: "RB · CIN", weeklyPointsSinceTrade: [null], note: "Bye in Week 6" },
          { name: "Jameson Williams", position: "WR · DET", weeklyPointsSinceTrade: [null], note: "Bye in Week 6" },
        ],
      },
    ],
    verdict: "Raymond",
    headline: "Ray wins Week 1 of the blockbuster. lanny still has the best player in it.",
    writeUp: [
      "The biggest trade of the season: a 3-for-3 where Ray sent Bijan Robinson, Chase Brown, and Jameson Williams to lanny for Amon-Ra St. Brown, Javonte Williams, and Blake Corum.",
      "On the scoreboard, Ray is up 26.0 to 5.8 after one week, but that's mostly the schedule. Detroit and Cincinnati were both on bye, so Amon-Ra, Chase Brown, and Jameson Williams all scored zero, and Bijan had his worst game of the season (5.8) against Chicago.",
      "Corum's 14 points are the real wrinkle. He's Kyren Williams' backup, and lanny owns Kyren, so Corum's value to Ray depends on him getting carries behind a starter Ray doesn't control.",
      "Before the trade, Bijan was averaging about 24 points a game, more than any player Ray got back. Ray is ahead for now, but we'd still take lanny's side the rest of the way. They play each other in Week 7.",
    ],
  },
  {
    id: "isaiah-daniel-oct-13",
    date: "2026-10-13",
    weeksCounted: [6],
    sides: [
      {
        manager: "Isaiah",
        received: [{ name: "Bhayshul Tuten", position: "RB · JAX", weeklyPointsSinceTrade: [23.2] }],
      },
      {
        manager: "Daniel",
        received: [
          { name: "George Pickens", position: "WR · DAL", weeklyPointsSinceTrade: [6.5], note: "Sunday night game in progress" },
        ],
      },
    ],
    verdict: "Isaiah",
    headline: "Tuten has his best game of the year the week after he's traded.",
    writeUp: [
      "A straight swap: Isaiah sent George Pickens to Daniel for Bhayshul Tuten, Daniel's 3rd-round pick.",
      "Tuten responded with 23.2 points, his best game of the season. Pickens had 6.5 with Dallas trailing late on Sunday night.",
      "Daniel needed WR help, and Pickens has a 22-point game this season, so this can still swing back. For now, the trade went the way Daniel's whole season has.",
    ],
  },
  {
    id: "andrew-nicholas-oct-6",
    date: "2026-10-06",
    weeksCounted: [5, 6],
    sides: [
      {
        manager: "Andrew",
        received: [
          { name: "Mike Evans", position: "WR · SF", weeklyPointsSinceTrade: [22.3, null], note: "Plays Monday night" },
          { name: "Jeremiyah Love", position: "RB · ARI", weeklyPointsSinceTrade: [2.2, 0], note: "Out" },
        ],
      },
      {
        manager: "Nicholas",
        received: [
          { name: "Garrett Wilson", position: "WR · NYJ", weeklyPointsSinceTrade: [18.4, 5.9] },
          { name: "Quinshon Judkins", position: "RB · CLE", weeklyPointsSinceTrade: [6.0, 0], note: "Out" },
        ],
      },
    ],
    verdict: null,
    headline: "Too close to call, and Mike Evans plays Monday night.",
    writeUp: [
      "A 2-for-2: Andrew sent Garrett Wilson and Quinshon Judkins to Nicholas for Mike Evans and Jeremiyah Love.",
      "Evans has been the best player in the deal so far, with 22.3 points in his first game for Andrew. Nicholas is narrowly ahead 30.3 to 24.5, but Evans still plays Monday night and should pass that.",
      "Both RBs, Love and Judkins, are out right now, so the WRs are deciding this one. If both backs come back healthy, Love has more upside.",
    ],
  },
  {
    id: "andrew-chris-oct-6",
    date: "2026-10-06",
    weeksCounted: [5, 6],
    sides: [
      {
        manager: "Andrew",
        received: [
          { name: "Denzel Boston", position: "WR · CLE", weeklyPointsSinceTrade: [12.12, 2.0] },
          { name: "Adonai Mitchell", position: "WR · NYJ", weeklyPointsSinceTrade: [0, 0], note: "Out" },
        ],
      },
      {
        manager: "Chris",
        received: [
          { name: "Zach Charbonnet", position: "RB · SEA", weeklyPointsSinceTrade: [0, 0], note: "On PUP list" },
        ],
      },
    ],
    verdict: "Andrew",
    headline: "Chris is paying for a stash that hasn't played yet.",
    writeUp: [
      "Chris gave up rookie WR Denzel Boston and Adonai Mitchell for Zach Charbonnet, who hasn't played this season and is still on the PUP list.",
      "Boston has 14.1 points for Andrew since the trade. Mitchell has been out, and Charbonnet has zero.",
      "This is a bet on Charbonnet returning for the second half. Until he does, Andrew wins by default.",
    ],
  },
  {
    id: "ray-nicholas-oct-2",
    date: "2026-10-02",
    weeksCounted: [4, 5, 6],
    sides: [
      {
        manager: "Raymond",
        received: [
          { name: "Ollie Gordon II", position: "RB · MIA", weeklyPointsSinceTrade: [17.5, 17.8, null], note: "Bye in Week 6" },
          { name: "Kenyon Sadiq", position: "TE · NYJ", weeklyPointsSinceTrade: [0, 0, 1.7], note: "Since dropped" },
        ],
      },
      {
        manager: "Nicholas",
        received: [
          { name: "Stefon Diggs", position: "WR · WAS", weeklyPointsSinceTrade: [4.0, 0, null], note: "Plays Monday night" },
          { name: "Noah Fant", position: "TE · NO", weeklyPointsSinceTrade: [0, 0.7, 0], note: "Since dropped" },
        ],
      },
    ],
    verdict: "Raymond",
    headline: "The most lopsided trade of the season.",
    writeUp: [
      "The first trade of the year: Ray sent Stefon Diggs and Noah Fant to Nicholas for Ollie Gordon II and Kenyon Sadiq.",
      "Gordon became Miami's lead back almost immediately and has 35.3 points in two games since the trade. Diggs has 4 points and Fant has less than 1.",
      "Both tight ends have since been dropped, so this comes down to Gordon vs. Diggs. Diggs plays Monday night, but he'd need a big game to make this close.",
    ],
  },
];
