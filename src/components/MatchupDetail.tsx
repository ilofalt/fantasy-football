"use client";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import { teamImage } from "@/content/teamImages";
import { lineupRows, type RosterMatchup, type RosterPlayer, type RosterTeam } from "@/lib/matchups/types";
import Permalink from "./Permalink";

export function ordinal(n: number): string {
  const teen = n % 100 >= 11 && n % 100 <= 13;
  const suffix = teen ? "th" : ({ 1: "st", 2: "nd", 3: "rd" } as Record<number, string>)[n % 10] ?? "th";
  return `${n}${suffix}`;
}

/** "Amon-Ra St. Brown" -> "A. St. Brown", for narrow screens. Defenses keep their name. */
export function shortName(player: Pick<RosterPlayer, "name" | "position">): string {
  if (player.position === "DEF") return player.name;
  const [first, ...rest] = player.name.split(" ");
  return rest.length ? `${first.charAt(0)}. ${rest.join(" ")}` : player.name;
}

function ManagerHeader({ team, align }: { team: RosterTeam; align: "left" | "right" }) {
  const right = align === "right";
  return (
    <Stack spacing={1} sx={{ alignItems: right ? "flex-end" : "flex-start", textAlign: right ? "right" : "left", minWidth: 0 }}>
      <Avatar
        src={teamImage(team.manager, team.logoUrl) ?? undefined}
        alt={team.manager}
        sx={{ width: { xs: 64, sm: 88 }, height: { xs: 64, sm: 88 }, fontSize: 32, bgcolor: "primary.main" }}
      >
        {team.manager.charAt(0).toUpperCase()}
      </Avatar>
      <Box sx={{ minWidth: 0, maxWidth: "100%" }}>
        <Typography variant="h6" component="p" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
          {team.manager}
        </Typography>
        <Typography variant="caption" color="text.secondary">
          {team.record} · {ordinal(team.rank)}
        </Typography>
      </Box>
      {team.points !== undefined && (
        <Typography variant="h4" component="p" sx={{ fontWeight: 700, fontVariantNumeric: "tabular-nums", lineHeight: 1 }}>
          {team.points.toFixed(2)}
        </Typography>
      )}
    </Stack>
  );
}

function PlayerCell({ player, align }: { player: RosterPlayer | null; align: "left" | "right" }) {
  const right = align === "right";
  if (!player) {
    return (
      <Typography variant="body2" color="text.secondary" sx={{ textAlign: right ? "right" : "left", fontStyle: "italic" }}>
        Empty
      </Typography>
    );
  }
  const isDefense = player.position === "DEF";
  const dim = player.slot === "IR" || player.game === "Bye";
  return (
    <Stack direction={right ? "row-reverse" : "row"} spacing={1.25} sx={{ alignItems: "center", minWidth: 0, opacity: dim ? 0.6 : 1 }}>
      <Avatar
        src={player.imageUrl ?? undefined}
        alt={player.name}
        variant="rounded"
        slotProps={{ img: { style: { objectFit: isDefense ? "contain" : "cover", objectPosition: "top" } } }}
        sx={{
          width: { xs: 32, sm: 44 },
          height: { xs: 32, sm: 44 },
          bgcolor: "action.hover",
          color: "text.secondary",
          fontSize: 14,
          p: isDefense ? 0.5 : 0,
        }}
      >
        {player.name.charAt(0)}
      </Avatar>
      <Box sx={{ minWidth: 0, flex: 1, textAlign: right ? "right" : "left" }}>
        <Typography variant="body2" sx={{ fontWeight: 600, fontSize: { xs: "0.8rem", sm: "0.875rem" } }} noWrap>
          <Box component="span" sx={{ display: { xs: "none", sm: "inline" } }}>
            {player.name}
          </Box>
          <Box component="span" sx={{ display: { xs: "inline", sm: "none" } }}>
            {shortName(player)}
          </Box>
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ display: "block" }} noWrap>
          {player.position} · {player.nflTeam}
          {player.slot === "IR" ? " · IR" : ""}
        </Typography>
        <Typography variant="caption" color="text.secondary" sx={{ display: { xs: "none", sm: "block" } }} noWrap>
          {player.game}
        </Typography>
      </Box>
      {player.points !== undefined && (
        <Typography
          variant="body2"
          sx={{ fontVariantNumeric: "tabular-nums", fontWeight: 600, flexShrink: 0, fontSize: { xs: "0.8rem", sm: "0.875rem" } }}
        >
          {player.points.toFixed(2)}
        </Typography>
      )}
    </Stack>
  );
}

