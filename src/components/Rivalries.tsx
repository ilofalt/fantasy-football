"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { alpha, type Theme } from "@mui/material/styles";
import { history } from "@/content/history";
import { REMAINING_SCHEDULE } from "@/content/schedule";
import {
  allManagers,
  currentStreak,
  headToHead,
  recordText,
  rivalries,
  slug,
  winPct,
  type ManagerGame,
  type Rivalry,
} from "@/lib/history/stats";
import { parseHash, permalinkHash } from "@/lib/permalink";
import ManagerAvatar from "./ManagerAvatar";
import Permalink from "./Permalink";

const { current, former } = allManagers(history);
const everyone = [...current, ...former];
const DEFAULT_PAIR: [string, string] = ["Isaiah", "Jonathan"];

export const pairId = (a: string, b: string) => `${slug(a)}-vs-${slug(b)}`;

/** "isaiah-vs-jonathan" back to the two managers' names. */
export function pairFromId(id: string | null): [string, string] | null {
  if (!id) return null;
  const m = id.match(/^(.+)-vs-(.+)$/);
  if (!m) return null;
  const find = (s: string) => everyone.find((n) => slug(n) === s);
  const a = find(m[1]);
  const b = find(m[2]);
  return a && b && a !== b ? [a, b] : null;
}

const typeLabel = (g: ManagerGame) =>
  g.type === "playoff" ? "Playoffs" : g.type === "consolation" ? "Toilet Bowl" : "Regular season";

function pctColor(p: number) {
  // Red below .500, green above, scaled by how lopsided.
  const strength = Math.min(Math.abs(p - 0.5) * 2, 1) * 0.55 + 0.08;
  return p === 0.5 ? "action.hover" : (theme: Theme) =>
    alpha(p > 0.5 ? theme.palette.success.main : theme.palette.error.main, strength);
}

