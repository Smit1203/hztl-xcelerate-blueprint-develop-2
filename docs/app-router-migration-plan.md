# App Router Migration — Execution Plan (PR 2)

This is the **playbook** for migrating `headapps/nextjs-starter` from Next.js Page Router to App Router. It references [page-router-to-app-router-migration.md](./page-router-to-app-router-migration.md) as the file-by-file "how" — this doc is the "in what order, with what checkpoints."

---

## 1. Baseline (verified on branch start)

| Item | State |
|---|---|
| Branch | `feature/content-sdk-migrate-aapp-router-latest` (branched from `feature/content-sdk-1.5.0-upgrade`) |
| Next.js | 15.3.6 declared, builds with 15.5.12 |
| React | 19.2.1 |
| `@sitecore-content-sdk/nextjs` | ^1.5.0 (resolved 1.5.2) |
| `next-localization` | used by `_app.tsx`, `useDictionary.ts` |
| `src/app/` | does not exist (clean slate) |
| Current `src/middleware.ts` plugins | multisite, redirects, personalize, smallCase |
| `src/pages/api/*` routes | 10 API routes (admin, editing, forms, healthz, robots, script, sitemap, error) |
| Tests | 20 suites / 120 tests passing |

---

## 2. Guiding Rules

1. **Additive before destructive.** `src/app/` is scaffolded alongside `src/pages/` for as long as possible. `src/pages/` is deleted only at the end, after `src/app/` is proven to serve traffic.
2. **One phase per commit.** Keeps the PR reviewable. Every commit must at minimum type-check (`tsc --noEmit` clean). Green build is required at the phase boundaries marked with a ✅ gate below.
3. **No speculative refactors.** If a file doesn't have to change for App Router, leave it. Styling, component logic, and business rules carry over unmodified where possible.
4. **No feature flags.** The final commit is a hard switch — no `USE_APP_ROUTER` toggle, no parallel routes in prod.
5. **If stuck, pause and report.** Don't force an undocumented workaround. The detailed reference doc has a file-by-file answer; if something in our code diverges, escalate before inventing.

---

## 3. Commit Sequence

Each row is one commit. The "Gate" column is what must pass before moving on.

| # | Phase | Commit message | Gate |
|---|---|---|---|
| 1 | 0 | `add next-intl + i18n config scaffolding (no behavior change)` | `tsc --noEmit` clean |
| 2 | 1 | `scaffold app/ directory, layout, and catch-all route` | `tsc --noEmit` clean, `next build` green (pages/ still wins routing) |
| 3 | 2 | `replace pages router middleware with app router middleware` | `next build` green, smoke-test routing in dev |
| 4 | 3 | `migrate 10 API routes from pages/api to app route handlers` | `next build` green, hit each endpoint in dev |
| 5 | 4 | `swap next-localization for next-intl across components` | `next build` green, tests pass, dictionary renders |
| 6 | 5 | `mark client components with 'use client' and fix server imports` | `tsc --noEmit` clean, `next build` green |
| 7 | 6 | `remove src/pages, switch ISR to unstable_cache/revalidateTag, final cleanup` | **Full gate:** `tsc --noEmit` + `next build` + `jest` + manual smoke of golden path |

---

## 4. Phase Details (what, why, risk)

### Phase 0 — Dependencies + i18n scaffolding
- Install `next-intl@^4.3.5`. Keep `next-localization` for now.
- Create `src/i18n/{config,routing,request}.ts`.
- **Not imported yet** by anything — build behavior is unchanged.
- **Risk:** none. Pure additive.

### Phase 1 — App directory skeleton
- Create `src/app/layout.tsx`, `src/app/[site]/[lang]/[[...path]]/{page.tsx,route.ts}`, plus `app/not-found.tsx`, `app/error.tsx`, `app/global-error.tsx`.
- Port `getStaticPaths` → `generateStaticParams`, `getStaticProps` → page server component data fetch.
- Keep `src/pages/[[...path]].tsx` temporarily so Sitecore editing host doesn't break mid-PR.
- **Risk:** Dual catch-all routes can collide. App Router takes precedence by default; verify our app/ scaffolding doesn't 404 before deleting pages/.

