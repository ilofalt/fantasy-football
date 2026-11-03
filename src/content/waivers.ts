// Best waiver-wire and free-agent pickups, hand-updated each week.
//
// A pickup's points are the fantasy points the player scored while on the
// roster of the team that added him, counting each week he was on that roster
// at Sunday kickoff. Re-adding your own draft pick after dropping him doesn't
// count as a pickup.
//
// Last updated: Week 8 final, including Monday night (Nov 2, 2026).

export const WAIVERS_UPDATED = "Week 8 final · Mon Nov 2, 2026";
export const CURRENT_WEEK = 8;

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
  { player: "Tyler Allgeier", position: "RB · ARI", manager: "Daniel", added: "Oct 28", cost: 0, method: "Free agent", points: 34.6, weeksOnRoster: 1, blurb: "A free agent on Wednesday and the top-scoring pickup of the week. Daniel started him and got his first win." },
  { player: "Kirk Cousins", position: "QB · LV", manager: "Matthew", added: "Oct 30", cost: 2, method: "Waiver", points: 29.68, weeksOnRoster: 1, blurb: "Chris dropped him on Tuesday. Matthew paid $2, started him, and beat Zachary by 1.14." },
  { player: "Jaguars", position: "D/ST · JAX", manager: "Noah", added: "Oct 28", cost: 2, method: "Waiver", points: 25.0, weeksOnRoster: 1, blurb: "A $2 defense that held Indianapolis to 7 points." },
  { player: "Buccaneers", position: "D/ST · TB", manager: "lanny", added: "Nov 1", cost: 0, method: "Free agent", points: 21.0, weeksOnRoster: 1, blurb: "Added Sunday morning after scoring 31 on waivers the week before. A shutout of Atlanta, and lanny still lost by 55." },
  { player: "Bills", position: "D/ST · BUF", manager: "Jonathan", added: "Oct 28", cost: 0, method: "Free agent", points: 17.5, weeksOnRoster: 1, blurb: "Scored 17.5 on the bench. Jonathan started the Raiders (10) and won by 32 anyway." },
  { player: "Commanders", position: "D/ST · WAS", manager: "Isaiah", added: "Oct 28", cost: 0, method: "Free agent", points: 16.5, weeksOnRoster: 1, blurb: "Part of the week's top score." },
  { player: "Rams", position: "D/ST · LAR", manager: "Chris", added: "Oct 28", cost: 0, method: "Free agent", points: 14.0, weeksOnRoster: 1, blurb: "Chris's second straight win came with a free-agent defense." },
  { player: "T.J. Hockenson", position: "TE · MIN", manager: "Isaiah", added: "Oct 28", cost: 0, method: "Free agent", points: 13.3, weeksOnRoster: 1, blurb: "Filled in for George Kittle on his bye and scored a touchdown." },
  { player: "Malik Washington", position: "WR · MIA", manager: "Zachary", added: "Oct 31", cost: 0, method: "Free agent", points: 12.56, weeksOnRoster: 1, blurb: "Scored 12.56 on the bench in a 1.14-point loss." },
  { player: "Patriots", position: "D/ST · NE", manager: "Ethan", added: "Oct 28", cost: 0, method: "Waiver", points: 11.0, weeksOnRoster: 1, blurb: "A $0 claim that started for the 1st-place team." },
];

