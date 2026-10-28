// Best waiver-wire and free-agent pickups, hand-updated each week.
//
// A pickup's points are the fantasy points the player scored while on the
// roster of the team that added him, counting each week he was on that roster
// at Sunday kickoff. Re-adding your own draft pick after dropping him doesn't
// count as a pickup.
//
// Last updated: Week 7 final, including Monday night (Oct 27, 2026).

export const WAIVERS_UPDATED = "Week 7 final · Tue Oct 27, 2026";
export const CURRENT_WEEK = 7;

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
  { player: "Omar Cooper Jr.", position: "WR · NYJ", manager: "Chris", added: "Oct 21", cost: 3, method: "Waiver", points: 19.0, weeksOnRoster: 1, blurb: "The top-scoring pickup of the week, and the reason Chris won by 0.12. The best $3 Chris has spent." },
  { player: "Tyler Shough", position: "QB · NO", manager: "Matthew", added: "Oct 21", cost: 0, method: "Waiver", points: 15.32, weeksOnRoster: 1, blurb: "The QB everyone let go finally lands somewhere, for $0. He started and helped Matthew to 6-1." },
  { player: "Kyler Murray", position: "QB · MIN", manager: "Ethan", added: "Oct 21", cost: 1, method: "Waiver", points: 14.9, weeksOnRoster: 1, blurb: "A $1 starting QB for the first-place team." },
  { player: "Aaron Rodgers", position: "QB · PIT", manager: "Isaiah", added: "Oct 24", cost: 0, method: "Waiver", points: 13.58, weeksOnRoster: 1, status: "Dropped Oct 27", blurb: "Isaiah dropped Geno Smith to claim him. Geno scored 24.98 on waivers." },
  { player: "Chase McLaughlin", position: "K · TB", manager: "Ethan", added: "Oct 21", cost: 3, method: "Waiver", points: 11.6, weeksOnRoster: 1, blurb: "One of four Ethan pickups this week, all of them useful." },
  { player: "Seth McGowan", position: "RB · IND", manager: "Chris", added: "Oct 22", cost: 0, method: "Free agent", points: 11.4, weeksOnRoster: 1, blurb: "Scored 11.4 on Chris's bench. Chris won anyway." },
  { player: "Rico Dowdle", position: "RB · PIT", manager: "Daniel", added: "Oct 21", cost: 0, method: "Free agent", points: 11.1, weeksOnRoster: 1, blurb: "Daniel's flex. Luther Burden III scored 21.7 on the bench behind him, and Daniel lost by 0.12." },
  { player: "Bengals", position: "D/ST · CIN", manager: "Nicholas", added: "Oct 22", cost: 0, method: "Free agent", points: 11.0, weeksOnRoster: 1, blurb: "A free-agent defense that scored 11, on the bench. Nicholas started the Titans (2)." },
  { player: "Tyrone Tracy Jr.", position: "RB · NYG", manager: "Isaiah", added: "Oct 25", cost: 0, method: "Free agent", points: 10.82, weeksOnRoster: 1, blurb: "Added Sunday morning and left on the bench. Zachary had dropped him on Wednesday." },
  { player: "Jake Bates", position: "K · DET", manager: "Daniel", added: "Oct 21", cost: 0, method: "Waiver", points: 8.2, weeksOnRoster: 1, blurb: "A $0 claim on lanny's old kicker." },
];

