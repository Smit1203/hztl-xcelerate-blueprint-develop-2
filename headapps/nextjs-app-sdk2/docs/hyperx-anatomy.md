# Anatomy of HyperX — what it adds on top of a vanilla Sitecore Content SDK starter

This document inventories every capability HyperX layers onto a stock Sitecore Content SDK Next.js project, why each piece exists, and what implementation footprint it carries. It's intended as the technical case for "yes, HyperX can be re-platformed onto SDK 2.0 / App Router and remain feature-complete at scale."

A vanilla `nextjs-starter` from Sitecore gives you a layout service, a `componentMap`, a few example components (Title, Promo, Container, etc.), and the editing chrome. That's it. Everything below is HyperX-built scaffolding that turns that starter into a brand-controllable, theme-switchable, Figma-driven, edit-mode-aware design system.

---

## 1. Figma → Tailwind token pipeline (the centerpiece)

**What it is:** a build-time code generator that ingests a Figma Variables JSON export and emits a complete Tailwind v4 `@theme` block plus a stack of CSS files that scope design tokens to brand, theme, device, and global namespaces.

**Files involved:**

- `tailwind-figma-config.ts` — the generator. Reads Figma's `variables.json`, walks the modes (Brand × Theme × Device × Global), and writes:
  - `_theme-tokens.css` — `@theme { --color-*: var(--color-*); --text-*: var(--text-*); --spacing-*: …; --font-*: …; }` (about 1,100 declarations). This is what tells Tailwind v4 which utilities to generate.
  - `_theme-tokens-root.css` — mirror of the above, scoped to `.brand-root` so the same vars cascade to every component descendant.
  - `_BrandsBrandX.css`, `_BrandsHelloWorld.css`, `_BrandsNimbusGoods.css`, `_BrandsMode.css` — leaf brand values (`--color-brand-primary: #...; --typography-body-desktop-medium-font-size: 16px; --typography-body-font-family: var(--font-inter);`).
  - `_ThemesWhite.css`, `_ThemesLight.css`, `_ThemesDark.css`, `_ThemesBrandPrimary.css`, `_ThemesBrandSecondary.css` — semantic theme overrides.
  - `_DeviceDesktop.css`, `_DeviceTablet.css`, `_DeviceMobile.css` — responsive token overrides wrapped in `@media (min-width: 1200px) { .brand-root { … } }` etc.
  - `_GlobalMode1.css` — global, non-brand-specific defaults (border radii, spacing scale).
- `scripts/sync-theme-tokens-root.mjs` — keeps `_theme-tokens-root.css` in sync with `_theme-tokens.css` so the cascade-scoped mirror never drifts.

**The cascade.** A utility like `text-typography-body-medium-font-size` resolves through this chain at runtime:

```
Tailwind utility:  font-size: var(--text-typography-body-medium-font-size);  /* :root via @theme */
                          ↓
                   var(--typography-body-medium-font-size);                   /* .brand-root @media desktop */
                          ↓
                   var(--typography-body-desktop-medium-font-size);           /* .BrandsBrandX */
                          ↓
                   16px;
```

Five layers of indirection sounds excessive — but each layer is a customization seam. Re-skinning a brand is a 50-line `_BrandsX.css` patch, not a code change. Adding a new device breakpoint is one new `_Device*.css`. Swapping the entire visual identity per page is `<body class="ThemesDark">` instead of `ThemesWhite`. The pipeline is what makes a multi-brand, multi-theme, multi-device design system tractable.

**What you get from this layer:** every Tailwind class in every component is typed against the design system. There are no hex codes or magic px values in any component. A designer changing `--color-brand-primary` in Figma updates every consumer in one regenerate.

---

## 2. Brand + theme runtime injection (`BrandAndThemeContext`)

**What it is:** the runtime side of the token pipeline. Resolves the active brand from the route's `siteName`, picks a default theme, and applies `class="brand-root <Brand> <Theme>"` to `<body>` so the cascade above actually has its scoping selectors.

**Pieces:**

- `BrandAndThemeContext.tsx` — React context, `useBrandAndTheme()` hook, `<BrandAndThemeProvider>` that lets a component override the theme for its subtree (Section uses this — each Section can render in a different theme).
- `getBrandForSiteName(siteName)` — pure mapping function used by both server (root layout) and client (provider) so SSR and CSR agree on the brand.
- `BRAND_MAPPING`, `THEME_MAPPING` — declarative arrays. New brand = one entry.

