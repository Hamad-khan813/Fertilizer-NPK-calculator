# DESIGN_GAP_ANALYSIS.md — FertiCalc Design Token Audit

> **Generated:** 2026-05-20 | **Source of Truth:** [`globals.css`](file:///c:/Users/hamad/OneDrive/Desktop/Web-tools-site/my-nextjs-app/app/globals.css) | **Framework:** Tailwind CSS v4 (CSS-first `@theme inline`)

---

## 1. Current Token Inventory

The project defines **6 color tokens**, **2 font tokens**, and **5 utility classes**:

| Token | Value | CSS Variable |
|---|---|---|
| `--color-primary` | `#10b981` (emerald-500) | `var(--primary)` |
| `--color-primary-dark` | `#059669` (emerald-600) | `var(--primary-dark)` |
| `--color-secondary` | `#3b82f6` (blue-500) | `var(--secondary)` |
| `--color-accent` | `#f59e0b` (amber-500) | `var(--accent)` |
| `--color-background` | `#f8fafc` (slate-50) | `var(--background)` |
| `--color-foreground` | `#0f172a` (slate-900) | `var(--foreground)` |
| `--font-sans` | Geist Sans | `var(--font-geist-sans)` |
| `--font-mono` | Geist Mono | `var(--font-geist-mono)` |

### Utility Classes (globals.css)
`glass-card`, `premium-gradient`, `subtle-grid`, `hero-gradient`, `skip-link`

---

## 2. GAP: Gray Scale Palette Split (CRITICAL)

> [!CAUTION]
> The codebase uses **two competing neutral palettes** — `slate-*` and `gray-*` — across different files. This creates visual inconsistency in border tones, background tints, and text muting.

| Palette | Files Using It | Example Classes |
|---|---|---|
| **`slate-*`** (Primary — correct) | `HomePage.tsx`, `Calculator.tsx`, `ResultCard.tsx`, `Navbar.tsx`, `Footer.tsx` | `text-slate-700`, `border-slate-200`, `bg-slate-900` |
| **`gray-*`** (Rogue — inconsistent) | `BlogCard.tsx`, `blog/[slug]/page.tsx`, `fertilizers/page.tsx`, `user-guide/page.tsx`, `what-is-npk/page.tsx` | `border-gray-100`, `bg-gray-50`, `text-gray-500` |

### Recommendation
Standardize on `slate-*` globally. Add a `--color-neutral` token alias in `@theme inline`. Bulk-replace all `gray-*` → `slate-*` in the 5 affected files.

---

## 3. GAP: Green vs Primary Confusion (HIGH)

> [!WARNING]
> The `--color-primary` token is `#10b981` (emerald-500), but **9 files** use raw `green-*` Tailwind classes instead of the `primary` token.

| File | Usage | Should Be |
|---|---|---|
| `user-guide/page.tsx` | `bg-green-600` (step badges, CTA) | `bg-primary` / `bg-primary-dark` |
| `blog/[slug]/page.tsx` | `bg-green-600`, `bg-green-50` | `bg-primary`, `bg-primary/10` |
| `BlogCard.tsx` | `bg-green-100 text-green-800` | `bg-primary/20 text-primary` |
| `fertilizers/page.tsx` | `bg-green-100 text-green-800` | `bg-primary/20 text-primary` |
| `what-is-npk/page.tsx` | `bg-green-50 border-green-600` | `bg-primary/10 border-primary` |
| `RunoffRisk.tsx` | `bg-green-50 text-green-900` | Acceptable (semantic: "safe" color) |

### Recommendation
Replace all `green-*` with `primary` token equivalents. Exception: semantic status colors (success/danger) should use explicit green/red and be formalized as `--color-success` and `--color-danger` tokens.

---

## 4. GAP: Hardcoded Arbitrary Color Values (MEDIUM)

| File | Value | Purpose | Recommendation |
|---|---|---|---|
| `ResultCard.tsx:203` | `bg-[#1DA1F2]` | Twitter/X brand blue | Add `--color-twitter: #1DA1F2` to `@theme` or extract to a `social-btn` utility |

This is the **only** arbitrary hex value found in component files. The globals.css correctly avoids leaking hex values into components.

---

## 5. GAP: Border Radius Inconsistency (MEDIUM)

The codebase uses **7 distinct `rounded-*` values** without a formalized scale:

| Class | Usage Context | Frequency |
|---|---|---|
| `rounded` | `what-is-npk` alerts | Rare |
| `rounded-lg` | Navbar logo, selects, blog CTAs | Moderate |
| `rounded-xl` | Calculator inputs, tables, action buttons | Heavy |
| `rounded-2xl` | Result card, FAQ cards, tables, modals, tracker | Heavy |
| `rounded-3xl` | Homepage cards, testimonials, nav TOC | Heavy |
| `rounded-[2.5rem]` | Solution hero card (HomePage) | 1 instance |
| `rounded-full` | Avatars, step badges, version tags | Moderate |

### Recommendation
Formalize a 3-tier radius scale in `@theme inline`:
```css
--radius-sm: 0.75rem;   /* rounded-xl — inputs, small cards */
--radius-md: 1rem;      /* rounded-2xl — cards, modals */
--radius-lg: 1.5rem;    /* rounded-3xl — hero sections */
```
Eliminate the one-off `rounded-[2.5rem]` by using `rounded-3xl`.

---

## 6. GAP: Shadow Elevation Scale (LOW)

| Class | Usage |
|---|---|
| `shadow-sm` | Cards, nav, input fields (dominant) |
| `shadow-md` | Hover states on guide cards |
| `shadow-lg` | CTA buttons, navbar logo |
| `shadow-xl` | Result card, modals, glass-card utility, dropdown, navbar |
| `shadow-primary/20` | Navbar logo hover glow |
| `shadow-primary-20` | CTA button glow |
| `shadow-slate-200/50` | Result card container |

### Recommendation
Standardize on 3 elevation levels and add token-based colored shadows:
```css
--shadow-card: 0 1px 3px rgba(0,0,0,0.06);
--shadow-elevated: 0 10px 25px rgba(0,0,0,0.08);
--shadow-primary-glow: 0 8px 20px rgba(16,185,129,0.2);
```

---

## 7. GAP: Missing Semantic Tokens (HIGH)

The following semantic color roles are used extensively but have **no formal token**:

| Role | Current Inline Usage | Proposed Token |
|---|---|---|
| Success | `green-50`, `green-600`, `green-900` | `--color-success: #10b981` |
| Warning | `amber-50`, `amber-600`, `amber-100` | `--color-warning: #f59e0b` |
| Danger | `red-50`, `red-600`, `red-900` | `--color-danger: #ef4444` |
| Info | `blue-50`, `blue-600`, `blue-100` | `--color-info: #3b82f6` |
| Muted Text | `slate-400`, `slate-500`, `slate-600` | `--color-muted: #94a3b8` |
| Surface | `slate-50`, `white` | `--color-surface: #ffffff` |
| Border | `slate-100`, `slate-200` | `--color-border: #e2e8f0` |

---

## 8. GAP: Z-Index Scale (LOW)

| Value | Usage |
|---|---|
| `z-10` | Hero content, insight box overlay, guide CTA |
| `z-40` | Fertilizer page sticky filter bar |
| `z-50` | Navbar, dropdown, modal overlay |

### Recommendation
Formalize a z-index scale to prevent future stacking conflicts:
```css
--z-base: 0;
--z-raised: 10;
--z-sticky: 40;
--z-overlay: 50;
--z-modal: 60;
```

---

## 9. Summary Scorecard

| Category | Token Coverage | Severity | Action |
|---|---|---|---|
| Brand Colors | ✅ 100% (primary, secondary, accent) | — | None |
| Neutral Palette | ❌ 0% (raw `slate-*` / `gray-*`) | 🔴 Critical | Unify to `slate`, add tokens |
| Green vs Primary | ❌ Split across 9 files | 🟠 High | Replace `green-*` with `primary` |
| Semantic Colors | ❌ 0% (no success/warning/danger) | 🟠 High | Add 4 semantic tokens |
| Border Radius | ❌ 0% (7 ad-hoc values) | 🟡 Medium | Define 3-tier scale |
| Shadows | ❌ 0% (7 ad-hoc values) | 🟢 Low | Define 3 elevation tokens |
| Z-Index | ❌ 0% (3 ad-hoc values) | 🟢 Low | Define stacking scale |
| Typography | ✅ Fonts covered | 🟢 Low | Consider size scale tokens |
| Arbitrary Hex | ⚠️ 1 instance (`#1DA1F2`) | 🟢 Low | Extract to token |

**Overall Design System Maturity: ~35%** — Brand colors and fonts are tokenized, but neutrals, semantics, radius, shadows, and z-index are entirely ad-hoc.
