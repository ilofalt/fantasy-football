"use client";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Link from "@mui/material/Link";
import ColorModeToggle from "./ColorModeToggle";

export default function Header() {
  return (
    <AppBar
      position="sticky"
      color="inherit"
      elevation={0}
      sx={{ borderBottom: 1, borderColor: "divider" }}
    >
      <Container maxWidth="md">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <Link href="/" underline="none" color="text.primary" variant="subtitle1" sx={{ fontWeight: 700 }}>
            Fantasy Football
          </Link>
          <Stack direction="row" spacing={3} sx={{ alignItems: "center" }}>
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
