// Best waiver-wire and free-agent pickups, hand-updated each week.
//
// A pickup's points are the fantasy points the player scored while on the
// roster of the team that added him, counting each week he was on that roster
// at Sunday kickoff. Re-adding your own draft pick after dropping him doesn't
// count as a pickup.
//
// Last updated: Week 10 final, including Monday night (Nov 16, 2026).

export const WAIVERS_UPDATED = "Week 10 final · Mon Nov 16, 2026";
export const CURRENT_WEEK = 10;

export interface Pickup {
  player: string;
  /** e.g. "WR · LV" */
  position: string;
  manager: string;
  /** e.g. "Oct 14" */
  added: string;
  /** FAAB bid in dollars; 0 for a free-agent add or a $0 claim. */
  cost: number;
  /** "Waiver" for a claim, "Free agent" for an immediate add. */
  method: "Waiver" | "Free agent";
  points: number;
  /** Weeks the player was on the roster at Sunday kickoff. */
  weeksOnRoster: number;
  /** Set if the player is no longer on the team, e.g. "Dropped Oct 14". */
  status?: string;
  blurb: string;
}

export interface ManagerWaiverRecord {
  manager: string;
  points: number;
  pickups: number;
  faabSpent: number;
}

export const weekPickups: Pickup[] = [
  { player: "Cam Little", position: "K · JAX", manager: "lanny", added: "Nov 11", cost: 5, method: "Waiver", points: 21.0, weeksOnRoster: 1, blurb: "The top pickup of the week, and the kicker Ray dropped two weeks ago. lanny paid $5, got 21 points, and beat Andrew. Ray was on last week's worst-drops list for cutting him, and he earned it. Fuck Ray." },
  { player: "Colts", position: "D/ST · IND", manager: "Jonathan", added: "Nov 12", cost: 0, method: "Free agent", points: 17.5, weeksOnRoster: 1, blurb: "A Thursday free agent who started in Jonathan's 66-point win over Noah. Defenses don't catch passes, so Jonathan didn't complain about the scoring for once." },
  { player: "Rams", position: "D/ST · LAR", manager: "lanny", added: "Nov 11", cost: 5, method: "Waiver", points: 16.5, weeksOnRoster: 1, blurb: "Chris dropped them on Nov 3. lanny claimed them for $5, the price of a few booster packs, and got 16.5." },
  { player: "Aaron Rodgers", position: "QB · PIT", manager: "Ethan", added: "Nov 11", cost: 0, method: "Free agent", points: 15.62, weeksOnRoster: 1, blurb: "Ethan dropped Lamar Jackson for him, and Lamar scored 0. Good call. Ethan still lost to Daniel by 22.80, which was not." },
  { player: "Aaron Jones Sr.", position: "RB · MIN", manager: "Ethan", added: "Nov 14", cost: 0, method: "Waiver", points: 13.0, weeksOnRoster: 1, blurb: "Jonathan dropped him on Wednesday's waivers; Ethan claimed him on Saturday's and started him. 13 points, and a third straight loss. At least his head stayed shiny." },
  { player: "Bills", position: "D/ST · BUF", manager: "Jonathan", added: "Nov 14", cost: 5, method: "Waiver", points: 12.5, weeksOnRoster: 1, blurb: "Jonathan dropped them on Nov 5, Ethan picked them up, Ethan dropped them, and Jonathan paid $5 to get them back. Then he benched them for the Colts." },
  { player: "Konata Mumpfield", position: "WR · LAR", manager: "Matthew", added: "Nov 11", cost: 2, method: "Waiver", points: 9.6, weeksOnRoster: 1, blurb: "9.6 on the bench of a 9-1 team that just clinched its first playoff spot ever. Matthew can afford it now." },
  { player: "Giants", position: "D/ST · NYG", manager: "Raymond", added: "Nov 11", cost: 0, method: "Waiver", points: 9.5, weeksOnRoster: 1, blurb: "On Ray's bench, next to Cam Skattebo's 28.2. Ray won anyway, which nobody, including Ray, can explain." },
  { player: "Tyler Higbee", position: "TE · LAR", manager: "Jonathan", added: "Nov 13", cost: 0, method: "Free agent", points: 8.2, weeksOnRoster: 1, blurb: "A tight end at flex, which only makes sense if you think receptions are worth a point. They aren't, Jonathan." },
  { player: "Eddy Pineiro", position: "K · SF", manager: "Ethan", added: "Nov 11", cost: 0, method: "Free agent", points: 7.8, weeksOnRoster: 1, blurb: "Ethan dropped the Bills to make room for a kicker. The Bills scored 12.5 for Jonathan. Pineiro scored 7.8." },
];

