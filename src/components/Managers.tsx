"use client";

import { useEffect, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import { history } from "@/content/history";
import { oddsFor } from "@/content/odds";
import { standings, STANDINGS_THROUGH_WEEK } from "@/content/standings";
import {
  allManagers,
  bestAndWorstWeek,
  currentStreak,
  longestStreak,
  managerGames,
  nemesisAndVictim,
  opponents,
  recordText,
  seasonLines,
  slug,
  tally,
  winPct,
  type ManagerGame,
} from "@/lib/history/stats";
import { pct } from "@/lib/playoffs/odds";
import { seedTeams } from "@/lib/playoffs/seed";
import { parseHash, permalinkHash } from "@/lib/permalink";
import { ordinal } from "./MatchupDetail";
import ManagerAvatar from "./ManagerAvatar";
import Permalink from "./Permalink";

const { current, former } = allManagers(history);
const everyone = [...current, ...former];
const SEASON = Math.max(...history.games.map((g) => g.year));
const seeded = seedTeams(standings);

export function managerFromSlug(s: string | null): string | null {
  return (s && everyone.find((n) => slug(n) === s)) || null;
}

function summary(name: string) {
  const regular = tally(managerGames(history, name, ["regular"]));
  const seasons = seasonLines(history, name);
  return {
    regular,
    ppg: regular.games ? regular.pf / regular.games : 0,
    seasons,
    titles: seasons.filter((s) => s.champion).map((s) => s.year),
    lastPlaces: seasons.filter((s) => s.lastPlace).map((s) => s.year),
    playoffTrips: seasons.filter((s) => s.madePlayoffs).length,
    finished: seasons.filter((s) => s.finish !== null).length,
    postseason: tally(managerGames(history, name, ["playoff"])),
  };
}

const pctText = (p: number) => p.toFixed(3).replace(/^0/, "");
const gameLine = (g: ManagerGame) => `${g.pf.toFixed(2)} vs. ${g.opponent} (${g.pa.toFixed(2)}), ${g.year} Week ${g.week}`;

function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <Box sx={{ border: 1, borderColor: "divider", borderRadius: 2, p: 1.5, minWidth: 0 }}>
      <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, display: "block" }}>
        {label}
      </Typography>
      <Typography variant="h6" component="p" sx={{ fontWeight: 800, fontVariantNumeric: "tabular-nums", lineHeight: 1.3 }}>
        {value}
      </Typography>
      {sub && (
        <Typography variant="caption" color="text.secondary">
          {sub}
        </Typography>
      )}
    </Box>
  );
}

function Trophies({ titles, lastPlaces }: { titles: number[]; lastPlaces: number[] }) {
  return (
    <Stack direction="row" spacing={0.75} useFlexGap sx={{ flexWrap: "wrap" }}>
      {titles.map((y) => (
        <Chip key={y} size="small" color="warning" icon={<EmojiEventsIcon />} label={`${y} title`} />
      ))}
      {lastPlaces.map((y) => (
        <Chip key={y} size="small" variant="outlined" icon={<ArrowDownwardIcon />} label={`${y} last`} />
      ))}
    </Stack>
  );
}

