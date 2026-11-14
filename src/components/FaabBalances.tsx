import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { FAAB_BALANCES, FAAB_UPDATED, faabFor } from "@/content/faab";
import ManagerAvatar from "./ManagerAvatar";

// Everyone's FAAB in one place, so you know how much you can bet and how much
// the other side can match. Managers with none left show the play-money amount
// they get for the test, with their real balance next to it.
const rows = Object.keys(FAAB_BALANCES)
  .map((manager) => ({ manager, real: FAAB_BALANCES[manager], ...faabFor(manager) }))
  .sort((a, b) => b.balance - a.balance || a.manager.localeCompare(b.manager));

export default function FaabBalances() {
  const anyPlayMoney = rows.some((r) => r.playMoney);
  return (
    <Card variant="outlined" id="faab-balances" sx={{ p: { xs: 2.5, md: 3 }, mt: 2.5 }}>
      <Typography variant="h6" component="h3" sx={{ fontWeight: 700 }}>
        Who can bet what
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
        Each manager&rsquo;s FAAB, so you know how much you can put up and how much the other side can match. Updated{" "}
        {FAAB_UPDATED}.
      </Typography>
      <TableContainer>
        <Table size="small" aria-label="FAAB available to bet by manager">
          <TableHead>
            <TableRow>
              <TableCell>Manager</TableCell>
              <TableCell align="right">Can bet</TableCell>
              <TableCell align="right">Real FAAB</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((r) => (
              <TableRow key={r.manager} data-testid="faab-row">
                <TableCell>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.25 }}>
                    <ManagerAvatar name={r.manager} size={28} />
                    <Typography component="span" sx={{ fontWeight: 600 }}>
                      {r.manager}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: 700, fontVariantNumeric: "tabular-nums" }}>
                  ${r.balance}
                  {r.playMoney && (
                    <Box component="span" aria-hidden="true">
                      *
                    </Box>
                  )}
                </TableCell>
                <TableCell align="right" sx={{ fontVariantNumeric: "tabular-nums" }}>
                  {r.playMoney ? (
                    <Chip size="small" variant="outlined" color="warning" label={`$${r.real} (play money)`} />
                  ) : (
                    `$${r.real}`
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {anyPlayMoney && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1.5, fontStyle: "italic" }}>
          * The Great and Powerful Commish gave them FAAB as this is just a test. In reality they have zero.
        </Typography>
      )}
    </Card>
  );
}
