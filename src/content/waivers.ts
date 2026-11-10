// Best waiver-wire and free-agent pickups, hand-updated each week.
//
// A pickup's points are the fantasy points the player scored while on the
// roster of the team that added him, counting each week he was on that roster
// at Sunday kickoff. Re-adding your own draft pick after dropping him doesn't
// count as a pickup.
//
// Last updated: Week 9 final, including Monday night (Nov 9, 2026).

export const WAIVERS_UPDATED = "Week 9 final · Mon Nov 9, 2026";
export const CURRENT_WEEK = 9;

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
  { player: "49ers", position: "D/ST · SF", manager: "Nicholas", added: "Nov 4", cost: 0, method: "Waiver", points: 24.0, weeksOnRoster: 1, blurb: "A $0 claim and the top-scoring pickup of the week, in Nicholas' win over Raymond, who never stood a chance." },
  { player: "Bo Nix", position: "QB · DEN", manager: "Ethan", added: "Nov 5", cost: 0, method: "Free agent", points: 17.18, weeksOnRoster: 1, blurb: "Nicholas, Isaiah, and Matthew all let him go. Ethan cut Kyler Murray for him, started him, and lost anyway." },
  { player: "Bills", position: "D/ST · BUF", manager: "Ethan", added: "Nov 8", cost: 0, method: "Free agent", points: 17.0, weeksOnRoster: 1, blurb: "Added Sunday afternoon, three days after Jonathan dropped them, and started on Monday night." },
  { player: "Chiefs", position: "D/ST · KC", manager: "Isaiah", added: "Nov 4", cost: 0, method: "Waiver", points: 16.5, weeksOnRoster: 1, blurb: "Isaiah's best defense of the season so far. He lost by 0.82." },
  { player: "Tyler Bass", position: "K · BUF", manager: "Noah", added: "Nov 4", cost: 2, method: "Waiver", points: 13.6, weeksOnRoster: 1, blurb: "A $2 kicker who scored on Monday night." },
  { player: "Drew Lock", position: "QB · SEA", manager: "Daniel", added: "Nov 4", cost: 0, method: "Free agent", points: 13.1, weeksOnRoster: 1, blurb: "Started over Dak Prescott (19.5, on the bench), and Daniel still won by 0.82." },
  { player: "Packers", position: "D/ST · GB", manager: "Raymond", added: "Nov 4", cost: 0, method: "Waiver", points: 13.0, weeksOnRoster: 1, blurb: "Scored 13 on Ray's bench in an 11-point loss. Lineup decisions remain a mystery to him." },
  { player: "DeMario Douglas", position: "WR · NE", manager: "Zachary", added: "Nov 4", cost: 1, method: "Waiver", points: 11.7, weeksOnRoster: 1, blurb: "A $1 flex play in Zachary's 9.06-point win over Chris. Nicholas had dropped him a week earlier." },
  { player: "Chris Rodriguez Jr.", position: "RB · JAX", manager: "Chris", added: "Nov 4", cost: 1, method: "Waiver", points: 10.7, weeksOnRoster: 1, blurb: "10.7 on the bench in a 9.06-point loss." },
  { player: "Lions", position: "D/ST · DET", manager: "Jonathan", added: "Nov 4", cost: 0, method: "Free agent", points: 10.0, weeksOnRoster: 1, blurb: "A Wednesday free agent in Jonathan's third straight win." },
];