export const seasonPickups: Pickup[] = [
  { player: "Tyler Shough", position: "QB · NO", manager: "Raymond", added: "Aug 28", cost: 0, method: "Free agent", points: 93.16, weeksOnRoster: 5, status: "Dropped Oct 14", blurb: "Still the best pickup of the season: four 16-plus-point games for a free agent. Ray dropped him after a 1.8-point Week 5, and he's now Matthew's." },
  { player: "Will Reichard", position: "K · MIN", manager: "Zachary", added: "Aug 26", cost: 1, method: "Waiver", points: 86.0, weeksOnRoster: 8, blurb: "A $1 kicker who's been on Zachary's roster all season." },
  { player: "Braelon Allen", position: "RB · NYJ", manager: "Isaiah", added: "Sep 30", cost: 41, method: "Waiver", points: 85.4, weeksOnRoster: 5, blurb: "Up to 3rd after 25.8 in Week 8: 56.6 points in his last three games for the third-biggest bid of the season." },
  { player: "Bryce Young", position: "QB · CAR", manager: "lanny", added: "Sep 23", cost: 10, method: "Waiver", points: 75.22, weeksOnRoster: 6, blurb: "Three games of 14 to 22 points for a $10 bid. Now lanny's backup." },
  { player: "Vikings", position: "D/ST · MIN", manager: "Ethan", added: "Sep 23", cost: 1, method: "Waiver", points: 67.0, weeksOnRoster: 6, blurb: "A 28-point debut for $1." },
  { player: "Emanuel Wilson", position: "RB · SEA", manager: "Noah", added: "Oct 3", cost: 0, method: "Free agent", points: 66.4, weeksOnRoster: 5, blurb: "A free-agent RB who opened with 26.5 points. He scored zero on Noah's bench on Monday night." },
  { player: "C.J. Stroud", position: "QB · HOU", manager: "Andrew", added: "Oct 8", cost: 0, method: "Free agent", points: 63.94, weeksOnRoster: 4, blurb: "21.3 points a game, the best per-game pickup of the season. Houston was on bye in Week 8." },
  { player: "Travis Kelce", position: "TE · KC", manager: "lanny", added: "Aug 26", cost: 1, method: "Waiver", points: 63.0, weeksOnRoster: 8, blurb: "Went undrafted and was claimed for a dollar. Still a starting TE." },
  { player: "Woody Marks", position: "RB · HOU", manager: "Daniel", added: "Sep 16", cost: 65, method: "Waiver", points: 55.68, weeksOnRoster: 7, blurb: "The biggest FAAB bid of the season. Steady, at about 9 points a week, but not $65 steady." },
  { player: "Evan McPherson", position: "K · CIN", manager: "Isaiah", added: "Sep 8", cost: 0, method: "Free agent", points: 55.6, weeksOnRoster: 5, status: "Dropped Oct 13", blurb: "Started hot with 19.5 in Week 1, then faded before Isaiah moved on. Now Chris's kicker." },
  { player: "Isaiah Likely", position: "TE · NYG", manager: "Raymond", added: "Oct 4", cost: 0, method: "Free agent", points: 54.6, weeksOnRoster: 5, blurb: "Isaiah drafted him and dropped him. Ray has 54.6 points from him, but only 9.8 in the last three weeks." },
  { player: "Emmett Johnson", position: "RB · KC", manager: "Matthew", added: "Aug 26", cost: 0, method: "Waiver", points: 54.46, weeksOnRoster: 8, blurb: "New to the list after 24.06 in Week 8, all of it on Matthew's bench." },
];

export const managerWaiverRecords: ManagerWaiverRecord[] = [
  { manager: "Isaiah", points: 385.2, pickups: 27, faabSpent: 100 },
  { manager: "Noah", points: 369.3, pickups: 14, faabSpent: 76 },
  { manager: "Nicholas", points: 333.5, pickups: 41, faabSpent: 97 },
  { manager: "lanny", points: 331.1, pickups: 17, faabSpent: 35 },
  { manager: "Matthew", points: 319.0, pickups: 25, faabSpent: 37 },
  { manager: "Ethan", points: 279.8, pickups: 18, faabSpent: 74 },
  { manager: "Zachary", points: 270.3, pickups: 18, faabSpent: 46 },
  { manager: "Raymond", points: 260.1, pickups: 18, faabSpent: 38 },
  { manager: "Chris", points: 255.2, pickups: 33, faabSpent: 92 },
  { manager: "Daniel", points: 221.1, pickups: 24, faabSpent: 91 },
  { manager: "Jonathan", points: 149.6, pickups: 8, faabSpent: 23 },
  { manager: "Andrew", points: 107.2, pickups: 2, faabSpent: 0 },
];

export const waiverNotes: { title: string; body: string }[] = [
  { title: "New leader", body: "Isaiah passed Noah for the most points from the wire (385.2), with 82.0 in Week 8 alone: Braelon Allen, the Commanders D/ST, and T.J. Hockenson." },
  { title: "Best value", body: "lanny has 331.1 points from the wire for $35 of FAAB, about $0.11 a point. Matthew is close behind at 319.0 for $37." },
  { title: "Most active", body: "Nicholas has made 41 pickups, more than anyone else, and is third in points from them (333.5)." },
  { title: "Best week", body: "Isaiah got 82.0 points from pickups in Week 8, the most in the league. Matthew (74.3) and Ethan (62.7) were next." },
  { title: "Doesn't count", body: "Re-adding your own draft pick isn't a pickup, and neither is a player added and dropped within a few minutes, like Daniel's 12-QB carousel on Oct 21." },
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
  { player: "Kirk Cousins", position: "QB · LV", manager: "Chris", dropped: "Oct 27", pointsAfter: 29.68, weeksAfter: 1, whereNow: "Now on Matthew's roster", blurb: "Chris cut him on Tuesday with Josh Allen back from his bye. Matthew claimed him for $2 and his 29.68 decided a 1.14-point win over Zachary." },
  { player: "Geno Smith", position: "QB · NYJ", manager: "Daniel", dropped: "Oct 31", pointsAfter: 19.0, weeksAfter: 1, whereNow: "On waivers", blurb: "Daniel added him Wednesday and dropped him Saturday. It's the second straight week Geno scored 19 or more right after being dropped; Isaiah let him go before Week 7." },
  { player: "Jason Sanders", position: "K · NYJ", manager: "lanny", dropped: "Oct 28", pointsAfter: 15.7, weeksAfter: 1, whereNow: "On waivers", blurb: "Dropped for Chad Ryland, who scored 9.9." },
  { player: "DeMario Douglas", position: "WR · NE", manager: "Nicholas", dropped: "Oct 31", pointsAfter: 15.1, weeksAfter: 1, whereNow: "On waivers", blurb: "Nicholas traded for him on Wednesday and dropped him Saturday for Dylan Sampson (10.36, on the bench)." },
  { player: "Rome Odunze", position: "WR · CHI", manager: "Raymond", dropped: "Nov 1", pointsAfter: 10.7, weeksAfter: 1, whereNow: "On waivers", blurb: "Dropped Sunday morning for Chris Godwin Jr., who scored 0. Odunze scored on Monday night." },
  { player: "Jahan Dotson", position: "WR · ATL", manager: "Ethan", dropped: "Oct 28", pointsAfter: 10.5, weeksAfter: 1, whereNow: "On waivers", blurb: "A $1 pickup a week earlier, dropped right before a 10.5-point game." },
];

