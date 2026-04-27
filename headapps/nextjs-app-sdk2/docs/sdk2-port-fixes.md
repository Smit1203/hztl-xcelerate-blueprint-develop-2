# SDK 2.0 App Router port — fixes log

Fixes applied while porting HyperX (Pages Router, Content SDK 1.5) onto the SDK 2.0 App Router kit at `headapps/nextjs-app-sdk2/`. Each section explains the symptom, the root cause, and the change that resolves it. All four fixes are currently applied.

---

## 1. Sitecore media images returned 404 / 500

### Symptom

Every `/-/media/Project/.../*.png|svg` request from the Footer (and other components) returned an HTML error page from Sitecore IIS:

```
HTTP/1.1 500 Internal Server Error
content-type: text/html; charset=utf-8
…
Server Error in '/' Application. Runtime Error.
```

Hitting the same URL directly against `SITECORE_API_HOST` returned `200`.

### Root cause

The starter kit shipped with no rewrite for `/-/:path*`, so Next returned 404. Adding a Next built-in `rewrites:` rule pointing at `${SITECORE_API_HOST}/-/:path*` got further but then returned `500`.

Diagnosis: Next's built-in proxy rewrite automatically attaches forwarded-request headers when proxying to an absolute external destination. Specifically `X-Forwarded-Host: localhost:3000` and `X-Forwarded-Proto: http`. Sitecore's IIS uses these to compute media URLs server-side and throws an ASP.NET runtime error when the host string looks like `localhost`. Verified by replaying upstream with curl:

| Request | Status |
| --- | --- |
| Direct curl to upstream | `200` |
| Direct curl with `X-Forwarded-Host: localhost:3000` and `X-Forwarded-Proto: http` | `500` |
| Through Next's `rewrites:` | `500` (same body as the above) |

The hop-by-hop `X-Forwarded-*` headers cannot be removed from a Next rewrite — that knob doesn't exist. The fix is to do the proxy ourselves in a route handler so we control every byte of the outbound request.

### Change

Two pieces:

1. [src/app/api/sitecore-media/[...path]/route.ts](../src/app/api/sitecore-media/%5B...path%5D/route.ts) — proxy handler. Builds upstream from `SITECORE_API_HOST`, strips `host`, all `x-forwarded-*`, `forwarded`, `cookie`, and the RFC 7230 hop-by-hop headers before forwarding. Strips `content-encoding` / `content-length` / `transfer-encoding` from the response (those belong to the next hop, not us). Adds a sane `cache-control` default if upstream omits one. Handles `GET` + `HEAD`, returns `502` on connect errors, `400` on empty path.
2. [next.config.ts](../next.config.ts) `rewrites:` — `/-/:path*` → `/api/sitecore-media/:path*`. Pure path-routing inside Next, no upstream connection happens at the rewrite layer, so no header injection.

Also broadened [next.config.ts](../next.config.ts) `images.remotePatterns` to whitelist Sitecore Cloud / Content Hub absolute hosts (`*.sitecorecloud.io`, `*.cloud.contenthub.com`, `*.sitecorecontenthub.cloud`, plus the existing `edge*.**` and `xmc-*.**`). Pages-routed assets come back as relative `/-/media/...` and use the proxy; Content Hub assets come back as absolute URLs and now load directly through `next/image`.

### Verification

```
curl -s -o /dev/null -w "%{http_code} %{content_type}\n" \
  "http://localhost:3000/-/media/Project/HztlFoundation/BrandX/Logos/BrandX.png?h=32&w=102"
# 200 image/png
```

---

## 2. SSR `<body>` had no theme classes — every design-token utility resolved to nothing

### Symptom

Footer rendered with browser-default font sizes and no underlines. HyperX side-by-side showed correct sizing. After hard-reload the layout was still wrong even after JS hydrated.

### Root cause

The Figma token CSS files (`src/assets/themes/_DeviceDesktop.css`, `_BrandsBrandX.css`, `_ThemesWhite.css`, etc.) declare custom properties scoped to `.brand-root.<Brand>.<Theme>` selectors. Tailwind utilities like `text-typography-body-medium-font-size` resolve through the chain:

```
text-typography-body-medium-font-size
  └─> var(--text-typography-body-medium-font-size)        ; @theme on :root
       └─> var(--typography-body-medium-font-size)        ; .brand-root @media (min-width: 1200px)
            └─> var(--typography-body-desktop-medium-font-size)  ; .BrandsBrandX
                 └─> 16px
```

