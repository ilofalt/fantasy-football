import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { trades, TRADES_UPDATED } from "@/content/trades";
import { formatPoints, playerTotal, sideTotal } from "@/lib/trades/score";
import type { Trade, TradeSide } from "@/lib/trades/types";
import { formatDate } from "./News";

/** Net points per manager across all trades: points received minus points given up. */
export function tradeLedger(list: Trade[]): { manager: string; net: number; trades: number }[] {
  const byManager = new Map<string, { net: number; trades: number }>();
  for (const trade of list) {
    const [a, b] = trade.sides;
    for (const [side, other] of [
      [a, b],
      [b, a],
    ] as const) {
      const entry = byManager.get(side.manager) ?? { net: 0, trades: 0 };
      entry.net += sideTotal(side) - sideTotal(other);
      entry.trades += 1;
      byManager.set(side.manager, entry);
    }
  }
  return [...byManager.entries()]
    .map(([manager, v]) => ({ manager, ...v }))
    .sort((x, y) => y.net - x.net);
}

function weeksLabel(weeks: number[]): string {
  return weeks.length === 1 ? `Week ${weeks[0]}` : `Weeks ${weeks[0]}–${weeks[weeks.length - 1]}`;
}

function SideColumn({ side, winning }: { side: TradeSide; winning: boolean }) {
  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 2,
        border: 1,
        borderColor: winning ? "primary.main" : "divider",
      }}
    >
      <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "baseline", mb: 1.5 }}>
        <Typography sx={{ fontWeight: 700 }}>{side.manager} got</Typography>
        <Typography
          variant="h6"
          component="p"
          data-testid="side-total"
          sx={{ fontWeight: winning ? 700 : 400, fontVariantNumeric: "tabular-nums" }}
        >
          {formatPoints(sideTotal(side))}
        </Typography>
      </Stack>
      <Stack spacing={1.25}>
        {side.received.map((player) => (
          <Stack key={player.name} direction="row" spacing={2} sx={{ justifyContent: "space-between" }}>
            <Box sx={{ minWidth: 0 }}>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {player.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {player.position}
                {player.note && ` · ${player.note}`}
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap" }}>
              {formatPoints(playerTotal(player))}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Box>
  );
}

function TradeCard({ trade }: { trade: Trade }) {
  const [a, b] = trade.sides;
  return (
    <Card variant="outlined" component="article" id={trade.id} sx={{ p: { xs: 2.5, md: 3 } }}>
      <Stack spacing={2}>
        <Stack direction="row" spacing={1.5} sx={{ alignItems: "center", flexWrap: "wrap", rowGap: 1 }}>
          <Chip
            size="small"
            variant="outlined"
            color={trade.verdict ? "primary" : "default"}
            label={trade.verdict ? `${trade.verdict} winning` : "Too close to call"}
          />
          <Typography variant="caption" color="text.secondary">
            {formatDate(trade.date)} · Points since trade ({weeksLabel(trade.weeksCounted)})
          </Typography>
        </Stack>
        <Typography variant="h6" component="h3" sx={{ fontWeight: 700, lineHeight: 1.3 }}>
          {a.manager} ↔ {b.manager}: {trade.headline}
        </Typography>
        <Box sx={{ display: "grid", gap: 2, gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" } }}>
          <SideColumn side={a} winning={trade.verdict === a.manager} />
          <SideColumn side={b} winning={trade.verdict === b.manager} />
        </Box>
        {trade.writeUp.map((p, i) => (
          <Typography key={i} sx={{ lineHeight: 1.7 }}>
            {p}
          </Typography>
        ))}
      </Stack>
    </Card>
  );
}

export default function Trades() {
  const ledger = tradeLedger(trades);
  return (
    <Box component="section" id="trades" sx={{ pb: { xs: 8, md: 12 } }}>
      <Container maxWidth="md">
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={1}
          sx={{ justifyContent: "space-between", alignItems: { sm: "baseline" }, mb: 1 }}
        >
          <Typography variant="h5" component="h2" sx={{ fontWeight: 700 }}>
            Track Trades
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Updated {TRADES_UPDATED}
          </Typography>
        </Stack>
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          Every trade this season, scored by the fantasy points each side&apos;s players have put up since the deal.
          Byes and games not yet played count as zero.
        </Typography>

        {trades.length === 0 ? (
          <Typography color="text.secondary">No trades yet this season.</Typography>
        ) : (
          <Stack spacing={3}>
            <Card variant="outlined" sx={{ p: { xs: 2.5, md: 3 } }}>
              <Typography variant="h6" component="h3" sx={{ fontWeight: 700, mb: 0.5 }}>
                Trade leaderboard
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Net points across all of a manager&apos;s trades: points received minus points given up.
              </Typography>
              <Box component="ol" aria-label="Trade leaderboard" sx={{ listStyle: "none", p: 0, m: 0 }}>
                {ledger.map((row) => (
                  <Box
                    component="li"
                    key={row.manager}
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
                      {row.manager}{" "}
                      <Typography component="span" variant="body2" color="text.secondary">
                        · {row.trades} {row.trades === 1 ? "trade" : "trades"}
                      </Typography>
                    </Typography>
                    <Typography
                      sx={{
                        fontVariantNumeric: "tabular-nums",
                        fontWeight: 600,
                        color: row.net > 0 ? "success.main" : row.net < 0 ? "error.main" : "text.secondary",
                      }}
                    >
                      {row.net > 0 ? "+" : ""}
                      {formatPoints(row.net)}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Card>
            {trades.map((trade) => (
              <TradeCard key={trade.id} trade={trade} />
            ))}
          </Stack>
        )}
      </Container>
    </Box>
  );
}
