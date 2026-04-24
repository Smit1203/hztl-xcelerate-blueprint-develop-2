# HyperX → Sitecore Content SDK 2.0 (App Router) Port — Status Report

Reverse-migration port of HyperX Sitecore starter customizations
(`headapps/nextjs-starter/`, Pages Router, Content SDK 1.5.2) onto
Sitecore's official SDK 2.0 App Router kit (`headapps/nextjs-app-sdk2/`).

Branch: `feature/content-sdk-2.0-migration`

---

## Phase 0 — Import SDK 2.0 App Router kit (DONE — `8549a45`)

**Goal:** Land the official Sitecore Content SDK 2.0 Next.js App Router kit
as the port target, untouched, under `headapps/nextjs-app-sdk2/`.

**What we did:**
- Dropped the full kit into the monorepo (Next.js 16, React 19, Tailwind v4,
  Content SDK `@sitecore-content-sdk/nextjs@^2.0.0`).
- Verified it boots against Skate Park (the kit's demo site).

**Why:** Have a known-good baseline to port against. Kit ships with its own
`nextjs-app-sdk2/.sitecore/component-map.ts` + `import-map.ts` codegen, Skate
Park Tailwind tokens, and stock SitecoreProvider/BrandAndThemeProvider setup.

---

## Phase 1 — Figma token pipeline on Tailwind v4 (DONE — `f427af5`, `7b7d9d2`, `d1f4051`)

**Goal:** Move HyperX's Figma-generated token CSS from Tailwind v3 `theme.extend`
(JS config) to Tailwind v4's CSS-first `@theme {}` block.

### 1.1 — Initial port (`f427af5`)

- Copied all of `nextjs-starter/src/assets/themes/*.css`:
  - `_BrandsBrandX.css` (brand color palette)
  - `_Themes{Light,Dark,White,BrandPrimary,BrandSecondary}.css` (theme maps)
  - `_Device{Mobile,Tablet,Desktop}.css` (responsive token overrides)
  - `_GlobalMode1.css`
  - `_theme-tokens.css` (auto-generated master @theme block)
  - `index.css`
- Wired into `src/assets/main.css`.
- Scoped token cascade to a `.brand-root` element (applied by
  `BrandAndThemeProvider` onto `document.body`).

### 1.2 — Critical fix: Tailwind v4 var-chain resolution (`7b7d9d2`)

**Bug discovered:** Tailwind v4's `@theme` block emits things like:
```css
@theme {
  --color-component-alert-bg-priority: var(--component-alert-bg-priority);
}
```
But it only emits these inside an `@supports` polyfill gated for
old Safari/Firefox. Modern browsers never receive the declaration,
and even when we duplicated to `:root {}`, the right-hand `var(--component-alert-bg-priority)`
is undefined at `:root` (only defined on `.BrandsBrandX`), causing
CSS "invalid at computed-value time" (IACVT) — variable gets unset.

**Fix:** `scripts/sync-theme-tokens-root.mjs` reads `_theme-tokens.css`
and writes all 1,432 declarations into `_theme-tokens-root.css` scoped
under `.brand-root { ... }`. At that scope both `--component-*`
(from BrandsBrandX) and the `--color-*` aliases coexist, so `var()`
chains resolve.

Auto-regenerate via `npm run sync:theme-root`. Re-run after any
`_theme-tokens.css` change.

### 1.3 — Width-token namespace fix (`d1f4051`)

**Bug discovered:** Figma generator placed width tokens under
`--spacing-*` only (comment: "merged into spacing namespace"). Tailwind
v4 `max-w-*` / `min-w-*` utilities don't read `--spacing-*` — they
need `--max-width-*` / `--min-width-*`. Classes like
`max-w-screen-dimensions-max-width` were silently dropped, leaving
MainLayout/Footer/Header without width caps.

**Fix:** Added 14 parallel declarations (6 `--min-width-*`, 8
`--max-width-*`) aliasing onto the same base tokens. Same issue
likely exists for `min-h-*` / `max-h-*` — deferred until a
component hits it. Permanent fix is the Phase 8 generator rewrite.

---

## Phase 2 — BrandAndThemeContext (DONE — `fe74d08`, `6380e3e`)

**Goal:** Runtime brand/theme class injection so the `.brand-root`
scope, brand palette, and theme variant get applied to `document.body`.

**What we did:**
- Ported `BrandAndThemeProvider` — reads siteSettings brandStyle / theme
  from context, applies `brand-root BrandsBrandX ThemesLight` (or
  whatever the config dictates) via `useLayoutEffect`.
- Fixed a Providers TS type error (separate commit).

**Result:** Tokens cascade correctly on the page body.

---

## Phase 3 — Field + generic wrappers (DONE — `ec66305`, plus wave commits)

**Goal:** Port HyperX's Sitecore field wrappers so authored components
get consistent editing-mode handling, fallbacks, RichText post-processing.

**Ported:**
- `helpers/SitecoreWrappers/PlaceholderWrapper/PlaceholderWrapper.tsx`
- `helpers/SitecoreWrappers/PlainTextWrapper/PlainTextWrapper.tsx`
- `helpers/SitecoreWrappers/RichTextWrapper/RichTextWrapper.tsx`
  (includes tokens support + external-link new-tab icon + table
  data-column attribute post-processing)
- `helpers/SitecoreWrappers/LinkWrapper/LinkWrapper.tsx` — minimal
  stub (next/link + LinkField parsing, editing-mode passthrough,
  accepts `ctaComponentClass` / `suppressNewTabIcon` as no-ops).
  Full 375-line starter version (CTA theming, GTM, external-link
  icon, button variants) deferred until a CTA-heavy component is
  ported.
- `helpers/SitecoreWrappers/ImageWrapper/ImageWrapper.tsx` (wave 4b)
- `helpers/SitecoreWrappers/SvgImageWrapper/SvgImageWrapper.tsx`
  (wave 4b)

**Not yet ported:**
- `ButtonWrapper` — needed with full LinkWrapper
- `GenericWrappers/*` — any, when encountered

---

## Phase 4 — Custom hooks (DONE — `ec66305`, plus later additions)

**Ported to `src/lib/hooks/`:**
- `useIsEditing` — wraps `useSitecore().page.mode.isEditing` check.
- `useDictionary` — `useMessages`-based implementation (switched from
  `useTranslations` to avoid `MISSING_MESSAGE` throw when a site
  namespace is absent). Falls back to provided fallback or key.
- `useFieldWithFallbacks` — iterates a field + fallback list, returns
  the first non-empty field.
- `useScrollElementIntoView` + `smoothScrollToElement` helper.
- `sitecore/context.ts` — `useSitecoreContext`, `useSiteSettings`,
  `usePageMode`, `useSvgCache` (stub).

**Deferred:**
- `useCtaComponentClass`, theming hooks — arrive with ButtonWrapper/full LinkWrapper.

---

## Phase 5 — Authorable components (IN PROGRESS — 6 of 53 ported)

Porting Sitecore-driven components in waves. Waves are grouped
by dependency tree depth, not alphabetical — earliest waves unblock
the most downstream work.

### Wave 1 — RTE (DONE — `a429d5c`)
Simple component, proves the RichTextWrapper + authorable registration pipeline.

### Wave 2 — SkipNav + SvgIcon (DONE — `9c07661`)
- SvgIcon: dynamic lazy loader, `useMemo` fix for re-mount bug.
- SkipNav: accessibility component, uses `useDictionary`, `useScrollElementIntoView`.

### Wave 3 — Alert (DONE — `a84b2ad`)
- Alert: reads `useSiteSettings().siteAlerts`, filters by Alert Type
  param, active date window, per-alert dismissal via js-cookie.
- Added `js-cookie` + `@types/js-cookie` as deps.
- Minimal LinkWrapper stub introduced here (extended later).

### Wave 4a — MainLayout + object-utils (DONE — `9675afa`)
- MainLayout: `'use client'` layout wrapper, three placeholders
  (breadcrumb / hero / main-content), search-layout variant via
  `findComponent` heuristic.
- `lib/utils/object-utils.ts`: `deepSearch` + `findComponent`
  (verbatim from starter).
- Registered with `componentType: 'client'` in both component-map
  and component-map.client — omitting this caused an RSC error
  ("Functions cannot be passed directly to Client Components").

### Wave 4b — Footer + image wrappers (DONE — `d54cb6d`)
- Footer: server component composing client wrappers. Renders logo,
  description, column link lists, copyright with `{{year}}` token
  replacement, social media links.
- ImageWrapper: `ImageField` → `next/image` with editing-mode
  passthrough, unoptimized toggle based on domain allowlist.
- SvgImageWrapper: fetches + inline-renders remote SVGs with
  sanitization, optional cache read from Sitecore context.
- `lib/next-config/plugins/images.js`: `isValidNextImageDomain` +
  `nextConfigImages`.
- LinkWrapper extended with `suppressNewTabIcon` prop (no-op).
- `useSvgCache` hook added (stub — returns `undefined` until
  svg-cache plugin lands).

### Wave 4c — Header (NEXT, ~1,775 LOC across 5 files)
Expected deps: LanguageSelector, HeaderDesktop, HeaderMobile, logo,
nav-menu subcomponents. Likely forces full LinkWrapper port
(CTA theming, GTM, external-link icon).

### Wave 5+ — Remaining components (PENDING, ~47 components)
Navigation, LinkList, Title, Promo, ContainerFullWidth, Hero,
Breadcrumb, PageContent, Image, Container, ColumnSplitter,
RowSplitter, ContentBlock, PartialDesignDynamicPlaceholder, plus
all Foundation / feature components. Will be grouped by dep tree
as we go.

---

## Phase 6 — Middleware plugins → App Router data fetching (IN PROGRESS)

HyperX Pages Router has a plugin system (`getStaticProps` / `getServerSideProps`
plugins). App Router doesn't — logic moves into server-side helpers
invoked directly from `app/[site]/[locale]/[[...path]]/page.tsx`.

### Done

- **sitecore.config** (`78c420f`): set `defaultSite` / `defaultLanguage`,
  added redirects locales so proxy routes resolve.
- **graphql-client-factory** (`a1fbad1`): ported factory + `getSiteRoot`
  GraphQL helper.
- **getSiteSettings** (`c69b4ba`): server-side GraphQL fetch mirroring
  the Pages Router site-settings plugin. Queries the SiteSettings
  template under site root, returns `{ gtmId, favicon,
  socialShareLinks, siteAlerts, search widget ids, result counts,
  brandStyle }`. Wired into page.tsx, lands on
  `page.layout.sitecore.context.siteSettings`.
- **useSiteSettings + context hooks** (`c69b4ba`): client hook module
  exposing the context read helpers.
- **getPageLanguages** (`e5dbd14`): ports Pages-Router page-languages
  plugin as an App-Router server helper. Wired alongside getSiteSettings.
- **useDictionary resilience** (`e5dbd14`): switched to `useMessages`
  + manual lookup so missing namespaces don't throw.

### Pending

- **svg-cache plugin** — server-side SVG prefetch + cache into context.
  Currently `useSvgCache` returns `undefined` and SvgImageWrapper
  falls back to live fetch. Not blocking but would improve perf.
- **Any remaining Pages-Router plugins** we haven't yet mapped to
  App-Router server helpers.

---

## Phase 7 — Integrations (PENDING)

- `@sitecore-search` widgets
- SendGrid
- GTM (Google Tag Manager via `@next/third-parties/google`)
- Personalize

Likely arrives alongside components that consume them (Navigation for GTM,
search widgets with Search-related components).

---

## Phase 8 — Authoring + site config + Figma generator (PENDING)

- Port authoring content (Sitecore items) from starter.
- Finalize `sitecore.config.ts`.
- Port `tailwind-figma-config.ts` → `_theme-tokens.css` generator script
  with the two bugs fixed:
  1. Emit `--max-width-*` / `--min-width-*` / `--max-height-*` /
     `--min-height-*` namespaces in addition to `--spacing-*`.
  2. Emit into `_theme-tokens-root.css` directly (bypass the sync script).

---

## Phase 9 — Tests, Storybook, full verification (PENDING)

- Port Jest tests from starter (snapshot updates expected).
- Port Storybook (`.storybook/` config + `src/stories/`).
- Visual parity check across all brands × locales.

---

## Known quirks + workarounds

### `.sitecore/import-map.ts` leading-slash bug

Codegen (`sitecore-tools:generate-map`) emits
`import client from '/lib/sitecore-client'` with a broken leading
slash. User manually patched to relative paths
(`./component-map`, `../src/lib/sitecore-client`, `../sitecore.config`).
Module keys in the registry unchanged — only the import statement.
**Regenerating the map will overwrite this patch** — re-apply after
every codegen run. Long-term fix: post-codegen auto-patch script OR
upstream bug report.

### `.sitecore/import-map.server.ts` has `'use client';`

Codegen scans MainLayout's (a client component) imports and dumps
them into both client and server maps, then slaps `'use client'`
on the server map to make it compile. Cosmetic, not breaking.

### `locale={false}` DOM warning

SDK's own `<Link>` at `@sitecore-content-sdk/nextjs/dist/esm/components/Link.js:51`
passes Pages-Router idiom `locale: false` to NextLink. App Router
NextLink doesn't consume it, warning leaks. Will disappear as we
replace each kit component (Navigation, LinkList, Title, Promo) with
our ports that use `LinkWrapper`.

### Tailwind v4 var-chain resolution

See Phase 1.2 — any new token regen must re-run
`npm run sync:theme-root` to mirror declarations onto `.brand-root`.

### RSC boundary — client components in component-map

Client components (with `'use client'`) **must** be registered
with `componentType: 'client'` in `component-map.ts` and also
added to `component-map.client.ts`. Missing either causes
"Functions cannot be passed directly to Client Components".
Applies to: SkipNav, Alert, RTE, MainLayout, Navigation, ContentBlock.

---

## Commit log (feature/content-sdk-2.0-migration branch)

```
d54cb6d Phase 5 wave 4b: port Footer + image/svg wrappers
d1f4051 Phase 1 fix: add --min-width-* / --max-width-* token namespaces
9675afa Phase 5 wave 4a: port MainLayout + object-utils
e5dbd14 Phase 6: page-languages helper + resilient useDictionary
7b7d9d2 Phase 1: fix Tailwind v4 @theme var-chain resolution
a84b2ad Phase 5 wave 3: port Alert component + minimal LinkWrapper
c69b4ba Phase 6: port site-settings fetch + useSiteSettings hook
a1fbad1 Phase 6: port graphql-client-factory + getSiteRoot gql helper
78c420f Phase 6: set defaultSite/defaultLanguage + redirects locales
9c07661 Phase 5 wave 2: port SkipNav + SvgIcon + scroll helper
a429d5c Phase 5 wave 1: port RTE authorable component
ec66305 Phase 3: port core Sitecore field wrappers + editing helpers
6380e3e providers type error resolved
fe74d08 Phase 2: port BrandAndThemeContext
f427af5 Phase 1: port HyperX Figma token pipeline (Tailwind 4)
8549a45 Phase 0: Add Sitecore Content SDK 2.0 App Router kit
```

---

## Resuming work — pick-up checklist

1. **Start dev server:** `cd headapps/nextjs-app-sdk2 && npm run dev`
2. **Check `.sitecore/import-map.ts`** — if codegen ran, re-apply the
   relative-path patch.
3. **Typecheck:** `npx tsc --noEmit` from `nextjs-app-sdk2/`.
4. **Visit `/`** — should render Header orange box (Phase 5 wave 4c
   pending), MainLayout with its placeholders (wave 4a done, placeholder
   children still orange), Footer rendering fully (wave 4b done).
5. **Next task:** Phase 5 wave 4c — Header. See
   `nextjs-starter/src/components/authorable/shared/site-structure/Header/`
   for the five files to port (~1,775 LOC). Expect full LinkWrapper port
   to become unavoidable here.

---

## Token-efficient next-session bootstrap

If resuming with a fresh Claude session, paste this doc's top
section + the "Commit log" + the target task from "Resuming work".
Everything else is recoverable from git history and the codebase.
