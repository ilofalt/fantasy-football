"use client";

import { useState, type MouseEvent } from "react";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import LinkIcon from "@mui/icons-material/Link";
import CheckIcon from "@mui/icons-material/Check";
import { permalinkHash } from "@/lib/permalink";

/**
 * A small link button for a story, award, trade, or section. Clicking it
 * points the address bar at the item and copies the full URL to share.
 */
export default function Permalink({ tab, anchor, label }: { tab: string; anchor: string; label: string }) {
  const [copied, setCopied] = useState(false);
  const hash = permalinkHash(tab, anchor);

  async function onClick(e: MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    window.location.hash = hash.slice(1);
    const url = `${window.location.origin}${window.location.pathname}${window.location.search}${hash}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard can be blocked; the link is still in the address bar.
    }
  }

  return (
    <Tooltip title={copied ? "Link copied" : "Copy link"}>
      <IconButton
        component="a"
        href={hash}
        onClick={onClick}
        size="small"
        aria-label={`Copy link to ${label}`}
        sx={{ color: copied ? "success.main" : "text.secondary", ml: "auto", flexShrink: 0 }}
      >
        {copied ? <CheckIcon fontSize="small" /> : <LinkIcon fontSize="small" />}
      </IconButton>
    </Tooltip>
  );
}
