"use client";

import { useEffect, useState } from "react";
import { useColorScheme } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";

export default function ColorModeToggle() {
  const { mode, systemMode, setMode } = useColorScheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Deliberately setting state on mount: this is the standard pattern for
    // deferring client-only rendering until after hydration, to avoid an
    // SSR/CSR mismatch (the resolved color scheme is unknown on the server).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  if (!mounted) {
    return <IconButton aria-label="Toggle color mode" sx={{ visibility: "hidden" }} />;
  }

  const resolvedMode = mode === "system" ? systemMode : mode;
  const isDark = resolvedMode === "dark";

  return (
    <IconButton
      aria-label="Toggle color mode"
      onClick={() => setMode(isDark ? "light" : "dark")}
      color="inherit"
    >
      {isDark ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
}