export const seasonPickups: Pickup[] = [
  { player: "C.J. Stroud", position: "QB · HOU", manager: "Andrew", added: "Oct 8", cost: 0, method: "Free agent", points: 101.3, weeksOnRoster: 5, blurb: "New No. 1: 37.36 in Week 9, the top score by any player that week, for a free agent Andrew added in October." },
  { player: "Bryce Young", position: "QB · CAR", manager: "lanny", added: "Sep 23", cost: 10, method: "Waiver", points: 97.06, weeksOnRoster: 7, blurb: "21.84 on lanny's bench in Week 9. A $10 bid that keeps paying, even as a backup." },
  { player: "Will Reichard", position: "K · MIN", manager: "Zachary", added: "Aug 26", cost: 1, method: "Waiver", points: 95.6, weeksOnRoster: 9, blurb: "A $1 kicker on Zachary's roster all season, with 9.6 on Monday night." },
  { player: "Tyler Shough", position: "QB · NO", manager: "Raymond", added: "Aug 28", cost: 0, method: "Free agent", points: 93.16, weeksOnRoster: 5, status: "Dropped Oct 14", blurb: "Four 16-plus-point games for a free agent before Ray, in his infinite wisdom, let him go." },
  { player: "Braelon Allen", position: "RB · NYJ", manager: "Isaiah", added: "Sep 30", cost: 41, method: "Waiver", points: 90.3, weeksOnRoster: 6, blurb: "The third-biggest bid of the season, with 61.5 points in his last four games." },
  { player: "Travis Kelce", position: "TE · KC", manager: "lanny", added: "Aug 26", cost: 1, method: "Waiver", points: 78.3, weeksOnRoster: 9, blurb: "Went undrafted and was claimed for a dollar. 15.3 in Week 9." },
  { player: "Vikings", position: "D/ST · MIN", manager: "Ethan", added: "Sep 23", cost: 1, method: "Waiver", points: 73.0, weeksOnRoster: 7, blurb: "A 28-point debut for $1." },
  { player: "Spencer Shrader", position: "K · IND", manager: "Nicholas", added: "Sep 30", cost: 12, method: "Waiver", points: 68.6, weeksOnRoster: 6, blurb: "New to the list after 17.6 in Week 9. Noah dropped him in September." },
  { player: "Isaiah Likely", position: "TE · NYG", manager: "Raymond", added: "Oct 4", cost: 0, method: "Free agent", points: 66.9, weeksOnRoster: 6, blurb: "Isaiah drafted him and dropped him. 12.3 for Ray in Week 9, on a team that lost anyway." },
  { player: "Emanuel Wilson", position: "RB · SEA", manager: "Noah", added: "Oct 3", cost: 0, method: "Free agent", points: 66.4, weeksOnRoster: 5, status: "Dropped Nov 4", blurb: "Opened with 26.5 points, then scored 0 in Week 8, and Noah let him go." },
  { player: "Emmett Johnson", position: "RB · KC", manager: "Matthew", added: "Aug 26", cost: 0, method: "Waiver", points: 66.02, weeksOnRoster: 9, blurb: "35.6 points in the last two weeks, most of it on Matthew's bench." },
  { player: "Woody Marks", position: "RB · HOU", manager: "Daniel", added: "Sep 16", cost: 65, method: "Waiver", points: 63.58, weeksOnRoster: 8, blurb: "The biggest FAAB bid of the season. Steady, at about 8 points a week, but not $65 steady." },
];

export const managerWaiverRecords: ManagerWaiverRecord[] = [
  { manager: "Noah", points: 435.4, pickups: 16, faabSpent: 84 },
  { manager: "Isaiah", points: 418.9, pickups: 31, faabSpent: 100 },
  { manager: "lanny", points: 398.5, pickups: 17, faabSpent: 35 },
  { manager: "Nicholas", points: 393.7, pickups: 43, faabSpent: 97 },
  { manager: "Matthew", points: 375.3, pickups: 26, faabSpent: 37 },
  { manager: "Ethan", points: 325.5, pickups: 20, faabSpent: 74 },
  { manager: "Chris", points: 323.3, pickups: 35, faabSpent: 93 },
  { manager: "Zachary", points: 308.1, pickups: 21, faabSpent: 47 },
  { manager: "Raymond", points: 303.5, pickups: 21, faabSpent: 38 },
  { manager: "Daniel", points: 270.4, pickups: 26, faabSpent: 100 },
  { manager: "Jonathan", points: 172.0, pickups: 11, faabSpent: 33 },
  { manager: "Andrew", points: 150.4, pickups: 3, faabSpent: 5 },
];

export const waiverNotes: { title: string; body: string }[] = [
  { title: "New leader", body: "Noah is back on top with 435.4 points from the wire, on just 16 pickups. Isaiah (418.9) is second." },
  { title: "Best value", body: "lanny has 398.5 points from the wire for $35 of FAAB, about $0.09 a point." },
  { title: "Most active", body: "Nicholas has made 43 pickups, more than anyone else, and is fourth in points from them (393.7)." },
  { title: "Best week", body: "Chris got 68.1 points from pickups in Week 9, the most in the league. lanny (67.4) and Noah (66.1) were next." },
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
  { player: "Cam Little", position: "K · JAX", manager: "Raymond", dropped: "Nov 4", pointsAfter: 19.1, weeksAfter: 1, whereNow: "On waivers", blurb: "Ray cut him on Wednesday's waivers, and Little scored 19.1 on Sunday. Ray lost by 10.98. Classic Ray. Fuck Ray." },
  { player: "Bills", position: "D/ST · BUF", manager: "Jonathan", dropped: "Nov 5", pointsAfter: 17.0, weeksAfter: 1, whereNow: "Now on Ethan's roster", blurb: "Dropped Thursday for Kenny Gainwell (8.6, on the bench). Ethan picked them up Sunday and got 17." },
  { player: "Kirk Cousins", position: "QB · LV", manager: "Matthew", dropped: "Nov 4", pointsAfter: 16.14, weeksAfter: 1, whereNow: "On waivers", blurb: "One week after winning Matthew a game, Cousins was back on waivers. Matthew won anyway, by 32.48." },
  { player: "Justin Herbert", position: "QB · LAC", manager: "Andrew", dropped: "Nov 7", pointsAfter: 11.42, weeksAfter: 1, whereNow: "On waivers", blurb: "Andrew's third pickup of the season: Herbert out, Malik Washington in. Washington scored 3.1." },
  { player: "Rams", position: "D/ST · LAR", manager: "Chris", dropped: "Nov 3", pointsAfter: 11.0, weeksAfter: 1, whereNow: "On waivers", blurb: "14 points for Chris in Week 8, then dropped. Chris lost by 9.06." },
  { player: "Khalil Shakir", position: "WR · BUF", manager: "Zachary", dropped: "Nov 4", pointsAfter: 7.8, weeksAfter: 1, whereNow: "On waivers", blurb: "Scored 7.8 on Monday night. Zachary won anyway." },
];