If any link in the chain isn't satisfied, the `font-size` declaration becomes invalid and the browser falls back to UA default (~16px / Times New Roman in Chrome).

`BrandAndThemeContext.tsx` only adds `brand-root`, `BrandsBrandX`, `ThemesWhite` to `<body>` inside `useLayoutEffect` — i.e. client-side, post-hydration. The SSR HTML had a bare `<body>`, so the entire Figma token cascade was dead on first paint, and curl confirmed:

```
$ curl -s http://localhost:3000/ | grep -oE '<body[^>]*>'
<body>
```

### Change

Apply the brand/theme/`brand-root` classes directly in the App Router root layout so they exist in the SSR HTML. But `BrandAndThemeContext.tsx` is `'use client'`, so its constants (`DefaultBrand`, `DefaultTheme`) can't be imported from a server component — a server-component import of a client export errors with "Attempted to call DefaultBrand() from the server but DefaultBrand is on the client."

Two pieces:

1. [src/lib/context/brand-theme-constants.ts](../src/lib/context/brand-theme-constants.ts) — new server-safe module containing `Brands`, `Themes`, `BRAND_MAPPING`, `THEME_MAPPING`, `ALL_BRANDS`, `ALL_THEMES`, `DefaultBrand`, `DefaultTheme`, `getBrandForSiteName`. No `'use client'`, no React.
2. [src/lib/context/BrandAndThemeContext.tsx](../src/lib/context/BrandAndThemeContext.tsx) — re-exports those names so existing call-sites keep working, then defines the context, hook, and provider as before.
3. [src/app/layout.tsx](../src/app/layout.tsx) — imports `DefaultBrand` and `DefaultTheme` from `brand-theme-constants` and applies them to `<body>`:

```tsx
<body className={`${fontClasses} brand-root ${DefaultBrand} ${DefaultTheme}`}>
```

When site-resolution is later wired up to pick brand from the route's site param, only the value passed into `<body>` changes — the structure stays the same.

### Verification

```
$ curl -s http://localhost:3000/ | grep -oE '<body[^>]*>'
<body class="… brand-root BrandsBrandX ThemesWhite">
```

---

## 3. `--font-inter` was undefined — body font fell back to UA serif

### Symptom

Even with theme classes applied, the Footer rendered in the browser's default serif font instead of Inter (the BrandX body font).

### Root cause

`src/assets/themes/_BrandsBrandX.css` declares `--typography-body-font-family: var(--font-inter);` — the brand expects Inter to be defined as a CSS variable on an ancestor element. The starter root layout was loading only `Roboto` via `next/font/google`, which emits a hashed className that defines `--font-roboto` but not `--font-inter`. Result: `--font-inter` was undefined → `--typography-body-font-family` was undefined → browser fallback.

`next/font/google` doesn't emit a global `font-family` rule. It emits a hashed className whose CSS body looks like `--font-inter: "Inter", "Inter Fallback", sans-serif;`, and that className must be present on the host element for the variable to take effect. HyperX bundles every brand font in `src/lib/fonts/brand.all.ts` (Inter + Roboto today, more for other brands) and applies all `.variable` classNames to `<body>`.

### Change

[src/app/layout.tsx](../src/app/layout.tsx):

```ts
const inter = Inter({ subsets: ["latin"], display: "swap", variable: "--font-inter" });
const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
  variable: "--font-roboto",
});
const supportedFonts = [inter, roboto];

…
<body className={`${supportedFonts.map((f) => f.variable).join(" ")} brand-root ${DefaultBrand} ${DefaultTheme}`}>
```

Both font hash classes are now on `<body>`, so `--font-inter` and `--font-roboto` are defined and any brand can resolve its font tokens. New brand fonts go in `supportedFonts`.

### Verification

```
$ curl -s http://localhost:3000/ | grep -oE '<body[^>]*>'
<body class="inter_<hash>__variable roboto_<hash>__variable brand-root BrandsBrandX ThemesWhite">
```

DevTools: computed `font-family` on a Footer link now reads `"Inter", "Inter Fallback", …`.

---

## 4. `text-typography-body-medium-font-size` was being stripped from rendered HTML

### Symptom

Footer link text was visibly smaller than HyperX. The slot definition in `Footer.tsx` listed `text-typography-body-medium-font-size`, but `curl http://localhost:3000/` showed the rendered class attribute did **not** contain that class — it was silently absent.

