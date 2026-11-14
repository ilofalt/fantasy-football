"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";
import { FAAB_UPDATED, faabFor } from "@/content/faab";
import { currentMatchups } from "@/content/matchups";
import { COMMISSIONER } from "@/content/managers";
import { acceptBet, cancelBet, counterBet, fetchBets, placeBet, settleBet, type BetsResponse } from "@/lib/bets/client";
import { type Bet, COMMISSIONER_TITLE, faabOnTheLine, opposingTeam, responderOf, settledNet } from "@/lib/bets/types";
import { parseHash } from "@/lib/permalink";
import { useAuth } from "./AuthProvider";
import Permalink from "./Permalink";

const display = "var(--font-display), 'Oswald', 'Arial Narrow', Impact, sans-serif";

function Section({ title, subtitle, children }: { title: string; subtitle?: string; children: ReactNode }) {
  return (
    <Card variant="outlined" sx={{ p: { xs: 2.5, md: 3 } }}>
      <Typography variant="h6" component="h3" sx={{ fontWeight: 700 }}>
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          {subtitle}
        </Typography>
      )}
      {children}
    </Card>
  );
}

function Stat({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <Box sx={{ flex: 1, minWidth: 120 }}>
      <Typography variant="caption" color="text.secondary" sx={{ textTransform: "uppercase", letterSpacing: "0.06em" }}>
        {label}
      </Typography>
      <Typography sx={{ fontFamily: display, fontSize: "1.9rem", fontWeight: 700, lineHeight: 1.15 }}>{value}</Typography>
      {hint && (
        <Typography variant="caption" color="text.secondary">
          {hint}
        </Typography>
      )}
    </Box>
  );
}

const sign = (n: number) => (n > 0 ? `+${n}` : `${n}`);
const betLine = (b: Bet) => `${b.bettor} bets ${b.amount} FAAB that ${b.pick} beats ${opposingTeam(b)}`;

type Act = (run: () => Promise<BetsResponse>) => Promise<boolean>;

// A bet's share link is "#sportsbook/bet-<id>".
const betAnchor = (id: string) => `bet-${id}`;
const HIGHLIGHT = { outline: "2px solid", outlineColor: "primary.main", outlineOffset: 8, borderRadius: 1 } as const;

