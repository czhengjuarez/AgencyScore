# Agency Audit

**Do you have enough agency for work-life choice?**

A 15-question interactive audit that measures your autonomy at work across five dimensions. Your score determines whether *work-life balance* or *work-life choice* is the right framework for you right now.

Live: [agency-score.coscient.workers.dev](https://agency-score.coscient.workers.dev)

---

## Why this exists

The advice to "achieve work-life balance" assumes you lack agency. The advice to "pursue work-life choice" assumes you have it. Neither camp explains how to tell which situation you're actually in.

This audit operationalizes that question. It treats agency not as a binary but as five separable dimensions — each of which can be high, medium, or low independently. Someone might have high skill agency and low decision agency. A senior IC might have strong ownership agency but no time agency. Those are different problems with different solutions.

The practical output is:

| Score | Archetype | Framework | Meaning |
|---|---|---|---|
| ≥ 80% of max | **Architect** | Work-life choice | You shape decisions and outcomes |
| 55–79% | **Builder** | Hybrid approach | Agency in some areas, structural constraints in others |
| < 55% | **Executor** | Work-life balance | Most decisions are made for you; protect yourself first |

Trying to operate in "choice" mode without the underlying agency leads to burnout without ownership — effort without control.

---

## The five dimensions

| # | Dimension | Question it answers |
|---|---|---|
| 1 | **Decision agency** | Can you make meaningful decisions without escalation? |
| 2 | **Ownership agency** | Do you own outcomes, or just tasks? |
| 3 | **Time agency** | Can you choose when and how deeply you work? |
| 4 | **Skill agency** | Can you learn and grow in directions you choose? |
| 5 | **Impact agency** | Can you see and measure the impact of your work? |

Each dimension has 3 questions scored **4 → 1** (most autonomous → least). Raw max per dimension: **12 pts**. Default total max: **60 pts**.

---

## Customizable scoring

Before taking the audit, any organization can adjust the weight of each dimension:

- **Normal (×1)** — equal weight, contributes 20% of the total by default
- **Important (×1.5)** — contributes more to the overall score
- **Critical (×2)** — twice as influential in the final result

Weights don't change how individual answers are scored (always 4→1). They change how much each dimension pulls on the overall result. A startup that lives or dies by decision velocity might set Decision agency to Critical. A remote-first team focused on wellbeing might do the same for Time agency.

The configure screen shows each dimension's live **% of total max**, so the impact of weight changes is immediately visible before a single question is answered.

---

## Reading your results

After 15 questions you receive:

- **Overall verdict** — High / Mixed / Low agency, with the recommended framework
- **Score card** — your weighted total against the range, including:
  - Average points per question (1–4 scale)
  - The lowest and highest possible scores at your weights
  - Threshold markers showing what score reaches each bracket
- **Agency profile** — a radar/spider diagram across the five dimensions
- **Dimension breakdown** — per-dimension score (out of 12), bar, and High/Medium/Low badge
- **Control matrix** — which dimensions you can shift yourself vs. which require organizational change

---

## Tech stack

| Layer | Technology |
|---|---|
| Framework | React 19 + Vite 6 |
| Styling | Tailwind CSS v4 + [Keel](https://github.com/czhengjuarez/Keel) design system |
| Design tokens | Vendored CSS — no npm dependency |
| Charts | Pure SVG — no chart library |
| Deployment | Cloudflare Workers + static Assets binding |

The Keel design system provides the full token set (`--of-*` CSS custom properties), component classes (`.of-btn`, `.of-badge`, `.of-card`, `.of-eyebrow`), and light/dark mode via `light-dark()` CSS tokens. Theme state is stored in `localStorage` and applied by setting `data-mode` on `<html>`.

---

## Project structure

```
AgencyScore/
├── src/
│   ├── main.jsx              React entry point
│   ├── App.jsx               Theme hook + root layout
│   ├── ThemeToggle.jsx       Light / System / Dark switcher
│   ├── agency-audit.jsx      All audit logic, questions, and results UI
│   ├── index.css             Tailwind + Keel imports + audit utility classes
│   └── keel-tokens.css       Local copy of Keel design tokens (no @import for fonts)
├── public/
│   └── favicon.svg           Ops Forward icon (from ../Keel/assets/)
├── index.html                HTML shell + Google Fonts preconnect
├── vite.config.js            @tailwindcss/vite + @vitejs/plugin-react
├── worker.js                 Cloudflare Worker — serves assets, SPA 404 fallback
└── wrangler.toml             Workers + Assets config
```

---

## Local development

**Prerequisites:** Node 18+, npm 9+. No local path dependencies — the project is fully self-contained.

```bash
# Install dependencies (includes local Keel package)
npm install

# Start dev server at http://localhost:5173
npm run dev

# Production build
npm run build

# Preview production build locally
npm run preview
```

---

## Deploy to Cloudflare Workers

```bash
# One command: build + deploy
npm run deploy
```

Requires [Wrangler](https://developers.cloudflare.com/workers/wrangler/) to be authenticated:

```bash
npx wrangler login
```

The worker serves the static build from the `[assets]` binding and falls back to `index.html` for any unmatched route (SPA routing).

---

## Contributing

**Adding or changing questions**

All questions live in the `dimensions` array at the top of [src/agency-audit.jsx](src/agency-audit.jsx). Each question has four options scored 4→1. The scoring logic automatically adapts — no other changes needed.

**Changing dimension colors**

Each dimension maps to a Keel semantic color token:

| Dimension | Token |
|---|---|
| Decision | `--of-success-*` (green) |
| Ownership | `--of-fg-brand` / `--of-bg-brand-tint` (magenta) |
| Time | `--of-danger-*` (red) |
| Skill | `--of-info-*` (blue) |
| Impact | `--of-warning-*` (amber) |

Update the `color`, `colorLight`, and `textColor` fields on each dimension object.

**Changing score thresholds**

The overall verdict thresholds (`getOverall`) are percentages of the max possible score:
- High agency: ≥ 80%
- Mixed agency: ≥ 55%
- Low agency: < 55%

Per-dimension level thresholds (`getLevel`) are raw scores out of 12:
- High: ≥ 10
- Medium: ≥ 7
- Low: < 7

**Styling**

The project uses [Keel](https://github.com/czhengjuarez/Keel) — the Ops Forward design system. All color, spacing, typography, and motion tokens are `--of-*` CSS custom properties.

Keel is vendored into two local files — no npm dependency required:

| Local file | Source in Keel repo |
|---|---|
| `src/keel-tokens.css` | `colors_and_type.css` (Google Fonts `@import` removed — fonts loaded via `index.html` instead) |
| `src/keel-components.css` | `packages/keel/src/styles.css` |

To pull in Keel updates, replace those two files with the latest versions from the repo.

---

*Agency Audit — Ops Forward by Z*
