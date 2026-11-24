// Personalized weekly recap shown to each manager when they log in (the pop-up
// over the page). Scores, ranks, and bench points are computed from the week's
// lineups (src/content/weekly); this file is just the storyline. Keep the roasts
// in the same spirit as the trading cards: harmless.
//
// To publish a new week: set RECAP_WEEK, make sure week-N.json is in
// src/content/weekly, and replace the storylines (see WEEKLY_UPDATE.md). Managers who dismissed last
// week's recap will see the new one on their next visit.

export type MistakeKind = "Bench" | "Lineup" | "Trade" | "Waiver" | "Drop";

export interface Mistake {
  kind: MistakeKind;
  text: string;
}

export interface RecapStory {
  /** One punchy line, shown big. */
  headline: string;
  story: string;
  /** The film room: lineup calls, trades, pickups, and drops that cost them. */
  mistakes: Mistake[];
  /** Overrides the film room heading ("Film room: what went wrong"). */
  filmRoomTitle?: string;
}

export const RECAP_WEEK = 11;

export const recapStories: Record<string, RecapStory> = {
  Zachary: {
    headline: "You finally started Mahomes. Top score of the week.",
    story:
      "Patrick Mahomes threw for 324 yards and 3 touchdowns for 24.96, Bucky Irving added 20.0, and James Cook III 18.2. 122.66 was the best score in the league and your lineup was perfect: not a single bench point left behind. You beat Isaiah, you're 6-5, and you're the 5th seed. Case closed. You may now return to your donut.",
    mistakes: [
      { kind: "Lineup", text: "Will Reichard kicked for 1.8 on an 8.87 projection. Your most reliable player all season picked the wrong week to go off duty." },
      { kind: "Bench", text: "Jayden Daniels scored 18.06 on your bench. You made the right call, but it took you two weeks of benching Mahomes to get here." },
      { kind: "Waiver", text: "Pat Freiermuth, your Thursday free-agent pickup, started and scored 5.5. Routine traffic stop, nothing found." },
    ],
  },
  Matthew: {
    headline: "Six straight wins. Beat Ray and the 1st seed is yours.",
    story:
      "Jahmyr Gibbs scored 27.8 and Emmett Johnson 24.8, and the Lions defense, which Jonathan dropped a week ago, scored 8.5 against Jonathan. Your lineup was perfect. You're 10-1 and a win over Raymond in Week 12 clinches the 1st seed, in the first playoff appearance of your life. The playoffs are the games after Week 14. You're welcome.",
    filmRoomTitle: "Film room: nitpicks",
    mistakes: [
      { kind: "Lineup", text: "DeVonta Smith scored 5.6 on a 10.33 projection. You won by 25.88, so this is genuinely the worst thing that happened to you this week." },
      { kind: "Drop", text: "You cut Jonah Coleman in September. He scored 34.9 for Noah this week and has 94.3 since you let him go." },
      { kind: "Waiver", text: "Darren Waller cost $2 and scored 5.2. You'll survive." },
    ],
  },
  lanny: {
    headline: "Three straight wins. The booster box budget is secure.",
    story:
      "Travis Kelce, your $1 August pickup, scored 21.9, the Broncos defense put up 17, and Jameson Williams added 16.8. Justice Hill, whom you grabbed off waivers on Sunday night of Week 10, scored 15.6. 118.76 was the 3rd-best score of the week, and you're 7-4 and the 4th seed. You beat Noah by 5.66, and he left 18 points on his bench, so this one was a holo pull.",
    mistakes: [
      { kind: "Lineup", text: "Chase Brown scored 4.1 on a 13.45 projection, from the trade you keep losing to Ray." },
      { kind: "Trade", text: "Javonte Williams scored 23.6 for Ray this week. Ray now leads the trade 253.9 to 189.7. Losing a trade to Ray is a rare and special skill." },
      { kind: "Bench", text: "Jaylen Waddle scored 7.6 on your bench while Jalen Coker started at flex and scored 5.2." },
    ],
  },
  Noah: {
    headline: "Benched the 18.2. Started the 0.2. Lost by 5.66.",
    story:
      "Last week you started Ladd McConkey (0) and benched DK Metcalf (14.4). This week you benched McConkey and he scored 18.2, while Metcalf started and scored 0.2. Starting McConkey would have won by 12.34. Jonah Coleman ran for 3 touchdowns (34.9) and Ashton Jeanty added 23.9, and it still wasn't enough. You're 3-8, and Week 12 against Daniel is an elimination game. Good thing the dynasty team doesn't play Daniel.",
    mistakes: [
      { kind: "Bench", text: "Ladd McConkey scored 18.2 on your bench while DK Metcalf started and scored 0.2. That alone would have won the game." },
      { kind: "Waiver", text: "Kirk Cousins cost $6 to fill in for Drake Maye and scored 8.4. You lost by 5.66." },
      { kind: "Drop", text: "You cut Drew Stevens before Week 1. He kicked for 17.8 on waivers this week, more than Tyler Bass gave you (16.5)." },
    ],
  },
  Raymond: {
    headline: "Benched Skattebo when he scored 28. Started him for 3.8.",
    story:
      "Last week Cam Skattebo scored 28.2 on your bench. This week you started him and he scored 3.8. Jared Goff scored 21.86 on your bench while Caleb Williams started and scored 15.84. You still beat Chris 111.74 to 88.72, thanks to Javonte Williams (23.6) and the Bears defense (19.5). Two straight wins, 5-6, and a 29% chance at the playoffs. Now you get Matthew, who clinches the 1st seed by beating you. Fuck Ray, as always.",
    mistakes: [
      { kind: "Bench", text: "Jared Goff scored 21.86 on your bench while Caleb Williams started and scored 15.84." },
      { kind: "Lineup", text: "Cam Skattebo: benched for 28.2 in Week 10, started for 3.8 in Week 11. Perfectly timed, both ways." },
      { kind: "Drop", text: "You dropped the Giants for the Bengals. The Giants scored 10.0 on waivers; the Bengals scored 0.5 on your bench." },
    ],
  },
  Andrew: {
    headline: "Two pickups and a win. Who are you and what have you done with Andrew?",
    story:
      "You made two pickups in one day, Cameron Dicker (8.2) and Chig Okonkwo (8.1), and both started. CeeDee Lamb scored 23.7, C.J. Stroud 21.96, and Breece Hall 19.5, and the losing streak is over at five. But Mike Evans scored 19.9 on your bench while Jordyn Tyson started at flex and scored 1.5. You're 5-6, a game out, and that new car smell must be the app you finally opened.",
    mistakes: [
      { kind: "Bench", text: "Mike Evans scored 19.9 on your bench while Jordyn Tyson started at flex and scored 1.5." },
      { kind: "Lineup", text: "Jaylen Warren scored 3.4 on a 16.17 projection, a week after scoring 5.6 on a 16.32 projection." },
      { kind: "Trade", text: "Evans's 19.9 was his best game since you traded for him, and it counted for nothing. Nicholas still leads the trade 112.6 to 58.1." },
    ],
  },
  Ethan: {
    headline: "Losing streak over. The shine is back.",
    story:
      "Chuba Hubbard ran for 120 yards and 2 touchdowns (30.0), Saquon Barkley added 15.0, and Chimere Dike, a free agent you picked up on Thursday, scored 13.88. Bo Nix, whom Nicholas dropped in September, beat Nicholas with 12.5. You're 7-4 and the 2nd seed again, and you still lead the league in points. The head is gleaming.",
    mistakes: [
      { kind: "Drop", text: "You dropped Aaron Rodgers after one week. He scored 17.48 this week. Bo Nix scored 12.5 in his place." },
      { kind: "Lineup", text: "The Vikings defense scored -2 and Chase McLaughlin kicked for 3." },
      { kind: "Waiver", text: "Josh Cameron was the biggest bid of the week ($8). He scored 7.0 on your bench." },
    ],
  },
  Jonathan: {
    headline: "You started a tight end projected for 0. He scored 0.",
    story:
      "Dalton Kincaid was projected for 0 and delivered exactly that. Tyler Higbee was on bye, and so were Kaleb Johnson, Drake London, and Matthew Stafford on your bench. Joe Burrow scored 19.9, and Derrick Henry 18.1. The four-game winning streak is over, and Matthew started the Lions defense you dropped last week against you. You also dropped Puka Nacua, a wide receiver who catches passes, which you'd think a PPR merchant would value. You're 7-4 and the 3rd seed.",
    mistakes: [
      { kind: "Lineup", text: "Dalton Kincaid started at TE with a projection of 0 and scored 0." },
      { kind: "Drop", text: "You dropped the Lions on Nov 14 to buy the Bills back. Matthew picked up the Lions and they scored 8.5 against you." },
      { kind: "Drop", text: "You dropped Puka Nacua on Friday. He's not on anyone's roster now. Bold move for a guy who wants catches to count." },
      { kind: "Waiver", text: "Kaleb Johnson, your $10 pickup, was on bye. He's scored 5.2 for you total." },
    ],
  },
  Isaiah: {
    headline: "Three straight losses. Your playoff odds weigh less than you do.",
    story:
      "93.04 against a 106.58 projection. Bhayshul Tuten scored 6.3, Kyle Monangai 1.8, and Elic Ayomanor, your Sunday morning pickup, 4.2. Meanwhile George Pickens scored 19.3 for Daniel, and the trade lead you were so proud of is down to 5 points. Zachary scored the most points in the league against you. You're 4-7, 9th, and down to an 8.8% chance at the playoffs, and you built the website that tells everyone.",
    mistakes: [
      { kind: "Bench", text: "Braelon Allen, your $41 bid, scored 11.9 on your bench while Kyle Monangai started and scored 1.8." },
      { kind: "Trade", text: "George Pickens scored 19.3 for Daniel; Bhayshul Tuten scored 6.3 for you. Your lead in that trade is down to 89.1 to 84.1." },
      { kind: "Lineup", text: "Bhayshul Tuten scored 6.3 on a 16.63 projection." },
      { kind: "Waiver", text: "You dropped Tutu Atwell on Sunday morning for Elic Ayomanor, who started and scored 4.2." },
    ],
  },
  Chris: {
    // Handle with care: Chris gets the gentle, supportive version.
    headline: "Chris, you won a trade! We are SO proud of you!",
    story:
      "Josh Downs scored 7.4 this week, and that means you're officially winning the Downs trade, 33.1 to 27.2. We always knew you had it in you. Your Texans defense scored 18.5, one of the best defenses of the week, and you picked them all by yourself. Raymond scored a few more points than you, but Raymond is Raymond, and nobody likes it when he wins. You're 3-8, which is just 8-3 spelled differently. Everyone in the league is cheering for you, buddy.",
    filmRoomTitle: "Film room: gold stars",
    mistakes: [
      { kind: "Trade", text: "You're winning the Downs trade, 33.1 to 27.2! Every single week you believed in him. Gold star." },
      { kind: "Lineup", text: "You started the Texans defense and they scored 18.5. That's a great pick, Chris. Really great." },
      { kind: "Bench", text: "Jacory Croskey-Merritt scored 16.2 on your bench. Look at all that depth! Not everyone has a bench that good. You should be really proud." },
    ],
  },
  Daniel: {
    headline: "Dak threw 4 touchdowns. Ja'Marr Chase caught 3.1 points.",
    story:
      "Dak Prescott scored 37.4, the best game by any player this week, and George Pickens added 19.3. Then Ja'Marr Chase scored 3.1 on a 17.35 projection, Luther Burden III scored 1.8, and DJ Moore scored 18.1 on your bench. The three-game winning streak is over, and you're back in last place at 3-8. Week 12 against Noah is an elimination game. The worst team in league history is fighting for its life.",
    mistakes: [
      { kind: "Bench", text: "DJ Moore scored 18.1 on your bench while Luther Burden III started and scored 1.8." },
      { kind: "Lineup", text: "Ja'Marr Chase scored 3.1 on a 17.35 projection." },
      { kind: "Waiver", text: "You cut Woody Marks, the $65 bid, the biggest of the season, after 72.08 points. About 90 cents a point, which is a lot for a team this bad." },
    ],
  },
  Nicholas: {
    headline: "60.70. The AI is still generating an explanation.",
    story:
      "Your kicker scored -0.6. Your defense scored -2.5. Mark Andrews, whom you added, dropped, and re-added this week, scored 1.4. Brock Purdy scored 22.2, and that was a third of your points. 60.70 was the lowest score of the week and the second-lowest of the season, and Bo Nix, whom you dropped in September, scored 12.5 in Ethan's win over you. You're 6-5, holding the 6th seed by a game over Ray and Andrew. Maybe try a different model.",
    mistakes: [
      { kind: "Drop", text: "You dropped the 49ers for Mark Andrews. The 49ers scored 16 on waivers. Andrews scored 1.4 and your Buccaneers scored -2.5." },
      { kind: "Lineup", text: "Spencer Shrader kicked for -0.6. Negative. From a kicker." },
      { kind: "Drop", text: "Bo Nix, your September drop, scored 12.5 for Ethan in his win over you." },
      { kind: "Trade", text: "Stefon Diggs scored 5.5 on a 10.21 projection. Ray still leads that trade 108.3 to 59.5." },
    ],
  },
};
