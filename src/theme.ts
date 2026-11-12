import { extendTheme } from "@mui/material/styles";

// Game-day palette: turf green, pigskin brown, and the yellow first-down line.
export const FIRST_DOWN_YELLOW = "#facc15";
const display = "var(--font-display), 'Oswald', 'Arial Narrow', Impact, sans-serif";

const theme = extendTheme({
  colorSchemeSelector: "data-mui-color-scheme",
  colorSchemes: {
    light: {
      palette: {
        primary: { main: "#1b6e3a" },
        secondary: { main: "#8a4b22" },
        background: { default: "#f5f6f1", paper: "#ffffff" },
        text: { primary: "#14211a", secondary: "#5b6660" },
        divider: "rgba(20, 50, 30, 0.12)",
      },
    },
    dark: {
      palette: {
        primary: { main: "#5ad17f" },
        secondary: { main: "#d39360" },
        background: { default: "#07100b", paper: "#0c1811" },
        text: { primary: "#eef3ef", secondary: "#9fb0a5" },
        divider: "rgba(200, 255, 220, 0.1)",
      },
    },
  },
  typography: {
    fontFamily: "var(--font-roboto), Helvetica, Arial, sans-serif",
    h1: { fontFamily: display, textTransform: "uppercase", letterSpacing: "0.02em" },
    h2: { fontFamily: display, textTransform: "uppercase", letterSpacing: "0.02em" },
    h3: { fontFamily: display, textTransform: "uppercase", letterSpacing: "0.02em" },
    h4: { fontFamily: display, letterSpacing: "0.01em" },
    h5: { fontFamily: display, letterSpacing: "0.01em" },
    overline: { fontFamily: display, letterSpacing: "0.14em", fontWeight: 600 },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiTabs: {
      styleOverrides: {
        // The selected tab is marked with the yellow first-down line.
        indicator: { height: 4, borderRadius: 2, backgroundColor: FIRST_DOWN_YELLOW },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          fontFamily: display,
          fontSize: "0.95rem",
          fontWeight: 500,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
        },
      },
    },
  },
});

export default theme;
