// Best waiver-wire and free-agent pickups, hand-updated each week.
//
// A pickup's points are the fantasy points the player scored while on the
// roster of the team that added him, counting each week he was on that roster
// at Sunday kickoff. Re-adding your own draft pick after dropping him doesn't
// count as a pickup.
//
// Last updated: Week 11 final, including Monday night (Nov 23, 2026).

export const WAIVERS_UPDATED = "Week 11 final · Mon Nov 23, 2026";
export const CURRENT_WEEK = 11;

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
  { player: "Chimere Dike", position: "WR · TEN", manager: "Ethan", added: "Nov 19", cost: 0, method: "Free agent", points: 13.88, weeksOnRoster: 1, blurb: "The top pickup of the week, a free agent who started in Ethan's win over Nicholas. Ethan picked up four players this week. If only hair were on waivers." },
  { player: "Samaje Perine", position: "RB · CIN", manager: "Jonathan", added: "Nov 18", cost: 6, method: "Waiver", points: 12.2, weeksOnRoster: 1, blurb: "Jonathan dropped the Colts for him and started him right away. 12.2 points, and Jonathan would like you to know his catches deserved extra credit." },
  { player: "Lions", position: "D/ST · DET", manager: "Matthew", added: "Nov 18", cost: 3, method: "Waiver", points: 8.5, weeksOnRoster: 1, blurb: "Jonathan dropped them a week ago. Matthew paid $3, started them against Jonathan, and won. First-timers get all the luck." },
  { player: "Kirk Cousins", position: "QB · MIN", manager: "Noah", added: "Nov 18", cost: 6, method: "Waiver", points: 8.4, weeksOnRoster: 1, blurb: "A $6 replacement for Drake Maye on bye. Cousins scored 8.4, and Noah lost by 5.66. That money could've gone toward a dynasty rookie." },
  { player: "Cameron Dicker", position: "K · LAC", manager: "Andrew", added: "Nov 18", cost: 0, method: "Waiver", points: 8.2, weeksOnRoster: 1, blurb: "Andrew made a waiver claim. Andrew. He replaced his bye-week kicker and won his first game since October. Someone check if his car is okay." },
  { player: "Chig Okonkwo", position: "TE · WAS", manager: "Andrew", added: "Nov 18", cost: 0, method: "Free agent", points: 8.1, weeksOnRoster: 1, blurb: "Andrew's second pickup in one day, a personal record. He started him over Harold Fannin Jr. (bye) and snapped a five-game losing streak." },
  { player: "Myles Price", position: "WR · MIN", manager: "Ethan", added: "Nov 18", cost: 4, method: "Waiver", points: 7.62, weeksOnRoster: 1, blurb: "A $4 fill-in for Jaxon Smith-Njigba on bye. Ethan won, and the shine is back." },
  { player: "Cairo Santos", position: "K · CHI", manager: "Matthew", added: "Nov 19", cost: 0, method: "Free agent", points: 7.6, weeksOnRoster: 1, blurb: "Isaiah dropped him last week. Matthew dropped Matt Gay to pick him up. It worked, because everything works for Matthew this year." },
  { player: "T.J. Hockenson", position: "TE · MIN", manager: "Daniel", added: "Nov 18", cost: 0, method: "Free agent", points: 7.5, weeksOnRoster: 1, blurb: "Daniel's third tight end in a few minutes on Wednesday (Kyle Pitts went out, Brenton Strange came and went). 7.5 points in a loss that ended his winning streak." },
  { player: "Josh Cameron", position: "WR · JAX", manager: "Ethan", added: "Nov 18", cost: 8, method: "Waiver", points: 7.0, weeksOnRoster: 1, blurb: "The biggest bid of the week, $8, after he scored 19.88 on waivers in Week 10. He scored 7.0 on Ethan's bench." },
];