function Compare({ a, b, onChange }: { a: string; b: string; onChange: (a: string, b: string) => void }) {
  const h = useMemo(() => headToHead(history, a, b), [a, b]);
  const n = h.games.length;
  const avg = (k: "pf" | "pa") => (n ? h.games.reduce((s, g) => s + g[k], 0) / n : 0);
  const biggest = (who: "a" | "b") => {
    const won = h.games.filter((g) => (who === "a" ? g.pf > g.pa : g.pa > g.pf));
    return won.reduce<ManagerGame | null>((m, g) => (!m || Math.abs(g.pf - g.pa) > Math.abs(m.pf - m.pa) ? g : m), null);
  };
  const streak = currentStreak(h.games);
  const streakText = streak
    ? `${streak[0] === "W" ? a : streak[0] === "L" ? b : "Nobody"} ${streak[0] === "T" ? "— last game tied" : `has won the last ${streak.slice(1) === "1" ? "meeting" : `${streak.slice(1)} meetings`}`}`
    : null;

  const select = (value: string, label: string, set: (v: string) => void, other: string) => (
    <TextField select size="small" label={label} value={value} onChange={(e) => set(e.target.value)} sx={{ minWidth: 140, flex: 1 }}>
      {current.map((m) => (
        <MenuItem key={m} value={m} disabled={m === other}>
          {m}
        </MenuItem>
      ))}
      {former.map((m) => (
        <MenuItem key={m} value={m} disabled={m === other}>
          {m} (former)
        </MenuItem>
      ))}
    </TextField>
  );

  const side = (name: string, wins: number, align: "left" | "right") => (
    <Stack spacing={1} sx={{ alignItems: "center", flex: 1, minWidth: 0 }}>
      <ManagerAvatar name={name} size={72} />
      <Typography sx={{ fontWeight: 700 }} noWrap>
        {name}
      </Typography>
      <Typography variant="h3" component="p" sx={{ fontWeight: 800, fontVariantNumeric: "tabular-nums", lineHeight: 1 }} data-testid={`h2h-wins-${align}`}>
        {wins}
      </Typography>
      <Typography variant="caption" color="text.secondary">
        {avg(align === "left" ? "pf" : "pa").toFixed(1)} avg
      </Typography>
    </Stack>
  );

  const big = [biggest("a"), biggest("b")] as const;

  return (
    <Card variant="outlined" id="head-to-head" component="section" aria-label="Head to head" sx={{ p: { xs: 2, md: 3 } }}>
      <Stack direction="row" sx={{ alignItems: "center", mb: 2 }}>
        <Typography variant="h6" component="h3" sx={{ fontWeight: 700 }}>
          Head to head
        </Typography>
        <Permalink tab="rivalries" anchor={pairId(a, b)} label={`${a} vs. ${b}`} />
      </Stack>
      <Stack direction="row" spacing={1.5} sx={{ mb: 3 }}>
        {select(a, "Manager", (v) => onChange(v, b), b)}
        {select(b, "Opponent", (v) => onChange(a, v), a)}
      </Stack>

      {n === 0 ? (
        <Typography color="text.secondary">
          {a} and {b} have never played each other.
        </Typography>
      ) : (
        <>
          <Stack direction="row" spacing={2} sx={{ alignItems: "flex-start", mb: 2 }}>
            {side(a, h.overall.wins, "left")}
            <Typography color="text.secondary" sx={{ pt: 13, fontWeight: 700 }}>
              {h.overall.ties ? `${h.overall.ties} tie` : "–"}
            </Typography>
            {side(b, h.overall.losses, "right")}
          </Stack>

          <Stack direction="row" spacing={1} useFlexGap sx={{ justifyContent: "center", flexWrap: "wrap", mb: 2 }}>
            <Chip size="small" label={`${n} meeting${n === 1 ? "" : "s"}`} />
            <Chip size="small" variant="outlined" label={`Regular season ${recordText(h.regular)}`} />
            {h.postseason.games > 0 && <Chip size="small" variant="outlined" color="primary" label={`Postseason ${recordText(h.postseason)}`} />}
          </Stack>
          {streakText && (
            <Typography variant="body2" sx={{ textAlign: "center", mb: 2 }}>
              {streakText}.
            </Typography>
          )}

          <Box sx={{ display: "grid", gap: 1.5, gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, mb: 3 }}>
            {[a, b].map((name, i) => {
              const g = big[i];
              return (
                <Box key={name} sx={{ border: 1, borderColor: "divider", borderRadius: 2, p: 1.5 }}>
                  <Typography variant="overline" color="text.secondary" sx={{ fontWeight: 700, lineHeight: 1.5 }}>
                    {name}&apos;s biggest win
                  </Typography>
                  {g ? (
                    <Typography variant="body2">
                      {Math.max(g.pf, g.pa).toFixed(2)}–{Math.min(g.pf, g.pa).toFixed(2)} · {g.year} Week {g.week}
                      {g.type !== "regular" ? ` (${typeLabel(g)})` : ""}
                    </Typography>
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      Still looking for one.
                    </Typography>
                  )}
                </Box>
              );
            })}
          </Box>

          <Typography variant="overline" color="text.secondary" sx={{ fontWeight: 700 }}>
            Every meeting
          </Typography>
          <Box
            component="table"
            sx={{
              width: "100%",
              borderCollapse: "collapse",
              fontVariantNumeric: "tabular-nums",
              "& th, & td": { py: 0.75, px: 1, borderBottom: 1, borderColor: "divider", fontSize: "0.875rem" },
              "& th": { fontWeight: 600, color: "text.secondary", textAlign: "left" },
              "& td.num, & th.num": { textAlign: "right", whiteSpace: "nowrap" },
            }}
          >
            <thead>
              <tr>
                <th scope="col">When</th>
                <th scope="col" className="num">
                  {a}
                </th>
                <th scope="col" className="num">
                  {b}
                </th>
              </tr>
            </thead>
            <tbody>
              {[...h.games].reverse().map((g) => (
                <tr key={`${g.year}-${g.week}`}>
                  <td>
                    {g.year} Wk {g.week}
                    {g.type !== "regular" && (
                      <Chip size="small" label={typeLabel(g)} color={g.type === "playoff" ? "primary" : "default"} variant="outlined" sx={{ ml: 1, height: 20 }} />
                    )}
                  </td>
                  <Box component="td" className="num" sx={{ fontWeight: g.pf > g.pa ? 700 : 400 }}>
                    {g.pf.toFixed(2)}
                  </Box>
                  <Box component="td" className="num" sx={{ fontWeight: g.pa > g.pf ? 700 : 400 }}>
                    {g.pa.toFixed(2)}
                  </Box>
                </tr>
              ))}
            </tbody>
          </Box>
        </>
      )}
      <Button size="small" href={permalinkHash("managers", slug(a))} sx={{ mt: 2, mr: 1 }}>
        {a}&apos;s page
      </Button>
      <Button size="small" href={permalinkHash("managers", slug(b))} sx={{ mt: 2 }}>
        {b}&apos;s page
      </Button>
    </Card>
  );
}

