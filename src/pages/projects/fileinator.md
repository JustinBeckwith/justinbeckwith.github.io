---
image: /img/fileinator.webp
---

# fileinator

> Behold my latest inator! Generate files full of random bytes. Good for tests.

![fileinator](/img/fileinator.webp)

:::info GitHub Repository

📦 **Source Code**: [github.com/JustinBeckwith/fileinator](https://github.com/JustinBeckwith/fileinator)

View the source code, report issues, and contribute to the project.

:::

[![npm version](https://img.shields.io/npm/v/fileinator.svg)](https://www.npmjs.org/package/fileinator)
[![codecov](https://codecov.io/gh/JustinBeckwith/fileinator/branch/main/graph/badge.svg)](https://codecov.io/gh/JustinBeckwith/fileinator)
[![Checked with Biome](https://img.shields.io/badge/Checked_with-Biome-60a5fa?style=flat&logo=biome)](https://biomejs.dev)

The fileinator is a utility tool for generating files filled with random bytes. Perfect for testing file handling, storage systems, and performance with specific file sizes without needing actual meaningful content.

## Features

- 🔥 Generate files of any size with random data
- 🔥 Command-line tool for quick test file creation
- 🔥 Library API for programmatic use
- 🔥 Human-readable size specifications (e.g., "20mb", "10gb")
- 🔥 Progress tracking and event-based callbacks
- 🔥 TypeScript support

## Installation

### Global Installation (CLI)

```sh
npm install -g fileinator
```

### Local Installation (Library)

```sh
npm install --save fileinator
```

## Command Line Usage

Generate a file with random bytes:

```sh
fileinator make 10gb ./bigfile
```

This creates a 10GB file named `bigfile` in the current directory filled with random data.

### Examples

Create a 20MB test file:
```sh
fileinator make 20mb ./testfile.dat
```

Create a 1GB file:
```sh
fileinator make 1gb ./largefile
```

## Library Usage

Use fileinator programmatically in your Node.js applications:

```js
const fileinator = require('fileinator');
const sizeParser = require('filesize-parser');

const size = sizeParser("20mb");
const path = "./data.dat";

fileinator.writeFile(size, path)
  .on('progress', (data) => {
    console.log(`${data.bytesWritten} of ${size} written`);
  })
  .on('done', () => {
    console.log(`Complete: ${path}`);
  });
```

### API

#### `fileinator.writeFile(size, path)`

Generates a file filled with random bytes.

**Parameters:**
- `size` (number) - Size of the file in bytes. Use with `filesize-parser` for human-readable formats.
- `path` (string) - Path where the file should be created.

**Events:**
- `progress` - Emitted during file generation with `{bytesWritten, totalBytes}` data.
- `done` - Emitted when file generation is complete.

### Use Cases

- **Testing file uploads** - Generate test files of specific sizes
- **Storage testing** - Test disk space and storage limits
- **Performance testing** - Benchmark file operations with large files
- **Network testing** - Create files for upload/download speed tests
- **Development** - Generate sample data files without manual creation

## License

[MIT](https://github.com/JustinBeckwith/fileinator/blob/main/LICENSE.md)

## Questions?

Feel free to submit an issue on the [repository](https://github.com/JustinBeckwith/fileinator/issues)!