export const seasonPickups: Pickup[] = [
  { player: "C.J. Stroud", position: "QB · HOU", manager: "Andrew", added: "Oct 8", cost: 0, method: "Free agent", points: 145.2, weeksOnRoster: 7, blurb: "Still No. 1, with 21.96 more in Week 11, finally in a win. Andrew has now made five pickups all season, and this is the one he'll tell the guys at the car meet about." },
  { player: "Emmett Johnson", position: "RB · KC", manager: "Matthew", added: "Aug 26", cost: 0, method: "Waiver", points: 124.42, weeksOnRoster: 11, blurb: "Up to No. 2 after 24.8 in Week 11. A $0 claim from August that's carrying Matthew to his first playoffs ever." },
  { player: "Bryce Young", position: "QB · CAR", manager: "lanny", added: "Sep 23", cost: 10, method: "Waiver", points: 122.12, weeksOnRoster: 9, blurb: "16.96 as a starter in Week 11, with Jordan Love on bye. A $10 bid that keeps paying, which is more than lanny's Pokémon card collection can say." },
  { player: "Will Reichard", position: "K · MIN", manager: "Zachary", added: "Aug 26", cost: 1, method: "Waiver", points: 109.0, weeksOnRoster: 11, blurb: "A $1 kicker on Zachary's roster all season, with just 1.8 in Week 11. Zachary won anyway and is letting him off with a warning." },
  { player: "Braelon Allen", position: "RB · NYJ", manager: "Isaiah", added: "Sep 30", cost: 41, method: "Waiver", points: 107.8, weeksOnRoster: 8, blurb: "11.9 on Isaiah's bench in Week 11 while Kyle Monangai started and scored 1.8. Braelon Allen outweighs Isaiah by a lot, and outscored his lineup choice by a lot too." },
  { player: "Travis Kelce", position: "TE · KC", manager: "lanny", added: "Aug 26", cost: 1, method: "Waiver", points: 103.7, weeksOnRoster: 11, blurb: "21.9 in Week 11, up three spots. Went undrafted and was claimed for a dollar. lanny could not be reached for comment; he was at a card show." },
  { player: "Vikings", position: "D/ST · MIN", manager: "Ethan", added: "Sep 23", cost: 1, method: "Waiver", points: 93.5, weeksOnRoster: 9, blurb: "-2 in Week 11, the first bad week from a $1 defense. Ethan won anyway, so his scalp stayed calm." },
  { player: "Tyler Shough", position: "QB · NO", manager: "Raymond", added: "Aug 28", cost: 0, method: "Free agent", points: 93.16, weeksOnRoster: 5, status: "Dropped Oct 14", blurb: "Four 16-plus-point games for a free agent before Ray, in his infinite wisdom, let him go. He's starting for Matthew now." },
  { player: "Isaiah Likely", position: "TE · NYG", manager: "Raymond", added: "Oct 4", cost: 0, method: "Free agent", points: 91.1, weeksOnRoster: 8, blurb: "Isaiah drafted him and dropped him. 4.0 for Ray in Week 11. Even Ray's good moves come from someone else's mistakes." },
  { player: "Jonah Coleman", position: "RB · NO", manager: "Noah", added: "Sep 23", cost: 23, method: "Waiver", points: 81.0, weeksOnRoster: 9, blurb: "New to the list after 34.9 in Week 11, the second-best game by any player this week. Noah lost by 5.66 anyway. Matthew dropped him in September, and Noah probably only claimed him for the dynasty value." },
  { player: "Spencer Shrader", position: "K · IND", manager: "Nicholas", added: "Sep 30", cost: 12, method: "Waiver", points: 76.1, weeksOnRoster: 8, blurb: "-0.6 in Week 11, a negative kicker. Nicholas scored 60.70 and is asking the AI how that's possible." },
  { player: "Woody Marks", position: "RB · HOU", manager: "Daniel", added: "Sep 16", cost: 65, method: "Waiver", points: 72.08, weeksOnRoster: 9, status: "Dropped Nov 18", blurb: "The biggest FAAB bid of the season, and now the biggest FAAB drop of the season. Daniel cut him for the Panthers D/ST. The worst team in league history, cleaning house." },
];

