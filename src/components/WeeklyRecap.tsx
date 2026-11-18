"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonBase from "@mui/material/ButtonBase";
import Chip from "@mui/material/Chip";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import { RECAP_WEEK, recapStories, type MistakeKind } from "@/content/recaps";
import { standings } from "@/content/standings";
import { currentMatchups } from "@/content/matchups";
import { weeklyData } from "@/content/weekly";
import { managerRecap, ordinal, type ManagerRecap } from "@/lib/weekly/recap";
import { FIRST_DOWN_YELLOW } from "@/theme";
import { useAuth } from "./AuthProvider";
import ManagerAvatar from "./ManagerAvatar";

// Personalized recap of the week's games. It pops up once per week for the
// logged-in manager, and stays closed after they X it out until the next week
// is published (RECAP_WEEK in src/content/recaps.ts). Anyone can reopen it from
// the header or from the week's news recap, and pick any manager's recap.

const DISMISS_KEY = "ff:recap-dismissed";

const MISTAKE_COLORS: Record<MistakeKind, "warning" | "error" | "secondary" | "info" | "default"> = {
  Bench: "warning",
  Lineup: "error",
  Trade: "secondary",
  Waiver: "info",
  Drop: "default",
};
const recapWeek = weeklyData.find((w) => w.week === RECAP_WEEK) ?? null;

function dismissedWeek(manager: string): number | null {
  try {
    const all = JSON.parse(localStorage.getItem(DISMISS_KEY) ?? "{}");
    return typeof all[manager] === "number" ? all[manager] : null;
  } catch {
    return null;
  }
}

function rememberDismissed(manager: string) {
  try {
    const all = JSON.parse(localStorage.getItem(DISMISS_KEY) ?? "{}");
    localStorage.setItem(DISMISS_KEY, JSON.stringify({ ...all, [manager]: RECAP_WEEK }));
  } catch {
    // Storage blocked: the recap just shows again next visit.
  }
}

interface RecapContextValue {
  /** Whether there's a recap to show at all. */
  available: boolean;
  week: number;
  /** Opens the recap: the logged-in manager's, or a manager picker. */
  openRecap: () => void;
}

const RecapContext = createContext<RecapContextValue>({ available: false, week: RECAP_WEEK, openRecap: () => {} });

export const useRecap = () => useContext(RecapContext);

export default function RecapProvider({ children }: { children: React.ReactNode }) {
  const { user, ready } = useAuth();
  // Opened by hand (header button, news link, picker); `viewing` null shows the manager picker.
  const [manual, setManual] = useState<{ viewing: string | null } | null>(null);
  // Manager who closed it during this visit, so it doesn't pop back up before storage is re-read.
  const [closedBy, setClosedBy] = useState<string | null>(null);

  const me = user?.manager ?? null;

  // Pop up for the logged-in manager, once per week. `ready` only turns true
  // after the client-side login check, so this never runs during the static render.
  const autoOpen = !!(ready && me && recapWeek && recapStories[me] && closedBy !== me && dismissedWeek(me) !== RECAP_WEEK);
  const open = manual !== null || autoOpen;
  const viewing = manual ? manual.viewing : me;
  const setViewing = useCallback((v: string | null) => setManual({ viewing: v }), []);

  const close = useCallback(() => {
    setManual(null);
    if (me) {
      setClosedBy(me);
      rememberDismissed(me);
    }
  }, [me]);

  const openRecap = useCallback(() => {
    setManual({ viewing: me && recapStories[me] ? me : null });
  }, [me]);

  const value = useMemo(() => ({ available: !!recapWeek, week: RECAP_WEEK, openRecap }), [openRecap]);

  const recap = viewing && recapWeek ? managerRecap(recapWeek, viewing) : null;

  return (
    <RecapContext.Provider value={value}>
      {children}
      {recapWeek && (
        <Dialog
          open={open}
          onClose={close}
          fullWidth
          maxWidth="sm"
          aria-labelledby="weekly-recap-title"
          slotProps={{ paper: { sx: { overflow: "hidden" } } }}
        >
          <IconButton
            aria-label="Close recap"
            onClick={close}
            sx={{ position: "absolute", top: 8, right: 8, zIndex: 1, color: "#fff", bgcolor: "rgba(0,0,0,0.25)", "&:hover": { bgcolor: "rgba(0,0,0,0.4)" } }}
          >
            <CloseIcon />
          </IconButton>
          {recap ? (
            <RecapBody recap={recap} isMe={viewing === me} onPickAnother={() => setViewing(null)} onDone={close} />
          ) : (
            <ManagerPicker onPick={setViewing} />
          )}
        </Dialog>
      )}
    </RecapContext.Provider>
  );
}