/** The id of the bet named in the URL's share link, or null. */
function useLinkedBetId(): string | null {
  const [id, setId] = useState<string | null>(null);
  useEffect(() => {
    const sync = () => {
      const { tab, anchor } = parseHash(window.location.hash);
      setId(tab === "sportsbook" && anchor?.startsWith("bet-") ? anchor.slice(4) : null);
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);
  return id;
}

/** One bet that's still being decided: open, or being countered back and forth. */
function OpenBetRow({
  bet,
  me,
  isCommissioner,
  available,
  busy,
  act,
  highlight,
}: {
  bet: Bet;
  me: string;
  isCommissioner: boolean;
  available: number;
  busy: boolean;
  act: Act;
  highlight: boolean;
}) {
  const [countering, setCountering] = useState(false);
  const [counter, setCounter] = useState("");

  const countered = bet.status === "countered";
  const mine = bet.bettor === me;
  const inBet = mine || bet.taker === me;
  const responder = countered ? responderOf(bet) : null;
  // Anyone but the bettor can answer an open bet; only one side's turn at a time once it's countered.
  const myTurn = countered ? responder === me : !mine;
  const canAfford = bet.amount <= available;

  const counterNumber = Number(counter);
  const counterValid =
    Number.isInteger(counterNumber) && counterNumber >= 1 && counterNumber !== bet.amount && counterNumber <= available;

  let title = betLine(bet);
  let note = mine ? "Waiting for someone to accept or counter" : `Accept it to back ${opposingTeam(bet)}`;
  if (countered) {
    title = `${bet.bettor} (${bet.pick}) vs. ${bet.taker} (${opposingTeam(bet)}) for ${bet.amount} FAAB`;
    note = `${bet.offeredBy} is asking ${bet.amount} FAAB. ${
      myTurn ? "Your move." : inBet ? `Waiting on ${responder}.` : `Locked between ${bet.bettor} and ${bet.taker}.`
    }`;
  }

  return (
    <Box id={betAnchor(bet.id)} sx={highlight ? HIGHLIGHT : undefined}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={1.5}
        sx={{ alignItems: { sm: "center" }, justifyContent: "space-between" }}
      >
        <Box>
          <Typography sx={{ fontWeight: 600 }}>
            {title}
            {countered && <Chip size="small" label="Countered" sx={{ ml: 1 }} />}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Week {bet.week} · {note}
          </Typography>
          {myTurn && !canAfford && (
            <Typography variant="body2" color="error">
              You need {bet.amount} FAAB available to accept this. Counter with less?
            </Typography>
          )}
        </Box>
        <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: "wrap" }}>
          {myTurn && (
            <>
              <Button
                variant="contained"
                size="small"
                disabled={busy || !canAfford}
                onClick={() => act(() => acceptBet(bet.id, bet.amount))}
              >
                Accept bet
              </Button>
              <Button variant="outlined" size="small" disabled={busy} onClick={() => setCountering((c) => !c)}>
                Counter
              </Button>
            </>
          )}
          {(inBet || isCommissioner) && (
            <Button size="small" color="inherit" disabled={busy} onClick={() => act(() => cancelBet(bet.id))}>
              {!inBet ? "Void" : countered ? "Walk away" : "Withdraw"}
            </Button>
          )}
          <Permalink tab="sportsbook" anchor={betAnchor(bet.id)} label="this bet" />
        </Stack>
      </Stack>
      {myTurn && countering && (
        <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} sx={{ mt: 1.5 }}>
          <TextField
            size="small"
            type="number"
            label="Your counter (FAAB)"
            value={counter}
            onChange={(e) => setCounter(e.target.value)}
            slotProps={{ htmlInput: { min: 1, max: available, step: 1 } }}
            helperText={
              counter && counterNumber === bet.amount
                ? "That's the same amount. Accept the bet instead."
                : counter && counterNumber > available
                  ? `You only have ${available} available.`
                  : `Higher or lower than ${bet.amount}, up to ${available}.`
            }
            error={!!counter && !counterValid}
          />
          <Box>
            <Button
              variant="contained"
              size="small"
              disabled={busy || !counterValid}
              onClick={async () => {
                if (await act(() => counterBet(bet.id, counterNumber, bet.amount))) {
                  setCountering(false);
                  setCounter("");
                }
              }}
            >
              Send counter
            </Button>
          </Box>
        </Stack>
      )}
    </Box>
  );
}

