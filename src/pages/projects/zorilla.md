---
title: Zorilla - A Fork of puppeteer-extra
description: Zorilla is a fork of the popular puppeteer-extra project by berstend and its contributors, providing plugins for Puppeteer and Playwright.
keywords:
  - puppeteer plugins
  - playwright plugins
  - browser automation
  - puppeteer extra
  - playwright extra
  - stealth plugin
image: /img/zorilla.webp
---

# 🦨 zorilla

> Teach Puppeteer and Playwright new tricks through plugins.

![A cartoon zorilla in the African savanna](/img/zorilla.webp)

:::warning Fork and Upstream Credit

**Zorilla is a fork of the popular [puppeteer-extra](https://github.com/berstend/puppeteer-extra) project.** The original framework and plugin ecosystem were created by [berstend](https://github.com/berstend) and its many [contributors](https://github.com/berstend/puppeteer-extra/graphs/contributors). Zorilla builds on their work; it is not presented here as an original framework created by Justin Beckwith.

:::

:::info GitHub Repository

📦 **Source Code**: [github.com/zorillajs/zorilla](https://github.com/zorillajs/zorilla)

View the source code, report issues, and contribute to the project.

:::

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/zorillajs/zorilla/blob/main/LICENSE)

**Zorilla** is a fork of [`puppeteer-extra`](https://github.com/berstend/puppeteer-extra), a modular plugin framework for browser automation originally created by berstend and its contributors. The fork builds on that existing ecosystem and includes support for Playwright, making it possible to add focused capabilities to either browser library without packing everything into one dependency.

## What It Includes

- **Puppeteer Extra** - A drop-in wrapper for Puppeteer with plugin support
- **Playwright Extra** - Plugin support for Playwright browsers
- **Stealth** - Applies evasions that make automated browsers harder to detect
- **Ad Blocking** - Blocks ads and trackers during browser sessions
- **reCAPTCHA Support** - Adds helpers for working with reCAPTCHA challenges
- **Extensible Plugin API** - Supports writing and composing custom browser-automation plugins

## How It Works

Choose the plugins your automation needs, register them with the enhanced browser library, and then launch a browser as usual. Plugins can participate in browser and page lifecycle events to configure or extend behavior.

For package-specific installation and usage details, see the documentation in the [Zorilla repository](https://github.com/zorillajs/zorilla).

## Contributing

Contributions and new plugins are welcome. The repository contains examples of existing plugins and a base plugin package that can be used as a starting point.

## Upstream Project

The original project, documentation, plugin ecosystem, and contributor history are available at [berstend/puppeteer-extra](https://github.com/berstend/puppeteer-extra). Please use the upstream repository for the canonical project and credit its maintainers and contributors for the foundational work.

## License

[MIT](https://github.com/zorillajs/zorilla/blob/main/LICENSE)
