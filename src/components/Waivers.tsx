import type { ReactNode } from "react";
import Permalink from "./Permalink";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import {
  CURRENT_WEEK,
  managerDropRecords,
  managerWaiverRecords,
  seasonDrops,
  weekDrops,
  seasonPickups,
  waiverNotes,
  weekPickups,
  WAIVERS_UPDATED,
  type Drop,
  type Pickup,
} from "@/content/waivers";

export function acquiredLabel(p: Pickup): string {
  if (p.method === "Free agent") return `Free agent · ${p.added}`;
  return `${p.cost > 0 ? `$${p.cost}` : "$0"} waiver claim · ${p.added}`;
}

function PickupList({ pickups, label, showWeeks }: { pickups: Pickup[]; label: string; showWeeks: boolean }) {
  return (
    <Box component="ol" aria-label={label} sx={{ listStyle: "none", p: 0, m: 0 }}>
      {pickups.map((p, i) => (
        <Box
          component="li"
          key={`${p.player}-${p.manager}`}
          sx={{
            display: "grid",
            gridTemplateColumns: "2rem 1fr auto",
            columnGap: 1.5,
            py: 2,
            borderBottom: 1,
            borderColor: "divider",
            "&:last-of-type": { borderBottom: 0 },
          }}
        >
          <Typography color="text.secondary" sx={{ fontWeight: 700, fontVariantNumeric: "tabular-nums" }}>
            {i + 1}
          </Typography>
          <Box sx={{ minWidth: 0 }}>
            <Typography sx={{ fontWeight: 600 }}>
              {p.player}{" "}
              <Typography component="span" variant="body2" color="text.secondary">
                {p.position}
              </Typography>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {p.manager} · {acquiredLabel(p)}
              {showWeeks && ` · ${p.weeksOnRoster} ${p.weeksOnRoster === 1 ? "week" : "weeks"}`}
              {p.status && ` · ${p.status}`}
            </Typography>
            <Typography variant="body2" sx={{ mt: 0.75, lineHeight: 1.6 }}>
              {p.blurb}
            </Typography>
          </Box>
          <Typography
            variant="h6"
            component="p"
            data-testid="pickup-points"
            sx={{ fontWeight: 700, fontVariantNumeric: "tabular-nums", textAlign: "right" }}
          >
            {p.points.toFixed(2)}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}

function DropList({ drops, label, showWeeks }: { drops: Drop[]; label: string; showWeeks: boolean }) {
  return (
    <Box component="ol" aria-label={label} sx={{ listStyle: "none", p: 0, m: 0 }}>
      {drops.map((d, i) => (
        <Box
          component="li"
          key={`${d.player}-${d.manager}`}
          sx={{
            display: "grid",
            gridTemplateColumns: "2rem 1fr auto",
            columnGap: 1.5,
            py: 2,
            borderBottom: 1,
            borderColor: "divider",
            "&:last-of-type": { borderBottom: 0 },
          }}
        >
          <Typography color="text.secondary" sx={{ fontWeight: 700, fontVariantNumeric: "tabular-nums" }}>
            {i + 1}
          </Typography>
          <Box sx={{ minWidth: 0 }}>
            <Typography sx={{ fontWeight: 600 }}>
              {d.player}{" "}
              <Typography component="span" variant="body2" color="text.secondary">
                {d.position}
              </Typography>
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Dropped by {d.manager} · {d.dropped}
              {showWeeks && ` · ${d.weeksAfter} ${d.weeksAfter === 1 ? "week" : "weeks"} since`}
              {` · ${d.whereNow}`}
            </Typography>
            <Typography variant="body2" sx={{ mt: 0.75, lineHeight: 1.6 }}>
              {d.blurb}
            </Typography>
          </Box>
          <Typography
            variant="h6"
            component="p"
            data-testid="drop-points"
            sx={{ fontWeight: 700, fontVariantNumeric: "tabular-nums", textAlign: "right", color: "error.main" }}
          >
            {d.pointsAfter.toFixed(2)}
          </Typography>
        </Box>
      ))}
    </Box>
  );
}

function Section({ id, title, subtitle, children }: { id: string; title: string; subtitle: string; children: ReactNode }) {
  return (
    <Card variant="outlined" id={id} sx={{ p: { xs: 2.5, md: 3 } }}>
      <Stack direction="row" sx={{ alignItems: "center" }}>
        <Typography variant="h6" component="h3" sx={{ fontWeight: 700 }}>
          {title}
        </Typography>
        <Permalink tab="waivers" anchor={id} label={title} />
      </Stack>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
        {subtitle}
      </Typography>
      {children}
    </Card>
  );
}

export default function Waivers() {
  const managers = [...managerWaiverRecords].sort((a, b) => b.points - a.points);
  const droppers = [...managerDropRecords].sort((a, b) => b.pointsGivenAway - a.pointsGivenAway);
  return (
    <Box component="section" id="waivers" sx={{ pb: { xs: 8, md: 12 } }}>
      <Container maxWidth="md">
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1}
          sx={{ justifyContent: "space-between", alignItems: { sm: "baseline" }, mb: 1 }}
        >
          <Typography variant="h5" component="h2" sx={{ fontWeight: 700 }}>
            Waiver Wire
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Updated {WAIVERS_UPDATED}
          </Typography>
        </Stack>
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          The best pickups, scored by the fantasy points each player put up while on the roster of the team that added
          him, and the worst drops, scored by what players put up after being let go. Re-adding your own draft pick
          doesn&apos;t count as a pickup.
        </Typography>

        <Stack spacing={3}>
          <Section id="week-pickups" title={`Best pickups of Week ${CURRENT_WEEK}`} subtitle="Players added this week, by points this week.">
            <PickupList pickups={weekPickups} label={`Best pickups of Week ${CURRENT_WEEK}`} showWeeks={false} />
          </Section>

          <Section id="season-pickups" title="Best pickups of the season" subtitle="Total points for the team that added him.">
            <PickupList pickups={seasonPickups} label="Best pickups of the season" showWeeks />
          </Section>

          <Section id="wire-records" title="Who works the wire best" subtitle="Points from pickups, number of pickups, and FAAB spent this season.">
            <Box component="table" sx={{ width: "100%", borderCollapse: "collapse", fontVariantNumeric: "tabular-nums" }}>
              <Box component="thead">
                <Box component="tr" sx={{ "& th": { textAlign: "right", py: 1, fontWeight: 600, fontSize: "0.875rem", color: "text.secondary", borderBottom: 1, borderColor: "divider" } }}>
                  <Box component="th" scope="col" sx={{ textAlign: "left !important" }}>
                    Manager
                  </Box>
                  <Box component="th" scope="col">Points</Box>
                  <Box component="th" scope="col">Pickups</Box>
                  <Box component="th" scope="col">FAAB</Box>
                </Box>
              </Box>
              <Box component="tbody">
                {managers.map((m) => (
                  <Box
                    component="tr"
                    key={m.manager}
                    sx={{ "& td": { textAlign: "right", py: 1, borderBottom: 1, borderColor: "divider" }, "&:last-of-type td": { borderBottom: 0 } }}
                  >
                    <Box component="td" sx={{ textAlign: "left !important" }}>
                      {m.manager}
                    </Box>
                    <Box component="td" sx={{ fontWeight: 600 }}>
                      {m.points.toFixed(1)}
                    </Box>
                    <Box component="td">{m.pickups}</Box>
                    <Box component="td">${m.faabSpent}</Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </Section>

          <Section id="week-drops" title={`Worst drops of Week ${CURRENT_WEEK}`} subtitle="Players dropped this week, by what they scored after.">
            <DropList drops={weekDrops} label={`Worst drops of Week ${CURRENT_WEEK}`} showWeeks={false} />
          </Section>

          <Section
            id="season-drops"
            title="Worst drops of the season"
            subtitle="Everything a player scored after he was dropped, until the same team picked him back up."
          >
            <DropList drops={seasonDrops} label="Worst drops of the season" showWeeks />
          </Section>

          <Section
            id="points-given-away"
            title="Points given away"
            subtitle="Total points every player a manager dropped went on to score. More drops means more chances to regret one."
          >
            <Box component="ol" aria-label="Points given away" sx={{ listStyle: "none", p: 0, m: 0 }}>
              {droppers.map((m) => (
                <Box
                  component="li"
                  key={m.manager}
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    py: 1,
                    borderBottom: 1,
                    borderColor: "divider",
                    "&:last-of-type": { borderBottom: 0 },
                  }}
                >
                  <Typography>
                    {m.manager}{" "}
                    <Typography component="span" variant="body2" color="text.secondary">
                      · {m.drops} {m.drops === 1 ? "drop" : "drops"}
                    </Typography>
                  </Typography>
                  <Typography sx={{ fontWeight: 600, fontVariantNumeric: "tabular-nums" }}>{m.pointsGivenAway.toFixed(1)}</Typography>
                </Box>
              ))}
            </Box>
          </Section>

          <Box sx={{ display: "grid", gap: 2, gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" } }}>
            {waiverNotes.map((note) => (
              <Card key={note.title} variant="outlined" sx={{ p: 2.5 }}>
                <Typography variant="overline" color="primary" sx={{ fontWeight: 700, lineHeight: 1.5 }}>
                  {note.title}
                </Typography>
                <Typography variant="body2" sx={{ mt: 0.5, lineHeight: 1.6 }}>
                  {note.body}
                </Typography>
              </Card>
            ))}
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
