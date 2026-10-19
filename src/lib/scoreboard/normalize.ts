import type { Matchup, MatchupStatus, Scoreboard, ScoreboardTeam } from "./types";

// Yahoo's JSON output (?format=json) is a mechanical translation of its XML:
// lists come back as {"0": a, "1": b, "count": 2}, and a resource's fields are
// split across an array of single-key objects with [] placeholders mixed in.
// These helpers undo both so the rest of the code can work with plain objects.

type YahooObject = Record<string, unknown>;

function isObject(value: unknown): value is YahooObject {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function indexed(list: unknown): unknown[] {
  if (!isObject(list)) return [];
  const count = Number(list.count ?? 0);
  return Array.from({ length: count }, (_, i) => list[i]);
}

function merge(parts: unknown): YahooObject {
  if (!Array.isArray(parts)) return isObject(parts) ? parts : {};
  return Object.assign({}, ...parts.filter(isObject));
}

function toNumber(value: unknown): number | null {
  if (value === undefined || value === null || value === "") return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : null;
}

function asString(value: unknown): string | null {
  return typeof value === "string" && value !== "" ? value : null;
}

const STATUSES: Record<string, MatchupStatus> = {
  preevent: "upcoming",
  midevent: "live",
  postevent: "final",
};

function normalizeTeam(raw: unknown): ScoreboardTeam {
  // team = [ [metadata parts...], { team_points, team_projected_points, ... } ]
  const parts = isObject(raw) && Array.isArray(raw.team) ? raw.team : [];
  const meta = merge(parts[0]);
  const stats = merge(parts.slice(1));

  const logos = Array.isArray(meta.team_logos) ? meta.team_logos : [];
  const logo = merge(logos[0]).team_logo;
  const managers = Array.isArray(meta.managers) ? meta.managers : [];
  const manager = merge(managers[0]).manager;

  return {
    key: String(meta.team_key ?? ""),
    name: String(meta.name ?? "Unknown team"),
    manager: isObject(manager) ? asString(manager.nickname) : null,
    logoUrl: isObject(logo) ? asString(logo.url) : null,
    points: toNumber(merge(stats.team_points).total) ?? 0,
    projectedPoints: toNumber(merge(stats.team_projected_points).total),
    winProbability: toNumber(stats.win_probability),
  };
}

function normalizeMatchup(raw: unknown): Matchup | null {
  const matchup = isObject(raw) && isObject(raw.matchup) ? raw.matchup : null;
  if (!matchup) return null;

  const teamsWrapper = merge(matchup[0]);
  const teams = indexed(teamsWrapper.teams).map(normalizeTeam);
  if (teams.length !== 2) return null;

  return {
    status: STATUSES[String(matchup.status)] ?? "upcoming",
    isPlayoffs: matchup.is_playoffs === "1",
    teams: [teams[0], teams[1]],
  };
}

export function normalizeScoreboard(response: unknown, updatedAt: string): Scoreboard {
  const content = isObject(response) ? response.fantasy_content : null;
  const league = isObject(content) && Array.isArray(content.league) ? content.league : null;
  if (!league) {
    throw new Error("Unexpected Yahoo response: missing fantasy_content.league");
  }

  const meta = merge(league[0]);
  const scoreboard = merge(merge(league.slice(1)).scoreboard);
  const matchups = indexed(merge(scoreboard[0]).matchups)
    .map(normalizeMatchup)
    .filter((m): m is Matchup => m !== null);

  return {
    leagueName: String(meta.name ?? "Fantasy Football"),
    leagueUrl: asString(meta.url),
    week: toNumber(scoreboard.week) ?? toNumber(meta.current_week) ?? 0,
    updatedAt,
    matchups,
  };
}
