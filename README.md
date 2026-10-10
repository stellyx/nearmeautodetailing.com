# Near Me Auto Detailing

One-page, mobile-friendly referral and contact website for Near Me Auto Detailing in Austin, Texas.

The website uses one `index.html` with its CSS included and a local WebP hero image. It requires no build, packages, paid site builder, or backend.

The design has a dark automotive showroom look, bold slanted typography, silver sports-car imagery, and racing-red accents. The original hero image is AI-generated promotional artwork, not a portfolio photograph or an actual customer's vehicle. It does not use game logos or manufacturer branding.

## Hosting

GitHub Pages: deploy from the `main` branch, `/(root)` directory.

Live page: https://stellyx.github.io/nearmeautodetailing.com/

## Current checkpoint

- Verified business name: Near Me Auto Detailing.
- Verified category/location: mobile auto detailing in Austin, Texas.
- Original Framer site is offline. This page is a new draft, not an exact copy of the inaccessible original.
- Confirmed contact number: 512-553-2552, with `tel:+15125532552` and `sms:+15125532552` links.
- Current purpose: a simple detailing referral page while Andrew owns the site. It does not promise bookings or imply Andrew performs the services.
- Email has not been confirmed, so none is published. There is no form or backend to maintain.
- An eventual sale can be handled later. The public page does not advertise a sale.
- No pricing, reviews, ratings, experience claims, portfolio photos, water/power promises, or extra service areas have been invented.
- Draft is excluded from indexing with `robots.txt` and a robots meta tag.
- The GitHub Pages custom-domain file `CNAME` is configured for `nearmeautodetailing.com`.
- GoDaddy DNS changes and custom-domain HTTPS verification are pending. The GitHub Pages URL may redirect to the custom domain while the DNS switch is pending.

## Finish before the domain switch

1. Apply the website DNS changes below in GoDaddy. Preserve all other records, including email/MX/TXT records and nameservers.
2. Verify the custom domain and HTTPS, then enable Enforce HTTPS in GitHub Pages settings when available.
3. Remove the draft robots meta tag, change `robots.txt` to allow crawling, and add the canonical URL and sitemap using the verified final domain.

## GoDaddy DNS switch

The screenshots provided on October 9, 2026 show two Framer apex A records and a Framer www CNAME. Set TTL to 1 hour for each changed or added record.

| Action | Type | Name | Existing value | New value |
| --- | --- | --- | --- | --- |
| Edit | A | @ | 31.43.160.6 | 185.199.108.153 |
| Edit | A | @ | 31.43.161.6 | 185.199.109.153 |
| Add | A | @ | — | 185.199.110.153 |
| Add | A | @ | — | 185.199.111.153 |
| Edit | CNAME | www | sites.framer.app | stellyx.github.io |

The www CNAME is a hostname only: no https:// and no repository path. Preserve the remaining 16 existing records. The MX and Microsoft-related records are not proof that a specific email address is active, so no guessed address is published.

Sources: [GitHub DNS configuration](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site), [branch-source CNAME configuration](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/troubleshooting-custom-domains-and-github-pages).
