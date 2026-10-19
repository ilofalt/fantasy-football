import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

export default function Footer() {
  return (
    <Box component="footer" sx={{ borderTop: 1, borderColor: "divider", py: 4 }}>
      <Container maxWidth="md">
        <Typography variant="body2" color="text.secondary">
          © {new Date().getFullYear()} Isaiah Ofalt. Built with Next.js and
          React.
        </Typography>
      </Container>
    </Box>
  );
}
