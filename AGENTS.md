# Repository guidance

## Site and build

- This repository contains the Docusaurus site for `https://jbeckwith.com`.
- Use Node.js 24 or newer, matching the `engines.node` field in `package.json`.
- Install dependencies with `npm ci`.
- Build with `npm run build`; the static output directory is `build/`.
- Before changing deployment configuration, verify a clean install and production build with `npm ci && npm run build`.
- Keep `url: 'https://jbeckwith.com'` and `baseUrl: '/'` in `docusaurus.config.ts` unless the production hostname changes.
- `static/CNAME` contains `jbeckwith.com`. It is harmless in a Cloudflare Pages build and documents the canonical hostname.

### Docusaurus v4 compatibility

The historical blog posts use Markdown-era HTML comments such as
`<!--truncate-->` and markdownlint directives. Do not enable Docusaurus's
`future.v4` flag without migrating those comments and adding the required
`@docusaurus/faster` dependency. With Docusaurus 3.10.2, enabling that flag
causes clean builds to fail. Standard Docusaurus 3 mode builds successfully.

## Hosting migration: Render to Cloudflare Pages

Cloudflare Pages is the intended production host. Render should remain in
place only until the Pages deployment and custom domains have been verified.
Do not remove the Render service or its DNS records before that verification.

Cloudflare Pages settings:

- GitHub repository: `JustinBeckwith/justinbeckwith.github.io`
- Production branch: `main`
- Framework preset: Docusaurus
- Build command: `npm run build`
- Build output directory: `build`
- Node version: 24 (set `NODE_VERSION=24` in Pages if its build image does not
  honor `package.json` automatically)
- Custom domains: `jbeckwith.com` and `www.jbeckwith.com`
- Canonical domain: `jbeckwith.com`; redirect `www` to the apex if Cloudflare
  does not create that redirect automatically.

Cloudflare Pages hosting and authoritative DNS are intended to remain on the
Free plan. As checked on 2026-07-18, the Free plan allows 500 builds/month,
100 custom domains per project, 20,000 files per site, and a 25 MiB per-file
limit. The verified local build contained 1,082 files, totaled about 79 MiB,
and had no individual file over the limit.

### Migration status (2026-07-18)

- The Cloudflare account is available and Cloudflare Pages setup was started.
- The Cloudflare Pages GitHub app did not yet have access to this repository.
- The next manual step is to sign in to GitHub and grant the Cloudflare Pages
  app access to `JustinBeckwith/justinbeckwith.github.io`.
- After access is granted, create the Pages project with the settings above,
  let the first deployment succeed, and test its `*.pages.dev` URL.
- Only after the Pages URL works should the Cloudflare zone, nameservers, and
  custom domains be cut over.

## Domain and DNS

As checked on 2026-07-18:

- Registrar: Squarespace Domains II LLC
- Registration expires: 2027-06-30
- Registrar transfer lock: enabled (`client transfer prohibited`)
- Authoritative nameservers: `ns-cloud-d1.googledomains.com` through
  `ns-cloud-d4.googledomains.com`
- Apex `jbeckwith.com` A record: `216.24.57.1` (Render)
- `www.jbeckwith.com` CNAME: `justinbeckwith-github-io.onrender.com`
- DNSSEC: enabled

Safe cutover sequence:

1. Inventory and reproduce every existing DNS record in Cloudflare, including
   MX, TXT, verification, and mail-related records; do not copy only the web
   records.
2. Add `jbeckwith.com` to Cloudflare on the Free plan and confirm the imported
   records are complete.
3. Disable DNSSEC at Squarespace before changing nameservers, because stale DS
   records can make the domain unreachable.
4. Change the nameservers at Squarespace to the pair assigned by Cloudflare.
5. Wait until Cloudflare reports the zone as active, then attach the apex and
   `www` hostnames to the verified Pages project.
6. Confirm HTTPS, the apex/`www` redirect, representative old blog URLs, RSS,
   and Google verification.
7. Re-enable DNSSEC in Cloudflare and confirm it becomes active.
8. Remove the Render service only after the new site and DNS are stable.

Transferring the registration to Cloudflare Registrar is optional and should
happen after the DNS/Pages cutover is stable. Cloudflare Registrar charges the
registry/ICANN cost without markup, but domain registration is not free. A
transfer normally requires unlocking the domain and obtaining an authorization
code from Squarespace, and it generally includes a one-year extension. Do not
start a paid transfer without explicit user confirmation of the displayed
price. Cloudflare Registrar requires the domain to keep using Cloudflare
nameservers.

## Change hygiene

- Preserve unrelated user changes in the working tree. In particular,
  `renovate.json` may contain user-authored changes unrelated to deployment.
- Never commit account IDs, authorization codes, API tokens, registrar contact
  information, or other dashboard secrets.