**Why it matters:** without this, the token cascade is dead. Every utility resolves to `unset` and the page falls back to UA-default fonts and colors. Subtle, hard-to-debug, but devastating to first-paint UX. (We hit exactly this earlier today on the SDK 2.0 port — root cause documented in [`sdk2-port-fixes.md`](sdk2-port-fixes.md) §2.)

---

## 3. Sitecore field + presentation wrappers (`helpers/SitecoreWrappers/`)

The SDK ships primitive field renderers (`<Image>`, `<Text>`, `<RichText>`, `<Link>`, `<Placeholder>`). HyperX wraps every one of them with project-specific behavior. Every authored component uses these wrappers — never the SDK primitives directly.

| Wrapper | What it adds beyond the SDK primitive |
|---|---|
| **LinkWrapper** | Internal vs external vs email vs anchor vs custom-protocol detection; GTM event firing on click; screen-reader-only "(opens in new tab)" text; new-tab icon; CTA variant + style props (`primary`/`secondary`/`tertiary`/`link`/`custom`); falls back to SDK `<Link>` (JSS-style) in editing mode for chrome compatibility; supports `fallbacks` array of fields |
| **ImageWrapper** | next/image integration with explicit `sizes`/`priority`; edit-mode passthrough so authors can right-click → edit; `fallbacks` (e.g., page-level hero image when component-level is unset); responsive `srcSet` derived from device tokens |
| **RichTextWrapper** | Sanitization config, edit-mode chrome, optional element wrapper, RTE token replacement |
| **PlainTextWrapper** | Tag selection (h1…h6, span, div), `fallbacks`, conditional render-on-empty, edit-mode chrome |
| **SvgImageWrapper** | Inline SVG fetch + cache (via context-stored `svgCache`), color/size variant control via tailwind-variants, fallback to `<img>` in edit mode |
| **PlaceholderWrapper** | Wraps SDK `<Placeholder>` with edit-mode placeholder indicators (chevron-up/down + placeholder name label), works around a JSS bug where edit mode wraps children in an extra layer, exposes `helpTextClassName`/`helpTextHideIf` for per-placement customization |
| **ButtonWrapper** | Full CTA variant matrix — `iconAlignment` × `variant` (custom/link/primary/secondary/tertiary) × `visibility` × `style` (primary/white/tonal). Drives every button on the site. ~570 LOC of compound variants mapped to component-button-* design tokens |

**Why this matters:** every cross-cutting concern (analytics, accessibility, edit-mode chrome, design-system styling) lives in the wrappers. Authored components stay at ~50–300 LOC each because they assume their wrappers will do the heavy lifting. Replace one wrapper, change behavior project-wide.

---

## 4. The Higher-Order Component layer (`helpers/HOC/`)

Two HOCs compose into one canonical wrapper used by ~80% of authorable components.

- **`withDatasourceCheck`** — bails out (or shows an editing-error component) when `props.rendering.dataSource` is missing. Prevents crashes when an author drops a component on a page without picking content.
- **`withPagesStyleChangeWatcher`** — Sitecore Pages, the visual editor, lets authors toggle CSS classes on a component live. This HOC subscribes to the rendered DOM with a `MutationObserver`, watches its host node for class changes, and propagates them into `props.params.Styles` so a re-render reflects what the author just toggled. Without it, the Pages "Style" toolbar appears to do nothing.
- **`withStandardComponentWrapper(Component, hasDataSource)`** — composes the two. Becomes the default export of nearly every authored component.

**Why this matters:** these are non-negotiable for the Sitecore Pages experience. Removing them breaks editor parity. They also encapsulate the "edit mode vs published mode" distinction the rest of the codebase ignores.

---

## 5. CTA / button styling system

A self-contained sub-pipeline that translates Sitecore "Styles" params (free-form strings authors set in Sitecore) into typed Tailwind variants.

- `lib/utils/style-param-utils/` — parser turning `cta1.ctaVariant=primary;cta2.ctaStyle=white` into `{ cta1: { ctaVariant: 'primary' }, cta2: { ctaStyle: 'white' } }`.
- `lib/utils/cta-utils.ts` — `getCtaStyle(parsed, fallback)` resolution.
- `lib/hooks/theming/useCtaComponentClass.ts` — looks up the active brand × theme × global token map, with recursive `var(--...)` reference resolution (`resolveVariableMapping`, max recursion depth of 10 to defeat circular references).
- `helpers/SitecoreWrappers/ButtonWrapper/` — consumes everything above and renders `tv()` slots with the right token classes.

