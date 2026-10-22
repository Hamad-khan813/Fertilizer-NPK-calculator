# FertiCalc: AdSense Compliance Fix Spec

**Site:** https://ferti-calc.vercel.app (Next.js, deployed on Vercel)
**Goal:** Remove everything that could trigger AdSense rejection ("Low value content", "Misrepresentative content", "Scaled content abuse") and make the site a genuinely useful, honest calculator resource.

## Ground rules for the agent (read first)

1. **Never invent facts.** Do not create new testimonials, user counts, certifications, studies, statistics, author credentials or citations. If something needs real data, leave a clearly marked `TODO(owner):` and tell the owner.
2. **Remove rather than rewrite** any claim that cannot be verified from the codebase or from a real source.
3. improve the site content according to google content policy
4. Keep the existing design. Change content, structure and metadata only.
5. After finishing, output a changelog listing every file changed and every `TODO(owner)` left.

---

## Task 1: Remove fabricated or unverifiable trust signals (CRITICAL)

On the homepage (and check every other page, layout and footer with `grep -ri`):

- [ ] **Delete the entire "Trusted by Professional Growers" testimonials section** (Sarah Jenkins, Marcus Thorne, Elena Rodriguez, star ratings). Delete any testimonial data/component files too.
- [ ] **Delete the stat badges**: "52+ fertilizers in database" may stay only if it matches the real count in the data file (verify and make the number dynamic from the data). Delete "Used by 2,000+ growers monthly", "Accurate to 0.001g/L", and any similar claims.
- [ ] **Delete the "Institutional Authority & Certifications" block**, including the "USDA NRCS Code 590" and "IPNI Compatibility" badges.
- [ ] **Delete the sentence** "FertiCalc is globally audited and verified to meet strict agricultural training compliance standards," and any variant (`audited`, `verified`, `certified`, `compliant`, `peer-reviewed` applied to the site itself).
- [ ] Remove the line "Our underlying mathematical modeling... align directly with certified agricultural extension methodologies" or reword it to: *"Formulas are based on standard fertilizer label conventions and unit conversions. See the Methodology page."*
- [ ] Remove unsupported statistics everywhere. Search for `%` claims such as: `98%`, `18% to 25%`, `20% to 30%`, `15%`, `10x`, `300%`, `zero`, `eliminat`, `flawless`, `guarantees`, `error-free`, `perfectly`. Delete the claim or replace it with a neutral statement.
- [ ] Replace superlative marketing language ("Absolute Nutrient Blending Precision", "professional-grade", "guarantees chemically stable") with plain descriptive language.

**Acceptance:** `grep -riE "Sarah Jenkins|Marcus Thorne|Elena Rodriguez|2,000\+|globally audited|0\.001g|Institutional Authority" src/ app/ components/ content/` returns nothing.

---

## Task 2: Fix factual errors and bad citations

- [ ] Fix: "A 3-1-2 NPK ratio yields 300% more Nitrogen than Phosphorus" → "contains three times as much Nitrogen as Phosphate" (3:1 = 200% more, not 300%). Search all pages for similar wording.
- [ ] Fix the table text for ratios. "Applying a 1-3-2 blend delivers exactly 3 parts Phosphorus" → "1 part Nitrogen, 3 parts Phosphate (P₂O₅), 2 parts Potash (K₂O)". Use "approximately / commonly recommended" instead of "exactly" and "directly triggers".
- [ ] **Remove the citation to "USDA FoodData Central"** in every place it appears. It is a human food database and is irrelevant to fertilizer. Do not replace it with a made-up source.
- [ ] Remove the line "A study by the International Plant Nutrition Institute (IPNI) shows..." and the "IPNI (2018) Fertilizer Compatibility Matrix" reference unless the owner supplies a real, verifiable URL. Mark `TODO(owner): provide a real source for fertilizer compatibility rules`.
- [ ] Keep only citations that point to real, relevant pages (e.g. University of Minnesota Extension). Verify that each cited URL loads (HTTP 200) and that its content matches the claim. Remove any that don't.
- [ ] Do not cite NRCS Code 590 as a source of the calculator's equations. It may be mentioned only as general context if accurate.
- [ ] **Deduplicate the fertilizer database.** Currently there are conflicting entries:
  - Calcium Nitrate (15-0-0) and Calcium Nitrate (15.5-0-0)
  - MAP (11-52-0) and MAP (12-61-0), plus "Ammonium Phosphate (11-48-0)"
  - Potassium Nitrate (14-0-44) and Potassium Nitrate (13-0-46)
  Keep one entry per product with the standard analysis (Calcium Nitrate 15.5-0-0, MAP 11-52-0, KNO₃ 13-0-46). Update all slugs, `/fertilizers/*` pages, dropdowns and internal links. Add 301 redirects from removed slugs (see Task 8).