export const seasonPickups: Pickup[] = [
  { player: "Tyler Shough", position: "QB · NO", manager: "Raymond", added: "Aug 28", cost: 0, method: "Free agent", points: 93.16, weeksOnRoster: 5, status: "Dropped Oct 14", blurb: "Still the best pickup of the season: four 16-plus-point games for a free agent. Ray dropped him after a 1.8-point Week 5, and he's now Matthew's starter." },
  { player: "Will Reichard", position: "K · MIN", manager: "Zachary", added: "Aug 26", cost: 1, method: "Waiver", points: 86.0, weeksOnRoster: 7, blurb: "A $1 kicker who's been on Zachary's roster all season. Another 11.7 in Week 7." },
  { player: "Emanuel Wilson", position: "RB · SEA", manager: "Noah", added: "Oct 3", cost: 0, method: "Free agent", points: 66.4, weeksOnRoster: 4, blurb: "A free-agent RB who opened with 26.5 points and scored 19 more in Week 7." },
  { player: "C.J. Stroud", position: "QB · HOU", manager: "Andrew", added: "Oct 8", cost: 0, method: "Free agent", points: 63.94, weeksOnRoster: 3, blurb: "The best per-game pickup of the season: 21.3 points a week. One of only two adds Andrew has made all year." },
  { player: "Bryce Young", position: "QB · CAR", manager: "lanny", added: "Sep 23", cost: 10, method: "Waiver", points: 63.86, weeksOnRoster: 5, blurb: "Three games of 14 to 22 points for a $10 bid. Now lanny's backup." },
  { player: "Braelon Allen", position: "RB · NYJ", manager: "Isaiah", added: "Sep 30", cost: 41, method: "Waiver", points: 59.6, weeksOnRoster: 4, blurb: "New to the list: 30.8 points in the last two weeks for the third-biggest bid of the season." },
  { player: "Vikings", position: "D/ST · MIN", manager: "Ethan", added: "Sep 23", cost: 1, method: "Waiver", points: 59.5, weeksOnRoster: 5, blurb: "A 28-point debut for $1, and 10 more in Week 7." },
  { player: "Woody Marks", position: "RB · HOU", manager: "Daniel", added: "Sep 16", cost: 65, method: "Waiver", points: 55.68, weeksOnRoster: 6, blurb: "The biggest FAAB bid of the season. Steady, at about 9 points a week, but not $65 steady." },
  { player: "Evan McPherson", position: "K · CIN", manager: "Isaiah", added: "Sep 8", cost: 0, method: "Free agent", points: 55.6, weeksOnRoster: 5, status: "Dropped Oct 13", blurb: "Started hot with 19.5 in Week 1, then faded before Isaiah moved on. Now Chris's kicker." },
  { player: "Travis Kelce", position: "TE · KC", manager: "lanny", added: "Aug 26", cost: 1, method: "Waiver", points: 55.3, weeksOnRoster: 7, blurb: "Went undrafted and was claimed for a dollar. Still a starting TE." },
  { player: "Isaiah Likely", position: "TE · NYG", manager: "Raymond", added: "Oct 4", cost: 0, method: "Free agent", points: 54.6, weeksOnRoster: 4, blurb: "Isaiah drafted him and dropped him. Ray has 54.6 points from him, but only 9.8 in the last two weeks." },
  { player: "Kirk Cousins", position: "QB · LV", manager: "Chris", added: "Oct 7", cost: 11, method: "Waiver", points: 54.14, weeksOnRoster: 3, status: "Dropped Oct 27", blurb: "New to the list after 20.9 in Week 7, then dropped on Tuesday with Josh Allen back from his bye." },
];

export const managerWaiverRecords: ManagerWaiverRecord[] = [
  { manager: "Noah", points: 315.4, pickups: 13, faabSpent: 74 },
  { manager: "Nicholas", points: 305.7, pickups: 39, faabSpent: 96 },
  { manager: "Isaiah", points: 303.2, pickups: 24, faabSpent: 100 },
  { manager: "lanny", points: 279.1, pickups: 15, faabSpent: 35 },
  { manager: "Matthew", points: 244.7, pickups: 21, faabSpent: 35 },
  { manager: "Raymond", points: 234.6, pickups: 16, faabSpent: 13 },
  { manager: "Chris", points: 226.3, pickups: 30, faabSpent: 92 },
  { manager: "Zachary", points: 220.0, pickups: 16, faabSpent: 46 },
  { manager: "Ethan", points: 217.1, pickups: 16, faabSpent: 59 },
  { manager: "Daniel", points: 165.7, pickups: 21, faabSpent: 91 },
  { manager: "Jonathan", points: 120.0, pickups: 6, faabSpent: 23 },
  { manager: "Andrew", points: 105.9, pickups: 2, faabSpent: 0 },
];

