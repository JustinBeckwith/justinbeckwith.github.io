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

Cloudflare Pages is the production host. The Pages deployment, custom domains,
HTTPS, and DNSSEC have been verified. The former Render static site was deleted
on 2026-07-18 and Render is no longer part of this site's infrastructure.

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

- Cloudflare Pages project `justinbeckwith-github-io` is connected to GitHub.
- Production deployment of commit `da65dde` succeeded with Node.js 24.13.1;
  all 1,082 assets were published.
- Pages URL: `https://justinbeckwith-github-io.pages.dev`.
- The homepage, `/blog`, and a representative historical blog URL were
  verified with HTTP 200 responses on the Pages deployment.
- The `jbeckwith.com` Cloudflare zone is active on the Free plan. All four
  pre-existing DNS records were imported before cutover.
- Assigned Cloudflare nameservers: `alberto.ns.cloudflare.com` and
  `dahlia.ns.cloudflare.com`.
- Squarespace now delegates the domain to the two Cloudflare nameservers above.
- `jbeckwith.com` and `www.jbeckwith.com` are attached to Pages. The apex serves
  HTTPS with HTTP 200, and a representative old blog URL serves HTTP 200.
- Both apex and `www` serve the Pages deployment. Docusaurus emits canonical
  URLs using `https://jbeckwith.com`; a host-level `www` redirect is optional.
- DNSSEC was re-enabled after cutover. Cloudflare reports the zone protected,
  and the corresponding DS record is registered at Squarespace.
- The obsolete Render static service `justinbeckwith.github.io` was permanently
  deleted after cutover verification.
- Registration remains at Squarespace by choice. A future registrar transfer
  is optional and requires approval of the displayed fee.

## Domain and DNS

As checked on 2026-07-18:

- Registrar: Squarespace Domains II LLC
- Registration expires: 2027-06-30
- Registrar transfer lock: enabled (`client transfer prohibited`)
- Authoritative nameservers: `alberto.ns.cloudflare.com` and
  `dahlia.ns.cloudflare.com`
- Apex `jbeckwith.com` CNAME: `justinbeckwith-github-io.pages.dev` (proxied)
- `www.jbeckwith.com` CNAME: `justinbeckwith-github-io.pages.dev` (proxied)
- DNSSEC: enabled and confirmed by Cloudflare

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