/** Turf-striped banner across the top of the dialog, like the hero. */
function Banner({ children }: { children: React.ReactNode }) {
  return (
    <Box
      sx={(theme) => ({
        color: "#fff",
        px: { xs: 2.5, sm: 3.5 },
        pt: 3,
        pb: 2.5,
        backgroundColor: "#2b7a3d",
        backgroundImage: "repeating-linear-gradient(90deg, #2e8040 0 10%, #286f37 10% 20%)",
        borderBottom: `4px solid ${FIRST_DOWN_YELLOW}`,
        ...theme.applyStyles("dark", {
          backgroundColor: "#173f22",
          backgroundImage: "repeating-linear-gradient(90deg, #1b4a28 0 10%, #173f22 10% 20%)",
        }),
      })}
    >
      {children}
    </Box>
  );
}

function ScoreSide({ manager, points, winner }: { manager: string; points: number; winner: boolean }) {
  return (
    <Stack spacing={0.75} sx={{ alignItems: "center", flex: 1, minWidth: 0, opacity: winner ? 1 : 0.75 }}>
      <ManagerAvatar name={manager} size={52} sx={{ border: 2, borderColor: winner ? FIRST_DOWN_YELLOW : "rgba(255,255,255,0.6)" }} />
      <Typography sx={{ fontWeight: 600, fontSize: "0.95rem" }} noWrap>
        {manager}
      </Typography>
      <Typography
        sx={{ fontFamily: "var(--font-display)", fontSize: "1.9rem", fontWeight: 700, lineHeight: 1, fontVariantNumeric: "tabular-nums" }}
      >
        {points.toFixed(2)}
      </Typography>
    </Stack>
  );
}

