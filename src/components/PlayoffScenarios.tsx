"use client";

import { useMemo, useState } from "react";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";
import { REMAINING_SCHEDULE } from "@/content/schedule";
import { REGULAR_SEASON_WEEKS, standings, STANDINGS_THROUGH_WEEK } from "@/content/standings";
import { oddsGiven } from "@/content/odds";
import { pct } from "@/lib/playoffs/odds";
import {
  clinched,
  controlsDestiny,
  eliminated,
  pathIn,
  situation,
  thisWeek,
  withResult,
  type Situation,
} from "@/lib/playoffs/scenarios";
import ManagerAvatar from "./ManagerAvatar";
import Permalink from "./Permalink";

const upcoming = REMAINING_SCHEDULE.filter((w) => w.week > STANDINGS_THROUGH_WEEK);
const nextWeek = upcoming[0];
const base = situation(standings, upcoming);

type Status = "clinched" | "destiny" | "help" | "out";
const STATUS: Record<Status, { label: string; color: "success" | "primary" | "warning" | "default" }> = {
  clinched: { label: "Clinched", color: "success" },
  destiny: { label: "Win out and in", color: "primary" },
  help: { label: "Needs help", color: "warning" },
  out: { label: "Eliminated", color: "default" },
};

function statusOf(s: Situation, m: string): Status {
  if (clinched(s, m)) return "clinched";
  if (eliminated(s, m)) return "out";
  return controlsDestiny(s, m) ? "destiny" : "help";
}