function ManagerCard({ name, onOpen }: { name: string; onOpen: () => void }) {
  const s = summary(name);
  const isCurrent = current.includes(name);
  const now = isCurrent ? s.seasons.find((x) => x.year === SEASON) : null;
  const odds = isCurrent ? oddsFor(name) : null;
  return (
    <Card variant="outlined" sx={{ height: "100%" }}>
      <CardActionArea onClick={onOpen} aria-label={`Open ${name}'s page`} sx={{ p: 2, height: "100%", display: "block" }}>
        <Stack direction="row" spacing={1.5} sx={{ alignItems: "center", mb: 1.5 }}>
          <ManagerAvatar name={name} size={56} />
          <Box sx={{ minWidth: 0 }}>
            <Typography variant="h6" component="h3" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
              {name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {recordText(s.regular)} career · {s.seasons.length} season{s.seasons.length === 1 ? "" : "s"}
            </Typography>
          </Box>
        </Stack>
        {now && (
          <Typography variant="body2" sx={{ mb: 1 }}>
            {SEASON}: <strong>{recordText(now.record)}</strong>
            {odds && <> · {pct(odds.playoffs)} playoff odds</>}
          </Typography>
        )}
        <Trophies titles={s.titles} lastPlaces={s.lastPlaces} />
      </CardActionArea>
    </Card>
  );
}

function Profile({ name, onBack }: { name: string; onBack: () => void }) {
  const s = useMemo(() => summary(name), [name]);
  const games = useMemo(() => managerGames(history, name), [name]);
  const opps = useMemo(() => opponents(history, name), [name]);
  const { nemesis, victim } = useMemo(() => nemesisAndVictim(history, name), [name]);
  const { best, worst } = useMemo(() => bestAndWorstWeek(history, name), [name]);
  const isCurrent = current.includes(name);
  const odds = isCurrent ? oddsFor(name) : null;
  const seed = seeded.find((t) => t.manager === name);
  const regularGames = games.filter((g) => g.type === "regular");

  return (
    <Stack spacing={3} id={slug(name)}>
      <Box>
        <Button startIcon={<ArrowBackIcon />} onClick={onBack} size="small" sx={{ mb: 2 }}>
          All managers
        </Button>
        <Stack direction="row" spacing={2.5} sx={{ alignItems: "center" }}>
          <ManagerAvatar name={name} size={96} />
          <Box sx={{ minWidth: 0, flex: 1 }}>
            <Stack direction="row" sx={{ alignItems: "center" }}>
              <Typography variant="h4" component="h2" sx={{ fontWeight: 800 }}>
                {name}
              </Typography>
              <Permalink tab="managers" anchor={slug(name)} label={`${name}'s page`} />
            </Stack>
            <Typography color="text.secondary" sx={{ mb: 1 }}>
              {isCurrent ? "Manager" : "Former manager"} · {s.seasons[0].year}
              {s.seasons.length > 1 ? `–${s.seasons[s.seasons.length - 1].year}` : ""}
            </Typography>
            <Trophies titles={s.titles} lastPlaces={s.lastPlaces} />
          </Box>
        </Stack>
      </Box>

      <Box sx={{ display: "grid", gap: 1.5, gridTemplateColumns: { xs: "1fr 1fr", sm: "repeat(4, 1fr)" } }}>
        <Stat label="Career record" value={recordText(s.regular)} sub={`${pctText(winPct(s.regular))} regular season`} />
        <Stat label="Points per game" value={s.ppg.toFixed(1)} sub={`${s.regular.pf.toFixed(0)} total`} />
        <Stat label="Playoff trips" value={`${s.playoffTrips} of ${s.finished}`} sub={s.postseason.games ? `${recordText(s.postseason)} in the playoffs` : "completed seasons"} />
        <Stat label="Titles" value={String(s.titles.length)} sub={s.titles.length ? s.titles.join(", ") : "Still chasing"} />
      </Box>

      {isCurrent && odds && seed && (
        <Card variant="outlined" id={`${slug(name)}-outlook`} sx={{ p: { xs: 2, md: 3 } }}>
          <Typography variant="h6" component="h3" sx={{ fontWeight: 700, mb: 0.5 }}>
            {SEASON} outlook
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {seed.ties ? `${seed.wins}-${seed.losses}-${seed.ties}` : `${seed.wins}-${seed.losses}`} through Week {STANDINGS_THROUGH_WEEK}, {ordinal(seed.seed)}{" "}
            seed today. Odds from 10,000 simulations of the rest of the season.
          </Typography>
          <Box sx={{ display: "grid", gap: 1.5, gridTemplateColumns: { xs: "1fr 1fr", sm: "repeat(4, 1fr)" } }}>
            <Stat label="Make playoffs" value={pct(odds.playoffs)} />
            <Stat label="First-round bye" value={pct(odds.bye)} />
            <Stat label="Win the title" value={pct(odds.title)} />
            <Stat label="Projected wins" value={odds.avgWins.toFixed(1)} sub={`${pct(odds.lastPlace)} chance of last`} />
          </Box>
        </Card>
      )}

      <Card variant="outlined" sx={{ p: { xs: 2, md: 3 } }}>
        <Typography variant="h6" component="h3" sx={{ fontWeight: 700, mb: 1.5 }}>
          Season by season
        </Typography>
        <Box
          component="table"
          aria-label={`${name}'s seasons`}
          sx={{
            width: "100%",
            borderCollapse: "collapse",
            fontVariantNumeric: "tabular-nums",
            "& th, & td": { py: 1, px: 1, borderBottom: 1, borderColor: "divider", textAlign: "right", whiteSpace: "nowrap" },
            "& th": { fontSize: "0.8125rem", fontWeight: 600, color: "text.secondary" },
            "& th:first-of-type, & td:first-of-type": { textAlign: "left" },
            "& th:last-of-type, & td:last-of-type": { textAlign: "left", width: "100%" },
          }}
        >
          <thead>
            <tr>
              <th scope="col">Year</th>
              <th scope="col">W-L</th>
              <th scope="col">PF</th>
              <th scope="col">Finish</th>
            </tr>
          </thead>
          <tbody>
            {[...s.seasons].reverse().map((y) => (
              <tr key={y.year}>
                <td>{y.year}</td>
                <td>{recordText(y.record)}</td>
                <td>{y.record.pf.toFixed(0)}</td>
                <td>
                  {y.finish === null ? "In progress" : `${ordinal(y.finish)} of ${y.teams}`}
                  {y.champion && <EmojiEventsIcon aria-label="Champion" fontSize="small" sx={{ color: "warning.main", verticalAlign: "text-bottom", ml: 0.5 }} />}
                  {y.lastPlace && <Typography component="span" variant="caption" color="text.secondary" sx={{ ml: 0.75 }}>last place</Typography>}
                </td>
              </tr>
            ))}
          </tbody>
        </Box>
      </Card>

      <Box sx={{ display: "grid", gap: 1.5, gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" } }}>
        <Stat label="Nemesis" value={nemesis ? nemesis.opponent : "None yet"} sub={nemesis ? `${recordText(nemesis.record)} against them` : "No losing record vs. anyone (3+ games)"} />
        <Stat label="Favorite victim" value={victim ? victim.opponent : "None yet"} sub={victim ? `${recordText(victim.record)} against them` : "No winning record vs. anyone (3+ games)"} />
        <Stat label="Best week" value={best ? best.pf.toFixed(2) : "—"} sub={best ? gameLine(best) : undefined} />
        <Stat label="Worst week" value={worst ? worst.pf.toFixed(2) : "—"} sub={worst ? gameLine(worst) : undefined} />
        <Stat label="Longest win streak" value={String(longestStreak(regularGames, "W"))} sub="regular season" />
        <Stat
          label="Longest losing streak"
          value={String(longestStreak(regularGames, "L"))}
          sub={`Current streak: ${currentStreak(regularGames) ?? "—"}`}
        />
      </Box>

      <Card variant="outlined" sx={{ p: { xs: 2, md: 3 } }}>
        <Typography variant="h6" component="h3" sx={{ fontWeight: 700, mb: 0.5 }}>
          Head to head
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
          Every opponent, all games. Tap one for the full rivalry.
        </Typography>
        <Stack divider={<Box sx={{ borderBottom: 1, borderColor: "divider" }} />}>
          {[...opps]
            .sort((x, y) => y.pct - x.pct || y.record.games - x.record.games)
            .map((o) => (
              <Button
                key={o.opponent}
                href={permalinkHash("rivalries", `${slug(name)}-vs-${slug(o.opponent)}`)}
                color="inherit"
                sx={{ justifyContent: "flex-start", textTransform: "none", py: 1, gap: 1.5 }}
              >
                <ManagerAvatar name={o.opponent} size={28} />
                <Typography sx={{ flex: 1, textAlign: "left", fontWeight: 600 }}>{o.opponent}</Typography>
                <Typography
                  sx={{
                    fontVariantNumeric: "tabular-nums",
                    fontWeight: 700,
                    color: o.pct > 0.5 ? "success.main" : o.pct < 0.5 ? "error.main" : "text.secondary",
                  }}
                >
                  {recordText(o.record)}
                </Typography>
              </Button>
            ))}
        </Stack>
      </Card>
    </Stack>
  );
}

export default function Managers() {
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    const sync = () => {
      const { tab, anchor } = parseHash(window.location.hash);
      if (tab === "managers") setSelected(managerFromSlug(anchor));
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  function open(name: string | null) {
    setSelected(name);
    window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}${permalinkHash("managers", name ? slug(name) : undefined)}`);
    window.scrollTo?.({ top: 0, behavior: "smooth" });
  }

  const ranked = [...current].sort((a, b) => winPct(tally(managerGames(history, b, ["regular"]))) - winPct(tally(managerGames(history, a, ["regular"]))));

  return (
    <Box component="section" id="managers" sx={{ pb: { xs: 8, md: 12 } }}>
      <Container maxWidth="md">
        {selected ? (
          <Profile name={selected} onBack={() => open(null)} />
        ) : (
          <>
            <Typography variant="h5" component="h2" sx={{ fontWeight: 700, mb: 1 }}>
              Managers
            </Typography>
            <Typography color="text.secondary" sx={{ mb: 3 }}>
              Everyone who&apos;s played in the league since 2022, ranked by career regular-season win percentage. Tap a
              manager for their full history.
            </Typography>
            <Box sx={{ display: "grid", gap: 2, gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" } }}>
              {ranked.map((m) => (
                <ManagerCard key={m} name={m} onOpen={() => open(m)} />
              ))}
            </Box>
            {former.length > 0 && (
              <>
                <Typography variant="h6" component="h3" sx={{ fontWeight: 700, mt: 5, mb: 2 }}>
                  Former managers
                </Typography>
                <Box sx={{ display: "grid", gap: 2, gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" } }}>
                  {former.map((m) => (
                    <ManagerCard key={m} name={m} onOpen={() => open(m)} />
                  ))}
                </Box>
              </>
            )}
          </>
        )}
      </Container>
    </Box>
  );
}
