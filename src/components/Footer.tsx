import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import FootballIcon from "./FootballIcon";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        position: "relative",
        py: 4,
        mt: 4,
        borderTop: 1,
        borderColor: "divider",
        // A row of hash marks along the top edge, like the sideline.
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 8,
          backgroundImage: "repeating-linear-gradient(90deg, currentColor 0 2px, transparent 2px 24px)",
          color: "divider",
        },
      }}
    >
      <Container maxWidth="md">
        <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
          <FootballIcon size={18} />
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} Isaiah Ofalt. Built with Next.js and
            React.
          </Typography>
        </Stack>
      </Container>
    </Box>
  );
}
