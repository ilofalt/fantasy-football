import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

export default function Hero() {
  return (
    <Box component="section" id="home" sx={{ pt: { xs: 6, md: 10 }, pb: { xs: 4, md: 6 } }}>
      <Container maxWidth="md">
        <Typography variant="h3" component="h1" sx={{ fontWeight: 700 }}>
          Fantasy Football
        </Typography>
      </Container>
    </Box>
  );
}
