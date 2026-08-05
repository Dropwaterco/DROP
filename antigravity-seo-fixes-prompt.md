# SEO Fix Batch — Metadata Inheritance, Canonicals, OG Tags, Structured Data

## Context
This is a Next.js site (App Router, based on prior audits). Follow AGENTS.md scope rules: only touch files directly required to fix the issues below. No speculative refactors, no touching unrelated components, no changes to MongoDB collections or Redis logic.

Before writing any fix, locate and read the actual metadata source for each affected route (root `layout.tsx`, any nested `layout.tsx`, and each `page.tsx`'s `metadata` export or `generateMetadata` function). Do not guess at the mechanism — confirm it in the code first, then patch. If what you find doesn't match the hypothesis below, fix the actual root cause instead and note in your summary what was actually wrong.

---

## Bug 1 — Title tag doubles "| DROP." on /contact and all /blog/[slug] routes

**Current broken output:**
- `/contact` → `For Business | DROP Water | Drop Water`
- `/blog/why-aluminium-cans-alternative-to-plastic` → `Why Aluminium Cans Are the Ultimate Alternative to Plastic Bottles | DROP. | DROP.`

**Working correctly (use as reference):**
- `/` → `Premium Canned Water in India | DROP.`
- `/story` → `Our Story | DROP.`
- `/sustainability` → `Sustainability | DROP. No Plastic. No Bullsh*t.`

**Likely root cause:** the root layout defines a `title.template` (e.g. `template: '%s | DROP.'`). Pages that are broken are almost certainly setting a `title` string that *already includes* "| DROP." at the end, so the template appends it a second time. The pages that work correctly either use `title: { absolute: '...' }` to bypass the template, or simply don't include "| DROP." in their own title string.

**Fix:**
1. Confirm the `title.template` value in the root layout.
2. For every page/route, the page-level `title` should contain ONLY the page-specific portion — no trailing "| DROP." — and let the template append it. OR, if a page needs full control (e.g. because it wants custom suffix text like the sustainability page does), use `title: { absolute: 'Full Exact Title Here' }` to skip the template entirely.
3. Apply this to `/contact` and the shared blog post layout/template used by all `/blog/[slug]` routes (not just the one example above — check all 3 existing posts and the dynamic route template itself).

**Acceptance test:** view-source (or `curl`) each of these routes and confirm the `<title>` tag appears exactly once with no repeated brand suffix:
- `/contact` → should read exactly `For Business | DROP.` (standardize brand name per Bug 4 below)
- Each `/blog/[slug]` → should read exactly `{Post Title} | DROP.`

---

## Bug 2 — Canonical tag on /contact points to the homepage instead of itself

**Current:** `/contact`'s canonical is `https://www.dropwater.in` (the homepage URL).
**Required:** `/contact`'s canonical must be `https://www.dropwater.in/contact`.

**Likely root cause:** `alternates.canonical` is either hardcoded in the root layout and not overridden per-page, or the /contact page's own metadata export is missing an `alternates.canonical` field entirely, causing it to inherit the root layout's default.

**Fix:** Add an explicit `alternates: { canonical: 'https://www.dropwater.in/contact' }` to the `/contact` page's own metadata export. While in there, audit every other route (`/`, `/story`, `/sustainability`, `/blog`, every `/blog/[slug]`, `/privacy`, `/terms`) and confirm each one has a self-referencing canonical that matches its own URL — not just /contact. Fix any others found in the same pass.

**Acceptance test:** view-source each route above and confirm the canonical `<link>` tag matches that exact page's own URL, no exceptions.

---

## Bug 3 — Open Graph tags on /contact and /blog inherit homepage values instead of page-specific ones

**Current:**
- `/contact` ships `og:title: "Drop Water | Premium Canned Water. As It Should Be."`, `og:locale: en_US` — both are the homepage's values, not contact-specific, and `en_US` is wrong for an India-only brand (every other page correctly uses `en_IN`).
- `/blog` ships `og:title: "Premium Canned Water in India | DROP."` — the homepage's og:title, not a blog-specific one.

**Working correctly (reference):** `/story`, `/sustainability`, and individual `/blog/[slug]` posts (e.g. the aluminium-cans post) all have their own correct, page-specific `og:title` / `og:description`.

**Likely root cause:** in Next.js metadata, if a child route defines a `title` string but does NOT define its own `openGraph` object, the entire `openGraph` object is inherited from the parent layout rather than merged field-by-field. `/contact` and `/blog` (the index page) are almost certainly missing their own `openGraph` block.

**Fix:** Add explicit `openGraph` objects to both routes:

- `/contact`:
  - `openGraph.title`: `"Partner With DROP. | For Business"` (or similar — page-appropriate, not homepage copy)
  - `openGraph.description`: something specific to B2B partnership, not the homepage tagline
  - `openGraph.locale`: `en_IN` (fix the en_US bug)
  - `openGraph.url`: `https://www.dropwater.in/contact`
- `/blog` (index):
  - `openGraph.title`: `"The DROP. Journal | Hydration & Sustainability Guides"` (or similar, matching the on-page H1 "The DROP. Journal")
  - `openGraph.description`: reuse the existing meta-description for this page, it's already good
  - `openGraph.url`: `https://www.dropwater.in/blog`

Also check `twitter:title` / `twitter:image` on individual `/blog/[slug]` posts — these currently fall back to homepage values even though `og:title`/`og:image` are correctly post-specific on those pages. Add explicit `twitter` metadata per post so it matches the `openGraph` values, or configure Twitter card metadata to inherit from `openGraph` if the framework supports that shortcut.

**Acceptance test:** view-source each route and confirm `og:title`, `og:description`, `og:locale`, and `twitter:title`/`twitter:image` are page-specific, not homepage defaults. Paste each URL into Meta's Sharing Debugger and X's Card Validator to confirm the preview card is correct.

---

## Bug 4 — Brand name inconsistent across meta fields ("Drop Water" vs "DROP." vs "DROP Water")

**Current:** `meta-publisher`, `og:site_name`, and `meta-author` vary between "Drop Water," "DROP.," and "Drop Water team" depending on the page.

**Decision (use this as the single source of truth):** standardize on **"DROP."** everywhere — it matches the visible site header, product cans, and footer tagline.

**Fix:** Set these globally in the root layout's default metadata (not per-page) so there's one place to change it in future:
- `meta-publisher`: `DROP.`
- `og:site_name`: `DROP.`
- `meta-author`: `DROP. Team`

Remove any page-level overrides of these three fields unless a page has a genuine reason to differ (none currently do).

**Acceptance test:** view-source every route and confirm these three fields read identically everywhere.

---

## Bug 5 — No structured data (JSON-LD) anywhere on the site

**Add the following, scoped narrowly — do not add speculative schema types beyond what's listed:**

1. **Organization schema** — inject once, site-wide (root layout), covering:
   - `name`: "DROP."
   - `url`: "https://www.dropwater.in"
   - `logo`: (use existing OG image asset)
   - `sameAs`: array of the existing Instagram, Facebook, and X URLs already in the footer
   - `address`: the existing Bandra West, Mumbai address already in the footer

2. **BlogPosting schema** — on each `/blog/[slug]` post, using data already present on the page (no new content needed):
   - `headline`: the post's H1
   - `datePublished`: the date already shown on the page (e.g. "July 18, 2026") — convert to ISO 8601 format
   - `author`: "DROP. Editorial Team" (already shown on the page)
   - `image`: the post's existing og:image
   - `publisher`: the Organization object from #1

Do not add Product schema yet — pricing/availability isn't finalized, so this should wait for a future pass.

**Acceptance test:** run each affected URL through Google's Rich Results Test and confirm zero errors, both schema types detected correctly.

---

## Final verification checklist (run after all fixes, before calling this done)

- [ ] `/contact` title = `For Business | DROP.` (exactly once, no doubling)
- [ ] Every `/blog/[slug]` title = `{Post Title} | DROP.` (exactly once, no doubling)
- [ ] `/contact` canonical = `https://www.dropwater.in/contact`
- [ ] All other routes still have correct self-referencing canonicals (didn't regress while fixing /contact)
- [ ] `/contact` og:title, og:description, og:locale (en_IN) are page-specific
- [ ] `/blog` og:title, og:description are page-specific
- [ ] Blog post twitter:title/twitter:image match their own og:title/og:image, not homepage
- [ ] meta-publisher / og:site_name / meta-author read "DROP." / "DROP." / "DROP. Team" on every single route with no exceptions
- [ ] Organization JSON-LD present site-wide, validates with zero errors in Rich Results Test
- [ ] BlogPosting JSON-LD present on all 3 existing posts, validates with zero errors
- [ ] No unrelated files, components, or routes were modified outside the scope of this list

Report back with the specific file(s) changed for each bug number, and the verification output (not just "done") for each checklist item above.
