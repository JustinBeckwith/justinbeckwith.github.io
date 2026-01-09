---
image: /img/linkinator-mcp.webp
---

# linkinator-mcp

> A Model Context Protocol (MCP) server that enables AI assistants to perform link validation and broken link checking.

![linkinator-mcp](/img/linkinator-mcp.webp)

:::info GitHub Repository

📦 **Source Code**: [github.com/JustinBeckwith/linkinator-mcp](https://github.com/JustinBeckwith/linkinator-mcp)

View the source code, report issues, and contribute to the project.

:::

[![npm version](https://img.shields.io/npm/v/linkinator-mcp)](https://www.npmjs.com/package/linkinator-mcp)
[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/JustinBeckwith/linkinator-mcp/blob/main/LICENSE)

The linkinator MCP server integrates the power of [linkinator](https://github.com/JustinBeckwith/linkinator) with AI assistants through the Model Context Protocol. This enables Claude and other AI tools to scan webpages and local files for broken links directly from chat conversations.

## Features

- 🔍 **Comprehensive Link Validation** - Scan websites and local files for broken or inaccessible links
- 🌐 **Recursive Crawling** - Follow links within the same domain automatically
- 📝 **Multi-Format Support** - Check links in HTML, CSS, and Markdown files
- ⚓ **Fragment Validation** - Verify URL anchors and internal page references
- ⚙️ **Extensive Configuration** - Customize timeouts, retry logic, SSL handling, and more
- 📊 **Detailed Reporting** - Get comprehensive results with HTTP status codes and error categorization

## Installation

### Automatic Installation (Recommended)

The easiest way to install is using the `install-mcp` tool:

```sh
npx install-mcp linkinator-mcp --client claude
```

This will automatically configure the MCP server for Claude Desktop, Claude Code, Cursor, Cline, and other MCP clients.

### Manual Installation

If you prefer manual configuration, you can add the server to your MCP client's config file.

**Claude Desktop (macOS/Linux):**
```
~/Library/Application Support/Claude/claude_desktop_config.json
```

**Claude Desktop (Windows):**
```
%APPDATA%\Claude\claude_desktop_config.json
```

**Claude Code (macOS/Linux):**
```
~/.config/claude-code/config.json
```

**Claude Code (Windows):**
```
%APPDATA%\claude-code\config.json
```

Add the following to your config:

```json
{
  "mcpServers": {
    "linkinator": {
      "command": "npx",
      "args": ["linkinator-mcp"]
    }
  }
}
```

For a global installation:

```sh
npm install -g linkinator-mcp
```

Then use:

```json
{
  "mcpServers": {
    "linkinator": {
      "command": "linkinator-mcp"
    }
  }
}
```

## Usage

Once installed, you can ask your AI assistant to check links:

- "Check all the links on https://example.com"
- "Scan this website recursively for broken links"
- "Validate the links in my local documentation folder"
- "Check for broken anchors and fragments on this page"

## Configuration Options

The `scan_page` tool supports extensive configuration:

### Essential
- **path** - URL or local file path to scan (required)

### Connection Settings
- **concurrency** - Number of simultaneous connections
- **port** - Port for local file server
- **timeout** - Request timeout in milliseconds

### Crawling Behavior
- **recurse** - Follow same-domain links recursively
- **serverRoot** - Custom server root for local scans
- **cleanUrls** - Support extensionless URLs

### Content Parsing
- **markdown** - Parse and scan markdown files
- **checkCss** - Extract and validate URLs in CSS
- **checkFragments** - Verify anchor identifiers

### Filtering
- **linksToSkip** - Regex patterns for URLs to skip
- **userAgent** - Custom user agent string

### Retry Logic
- **retry** - Enable automatic retries for HTTP 429
- **retryErrors** - Retry on 5xx errors
- **retryErrorsCount** - Maximum retry attempts
- **retryErrorsJitter** - Random delay between retries

### Security
- **allowInsecureCerts** - Accept invalid SSL certificates

## Output

Results include:
- Total links scanned
- Successful connections
- Broken links categorized by HTTP status code
- Source pages for each broken link
- Detailed error information

## Example Results

```
Scan Complete!
✓ Total links: 127
✓ Successful: 125
✗ Broken: 2

Broken Links:
  404 Not Found
    - https://example.com/missing-page
      → Found on: https://example.com/index.html
```

## Related Projects

- [linkinator](https://github.com/JustinBeckwith/linkinator) - The core link checking library
- [linkinator-action](https://github.com/JustinBeckwith/linkinator-action) - GitHub Action for link validation

## License

[MIT](https://github.com/JustinBeckwith/linkinator-mcp/blob/main/LICENSE)
