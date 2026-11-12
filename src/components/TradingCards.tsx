"use client";

import { useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { CARD_TEXT } from "@/content/cards";
import { history } from "@/content/history";
import { standings } from "@/content/standings";
import { teamImage } from "@/content/teamImages";
import {
  bestAndWorstWeek,
  managerGames,
  nemesisAndVictim,
  recordText,
  seasonLines,
  slug,
  tally,
  winPct,
} from "@/lib/history/stats";
import { seedTeams, type SeededTeam } from "@/lib/playoffs/seed";
import FootballIcon from "./FootballIcon";
import Permalink from "./Permalink";

const SEASON = Math.max(...history.games.map((g) => g.year));
const display = "var(--font-display), 'Oswald', 'Arial Narrow', Impact, sans-serif";
const seeded = seedTeams(standings);
const LAST = seeded.length;

type Rarity = "Legendary" | "Rare" | "Common" | "Bust";
const rarityOf = (seed: number): Rarity => (seed === 1 ? "Legendary" : seed <= 6 ? "Rare" : seed === LAST ? "Bust" : "Common");

const FRAME: Record<Rarity, string> = {
  Legendary: "linear-gradient(135deg, #f7d774 0%, #b8860b 30%, #fff1b8 50%, #c9962b 70%, #8a6408 100%)",
  Rare: "linear-gradient(135deg, #f3f4f6 0%, #9ca3af 30%, #ffffff 50%, #a1a1aa 70%, #52525b 100%)",
  Common: "linear-gradient(135deg, #2e8040 0%, #1b6e3a 100%)",
  Bust: "linear-gradient(135deg, #8b7d6b 0%, #5c5145 100%)",
};
const RARITY_INK: Record<Rarity, string> = { Legendary: "#8a6408", Rare: "#52525b", Common: "#1b6e3a", Bust: "#5c5145" };
// Cards with a crease across them.
const CREASED = new Set(["Raymond"]);

const pctText = (p: number) => p.toFixed(3).replace(/^0/, "");

function careerOf(name: string) {
  const regular = tally(managerGames(history, name, ["regular"]));
  const seasons = seasonLines(history, name);
  const { best, worst } = bestAndWorstWeek(history, name);
  const { nemesis } = nemesisAndVictim(history, name);
  return {
    regular,
    seasons: seasons.length,
    titles: seasons.filter((s) => s.champion).length,
    playoffTrips: seasons.filter((s) => s.madePlayoffs).length,
    best,
    worst,
    nemesis,
  };
}

function Front({ team, rarity }: { team: SeededTeam; rarity: Rarity }) {
  const name = team.manager;
  const text = CARD_TEXT[name];
  const photo = teamImage(name);
  const games = team.wins + team.losses + team.ties;
  const career = careerOf(name);
  const ink = RARITY_INK[rarity];
  return (
    <Stack spacing={1} sx={{ height: "100%" }}>
      <Stack direction="row" sx={{ alignItems: "baseline", justifyContent: "space-between", gap: 1 }}>
        <Box sx={{ minWidth: 0 }}>
          <Box component="span" sx={{ display: "block", fontFamily: display, fontWeight: 700, fontSize: "1.35rem", lineHeight: 1.05, textTransform: "uppercase" }}>
            {name}
          </Box>
          <Box component="span" sx={{ display: "block", fontSize: "0.7rem", fontStyle: "italic", color: "#5b554a" }}>
            {text?.position}
          </Box>
        </Box>
        <Box component="span" sx={{ fontFamily: display, fontWeight: 700, color: "#b42318", whiteSpace: "nowrap", fontSize: "0.95rem" }}>
          <Box component="span" sx={{ fontSize: "0.65rem", mr: 0.25 }}>HP</Box>
          {Math.round(team.pointsFor)}
        </Box>
      </Stack>

      <Box
        sx={{
          position: "relative",
          aspectRatio: "16 / 10",
          borderRadius: 1,
          overflow: "hidden",
          border: "3px solid",
          borderColor: ink,
          backgroundColor: "#2b7a3d",
          backgroundImage: "repeating-linear-gradient(90deg, #2e8040 0 10%, #286f37 10% 20%)",
          display: "grid",
          placeItems: "center",
        }}
      >
        {photo ? (
          <Box
            component="img"
            src={photo}
            alt=""
            sx={{ width: "100%", height: "100%", objectFit: "cover", filter: rarity === "Bust" ? "grayscale(1) contrast(1.1)" : undefined }}
          />
        ) : (
          <Box component="span" sx={{ fontFamily: display, fontSize: "4.5rem", fontWeight: 700, color: "rgba(255,255,255,0.9)", textShadow: "0 3px 0 rgba(0,0,0,0.25)" }}>
            {name.charAt(0).toUpperCase()}
          </Box>
        )}
        <Box component="span" sx={{ position: "absolute", top: 6, left: 6, px: 0.75, py: 0.25, borderRadius: 0.75, bgcolor: "rgba(0,0,0,0.65)", color: "#fff", fontFamily: display, fontSize: "0.7rem", letterSpacing: "0.08em" }}>
          SEED {team.seed}
        </Box>
        <Box component="span" sx={{ position: "absolute", bottom: 6, right: 6, px: 0.75, py: 0.25, borderRadius: 0.75, background: FRAME[rarity], color: rarity === "Common" || rarity === "Bust" ? "#fff" : "#1c1a16", fontFamily: display, fontWeight: 700, fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", boxShadow: "0 1px 2px rgba(0,0,0,0.4)" }}>
          {rarity}
        </Box>
      </Box>

      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 0.5, textAlign: "center" }}>
        {[
          [String(SEASON), `${team.wins}-${team.losses}${team.ties ? `-${team.ties}` : ""}`],
          ["PPG", games ? (team.pointsFor / games).toFixed(1) : "–"],
          ["Career", recordText(career.regular)],
        ].map(([label, value]) => (
          <Box key={label} sx={{ bgcolor: "rgba(0,0,0,0.06)", borderRadius: 0.75, py: 0.4 }}>
            <Box component="span" sx={{ display: "block", fontSize: "0.6rem", letterSpacing: "0.1em", color: "#5b554a", fontWeight: 700 }}>
              {label.toUpperCase()}
            </Box>
            <Box component="span" sx={{ display: "block", fontFamily: display, fontWeight: 700, fontSize: "1rem", fontVariantNumeric: "tabular-nums" }}>
              {value}
            </Box>
          </Box>
        ))}
      </Box>

      {text && (
        <>
          <Box sx={{ borderTop: "1px solid rgba(0,0,0,0.15)", pt: 0.75 }}>
            <Stack direction="row" spacing={0.75} sx={{ alignItems: "baseline" }}>
              <Box component="span" sx={{ fontSize: "0.6rem", fontWeight: 800, letterSpacing: "0.08em", color: "#fff", bgcolor: "#b42318", px: 0.6, borderRadius: 0.5 }}>
                ABILITY
              </Box>
              <Box component="span" sx={{ fontFamily: display, fontWeight: 700, fontSize: "0.95rem" }}>
                {text.ability.name}
              </Box>
            </Stack>
            <Box component="span" sx={{ display: "block", fontSize: "0.75rem", lineHeight: 1.35, mt: 0.25 }}>
              {text.ability.text}
            </Box>
          </Box>
          <Box component="span" sx={{ display: "block", fontSize: "0.72rem", lineHeight: 1.35 }}>
            <Box component="strong" sx={{ color: "#5b554a" }}>Weakness: </Box>
            {text.weakness}
          </Box>
          <Box component="span" sx={{ display: "block", fontSize: "0.68rem", fontStyle: "italic", color: "#5b554a", lineHeight: 1.35, mt: "auto !important", pt: 0.5, borderTop: "1px solid rgba(0,0,0,0.1)" }}>
            {text.flavor}
          </Box>
        </>
      )}
      <Stack direction="row" sx={{ justifyContent: "space-between", fontSize: "0.6rem", color: "#7a7365", letterSpacing: "0.06em" }}>
        <span>LEAGUE 55635 · {SEASON} SERIES</span>
        <span>
          {String(team.seed).padStart(2, "0")}/{LAST}
        </span>
      </Stack>
    </Stack>
  );
}

function Back({ team }: { team: SeededTeam }) {
  const name = team.manager;
  const c = careerOf(name);
  const rows: [string, string][] = [
    ["Career record", `${recordText(c.regular)} (${pctText(winPct(c.regular))})`],
    ["Seasons", String(c.seasons)],
    ["Playoff trips", String(c.playoffTrips)],
    ["Titles", c.titles ? String(c.titles) : "None"],
    ["Points per game", c.regular.games ? (c.regular.pf / c.regular.games).toFixed(1) : "–"],
    ["Best week", c.best ? `${c.best.pf.toFixed(2)} (${c.best.year} Wk ${c.best.week})` : "–"],
    ["Worst week", c.worst ? `${c.worst.pf.toFixed(2)} (${c.worst.year} Wk ${c.worst.week})` : "–"],
    ["Nemesis", c.nemesis ? `${c.nemesis.opponent} (${recordText(c.nemesis.record)})` : "None yet"],
  ];
  return (
    <Stack spacing={1.25} sx={{ height: "100%", color: "#fff" }}>
      <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
        <FootballIcon size={28} />
        <Box component="span" sx={{ fontFamily: display, fontWeight: 700, fontSize: "1.35rem", textTransform: "uppercase", lineHeight: 1 }}>
          {name}
        </Box>
      </Stack>
      <Box component="span" sx={{ fontFamily: display, fontSize: "0.75rem", letterSpacing: "0.14em", color: "#facc15" }}>
        CAREER STATS · REGULAR SEASON
      </Box>
      <Box component="dl" sx={{ m: 0, display: "grid", gridTemplateColumns: "auto 1fr", columnGap: 1.5, rowGap: 0.6, fontSize: "0.78rem" }}>
        {rows.map(([k, v]) => (
          <Box key={k} sx={{ display: "contents" }}>
            <Box component="dt" sx={{ color: "rgba(255,255,255,0.7)" }}>{k}</Box>
            <Box component="dd" sx={{ m: 0, fontWeight: 700, textAlign: "right", fontVariantNumeric: "tabular-nums" }}>{v}</Box>
          </Box>
        ))}
      </Box>
      <Box sx={{ mt: "auto !important", textAlign: "center", fontSize: "0.65rem", letterSpacing: "0.1em", color: "rgba(255,255,255,0.7)" }}>
        TAP TO FLIP BACK
      </Box>
    </Stack>
  );
}

function TradingCard({ team }: { team: SeededTeam }) {
  const [flipped, setFlipped] = useState(false);
  const tiltRef = useRef<HTMLDivElement>(null);
  const rarity = rarityOf(team.seed);
  const shiny = rarity === "Legendary" || rarity === "Rare";
  const name = team.manager;

  function onMove(e: PointerEvent<HTMLDivElement>) {
    const el = tiltRef.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--rx", `${(x - 0.5) * 14}deg`);
    el.style.setProperty("--ry", `${(0.5 - y) * 14}deg`);
    el.style.setProperty("--mx", `${x * 100}%`);
    el.style.setProperty("--my", `${y * 100}%`);
  }
  function onLeave() {
    const el = tiltRef.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  }
  function onKey(e: KeyboardEvent<HTMLDivElement>) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      setFlipped((f) => !f);
    }
  }

  const face = {
    gridArea: "1 / 1",
    backfaceVisibility: "hidden",
    WebkitBackfaceVisibility: "hidden",
    borderRadius: "14px",
    p: "9px",
    background: FRAME[rarity],
    boxShadow: "0 6px 18px rgba(0,0,0,0.25)",
  } as const;

  return (
    <Box id={`${slug(name)}-card`} sx={{ perspective: "1200px" }}>
      <Box
        ref={tiltRef}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        sx={{
          "--rx": "0deg",
          "--ry": "0deg",
          "--mx": "50%",
          "--my": "50%",
          transform: "rotateY(var(--rx)) rotateX(var(--ry))",
          transition: "transform 0.15s ease-out",
          transformStyle: "preserve-3d",
          "@media (prefers-reduced-motion: reduce)": { transform: "none" },
        }}
      >
        <Box
          role="button"
          tabIndex={0}
          aria-pressed={flipped}
          aria-label={`${name}'s trading card. ${flipped ? "Showing career stats." : ""} Flip card`}
          onClick={() => setFlipped((f) => !f)}
          onKeyDown={onKey}
          sx={{
            display: "grid",
            cursor: "pointer",
            transformStyle: "preserve-3d",
            transition: "transform 0.6s cubic-bezier(0.2, 0.7, 0.2, 1)",
            transform: flipped ? "rotateY(180deg)" : "none",
            borderRadius: "14px",
            outline: "none",
            "&:focus-visible": { boxShadow: (t) => `0 0 0 3px ${t.palette.primary.main}` },
            "@media (prefers-reduced-motion: reduce)": { transition: "none" },
          }}
        >
          {/* Front */}
          <Box sx={face} aria-hidden={flipped}>
            <Box
              sx={{
                position: "relative",
                height: "100%",
                borderRadius: "8px",
                bgcolor: "#fbf8ef",
                color: "#1c1a16",
                p: 1.25,
                overflow: "hidden",
              }}
            >
              <Front team={team} rarity={rarity} />
              {shiny && (
                <Box
                  aria-hidden="true"
                  sx={{
                    position: "absolute",
                    inset: 0,
                    pointerEvents: "none",
                    mixBlendMode: "color-dodge",
                    opacity: 0.35,
                    background:
                      rarity === "Legendary"
                        ? "radial-gradient(circle at var(--mx) var(--my), rgba(255,240,180,0.9), transparent 45%), linear-gradient(115deg, transparent 20%, rgba(255,215,90,0.5) 40%, rgba(255,255,255,0.6) 50%, rgba(255,215,90,0.5) 60%, transparent 80%)"
                        : "radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,0.8), transparent 45%), linear-gradient(115deg, transparent 25%, rgba(120,200,255,0.35) 40%, rgba(255,140,220,0.35) 50%, rgba(140,255,180,0.35) 60%, transparent 75%)",
                    backgroundSize: "100% 100%, 250% 250%",
                    backgroundPosition: "0 0, var(--mx) var(--my)",
                  }}
                />
              )}
              {CREASED.has(name) && (
                <Box
                  aria-hidden="true"
                  sx={{
                    position: "absolute",
                    inset: 0,
                    pointerEvents: "none",
                    background:
                      "linear-gradient(28deg, transparent 49.6%, rgba(255,255,255,0.85) 49.8%, rgba(0,0,0,0.18) 50.2%, transparent 50.6%)",
                  }}
                />
              )}
            </Box>
          </Box>

          {/* Back */}
          <Box sx={{ ...face, transform: "rotateY(180deg)" }} aria-hidden={!flipped}>
            <Box
              sx={{
                height: "100%",
                borderRadius: "8px",
                p: 1.5,
                backgroundColor: "#1f5c2e",
                backgroundImage:
                  "repeating-linear-gradient(0deg, rgba(255,255,255,0.18) 0 1px, transparent 1px 12.5%), repeating-linear-gradient(0deg, #2b7a3d 0 6.25%, #256c35 6.25% 12.5%)",
              }}
            >
              <Back team={team} />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default function TradingCards() {
  return (
    <Box component="section" id="cards" sx={{ pb: { xs: 8, md: 12 } }}>
      <Container maxWidth="md">
        <Stack direction="row" sx={{ alignItems: "center", mb: 1 }}>
          <Typography variant="h5" component="h2" sx={{ fontWeight: 700 }}>
            {SEASON} Trading Cards
          </Typography>
          <Permalink tab="cards" anchor="cards" label="the trading cards" />
        </Stack>
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          The complete {SEASON} set, numbered by current seed. The 1 seed is Legendary, the rest of the playoff field is
          Rare, and last place is a Bust. Tap a card to flip it for career stats.
        </Typography>
        <Box
          sx={{
            display: "grid",
            gap: { xs: 3, md: 3.5 },
            gridTemplateColumns: { xs: "minmax(0, 340px)", sm: "repeat(2, minmax(0, 1fr))", md: "repeat(3, minmax(0, 1fr))" },
            justifyContent: "center",
          }}
        >
          {seeded.map((t) => (
            <TradingCard key={t.manager} team={t} />
          ))}
        </Box>
      </Container>
    </Box>
  );
}