function RecapBody({
  recap,
  isMe,
  onPickAnother,
  onDone,
}: {
  recap: ManagerRecap;
  isMe: boolean;
  onPickAnother: () => void;
  onDone: () => void;
}) {
  const story = recapStories[recap.manager];
  const row = standings.find((s) => s.manager === recap.manager);
  const next = currentMatchups.matchups
    .map((m) => m.teams.map((t) => t.manager))
    .find((names) => names.includes(recap.manager))
    ?.find((n) => n !== recap.manager);
  const result = recap.tied ? "T" : recap.won ? "W" : "L";
  const margin = Math.abs(recap.points - recap.opponentPoints).toFixed(2);

  const stats: string[] = [
    `${ordinal(recap.scoreRank)}-highest score of ${recap.teamCount}`,
    `${recap.points >= recap.projected ? "Beat" : "Missed"} projection by ${Math.abs(recap.points - recap.projected).toFixed(2)}`,
  ];
  if (recap.topPlayer) stats.push(`MVP: ${recap.topPlayer.name} ${recap.topPlayer.points.toFixed(2)}`);
  stats.push(recap.leftOnBench > 0 ? `Left ${recap.leftOnBench.toFixed(2)} on the bench` : "Perfect lineup");

  return (
    <>
      <Banner>
        <Typography variant="overline" sx={{ display: "block", opacity: 0.9, lineHeight: 1.5 }} id="weekly-recap-title">
          Week {recap.week} recap{isMe ? ` · for ${recap.manager}` : ` · ${recap.manager}`}
        </Typography>
        <Stack direction="row" spacing={1} sx={{ alignItems: "center", mt: 1.5 }}>
          <ScoreSide manager={recap.manager} points={recap.points} winner={recap.won} />
          <Stack sx={{ alignItems: "center" }}>
            <Box
              sx={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "1.1rem",
                px: 1.25,
                py: 0.25,
                borderRadius: 1,
                color: recap.won ? "#14211a" : "#fff",
                bgcolor: recap.won ? FIRST_DOWN_YELLOW : "rgba(0,0,0,0.35)",
              }}
            >
              {result}
            </Box>
            <Typography variant="caption" sx={{ mt: 0.5, opacity: 0.85, whiteSpace: "nowrap" }}>
              by {margin}
            </Typography>
          </Stack>
          <ScoreSide manager={recap.opponent} points={recap.opponentPoints} winner={!recap.won && !recap.tied} />
        </Stack>
      </Banner>
      <DialogContent sx={{ px: { xs: 2.5, sm: 3.5 }, py: 3 }}>
        <Stack spacing={2}>
          {story && (
            <>
              <Typography variant="h5" component="p" sx={{ fontWeight: 700, lineHeight: 1.25 }}>
                {story.headline}
              </Typography>
              <Typography sx={{ lineHeight: 1.7 }}>{story.story}</Typography>
            </>
          )}
          <Stack direction="row" sx={{ flexWrap: "wrap", gap: 1 }}>
            {stats.map((s) => (
              <Chip key={s} label={s} size="small" variant="outlined" />
            ))}
          </Stack>
          {story && story.mistakes.length > 0 && (
            <Box>
              <Typography variant="overline" color="text.secondary" component="h3">
                Film room: what went wrong
              </Typography>
              <Stack component="ul" spacing={1.25} sx={{ listStyle: "none", p: 0, m: 0, mt: 0.5 }}>
                {story.mistakes.map((m) => (
                  <Stack component="li" key={m.text} direction="row" spacing={1.25} sx={{ alignItems: "flex-start" }}>
                    <Chip
                      label={m.kind}
                      size="small"
                      color={MISTAKE_COLORS[m.kind]}
                      sx={{ minWidth: 64, fontWeight: 600, flexShrink: 0, mt: 0.125 }}
                    />
                    <Typography variant="body2" sx={{ lineHeight: 1.6 }}>
                      {m.text}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
            </Box>
          )}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1}
            sx={{ justifyContent: "space-between", alignItems: { xs: "stretch", sm: "center" }, pt: 1, borderTop: 1, borderColor: "divider" }}
          >
            <Typography variant="body2" color="text.secondary" sx={{ pt: 1 }}>
              {row && `Now ${row.wins}-${row.losses}${row.ties ? `-${row.ties}` : ""} (${row.streak})`}
              {row && next && " · "}
              {next && `Week ${currentMatchups.week}: vs ${next}`}
            </Typography>
            <Stack direction="row" spacing={1} sx={{ pt: 1, justifyContent: "flex-end" }}>
              <Button size="small" onClick={onPickAnother}>
                Other recaps
              </Button>
              <Button size="small" variant="contained" onClick={onDone}>
                Got it
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </DialogContent>
    </>
  );
}

function ManagerPicker({ onPick }: { onPick: (manager: string) => void }) {
  const managers = Object.keys(recapStories).sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));
  return (
    <>
      <Banner>
        <Typography variant="overline" sx={{ display: "block", opacity: 0.9, lineHeight: 1.5 }} id="weekly-recap-title">
          Week {RECAP_WEEK} recaps
        </Typography>
        <Typography variant="h5" component="p" sx={{ fontWeight: 700, mt: 0.5 }}>
          Whose week do you want to relive?
        </Typography>
      </Banner>
      <DialogContent sx={{ px: { xs: 2, sm: 3 }, py: 3 }}>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "repeat(3, 1fr)", sm: "repeat(4, 1fr)" }, gap: 1 }}>
          {managers.map((m) => (
            <ButtonBase
              key={m}
              onClick={() => onPick(m)}
              sx={{ flexDirection: "column", gap: 0.75, py: 1.5, borderRadius: 2, "&:hover": { bgcolor: "action.hover" } }}
            >
              <ManagerAvatar name={m} size={48} />
              <Typography variant="body2" sx={{ fontWeight: 600 }}>
                {m}
              </Typography>
            </ButtonBase>
          ))}
        </Box>
      </DialogContent>
    </>
  );
}

/** Small link that opens the recap; used in the week's news recap. */
export function RecapLink({ week }: { week: number }) {
  const { available, week: current, openRecap } = useRecap();
  const { user } = useAuth();
  if (!available || week !== current) return null;
  return (
    <Button
      size="small"
      onClick={openRecap}
      sx={{ mt: 1, px: 1, ml: -1, textTransform: "none", fontWeight: 600 }}
    >
      {user ? `Your personalized Week ${week} recap →` : `Personalized Week ${week} recaps for every manager →`}
    </Button>
  );
}
