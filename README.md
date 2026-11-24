# DayNight24 Services Inc. — Website

Static site. No build step, no dependencies to install. Open the folder in VS Code
and everything links up on its own.

---

## Folder structure

```
daynight24-website/
├── index.html                           ← homepage
├── pricing.html                         ← 3-service pricing & estimator hub
├── appliance-installation-booking.html  ← 12-category appliance estimator + 5% GST
├── tv-wall-mounting-booking.html        ← visual TV mounting estimator
├── auto-detailing-booking.html          ← mobile auto detailing estimator
├── services.html                        ← services overview
├── services-appliance-installation.html
├── services-tv-wall-mounting.html
├── services-auto-detailing.html
├── appliance-*.html                     ← 12 dedicated appliance pages
├── reviews.html
├── about.html
├── contact.html
├── service-areas.html                   ← interactive coverage map
├── faq.html
├── privacy.html
├── terms.html
└── assets/
    ├── css/styles.css                   ← shared styles across all pages
    ├── js/main.js                       ← menu, carousel, FAQ, quote form
    ├── js/estimators.js                 ← booking estimator prices & logic
    └── images/                          ← your photos go here (see IMAGES-NEEDED.md)
```

Every page shares `styles.css` and `main.js`, so a change to the header, footer,
colours or fonts happens once and applies everywhere. Estimator prices and options
live at the top of `assets/js/estimators.js`.

## Viewing it

Double-clicking `index.html` works. Better: install the **Live Server** extension
in VS Code, right-click `index.html`, choose *Open with Live Server*. It reloads
the browser every time you save.

## What still needs doing

1. **Add your photos.** See `assets/images/IMAGES-NEEDED.md` for the full list with
   exact filenames and sizes.
2. **Activate email routing (`info@daynight24.ca`).** All quote and booking forms are
   wired to `https://formsubmit.co/info@daynight24.ca` (`assets/js/estimators.js`,
   `index.html`, and `contact.html`). Once published on `daynight24.ca`, submit one test
   quote and click the one-time activation link FormSubmit sends to **info@daynight24.ca**.
   (You can also swap `FORM_ENDPOINT` / `action` to a Formspree or Web3Forms URL anytime.)
3. **Add your social links.** In the footer of every page, the Facebook, Instagram
   and Google icons point at `#`. Because the footer is repeated in each file, use
   VS Code's *Find in Folder* (Ctrl+Shift+F / Cmd+Shift+F) to replace them all at once.
4. **Check the gas services claim.** Gas fitting is regulated work in Alberta. Confirm
   your position before the site goes live.

## Editing tips

- **Phone number** appears in many places. Find in Folder, replace across all files.
- **Colours** live at the top of `styles.css` under `:root`. Change `--gold` once and
  every button, icon and highlight follows.
- **Hero rotation speed** is `var DURATION = 3500;` near the carousel section of
  `main.js`.
- **Adding a nav item** means editing the header in every HTML file — use Find in
  Folder so they never drift apart.

## Publishing

Any static host works, free of charge for a site this size:

- **Netlify** — drag this folder onto app.netlify.com/drop. Live in seconds.
- **Cloudflare Pages** or **GitHub Pages** — connect a repo, done.
- **Traditional hosting** — upload the folder contents to `public_html` over FTP.

Then point `daynight24.ca` at it and add an SSL certificate (every host above does
this automatically and free).

## After launch

Claim and fill out your **Google Business Profile** if you have not already. For a
local service business it drives more calls than the website itself; the site's job
is to make people trust you once Google has sent them. The homepage already includes
LocalBusiness structured data so search engines can read your phone number, hours
and service area.