**Why this matters:** authors get a paint-by-numbers CTA system without learning Tailwind. Designers get a token system that maps cleanly to Figma component variants. Engineers get static-typed, lint-checkable button props.

---

## 6. Generated TypeScript models (`.generated/`)

A 360 KB tree of auto-generated types — one per Sitecore data template — used by every component for `props.fields`/`props.params` typing.

- Hierarchy: `Content/`, `Layout/`, `Lists/`, `Media/`, `PageSpecific/`, `SiteStructure/`, `Foundation.HztlFoundation.model.ts`, `Project.HztlFoundation.model.ts`, `_.Sitecore.Override.ts`.
- Each component imports its slice: `import { Layout } from '.generated/Layout/Section.model'` → `Section_Component`, `SectionParameters_Component`.
- Generated by an external tool from the Sitecore template schema; not hand-edited.

**Why this matters:** Sitecore's layout service returns untyped JSON. Without these models, every component would be `props: any` or hand-rolled types that drift from the template. With them, renaming a Sitecore field surfaces as a TypeScript error in every consumer instantly.

---

## 7. Custom hooks (`lib/hooks/`)

| Hook | Purpose |
|---|---|
| `useIsEditing` | One-line check for Sitecore edit/preview mode. Used inside every wrapper. |
| `useIsMobile` | SSR-safe responsive matchMedia hook keyed off `--breakpoint` token. |
| `useScrollElementIntoView` | Smooth-scroll with sticky-header offset compensation. Powers anchor links, JumpNav, and back-to-top. |
| `useDictionary` | Resilient dictionary/i18n lookup with key fallback. |
| `useFieldWithFallbacks` | Returns first non-empty Sitecore field from a chain (component-level → page-level → site-default). Wraps the wrappers' `fallbacks` prop. |
| `useCurrentPage<T extends XceleratePage>` | Typed access to the current route's layout data. |
| `sitecore/context.ts` | `useSitecoreContext`, `useSiteSettings`, `useSvgCache`, `useLanguages`, `usePageMode`. |
| `theming/useBrandAndTheme` | Active brand/theme from context. |
| `theming/useCtaComponentClass` | See §5. |

---

## 8. Generic interaction wrappers (`helpers/GenericWrappers/`)

Non-Sitecore-specific, project-wide wrappers that handle complex interactive behavior.

