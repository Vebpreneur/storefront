# Spree Affiliate Storefront Engine — eSIM pilot
Isolated Next.js 16 / TypeScript affiliate frontend inspired by the seller directory, seller profile header, and product listing design of Spree Storefront (MIT license). This subproject deliberately does not import Spree SDK or run cart/checkout/accounts/orders.

## Run
`cd affiliate-engine && npm install && npm run build && npm run dev`
In Vercel set **Root Directory** to `affiliate-engine`, framework Next.js. The existing Spree application in the repository root is unchanged.

## Data and branding
- `src/data/suppliers.ts` contains all nine suppliers, destination cards and affiliate links.
- `src/data/site.ts` contains site branding and included supplier slugs. Set `NEXT_PUBLIC_SITE_KEY` to select a site configuration (default is `default`).
- Supplier-specific destination affiliate URLs take precedence; otherwise the supplier-wide URL is used.
- Other suppliers intentionally show a link to their own website instead of fabricated product inventory.
- No prices, allowances or durations are asserted without verification.
- Image URLs are illustrative third-party photos and favicons; replace with approved locally hosted assets before a branded production release.

## Routes
- `/` home
- `/sellers` directory with search
- `/sellers/airalo` supplier profile with six cards, search, filter, sort and external affiliate redirects
- `/sellers/[slug]` all other supplier profiles

## Source attribution
Based on visual patterns of https://github.com/spree/storefront. Copyright (c) 2026 Vendo Connect Inc., Vendo Sp. z o.o. Original MIT LICENSE is retained at repository root.

## Status
First pilot implementation. CI/build and live deployment must be verified independently before production readiness is claimed.
