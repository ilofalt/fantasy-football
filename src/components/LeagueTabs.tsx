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
import { parseHash } from "@/lib/permalink";

// The site is a static export served straight from S3, so extra pages would
// 404 on refresh without a CloudFront rewrite. Tabs live on the one page
// instead, with the URL hash (#news, #report, #playoffs, #rivalries, #managers, #trades, #waivers)
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
};

function tabFromHash(hash: string): TabId {
  const { tab } = parseHash(hash);
  return TABS.some((t) => t.id === tab) ? (tab as TabId) : "matchups";
}


export default function LeagueTabs() {
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