const record = (wins: number) => `${wins}-${REGULAR_SEASON_WEEKS - wins}`;
const left = (s: Situation, m: string) => s.games.filter((g) => g[0] === m || g[1] === m).length;
/** Current record, counting any picked results. */
const soFar = (s: Situation, m: string) => {
  const played = REGULAR_SEASON_WEEKS - left(s, m);
  return `${s.wins[m]}-${played - s.wins[m]}`;
};
const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? "" : "s"}`;

function Detail({ s, m, picks }: { s: Situation; m: string; picks: [string, string][] }) {
  const status = statusOf(s, m);
  const path = status === "help" || status === "destiny" ? pathIn(s, m) : null;
  const week = nextWeek ? thisWeek(s, m, nextWeek.week) : null;
  const opponent = week?.opponent ?? null;
  const odds = useMemo(() => {
    if (!opponent || status === "clinched" || status === "out") return null;
    const win = oddsGiven([...picks, [m, opponent]]).find((o) => o.manager === m);
    const loss = oddsGiven([...picks, [opponent, m]]).find((o) => o.manager === m);
    return win && loss ? { win: win.playoffs, loss: loss.playoffs } : null;
  }, [m, picks, opponent, status]);
  const remaining = left(s, m);

  return (
    <Box sx={{ border: 1, borderColor: "divider", borderRadius: 2, p: { xs: 2, md: 2.5 } }}>
      <Stack direction="row" spacing={1.5} sx={{ alignItems: "center", mb: 1.5 }}>
        <ManagerAvatar name={m} size={44} />
        <Box>
          <Typography variant="h6" component="h4" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
            What {m} needs
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {soFar(s, m)}{picks.length ? " with your picks" : ""} · {plural(remaining, "game")} left
          </Typography>
        </Box>
      </Stack>

      {status === "clinched" && <Typography>Nothing. {m} has clinched a playoff spot.</Typography>}
      {status === "out" && (
        <Typography>
          Nothing can save {m}. Even winning out, at least six teams finish ahead. Toilet Bowl it is.
        </Typography>
      )}

      {week?.opponent && status !== "clinched" && status !== "out" && (
        <Typography sx={{ mb: 1.5 }}>
          <strong>Week {nextWeek.week} vs. {week.opponent}.</strong>{" "}
          {odds && (
            <>
              Playoff odds with a win: <strong>{pct(odds.win)}</strong>. With a loss: <strong>{pct(odds.loss)}</strong>.{" "}
            </>
          )}
          {week.clinchesWithWin && <>A win clinches a playoff spot no matter what else happens. </>}
          {week.eliminatedWithLoss && <>A loss eliminates {m}. </>}
        </Typography>
      )}

      {path && (
        <>
          <Typography sx={{ fontWeight: 700, mb: 0.5 }}>
            {status === "destiny" ? "Win out and they're in, no help needed:" : "The simplest way in:"}
          </Typography>
          <Box component="ul" sx={{ m: 0, pl: 2.5, "& li": { lineHeight: 1.7 } }}>
            <li>
              {m} wins {remaining === 1 ? "their last game" : `all ${remaining} remaining games`} and finishes{" "}
              {record(path.finalWins)}.
            </li>
            {path.limits.map((l) => {
              const total = left(s, l.manager);
              const mustLose = total - (l.maxWins - s.wins[l.manager]);
              return (
                <li key={l.manager}>
                  {l.manager} finishes {record(l.maxWins)} or worse (
                  {mustLose === total ? `loses all ${total} remaining` : `loses at least ${mustLose} of their last ${total}`}).
                </li>
              );
            })}
            {path.needsTiebreak && <li>{m} wins the points-for tiebreaker with anyone tied at {record(path.finalWins)}.</li>}
          </Box>
          {status === "help" && (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
              This is the easiest combination, not the only one. Other teams on the list can swap places with ones that
              aren&apos;t, as long as no more than five teams finish ahead of {m}.
            </Typography>
          )}
        </>
      )}
    </Box>
  );
}

export default function PlayoffScenarios() {
  // Winner picked for each of next week's games, by game index.
  const [picks, setPicks] = useState<Record<number, string>>({});
  const [selected, setSelected] = useState<string>(standings[standings.length - 1].manager);

  const decided = useMemo<[string, string][]>(
    () =>
      Object.entries(picks).map(([i, w]) => {
        const [a, b] = nextWeek.games[Number(i)];
        return [w, w === a ? b : a];
      }),
    [picks],
  );
  const s = useMemo(() => decided.reduce((acc, [w, l]) => withResult(acc, w, l), base), [decided]);
  const rows = useMemo(() => {
    const order = [...standings].sort((x, y) => s.wins[y.manager] - s.wins[x.manager] || y.pointsFor - x.pointsFor);
    return order.map((r) => ({ manager: r.manager, status: statusOf(s, r.manager) }));
  }, [s]);

  if (!nextWeek) return null;

  return (
    <Card variant="outlined" id="scenarios" sx={{ p: { xs: 2.5, md: 3 } }}>
      <Stack direction="row" sx={{ alignItems: "center", mb: 0.5 }}>
        <Typography variant="h6" component="h3" sx={{ fontWeight: 700 }}>
          What needs to happen
        </Typography>
        <Permalink tab="playoffs" anchor="scenarios" label="playoff scenarios" />
      </Stack>
      <Typography color="text.secondary" sx={{ mb: 2 }}>
        Exact clinching and elimination math for every team, by wins. Pick winners for Week {nextWeek.week} to see how the
        race changes, and tap a team to see what they need.
      </Typography>

      <Typography variant="overline" color="text.secondary" component="p">
        Week {nextWeek.week} what-ifs
      </Typography>
      <Box sx={{ display: "grid", gap: 1, gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" }, mb: 2.5 }}>
        {nextWeek.games.map(([a, b], i) => (
          <ToggleButtonGroup
            key={`${a}-${b}`}
            exclusive
            size="small"
            fullWidth
            value={picks[i] ?? null}
            onChange={(_, w: string | null) =>
              setPicks((p) => {
                const next = { ...p };
                if (w) next[i] = w;
                else delete next[i];
                return next;
              })
            }
            aria-label={`Pick the winner of ${a} vs. ${b}`}
          >
            <ToggleButton value={a} sx={{ textTransform: "none", fontWeight: 600 }}>
              {a}
            </ToggleButton>
            <ToggleButton value={b} sx={{ textTransform: "none", fontWeight: 600 }}>
              {b}
            </ToggleButton>
          </ToggleButtonGroup>
        ))}
      </Box>

      <Box sx={{ display: "grid", gap: 2.5, gridTemplateColumns: { xs: "1fr", md: "minmax(0, 5fr) minmax(0, 7fr)" } }}>
        <Stack component="ol" spacing={0.5} sx={{ m: 0, p: 0, listStyle: "none" }} aria-label="Playoff status by team">
          {rows.map((r, i) => (
            <li key={r.manager}>
              <ButtonBase
                onClick={() => setSelected(r.manager)}
                aria-pressed={selected === r.manager}
                sx={{
                  width: "100%",
                  justifyContent: "flex-start",
                  gap: 1.25,
                  px: 1,
                  py: 0.75,
                  borderRadius: 1.5,
                  textAlign: "left",
                  bgcolor: selected === r.manager ? "action.selected" : "transparent",
                  "&:hover": { bgcolor: "action.hover" },
                  borderTop: i === 6 ? "2px dashed" : "none",
                  borderColor: "divider",
                }}
              >
                <Typography component="span" color="text.secondary" sx={{ width: 20, fontWeight: 700, fontVariantNumeric: "tabular-nums" }}>
                  {i + 1}
                </Typography>
                <Typography component="span" sx={{ fontWeight: 600, flex: 1 }}>
                  {r.manager}
                </Typography>
                <Typography component="span" variant="body2" color="text.secondary" sx={{ fontVariantNumeric: "tabular-nums" }}>
                  {soFar(s, r.manager)}
                </Typography>
                <Chip
                  size="small"
                  label={STATUS[r.status].label}
                  color={STATUS[r.status].color}
                  variant={r.status === "clinched" ? "filled" : "outlined"}
                  sx={{ minWidth: 112 }}
                />
              </ButtonBase>
            </li>
          ))}
        </Stack>
        <Detail s={s} m={selected} picks={decided} />
      </Box>
      <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 2 }}>
        Records include any Week {nextWeek.week} picks. Order is by wins, then current points for. &quot;Clinched&quot; and
        &quot;Eliminated&quot; hold even if every tie goes the wrong way on points.
      </Typography>
    </Card>
  );
}
