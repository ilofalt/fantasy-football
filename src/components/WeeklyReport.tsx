"use client";

import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { weeklyData } from "@/content/weekly";
import { buildReport, managerLines, type ReportCard } from "@/lib/weekly/report";
import Permalink from "./Permalink";

function ManagerRow({ manager, points, muted = false }: { manager: string; points: number; muted?: boolean }) {
  return (
    <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
      <Avatar sx={{ width: 32, height: 32, fontSize: "0.9rem", bgcolor: "primary.main" }}>{manager.charAt(0).toUpperCase()}</Avatar>
      <Typography sx={{ flex: 1, fontWeight: 600, color: muted ? "text.secondary" : "text.primary" }}>{manager}</Typography>
      <Typography
        variant="h6"
        component="p"
        sx={{ fontWeight: 700, fontVariantNumeric: "tabular-nums", color: muted ? "text.secondary" : "text.primary" }}
      >
        {points.toFixed(2)}
      </Typography>
    </Stack>
  );
}

function AwardCard({ card }: { card: ReportCard }) {
  return (
    <Card variant="outlined" component="article" id={card.id} sx={{ p: 2.5, display: "flex", flexDirection: "column", gap: 1.5 }}>
      <Stack direction="row" sx={{ alignItems: "center" }}>
        <Typography
          variant="overline"
          component="h3"
          sx={{ fontWeight: 800, letterSpacing: "0.08em", lineHeight: 1.4, color: "primary.main" }}
        >
          {card.title} <span aria-hidden="true">{card.emoji}</span>
        </Typography>
        <Permalink tab="report" anchor={card.id} label={card.title} />
      </Stack>
      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
        {card.text}
      </Typography>
      <Box sx={{ mt: "auto", pt: 0.5 }}>
        {card.kind === "manager" && <ManagerRow manager={card.manager} points={card.points} />}
        {card.kind === "matchup" && (
          <Stack spacing={1}>
            <ManagerRow manager={card.winner.manager} points={card.winner.points} />
            <ManagerRow manager={card.loser.manager} points={card.loser.points} muted />
          </Stack>
        )}
        {card.kind === "player" && (
          <Stack direction="row" spacing={2} sx={{ alignItems: "flex-start" }}>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography sx={{ fontWeight: 700 }}>{card.player.name}</Typography>
              <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>
                {card.player.position} · {card.player.nflTeam} · {card.manager}
              </Typography>
              {card.player.statLine && (
                <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 0.5 }}>
                  {card.player.statLine}
                </Typography>
              )}
            </Box>
            <Typography variant="h6" component="p" sx={{ fontWeight: 700, fontVariantNumeric: "tabular-nums" }}>
              {card.player.points.toFixed(2)}
            </Typography>
          </Stack>
        )}
      </Box>
    </Card>
  );
}

export default function WeeklyReport() {
  const [index, setIndex] = useState(0);
  const week = weeklyData[index];
  const cards = buildReport(week);
  const lines = managerLines(week).sort((a, b) => b.efficiency - a.efficiency || b.points - a.points);

  return (
    <Box component="section" id="report" sx={{ pb: { xs: 8, md: 12 } }}>
      <Container maxWidth="md">
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1}
          sx={{ justifyContent: "space-between", alignItems: { sm: "baseline" }, mb: 1 }}
        >
          <Typography variant="h5" component="h2" sx={{ fontWeight: 700 }}>
            Week {week.week} Report
          </Typography>
          {weeklyData.length > 1 && (
            <Stack direction="row" spacing={1} aria-label="Choose a week">
              {weeklyData.map((w, i) => (
                <Chip
                  key={w.week}
                  label={`Week ${w.week}`}
                  size="small"
                  color={i === index ? "primary" : "default"}
                  variant={i === index ? "filled" : "outlined"}
                  onClick={() => setIndex(i)}
                />
              ))}
            </Stack>
          )}
        </Stack>
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          The weekly report is ready to view! Awards are computed from every team&apos;s lineup. A perfect lineup is the
          best possible starting lineup from a team&apos;s roster that week, IR excluded.
        </Typography>

        <Box sx={{ display: "grid", gap: 2, gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" } }}>
          {cards.map((card) => (
            <AwardCard key={card.id} card={card} />
          ))}
        </Box>

        <Card variant="outlined" id="lineup-efficiency" sx={{ p: { xs: 2.5, md: 3 }, mt: 3 }}>
          <Stack direction="row" sx={{ alignItems: "center" }}>
            <Typography variant="h6" component="h3" sx={{ fontWeight: 700 }}>
              Lineup efficiency
            </Typography>
            <Permalink tab="report" anchor="lineup-efficiency" label="lineup efficiency" />
          </Stack>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            How close each manager came to their perfect lineup, and the points they left on the bench.
          </Typography>
          <Box
            component="table"
            aria-label="Lineup efficiency"
            sx={{
              width: "100%",
              borderCollapse: "collapse",
              fontVariantNumeric: "tabular-nums",
              "& th, & td": { py: 1, px: 1, borderBottom: 1, borderColor: "divider", textAlign: "right" },
              "& th": { fontSize: "0.8125rem", fontWeight: 600, color: "text.secondary" },
              "& th:first-of-type, & td:first-of-type": { textAlign: "left", pl: 0 },
              "& tbody tr:last-of-type td": { borderBottom: 0 },
              "& th:nth-of-type(3), & td:nth-of-type(3)": { display: { xs: "none", sm: "table-cell" } },
            }}
          >
            <thead>
              <tr>
                <th scope="col">Manager</th>
                <th scope="col">Scored</th>
                <th scope="col">Perfect</th>
                <th scope="col">Efficiency</th>
                <th scope="col">Left on bench</th>
              </tr>
            </thead>
            <tbody>
              {lines.map((l) => (
                <tr key={l.manager}>
                  <td>
                    {l.manager}
                    {l.shouldHaveStarted.length > 0 && (
                      <Typography variant="caption" color="text.secondary" sx={{ display: "block" }}>
                        Should&apos;ve started {l.shouldHaveStarted.map((p) => p.name).join(", ")}
                      </Typography>
                    )}
                  </td>
                  <td>{l.points.toFixed(2)}</td>
                  <td>{l.perfect.toFixed(2)}</td>
                  <td>{Math.round(l.efficiency * 100)}%</td>
                  <td>{l.leftOnBench.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </Box>
        </Card>
      </Container>
    </Box>
  );
}
