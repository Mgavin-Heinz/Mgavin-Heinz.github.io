# Heinz Pretorius — Portfolio

Static portfolio site, Attack on Titan inspired. Plain HTML/CSS/JS, no build step, no dependencies.

```
index.html    content, structure, the wings emblem, wall + figure SVGs
styles.css    theme variables, layout, animations
script.js     theme toggle, menu, typed line, parallax, scroll reveal
```

## Preview locally

Double-click `index.html`, or run a local server:

```bash
python -m http.server 8000     # http://localhost:8000
# or:  npx serve .
```

In VS Code: install the **Live Server** extension, then right-click `index.html` → *Open with Live Server*.

## Deploy

- **Netlify** — drag this folder onto app.netlify.com/drop.
- **GitHub Pages** — push to a repo, then Settings → Pages → Branch `main`, folder `/ (root)`.
- **Vercel** — `vercel` in this folder, or import the repo. No framework preset.

No build command, no output directory. It's static files.

## The theme

| | |
|---|---|
| **Night** (default) | Near-black, crimson accents, lantern vignette |
| **Archive** | Parchment daylight — same layout, aged-paper palette |

Toggle sits in the nav and saves to `localStorage`. Falls back to your OS preference on first visit.

Design pieces: a Wings-of-Freedom-style emblem (`<symbol id="wings">`, drawn from scratch — reused in the nav, hero watermark, certifications header and footer), a stone wall with a figure peeking over it that parallaxes behind the hero, drifting mist, film grain, a crimson reading-progress blade at the top, ink stamps on project cards, and signal-flare dots on the contact rows.

## What's on the page

- **Experience** — Weighsoft, SocialSines (Nov–Dec 2025), CTU Training Solutions (2024–25), matric (class of 2022)
- **Certifications** — AZ-204, AZ-900, DP-900, Credly JavaScript Specialist, Credly HTML & CSS Specialist
- **Projects** — 2D Game Engine, Full-Stack Web Portfolio, Game Leaderboard API, Mobile Weighing System, License Key Generator
- **Contact** — email, GitHub, CV download (phone deliberately omitted — public `tel:` links get scraped)

## TODO — things to fill in

| Where | What |
|---|---|
| Experience → Weighsoft | **Dates are a placeholder.** Add the real months and delete the `(add dates)` flag |
| Hero → `.portrait__ph` | Replace that div with `<img src="assets/photo.jpg" alt="Heinz Pretorius">` |
| Projects → Op. 01 & Op. 03 | Both link to your GitHub profile. Point them at the specific repos and delete the `(link repo)` flags |
| Contact → Résumé | Drop `Heinz_Pretorius_CV.pdf` in this folder, or delete that row |
| `<head>` | Add `og:url` and `og:image` once you have a live URL |

Search the code for `EDIT:` or `flag` to jump to every spot that needs attention. Placeholders also render in crimson on the page, so nothing hides.

## Customising

- **Colours** — `--blood` and `--bone` at the top of `styles.css`. Everything else follows.
- **Rotating tagline** — the `ROLES` array in `script.js`.
- **Section names** — the thematic titles ("Expedition Log", "The Armory", "Mission Records") are `.section__title`; the plain labels above them are `.section__kicker`. Nav always shows the plain names, so a recruiter skimming never gets lost.
- **Adding a project** — duplicate any `<article class="card">` block. Use `card__stamp--alt` for a muted stamp, and `<span class="card__note">` instead of a link when there's no public repo.
- **The wall + figure** — `--wall-h` in `styles.css` controls the wall height; the figure and his hands reposition automatically. His colours are `--skin`, `--hair`, `--cloth`, `--iris` etc., set per theme. Stone colours are `--stone-1` … `--stone-5`, `--mortar`, `--stone-top`. The block `<rect>`s in `index.html` are generated markup — recolour via those variables rather than editing the rects.
- **Tone it down** — delete `.hero__scene` from the HTML to lose the wall and figure; delete `.fx-grain` to lose the texture. Everything still works.
- **Motion** — respects `prefers-reduced-motion`; animations switch off automatically.
