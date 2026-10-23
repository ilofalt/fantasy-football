"use client";

import { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { Matchup, MatchupStatus, Scoreboard, ScoreboardTeam } from "@/lib/scoreboard/types";
import type { RosterMatchup, WeekMatchups } from "@/lib/matchups/types";
import { teamImage } from "@/content/teamImages";
import { currentMatchups } from "@/content/matchups";
import { parseHash } from "@/lib/permalink";
import { managerForTeamKey } from "@/content/managers";
import MatchupDetail from "./MatchupDetail";

export const SCOREBOARD_URL = "/data/scoreboard.json";
const REFRESH_MS = 60_000;
const LEAGUE_URL = "https://football.fantasysports.yahoo.com/f1/55635";

const STATUS_CHIP: Record<MatchupStatus, { label: string; color: "error" | "default" }> = {
  live: { label: "Live", color: "error" },
  final: { label: "Final", color: "default" },
  upcoming: { label: "Upcoming", color: "default" },
};

/**
 * The name shown for a team: always the person's real name, never the Yahoo
 * team name. Yahoo's live data doesn't reliably include it, so it's looked up
 * from the team key.
 */
export function displayName(team: ScoreboardTeam): string {
  return managerForTeamKey(team.key) ?? team.manager ?? "Unknown manager";
}

function TeamRow({ team, leading, upcoming }: { team: ScoreboardTeam; leading: boolean; upcoming: boolean }) {
  // Only actual points are shown; before kickoff there's nothing to show yet.
  const name = displayName(team);
  return (
    <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
      <Avatar src={teamImage(name, team.logoUrl) ?? undefined} alt={name}>
        {name.charAt(0).toUpperCase()}
      </Avatar>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography noWrap sx={{ fontWeight: leading ? 700 : 400 }}>
          {name}
        </Typography>
      </Box>
      <Box sx={{ textAlign: "right" }}>
        <Typography
          variant="h6"
          component="p"
          data-testid="team-points"
          sx={{ fontWeight: leading ? 700 : 400, fontVariantNumeric: "tabular-nums" }}
        >
          {upcoming ? "–" : team.points.toFixed(2)}
        </Typography>
      </Box>
    </Stack>
  );
}

function MatchupCard({ matchup, id, onOpen }: { matchup: Matchup; id?: string; onOpen?: () => void }) {
  const [a, b] = matchup.teams;
  const upcoming = matchup.status === "upcoming";
  const chip = STATUS_CHIP[matchup.status];
  const body = (
    <Stack spacing={2} sx={{ p: 2.5 }}>
      <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
        <Chip size="small" label={chip.label} color={chip.color} variant="outlined" />
        {matchup.isPlayoffs && <Chip size="small" label="Playoffs" color="primary" variant="outlined" />}
        {onOpen && (
          <Typography variant="caption" color="primary" sx={{ ml: "auto", fontWeight: 600 }}>
            View lineups →
          </Typography>
        )}
      </Stack>
      <TeamRow
        team={a}
        upcoming={upcoming}
        leading={!upcoming && a.points > b.points}
      />
      <TeamRow
        team={b}
        upcoming={upcoming}
        leading={!upcoming && b.points > a.points}
      />
    </Stack>
  );
  return (
    <Card variant="outlined" component="article" id={id}>
      {onOpen ? (
        <CardActionArea
          onClick={onOpen}
          aria-label={`View lineups: ${displayName(a)} vs. ${displayName(b)}`}
        >
          {body}
        </CardActionArea>
      ) : (
        body
      )}
    </Card>
  );
}

/** Pre-game snapshot matchups as scoreboard matchups (0 points, upcoming). */
export function snapshotToMatchups(snapshot: WeekMatchups): Matchup[] {
  return snapshot.matchups.map((m) => ({
    status: "upcoming",
    isPlayoffs: false,
    teams: m.teams.map((t) => ({
      key: `${m.id}-${t.manager}`,
      name: t.manager,
      manager: t.manager,
      logoUrl: t.logoUrl,
      points: 0,
      projectedPoints: null,
      winProbability: null,
    })) as [ScoreboardTeam, ScoreboardTeam],
  }));
}

export default function Matchups({ snapshot = currentMatchups }: { snapshot?: WeekMatchups | null }) {
  const [scoreboard, setScoreboard] = useState<Scoreboard | null>(null);
  const [failed, setFailed] = useState(false);
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch(SCOREBOARD_URL, { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = (await res.json()) as Scoreboard;
        if (!cancelled) {
          setScoreboard(data);
          setFailed(false);
        }
      } catch {
        // Keep showing the last good scoreboard if a refresh fails.
        if (!cancelled) setFailed(true);
      }
    }

    load();
    const timer = setInterval(load, REFRESH_MS);
    return () => {
      cancelled = true;
      clearInterval(timer);
    };
  }, []);

  // Open a matchup from a deep link (#matchups/<id>), including back/forward.
  useEffect(() => {
    const sync = () => {
      const { tab, anchor } = parseHash(window.location.hash);
      setOpenId(tab === "matchups" && anchor ? anchor : null);
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  // The snapshot (with rosters) wins unless the live scoreboard is for a newer week.
  const useSnapshot = snapshot !== null && (scoreboard === null || scoreboard.week <= snapshot.week);
  const week = useSnapshot ? snapshot.week : scoreboard?.week;
  const matchups = useSnapshot ? snapshotToMatchups(snapshot) : scoreboard?.matchups;
  const open: RosterMatchup | null = useSnapshot ? (snapshot.matchups.find((m) => m.id === openId) ?? null) : null;

  function openMatchup(id: string) {
    setOpenId(id);
    window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}#matchups/${id}`);
  }

  function close() {
    setOpenId(null);
    window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
  }

  return (
    <Box component="section" id="matchups" sx={{ pb: { xs: 8, md: 12 } }}>
      <Container maxWidth="md">
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1}
          sx={{ justifyContent: "space-between", alignItems: { sm: "baseline" }, mb: useSnapshot ? 1 : 3 }}
        >
          <Typography variant="h5" component="h2" sx={{ fontWeight: 700 }}>
            {week ? `Week ${week} Matchups` : "Matchups"}
          </Typography>
          {!useSnapshot && scoreboard && (
            <Typography variant="body2" color="text.secondary">
              {scoreboard.leagueUrl ? (
                <Link href={scoreboard.leagueUrl} color="inherit" underline="hover">
                  {scoreboard.leagueName}
                </Link>
              ) : (
                scoreboard.leagueName
              )}
              {" · Updated "}
              {new Date(scoreboard.updatedAt).toLocaleTimeString([], {
                hour: "numeric",
                minute: "2-digit",
              })}
            </Typography>
          )}
          {useSnapshot && (
            <Link href={LEAGUE_URL} variant="body2" color="text.secondary" underline="hover">
              View on Yahoo
            </Link>
          )}
        </Stack>
        {useSnapshot && (
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            {snapshot.note ? `${snapshot.note} ` : ""}Tap a matchup to see both lineups.
          </Typography>
        )}

        {matchups ? (
          matchups.length > 0 ? (
            <Box sx={{ display: "grid", gap: 2, gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" } }}>
              {matchups.map((matchup, i) => {
                const roster = useSnapshot ? snapshot.matchups[i] : null;
                return (
                  <MatchupCard
                    key={matchup.teams.map((t) => t.key).join("-")}
                    matchup={matchup}
                    id={roster?.id}
                    onOpen={roster ? () => openMatchup(roster.id) : undefined}
                  />
                );
              })}
            </Box>
          ) : (
            <Typography color="text.secondary">No matchups this week.</Typography>
          )
        ) : failed ? (
          <Typography color="text.secondary">Matchups aren&apos;t available right now. Check back soon.</Typography>
        ) : (
          <Box
            aria-label="Loading matchups"
            sx={{ display: "grid", gap: 2, gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" } }}
          >
            {[0, 1].map((i) => (
              <Skeleton key={i} variant="rounded" height={160} />
            ))}
          </Box>
        )}
      </Container>
      {useSnapshot && <MatchupDetail matchup={open} week={snapshot.week} note={snapshot.note} onClose={close} />}
    </Box>
  );
}