export const managerWaiverRecords: ManagerWaiverRecord[] = [
  { manager: "Noah", points: 545.6, pickups: 17, faabSpent: 90 },
  { manager: "lanny", points: 533.4, pickups: 20, faabSpent: 45 },
  { manager: "Matthew", points: 521.0, pickups: 32, faabSpent: 52 },
  { manager: "Isaiah", points: 497.3, pickups: 33, faabSpent: 100 },
  { manager: "Ethan", points: 440.1, pickups: 27, faabSpent: 91 },
  { manager: "Nicholas", points: 437.1, pickups: 49, faabSpent: 97 },
  { manager: "Chris", points: 408.7, pickups: 41, faabSpent: 95 },
  { manager: "Raymond", points: 408.6, pickups: 24, faabSpent: 38 },
  { manager: "Zachary", points: 370.5, pickups: 22, faabSpent: 47 },
  { manager: "Daniel", points: 359.6, pickups: 29, faabSpent: 100 },
  { manager: "Jonathan", points: 252.8, pickups: 17, faabSpent: 59 },
  { manager: "Andrew", points: 229.0, pickups: 5, faabSpent: 5 },
];

export const waiverNotes: { title: string; body: string }[] = [
  { title: "Still on top", body: "Noah leads with 545.6 points from the wire, helped by Jonah Coleman's 34.9 in Week 11. Impressive for a guy whose real attention is on his dynasty league. lanny (533.4) jumped to second, and Matthew (521.0) is third." },
  { title: "Best week", body: "lanny got 84.9 points from pickups in Week 11, the most in the league, led by Travis Kelce's 21.9 and the Broncos' 17. Noah (78.1) and Matthew (61.8) were next. Nicholas got 9.6, which is what happens when your kicker and defense both go negative." },
  { title: "Best value", body: "lanny has 533.4 points from the wire for $45 of FAAB, under a dime a point, cheaper than a single Pokémon booster pack per point." },
  { title: "Most active", body: "Nicholas has made 49 pickups, five more this week, including adding Mark Andrews twice. His AI never sleeps, and apparently never remembers. Andrew made two pickups this week, bringing him to five for the season. Someone check on him." },
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
  { player: "Aaron Rodgers", position: "QB · PIT", manager: "Ethan", dropped: "Nov 17", pointsAfter: 17.48, weeksAfter: 1, whereNow: "On waivers", blurb: "Ethan picked him up for one week, dropped him, and watched him score 17.48. Bo Nix scored 12.5 in his place. Ethan won anyway, so we'll go easy on the bald guy." },
  { player: "49ers", position: "D/ST · SF", manager: "Nicholas", dropped: "Nov 18", pointsAfter: 16.0, weeksAfter: 1, whereNow: "On waivers", blurb: "Dropped for Mark Andrews. The 49ers scored 16; Nicholas's Buccaneers scored -2.5 and Andrews 1.4. The AI has been notified." },
  { player: "Devaughn Vele", position: "WR · NO", manager: "Ethan", dropped: "Nov 19", pointsAfter: 10.1, weeksAfter: 1, whereNow: "On waivers", blurb: "Cut for Chimere Dike, who scored 13.88. One of the rare drops that worked." },
  { player: "Giants", position: "D/ST · NYG", manager: "Raymond", dropped: "Nov 18", pointsAfter: 10.0, weeksAfter: 1, whereNow: "On waivers", blurb: "Ray dropped them for the Bengals, who scored 0.5 on his bench. The Bears started and scored 19.5, so Ray won anyway, which is exhausting." },
  { player: "Saints", position: "D/ST · NO", manager: "Zachary", dropped: "Nov 17", pointsAfter: 7.5, weeksAfter: 1, whereNow: "On waivers", blurb: "Released without charges. The Steelers scored 8.5 in their place, so Officer Zachary's call held up in court." },
  { player: "Matt Gay", position: "K · LV", manager: "Matthew", dropped: "Nov 19", pointsAfter: 5.8, weeksAfter: 1, whereNow: "On waivers", blurb: "Swapped for Cairo Santos, who scored 7.6. Matthew can't miss this year." },
];