function Row({ label, left, right }: { label: string; left: RosterPlayer | null; right: RosterPlayer | null }) {
  return (
    <Box
      component="li"
      sx={{
        display: "grid",
        gridTemplateColumns: "minmax(0, 1fr) auto minmax(0, 1fr)",
        columnGap: { xs: 0.75, sm: 2 },
        alignItems: "center",
        py: 1.25,
        borderBottom: 1,
        borderColor: "divider",
      }}
    >
      <PlayerCell player={left} align="left" />
      <Chip
        size="small"
        label={label}
        variant="outlined"
        sx={{ minWidth: { xs: 0, sm: 52 }, fontWeight: 700, fontSize: { xs: "0.65rem", sm: "0.8125rem" }, "& .MuiChip-label": { px: { xs: 0.75, sm: 1 } } }}
      />
      <PlayerCell player={right} align="right" />
    </Box>
  );
}

export function MatchupDetailContent({ matchup, note }: { matchup: RosterMatchup; note?: string }) {
  const [a, b] = matchup.teams;
  const { starters, bench } = lineupRows(a, b);
  return (
    <Stack spacing={3}>
      <Box sx={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) auto minmax(0, 1fr)", alignItems: "start", columnGap: 2 }}>
        <ManagerHeader team={a} align="left" />
        <Typography color="text.secondary" sx={{ alignSelf: "center", fontWeight: 700 }}>
          vs.
        </Typography>
        <ManagerHeader team={b} align="right" />
      </Box>
      {note && (
        <Typography variant="body2" color="text.secondary">
          {note}
        </Typography>
      )}
      <Box>
        <Typography variant="overline" color="text.secondary" sx={{ fontWeight: 700 }}>
          Starters
        </Typography>
        <Box component="ul" aria-label="Starters" sx={{ listStyle: "none", m: 0, p: 0 }}>
          {starters.map((r, i) => (
            <Row key={`${r.slot}-${i}`} label={r.slot === "W/R/T" ? "FLEX" : r.slot} left={r.left} right={r.right} />
          ))}
        </Box>
      </Box>
      {bench.length > 0 && (
        <Box>
          <Typography variant="overline" color="text.secondary" sx={{ fontWeight: 700 }}>
            Bench
          </Typography>
          <Box component="ul" aria-label="Bench" sx={{ listStyle: "none", m: 0, p: 0 }}>
            {bench.map((r, i) => (
              <Row key={i} label="BN" left={r.left} right={r.right} />
            ))}
          </Box>
        </Box>
      )}
    </Stack>
  );
}

export default function MatchupDetail({
  matchup,
  week,
  note,
  onClose,
}: {
  matchup: RosterMatchup | null;
  week: number;
  note?: string;
  onClose: () => void;
}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const title = matchup ? `${matchup.teams[0].manager} vs. ${matchup.teams[1].manager}` : "";
  return (
    <Dialog
      open={matchup !== null}
      onClose={onClose}
      fullScreen={fullScreen}
      maxWidth="md"
      fullWidth
      aria-labelledby="matchup-detail-title"
    >
      {matchup && (
        <>
          <Stack direction="row" spacing={1} sx={{ alignItems: "center", px: 3, pt: 2 }}>
            <Typography id="matchup-detail-title" variant="subtitle1" component="h2" sx={{ fontWeight: 700 }}>
              Week {week}: {title}
            </Typography>
            <Permalink tab="matchups" anchor={matchup.id} label={title} />
            <IconButton aria-label="Close" onClick={onClose} size="small">
              <CloseIcon fontSize="small" />
            </IconButton>
          </Stack>
          <DialogContent>
            <MatchupDetailContent matchup={matchup} note={note} />
          </DialogContent>
        </>
      )}
    </Dialog>
  );
}
