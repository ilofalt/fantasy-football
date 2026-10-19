// Best waiver-wire and free-agent pickups, hand-updated each week.
//
// A pickup's points are the fantasy points the player scored while on the
// roster of the team that added him, counting each week he was on that roster
// at Sunday kickoff. Re-adding your own draft pick after dropping him doesn't
// count as a pickup.
//
// Last updated: Sunday night, Week 6 (Oct 18, 2026). Monday night's game
// hadn't been played yet.

export const WAIVERS_UPDATED = "Week 6 · Sun Oct 18, 2026";
export const CURRENT_WEEK = 6;

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
  { player: "Tre Tucker", position: "WR · LV", manager: "lanny", added: "Oct 14", cost: 0, method: "Free agent", points: 23.7, weeksOnRoster: 1, blurb: "Free on Wednesday, and the top-scoring pickup of the week." },
  { player: "Michael Penix Jr.", position: "QB · ATL", manager: "Matthew", added: "Oct 15", cost: 0, method: "Free agent", points: 23.1, weeksOnRoster: 1, blurb: "A Thursday add who's helping Matthew to a likely 5-1 start." },
  { player: "Jaylin Noel", position: "WR · HOU", manager: "Raymond", added: "Oct 14", cost: 5, method: "Waiver", points: 21.38, weeksOnRoster: 1, blurb: "Five dollars well spent in the same week as Ray's blockbuster trade." },
  { player: "Chiefs", position: "D/ST · KC", manager: "Jonathan", added: "Oct 14", cost: 15, method: "Waiver", points: 20.0, weeksOnRoster: 1, blurb: "A $15 bid on a defense looks steep, until it scores 20 against the Chargers." },
  { player: "Tyler Bass", position: "K · BUF", manager: "lanny", added: "Oct 14", cost: 0, method: "Waiver", points: 18.7, weeksOnRoster: 1, blurb: "lanny's second top-five pickup of the week." },
  { player: "Chris Boswell", position: "K · PIT", manager: "Isaiah", added: "Oct 16", cost: 0, method: "Free agent", points: 17.9, weeksOnRoster: 1, blurb: "Picked up Friday, and a big part of the week's top score." },
  { player: "Germie Bernard", position: "WR · PIT", manager: "Nicholas", added: "Oct 14", cost: 1, method: "Waiver", points: 17.2, weeksOnRoster: 1, blurb: "A $1 claim on a rookie WR who delivered right away." },
  { player: "Aaron Rodgers", position: "QB · PIT", manager: "Ethan", added: "Oct 16", cost: 0, method: "Free agent", points: 17.02, weeksOnRoster: 1, blurb: "A bye-week fill-in. Even Ethan's backups are producing." },
  { player: "Dameon Pierce", position: "RB · PHI", manager: "Daniel", added: "Oct 18", cost: 26, method: "Waiver", points: 13.5, weeksOnRoster: 1, blurb: "Daniel's $26 bid paid off, even if the result didn't. Isaiah had picked him up earlier in the week." },
  { player: "Tyler Huntley", position: "QB · BAL", manager: "Matthew", added: "Oct 16", cost: 0, method: "Free agent", points: 13.4, weeksOnRoster: 1, blurb: "Matthew's second QB add of the week." },
];

