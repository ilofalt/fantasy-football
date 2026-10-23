import { test, expect } from "@playwright/test";
import sample from "../src/lib/scoreboard/__fixtures__/scoreboard.json";

// The live scoreboard is written to S3 by the Lambda, not built into the
// site, so serve the sample in its place.
test.beforeEach(async ({ page }) => {
  await page.route("**/data/scoreboard.json", (route) => route.fulfill({ json: sample }));
});

test("loads with the expected title and heading", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Fantasy Football/);
  await expect(page.getByRole("heading", { level: 1, name: "Fantasy Football" })).toBeVisible();
});

test("shows the current week's matchups from the weekly snapshot", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /Week \d+ Matchups/ })).toBeVisible();
  await expect(page.getByRole("article")).toHaveCount(6);
});

test("shows the live scoreboard when it's for a newer week", async ({ page }) => {
  await page.unroute("**/data/scoreboard.json");
  await page.route("**/data/scoreboard.json", (route) => route.fulfill({ json: { ...sample, week: 99 } }));
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Week 99 Matchups" })).toBeVisible();
  await expect(page.getByText("Isaiah").first()).toBeVisible();
  await expect(page.getByText("Hurts So Good")).toHaveCount(0);
});

test("still shows the snapshot when the live scoreboard is missing", async ({ page }) => {
  await page.unroute("**/data/scoreboard.json");
  await page.route("**/data/scoreboard.json", (route) => route.fulfill({ status: 403 }));
  await page.goto("/");
  await expect(page.getByRole("article")).toHaveCount(6);
});

test("clicking a matchup opens both lineups with photos", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: /^View lineups:/ }).first().click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("list", { name: "Starters" }).getByRole("listitem")).toHaveCount(9);
  await expect(page).toHaveURL(/#matchups\/[a-z]+-vs-[a-z]+$/);
  await dialog.getByRole("button", { name: "Close" }).click();
  await expect(dialog).toBeHidden();
});

test("links back to the main site", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("link", { name: "isaiahofalt.com" })).toHaveAttribute(
    "href",
    "https://isaiahofalt.com"
  );
});

test("dark mode toggle actually changes the rendered background color", async ({ page }) => {
  await page.goto("/");
  const before = await page.evaluate(
    () => getComputedStyle(document.body).backgroundColor
  );

  await page.getByLabel("Toggle color mode").click();

  await expect(async () => {
    const after = await page.evaluate(
      () => getComputedStyle(document.body).backgroundColor
    );
    expect(after).not.toBe(before);
  }).toPass();
});

test("News tab shows league stories and is linkable", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("tab", { name: "News" }).click();
  await expect(page.getByRole("heading", { name: "League News" })).toBeVisible();
  await expect(page).toHaveURL(/#news$/);

  await page.goto("/#news");
  await expect(page.getByRole("tab", { name: "News" })).toHaveAttribute("aria-selected", "true");
  await expect(page.getByRole("heading", { name: "League News" })).toBeVisible();
});

test("Track Trades tab shows the trade leaderboard and every trade", async ({ page }) => {
  await page.goto("/#trades");
  await expect(page.getByRole("heading", { level: 2, name: "Track Trades" })).toBeVisible();
  await expect(page.getByRole("list", { name: "Trade leaderboard" })).toBeVisible();
  await expect(page.getByText("Bijan Robinson", { exact: true })).toBeVisible();
});

test("Waiver Wire tab shows the best pickups and worst drops", async ({ page }) => {
  await page.goto("/#waivers");
  await expect(page.getByRole("heading", { level: 2, name: "Waiver Wire" })).toBeVisible();
  await expect(page.getByRole("list", { name: /Best pickups of Week/ })).toBeVisible();
  await expect(page.getByRole("list", { name: "Best pickups of the season" })).toBeVisible();
  await expect(page.getByRole("list", { name: "Worst drops of the season" })).toBeVisible();
});

test("Playoff Picture tab shows both brackets and the standings", async ({ page }) => {
  await page.goto("/#playoffs");
  await expect(page.getByRole("heading", { level: 2, name: "Playoff Picture" })).toBeVisible();
  await expect(page.getByRole("region", { name: "Playoff bracket" })).toBeVisible();
  await expect(page.getByRole("region", { name: "Toilet Bowl bracket" })).toBeVisible();
  await expect(page.getByRole("table", { name: "Standings" })).toBeVisible();
  await expect(page.getByRole("table", { name: "Playoff odds by manager" })).toBeVisible();
});

test("Rivalries tab compares any two managers and links to the pair", async ({ page }) => {
  await page.goto("/#rivalries/chris-vs-lanny");
  await expect(page.getByRole("tab", { name: "Rivalries" })).toHaveAttribute("aria-selected", "true");
  const card = page.getByRole("region", { name: "Head to head" });
  await expect(card).toBeInViewport();
  await expect(card.getByText("11 meetings")).toBeVisible();
  await page.getByRole("button", { name: /^Daniel vs\. Ethan: / }).click();
  await expect(page).toHaveURL(/#rivalries\/daniel-vs-ethan$/);
  await expect(page.getByRole("link", { name: "Copy link to Daniel vs. Ethan" })).toBeVisible();
});

test("Managers tab opens a manager's page and links to rivalries", async ({ page }) => {
  await page.goto("/#managers");
  await page.getByRole("button", { name: "Open Isaiah's page" }).click();
  await expect(page).toHaveURL(/#managers\/isaiah$/);
  await expect(page.getByRole("heading", { level: 2, name: "Isaiah" })).toBeVisible();
  await expect(page.getByRole("img", { name: "Isaiah" }).first()).toBeVisible();
  await page.getByRole("link", { name: /Jonathan/ }).click();
  await expect(page.getByRole("tab", { name: "Rivalries" })).toHaveAttribute("aria-selected", "true");
  await expect(page.getByRole("link", { name: "Copy link to Isaiah vs. Jonathan" })).toBeVisible();
});

test("Weekly Report tab shows Sleeper-style awards", async ({ page }) => {
  await page.goto("/#report");
  await expect(page.getByRole("heading", { level: 2, name: /Week \d+ Report/ })).toBeVisible();
  await expect(page.getByRole("heading", { name: /Best Manager/ })).toBeVisible();
  await expect(page.getByRole("table", { name: "Lineup efficiency" })).toBeVisible();
});

test("deep links open the right tab and scroll to the item", async ({ page }) => {
  await page.goto("/#news/week-7-preview");
  await expect(page.getByRole("tab", { name: "News" })).toHaveAttribute("aria-selected", "true");
  const story = page.locator("#week-7-preview");
  await expect(story).toBeInViewport();

  await page.goto("/#trades/ray-lanny-oct-14");
  await expect(page.locator("#ray-lanny-oct-14")).toBeInViewport();
});

test("the link button puts a specific item's link in the address bar", async ({ page }) => {
  await page.goto("/#report");
  await page.getByRole("link", { name: "Copy link to Worst Manager" }).click();
  await expect(page).toHaveURL(/#report\/worst-manager$/);
  await expect(page.locator("#worst-manager")).toBeInViewport();
});
