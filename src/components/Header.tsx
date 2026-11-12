"use client";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Link from "@mui/material/Link";
import ColorModeToggle from "./ColorModeToggle";
import FootballIcon from "./FootballIcon";

export default function Header() {
  return (
    <AppBar
      position="static"
      color="inherit"
      elevation={0}
    >
      <Container maxWidth="md">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <Link
            href="/"
            underline="none"
            color="text.primary"
            variant="subtitle1"
            sx={{
              fontWeight: 700,
              fontFamily: "var(--font-display), 'Oswald', 'Arial Narrow', Impact, sans-serif",
              fontSize: { xs: "1.05rem", sm: "1.2rem" },
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
              display: "inline-flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <FootballIcon size={26} />
            Fantasy Football
          </Link>
          <Stack direction="row" spacing={{ xs: 1.5, sm: 3 }} sx={{ alignItems: "center" }}>
            <Link
              href="https://isaiahofalt.com"
              underline="hover"
              color="text.secondary"
              variant="body2"
              sx={{ "&:hover": { color: "text.primary" } }}
            >
              isaiahofalt.com
            </Link>
            <ColorModeToggle />
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