export const seasonPickups: Pickup[] = [
  { player: "C.J. Stroud", position: "QB · HOU", manager: "Andrew", added: "Oct 8", cost: 0, method: "Free agent", points: 123.24, weeksOnRoster: 6, blurb: "Still No. 1, with 21.94 more in Week 10. One of three pickups Andrew has made all season; the other two were by accident, presumably while shopping for rims." },
  { player: "Will Reichard", position: "K · MIN", manager: "Zachary", added: "Aug 26", cost: 1, method: "Waiver", points: 107.2, weeksOnRoster: 10, blurb: "A $1 kicker on Zachary's roster all season, with 11.6 in Week 10. Zachary respects anyone who stays in his lane." },
  { player: "Bryce Young", position: "QB · CAR", manager: "lanny", added: "Sep 23", cost: 10, method: "Waiver", points: 105.16, weeksOnRoster: 8, blurb: "8.1 more on lanny's bench in Week 10. A $10 bid that keeps paying, even as a backup. Better return than his Pokémon card collection." },
  { player: "Emmett Johnson", position: "RB · KC", manager: "Matthew", added: "Aug 26", cost: 0, method: "Waiver", points: 99.62, weeksOnRoster: 10, blurb: "Up four spots after 33.6 in Week 10, this time in the starting lineup. A $0 claim from August that's helping carry Matthew to his first playoffs ever." },
  { player: "Braelon Allen", position: "RB · NYJ", manager: "Isaiah", added: "Sep 30", cost: 41, method: "Waiver", points: 95.9, weeksOnRoster: 7, blurb: "The third-biggest bid of the season. Braelon Allen outweighs Isaiah by a lot, which is fine because Isaiah is victim weight." },
  { player: "Vikings", position: "D/ST · MIN", manager: "Ethan", added: "Sep 23", cost: 1, method: "Waiver", points: 95.5, weeksOnRoster: 8, blurb: "22.5 more in Week 10, for $1. Ethan polished his head in celebration, then lost." },
  { player: "Tyler Shough", position: "QB · NO", manager: "Raymond", added: "Aug 28", cost: 0, method: "Free agent", points: 93.16, weeksOnRoster: 5, status: "Dropped Oct 14", blurb: "Four 16-plus-point games for a free agent before Ray, in his infinite wisdom, let him go. He's on Matthew's roster now." },
  { player: "Isaiah Likely", position: "TE · NYG", manager: "Raymond", added: "Oct 4", cost: 0, method: "Free agent", points: 87.1, weeksOnRoster: 7, blurb: "Isaiah drafted him and dropped him. 20.2 for Ray in Week 10. Even Ray's good moves come from someone else's mistakes." },
  { player: "Travis Kelce", position: "TE · KC", manager: "lanny", added: "Aug 26", cost: 1, method: "Waiver", points: 81.8, weeksOnRoster: 10, blurb: "Went undrafted and was claimed for a dollar. lanny could not be reached for comment; he was at a card show." },
  { player: "Spencer Shrader", position: "K · IND", manager: "Nicholas", added: "Sep 30", cost: 12, method: "Waiver", points: 76.7, weeksOnRoster: 7, blurb: "Noah dropped him in September; Nicholas picked him up because the AI said kickers are fungible and this one was available." },
  { player: "Woody Marks", position: "RB · HOU", manager: "Daniel", added: "Sep 16", cost: 65, method: "Waiver", points: 72.08, weeksOnRoster: 9, blurb: "The biggest FAAB bid of the season. Steady, at about 8 points a week, but not $65 steady. A fine player for the worst team in league history, which is now on a three-game winning streak." },
  { player: "Matt Gay", position: "K · LV", manager: "Matthew", added: "Oct 4", cost: 0, method: "Free agent", points: 68.6, weeksOnRoster: 7, blurb: "New to the list. A free-agent kicker in October, and steady points ever since. First-timers get lucky." },
];

export const managerWaiverRecords: ManagerWaiverRecord[] = [
  { manager: "Noah", points: 467.5, pickups: 16, faabSpent: 84 },
  { manager: "Matthew", points: 459.2, pickups: 29, faabSpent: 47 },
  { manager: "Isaiah", points: 455.5, pickups: 32, faabSpent: 100 },
  { manager: "lanny", points: 448.5, pickups: 20, faabSpent: 45 },
  { manager: "Nicholas", points: 427.5, pickups: 44, faabSpent: 97 },
  { manager: "Ethan", points: 386.3, pickups: 23, faabSpent: 74 },
  { manager: "Raymond", points: 365.4, pickups: 22, faabSpent: 38 },
  { manager: "Chris", points: 358.7, pickups: 40, faabSpent: 95 },
  { manager: "Zachary", points: 340.0, pickups: 21, faabSpent: 47 },
  { manager: "Daniel", points: 325.2, pickups: 26, faabSpent: 100 },
  { manager: "Jonathan", points: 218.0, pickups: 16, faabSpent: 53 },
  { manager: "Andrew", points: 185.1, pickups: 3, faabSpent: 5 },
];

