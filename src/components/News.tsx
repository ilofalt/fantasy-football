import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { news, type NewsArticle } from "@/content/news";
import Permalink from "./Permalink";

export function formatDate(iso: string): string {
  // Parse as a calendar date, not UTC midnight, so it never shifts a day.
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function ArticleCard({ article, featured }: { article: NewsArticle; featured: boolean }) {
  return (
    <Card variant="outlined" component="article" id={article.id} sx={{ p: { xs: 2.5, md: featured ? 4 : 3 } }}>
      <Stack spacing={2}>
        <Stack direction="row" spacing={1.5} sx={{ alignItems: "center", flexWrap: "wrap", rowGap: 1 }}>
          <Chip size="small" label={article.category} color="primary" variant="outlined" />
          <Typography variant="caption" color="text.secondary">
            {formatDate(article.date)}
          </Typography>
          <Permalink tab="news" anchor={article.id} label={article.title} />
        </Stack>
        <Box>
          <Typography
            variant={featured ? "h4" : "h5"}
            component="h3"
            sx={{ fontWeight: 700, lineHeight: 1.2, fontSize: featured ? { xs: "1.6rem", md: "2.1rem" } : undefined }}
          >
            {article.title}
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 1 }}>
            {article.dek}
          </Typography>
        </Box>
        {article.paragraphs.map((p, i) => (
          <Typography key={i} sx={{ lineHeight: 1.7 }}>
            {p}
          </Typography>
        ))}
        {article.list && (
          <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0, borderTop: 1, borderColor: "divider" }}>
            {article.list.map((item) => (
              <Box component="li" key={item.label} sx={{ py: 1.5, borderBottom: 1, borderColor: "divider" }}>
                <Typography sx={{ fontWeight: 600 }}>{item.label}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.25 }}>
                  {item.detail}
                </Typography>
              </Box>
            ))}
          </Box>
        )}
        {article.outro && <Typography sx={{ lineHeight: 1.7 }}>{article.outro}</Typography>}
      </Stack>
    </Card>
  );
}

export default function News() {
  const [lead, ...rest] = news;
  return (
    <Box component="section" id="news" sx={{ pb: { xs: 8, md: 12 } }}>
      <Container maxWidth="md">
        <Typography variant="h5" component="h2" sx={{ fontWeight: 700, mb: 3 }}>
          League News
        </Typography>
        {lead ? (
          <Stack spacing={3}>
            <ArticleCard article={lead} featured />
            {rest.map((article) => (
              <ArticleCard key={article.id} article={article} featured={false} />
            ))}
          </Stack>
        ) : (
          <Typography color="text.secondary">No stories yet. Check back after this week&apos;s games.</Typography>
        )}
      </Container>
    </Box>
  );
}