export const seasonDrops: Drop[] = [
  { player: "Bo Nix", position: "QB · DEN", manager: "Nicholas", dropped: "Sep 16", pointsAfter: 116.78, weeksAfter: 7, whereNow: "On waivers", blurb: "Nicholas dropped his own 12th-round pick, and Nix has scored 116.78 since, including 19.78 in Week 8 on waivers. Isaiah and Matthew both picked him up and dropped him too." },
  { player: "Sam Darnold", position: "QB · SEA", manager: "Daniel", dropped: "Sep 22", pointsAfter: 103.3, weeksAfter: 6, whereNow: "On waivers", blurb: "Daniel's own 12th-round pick, cut on a Tuesday. Darnold scored 30.16 that Sunday for Isaiah and has kept scoring since." },
  { player: "Jordan Love", position: "QB · GB", manager: "Noah", dropped: "Oct 3", pointsAfter: 102.08, weeksAfter: 5, whereNow: "Now on lanny's roster", blurb: "Noah cut him in Week 4 to add Emanuel Wilson. lanny, who drafted Love and also dropped him before Week 1, re-claimed him on Oct 14." },
  { player: "Spencer Shrader", position: "K · IND", manager: "Noah", dropped: "Sep 19", pointsAfter: 86.6, weeksAfter: 7, whereNow: "Now on Nicholas's roster", blurb: "At least 15 points in four of seven weeks since Noah let him go." },
  { player: "Buccaneers", position: "D/ST · TB", manager: "Chris", dropped: "Sep 22", pointsAfter: 85.5, weeksAfter: 6, whereNow: "Now on lanny's roster", blurb: "31 points on waivers in Week 7 and 21 for lanny in Week 8." },
  { player: "Vikings", position: "D/ST · MIN", manager: "Nicholas", dropped: "Sep 16", pointsAfter: 84.0, weeksAfter: 7, whereNow: "Now on Ethan's roster", blurb: "Ethan claimed them for $1 and got a 28-point game in his first week." },
  { player: "Kyler Murray", position: "QB · MIN", manager: "Isaiah", dropped: "Sep 19", pointsAfter: 79.96, weeksAfter: 7, whereNow: "Now on Ethan's roster", blurb: "Isaiah's 12th-round pick. lanny had him for two weeks; Ethan claimed him for $1 and has 36.3 points from him in two weeks." },
  { player: "Tre Tucker", position: "WR · LV", manager: "Nicholas", dropped: "Sep 16", pointsAfter: 77.1, weeksAfter: 7, whereNow: "Now on lanny's roster", blurb: "Scored 19.9 days after Nicholas cut him, and 42 for lanny in Weeks 6 and 7." },
  { player: "Denzel Boston", position: "WR · CLE", manager: "Matthew", dropped: "Aug 26", pointsAfter: 70.42, weeksAfter: 8, whereNow: "Now on Andrew's roster", blurb: "Matthew's 12th-round pick, cut before Week 1. Chris picked him up, then traded him to Andrew." },
  { player: "Emanuel Wilson", position: "RB · SEA", manager: "Nicholas", dropped: "Sep 30", pointsAfter: 66.4, weeksAfter: 5, whereNow: "Now on Noah's roster", blurb: "Scored 26.5 days after Nicholas dropped him." },
];

export const managerDropRecords: ManagerDropRecord[] = [
  { manager: "Nicholas", pointsGivenAway: 1240.8, drops: 41 },
  { manager: "Isaiah", pointsGivenAway: 788.4, drops: 26 },
  { manager: "Chris", pointsGivenAway: 636.5, drops: 29 },
  { manager: "Noah", pointsGivenAway: 504.1, drops: 13 },
  { manager: "Matthew", pointsGivenAway: 483.8, drops: 26 },
  { manager: "lanny", pointsGivenAway: 425.9, drops: 17 },
  { manager: "Ethan", pointsGivenAway: 408.8, drops: 18 },
  { manager: "Daniel", pointsGivenAway: 395.4, drops: 25 },
  { manager: "Raymond", pointsGivenAway: 272.1, drops: 20 },
  { manager: "Zachary", pointsGivenAway: 192.3, drops: 17 },
  { manager: "Jonathan", pointsGivenAway: 163.9, drops: 8 },
  { manager: "Andrew", pointsGivenAway: 61.0, drops: 2 },
];