export const waiverNotes: { title: string; body: string }[] = [
  { title: "Still on top", body: "Noah leads with 467.5 points from the wire on just 16 pickups, impressive for a guy whose real attention is on his dynasty league. Matthew jumped from fifth to second (459.2), and Isaiah (455.5) is third, the only leaderboard where he isn't underweight." },
  { title: "Best week", body: "Matthew got 83.9 points from pickups in Week 10, the most in the league, led by Emmett Johnson's 33.6. Raymond (61.9) and Ethan (60.8) were next. Ray's total includes the Giants' 9.5 on his bench, because of course it does." },
  { title: "Best value", body: "lanny has 448.5 points from the wire for $45 of FAAB, about a dime a point, cheaper than a single Pokémon booster pack per point. He spent $10 more this week on Cam Little and the Rams, who scored 37.5 between them." },
  { title: "Most active", body: "Nicholas has made 44 pickups, more than anyone else, and is fifth in points from them (427.5). His AI never sleeps. Andrew has made 3 all season." },
  { title: "Doesn't count", body: "Re-adding your own draft pick isn't a pickup (Raymond re-claimed Rome Odunze, his own draft pick, two days after dropping him, because of course he did), and neither is a player added and dropped within a few minutes." },
];

// ---------------------------------------------------------------------------
// Worst drops: players a manager let go who then scored anyway. A drop's
// points are everything the player scored in the weeks after he was dropped
// (on another roster or sitting on waivers), until the same team picked him
// back up.

export interface Drop {
  player: string;
  position: string;
  /** Manager who dropped him. */
  manager: string;
  dropped: string;
  pointsAfter: number;
  /** Weeks counted after the drop. */
  weeksAfter: number;
  /** Where he ended up, e.g. "Now on lanny's roster" or "On waivers". */
  whereNow: string;
  blurb: string;
}

export interface ManagerDropRecord {
  manager: string;
  pointsGivenAway: number;
  drops: number;
}

export const weekDrops: Drop[] = [
  { player: "Lions", position: "D/ST · DET", manager: "Jonathan", dropped: "Nov 14", pointsAfter: 15.0, weeksAfter: 1, whereNow: "On waivers", blurb: "Dropped Saturday to buy the Bills back for $5. The Lions scored 15; the Bills scored 12.5 on Jonathan's bench." },
  { player: "Alvin Kamara", position: "RB · NO", manager: "Noah", dropped: "Nov 14", pointsAfter: 14.4, weeksAfter: 1, whereNow: "On waivers", blurb: "Cut Saturday night, 14.4 on Sunday. Noah scored 52.30, the lowest score of the season, so Kamara wouldn't have saved him. Probably too busy with his dynasty team to notice either way." },
  { player: "Aaron Jones Sr.", position: "RB · MIN", manager: "Jonathan", dropped: "Nov 11", pointsAfter: 13.0, weeksAfter: 1, whereNow: "Now on Ethan's roster", blurb: "Dropped for Tank Dell (2.6). Ethan claimed him and got 13. Jones didn't catch enough passes for the PPR merchant, we assume." },
  { player: "Bills", position: "D/ST · BUF", manager: "Ethan", dropped: "Nov 11", pointsAfter: 12.5, weeksAfter: 1, whereNow: "Now on Jonathan's roster", blurb: "Ethan dropped them for a kicker who scored 7.8. Jonathan claimed them back. Ethan lost by 22.80 and has nothing to pull out but hair he doesn't have." },
  { player: "Mark Andrews", position: "TE · BAL", manager: "Jonathan", dropped: "Nov 11", pointsAfter: 10.7, weeksAfter: 1, whereNow: "On waivers", blurb: "Dropped for Kaleb Johnson ($10, 5.2 points). Andrews scored 10.7 on Monday night. Jonathan won by 66, so nobody's crying." },
  { player: "Chad Ryland", position: "K · ARI", manager: "lanny", dropped: "Nov 11", pointsAfter: 9.8, weeksAfter: 1, whereNow: "On waivers", blurb: "The rare drop that worked: lanny swapped him for Cam Little, who scored 21. A good pull." },
];

