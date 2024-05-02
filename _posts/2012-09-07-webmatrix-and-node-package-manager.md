---
layout: post
title: WebMatrix and Node Package Manager
category: WebMatrix
tags:
  - node
  - Programming
  - WebMatrix
status: publish
type: post
published: true
excerpt: >
  A few months ago, we introduced the new node.js features we've added to WebMatrix 2. One of the missing pieces from that experience was a way to manage npm (Node Package Manager) from within the IDE. This week we shipped the final release of WebMatrix 2, and one of the fun things that comes with it is a new extension for managing npm.
---

![NPM and WebMatrix](/images/2012/09/node_128.png)

A few months ago, we introduced the new [node.js features we've added to WebMatrix 2](http://jbeckwith.com/2012/06/07/node-js-meet-webmatrix-2/). One of the missing pieces from that experience was a way to manage [NPM](https://npmjs.org/) (Node Package Manager) from within the IDE.

This week we shipped the final release of WebMatrix 2, and one of the fun things that comes with it is a new extension for managing NPM. For a more complete overview of the WebMatrix 2, check out [Vishal Joshi's blog post](http://vishaljoshi.blogspot.com/2012/06/announcing-webmatrix-2-rc.html).

If you want to skip all of this and just download the bits, here you go:

[![image](http://lh5.ggpht.com/-lm1GuUL20p8/T9HReoCZk7I/AAAAAAAABU4/uO7oVvNCGPQ/image%25255B4%25255D.png?imgmax=800 "image")](http://go.microsoft.com/?linkid=9809776)

### Installing the Extension

The NPM extension can be installed using the extension gallery inside of WebMatrix. To get started, go ahead and create a new node site with express using the built in template:

![Create a new express site](/images/2012/09/template.png)

After you create the site, click on the 'Extensions' button in the ribbon:

![WebMatrix Extension Gallery](/images/2012/09/extension-gallery-icon.png)

Search for 'NPM', and click through the wizard to finish installing the extension:

![Install the NPM Gallery Extension](/images/2012/09/npm-extension.png)

Now when you navigate to the files workspace, you should see the new NPM icon in the ribbon.

### Managing Packages

While you're working with node.js sites, the icon should always show up. To get started, click on the new icon in the ribbon:

![NPM Icon in the ribbon](/images/2012/09/npm-icon.png)

This will load a window very similar to the other galleries in WebMatrix. From here you can search for packages, install, uninstall, update, any of the basic tasks you're likely to do day to day with npm.

![NPM Gallery](/images/2012/09/npm-dialog.png)

When you open up a new site, we also check your package.json to see if you're missing any dependencies:

![Missing NPM packages](/images/2012/09/missing-packages.png)

We're just getting started with the node tools inside of WebMatrix, so if you have anything else you would like to see added please hit us up over at [UserVoice](https://webmatrix.uservoice.com).

### More Information

If you would like some more information to help you get started, check out some of these links:

- [WebMatrix on Microsoft.com](http://bit.ly/LG7gs8)
- [WebMatrix on Twitter](https://twitter.com/#!/webmatrix)
- [WebMatrix on GitHub](https://github.com/MicrosoftWebMatrix)
- [WebMatrix on UserVoice](http://webmatrix.uservoice.com)
- [WebMatrix and Open Source Applications](http://www.microsoft.com/Web/webmatrix/optimize.aspx)
- [Vishal Joshi's blog post](http://vishaljoshi.blogspot.com/2012/06/announcing-webmatrix-2-rc.html)

#### Happy Coding
