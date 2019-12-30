---
layout: post
title: To lock or not to lock
tags:
- node.js
status: publish
category: node.js
type: post
published: true
---

![Package Lock Files](/images/2019/lock.png)

A few years ago, [npm](https://npmjs.org) introduced the notion of a [`package-lock.json`](https://docs.npmjs.com/files/package-lock.json). The purpose of the file is to provide a manifest that calls out the exact version of every package in your tree, the last time `npm install` was run.  After running `npm install`, you're going to see a message like this:

<pre><code>npm notice created a lockfile as package-lock.json. You should commit this file.
</code></pre>

While this advice is well intentioned...  it's not always true :) Let's talk about when you want to check this into source control, and when not to.

## How package-lock.json works

The mechanics of `package-lock.json` are simple enough:
- When you run `npm install` the first time, npm automatically creates the file for you.
- It has the exact version of every top level and transitive dependency in your `node_modules` folder.
- When you update the version of a package in your `package.json` and run `npm install`, the `package-lock.json` file will get updated automatically.

If you peek inside one of these files, you're going to get a bunch of non-human-readable gobbledygook like this:

<pre><code class="language-js">
{
  "name": "@google-cloud/bigtable",
  "version": "2.3.0",
  "lockfileVersion": 1,
  "requires": true,
  "dependencies": {
    "@babel/code-frame": {
      "version": "7.5.5",
      "resolved": "https://registry.npmjs.org/@babel/code-frame/-/code-frame-7.5.5.tgz",
      "integrity": "sha512-27d4lZoomVyo51VegxI20xZPuSHusqbQag/ztrBC7wegWoQ1nLREPVSKSW8byhTlzTKyNE4ifaTA6lCp7JjpFw==",
      "dev": true,
      "requires": {
        "@babel/highlight": "^7.0.0"
      }
    },
  ...
</code></pre>

The next time you run `npm install`, you're (likely) going to get the exact copy of dependencies outlined in the `package-lock.json` file, instead of going through the module resolution dance from the contents of `package.json`.

## Why lock files sound great
In a world where lock files do not exist - running `npm install` is largely [non-idempotent](https://en.wikipedia.org/wiki/Idempotence).  This means that I can run `npm install` twice, and the results in the `node_modules` folder can be wildly different.  Stop me if you've seen this happen before:
- *I just wrote some code locally, and everything works*
- *I go ahead and `git push` my changes.  For some reason CI is breaking!?*
- *It's a lint error... it looks like `prettier` is failing on some formatting change*.

This can happen because **the version of `prettier` you're using locally can be different than the version of `prettier` you're getting in CI**.  This is one of the critical problems package lock files can solve - the version you're getting on your computer, and on CI are (mostly) going to be the same.

Having an exact record of the full transitive dependency tree can be great for a few reasons:
- Every environment is (mostly) guaranteed to install the same set of dependencies when running `npm install`
- `npm install` typically runs faster because some resolution steps can be skipped
- There is a log in source control of the exact tree used to run your code and tests

This all sounds great, but guess what ... *I don't use them, and if you're building libraries, you probably shouldn't use them either*.

## Why lock files are not great
While lock files _sound_ great, they come with some real baggage ranging from cosmetically annoying, to outright poor software practices.  For context - my team at Google builds npm modules that other developers use to make their applications.  In the context of a library, it does not make sense to use lock files (more on the end application use case later). **We've broken far more customers specifically _because of our lock file usage_, and decided to start ignorning them across the ~80 or so npm modules we ship.**

### Generated files don't belong in git
The first reason I don't like lock files is largely cosmetic.  *I generally don't like generated files to be tracked in source control*.  I personally don't like this for a few reasons:
- They create terrible merge conflicts
- They make code reviews more difficult
- Things like lock file maintenance PRs muddy commit history

When dealing with PRs and trying to keep them up to date I just find the ergonomics... clunky.

### You're not testing reality
Way more importantly - **lock files provide false comfort**.  The lock file you check into source control has no material impact on the module that developers will install.  `package-lock.json` is not packaged into your module, and is not delivered to developers when they `npm install` your module.  It is *only* used during local `npm install` for developer machines, and in CI.

In other words - The transitive dependencies that are defined in `package-lock.json` may not at all reflect what developers see when they run `npm install`.  The transitive dependencies you test against in CI may not at all reflect what developers are seeing.  You are probably testing against an entirely different set of dependencies than the ones developers will see.

Can you see how that's a big problem?  Here's how it happens:
1. You have a dependency on `"baby-yoda": "^1.0.0"` in your `package.json`
2. `baby-yoda@1.0.0` takes a dependency on `green-lizard@1.0.0`
3. You run `npm install` - at this point in time, `green-lizard` has it's [dist-tag](https://docs.npmjs.com/cli/dist-tag) set to `1.0.0`, and that gets written into your `package-lock.json`
4. Your code, including the lock file, get checked into `git`

So let's stop, and take a breath.  You installed the module `baby-yoda`, and you got a lock file that includes both `baby-yoda@1.0.0` and `green-lizard@1.0.0`.  All is going well!  Let's say a few weeks pass...

5. Somewhere over the last few weeks, `green-lizard` version `1.0.1` is released.  It has a subtle breaking change that the authors missed (we ain't perfect).
6. Your nightly tests run, PRs are submited, and CI never notices there's a problem with `green-lizard@1.0.1`.  That's because you have `green-lizard@1.0.0` in your `package-lock.json`, protecting you.
7. Consumers of your module are broken.  They're reporting errors related to the latest version of `green-lizard`, but you can't see the problem.
8. You delete your `package-lock.json`, run `npm install`, and all of the sudden you can reproduce the error.

We've seen this dance play out several times. We want our nightly (and presubmit) CI to test against the same set of dependencies consumers of our libraries are going to see - and lock files make that impossible.

## When to use them, and when not to
Lock files shine when you're building *user facing applications*. If you're building a web application, or command line tool (that isn't `npm install`-ed), lock files protect you from the ever-changing set of transitive dependencies that make up your application.  If your binary is packaging the `node_modules` folder along with your build, using a lock file is great.  If you're building an npm module that you expect others to `npm install` - they aren't consumed by downstream users, and create more problems than they solve (in my opinion).

## Some think differently, and that's great!
There are no "right" answers here.  I don't speak for every engineer working on node.js at Google :) Others like lock files, and believe the positives outweight the negatives.  I'd love to know what you think! If you want to chat lock files, let me know at [@JustinBeckwith](https://twitter.com/JustinBeckwith)!