export const waiverNotes: { title: string; body: string }[] = [
  { title: "New leader", body: "Noah passed Nicholas for the most points from the wire (315.4) with just 13 pickups. Emanuel Wilson's 19 in Week 7 did it." },
  { title: "Best value", body: "Raymond has gotten 234.6 points from the wire while spending just $13 of FAAB, about $0.06 a point." },
  { title: "Most active", body: "Nicholas has made 39 pickups, more than anyone else, and is second in points from them (305.7)." },
  { title: "Best week", body: "Isaiah got 74.9 points from pickups in Week 7, the most in the league, and still lost by 24. Ethan (67.4) and Chris (66.4) were next." },
  { title: "Doesn't count", body: "Re-adding your own draft pick isn't a pickup, and neither is a player added and dropped within a few minutes. Daniel added and dropped 12 QBs in three minutes on Oct 21; none of them count as pickups or drops." },
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
  { player: "Geno Smith", position: "QB · NYJ", manager: "Isaiah", dropped: "Oct 24", pointsAfter: 24.98, weeksAfter: 1, whereNow: "On waivers", blurb: "Isaiah picked him up Wednesday and dropped him on Saturday's waivers to claim Aaron Rodgers. Geno outscored Rodgers by 11.4, and Isaiah lost to Jonathan by 24." },
  { player: "Cam Skattebo", position: "RB · NYG", manager: "Isaiah", dropped: "Oct 24", pointsAfter: 20.6, weeksAfter: 1, whereNow: "On waivers", blurb: "Daniel dropped his own 7th-round pick on Wednesday. Isaiah claimed him early Saturday and dropped him Saturday night for the Cardinals D/ST, which scored -3.5." },
  { player: "Michael Penix Jr.", position: "QB · ATL", manager: "Matthew", dropped: "Oct 21", pointsAfter: 20.42, weeksAfter: 1, whereNow: "On waivers", blurb: "Dropped for Tyler Shough, who scored 15.32. Matthew won anyway." },
  { player: "Tyler Huntley", position: "QB · BAL", manager: "Matthew", dropped: "Oct 25", pointsAfter: 16.12, weeksAfter: 1, whereNow: "On waivers", blurb: "Cut early Sunday morning to claim Dallas Goedert (5.8)." },
  { player: "Dameon Pierce", position: "RB · PHI", manager: "Daniel", dropped: "Oct 25", pointsAfter: 14.28, weeksAfter: 1, whereNow: "On waivers", blurb: "Daniel paid $26 for him last week and dropped him an hour before kickoff. Daniel lost by 0.12." },
  { player: "Aaron Rodgers", position: "QB · PIT", manager: "Ethan", dropped: "Oct 21", pointsAfter: 13.58, weeksAfter: 1, whereNow: "On waivers", blurb: "Ethan swapped him for Kyler Murray, who scored 14.9. Isaiah claimed Rodgers, started him, and dropped him again on Tuesday." },
];

