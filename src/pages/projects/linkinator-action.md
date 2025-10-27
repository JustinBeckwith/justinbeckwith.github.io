---
image: /img/linkinator-action.webp
---

# linkinator-action

> A happy little GitHub Action that checks your README.md and other markdown for broken links. Uses [linkinator](https://github.com/JustinBeckwith/linkinator) under the hood.

![linkinator-action](/img/linkinator-action.webp)

Linkinator Action brings powerful link validation to your GitHub workflows. Automatically scan markdown files, documentation, and entire websites for broken links during CI/CD, ensuring your links stay healthy across pull requests and deployments.

## Features

- 🔥 Automatically scan README.md and markdown files
- 🔥 Works on push and pull request events
- 🔥 Recursive crawling for comprehensive link checking
- 🔥 Skip specific URLs with regex patterns
- 🔥 Validate URL fragments and anchors
- 🔥 Check links in CSS files and styles
- 🔥 Custom retry logic for flaky endpoints
- 🔥 HTTPS enforcement options
- 🔥 Extensive configuration options

## Basic Usage

With no arguments, this will scan your `README.md` in the root of the repository:

```yaml
on:
  push:
    branches:
      - main
  pull_request:
name: ci
jobs:
  linkinator:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: JustinBeckwith/linkinator-action@v2
```

## Advanced Configuration

Pass many of the same parameters that [linkinator](https://github.com/JustinBeckwith/linkinator) provides:

```yaml
on:
  push:
    branches:
      - main
  pull_request:
name: ci
jobs:
  linkinator:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: JustinBeckwith/linkinator-action@v2
        with:
          paths: "docs/**/*.md"
          recurse: true
          markdown: true
          linksToSkip: "http://fake.local, http://fake.local/fake"
          concurrency: 50
```

## Comprehensive Link Checking

Enable all validation features for thorough link checking:

```yaml
- uses: JustinBeckwith/linkinator-action@v2
  with:
    paths: "**/*.md"
    recurse: true
    checkFragments: true
    checkCss: true
    requireHttps: true
    retry: true
    retryErrors: true
```

## Configuration Options

### Scanning

- **paths** - Paths to scan for 404s. Defaults to `*.md`.
- **config** - Path to a config file to use. Looks for `linkinator.config.json` by default.
- **recurse** - Recursively follow links on the same root domain. Defaults to `false`.
- **markdown** - Automatically parse and scan markdown files. Defaults to `true`.
- **concurrency** - Number of simultaneous connections. Defaults to `100`.

### Link Validation

- **checkFragments** - Validate fragment identifiers (anchor links) on HTML pages. Defaults to `false`.
- **checkCss** - Parse and extract URLs from CSS files and styles. Defaults to `false`.
- **linksToSkip** - List of URLs in regex form to skip (also accepts `skip`).
- **requireHttps** - Require all links to use HTTPS. Defaults to `false`.

### Network & Retry

- **timeout** - Request timeout in milliseconds. Defaults to 0 (no timeout).
- **retry** - Automatically retry HTTP 429 responses with `retry-after` header. Defaults to `false`.
- **retryErrors** - Automatically retry 5xx or network errors. Defaults to `false`.
- **retryErrorsCount** - Number of times to retry errors. Defaults to `3`.
- **retryErrorsJitter** - Maximum jitter in milliseconds for retry delays. Defaults to `2000`.

### Advanced

- **serverRoot** - Customize server location when scanning local directories.
- **directoryListing** - Include automatic directory index when linking to directories. Defaults to `false`.
- **allowInsecureCerts** - Allow insecure certificates for local development. Defaults to `false`.
- **cleanUrls** - Enable extensionless URL support for modern static hosting. Defaults to `false`.
- **userAgent** - Custom User-Agent header for requests.
- **urlRewriteSearch** - Pattern to search in URLs (use with `urlRewriteReplace`).
- **urlRewriteReplace** - Replacement expression (use with `urlRewriteSearch`).
- **verbosity** - Control output verbosity: DEBUG, INFO, WARNING, ERROR, or NONE. Defaults to WARNING.

## Outputs

- **results** - An object containing the scan results and link validation data.

## Example Workflows

### Scan Documentation on Pull Requests

```yaml
on:
  pull_request:
    paths:
      - 'docs/**'
name: docs-validation
jobs:
  check-links:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: JustinBeckwith/linkinator-action@v2
        with:
          paths: "docs/**/*.md"
          recurse: true
```

### Strict Link Validation

```yaml
- uses: JustinBeckwith/linkinator-action@v2
  with:
    paths: "."
    recurse: true
    checkFragments: true
    requireHttps: true
    verbosity: "INFO"
```

### Skip External Links

```yaml
- uses: JustinBeckwith/linkinator-action@v2
  with:
    paths: "README.md"
    linksToSkip: "https://external-site.com, ^https://twitter.com"
```

## Debugging

To view skipped links, failure details, and more debugging information, [enable step debug logging](https://docs.github.com/en/actions/managing-workflow-runs/enabling-debug-logging#enabling-step-debug-logging) in your GitHub Actions workflow.

## Related Projects

- [linkinator](https://github.com/JustinBeckwith/linkinator) - The core CLI and library
- [linkinator-mcp](https://github.com/JustinBeckwith/linkinator-mcp) - MCP server for AI assistants

## License

[MIT](https://github.com/JustinBeckwith/linkinator-action/blob/main/LICENSE)
