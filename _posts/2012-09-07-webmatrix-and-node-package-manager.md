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

<img src="/images/2012/09/node_128.png" alt="NPM and WebMatrix"  />

A few months ago, we introduced the new <a href="http://jbeckwith.com/2012/06/07/node-js-meet-webmatrix-2/" target="_blank">node.js features we've added to WebMatrix 2</a>.  One of the missing pieces from that experience was a way to manage <a href="https://npmjs.org/" target="_blank">NPM</a> (Node Package Manager) from within the IDE.

This week we shipped the final release of WebMatrix 2, and one of the fun things that comes with it is a new extension for managing NPM.  For a more complete overview of the WebMatrix 2, check out <a href="http://vishaljoshi.blogspot.com/2012/06/announcing-webmatrix-2-rc.html" target="_blank">Vishal Joshi's blog post</a>.

If you want to skip all of this and just download the bits, here you go:
<p><a href="http://go.microsoft.com/?linkid=9809776" target="_blank"><img style="display: inline" title="image" alt="image" src="http://lh5.ggpht.com/-lm1GuUL20p8/T9HReoCZk7I/AAAAAAAABU4/uO7oVvNCGPQ/image%25255B4%25255D.png?imgmax=800" width="170" height="45"></a></p>



### Installing the Extension

The NPM extension can be installed using the extension gallery inside of WebMatrix.  To get started, go ahead and create a new node site with express using the built in template:

<a href="/images/2012/09/template.png">
<img src="/images/2012/09/template.png" alt="Create a new express site"  />
</a>

After you create the site, click on the 'Extensions' button in the ribbon:

<a href="/images/2012/09/extension-gallery-icon.png">
<img src="/images/2012/09/extension-gallery-icon.png" alt="WebMatrix Extension Gallery"  />
</a>

Search for 'NPM', and click through the wizard to finish installing the extension:

<a href="/images/2012/09/npm-extension.png">
<img src="/images/2012/09/npm-extension.png" alt="Install the NPM Gallery Extension" />
</a>

Now when you navigate to the files workspace, you should see the new NPM icon in the ribbon.

### Managing Packages

While you're working with node.js sites, the icon should always show up.  To get started, click on the new icon in the ribbon:

<a href="/images/2012/09/npm-icon.png">
<img src="/images/2012/09/npm-icon.png" alt="NPM Icon in the ribbon"  />
</a>

This will load a window very similar to the other galleries in WebMatrix.  From here you can search for packages, install, uninstall, update, any of the basic tasks you're likely to do day to day with npm.

<a href="/images/2012/09/npm-dialog.png">
<img src="/images/2012/09/npm-dialog.png" alt="NPM Gallery" class="alignnone"  />
</a>

When you open up a new site, we also check your package.json to see if you're missing any dependencies:

<a href="/images/2012/09/missing-packages.png">
<img src="/images/2012/09/missing-packages.png" alt="Missing NPM packages"  />
</a>

We're just getting started with the node tools inside of WebMatrix, so if you have anything else you would like to see added please hit us up over at <a href="https://webmatrix.uservoice.com" target="_blank">UserVoice</a>.

### More Information
If you would like some more information to help you get started, check out some of these links:

<ul>
<li><a href="http://bit.ly/LG7gs8" target="_blank">WebMatrix on Microsoft.com</a></li>
<li><a href="https://twitter.com/#!/webmatrix" target="_blank">WebMatrix on Twitter</a></li>
<li><a href="https://github.com/MicrosoftWebMatrix" target="_blank">WebMatrix on GitHub</a></li>
<li><a href="http://webmatrix.uservoice.com" target="_blank">WebMatrix on UserVoice</a></li>
<li><a href="http://www.microsoft.com/Web/webmatrix/optimize.aspx" target="_blank">WebMatrix and Open Source Applications</a></li>
<li><a href="http://vishaljoshi.blogspot.com/2012/06/announcing-webmatrix-2-rc.html" target="_blank">Vishal Joshi's blog post</a></li>
</ul>
<br />
<br />
#### Happy Coding!