### Root cause

`tailwind-variants` calls `tailwind-merge` internally on every `tv(...)` slot composition. Tailwind-merge has hard-coded knowledge of stock Tailwind utilities (`text-sm` is a font-size, `text-red-500` is a color), but for custom utilities it uses a prefix heuristic: anything starting with `text-` is "the text utility," and multiple `text-*` classes on the same slot are treated as conflicts and deduped (last-wins).

The Footer slot contained both:

- `text-typography-body-medium-font-size` → `font-size: var(...)`
- `text-component-footer-link-text` → `color: var(...)`

The merger saw two `text-*` classes, declared a conflict, and kept only the color one. `font-size` was never set on the element. Same problem affected `text-typography-body-small-font-size`, `text-typography-eyebrow-font-size`, and any other Figma-token font-size paired with a Figma-token color in the same slot.

HyperX hits this too and disables the merger globally in [`nextjs-starter/src/lib/preload/index.ts`](../../nextjs-starter/src/lib/preload/index.ts):

```ts
import { defaultConfig } from 'tailwind-variants';
defaultConfig.twMerge = false;
```

…imported at the very top of `pages/_app.tsx`.

### Change

[src/lib/preload/index.ts](../src/lib/preload/index.ts) — same one-liner: `defaultConfig.twMerge = false`. Imported as the **first** line of [src/app/layout.tsx](../src/app/layout.tsx) so the side effect runs before any component module evaluates a `tv(...)` call.

```ts
// Disable tailwind-variants' twMerge BEFORE any module calls tv().
import "lib/preload";
import "./globals.css";
…
```

The proper alternative is to teach tailwind-merge about every Figma token group via `extendTailwindMerge({ classGroups: { 'font-size': […], color: […], … } })`, but the project has hundreds of token names across multiple namespaces. Disabling globally matches HyperX and is safe because `tv(...)` slot definitions are author-controlled — no risk of accidental duplicates needing deduplication.

### Verification

```
$ curl -s http://localhost:3000/ | grep -oE 'class="[^"]*body-medium-font-size[^"]*"' | head -1
class="… text-typography-body-medium-font-size leading-typography-line-height-body-medium text-component-footer-link-text …"
```

The font-size class now survives all the way to the rendered HTML.

---

## File index of changes

| Path | Status | Purpose |
| --- | --- | --- |
| [src/app/api/sitecore-media/[...path]/route.ts](../src/app/api/sitecore-media/%5B...path%5D/route.ts) | new | Header-stripping proxy for Sitecore media |
| [next.config.ts](../next.config.ts) | edited | `/-/:path*` → proxy rewrite + broader `images.remotePatterns` |
| [src/lib/context/brand-theme-constants.ts](../src/lib/context/brand-theme-constants.ts) | new | Server-safe brand/theme constants |
| [src/lib/context/BrandAndThemeContext.tsx](../src/lib/context/BrandAndThemeContext.tsx) | edited | Re-export from constants module, keep call-sites stable |
| [src/lib/preload/index.ts](../src/lib/preload/index.ts) | new | Disables `tailwind-variants` `twMerge` globally |
| [src/app/layout.tsx](../src/app/layout.tsx) | edited | Loads Inter + Roboto, applies font/brand/theme classes to `<body>`, imports preload first |

---

## Things to remember

- **Anything that mutates module-scoped library state must be imported before any consumer.** That's why `lib/preload` is the first import in `app/layout.tsx`. If a future feature splits routing across multiple root layouts (e.g. an admin segment with its own `layout.tsx`), the preload must be imported there too.
- **Server components cannot import non-component values from `'use client'` modules.** The error is "Attempted to call X() from the server but X is on the client." Constants, types, mappings shared between server and client must live in a module without `'use client'`. The client module re-exports for ergonomics.
- **`X-Forwarded-*` is the failure mode for any Sitecore IIS endpoint behind a Next rewrite.** If we ever add `/sitecore/api/*` or `/sitecore/service/*` proxies for connected mode, route them through a similar handler under `app/api/` rather than letting Next's rewrite do the proxying.
- **Tailwind-merge + design tokens is a footgun.** Any future utility namespace (component-level color tokens, gradient tokens, etc.) added to the Figma pipeline should be sanity-checked by curling the rendered HTML and confirming all expected classes survive — even with the global merger off, future code that imports tailwind-merge directly bypasses the disable.
