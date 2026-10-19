# ff.isaiahofalt.com

Fantasy football site for Isaiah Ofalt. Live at [ff.isaiahofalt.com](https://ff.isaiahofalt.com).

## Stack

- [Next.js](https://nextjs.org) (App Router), built as a static export (`output: "export"` in `next.config.mjs`) — no server, just static HTML/CSS/JS
- [Material UI](https://mui.com) for components and theming (light/dark mode follows system preference, with a manual toggle in the header)
- TypeScript

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Other scripts:

- `npm run build` — production build, outputs static files to `out/`
- `npm run start` — serve the built `out/` folder locally (static export doesn't support `next start`)
- `npm run lint` — ESLint
- `npm run test` — Jest unit tests
- `npm run test:e2e` — Playwright end-to-end tests against the built `out/` folder
- `npm run deploy` — build, sync to S3, invalidate CloudFront (manual fallback; normally CI does this)

## Infrastructure

Hosting is AWS: S3 (private bucket) behind CloudFront (CDN + HTTPS), with Route 53 for DNS and ACM for the TLS certificate. Everything is defined as Terraform in [`infra/`](infra/), with state stored remotely in S3 (same state bucket as [isaiahofalt-website](https://github.com/ilofalt/isaiahofalt-website), separate key).

This stack does **not** own the `isaiahofalt.com` Route 53 hosted zone or the account's GitHub OIDC provider — both belong to the isaiahofalt-website stack and are looked up here as data sources. This stack only adds the `ff` records, its own certificate, bucket, distribution, and deploy role.

```bash
npm run build:lambda   # bundles the scoreboard Lambda into infra/build/
cd infra
terraform init
terraform plan
terraform apply
```

## League data (Yahoo Fantasy)

Matchups come from the [Yahoo Fantasy Sports API](https://developer.yahoo.com/fantasysports/guide/), which requires OAuth, so the static page can't call it directly. Instead:

1. A Lambda ([`lambda/scoreboard/handler.ts`](lambda/scoreboard/handler.ts)) runs weekly (Tuesdays 8am ET) on an EventBridge schedule. The schedule is **off** until `scoreboard_schedule_enabled = true` — set it once Yahoo grants the app Fantasy API access.
2. It refreshes the Yahoo access token using credentials stored as SecureString parameters under `/fantasy-football/yahoo/` in SSM, fetches the league scoreboard, and simplifies Yahoo's response ([`src/lib/scoreboard/normalize.ts`](src/lib/scoreboard/normalize.ts)).
3. It writes the result to `data/scoreboard.json` in the site bucket (60-second cache), which the page loads and re-polls every minute.

The deploy sync excludes `data/*` so deploys never delete the live scoreboard. Locally, `npm run dev` serves a sample scoreboard from `src/lib/scoreboard/__fixtures__/`.

**One-time setup:** create a Yahoo app with Fantasy Sports read access, then run `npm run yahoo:auth` in your own terminal. It asks for the app's Client ID and Secret, has you approve access in the browser, and stores the credentials in SSM — nothing touches disk or Terraform state. The league ID is the `yahoo_league_id` Terraform variable.

## Deployment

Pushing to `main` triggers [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml): build → sync `out/` to S3 → invalidate the CloudFront cache. Authentication to AWS uses OIDC federation (GitHub issues a short-lived signed token, AWS trades it for temporary credentials scoped to a single least-privilege deploy role) — no AWS keys are stored in GitHub.

**Branch workflow:** all changes are committed to `dev` first. Nothing goes live until `dev` is merged into `main` and pushed.

```bash
git checkout dev
# make changes, commit
git checkout main
git merge dev
git push origin main dev
```
