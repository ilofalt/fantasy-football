"use client";

import { useEffect, useState, type ReactNode } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Matchups from "./Matchups";
import News from "./News";
import Playoffs from "./Playoffs";
import Trades from "./Trades";
import Waivers from "./Waivers";

// The site is a static export served straight from S3, so extra pages would
// 404 on refresh without a CloudFront rewrite. Tabs live on the one page
// instead, with the URL hash (#news, #playoffs, #trades, #waivers) making each one linkable.
export const TABS = [
  { id: "matchups", label: "Matchups" },
  { id: "news", label: "News" },
  { id: "playoffs", label: "Playoff Picture" },
  { id: "trades", label: "Track Trades" },
  { id: "waivers", label: "Waiver Wire" },
] as const;

export type TabId = (typeof TABS)[number]["id"];

const PANELS: Record<TabId, ReactNode> = {
  matchups: <Matchups />,
  news: <News />,
  playoffs: <Playoffs />,
  trades: <Trades />,
  waivers: <Waivers />,
};

function tabFromHash(hash: string): TabId {
  const id = hash.replace(/^#/, "");
  return TABS.some((t) => t.id === id) ? (id as TabId) : "matchups";
}

export default function LeagueTabs() {
  const [tab, setTab] = useState<TabId>("matchups");

  useEffect(() => {
    // Sync from the URL on load and on back/forward. This runs after
    // hydration, so the server-rendered HTML always starts on Matchups.
    const sync = () => setTab(tabFromHash(window.location.hash));
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  function select(next: TabId) {
    setTab(next);
    const hash = next === "matchups" ? "" : `#${next}`;
    window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}${hash}`);
  }

  return (
    <>
      <Container maxWidth="md">
        <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 4 }}>
          <Tabs
            value={tab}
            onChange={(_, next: TabId) => select(next)}
            aria-label="League sections"
            variant="scrollable"
            allowScrollButtonsMobile
          >
            {TABS.map((t) => (
              <Tab key={t.id} value={t.id} label={t.label} id={`tab-${t.id}`} aria-controls={`panel-${t.id}`} />
            ))}
          </Tabs>
        </Box>
      </Container>
      {TABS.map((t) => (
        <div key={t.id} role="tabpanel" id={`panel-${t.id}`} aria-labelledby={`tab-${t.id}`} hidden={tab !== t.id}>
          {tab === t.id && PANELS[t.id]}
        </div>
      ))}
    </>
  );
}
