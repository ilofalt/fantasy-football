import { extendTheme } from "@mui/material/styles";

const theme = extendTheme({
  colorSchemeSelector: "data-mui-color-scheme",
  colorSchemes: {
    light: {
      palette: {
        primary: { main: "#4f46e5" },
        background: { default: "#ffffff", paper: "#ffffff" },
        text: { primary: "#171717", secondary: "#666666" },
        divider: "rgba(0, 0, 0, 0.08)",
      },
    },
    dark: {
      palette: {
        primary: { main: "#818cf8" },
        background: { default: "#0a0a0a", paper: "#0a0a0a" },
        text: { primary: "#ededed", secondary: "#a3a3a3" },
        divider: "rgba(255, 255, 255, 0.1)",
      },
    },
  },
  typography: {
    fontFamily: "var(--font-roboto), Helvetica, Arial, sans-serif",
  },
  shape: {
    borderRadius: 12,
  },
});

export default theme;