- **`ModalWrapper`** — focus trap, ESC handler, scroll lock, brand-root passthrough on the modal root, supportedFonts injection (because portals escape the body's font cascade).
- **Carousel wrapper** — Splide setup, intersection observer for autoplay-on-scroll, brand-aware styling.
- **`EditingHelpText`** — visible-only-in-editor inline help for placeholder labels.

---

## 9. Editing chrome integration

Sitecore Pages renders the published frontend inside an iframe and overlays editor controls. Several HyperX pieces exist solely to make that integration smooth:

- `PlaceholderIndicator` — visible only in edit mode, marks placeholder boundaries with chevrons + names.
- `EditingHelpText` — tagged with `data-editing-help-text`, hidden in published mode.
- `withPagesStyleChangeWatcher` — see §4.
- Component `data-component` attributes (`data-component="authorable/shared/site-structure/footer/footer"`) — let Pages map a DOM node back to its rendering for chrome positioning.
- "component" CSS class injection in dev mode for the same reason.

---

## 10. Multi-brand font loading (`lib/fonts/`)

`brand.all.ts` aggregates every `next/font/google` instance the project's brands need (Inter, Roboto, DM Serif Text, Noto Sans, …). The body element receives every `.variable` className. Each brand's tokens then reference its preferred font (`var(--font-inter)`), and the cascade resolves correctly regardless of which brand is active.

Per-brand font files (`brand.HelloWorld.ts`, `brand.default.ts`, `brand.generated.ts`) exist for code-splitting if a future deployment wants to ship only one brand's fonts.

---

## 11. Site settings + multi-site infrastructure

- `sitecore.config.ts` — declarative multisite definitions (host → siteName → defaultLanguage), edge API config, redirects, personalize config, locale list.
- `lib/site-settings/` — fetches site-level settings (logos, social links, default fallbacks) via GraphQL and caches them per-request.
- `lib/page-languages` helper — derives available locales for a given page.
- `getBrandForSiteName(siteName)` — bridges site → brand.

A single deployment handles multiple brands, multiple locales, and multiple Sitecore sites without rebuilds.

---

## 12. GraphQL data fetching (`lib/graphql-client-factory/`)

Wraps the SDK's `GraphQLRequestClient` with project defaults: retry strategy, cache policy, default headers, default site/language. Every component-level data fetch (`getComponentServerProps` / `GetStaticComponentProps`) goes through this factory so client behavior is centralized.

`getSiteRoot` GraphQL helper exposes site-level metadata to whichever component needs it (Footer, Breadcrumb, etc.).

---

## 13. Analytics & tracking (`lib/utils/gtm-utils.ts`)

Standardized GTM event payloads — link click, video start, form submit, etc. — fired via `@next/third-parties/google`'s `sendGTMEvent`. Wrappers (LinkWrapper, ButtonWrapper, VideoCardItem) call into this so every interaction is instrumented uniformly.

---

## 14. URL & link parsing (`lib/utils/link-utils.ts`)

`parseLink(linkField)` returns a typed shape distinguishing internal nav, external `https`, `mailto:`, `tel:`, anchors (`#section`), and custom protocols (`chrome-extension://...`, `slack://...`). LinkWrapper consumes this to decide between `<NextLink>`, `<a>`, JSS `<Link>`, and screen-reader-only annotations.

---

## 15. String utilities (`lib/utils/string-utils.ts`)

`ReplacementToken` system — `{{year}}` → `2026`, `{{siteName}}` → "BrandX", etc. Used by Footer's copyright text, by structured data, by metadata. Authors don't need to remember to update copyright every January.

---

## 16. Sitecore Search integration

Search-specific components under `authorable/shared/page-specific/SearchResult/` consume `@sitecore-search/react` widgets — `SearchFilterFacets`, `SearchSort`, `SearchPagination`, `SearchSelectedFilterTags`. Wired to Sitecore Search via the SDK's provider, with project-styled UI.

---

## 17. Sitecore Personalize / CDP

`lib/personalize/` + `CdpPageView` integration sends page-view events to the CDP and consumes per-component personalization variants (the SDK calls these "rendering variants"). Authoring is per-component; runtime is invisible to consumers.

---

## 18. i18n & dictionary

- `lib/i18n/routing.ts` — locale list + default locale.
- `useDictionary` — resilient lookup with fallback chain (current locale → default locale → key).
- `LocaleProxy` / locale-aware middleware — route prefixing.

---

## 19. Page-level content components

- **`Metadata.tsx`** — Open Graph, Twitter card, canonical URL, structured data per page.
- **`StructuredData.tsx`** — JSON-LD per data template (Article, Organization, BreadcrumbList, etc.).
- **`PageTitle.tsx`** — branded h1 with eyebrow, optional kicker.

---

## 20. Authorable component library

The bulk of the codebase. ~57 components organized by concern:

- **`content/`** — Alert, CodeEmbed, Feature, FeatureSidebySide, Hero, Metadata, Modal, PageTitle, Quote, RTE.
- **`layout/`** — ArticleMain, Container-25-75, Container-50-50, Container-75-25, ContainerCenter-75, ContainerFullBleed, ContainerFullWidth, Divider, JumpNavContainer, JumpNavSection, SearchMain, Section, SidebarLayout.
- **`lists/`** — Accordion, AccordionItem, CardItem, CardList, Carousel, CarouselItem, ContextualNav, ContextualNavItem, FileList, Stats, StatsItem, Tab, TabItem, VideoCardItem.
- **`media/`** — InlineIFrame, InlineImage, InlineVideo, Share.
- **`other/`** — CustomForm.
- **`page-specific/`** — ArticleCategoryTabs, ArticleContent, ArticleListing, PopularArticles, RelatedArticles, plus search components.
- **`site-structure/`** — BackToTop, Breadcrumb, Footer, Header, HeaderContext, HeaderDesktop, HeaderMobile, LanguageSelector, MainLayout, SkipNav.

Every one of them is a thin orchestration of §3 wrappers + §1 tokens + §6 typed models. The library is "wide but shallow" by design — adding a 58th component is a 30–90 minute task because the heavy infrastructure already exists.

---

## 21. Build & code generation

Custom scripts beyond what the SDK provides:

- `tailwind-figma-config.ts` (§1).
- `scripts/sync-theme-tokens-root.mjs` (§1).
- `sitecore-tools project component generate-map` — runs before every dev/build, scans `src/components/**/*.{ts,tsx}`, emits `.sitecore/component-map.ts` and `.sitecore/component-map.client.ts` from file basenames. Detects `'use client'` and tags client-flavored entries automatically.
- `sitecore-tools project build` — emits `.sitecore/import-map.{server,client}.ts` and `.sitecore/metadata.json` for editing-codegen integration.

These are wired through `npm-run-all --serial` in the dev/build scripts so a clean checkout boots without manual codegen steps.

---

## 22. Storybook

Every authorable component ships with a Storybook story under `src/stories/`. The toolbar exposes a brand selector and theme selector that swap the body classes — so the same component preview cycles through every brand × theme combination without route changes.

Used as the design-system documentation surface and as a regression net during refactors.

---

## 23. Testing

Vitest/Jest setup with `__mocks__/` for Sitecore context, layout data, and edit mode. Per-component snapshot + behavior tests under `__tests__/`. Mocks include a fake `useSitecoreContext` so components can be exercised without a running Sitecore.

---

## 24. Middleware plugins

The SDK 2.0 ships its own proxy plugins (`LocaleProxy`, `AppRouterMultisiteProxy`, `RedirectsProxy`, `PersonalizeProxy`). HyperX in Pages-Router form had hand-written equivalents; in App Router form the SDK plugins do most of the work, but custom rules layer on top:

- Sitecore media `/-/media/...` routing (today via the route-handler proxy in `app/api/sitecore-media/`).
- `/sitecore/api/*` and `/sitecore/service/*` connected-mode proxying.
- Custom redirects sourced from Sitecore.
- Healthz, sitemap, robots, AI summary endpoints.

---

## 25. Environments & deployment

- `.env.local` / `.env.container.example` / `.env.remote.example` — three deployment shapes (local connected mode, container, edge).
- `NEXTJS_DIST_DIR` override — multiple distinct `.next` directories per container instance.
- Standalone Next output for container deployments.
- preconnect to `edge-platform.sitecorecloud.io` in root layout for first-paint optimization.

---

## TL;DR — what HyperX is

HyperX is **a design-system runtime + author-experience layer** built on top of Sitecore Content SDK. Vanilla SDK gives you "render Sitecore JSON to React." HyperX gives you:

1. A Figma-driven token pipeline that compiles to Tailwind v4 utilities (§1).
2. A multi-brand × multi-theme × multi-device runtime cascade (§2).
3. A wrapper layer that handles every cross-cutting concern (§§3–4).
4. A typed CTA/button styling system (§5).
5. Auto-generated TypeScript models for every Sitecore template (§6).
6. ~12 reusable hooks + ~10 generic interactive wrappers (§§7–8).
7. First-class Sitecore Pages editing-mode integration (§9).
8. Multi-brand font loading + multi-site routing + i18n (§§10–11, 18).
9. Centralized data-fetch, analytics, and link-parsing utilities (§§12–14).
10. ~57 production-tested authorable components (§20).
11. Storybook + tests + multi-environment deployment story (§§22–23, 25).

The total is materially bigger than the sum of components. Re-platforming HyperX onto SDK 2.0 / App Router is mechanical *because* of this scaffolding — port the scaffolding once, and components fall in line.

---

## Already-validated on the SDK 2.0 App Router target

A baseline of HyperX scaffolding is already proven working on the new target, end-to-end:

- **§1 token pipeline** — every CSS file ports verbatim; Tailwind v4 `@theme` resolves the cascade correctly.
- **§2 brand/theme runtime** — body classes applied at SSR, brand-root cascade live on first paint, no FOUC.
- **§3 wrappers** — Image/Link/RichText/PlainText/Svg/Placeholder all functional under Footer.
- **§10 multi-brand fonts** — Inter + Roboto load and resolve through brand tokens.
- **§21 codegen** — `sitecore-tools` recurses HyperX folder structure (`authorable/shared/<area>/<Name>.tsx`) and registers each by basename — confirmed today by relocating Footer/Header/MainLayout/SkipNav/etc. without manual map edits.
- **§24 media proxy** — Sitecore IIS media via custom route handler with header stripping (Next's built-in `rewrites:` proxy injects `X-Forwarded-*` and breaks IIS — known issue, solved).

The pattern works. Component-by-component porting beyond this point is project-management, not architecture.
