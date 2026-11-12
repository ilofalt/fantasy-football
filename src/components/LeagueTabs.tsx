"use client";

import { useEffect, useState, type ReactNode } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Matchups from "./Matchups";
import News from "./News";
import Managers from "./Managers";
import Playoffs from "./Playoffs";
import Rivalries from "./Rivalries";
import Trades from "./Trades";
import Waivers from "./Waivers";
import WeeklyReport from "./WeeklyReport";
import TradingCards from "./TradingCards";
import { parseHash } from "@/lib/permalink";

// The site is a static export served straight from S3, so extra pages would
// 404 on refresh without a CloudFront rewrite. Tabs live on the one page
// instead, with the URL hash (#news, #report, #playoffs, #rivalries, #managers, #trades, #waivers, #cards)
// making each one linkable. "#<tab>/<item>" links to a specific story, award,
// trade, or section within a tab.
export const TABS = [
  { id: "matchups", label: "Matchups" },
  { id: "news", label: "News" },
  { id: "report", label: "Weekly Report" },
  { id: "playoffs", label: "Playoff Picture" },
  { id: "rivalries", label: "Rivalries" },
  { id: "managers", label: "Managers" },
  { id: "trades", label: "Track Trades" },
  { id: "waivers", label: "Waiver Wire" },
  { id: "cards", label: "Trading Cards" },
] as const;

export type TabId = (typeof TABS)[number]["id"];

const PANELS: Record<TabId, ReactNode> = {
  matchups: <Matchups />,
  news: <News />,
  report: <WeeklyReport />,
  playoffs: <Playoffs />,
  rivalries: <Rivalries />,
  managers: <Managers />,
  trades: <Trades />,
  waivers: <Waivers />,
  cards: <TradingCards />,
};

function tabFromHash(hash: string): TabId {
  const { tab } = parseHash(hash);
  return TABS.some((t) => t.id === tab) ? (tab as TabId) : "matchups";
}


/**
 * The header and section tabs stick to the top together, full width, with the
 * hero between them and the selected panel.
 */
export default function LeagueTabs({ header, hero }: { header?: ReactNode; hero?: ReactNode } = {}) {
  const [tab, setTab] = useState<TabId>("matchups");
  // Item to scroll to; `n` bumps so re-clicking the same link scrolls again.
  const [target, setTarget] = useState<{ anchor: string; n: number } | null>(null);

  useEffect(() => {
    // Sync from the URL on load and on back/forward. This runs after
    // hydration, so the server-rendered HTML always starts on Matchups.
    const sync = () => {
      setTab(tabFromHash(window.location.hash));
      const { anchor } = parseHash(window.location.hash);
      if (anchor) setTarget((t) => ({ anchor, n: (t?.n ?? 0) + 1 }));
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  useEffect(() => {
    // Runs after the selected tab has rendered, so the item exists.
    if (target) document.getElementById(target.anchor)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [target, tab]);

  function select(next: TabId) {
    setTab(next);
    const hash = next === "matchups" ? "" : `#${next}`;
    window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}${hash}`);
  }

  return (
    <>
      <Box
        sx={{
          position: "sticky",
          top: 0,
          zIndex: "appBar",
          bgcolor: "background.paper",
          borderBottom: 3,
          borderColor: "primary.main",
        }}
      >
        {header}
        <Container maxWidth={false} sx={{ borderTop: header ? 1 : 0, borderColor: "divider" }}>
          <Tabs
            value={tab}
            onChange={(_, next: TabId) => select(next)}
            aria-label="League sections"
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            sx={{
              minHeight: 48,
              // Centered when every tab fits; scrolls (with arrows) only when it doesn't.
              "& .MuiTabs-list, & .MuiTabs-flexContainer": { justifyContent: "safe center" },
              "& .MuiTab-root": { px: { md: 2.5 } },
            }}
          >
            {TABS.map((t) => (
              <Tab key={t.id} value={t.id} label={t.label} id={`tab-${t.id}`} aria-controls={`panel-${t.id}`} />
            ))}
          </Tabs>
        </Container>
      </Box>
      {hero}
      <Box sx={{ height: { xs: 8, md: 16 } }} />
      {TABS.map((t) => (
        <div key={t.id} role="tabpanel" id={`panel-${t.id}`} aria-labelledby={`tab-${t.id}`} hidden={tab !== t.id}>
          {tab === t.id && PANELS[t.id]}
        </div>
      ))}
    </>
  );
}