export const seasonDrops: Drop[] = [
  { player: "Bo Nix", position: "QB · DEN", manager: "Nicholas", dropped: "Sep 16", pointsAfter: 97.0, weeksAfter: 6, whereNow: "On waivers", blurb: "Nicholas dropped his own 12th-round pick, and Nix now has 97 points since, including 27.78 in Week 7 on waivers. Isaiah and Matthew both picked him up and dropped him too." },
  { player: "Jordan Love", position: "QB · GB", manager: "lanny", dropped: "Aug 26", pointsAfter: 93.12, weeksAfter: 5, whereNow: "Back on lanny's roster", blurb: "lanny cut his own 14th-round pick before Week 1 to claim Travis Kelce. Love scored 93 points over the next five weeks while Noah and Nicholas also picked him up and dropped him. lanny finally re-claimed him on Oct 14." },
  { player: "Spencer Shrader", position: "K · IND", manager: "Noah", dropped: "Sep 19", pointsAfter: 85.6, weeksAfter: 6, whereNow: "Now on Nicholas's roster", blurb: "At least 15 points in four of six weeks since Noah let him go." },
  { player: "Sam Darnold", position: "QB · SEA", manager: "Daniel", dropped: "Sep 22", pointsAfter: 84.78, weeksAfter: 5, whereNow: "On waivers", blurb: "Daniel cut him on a Tuesday, and Darnold scored 30.16 that Sunday for Isaiah. Daniel re-added him for about a minute on Oct 21." },
  { player: "Tre Tucker", position: "WR · LV", manager: "Nicholas", dropped: "Sep 16", pointsAfter: 77.1, weeksAfter: 6, whereNow: "Now on lanny's roster", blurb: "Scored 19.9 days after Nicholas cut him, and 42 for lanny in the last two weeks." },
  { player: "Vikings", position: "D/ST · MIN", manager: "Nicholas", dropped: "Sep 16", pointsAfter: 76.5, weeksAfter: 6, whereNow: "Now on Ethan's roster", blurb: "Ethan claimed them for $1 and got a 28-point game in his first week." },
  { player: "Emanuel Wilson", position: "RB · SEA", manager: "Nicholas", dropped: "Sep 30", pointsAfter: 66.4, weeksAfter: 4, whereNow: "Now on Noah's roster", blurb: "Scored 26.5 days after Nicholas dropped him, and 19 more in Week 7." },
  { player: "Denzel Boston", position: "WR · CLE", manager: "Matthew", dropped: "Aug 26", pointsAfter: 65.22, weeksAfter: 7, whereNow: "Now on Andrew's roster", blurb: "Matthew's 12th-round pick, cut before Week 1. Chris picked him up, then traded him to Andrew." },
  { player: "Woody Marks", position: "RB · HOU", manager: "Isaiah", dropped: "Sep 8", pointsAfter: 64.8, weeksAfter: 7, whereNow: "Now on Daniel's roster", blurb: "Isaiah's 13th-round pick, dropped before Week 1. Daniel paid $65 for him a week later." },
  { player: "Buccaneers", position: "D/ST · TB", manager: "Chris", dropped: "Sep 22", pointsAfter: 64.5, weeksAfter: 5, whereNow: "On waivers", blurb: "New to the list: 31 points in Week 7, the best score of any defense, while nobody had them." },
];

export const managerDropRecords: ManagerDropRecord[] = [
  { manager: "Nicholas", pointsGivenAway: 1021.8, drops: 39 },
  { manager: "Isaiah", pointsGivenAway: 627.7, drops: 23 },
  { manager: "Chris", pointsGivenAway: 429.3, drops: 25 },
  { manager: "Noah", pointsGivenAway: 416.2, drops: 12 },
  { manager: "Matthew", pointsGivenAway: 383.9, drops: 22 },
  { manager: "Ethan", pointsGivenAway: 281.0, drops: 16 },
  { manager: "lanny", pointsGivenAway: 271.0, drops: 16 },
  { manager: "Daniel", pointsGivenAway: 267.6, drops: 21 },
  { manager: "Raymond", pointsGivenAway: 227.3, drops: 17 },
  { manager: "Jonathan", pointsGivenAway: 138.8, drops: 6 },
  { manager: "Zachary", pointsGivenAway: 132.4, drops: 16 },
  { manager: "Andrew", pointsGivenAway: 34.3, drops: 2 },
];
