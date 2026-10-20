import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { bubbleNotes, REGULAR_SEASON_WEEKS, standings, STANDINGS_THROUGH_WEEK } from "@/content/standings";
import {
  gamesBack,
  PLAYOFF_TEAMS,
  seedTeams,
  toiletBowlBracket,
  winnersBracket,
  type Bracket,
  type SeededTeam,
} from "@/lib/playoffs/seed";
import Permalink from "./Permalink";

function record(t: SeededTeam): string {
  return t.ties ? `${t.wins}-${t.losses}-${t.ties}` : `${t.wins}-${t.losses}`;
}

function TeamLine({ team }: { team: SeededTeam }) {
  return (
    <Stack direction="row" spacing={1.5} sx={{ alignItems: "baseline" }}>
      <Typography
        component="span"
        color="text.secondary"
        sx={{ width: "1.75rem", fontWeight: 700, fontVariantNumeric: "tabular-nums", flexShrink: 0 }}
      >
        {team.seed}
      </Typography>
      <Typography component="span" sx={{ fontWeight: 600, flex: 1 }}>
        {team.manager}
      </Typography>
      <Typography component="span" variant="body2" color="text.secondary" sx={{ fontVariantNumeric: "tabular-nums" }}>
        {record(team)}
      </Typography>
    </Stack>
  );
}

function BracketCard({
  id,
  title,
  subtitle,
  bracket,
  byeLabel,
  afterRound,
  label,
}: {
  id: string;
  title: string;
  subtitle: string;
  bracket: Bracket;
  byeLabel: string;
  afterRound: string;
  label: string;
}) {
  return (
    <Card variant="outlined" component="section" id={id} aria-label={label} sx={{ p: { xs: 2.5, md: 3 } }}>
      <Stack direction="row" sx={{ alignItems: "center" }}>
        <Typography variant="h6" component="h3" sx={{ fontWeight: 700 }}>
          {title}
        </Typography>
        <Permalink tab="playoffs" anchor={id} label={label} />
      </Stack>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {subtitle}
      </Typography>

      <Typography variant="overline" color="text.secondary" sx={{ fontWeight: 700 }}>
        Round 1 · Week 15
      </Typography>
      <Stack spacing={1.5} sx={{ mt: 0.5, mb: 2.5 }}>
        {bracket.firstRound.map((m) => (
          <Box
            key={`${m.higher.seed}-${m.lower.seed}`}
            data-testid="first-round-matchup"
            sx={{ border: 1, borderColor: "divider", borderRadius: 2, p: 1.5 }}
          >
            <TeamLine team={m.higher} />
            <Typography variant="caption" color="text.secondary" sx={{ display: "block", pl: "2.9rem", my: 0.25 }}>
              vs.
            </Typography>
            <TeamLine team={m.lower} />
          </Box>
        ))}
      </Stack>

      <Typography variant="overline" color="text.secondary" sx={{ fontWeight: 700 }}>
        {byeLabel}
      </Typography>
      <Stack spacing={1} sx={{ mt: 0.5, mb: 2 }}>
        {bracket.byes.map((t) => (
          <Box key={t.seed} data-testid="bye-team" sx={{ border: 1, borderColor: "divider", borderStyle: "dashed", borderRadius: 2, p: 1.5 }}>
            <TeamLine team={t} />
          </Box>
        ))}
      </Stack>

      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.6 }}>
        {afterRound}
      </Typography>
    </Card>
  );
}