export default function SportsBook() {
  const { user, ready, openLogin } = useAuth();
  const linkedId = useLinkedBetId();
  const scrolledTo = useRef<string | null>(null);
  const [bets, setBets] = useState<Bet[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const [matchupId, setMatchupId] = useState(currentMatchups.matchups[0]?.id ?? "");
  const [pick, setPick] = useState<string | null>(null);
  const [amount, setAmount] = useState("");

  const apply = useCallback((res: BetsResponse) => {
    if (res.error !== undefined) setError(res.error);
    else {
      setBets(res.bets);
      setError(null);
    }
    return res.error === undefined;
  }, []);

  const manager = user?.manager;
  useEffect(() => {
    if (manager) fetchBets().then(apply);
  }, [manager, apply]);

  // Once the bets arrive, bring a shared bet into view (it didn't exist yet when the tab opened).
  useEffect(() => {
    if (!linkedId || !bets || scrolledTo.current === linkedId) return;
    const el = document.getElementById(betAnchor(linkedId));
    if (el) {
      scrolledTo.current = linkedId;
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [linkedId, bets]);

  const act = async (run: () => Promise<BetsResponse>) => {
    setBusy(true);
    const ok = apply(await run());
    setBusy(false);
    return ok;
  };

  let body: ReactNode;
  if (!ready) {
    body = null;
  } else if (!user) {
    body = linkedId ? (
      <Alert
        severity="info"
        action={
          <Button color="inherit" size="small" onClick={openLogin}>
            Log in
          </Button>
        }
      >
        Someone shared a bet with you. Log in to see it, and to accept it or counter.
      </Alert>
    ) : (
      <Alert severity="info">Log in with the button at the top of the page to see your FAAB, open bets, and place your own.</Alert>
    );
  } else {
    const all = bets ?? [];
    const isCommissioner = user.manager === COMMISSIONER;
    const { balance, playMoney } = faabFor(user.manager);
    const onTheLine = faabOnTheLine(all, user.manager);
    const available = balance - onTheLine;
    const net = settledNet(all, user.manager);

    const open = all.filter((b) => b.status === "open" || b.status === "countered");
    const live = all.filter((b) => b.status === "matched");
    const settled = all.filter((b) => b.status === "settled");
    const linked = linkedId ? all.find((b) => b.id === linkedId) : undefined;

    const matchup = currentMatchups.matchups.find((m) => m.id === matchupId);
    const teams = matchup ? ([matchup.teams[0].manager, matchup.teams[1].manager] as [string, string]) : null;
    const amountNumber = Number(amount);
    const amountValid = Number.isInteger(amountNumber) && amountNumber >= 1;
    const canPlace = !!teams && !!pick && amountValid && amountNumber <= available && !busy;

    body = (
      <Stack spacing={2.5}>
        <Card variant="outlined" sx={{ p: { xs: 2.5, md: 3 } }}>
          <Typography variant="subtitle2" color="text.secondary">
            {user.manager}&rsquo;s FAAB
          </Typography>
          <Stack direction="row" useFlexGap sx={{ flexWrap: "wrap", gap: 2, mt: 1 }}>
            <Stat label="FAAB" value={`$${balance}`} hint={`Updated ${FAAB_UPDATED}`} />
            <Stat label="On the line" value={`$${onTheLine}`} hint="In open and matched bets" />
            <Stat label="Available to bet" value={`$${available}`} />
            <Stat label="Settled bets" value={`${sign(net)}`} hint="Net FAAB won or lost" />
          </Stack>
        </Card>

        {playMoney && (
          <Alert severity="info">You don&rsquo;t actually have any FAAB, but here&rsquo;s some cause this is just a test.</Alert>
        )}

        {error && <Alert severity="error">{error}</Alert>}

        {linkedId && bets && (!linked || linked.status === "cancelled") && (
          <Alert severity="warning">
            {linked ? "That bet was withdrawn." : "That bet isn't here. The link may be wrong."}
          </Alert>
        )}

        <Section
          title={`Open bets${open.length ? ` (${open.length})` : ""}`}
          subtitle="Think they're wrong? Accept a bet to take the other side, or counter with your own number. Only two managers can be in a bet."
        >
          {open.length === 0 ? (
            <Typography color="text.secondary">No open bets right now. Place one below.</Typography>
          ) : (
            <Stack spacing={2} sx={{ mt: 1 }}>
              {open.map((b) => (
                <OpenBetRow
                  key={b.id}
                  bet={b}
                  me={user.manager}
                  isCommissioner={isCommissioner}
                  available={available}
                  busy={busy}
                  act={act}
                  highlight={b.id === linkedId}
                />
              ))}
            </Stack>
          )}
        </Section>

        <Section
          title="Place a bet"
          subtitle={`Pick the winner of one matchup and how much FAAB you'll put behind it. If someone matches, the ${COMMISSIONER_TITLE} awards the winner.`}
        >
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              select
              label={`Week ${currentMatchups.week} matchup`}
              value={matchupId}
              onChange={(e) => {
                setMatchupId(e.target.value);
                setPick(null);
              }}
              fullWidth
            >
              {currentMatchups.matchups.map((m) => (
                <MenuItem key={m.id} value={m.id}>
                  {m.teams[0].manager} vs. {m.teams[1].manager}
                </MenuItem>
              ))}
            </TextField>
            {teams && (
              <ToggleButtonGroup
                exclusive
                fullWidth
                color="primary"
                value={pick}
                onChange={(_, v: string | null) => setPick(v)}
                aria-label="Who wins"
              >
                {teams.map((t) => (
                  <ToggleButton key={t} value={t}>
                    {t} wins
                  </ToggleButton>
                ))}
              </ToggleButtonGroup>
            )}
            <TextField
              label="FAAB to bet"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              slotProps={{ htmlInput: { min: 1, max: available, step: 1 } }}
              helperText={
                available <= 0
                  ? "You have no FAAB available to bet."
                  : amountValid && amountNumber > available
                    ? `You only have ${available} available.`
                    : `Up to ${available} available.`
              }
              error={amountValid && amountNumber > available}
              fullWidth
            />
            <Button
              variant="contained"
              disabled={!canPlace}
              onClick={async () => {
                if (!teams || !pick) return;
                const ok = await act(() =>
                  placeBet({ week: currentMatchups.week, matchupId, teams, pick, amount: amountNumber })
                );
                if (ok) {
                  setPick(null);
                  setAmount("");
                }
              }}
            >
              {pick && amountValid ? `Bet ${amountNumber} FAAB on ${pick}` : "Place bet"}
            </Button>
          </Stack>
        </Section>

        <Section title="Live bets" subtitle="Matched and waiting on the result.">
          {live.length === 0 ? (
            <Typography color="text.secondary">Nothing locked in yet.</Typography>
          ) : (
            <Stack spacing={1.5} sx={{ mt: 1 }}>
              {live.map((b) => (
                <Stack
                  key={b.id}
                  id={betAnchor(b.id)}
                  direction={{ xs: "column", sm: "row" }}
                  spacing={1.5}
                  sx={{ alignItems: { sm: "center" }, justifyContent: "space-between", ...(b.id === linkedId ? HIGHLIGHT : {}) }}
                >
                  <Box>
                    <Typography sx={{ fontWeight: 600 }}>
                      {b.bettor} has {b.pick}, {b.taker} has {opposingTeam(b)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Week {b.week} · {b.amount} FAAB each way
                    </Typography>
                  </Box>
                  <Stack direction="row" spacing={1} useFlexGap sx={{ flexWrap: "wrap", alignItems: "center" }}>
                    {isCommissioner && (
                      <>
                        {b.teams.map((t) => (
                          <Button
                            key={t}
                            size="small"
                            variant="outlined"
                            disabled={busy}
                            onClick={() => act(() => settleBet(b.id, t))}
                          >
                            {t} won
                          </Button>
                        ))}
                        <Button size="small" color="inherit" disabled={busy} onClick={() => act(() => cancelBet(b.id))}>
                          Void
                        </Button>
                      </>
                    )}
                    <Permalink tab="sportsbook" anchor={betAnchor(b.id)} label="this bet" />
                  </Stack>
                </Stack>
              ))}
            </Stack>
          )}
        </Section>

        {settled.length > 0 && (
          <Section title="Settled" subtitle={`Awarded by the ${COMMISSIONER_TITLE}.`}>
            <Stack spacing={1} sx={{ mt: 1 }}>
              {settled.map((b) => (
                <Stack
                  key={b.id}
                  id={betAnchor(b.id)}
                  direction="row"
                  spacing={1}
                  sx={{ alignItems: "center", flexWrap: "wrap", ...(b.id === linkedId ? HIGHLIGHT : {}) }}
                  useFlexGap
                >
                  <Chip size="small" color="primary" label={`${b.winner} +${b.amount}`} />
                  <Typography variant="body2">
                    Week {b.week}: {betLine(b)}
                  </Typography>
                  <Permalink tab="sportsbook" anchor={betAnchor(b.id)} label="this bet" />
                </Stack>
              ))}
            </Stack>
          </Section>
        )}
      </Stack>
    );
  }

  return (
    <Box component="section" id="sportsbook" sx={{ pb: { xs: 8, md: 12 } }}>
      <Container maxWidth="md">
        <Typography variant="h4" component="h2" sx={{ fontWeight: 700, fontFamily: display, textTransform: "uppercase" }}>
          SportsBook
        </Typography>
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          Side bets on the week&rsquo;s matchups, paid in FAAB. The {COMMISSIONER_TITLE} settles them and moves the FAAB in
          Yahoo.
        </Typography>
        {body}
      </Container>
    </Box>
  );
}