export const seasonPickups: Pickup[] = [
  { player: "Tyler Shough", position: "QB · NO", manager: "Raymond", added: "Aug 28", cost: 0, method: "Free agent", points: 93.16, weeksOnRoster: 5, status: "Dropped Oct 14", blurb: "The best pickup of the season: four 16-plus-point games for a free agent. Ray dropped him after a 1.8-point Week 5, and Shough scored 28.46 in Week 6 while sitting on waivers." },
  { player: "Will Reichard", position: "K · MIN", manager: "Zachary", added: "Aug 26", cost: 1, method: "Waiver", points: 74.3, weeksOnRoster: 6, blurb: "A $1 kicker who's been on Zachary's roster all season, with three straight games of 16 or more." },
  { player: "Bryce Young", position: "QB · CAR", manager: "lanny", added: "Sep 23", cost: 10, method: "Waiver", points: 56.44, weeksOnRoster: 4, blurb: "Three games of 14 to 22 points for a $10 bid." },
  { player: "Evan McPherson", position: "K · CIN", manager: "Isaiah", added: "Sep 8", cost: 0, method: "Free agent", points: 55.6, weeksOnRoster: 5, status: "Dropped Oct 13", blurb: "Started hot with 19.5 in Week 1, then faded before Isaiah moved on." },
  { player: "Isaiah Likely", position: "TE · NYG", manager: "Raymond", added: "Oct 4", cost: 0, method: "Free agent", points: 52.9, weeksOnRoster: 3, blurb: "Isaiah drafted him, dropped him, and watched Ray get 44.8 points from him in the last two weeks." },
  { player: "Rashid Shaheed", position: "WR · SEA", manager: "Daniel", added: "Sep 8", cost: 0, method: "Free agent", points: 51.26, weeksOnRoster: 6, blurb: "One of the few things that's gone right for Daniel this year." },
  { player: "Vikings", position: "D/ST · MIN", manager: "Ethan", added: "Sep 23", cost: 1, method: "Waiver", points: 49.5, weeksOnRoster: 4, blurb: "A 28-point debut for $1." },
  { player: "Travis Kelce", position: "TE · KC", manager: "lanny", added: "Aug 26", cost: 1, method: "Waiver", points: 49.4, weeksOnRoster: 6, blurb: "Went undrafted and was claimed for a dollar. Still a starting TE." },
  { player: "Spencer Shrader", position: "K · IND", manager: "Nicholas", added: "Sep 30", cost: 12, method: "Waiver", points: 47.7, weeksOnRoster: 3, blurb: "38.7 points in his first two weeks for Nicholas." },
  { player: "Emanuel Wilson", position: "RB · SEA", manager: "Noah", added: "Oct 3", cost: 0, method: "Free agent", points: 47.4, weeksOnRoster: 3, blurb: "A free-agent RB who opened with 26.5 points." },
  { player: "C.J. Stroud", position: "QB · HOU", manager: "Andrew", added: "Oct 8", cost: 0, method: "Free agent", points: 46.42, weeksOnRoster: 2, blurb: "The best per-game pickup of the season: 23.2 points a week. One of only two adds Andrew has made all year." },
  { player: "Woody Marks", position: "RB · HOU", manager: "Daniel", added: "Sep 16", cost: 65, method: "Waiver", points: 46.08, weeksOnRoster: 5, blurb: "The biggest FAAB bid of the season. Steady, at about 9 points a week, but not $65 steady." },
];

export const managerWaiverRecords: ManagerWaiverRecord[] = [
  { manager: "Nicholas", points: 251.8, pickups: 36, faabSpent: 96 },
  { manager: "Noah", points: 250.8, pickups: 12, faabSpent: 71 },
  { manager: "lanny", points: 235.2, pickups: 13, faabSpent: 30 },
  { manager: "Isaiah", points: 228.3, pickups: 18, faabSpent: 100 },
  { manager: "Raymond", points: 217.8, pickups: 15, faabSpent: 13 },
  { manager: "Matthew", points: 194.6, pickups: 19, faabSpent: 35 },
  { manager: "Zachary", points: 188.5, pickups: 12, faabSpent: 46 },
  { manager: "Chris", points: 159.9, pickups: 26, faabSpent: 85 },
  { manager: "Ethan", points: 149.7, pickups: 12, faabSpent: 52 },
  { manager: "Daniel", points: 128.6, pickups: 15, faabSpent: 91 },
  { manager: "Jonathan", points: 114.5, pickups: 6, faabSpent: 23 },
  { manager: "Andrew", points: 79.6, pickups: 2, faabSpent: 0 },
];

export const waiverNotes: { title: string; body: string }[] = [
  { title: "Best value", body: "Raymond has gotten 217.8 points from the wire while spending just $13 of FAAB, about $0.06 a point." },
  { title: "Most active", body: "Nicholas has made 36 pickups, more than anyone else. Volume has paid off: he leads the league in points from pickups." },
  { title: "Most efficient", body: "Noah is a close second in points (250.8) with a third as many moves (12)." },
  { title: "Biggest misses", body: "Isaiah bid $51 on Jaylen Wright and dropped him after two weeks and 8.3 points. Nicholas bid $26 on Ollie Gordon II and traded him to Ray before he scored a point; Gordon has 35.3 for Ray since." },
  { title: "Doesn't count", body: "Re-adding your own draft pick isn't a pickup. Brock Purdy would top the season list for Nicholas, but Nicholas drafted him." },
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
  { player: "Tyler Shough", position: "QB · NO", manager: "Daniel", dropped: "Oct 18", pointsAfter: 28.46, weeksAfter: 1, whereNow: "On waivers", blurb: "Daniel picked him up Saturday and dropped him at 8:19 Sunday morning, a few hours before kickoff. Shough scored 28.46. Ray had also dropped him on Wednesday." },
  { player: "Keon Coleman", position: "WR · BUF", manager: "Raymond", dropped: "Oct 14", pointsAfter: 13.9, weeksAfter: 1, whereNow: "On waivers", blurb: "Cut in the shuffle around Ray's big trade." },
  { player: "Dameon Pierce", position: "RB · PHI", manager: "Isaiah", dropped: "Oct 15", pointsAfter: 13.5, weeksAfter: 1, whereNow: "Now on Daniel's roster", blurb: "Chris dropped him Wednesday, Isaiah grabbed him and let him go a day later, and Daniel paid $26 for the 13.5 points." },
  { player: "Broncos", position: "D/ST · DEN", manager: "Noah", dropped: "Oct 17", pointsAfter: 11.5, weeksAfter: 1, whereNow: "On waivers", blurb: "Dropped Saturday, then scored 11.5 on Sunday." },
  { player: "Khalil Shakir", position: "WR · BUF", manager: "Chris", dropped: "Oct 14", pointsAfter: 10.4, weeksAfter: 1, whereNow: "On waivers", blurb: "A WR dropped by the team that needs WRs most." },
  { player: "Deshaun Watson", position: "QB · CLE", manager: "Ethan", dropped: "Oct 16", pointsAfter: 9.96, weeksAfter: 1, whereNow: "On waivers", blurb: "Ethan picked up Aaron Rodgers the same day, and Rodgers outscored him with 17.02." },
];

