import Box from "@mui/material/Box";
import type { SxProps, Theme } from "@mui/material/styles";

// A small leather football with laces, drawn inline so it themes and scales
// with the text around it. Purely decorative.
export default function FootballIcon({ size = 24, sx }: { size?: number; sx?: SxProps<Theme> }) {
  return (
    <Box
      component="svg"
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      sx={{ width: size, height: size, flexShrink: 0, display: "inline-block", ...sx }}
    >
      <g transform="rotate(-35 12 12)">
        <ellipse cx="12" cy="12" rx="10.5" ry="6.2" fill="#8a4b22" stroke="#5c2e12" strokeWidth="0.8" />
        <path d="M4.6 8.4v7.2M19.4 8.4v7.2" stroke="#fff" strokeWidth="1.1" strokeLinecap="round" />
        <path d="M8 12h8" stroke="#fff" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M9.5 10.9v2.2M11 10.9v2.2M12.5 10.9v2.2M14 10.9v2.2" stroke="#fff" strokeWidth="1" strokeLinecap="round" />
      </g>
    </Box>
  );
}