- [ ] Make Epsom salt's `(0-0-0)` display explain that it supplies Mg and S (it currently looks like an error). Show "No NPK. Supplies Mg and S" in the UI.
- [ ] Audit all numbers in the calculation code against standard conversion factors (P₂O₅ × 0.4364 = P, K₂O × 0.8302 = K) and add unit tests for the core conversions.

**Acceptance:** No page contains the strings `FoodData`, `300%`, or the removed duplicate slugs. Unit tests for the conversions pass.

---

## Task 3: Cut the thin, templated programmatic pages (CRITICAL)

Currently ~14 crops × 4 units (`/calculator/[crop]/[unit]`) produce ~56 near-duplicate pages, plus 50+ fertilizer pages.

- [ ] **Remove the unit dimension from the URL.** Replace `/calculator/[crop]/[unit]` with a single `/calculator/[crop]` page. Make unit a toggle (kg / lbs / g / oz) inside the calculator UI.
- [ ] Add 301 redirects from every `/calculator/[crop]/[unit]` to `/calculator/[crop]`.
- [ ] **Keep only crop pages that have unique content.** Start with at most 8–10 crops: tomato, corn, wheat, potato, soybean, rice, bermudagrass, bluegrass, hydroponic tomato (or the owner's selection). `noindex` the rest, or remove them and redirect to `/calculator`. Mark `TODO(owner): confirm crop list`.
- [ ] Each remaining crop page must contain **unique, non-templated content of at least ~400 words** that is specific to that crop. It must not be the same paragraph with the crop name swapped. Include: typical nutrient needs, growth stages, common mistakes, a worked example with real numbers computed by the calculator, and safety notes. Do not fabricate yield studies or statistics. Write general agronomic knowledge, state it plainly, and link real sources.
- [ ] Each `/fertilizers/[slug]` page needs unique content: what the product is, its analysis (N-P-K, other nutrients), typical uses, handling and safety, compatibility cautions, and a worked example. Keep these only for the ~10 most useful products listed on the homepage. `noindex` the others until they have unique content.
- [ ] Ensure every indexable page has a unique `<title>`, unique meta description and one `<h1>`.
- [ ] Remove the "Popular Fertilizer Calculators" link wall (the 56 `Tomatokg / Tomatolbs...` links) from the homepage. Replace it with a short list of ~8 crop links (one link per crop).
- [ ] Update `sitemap.xml` so it only lists indexable pages.

**Acceptance:** No indexable page is a near-duplicate of another. The sitemap contains no `/calculator/*/(kg|lbs|grams|ounces)` URLs.

---

## Task 4: Make the calculator visible to crawlers

The fetched HTML shows "Loading Calculator..." in place of the tool.

- [ ] Render the calculator's initial UI **server-side** (SSR/SSG) with default inputs and a sample result, or remove `dynamic(..., { ssr: false })` for the calculator shell. The crawler must see labelled inputs and a pre-computed example result.
- [ ] Replace the "Loading Calculator..." text with a server-rendered skeleton or fallback that includes a `<noscript>` message and an example calculation.
- [ ] Replace the placeholder "Configure your targets and click Run Analysis" with a visible worked example (e.g. "Example: 10-10-10 target, Urea source, 5 gallons → X g").
- [ ] Verify with `curl -s https://<deployed-url>/ | grep -i "Target N"` that the input labels are present in the raw HTML.

**Acceptance:** Raw HTML (no JS execution) of the homepage contains the input labels and an example result, and does not contain "Loading Calculator".

---

## Task 5: Rewrite the homepage for clarity and honesty

- [ ] Decide on **one clear audience**. Recommended: general home and garden growers + hydroponic hobbyists, with unit support for both US and metric. Remove "for the US" from the meta description, or make the content genuinely US-specific. Keep it consistent between `<title>`, `<h1>`, meta description and body.
- [ ] Update the title/H1/description to match, e.g. title: `NPK Fertilizer Calculator | FertiCalc`, description: `Free NPK fertilizer calculator. Convert fertilizer bag labels, P₂O₅/K₂O oxide values and target ratios into amounts in grams, ounces, pounds or kilograms.`
- [ ] **Shorten the homepage.** Remove repeated paragraphs. Specifically delete duplicates of the sentence "calculates the exact weight of active nutrients your soil needs in under 60 seconds" (it appears 3+ times). Remove empty filler headings: "Technical Reference and Diagnostic Knowledge Base" (if it contains no content), "Page Outline" and the "Quick Summary & Key Takeaways" block if it only repeats marketing claims.
- [ ] Remove "Engine v2.4.0 (Released May 10, 2026)" unless a real changelog exists.
- [ ] Keep the useful educational sections (oxide conversion table, PPM formula, FAQ) but make sure each statement is accurate and sourced from real references.
- [ ] Add a short, visible **disclaimer** near the calculator: *"Results are estimates for planning. Always follow the product label and local extension guidance. Soil testing is recommended."*
- [ ] Update the `Last Updated` date only when content really changes (use the real build or commit date).

---

## Task 6: Honest author, About and trust pages

- [ ] Rewrite the "About the Author" section on the homepage and on `/about` with only true facts. The current copy presents the owner as an agronomy authority. Use factual wording such as: *"FertiCalc was built by Hamad Khan, a software developer. The formulas use standard fertilizer label conversions and published extension guidance (see Methodology)."* `TODO(owner): add any real agronomy qualifications, collaborators or reviewers if they exist.`
- [ ] Remove "open-source" and "explore the codebase" wording unless there is a public repo link. If there is, add the real link. `TODO(owner)`.
- [ ] Remove "contact me to discuss custom enterprise agricultural integrations" unless it is a real offering.
- [ ] `/about` must explain who runs the site, why it exists, and how the formulas work, in plain language.
- [ ] `/methodology` must show the actual formulas used (oxide factors, PPM to g/L, bag percentage maths) with one worked example each, and list sources that are real and checked.
- [ ] `/editorial-policy` must describe how content is written and updated. Do not claim peer review or expert review unless it is true. If AI tools are used for drafting, say content is reviewed and checked by the owner. `TODO(owner): confirm wording.`
- [ ] `/contact`: show the email and a working contact form or mailto. `TODO(owner): replace the Gmail address with a domain email after Task 9.`
- [ ] Footer: keep the real location, remove "Built for the Agricultural Community" or "globally" style claims. Plain footer: copyright, links, contact.

---

## Task 7: Legal pages and privacy/consent readiness

- [ ] Update `/privacy`: describe what is collected (analytics, cookies via Google Tag Manager `GTM-TJK3D923`), and add a section for **third-party advertising** to be accurate when ads run: *"Third-party vendors, including Google, use cookies to serve ads based on prior visits... Users may opt out via Google Ads Settings (https://adssettings.google.com)."* Include data retention, user rights, and the contact email.
- [ ] `/terms`: include a clear **disclaimer of liability** for calculator results and agronomic advice.
- [ ] **Cookie consent:** add a consent banner using a Google-certified CMP (e.g. Google's own Funding Choices, Cookiebot or another certified CMP) that supports Consent Mode v2, and make GTM tags respect consent (no analytics/ads tags before consent for EEA/UK/CH visitors). `TODO(owner): choose the CMP; agent should scaffold the integration point and document it.`
- [ ] Ensure legal pages are linked in the footer on every page.
- [ ] Leave an `/ads.txt` placeholder note in the README for after approval. Do not create it now.

---

## Task 8: Technical SEO cleanup

- [ ] **Delete the `keywords` meta tag** (the long keyword list). Remove any other keyword-stuffed text.
- [ ] Keep: unique title, meta description, canonical, Open Graph, Twitter card. Ensure the canonical URL points at the single preferred domain (see Task 9).
- [ ] Add JSON-LD only where accurate: `WebApplication` for the calculator (name, description, `applicationCategory`, `operatingSystem`, `offers: free`), `Organization`/`WebSite` with the real name and URL. Do **not** add `AggregateRating`, `Review` or fake `author` credentials.
- [ ] Add 301 redirects (in `next.config.js` `redirects()`) for all removed or merged URLs (unit-suffixed crop pages, deduplicated fertilizer slugs, removed crop pages).
- [ ] Create or fix a custom **404 page** with navigation links.
- [ ] Verify `/robots.txt` and `/sitemap.xml` exist and are correct.
- [ ] Check every internal link: no broken links, no links to empty pages. **Check `/blog`**: if the blog has fewer than ~5 real articles, either write real ones (see Task 10) or remove "Blogs" from the nav until it has content. An empty or thin blog hurts the site.
- [ ] Remove duplicated mobile/desktop navigation blocks from the rendered HTML if both are output at once (use CSS or a single responsive component). The raw HTML currently contains the nav twice.
- [ ] Image optimisation, alt text on all images, and Core Web Vitals check (LCP < 2.5s, CLS < 0.1) using Lighthouse. Report the scores.

---

## Task 9:  Real content to add (agent drafts, owner reviews)

AdSense wants substantial original content. Add **8–12 genuinely useful articles** under `/blog` or `/guides` (800–1,500 words each), with clear, accurate, original writing that includes worked examples using the site's own calculator. Suggested topics:

1. How to read a fertilizer bag label (N-P-K, P₂O₅/K₂O explained)
2. How much fertilizer per 1,000 sq ft: a worked example for a lawn
3. Converting lbs/acre to lbs/1,000 sq ft (and kg/ha) with examples
4. Urea vs ammonium nitrate vs ammonium sulfate: when to use which
5. How to calculate PPM to grams per liter for hydroponic nutrient mixes
6. Why mixing calcium nitrate and sulfates in one tank causes precipitation
7. Signs of over-fertilization and how to fix it
8. Surface broadcast vs soil incorporation: nitrogen volatilization basics
9. How to use a soil test report to choose a fertilizer rate
10. Fertilizer safety: storage, handling and application tips

Requirements:
- Each article has a real author byline (the owner), a real published date and a real updated date.
- Cite only sources that were actually opened and verified. Link to them. No invented studies or numbers.
- No keyword stuffing, no repeated boilerplate paragraphs, no generic filler.
- Each has a unique title, meta description and at least one custom table or worked example.
- `TODO(owner)`: review all drafts for accuracy before publishing. Mark each as `status: draft` in frontmatter until approved.

---

## Task 10: Final verification checklist

Run and report results:

- [ ] `grep -riE "testimonial|Sarah Jenkins|2,000\+|globally audited|FoodData|0\.001g|Institutional Authority|300%"` returns nothing
- [ ] No `<meta name="keywords">` in rendered HTML
- [ ] Raw HTML of `/` contains calculator input labels and an example result; no "Loading Calculator"
- [ ] Sitemap contains only indexable, unique-content pages
- [ ] All redirects return 301 and resolve to 200
- [ ] No broken internal links (run a link checker)
- [ ] Every indexable page has a unique title, description and single H1
- [ ] Privacy, Terms, About, Contact, Methodology and Editorial pages are live and linked in the footer
- [ ] Lighthouse scores reported (Performance, SEO, Accessibility, Best Practices)
- [ ] Changelog and the list of remaining `TODO(owner)` items delivered

## After the agent finishes (owner checklist)

1. Review and approve any drafted content and remove `TODO` markers by filling in true information.

use your full potential to improve my site 