function RivalryCard({ title, rivalry, detail, onPick }: { title: string; rivalry: Rivalry; detail: string; onPick: () => void }) {
  const { a, b, h2h } = rivalry;
  return (
    <Card variant="outlined" sx={{ height: "100%" }}>
      <CardActionArea onClick={onPick} sx={{ p: 2, height: "100%", display: "block" }} aria-label={`${title}: ${a} vs. ${b}`}>
        <Typography variant="overline" color="primary" sx={{ fontWeight: 700, lineHeight: 1.5 }}>
          {title}
        </Typography>
        <Stack direction="row" spacing={1} sx={{ alignItems: "center", my: 1 }}>
          <ManagerAvatar name={a} size={32} />
          <Typography sx={{ fontWeight: 700 }}>{a}</Typography>
          <Typography color="text.secondary">vs.</Typography>
          <Typography sx={{ fontWeight: 700 }}>{b}</Typography>
          <ManagerAvatar name={b} size={32} />
        </Stack>
        <Typography variant="body2" color="text.secondary">
          {a} leads {recordText(h2h.overall)} · {detail}
        </Typography>
      </CardActionArea>
    </Card>
  );
}

/** Orient a pair so the manager with the better record is listed first. */
function leaderFirst(r: Rivalry): Rivalry {
  if (r.h2h.overall.wins >= r.h2h.overall.losses) return r;
  return { ...r, a: r.b, b: r.a, h2h: headToHead(history, r.b, r.a) };
}

