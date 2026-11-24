# Images to supply

Drop each file into this folder (`assets/images/`) using the **exact filename** below.
Nothing else needs changing — the pages already point at these names.

Until a file exists, the layout still renders: photo slots show a grey placeholder
with the filename printed on it, and background layers simply stay navy.

---

## Hero carousel — foreground photos (portrait)

These are the large photos on the right of the hero. Shot vertically.

| Filename | Size | What it should show |
|---|---|---|
| `hero-appliance-installation.jpg` | 1100 × 1250 | You installing an appliance — dishwasher, range hood or OTR microwave |
| `hero-tv-wall-mounting.jpg` | 1100 × 1250 | A mounted TV, ideally mid-job with tools visible |
| `hero-auto-detailing.jpg` | 1100 × 1250 | A car being detailed in a driveway |

## Hero carousel — background photos (landscape)

These sit *behind* the navy overlay at low opacity. Pick calm, low-detail shots —
anything busy turns into visual noise. Slightly out-of-focus works well.

| Filename | Size | What it should show |
|---|---|---|
| `hero-bg-appliance.jpg` | 1920 × 1080 | Wide kitchen scene |
| `hero-bg-tv-mount.jpg` | 1920 × 1080 | Wide living room scene |
| `hero-bg-detailing.jpg` | 1920 × 1080 | Wide driveway or vehicle exterior |

To make them more or less visible, edit one line in `assets/css/styles.css`:
`.hero-bg.is-active{opacity:.34}`

## Service cards (landscape)

| Filename | Size | What it should show |
|---|---|---|
| `service-appliance-installation.jpg` | 800 × 500 | Close-up of an install in progress |
| `service-tv-wall-mounting.jpg` | 800 × 500 | Finished TV on the wall, cables hidden |
| `service-auto-detailing.jpg` | 800 × 500 | Interior or exterior detailing close-up |

## Section texture

| Filename | Size | What it should show |
|---|---|---|
| `texture-bg.jpg` | ~1600 × 1200 | Neutral, low-contrast surface — brushed metal, fine concrete, linen |

Used across every grey and navy section at 9–12% opacity. Keep it plain; a busy
texture will fight the text. Set once in `styles.css` as `--texture`.

## Social sharing

| Filename | Size | What it should show |
|---|---|---|
| `og-daynight24.jpg` | 1200 × 630 | Logo plus a strong service photo — this is the thumbnail when the site is shared on Facebook, WhatsApp or in messages |

---

## Before you upload

- **Compress everything.** Aim under 300 KB per file. [Squoosh](https://squoosh.app)
  is free and does this in the browser. Large photos are the single most common
  reason a small business site feels slow.
- **Real photos beat stock.** Your own job photos will outperform any design
  decision on this page. Even phone photos, if they are well lit.
- **Landscape stays landscape.** Cropping a portrait shot into the wide slots will
  cut heads off.
- If you use stock, [Unsplash](https://unsplash.com) and [Pexels](https://pexels.com)
  are free for commercial use. Do not pull images from Google Image results — most
  are copyrighted and you can be billed for using them.