### Phase 2 — Middleware swap
- Replace `defineMiddleware(...)` with Content SDK 1.5's `AppRouterMultisiteMiddleware` + `LocaleMiddleware` + our custom plugins wrapped for the new signature.
- Preserve all 4 existing plugins (multisite, redirects, personalize, smallCase) — rewire them, don't rewrite their logic.
- **Risk:** multisite resolution and personalize cookies are load-bearing. Test by hitting at least two sites in dev and confirming the personalize cookie still sets.

### Phase 3 — API → route handlers
- Convert each `src/pages/api/*.ts` to `src/app/api/**/route.ts` with the new Request/Response signature.
- `admin/revalidate` — watch for `res.revalidate()` usage; rewrite to `revalidateTag`/`revalidatePath`.
- `editing/render` + `editing/feaas/render` — these are SDK-provided endpoints; confirm 1.5 ships an app-router variant and use that.
- `forms/SendGridContact` — straight rewrite to a POST handler.
- `sitemap`, `robots` — candidates for Next's built-in `app/sitemap.ts` / `app/robots.ts`, but we'll only do that if trivial; otherwise route handlers.
- **Risk:** this is where regressions hide. 10 endpoints × edge cases. Gate: manually curl each endpoint in dev before committing.

### Phase 4 — i18n usage swap
- Replace `useI18n()` from `next-localization` with `useTranslations()` from `next-intl` in `useDictionary.ts` and any direct consumers.
- Remove `next-localization` from `package.json`.
- **Risk:** missing translation keys fail silently in next-intl unless configured to throw. Keep the fallback behavior the team had in `useDictionary` intact.

### Phase 5 — Client/server boundaries
- Add `'use client'` to every component that uses hooks (useState/useEffect/useContext) or browser APIs.
- Server components: page.tsx, layout.tsx, and anything that calls `client.getPage()`/`getDictionary()` directly.
- **Risk:** forgetting `'use client'` fails at build with cryptic "You're importing a component that needs useState" errors. Work through the error list once rather than preemptively annotating everything.

### Phase 6 — Cleanup
- Delete `src/pages/` entirely (including `_app.tsx`, `_document.tsx`, `404.tsx`, `500.tsx`, `feaas/render.tsx`, and `pages/api/**`).
- Remove `next-localization` from dependencies (if not done in Phase 4).
- Rewire `scripts/bootstrap.ts` if it references pages/ paths.
- Update `eslintConfig` / `jest.config` if they reference pages paths.
- Rewrite ISR: `revalidate` export on each page, or `revalidateTag` from webhook route.
- **Risk:** storybook config, test snapshots, and lint-staged globs often hardcode `src/pages`. Grep aggressively.

---

## 5. Verification Checklist (final gate before push)

- [ ] `npx tsc --project tsconfig.json --noEmit` — no errors
- [ ] `npm run lint:js` — clean
- [ ] `npm run next:build` — clean, expected routes in the output table
- [ ] `npm run test` — 20/20 suites, 120/120 tests, snapshots updated only where intentional
- [ ] `npm run dev` — homepage renders, a second site loads, language switch works
- [ ] `curl localhost:3000/api/healthz` returns 200
- [ ] `curl localhost:3000/api/sitemap` returns XML
- [ ] XM Cloud Preview / editing host still works (load a page in edit mode)
- [ ] No `src/pages/` directory
- [ ] No `next-localization` in `package.json`

---

## 6. Rollback

If Phase 3+ introduces a regression we can't fix same-day:
- Every commit is atomic per phase, so `git revert <sha>` of the last N commits returns us to a working state.
- The branch is freshly cut — no rebase needed against anything downstream.

---

## 7. Out of Scope for This PR

- Content SDK 2.0 upgrade (requires Next.js 16). Separate PR.
- Next.js 16 upgrade. Separate PR.
- Any cloud-sdk (`@sitecore-cloudsdk/*`) major-version bump.
- Any new feature work.

---

## 8. Open Questions (answer before starting Phase 1)

1. Do we have a dev XM Cloud environment to hit during Phase 2/3 smoke testing, or is everything local-mock?
2. Is the `admin/revalidate` endpoint actively called by any webhook today? If yes, we need to coordinate the URL change (`/api/admin/revalidate` stays the same under route handlers — should be fine, just confirm).
3. Is `sitecore.config.ts`'s `redirects` config still the only custom config field, or did something change on the upstream branch?