export default function Rivalries() {
  const [pair, setPair] = useState<[string, string]>(DEFAULT_PAIR);
  const compareRef = useRef<HTMLDivElement>(null);
  const [scrollN, setScrollN] = useState(0);

  useEffect(() => {
    const sync = () => {
      const { tab, anchor } = parseHash(window.location.hash);
      const p = tab === "rivalries" ? pairFromId(anchor) : null;
      if (p) {
        setPair(p);
        setScrollN((n) => n + 1);
      }
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  useEffect(() => {
    if (scrollN) compareRef.current?.scrollIntoView?.({ behavior: "smooth", block: "start" });
  }, [scrollN]);

  function pick(a: string, b: string, scroll = true) {
    setPair([a, b]);
    window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}${permalinkHash("rivalries", pairId(a, b))}`);
    if (scroll) setScrollN((n) => n + 1);
  }

  const all = useMemo(() => rivalries(history), []);
  const regulars = all.filter((r) => r.h2h.games.length >= 5);
  const by = <T,>(xs: T[], f: (x: T) => number) => [...xs].sort((x, y) => f(y) - f(x))[0];
  const mostPlayed = leaderFirst(by(all, (r) => r.h2h.games.length * 1000 - r.avgMargin));
  const lopsided = leaderFirst(by(regulars, (r) => Math.abs(winPct(r.h2h.overall) - 0.5) * 1000 + r.h2h.games.length));
  const closest = leaderFirst(by(regulars, (r) => -r.avgMargin));
  const shootout = leaderFirst(by(regulars, (r) => r.avgCombined));
  const playoffFeud = leaderFirst(
    by(
      all.filter((r) => !([r.a, r.b].includes(mostPlayed.a) && [r.a, r.b].includes(mostPlayed.b))),
      (r) => r.h2h.postseason.games * 1000 + r.h2h.games.length
    )
  );

  const allGames = history.games;
  const blowout = by(allGames, (g) => Math.abs(g.aScore - g.bScore));
  const nailBiter = by(allGames, (g) => -Math.abs(g.aScore - g.bScore));
  const thisWeek = REMAINING_SCHEDULE[0];

  return (
    <Box component="section" id="rivalries" sx={{ pb: { xs: 8, md: 12 } }}>
      <Container maxWidth="md">
        <Typography variant="h5" component="h2" sx={{ fontWeight: 700, mb: 1 }}>
          Rivalries
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          Every game since 2022 — {allGames.length} of them, playoffs and Toilet Bowl included. Pick any two managers to
          see who really owns who.
        </Typography>

        <Stack spacing={3}>
          {thisWeek && (
            <Card variant="outlined" id="this-week" sx={{ p: { xs: 2, md: 3 } }}>
              <Stack direction="row" sx={{ alignItems: "center", mb: 1.5 }}>
                <Typography variant="h6" component="h3" sx={{ fontWeight: 700 }}>
                  Week {thisWeek.week}&apos;s history
                </Typography>
                <Permalink tab="rivalries" anchor="this-week" label={`Week ${thisWeek.week} rivalries`} />
              </Stack>
              <Box sx={{ display: "grid", gap: 1, gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" } }}>
                {thisWeek.games.map(([x, y]) => {
                  const h = headToHead(history, x, y);
                  const lead =
                    h.overall.wins === h.overall.losses
                      ? h.games.length
                        ? `Tied ${recordText(h.overall)}`
                        : "First meeting"
                      : h.overall.wins > h.overall.losses
                        ? `${x} leads ${h.overall.wins}-${h.overall.losses}`
                        : `${y} leads ${h.overall.losses}-${h.overall.wins}`;
                  return (
                    <Button
                      key={x}
                      onClick={() => pick(x, y)}
                      variant="outlined"
                      color="inherit"
                      sx={{ justifyContent: "space-between", textTransform: "none", borderColor: "divider", py: 1 }}
                    >
                      <span>
                        <strong>{x}</strong> vs. <strong>{y}</strong>
                      </span>
                      <Typography component="span" variant="body2" color="text.secondary" sx={{ ml: 1 }}>
                        {lead}
                      </Typography>
                    </Button>
                  );
                })}
              </Box>
            </Card>
          )}

          <Box ref={compareRef} sx={{ scrollMarginTop: 80 }}>
            <Compare a={pair[0]} b={pair[1]} onChange={(a, b) => pick(a, b, false)} />
          </Box>

          <Box component="section" id="best-rivalries" aria-label="Best rivalries">
            <Stack direction="row" sx={{ alignItems: "center", mb: 1.5 }}>
              <Typography variant="h6" component="h3" sx={{ fontWeight: 700 }}>
                The league&apos;s rivalries
              </Typography>
              <Permalink tab="rivalries" anchor="best-rivalries" label="the league's rivalries" />
            </Stack>
            <Box sx={{ display: "grid", gap: 2, gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" } }}>
              <RivalryCard title="Most played" rivalry={mostPlayed} detail={`${mostPlayed.h2h.games.length} meetings`} onPick={() => pick(mostPlayed.a, mostPlayed.b)} />
              <RivalryCard title="Most one-sided" rivalry={lopsided} detail={`min. 5 games`} onPick={() => pick(lopsided.a, lopsided.b)} />
              <RivalryCard title="Closest" rivalry={closest} detail={`${closest.avgMargin.toFixed(1)}-point average margin`} onPick={() => pick(closest.a, closest.b)} />
              <RivalryCard title="Highest scoring" rivalry={shootout} detail={`${shootout.avgCombined.toFixed(1)} combined per game`} onPick={() => pick(shootout.a, shootout.b)} />
              <RivalryCard
                title="Postseason feud"
                rivalry={playoffFeud}
                detail={`${playoffFeud.h2h.postseason.games} postseason meetings`}
                onPick={() => pick(playoffFeud.a, playoffFeud.b)}
              />
              <Card variant="outlined" sx={{ p: 2 }}>
                <Typography variant="overline" color="primary" sx={{ fontWeight: 700, lineHeight: 1.5 }}>
                  Extremes
                </Typography>
                {[
                  { label: "Biggest blowout", g: blowout },
                  { label: "Closest game", g: nailBiter },
                ].map(({ label, g }) => {
                  const [w, ws, l, ls] = g.aScore >= g.bScore ? [g.a, g.aScore, g.b, g.bScore] : [g.b, g.bScore, g.a, g.aScore];
                  return (
                    <Typography key={label} variant="body2" sx={{ mt: 1 }}>
                      <strong>{label}:</strong> {w} {ws.toFixed(2)}, {l} {ls.toFixed(2)} ({g.year} Week {g.week})
                    </Typography>
                  );
                })}
              </Card>
            </Box>
          </Box>

          <Card variant="outlined" id="grid" sx={{ p: { xs: 2, md: 3 } }}>
            <Stack direction="row" sx={{ alignItems: "center", mb: 0.5 }}>
              <Typography variant="h6" component="h3" sx={{ fontWeight: 700 }}>
                All-time head-to-head grid
              </Typography>
              <Permalink tab="rivalries" anchor="grid" label="the head-to-head grid" />
            </Stack>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Read across: the row manager&apos;s record against each column. Tap a cell for the full history.
            </Typography>
            <Box sx={{ overflowX: "auto", mx: { xs: -2, md: 0 } }}>
              <Box
                component="table"
                aria-label="Head-to-head records"
                sx={{
                  borderCollapse: "separate",
                  borderSpacing: 2,
                  fontVariantNumeric: "tabular-nums",
                  fontSize: "0.75rem",
                  mx: "auto",
                  "& th": { fontWeight: 600, color: "text.secondary", px: 0.5, whiteSpace: "nowrap" },
                  "& thead th": { writingMode: { xs: "vertical-rl", sm: "horizontal-tb" }, transform: { xs: "rotate(180deg)", sm: "none" }, py: 0.5 },
                  "& tbody th": { textAlign: "right", position: "sticky", left: 0, bgcolor: "background.paper", zIndex: 1, pr: 1 },
                }}
              >
                <thead>
                  <tr>
                    <th />
                    {current.map((m) => (
                      <th key={m} scope="col">
                        {m.slice(0, 4)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {current.map((row) => (
                    <tr key={row}>
                      <th scope="row">{row}</th>
                      {current.map((col) => {
                        if (row === col) return <Box component="td" key={col} sx={{ bgcolor: "action.disabledBackground", borderRadius: 1 }} />;
                        const h = headToHead(history, row, col);
                        const empty = h.games.length === 0;
                        return (
                          <Box component="td" key={col} sx={{ p: 0 }}>
                            <Box
                              component="button"
                              type="button"
                              onClick={() => pick(row, col)}
                              aria-label={`${row} vs. ${col}: ${empty ? "never played" : recordText(h.overall)}`}
                              sx={{
                                all: "unset",
                                cursor: "pointer",
                                display: "block",
                                textAlign: "center",
                                minWidth: 38,
                                py: 0.75,
                                px: 0.5,
                                borderRadius: 1,
                                color: "text.primary",
                                bgcolor: empty ? "transparent" : pctColor(winPct(h.overall)),
                                "&:hover, &:focus-visible": { outline: 2, outlineColor: "primary.main" },
                              }}
                            >
                              {empty ? "—" : recordText(h.overall)}
                            </Box>
                          </Box>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </Box>
            </Box>
          </Card>
        </Stack>
      </Container>
    </Box>
  );
}