export default function Playoffs() {
  const seeded = seedTeams(standings);
  const winners = winnersBracket(seeded);
  const toilet = toiletBowlBracket(seeded);
  const weeksLeft = REGULAR_SEASON_WEEKS - STANDINGS_THROUGH_WEEK;
  const top = winners.byes[0];
  const lowestRemaining = "the lowest remaining seed";

  return (
    <Box component="section" id="playoffs" sx={{ pb: { xs: 8, md: 12 } }}>
      <Container maxWidth="md">
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1}
          sx={{ justifyContent: "space-between", alignItems: { sm: "baseline" }, mb: 1 }}
        >
          <Typography variant="h5" component="h2" sx={{ fontWeight: 700 }}>
            Playoff Picture
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Through Week {STANDINGS_THROUGH_WEEK} · {weeksLeft} weeks left
          </Typography>
        </Stack>
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          If the regular season ended today. The top {PLAYOFF_TEAMS} make the playoffs (Weeks 15–17) and the bottom 6
          play the Toilet Bowl. Ties in the standings are broken by total points for.
        </Typography>

        <Stack spacing={3}>
          <Box sx={{ display: "grid", gap: 3, gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" } }}>
            <BracketCard
              id="playoff-bracket"
              label="Playoff bracket"
              title="Playoffs"
              subtitle="Seeds 1–6"
              bracket={winners}
              byeLabel="First-round bye"
              afterRound={`The bracket reseeds after round 1: ${top.manager} (1) would play ${lowestRemaining}, and ${winners.byes[1].manager} (2) the other winner. The final is Week 17. In a tied playoff game, the higher seed advances.`}
            />
            <BracketCard
              id="toilet-bowl"
              label="Toilet Bowl bracket"
              title="Toilet Bowl"
              subtitle="Seeds 7–12"
              bracket={toilet}
              byeLabel="First-week bye"
              afterRound="Seeds 11 and 12 sit out the first week of the Toilet Bowl."
            />
          </Box>

          <Card variant="outlined" id="standings" sx={{ p: { xs: 2.5, md: 3 } }}>
            <Stack direction="row" sx={{ alignItems: "center", mb: 2 }}>
              <Typography variant="h6" component="h3" sx={{ fontWeight: 700 }}>
                Standings
              </Typography>
              <Permalink tab="playoffs" anchor="standings" label="the standings" />
            </Stack>
            <Box sx={{ overflowX: "auto" }}>
              <Box
                component="table"
                sx={{
                  width: "100%",
                  minWidth: { xs: 0, sm: 420 },
                  borderCollapse: "collapse",
                  fontVariantNumeric: "tabular-nums",
                  "& th, & td": { py: 1, px: 1, borderBottom: 1, borderColor: "divider", textAlign: "right", whiteSpace: "nowrap" },
                  "& th": { fontSize: "0.8125rem", fontWeight: 600, color: "text.secondary" },
                  "& th:nth-of-type(2), & td:nth-of-type(2)": { textAlign: "left", width: "100%" },
                  "& tbody tr:last-of-type td": { borderBottom: 0 },
                  // PA and Streak are hidden on phones so the table fits without scrolling.
                  "& th:nth-of-type(5), & td:nth-of-type(5), & th:nth-of-type(6), & td:nth-of-type(6)": {
                    display: { xs: "none", sm: "table-cell" },
                  },
                }}
              >
                <thead>
                  <tr>
                    <th scope="col">Seed</th>
                    <th scope="col">Manager</th>
                    <th scope="col">W-L</th>
                    <th scope="col">PF</th>
                    <th scope="col">PA</th>
                    <th scope="col">Streak</th>
                    <th scope="col">GB</th>
                  </tr>
                </thead>
                <tbody>
                  {seeded.map((t) => {
                    const gb = gamesBack(t, seeded);
                    const cutLine = t.seed === PLAYOFF_TEAMS;
                    return (
                      <Box
                        component="tr"
                        key={t.manager}
                        sx={cutLine ? { "& td": { borderBottom: 2, borderBottomColor: "primary.main" } } : undefined}
                      >
                        <td>{t.seed}</td>
                        <td>
                          <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                            <span>{t.manager}</span>
                            {t.seed <= 2 && <Chip size="small" variant="outlined" color="primary" label="Bye" />}
                          </Stack>
                        </td>
                        <td>{record(t)}</td>
                        <td>{t.pointsFor.toFixed(2)}</td>
                        <td>{t.pointsAgainst.toFixed(2)}</td>
                        <td>{t.streak}</td>
                        <td>{gb ?? "—"}</td>
                      </Box>
                    );
                  })}
                </tbody>
              </Box>
            </Box>
            <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 1.5 }}>
              The line marks the playoff cut. GB is games behind the 6th seed; 0 means tied on record but behind on points for.
            </Typography>
          </Card>

          <Card variant="outlined" id="bubble" sx={{ p: { xs: 2.5, md: 3 } }}>
            <Stack direction="row" sx={{ alignItems: "center", mb: 1 }}>
              <Typography variant="h6" component="h3" sx={{ fontWeight: 700 }}>
                On the bubble
              </Typography>
              <Permalink tab="playoffs" anchor="bubble" label="the playoff bubble" />
            </Stack>
            <Box component="ul" sx={{ m: 0, pl: 2.5 }}>
              {bubbleNotes.map((note) => (
                <Typography component="li" key={note} sx={{ lineHeight: 1.7, mb: 0.75 }}>
                  {note}
                </Typography>
              ))}
            </Box>
          </Card>
        </Stack>
      </Container>
    </Box>
  );
}
