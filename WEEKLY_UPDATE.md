# Weekly update checklist

Everything that changes on the site when an NFL week finishes. Do this after
Monday night's game is final (Tuesday morning is safest, after Yahoo's stat
corrections).

- **Week N** is the week that just finished.
- **Week N+1** is the week coming up.

All data comes from Yahoo (league 55635). Always use each manager's real name,
never their Yahoo team name.

## 1. Scores and lineups

| File | What to change |
| --- | --- |
| `src/content/matchups/week-N.json` | Final scores and every player's points. Set `"status": "final"` and update `note` and `updated`. |
| `src/content/matchups/week-(N+1).json` | **New file.** Next week's matchups, lineups, and Yahoo projections, with `"status": "upcoming"`. Records and ranks come from the new standings. |
| `src/content/matchups/index.ts` | Import week N+1 as the current week. |
| `src/content/weekly/week-N.json` | **New file.** Final lineups with each player's points, projection, and stat line. The Weekly Report tab and the personal recaps are built from this. |
| `src/content/weekly/index.ts` | Add week N to the front of the list. |
| `src/content/history/history.json` | Append week N's six games and update `updated`. Rivalries, Managers, and trading-card career stats all read this. |

## 2. Standings and the Playoff Picture

| File | What to change |
| --- | --- |
| `src/content/standings.ts` | Set `STANDINGS_THROUGH_WEEK = N`. Rebuild the standings rows (W-L, points for and against, streak), sorted by wins, then points for. |
| `src/content/standings.ts` (`bubbleNotes`) | Rewrite the playoff race notes: who's clinched, who's on the bubble, who's eliminated, and what each team needs. Use the scenario numbers (step 6). |
| `src/content/schedule.ts` | Remove week N from `REMAINING_SCHEDULE`. |

Playoff odds (`src/content/odds.ts`), the "What needs to happen" scenarios,
seeds, and the trading-card rarities all recompute from the standings and
schedule. Nothing to edit, but read the new numbers for the news (step 6).

## 3. Trades (`src/content/trades.ts`)

- Update `TRADES_UPDATED` and the "Last updated" comment.
- Add `N` to every trade's `weeksCounted`.
- Add week N's points to every traded player's `weeklyPointsSinceTrade`: `null` for a bye, `0` if he didn't play. Players who were dropped still count.
- Add a "Week N:" paragraph to each trade's `writeUp` with the new running totals, and refresh the `headline` if the story changed.
- "Record since trade" on the Trades tab updates on its own from history.

## 4. Waiver Wire (`src/content/waivers.ts`)

- Update `WAIVERS_UPDATED`, `CURRENT_WEEK`, and the "Last updated" comment.
- `weekPickups`: the top pickups of week N, by points for the team that added them.
- `seasonPickups`: the season leaderboard, adding week N's points.
- `managerWaiverRecords`: season pickup points, pickup counts, and FAAB spent for each manager.
- `waiverNotes`: refresh the callouts (leader, best week, best value, most active).
- `weekDrops`, `seasonDrops`, `managerDropRecords`: points scored by players after they were dropped, with where each one is now.
- Rules:
  - Re-adding your own draft pick isn't a pickup.
  - A player added and dropped within a few minutes doesn't count.
  - A player only counts for a week if he was on the roster at Sunday kickoff.

## 5. FAAB (`src/content/faab.ts`)

- Copy every manager's Waiver Budget from Yahoo's league Managers page into `FAAB_BALANCES`, and update `FAAB_UPDATED`.

## 6. News (`src/content/news.ts`)

Replace last week's articles. Keep the evergreen features at the bottom.

- **Week N recap** (`week-N-recap`): every game, the standings, and the playoff race. Set `recapWeek: N` so it links to the personal recaps.
- **Week N+1 preview** (`week-(N+1)-preview`): every matchup with Yahoo projections, bye-week problems, what's at stake, the series history, and top free agents.
- **Matchup of the Week** (`week-(N+1)-matchup-of-the-week`): the biggest game, with a pick.
- **Awards** (`week-N-awards`): top and lowest score, biggest blowout, closest game, luckiest win, unluckiest loss, player of the week, best player nobody had, and bench of the week.
- **Power Rankings** (`week-N-power-rankings`): ordered by all-play record, with playoff odds.
- **Waiver Wire** (`week-N-waiver-wire`): the best pickups and the drops that got away.
- Update the "Last updated" comment.

## 7. Personal recaps (`src/content/recaps.ts`)

- Set `RECAP_WEEK = N`. It needs `weekly/week-N.json` from step 1.
- Rewrite every manager's `headline`, `story`, and `mistakes` (the film room). Every manager needs at least one mistake.
- Isaiah keeps the default film room title.
- Managers who dismissed last week's recap get the new one on their next visit.

## 8. Roasts

Work these into the news, recaps, trades, waivers, and bubble notes. Keep them
harmless.

- **Isaiah:** under 200 lbs, "victim weight."
- **Ethan:** bald.
- **Chris:** no roasts. He's sensitive, so be overly nice and supportive instead (see his recap and trading card).
- **Matthew:** first time ever making the playoffs.
- **lanny:** buys Pokémon cards.
- **Nicholas:** uses AI for every decision.
- **Jonathan:** PPR merchant who wishes the league were PPR (it isn't).
- **Andrew:** never checks his lineup, never picks anyone up, too into cars.
- **Noah:** cares more about his dynasty team.
- **Daniel:** the worst team in league history.
- **Zachary:** he's a cop now.
- **Raymond:** a mild insult every time, plus the occasional "Fuck Ray."

Trading cards (`src/content/cards.ts`) only need edits when a running joke
changes. Stats, seeds, and rarity update on their own.

## 9. Tests that name the week

| File | What to change |
| --- | --- |
| `src/components/__tests__/Rivalries.test.tsx` | The "Week N+1's history" heading. |
| `e2e/site.spec.ts` | The deep-link test that opens `#news/week-(N+1)-preview`. |