export const seasonDrops: Drop[] = [
  { player: "Jordan Love", position: "QB · GB", manager: "Noah", dropped: "Oct 3", pointsAfter: 138.76, weeksAfter: 6, whereNow: "Now on lanny's roster", blurb: "Noah cut him for Emanuel Wilson. Love scored 36.68 for lanny in Week 9. lanny drafted him, dropped him before Week 1, and re-claimed him in October." },
  { player: "Bo Nix", position: "QB · DEN", manager: "Nicholas", dropped: "Sep 16", pointsAfter: 133.96, weeksAfter: 8, whereNow: "Now on Ethan's roster", blurb: "Nicholas' 12th-round pick. Isaiah, Matthew, and Daniel all picked him up and let him go before Ethan started him in Week 9." },
  { player: "Spencer Shrader", position: "K · IND", manager: "Noah", dropped: "Sep 19", pointsAfter: 104.2, weeksAfter: 8, whereNow: "Now on Nicholas's roster", blurb: "17.6 for Nicholas in Week 9." },
  { player: "Sam Darnold", position: "QB · SEA", manager: "Daniel", dropped: "Sep 22", pointsAfter: 103.3, weeksAfter: 7, whereNow: "Not on a roster", blurb: "Daniel's own 12th-round pick, cut on a Tuesday. Darnold scored 30.16 that Sunday for Isaiah." },
  { player: "Buccaneers", position: "D/ST · TB", manager: "Chris", dropped: "Sep 22", pointsAfter: 99.0, weeksAfter: 7, whereNow: "Now on lanny's roster", blurb: "31 on waivers in Week 7, then 21 and 13.5 for lanny." },
  { player: "Vikings", position: "D/ST · MIN", manager: "Nicholas", dropped: "Sep 16", pointsAfter: 90.0, weeksAfter: 8, whereNow: "Now on Ethan's roster", blurb: "Ethan claimed them for $1 and got a 28-point game in his first week." },
  { player: "Tre Tucker", position: "WR · LV", manager: "Nicholas", dropped: "Sep 16", pointsAfter: 84.1, weeksAfter: 8, whereNow: "Now on lanny's roster", blurb: "Scored 19.9 days after Nicholas cut him." },
  { player: "Denzel Boston", position: "WR · CLE", manager: "Matthew", dropped: "Aug 26", pointsAfter: 81.72, weeksAfter: 9, whereNow: "Now on Andrew's roster", blurb: "Matthew's 12th-round pick, cut before Week 1. Chris picked him up, then traded him to Andrew." },
  { player: "Kyler Murray", position: "QB · MIN", manager: "Isaiah", dropped: "Sep 19", pointsAfter: 79.96, weeksAfter: 8, whereNow: "Not on a roster", blurb: "Isaiah's 12th-round pick. lanny and Ethan both picked him up; Ethan cut him for Bo Nix on Nov 5." },
  { player: "Packers", position: "D/ST · GB", manager: "Jonathan", dropped: "Oct 7", pointsAfter: 76.5, weeksAfter: 4, whereNow: "Now on Raymond's roster", blurb: "New to the list: 13 on Ray's bench in Week 9, where good players go to waste." },
];

export const managerDropRecords: ManagerDropRecord[] = [
  { manager: "Nicholas", pointsGivenAway: 1451.3, drops: 43 },
  { manager: "Isaiah", pointsGivenAway: 889.8, drops: 30 },
  { manager: "Chris", pointsGivenAway: 815.5, drops: 31 },
  { manager: "Matthew", pointsGivenAway: 671.8, drops: 27 },
  { manager: "Noah", pointsGivenAway: 651.8, drops: 15 },
  { manager: "lanny", pointsGivenAway: 528.1, drops: 17 },
  { manager: "Daniel", pointsGivenAway: 510.9, drops: 25 },
  { manager: "Ethan", pointsGivenAway: 484.9, drops: 21 },
  { manager: "Raymond", pointsGivenAway: 393.4, drops: 23 },
  { manager: "Zachary", pointsGivenAway: 253.4, drops: 20 },
  { manager: "Jonathan", pointsGivenAway: 237.7, drops: 11 },
  { manager: "Andrew", pointsGivenAway: 76.9, drops: 3 },
];
