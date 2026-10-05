# Diego Schram Games – website

A static site (no build step, no dependencies). Pushing to `main` deploys it to
GitHub Pages through `.github/workflows/static.yml`.

## Editing content

Everything is in **`site.config.js`**, with comments on every field:

| Section   | What it controls                                               |
|-----------|----------------------------------------------------------------|
| `studio`  | Name, tagline and "About" text                                 |
| `links`   | Social/store buttons in the header (empty = hidden)            |
| `games`   | The game cards. Copy a block to add a game                     |
| `company` | Legal data for the Impressum (and the privacy policy)          |
| `privacy` | Hosting provider, supervisory authority, "last updated" date   |

To add a game: copy the commented example block in `games`, put its capsule
image in `assets/Images/`, and set `status` to `"coming-soon"` or `"released"`.
Games appear under "Coming soon!" / "Out now!" automatically.

## Preview locally

```bash
python -m http.server 5500
```

then open <http://localhost:5500>. (Opening `index.html` by double-click also
works, but a server is closer to the real thing.)

## Files

```
index.html          home page
impressum.html      legal notice, generated from site.config.js
datenschutz.html    privacy policy, generated from site.config.js
site.config.js      <- the file you edit
css/stylesheet.css  all styling
js/site.js          binds site.config.js values into the pages
js/home.js          renders games, icons, about text
js/legal.js         Impressum + privacy text (German, English with ?lang=en)
assets/             logo, icons, game images
```

## Legal notes (Germany) – please read

I'm not a lawyer; `legal.js` is a starting template, not legal advice.

- **Impressum is mandatory** for a business website (§ 5 DDG) and must show a
  real, serviceable street address (no P.O. box), your full name, and an e-mail.
  Add a phone number too: e-mail alone may not count as "direct communication".
  Missing required data shows as orange `[placeholders]` on `impressum.html`.
- **Datenschutzerklärung is mandatory** too. The text describes the site as it
  is built: no cookies, no tracking, no external fonts or embeds, hosted on
  GitHub Pages. **If you change any of that, update `legal.js`.**
  - Do not load Google Fonts / a font CDN. Self-host font files in `assets/fonts/`.
  - Do not embed Steam widgets, YouTube, Twitter/X feeds, analytics etc. without
    updating the policy (and probably adding a consent banner).
  - The site is served on diegoschram.com via GitHub Pages. If you ever put a
    proxy/CDN in front of it (e.g. Cloudflare's orange cloud), that provider
    sees visitor IPs and must be added to the privacy policy.
  - In the repo's Settings → Pages, switch on **Enforce HTTPS**. The policy says
    the site is delivered over HTTPS, so that should be true for every visit.
- Fill in `privacy.supervisoryAuthority` with the data protection authority of
  your federal state (optional, but nice).
- The heading font is Fredoka (SIL Open Font License, hosted in
  `assets/fonts/` together with its licence text, which must stay with it).
- Icons are from [Icons8](https://icons8.com); the free licence requires the
  attribution link, which is in the footer. Keep it, or buy a licence.
- For peace of mind, have the finished texts checked by a lawyer or use a
  generator such as eRecht24's.
