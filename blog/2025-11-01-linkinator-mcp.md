---
slug: '2025/11/01/linkinator-mcp'
title: 'Teaching Claude to be a Link Detective with linkinator-mcp'
date: '2025-11-01'
authors:
  - justin
tags:
  - nodejs
  - ai
  - featured
  - mcp
description: 'The Model Context Protocol (MCP) lets you give AI assistants superpowers. I built linkinator-mcp to teach Claude Code how to scan websites for broken links interactively. Spoiler alert: it turns out AI is really good at finding 404s.'
---

![Linkinator MCP](/img/linkinator.webp)

You know that feeling when you publish a website, and three months later someone tells you half the links are broken? Or worse - when you're in the middle of a deployment and you _know_ there are busted links somewhere, but you have no idea where?

When working on API reference documentation for Google's APIs, our team ran into this a little too frequently.  Enough times that I built [linkinator](https://github.com/JustinBeckwith/linkinator) - a tool that crawls websites and checks for broken links. It's worked well enough for me for years, but here's the thing: **running a link checker from the command line is kind of a chore**.

<!--truncate-->

When running linkinator as part of CI, especially with the [GitHub Action](https://github.com/JustinBeckwith/linkinator-action), it works great.  It's a little less fun when you're doing the initial analysis - instead of a single broken link you've introduced, you're often presented with a seemingly insurmountable list of failures.  

You have to remember all the flags. You have to parse the output. You have to decide what to do about the results. It's all very... manual. And as someone who's been building developer tools for a while now, I can tell you that manual processes are where good intentions go to die.

## Enter the Model Context Protocol

A few months ago, Anthropic released the [Model Context Protocol (MCP)](https://modelcontextprotocol.io/) - a way to give AI assistants like Claude access to external tools and data sources. Think of it like giving your AI a Swiss Army knife, except instead of a tiny scissors and a toothpick, it gets powerful APIs and command-line tools.

The protocol is pretty simple. You create a "server" (which is really just a Node.js script) that exposes some functionality, and then AI assistants can call into it to do useful work. It's like building a plugin, except the AI figures out when and how to use it.

And that got me thinking: _What if Claude could run link checks for me?_

## Why this is actually useful

Here's where things get interesting. When you're working with an AI assistant like Claude Code, you're often:

- Building websites or documentation
- Refactoring content and moving pages around
- Reviewing pull requests that touch markdown files
- Debugging why that one page isn't working

In all of these scenarios, having Claude be able to scan for broken links _in the flow of the conversation_ is ridiculously helpful. Instead of:

1. _"Let me check if there are any broken links"_
2. Open a terminal
3. Run `npx linkinator ./docs --recurse`
4. Wait for it to finish
5. Parse the output
6. Go back to Claude to discuss what you found

You can just ask: _"Hey, can you check if there are any broken links in my docs?"_

And Claude will... just do it. Then it'll tell you what it found, suggest fixes, and even help you update the files. It's the kind of workflow that feels like magic once you get used to it.

## How linkinator-mcp works

Under the hood, [linkinator-mcp](https://github.com/JustinBeckwith/linkinator-mcp) is a thin wrapper around the linkinator library. It exposes a single MCP tool called `scan_page` that accepts all the usual linkinator options:

- Scan websites or local files
- Crawl recursively across domains
- Check CSS for URLs
- Validate anchor fragments (those `#section-name` links)
- Configure retries, timeouts, SSL handling, all the good stuff

When Claude calls the tool, linkinator does its thing - crawling pages, checking links, following redirects - and then returns a nicely formatted report. Claude gets to see which links are broken, what the error was, and can then help you figure out what to do about it.

## Setting it up (it's easier than you think)

The quickest way to get started is to run:

```bash
npx install-mcp linkinator-mcp --client claude
```

This will automatically configure linkinator-mcp for Claude Desktop, Claude Code, Cursor, and Cline. It's one of those rare cases where the "automatic setup" actually works.

If you want to configure it manually (or you're the kind of person who likes to know what's happening under the hood), you can edit your MCP config file directly.

For Claude Code on macOS/Linux, edit `~/.config/claude-code/config.json`:

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

On Windows, the file is at `%APPDATA%\claude-code\config.json`.

Restart Claude Code, and you're good to go.

## Using it in the wild

Here's where things get fun. Once you've got linkinator-mcp set up, you can just... ask Claude to check links. The AI figures out when to use the tool, and handles all the details.

### Example 1: Quick website scan

```text
You: Can you check all the links on https://jbeckwith.com?

Claude: I'll scan your website for broken links.
[Calls linkinator-mcp with path: "https://jbeckwith.com"]

Good news! All 47 links on your site are working correctly.
```

### Example 2: Deep recursive scan

```text
You: I just refactored my documentation site. Can you do a deep scan
     to make sure I didn't break anything?

Claude: I'll do a recursive scan of your entire site.
[Calls linkinator-mcp with path: "https://docs.example.com", recurse: true]

I found 3 broken links:
- /old-page.html (404) - linked from /getting-started.md
- /api/v1/docs (404) - linked from /reference.md
- /images/diagram.png (404) - linked from /architecture.md

Would you like me to help fix these?
```

### Example 3: Local development

```text
You: I'm working on this documentation in ./docs. Before I commit,
     can you check if there are any broken links?

Claude: I'll scan your local docs folder.
[Calls linkinator-mcp with path: "./docs", recurse: true, markdown: true]

Found 1 broken link:
- ../assets/screenshot.png (not found) - referenced in ./docs/tutorial.md

The file ../assets/screenshot.png doesn't exist. Did you mean
./assets/screenshot.png instead?
```

### Example 4: The paranoid squirrel approach

If you want to be _really_ thorough (and I respect that), you can ask Claude to go full squirrel mode:

```text
You: Can you do a really strict scan of my site? I want to catch
     everything - broken fragments, redirects, HTTP links, all of it.

Claude: I'll run a comprehensive scan with strict validation.
[Calls linkinator-mcp with checkFragments: true, redirects: "warn",
 requireHttps: "warn", recurse: true]

Found several issues:
- 2 broken fragment identifiers (links to sections that don't exist)
- 5 HTTP links that should be HTTPS
- 3 redirects that could be updated to point directly

Let me show you each one and we can fix them together.
```

## Why I built this

I've been maintaining linkinator for years now, and it's been great for CI/CD pipelines and automated checks. But the truth is, most of the time when I need to check links, it's in the middle of doing something else. I'm writing docs, or reviewing a PR, or debugging a website issue.

Having Claude Code be able to check links _in context_ - while we're already discussing the problem - is a huge workflow improvement. It's the difference between "let me go run this other tool and come back" versus "yeah, let me check that for you real quick."

Plus, Claude is weirdly good at interpreting the results and suggesting fixes. It understands that a 404 probably means you renamed a file and forgot to update the link. It knows that a broken fragment identifier means you changed a heading. It can see patterns in multiple broken links and suggest systematic fixes.

## Some limitations to be aware of

Is this perfect? No. Here are a few things to keep in mind:

- **It's as accurate as linkinator itself**. If you've got JavaScript-rendered content or fancy client-side routing, some links might not be checkable.
- **Bot protection is a thing**. Some sites (looking at you, LinkedIn) will block automated scanners. Linkinator handles this by skipping those links rather than marking them as broken.
- **Large sites take time**. If you're scanning a massive website recursively, it's going to take a while. Claude is patient, but you might want to grab a coffee.

## The bigger picture

This is honestly just the beginning. MCP opens up a whole world of possibilities for making AI assistants more useful in real development workflows. I've got a few other ideas brewing:

- An MCP server for running tests and parsing results
- One for interacting with GitHub Issues and PRs
- Maybe one for analyzing bundle sizes or performance metrics

The pattern is always the same: take a tool that developers already use, wrap it in MCP, and suddenly your AI assistant can help you use it more effectively.

## Try it out

If you're using Claude Code (or any other MCP-compatible AI assistant), give linkinator-mcp a spin. The setup takes about 30 seconds, and the first time Claude catches a broken link you were about to commit, you'll be hooked.

Grab it from [npm](https://www.npmjs.com/package/linkinator-mcp) or check out the source on [GitHub](https://github.com/JustinBeckwith/linkinator-mcp).

And if you build something cool with MCP, or have ideas for other tools that would be useful to wrap - let me know! I'm [@JustinBeckwith](https://twitter.com/JustinBeckwith) on Twitter, and I'd love to hear what you're building.

Now if you'll excuse me, I need to go check all the links in this blog post. _Recursively_.