export const seasonDrops: Drop[] = [
  { player: "Jordan Love", position: "QB · GB", manager: "lanny", dropped: "Aug 26", pointsAfter: 93.12, weeksAfter: 5, whereNow: "Back on lanny's roster", blurb: "lanny cut his own 14th-round pick before Week 1 to claim Travis Kelce. Love scored 93 points over the next five weeks while Noah and Nicholas also picked him up and dropped him. lanny finally re-claimed him on Oct 14." },
  { player: "Spencer Shrader", position: "K · IND", manager: "Noah", dropped: "Sep 19", pointsAfter: 83.3, weeksAfter: 5, whereNow: "Now on Nicholas's roster", blurb: "Has scored at least 15 points in four of five weeks since Noah let him go." },
  { player: "Bo Nix", position: "QB · DEN", manager: "Nicholas", dropped: "Sep 16", pointsAfter: 69.22, weeksAfter: 5, whereNow: "On waivers", blurb: "Nicholas dropped his own 12th-round pick, and Nix scored 16 and 26 in his next two games. Isaiah claimed him and dropped him too." },
  { player: "Sam Darnold", position: "QB · SEA", manager: "Daniel", dropped: "Sep 22", pointsAfter: 68.8, weeksAfter: 4, whereNow: "On waivers", blurb: "Daniel cut him on a Tuesday, and Darnold scored 30.16 that Sunday for Isaiah." },
  { player: "Vikings", position: "D/ST · MIN", manager: "Nicholas", dropped: "Sep 16", pointsAfter: 66.5, weeksAfter: 5, whereNow: "Now on Ethan's roster", blurb: "Ethan claimed them for $1 and got a 28-point game in his first week." },
  { player: "Denzel Boston", position: "WR · CLE", manager: "Matthew", dropped: "Aug 26", pointsAfter: 61.52, weeksAfter: 6, whereNow: "Now on Andrew's roster", blurb: "Matthew's 12th-round pick, cut before Week 1. Chris picked him up, then traded him to Andrew." },
  { player: "Tre Tucker", position: "WR · LV", manager: "Nicholas", dropped: "Sep 16", pointsAfter: 58.8, weeksAfter: 5, whereNow: "Now on lanny's roster", blurb: "Scored 19.9 days after Nicholas cut him, and 23.7 for lanny this week." },
  { player: "Woody Marks", position: "RB · HOU", manager: "Isaiah", dropped: "Sep 8", pointsAfter: 55.2, weeksAfter: 6, whereNow: "Now on Daniel's roster", blurb: "Isaiah's 13th-round pick, dropped before Week 1. Daniel paid $65 for him a week later." },
  { player: "Isaiah Likely", position: "TE · NYG", manager: "Isaiah", dropped: "Sep 30", pointsAfter: 52.9, weeksAfter: 3, whereNow: "Now on Raymond's roster", blurb: "Another Isaiah draft pick. 44.8 points for Ray in the last two weeks." },
  { player: "Emanuel Wilson", position: "RB · SEA", manager: "Nicholas", dropped: "Sep 30", pointsAfter: 47.4, weeksAfter: 3, whereNow: "Now on Noah's roster", blurb: "Scored 26.5 days after Nicholas dropped him." },
];

export const managerDropRecords: ManagerDropRecord[] = [
  { manager: "Nicholas", pointsGivenAway: 801.7, drops: 36 },
  { manager: "Isaiah", pointsGivenAway: 444.4, drops: 17 },
  { manager: "Noah", pointsGivenAway: 349.2, drops: 11 },
  { manager: "Chris", pointsGivenAway: 313.4, drops: 21 },
  { manager: "Matthew", pointsGivenAway: 253.7, drops: 19 },
  { manager: "lanny", pointsGivenAway: 213.2, drops: 14 },
  { manager: "Ethan", pointsGivenAway: 194.6, drops: 12 },
  { manager: "Raymond", pointsGivenAway: 179.3, drops: 16 },
  { manager: "Daniel", pointsGivenAway: 157.5, drops: 14 },
  { manager: "Jonathan", pointsGivenAway: 118.1, drops: 6 },
  { manager: "Zachary", pointsGivenAway: 71.5, drops: 11 },
  { manager: "Andrew", pointsGivenAway: 24.7, drops: 2 },
];