export const seasonDrops: Drop[] = [
  { player: "Jordan Love", position: "QB · GB", manager: "Noah", dropped: "Oct 3", pointsAfter: 150.56, weeksAfter: 8, whereNow: "Now on lanny's roster", blurb: "Noah cut him for Emanuel Wilson, a move he'd never make in dynasty. Green Bay was on bye in Week 11, so the total holds. Still No. 1, since the day this list started." },
  { player: "Bo Nix", position: "QB · DEN", manager: "Nicholas", dropped: "Sep 16", pointsAfter: 146.46, weeksAfter: 10, whereNow: "Now on Ethan's roster", blurb: "12.5 for Ethan in a win over Nicholas, the team that dropped him. The AI said drop him; the AI did not account for revenge." },
  { player: "Spencer Shrader", position: "K · IND", manager: "Noah", dropped: "Sep 19", pointsAfter: 111.7, weeksAfter: 10, whereNow: "Now on Nicholas's roster", blurb: "-0.6 for Nicholas in Week 11. Even Noah's mistakes are underperforming, which he didn't notice because he was setting his dynasty lineup." },
  { player: "Vikings", position: "D/ST · MIN", manager: "Nicholas", dropped: "Sep 16", pointsAfter: 110.5, weeksAfter: 10, whereNow: "Now on Ethan's roster", blurb: "-2 for Ethan in Week 11, the first time this pickup hurt him. Nicholas's AI still won't admit it was wrong." },
  { player: "Sam Darnold", position: "QB · SEA", manager: "Daniel", dropped: "Sep 22", pointsAfter: 103.3, weeksAfter: 9, whereNow: "Not on a roster", blurb: "Seattle was on bye in Week 11. Daniel's own 12th-round pick, cut on a Tuesday. A foundational moment for the worst team in league history." },
  { player: "Buccaneers", position: "D/ST · TB", manager: "Chris", dropped: "Sep 22", pointsAfter: 96.5, weeksAfter: 9, whereNow: "Now on Nicholas's roster", blurb: "-2.5 for Nicholas in Week 11. Chris generously shared them with the rest of the league back in September, and he's been sharing ever since. Such a giver." },
  { player: "Jonah Coleman", position: "RB · NO", manager: "Matthew", dropped: "Sep 16", pointsAfter: 94.3, weeksAfter: 10, whereNow: "Now on Noah's roster", blurb: "New to the list after 34.9 in Week 11. Matthew cut him in September. He doesn't mind; he's 10-1 and would like to know when the playoffs start." },
  { player: "Drew Stevens", position: "K · WAS", manager: "Noah", dropped: "Sep 1", pointsAfter: 92.5, weeksAfter: 11, whereNow: "On waivers", blurb: "New to the list after 17.8 on waivers in Week 11. Noah cut him before Week 1, and he's still sitting on waivers. Noah is too busy with dynasty kickers, if those exist." },
  { player: "Isaiah Likely", position: "TE · NYG", manager: "Isaiah", dropped: "Sep 30", pointsAfter: 91.1, weeksAfter: 8, whereNow: "Now on Raymond's roster", blurb: "4.0 for Ray in Week 11. Isaiah drafted him and cut him. Weak hands to match the weak frame." },
  { player: "Tre Tucker", position: "WR · LV", manager: "Nicholas", dropped: "Sep 16", pointsAfter: 91.0, weeksAfter: 10, whereNow: "On waivers", blurb: "6.0 more on waivers in Week 11. Nicholas cut him in September, which he'll blame on the model." },
];

export const managerDropRecords: ManagerDropRecord[] = [
  { manager: "Nicholas", pointsGivenAway: 1788.3, drops: 49 },
  { manager: "Isaiah", pointsGivenAway: 1167.0, drops: 32 },
  { manager: "Chris", pointsGivenAway: 1091.2, drops: 40 },
  { manager: "Matthew", pointsGivenAway: 859.1, drops: 33 },
  { manager: "Noah", pointsGivenAway: 797.4, drops: 17 },
  { manager: "Ethan", pointsGivenAway: 748.9, drops: 28 },
  { manager: "lanny", pointsGivenAway: 717.9, drops: 21 },
  { manager: "Daniel", pointsGivenAway: 685.3, drops: 28 },
  { manager: "Raymond", pointsGivenAway: 600.5, drops: 26 },
  { manager: "Jonathan", pointsGivenAway: 396.4, drops: 17 },
  { manager: "Zachary", pointsGivenAway: 367.7, drops: 22 },
  { manager: "Andrew", pointsGivenAway: 131.2, drops: 5 },
];