export const seasonDrops: Drop[] = [
  { player: "Jordan Love", position: "QB · GB", manager: "Noah", dropped: "Oct 3", pointsAfter: 150.56, weeksAfter: 7, whereNow: "Now on lanny's roster", blurb: "Noah cut him for Emanuel Wilson, a move he'd never make in dynasty. Love scored 11.8 for lanny in Week 10 and has been on this list since the day it started." },
  { player: "Bo Nix", position: "QB · DEN", manager: "Nicholas", dropped: "Sep 16", pointsAfter: 133.96, weeksAfter: 9, whereNow: "Now on Ethan's roster", blurb: "Nicholas' 12th-round pick. Denver was on bye in Week 10, so the total holds. The AI said drop him; the AI was wrong." },
  { player: "Vikings", position: "D/ST · MIN", manager: "Nicholas", dropped: "Sep 16", pointsAfter: 112.5, weeksAfter: 9, whereNow: "Now on Ethan's roster", blurb: "22.5 for Ethan in Week 10, up two spots. Ethan claimed them for $1 and has been cashing in ever since. Nicholas' AI was not consulted." },
  { player: "Spencer Shrader", position: "K · IND", manager: "Noah", dropped: "Sep 19", pointsAfter: 112.3, weeksAfter: 9, whereNow: "Now on Nicholas's roster", blurb: "8.1 more for Nicholas in Week 10. Noah was too busy with his dynasty roster to notice." },
  { player: "Sam Darnold", position: "QB · SEA", manager: "Daniel", dropped: "Sep 22", pointsAfter: 103.3, weeksAfter: 8, whereNow: "Not on a roster", blurb: "Daniel's own 12th-round pick, cut on a Tuesday. Darnold scored 30.16 that Sunday for Isaiah. A foundational moment for the worst team in league history." },
  { player: "Buccaneers", position: "D/ST · TB", manager: "Chris", dropped: "Sep 22", pointsAfter: 99.0, weeksAfter: 8, whereNow: "Now on Nicholas's roster", blurb: "On bye in Week 10. lanny dropped them for the Rams and Nicholas claimed them. Chris cut them in September; he was probably mid-match." },
  { player: "Isaiah Likely", position: "TE · NYG", manager: "Isaiah", dropped: "Sep 30", pointsAfter: 87.1, weeksAfter: 7, whereNow: "Now on Raymond's roster", blurb: "New to the list after 20.2 for Ray in Week 10. Isaiah drafted him and cut him. Weak hands to match the weak frame." },
  { player: "Denzel Boston", position: "WR · CLE", manager: "Matthew", dropped: "Aug 26", pointsAfter: 85.54, weeksAfter: 10, whereNow: "Now on Andrew's roster", blurb: "Matthew's 12th-round pick, cut before Week 1. Chris picked him up, then traded him to Andrew. Matthew doesn't mind; he just clinched his first playoff spot ever." },
  { player: "Tre Tucker", position: "WR · LV", manager: "Nicholas", dropped: "Sep 16", pointsAfter: 85.0, weeksAfter: 9, whereNow: "On waivers", blurb: "Scored 19.9 days after Nicholas cut him, which he'll blame on the model. lanny dropped him on Sunday night too." },
  { player: "Packers", position: "D/ST · GB", manager: "Jonathan", dropped: "Oct 7", pointsAfter: 80.5, weeksAfter: 5, whereNow: "Now on Raymond's roster", blurb: "4 points for Ray in Week 10, which is about what you'd expect from a Ray starter." },
];

export const managerDropRecords: ManagerDropRecord[] = [
  { manager: "Nicholas", pointsGivenAway: 1618.4, drops: 44 },
  { manager: "Isaiah", pointsGivenAway: 1030.1, drops: 31 },
  { manager: "Chris", pointsGivenAway: 945.0, drops: 35 },
  { manager: "Matthew", pointsGivenAway: 747.5, drops: 29 },
  { manager: "Noah", pointsGivenAway: 700.1, drops: 16 },
  { manager: "Ethan", pointsGivenAway: 620.1, drops: 24 },
  { manager: "lanny", pointsGivenAway: 606.5, drops: 21 },
  { manager: "Daniel", pointsGivenAway: 597.2, drops: 25 },
  { manager: "Raymond", pointsGivenAway: 460.9, drops: 24 },
  { manager: "Jonathan", pointsGivenAway: 314.5, drops: 15 },
  { manager: "Zachary", pointsGivenAway: 311.8, drops: 20 },
  { manager: "Andrew", pointsGivenAway: 103.8, drops: 3 },
];
