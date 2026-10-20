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

test("shows the current week's matchups", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Week 7 Matchups" })).toBeVisible();
  await expect(page.getByRole("article")).toHaveCount(sample.matchups.length);
  await expect(page.getByText("Hurts So Good")).toBeVisible();
});

test("shows a fallback message when the scoreboard is missing", async ({ page }) => {
  await page.unroute("**/data/scoreboard.json");
  await page.route("**/data/scoreboard.json", (route) => route.fulfill({ status: 403 }));
  await page.goto("/");
  await expect(page.getByText(/Matchups aren't available right now/)).toBeVisible();
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
  await expect(page.getByRole("table")).toBeVisible();
});
