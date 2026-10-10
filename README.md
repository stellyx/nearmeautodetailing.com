# Near Me Auto Detailing

One-page, mobile-friendly referral and contact website for Near Me Auto Detailing in Austin, Texas.

The website uses one `index.html` with its CSS included, a local WebP hero image, and a local silent MP4 background controlled by `assets/hero-motion.js`. It requires no build, packages, paid site builder, or backend.

The design has a dark automotive showroom look, bold slanted typography, silver sports-car imagery, and racing-red accents. The original hero image is AI-generated promotional artwork, not a portfolio photograph or an actual customer's vehicle. It does not use game logos or manufacturer branding.

## Background motion

The same silver coupe appears in a short detailing loop: a moving camera and water spray, a close-up of beading water, then a screen wipe to a gloved hand applying ceramic coating. The original image stays visible until video playback begins and remains the fallback if playback is blocked or fails.

The video plays silently and inline, with a visible Play/Pause motion button. It pauses outside the hero or when the tab is hidden. Reduced-motion and data-saver preferences prevent automatic loading and playback; visitors can explicitly choose Play motion. Source prompts, the generation receipt, and finishing settings are recorded in `assets/motion-manifest.json`.

## Hosting

GitHub Pages: deploy from the `main` branch, `/(root)` directory.

Live page: https://nearmeautodetailing.com/

The www address redirects to the apex domain. GitHub Pages Enforce HTTPS is enabled.

## Current checkpoint

- Verified business name: Near Me Auto Detailing.
- Verified category/location: mobile auto detailing in Austin, Texas.
- This page was rebuilt from scratch after the original Framer site went offline.
- Confirmed contact number: 512-553-2552, with `tel:+15125532552` and `sms:+15125532552` links.
- Current purpose: a simple detailing referral page while Andrew owns the site. It does not promise bookings or imply Andrew performs the services.
- Email has not been confirmed, so none is published. There is no form or backend to maintain.
- An eventual sale can be handled later. The public page does not advertise a sale.
- No pricing, reviews, ratings, experience claims, portfolio photos, water/power promises, or extra service areas have been invented.
- Search crawling is allowed. The page includes its canonical URL and a sitemap.
- The GitHub Pages custom-domain file `CNAME` is configured for `nearmeautodetailing.com`.
- Domain launch verified October 9, 2026 (Central time): all four GitHub Pages A records resolve correctly; GitHub's DNS check succeeds; the HTTPS www address redirects to the apex and returns the rebuilt page with status 200. Enforce HTTPS was enabled and its checked state was verified in GitHub Pages settings.

## GoDaddy DNS reference

The screenshots provided on October 9, 2026 showed two Framer apex A records and a Framer www CNAME. The website records were switched to GitHub Pages; the other records were to be preserved. The current public A responses use a TTL of 600 seconds.

| Action | Type | Name | Existing value | New value |
| --- | --- | --- | --- | --- |
| Edit | A | @ | 31.43.160.6 | 185.199.108.153 |
| Edit | A | @ | 31.43.161.6 | 185.199.109.153 |
| Add | A | @ | — | 185.199.110.153 |
| Add | A | @ | — | 185.199.111.153 |
| Edit | CNAME | www | sites.framer.app | stellyx.github.io |

The www CNAME is a hostname only: no https:// and no repository path. Preserve the remaining 16 existing records. The MX and Microsoft-related records are not proof that a specific email address is active, so no guessed address is published.

Sources: [GitHub DNS configuration](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site), [branch-source CNAME configuration](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/troubleshooting-custom-domains-and-github-pages).
