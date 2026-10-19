"use client";

import { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { Matchup, MatchupStatus, Scoreboard, ScoreboardTeam } from "@/lib/scoreboard/types";

export const SCOREBOARD_URL = "/data/scoreboard.json";
const REFRESH_MS = 60_000;

const STATUS_CHIP: Record<MatchupStatus, { label: string; color: "error" | "default" }> = {
  live: { label: "Live", color: "error" },
  final: { label: "Final", color: "default" },
  upcoming: { label: "Upcoming", color: "default" },
};

function TeamRow({ team, leading }: { team: ScoreboardTeam; leading: boolean }) {
  return (
    <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
      <Avatar src={team.logoUrl ?? undefined} alt={team.name} variant="rounded">
        {team.name.charAt(0)}
      </Avatar>
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography noWrap sx={{ fontWeight: leading ? 700 : 400 }}>
          {team.name}
        </Typography>
        {team.manager && (
          <Typography variant="body2" color="text.secondary" noWrap>
            {team.manager}
          </Typography>
        )}
      </Box>
      <Box sx={{ textAlign: "right" }}>
        <Typography
          variant="h6"
          component="p"
          data-testid="team-points"
          sx={{ fontWeight: leading ? 700 : 400, fontVariantNumeric: "tabular-nums" }}
        >
          {team.points.toFixed(2)}
        </Typography>
        {team.projectedPoints !== null && (
          <Typography variant="caption" color="text.secondary" sx={{ fontVariantNumeric: "tabular-nums" }}>
            Proj {team.projectedPoints.toFixed(2)}
            {team.winProbability !== null && ` · ${Math.round(team.winProbability * 100)}%`}
          </Typography>
        )}
      </Box>
    </Stack>
  );
}

function MatchupCard({ matchup }: { matchup: Matchup }) {
  const [a, b] = matchup.teams;
  const started = matchup.status !== "upcoming";
  const chip = STATUS_CHIP[matchup.status];

  return (
    <Card variant="outlined" component="article" sx={{ p: 2.5 }}>
      <Stack spacing={2}>
        <Stack direction="row" spacing={1}>
          <Chip size="small" label={chip.label} color={chip.color} variant="outlined" />
          {matchup.isPlayoffs && <Chip size="small" label="Playoffs" color="primary" variant="outlined" />}
        </Stack>
        <TeamRow team={a} leading={started && a.points > b.points} />
        <TeamRow team={b} leading={started && b.points > a.points} />
      </Stack>
    </Card>
  );
}

export default function Matchups() {
  const [scoreboard, setScoreboard] = useState<Scoreboard | null>(null);
  const [failed, setFailed] = useState(false);

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

  return (
    <Box component="section" id="matchups" sx={{ pb: { xs: 8, md: 12 } }}>
      <Container maxWidth="md">
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1}
          sx={{ justifyContent: "space-between", alignItems: { sm: "baseline" }, mb: 3 }}
        >
          <Typography variant="h5" component="h2" sx={{ fontWeight: 700 }}>
            {scoreboard ? `Week ${scoreboard.week} Matchups` : "Matchups"}
          </Typography>
          {scoreboard && (
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
        </Stack>

        {scoreboard ? (
          scoreboard.matchups.length > 0 ? (
            <Box sx={{ display: "grid", gap: 2, gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" } }}>
              {scoreboard.matchups.map((matchup) => (
                <MatchupCard key={matchup.teams.map((t) => t.key).join("-")} matchup={matchup} />
              ))}
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
    </Box>
  );
}
