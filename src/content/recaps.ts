// Personalized weekly recap shown to each manager when they log in (the pop-up
// over the page). Scores, ranks, and bench points are computed from the week's
// lineups (src/content/weekly); this file is just the storyline. Keep the roasts
// in the same spirit as the trading cards: harmless.
//
// To publish a new week: set RECAP_WEEK, make sure week-N.json is in
// src/content/weekly, and replace the storylines. Managers who dismissed last
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
}

export const RECAP_WEEK = 10;

export const recapStories: Record<string, RecapStory> = {
  Nicholas: {
    headline: "The AI started McCaffrey. The AI gets the credit.",
    story:
      "Christian McCaffrey dropped 45.80 with 161 receiving yards, the best game by any player this week, and Brock Purdy added 32.16. That was enough to cover a 49ers defense that scored 1.5 and a Brock Bowers who scored 2.8. Two straight wins, 6-4, and every time someone asks how you did it, you answer \"Great question!\"",
    mistakes: [
      { kind: "Drop", text: "You cut the Vikings in September. They scored 22.5 for Ethan this week while your 49ers defense gave up 35+ and scored 1.5. The AI was not consulted." },
      { kind: "Bench", text: "Kaelon Black scored 14.6 on your bench while Garrett Wilson started at flex and scored 10.6 with a fumble." },
      { kind: "Lineup", text: "Brock Bowers scored 2.8 against a 10.98 projection. Some prompts just don't work." },
    ],
  },
  Isaiah: {
    headline: "Beat your projection by 13.65. Lost by 20.16. Classic featherweight.",
    story:
      "It was the closest game of the week, which is like being the heaviest guy in the flyweight division. You needed 32.76 from Omarion Hampton on Monday night and got 20.00. Meanwhile George Pickens, whom you traded to Daniel, scored 36.00 for somebody else. You're 4-6 and a game out, and you built a website so the whole league can watch.",
    mistakes: [
      { kind: "Trade", text: "You traded George Pickens to Daniel in October. He caught 3 touchdowns for 36.00 this week. Bhayshul Tuten, what you got back, scored 19.8." },
      { kind: "Waiver", text: "Braelon Allen was a $41 bid, the third-biggest of the season. He started and scored 5.6." },
      { kind: "Drop", text: "You drafted Isaiah Likely and cut him. He scored 20.2 for Ray this week. Weak hands to match the weak frame." },
      { kind: "Bench", text: "Adonai Mitchell scored 7.4 on your bench while Tetairoa McMillan started and scored 4.5." },
    ],
  },
  lanny: {
    headline: "Pulled a holo from a pack you bought for the gum.",
    story:
      "Kyren Williams scored 3.7, Travis Kelce 3.5, and Jordan Love 11.8. Then Cam Little kicked 170 yards of field goals for 21.0 and the Rams defense added 16.5. Your kicker and defense carried the team. It was only the 9th-best score of the week and it still won. Two straight, 6-4, and the booster box is already in your cart.",
    mistakes: [
      { kind: "Trade", text: "The Ray trade lost another week, 53.4 to 45.5. Amon-Ra St. Brown scored 22.8 for Ray while Jameson Williams scored 6.0 for you. Losing a trade to Ray is a rare and special skill." },
      { kind: "Lineup", text: "Kyren Williams scored 3.7 on a 16.99 projection while Justice Hill scored 5.3 on your bench." },
      { kind: "Waiver", text: "Travis Kelce, your $1 August pickup, scored 3.5. Still a better return than a Pokémon booster pack, barely." },
    ],
  },
  Andrew: {
    headline: "Five straight losses. Check the lineup between car auctions.",
    story:
      "Jaylen Warren scored 5.6 on a 16.32 projection, Jason Myers kicked for 2, and the Ravens defense put up 4.5. Jordyn Tyson scored 10 on your bench while Denzel Boston started and scored 3.82. You also dropped Justin Herbert, who scored 16.76. Heads up: you have three bye-week starters for Week 11. The autopilot you set in August doesn't know that.",
    mistakes: [
      { kind: "Trade", text: "Mike Evans, whom you traded for in October, has scored 0 two weeks straight, and Jeremiyah Love from the same deal is on IR. Nicholas got Quinshon Judkins (15.1) and Garrett Wilson (10.6) out of it." },
      { kind: "Bench", text: "Jordyn Tyson scored 10 on your bench while Denzel Boston, another trade pickup, started and scored 3.82." },
      { kind: "Drop", text: "You dropped Justin Herbert two weeks ago. He scored 16.76 this week." },
      { kind: "Lineup", text: "Jason Myers kicked for 2. The Ravens defense needed 25 and got 4.5." },
    ],
  },
  Jonathan: {
    headline: "Four straight wins, and you still want PPR.",
    story:
      "Joe Burrow threw for 409 yards and 4 touchdowns for 33.16. Derrick Henry turned 20 total yards into 15.0 points by scoring touchdowns on both of his touches near the goal line. You're 7-3, and you'll still tell anyone who listens that Henry's two catches deserved more points.",
    mistakes: [
      { kind: "Waiver", text: "You paid $10 for Kaleb Johnson and dropped Mark Andrews to make room. Johnson started and scored 5.2; Andrews scored 10.7 on Monday night." },
      { kind: "Drop", text: "You dropped Aaron Jones Sr. for Tank Dell. Jones scored 13.0 for Ethan; Dell scored 2.6 on your bench." },
      { kind: "Waiver", text: "You dropped the Lions to pay $5 to get back the Bills, whom you'd dropped on Nov 5. The Lions scored 15.0. The Bills scored 12.5 on your bench." },
    ],
  },
  Noah: {
    headline: "52.30. The lowest score of the season.",
    story:
      "Drake Maye threw for 48 yards. Ladd McConkey started with a projection of 0 and delivered exactly that, while DK Metcalf scored 14.4 on your bench. Even with the perfect lineup you'd have lost by 52, so the lineup isn't the problem: this season just isn't in the five-year plan. You're 3-7, but the 2029 dynasty roster looks great.",
    mistakes: [
      { kind: "Lineup", text: "Ladd McConkey started with a projection of 0 and scored 0. DK Metcalf scored 14.4 on your bench. Yahoo was trying to tell you something." },
      { kind: "Drop", text: "You cut Alvin Kamara on Saturday night. He scored 14.4 on Sunday." },
      { kind: "Drop", text: "Jordan Love, whom you dropped in October for Emanuel Wilson, has scored 150.56 since. He's been on the worst-drops list since it started." },
    ],
  },
  Daniel: {
    headline: "The worst team in league history put up the best score of the week.",
    story:
      "Dak Prescott threw 5 touchdowns for 36.42, a week after you benched him. George Pickens, the player you got from Isaiah, caught 3 touchdowns for 36.00, and Ja'Marr Chase went for 231 yards. Drew Lock scored 16.1 on your bench just because he could. Three straight wins, and you're out of last place for the first time all season. Still the worst team in league history, but now with a pulse.",
    mistakes: [
      { kind: "Lineup", text: "Dak Prescott threw 5 touchdowns this week. Last week, you benched him." },
      { kind: "Waiver", text: "Woody Marks was a $65 bid, the biggest of the season. He scored 8.5." },
      { kind: "Bench", text: "Rico Dowdle scored 4.4 on your bench while Tyler Allgeier started and scored 1.9. You won by 22.80, so we'll allow it." },
    ],
  },
  Ethan: {
    headline: "Most points in the league. Three straight losses.",
    story:
      "126.02 tied for the 4th-best score of the week and would have beaten seven teams. It ran into Daniel's best game of the year instead. Chuba Hubbard scored 34.2 and the Vikings defense posted 8 sacks, but Jordan Addison started and scored 0. You'd pull your hair out over it, but there's none to pull.",
    mistakes: [
      { kind: "Lineup", text: "Jordan Addison started at flex with a projection of 0 and scored 0. That's an empty roster spot with extra steps." },
      { kind: "Drop", text: "You dropped the Bills for Eddy Pineiro. The Bills scored 12.5 for Jonathan; Pineiro scored 7.8. You lost by 22.80." },
      { kind: "Lineup", text: "Sam LaPorta scored 2.1 and Christian Watson 4.7, against a combined 22.02 projected." },
    ],
  },
  Matthew: {
    headline: "Clinched. Your first playoff spot ever.",
    story:
      "Jahmyr Gibbs scored 42.70 and Emmett Johnson 33.60, which made up for 11.48 from Tyler Shough and 2.4 from Tucker Kraft. You're 9-1 with five straight wins, and you're in the playoffs for the first time in your life. Someone will explain how they work before Week 15.",
    mistakes: [
      { kind: "Bench", text: "Konata Mumpfield, your $2 pickup, scored 9.6 on your bench. It cost you nothing, which is the most annoying thing about your season." },
      { kind: "Lineup", text: "Tyler Shough scored 11.48 against a 20.02 projection, and Tucker Kraft scored 2.4. You won by 22.40 anyway." },
      { kind: "Drop", text: "You cut Denzel Boston before Week 1. He's scored 85.54 since, for other people. You don't care; you clinched." },
    ],
  },
  Chris: {
    headline: "Set your lineup during a loading screen, lost by 22.40.",
    story:
      "You beat your projection, and Deebo Samuel (26.04) and Parker Washington (24.6) both went off. But Chris Rodriguez Jr. started at flex and scored 1.0 while Seth McGowan scored 18.64 on your bench. Swapping them would have cut the loss to under 5. You're 3-7 with a 2.9% chance at the playoffs, which is roughly your ranked win rate.",
    mistakes: [
      { kind: "Bench", text: "Seth McGowan scored 18.64 on your bench while Chris Rodriguez Jr. started at flex and scored 1.0. You lost by 22.40." },
      { kind: "Trade", text: "You traded for Josh Downs, your own draft pick whom you'd dropped a week earlier, and he scored 13.2 on your bench." },
      { kind: "Drop", text: "You dropped the Rams defense on Nov 3. lanny claimed them for $5 and they scored 16.5." },
    ],
  },
  Raymond: {
    headline: "For once, the projected win was a real win.",
    story:
      "Amon-Ra St. Brown scored 22.8, Blake Corum 21.9, and Isaiah Likely 20.2. You did it with Cam Skattebo scoring 28.2 on your bench, so it could have been a 45-point win. You're 4-6 and still a game out. The card still comes pre-creased, but this week the crease is on the other guy. Fuck Ray, respectfully.",
    mistakes: [
      { kind: "Bench", text: "Cam Skattebo scored 28.2 on your bench while Javonte Williams started and scored 8.7. You won anyway, which is the most Ray thing possible." },
      { kind: "Bench", text: "The Giants scored 9.5 on your bench while the Packers started, gave up 28 to 34, and scored 4." },
      { kind: "Drop", text: "You dropped Cam Little two weeks ago. lanny paid $5 for him and he kicked 21 points to beat Andrew." },
    ],
  },
  Zachary: {
    headline: "Mahomes scored 35.92 on your bench. It's going in the report.",
    story:
      "Jayden Daniels started and scored 23.76 while Patrick Mahomes sat. You lost by 26.16, so he wouldn't have saved you, but the paperwork is filed. Malik Nabers, DeMario Douglas, and Tyler Warren combined for 4.2 points. That's not a passing game, it's a traffic stop. Your one good call: the Steelers defense scored -5.5 on your bench. You're 5-5 and holding 6th, with Isaiah coming for it in Week 11.",
    mistakes: [
      { kind: "Bench", text: "Patrick Mahomes scored 35.92 on your bench while Jayden Daniels started and scored 23.76. Second straight week Mahomes sat." },
      { kind: "Waiver", text: "DeMario Douglas, picked up after Nicholas dropped him, started and scored 0.4 on a 7.13 projection." },
      { kind: "Lineup", text: "Malik Nabers scored 2.9 with a fumble and Tyler Warren scored 0.9." },
    ],
  },
};
