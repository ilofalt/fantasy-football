"use client";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import FootballIcon from "./FootballIcon";
import { FIRST_DOWN_YELLOW } from "@/theme";
import { currentMatchups } from "@/content/matchups";

// Yard markers between the goal lines, one every ten yards.
const YARD_NUMBERS = [10, 20, 30, 40, 50, 40, 30, 20, 10];
// Each end zone takes this share of the field's width.
const END_ZONE = 8;
const playWidth = 100 - END_ZONE * 2;

export default function Hero() {
  return (
    <Box component="section" id="home" sx={{ pt: { xs: 3, md: 5 }, pb: { xs: 3, md: 4 } }}>
      <Container maxWidth="md">
        <Box
          sx={(theme) => ({
            position: "relative",
            overflow: "hidden",
            borderRadius: 3,
            color: "#fff",
            px: { xs: `calc(${END_ZONE}% + 16px)`, md: `calc(${END_ZONE}% + 32px)` },
            pt: { xs: 4, md: 6 },
            pb: { xs: 6, md: 8 },
            // Layers, top to bottom: yard lines every 10 yards, then mowed turf stripes.
            backgroundColor: "#2b7a3d",
            backgroundImage: [
              `repeating-linear-gradient(90deg, rgba(255,255,255,0.55) 0 2px, transparent 2px 10%)`,
              "repeating-linear-gradient(90deg, #2e8040 0 5%, #286f37 5% 10%)",
            ].join(","),
            backgroundSize: `${playWidth}% 100%`,
            backgroundPosition: "50% 0",
            backgroundRepeat: "no-repeat",
            boxShadow: "inset 0 0 0 3px rgba(255,255,255,0.85)",
            ...theme.applyStyles("dark", {
              // Night game: darker turf under the stadium lights.
              backgroundColor: "#173f22",
              backgroundImage: [
                "radial-gradient(ellipse at 50% -20%, rgba(255,255,230,0.18), transparent 60%)",
                `repeating-linear-gradient(90deg, rgba(255,255,255,0.35) 0 2px, transparent 2px 10%)`,
                "repeating-linear-gradient(90deg, #1b4a28 0 5%, #173f22 5% 10%)",
              ].join(","),
              backgroundSize: `100% 100%, ${playWidth}% 100%, ${playWidth}% 100%`,
              backgroundPosition: "0 0, 50% 0, 50% 0",
              boxShadow: "inset 0 0 0 3px rgba(255,255,255,0.5)",
            }),
          })}
        >
          {/* End zones */}
          {(["left", "right"] as const).map((side) => (
            <Box
              key={side}
              aria-hidden="true"
              sx={(theme) => ({
                position: "absolute",
                top: 0,
                bottom: 0,
                [side]: 0,
                width: `${END_ZONE}%`,
                backgroundColor: "#1f5c2e",
                borderInline: "3px solid rgba(255,255,255,0.85)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                ...theme.applyStyles("dark", { backgroundColor: "#11301a", borderColor: "rgba(255,255,255,0.5)" }),
              })}
            >
              <Typography
                component="span"
                sx={{
                  fontFamily: "var(--font-display), 'Oswald', 'Arial Narrow', Impact, sans-serif",
                  fontWeight: 700,
                  fontSize: { xs: "0.7rem", md: "1rem" },
                  letterSpacing: "0.3em",
                  color: "rgba(255,255,255,0.75)",
                  writingMode: "vertical-rl",
                  transform: side === "left" ? "rotate(180deg)" : undefined,
                  whiteSpace: "nowrap",
                }}
              >
                LEAGUE 55635
              </Typography>
            </Box>
          ))}

          {/* Yard numbers along the bottom of the field */}
          <Box
            aria-hidden="true"
            sx={{ position: "absolute", left: `${END_ZONE}%`, right: `${END_ZONE}%`, bottom: { xs: 6, md: 10 }, height: 20 }}
          >
            {YARD_NUMBERS.map((n, i) => (
              <Box
                key={i}
                component="span"
                sx={{
                  position: "absolute",
                  left: `${(i + 1) * 10}%`,
                  transform: "translateX(-50%)",
                  fontFamily: "var(--font-display), 'Oswald', 'Arial Narrow', Impact, sans-serif",
                  fontWeight: 700,
                  fontSize: { xs: "0.7rem", md: "1rem" },
                  color: "rgba(255,255,255,0.7)",
                }}
              >
                {n}
              </Box>
            ))}
          </Box>

          <Stack spacing={1} sx={{ position: "relative" }}>
            <Typography variant="overline" sx={{ color: FIRST_DOWN_YELLOW, lineHeight: 1.4 }}>
              2026 Season · Week {currentMatchups.week}
            </Typography>
            <Stack direction="row" spacing={1.5} sx={{ alignItems: "center" }}>
              <FootballIcon size={44} sx={{ display: { xs: "none", sm: "inline-block" } }} />
              <Typography
                variant="h3"
                component="h1"
                sx={{
                  fontWeight: 700,
                  fontSize: { xs: "2.25rem", md: "3.5rem" },
                  lineHeight: 1,
                  textShadow: "0 2px 0 rgba(0,0,0,0.25)",
                }}
              >
                Fantasy Football
              </Typography>
            </Stack>
            <Typography variant="body1" sx={{ color: "rgba(255,255,255,0.85)", maxWidth: 460 }}>
              Twelve managers, one trophy, and a lot of bad lineup decisions.
            </Typography>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
