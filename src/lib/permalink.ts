// Deep links: "#<tab>" opens a tab, "#<tab>/<item>" opens the tab and scrolls
// to the element with id <item> (a news story, award, trade, or section).

export interface ParsedHash {
  tab: string | null;
  anchor: string | null;
}

export function parseHash(hash: string): ParsedHash {
  const raw = decodeURIComponent(hash.replace(/^#/, ""));
  if (!raw) return { tab: null, anchor: null };
  const [tab, ...rest] = raw.split("/");
  const anchor = rest.join("/");
  return { tab: tab || null, anchor: anchor || null };
}

export function permalinkHash(tab: string, anchor?: string): string {
  return anchor ? `#${tab}/${encodeURIComponent(anchor)}` : `#${tab}`;
}
