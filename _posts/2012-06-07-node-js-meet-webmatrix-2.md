---
layout: post
title: Node.js meet WebMatrix 2
category: WebMatrix
tags:
- CoffeeScript
- featured
- less
- node
- Programming
- Projects
- sass
- WebMatrix
status: publish
type: post
published: true
excerpt: >
  After months of hard work by the WebMatrix team, it's exciting to introduce the release candidate of WebMatrix 2.  WebMatrix 2 includes tons of new features, but today I want to give an overview of the work we've done to enable building applications with Node.js
---

<img src="/images/2012/06/title-header.png" alt="WebMatrix 2 + Node.js = love" />

After months of hard work by the WebMatrix team, it's exciting to introduce the release candidate of WebMatrix 2.  WebMatrix 2 includes tons of new features, but today I want to give an overview of the work we've done to enable building applications with Node.js.

If you want to skip all of this and just get a download link (it's free!), <a href="http://bit.ly/LG7gs8" target="_blank">here you go</a>.

### How far we have come
Less than a year ago, I was working at Carnegie Mellon University, trying to use Node.js with ASP.NET for real time components of our online learning environment.  Running Linux inside of our customers' data centers was a non-starter, and running a production system in cygwin was even less ideal.  Developing node on Windows wasn't exactly easy either - if you managed to get node running, getting NPM to work was near impossible.  Using node in an environment favorable to Windows was more than an up hill battle.

In the last 12 months since I've joined Microsoft, we've seen various partnerships between Joyent and Microsoft, resulting in new releases of node and npm to support Windows, and a <a href="https://www.windowsazure.com/en-us/develop/nodejs/" target="_blank">commitment to Node on Windows Azure</a>.     We've worked together to build a better experience for developers, IT administrators, and ultimately, the users who use our systems.

One of the results of that work is a vastly improved experience for building applications with Node.js on Windows Azure.  Glenn Block on the SDK team has done a <a href="http://codebetter.com/glennblock/2012/06/07/windowsazure-just-got-a-lot-friendlier-to-node-js-developers/" target="_blank">fabulous write up</a> on the ways Microsoft is making Azure a great place for Node.js developers.  As our favorite VP Scott Guthrie says on his blog, <a href="http://weblogs.asp.net/scottgu/archive/2012/06/07/meet-the-new-windows-azure.aspx" target="_blank">meet the new Windows Azure</a>.

### Enter WebMatrix 2
Today, getting started with node.js is a relatively simple task.  You install node, npm (which is now bundled with the node installers), and get started with your favorite text editor.  There are infinite possibilities, and limitless configurations for managing projects, compiling CoffeeScript & LESS, configuring your production settings, and deploying your apps.  WebMatrix 2 sets out to provide another way to build node.js apps:  everything you need to build great apps is one place.

<a href="/images/2012/06/splash.png">
<img src="/images/2012/06/splash.png" alt="Welcome to WebMatrix" />
</a>

WebMatrix 2 is first and foremost designed for building web applications.  From the start screen, you can create applications using pre-built templates, or install common open source applications from the Web Gallery.  The current set of templates support creating applications with <a href="http://nodejs.org/" target="_blank">Node.js</a>, <a href="http://php.net/" target="_blank">PHP</a>, and (of course) <a href="http://www.asp.net/web-pages" target="_blank">ASP.NET Web Pages</a>.  Out of the box, WebMatrix 2 includes three templates for Node.js:

- Empty Node.js Site
- Express Site
- Express Starter Site

The empty site provides a very basic example of using an http server - the same sample that's available on <a href="http://nodejs.org" target="_blank">nodejs.org</a>.  The Express Site is a basic application generated using the scaffolding tool in the Node.js framework <a href="http://expressjs.com/" target="_blank">express</a>.  The Node Starter Site is where things start to get interesting.  This boilerplate is <a href="https://github.com/MicrosoftWebMatrix/ExpressStarter" target="_blank">hosted on GitHub</a>, and shows how to implement sites that include parent/child layouts with jade, LESS css, logins with Twitter and Facebook, mobile layouts, and captcha.   When you create a new application using any of these templates, WebMatrix 2 is going to ensure node, npm, and IISNode are installed on your system.  If not, it will automatically install any missing dependencies.  This feature is also particularly useful if you are building PHP/MySQL applications on Windows.

<a href="/images/2012/06/dependencies.png">
<img src="/images/2012/06/dependencies.png" alt="WebMatrix installs node, npm, and iisnode"   />
</a>

The end result of the Node Starter Site is a fully functional application that includes Express, Jade, LESS, chat with socket.io, logins with EveryAuth, and mobile support with jQuery Mobile:

<a href="/images/2012/06/template.png">
<img src="/images/2012/06/template.png" alt="The node starter template"   />
</a>

### IntelliSense for Node.js
One of the goals of WebMatrix 2 is reduce the barrier of entry for developers getting started with Node.js.  One of the ways to do that is to provide IntelliSense for the core modules on which all applications are built.  The documentation we use is actually built from the docs on the <a href="http://nodejs.org/api/" target="_blank">node.js docs site</a>.

<a href="/images/2012/06/moduleIntelliSense.png">
<img src="/images/2012/06/moduleIntelliSense.png" alt="WebMatrix provides IntelliSense that makes it easier to get started"  />
</a>

In addition to providing IntelliSense for core Node.js modules, WebMatrix 2 also provides code completion for your own JavaScript code, and third party modules installed through NPM.  There are infinite ways to build your application, and the NPM gallery recently <a href="https://twitter.com/JavaScriptDaily/status/203878468205817857" target="_blank">surpassed 10,000 entries</a>.    As developers start building more complex applications, it can be difficult (or even intimidating) to get started.  WebMatrix 2 is making it easier to deal with open source packages:

<a href="/images/2012/06/thirdpartyintellisense.png">
<img src="/images/2012/06/thirdpartyintellisense.png" alt="Use third party modules with code completion"   />
</a>

### Support for Jade & EJS
To build a truly useful tool for building Node.js web applications, we decided to provide first class editors for <a href="http://jade-lang.com/" target="_blank">Jade</a> and <a href="http://embeddedjs.com/" target="_blank">EJS</a>.  WebMatrix 2 provides syntax highlighting, HTML validation, code outlining, and auto-completion for Jade and EJS.

<a href="/images/2012/06/jade.png">
<img src="/images/2012/06/jade.png" alt="WebMatrix has syntax highlighting for Jade"   />
</a>

If you're into the whole angle bracket thing, the experience in EJS even better, since it's based off of our advanced HTML editor:

<a href="/images/2012/06/moduleIntelliSense.png">
<img src="/images/2012/06/ejs.png" alt="WebMatrix has IntelliSense for EJS"   />
</a>

<h3>The best {LESS} editor on the planet</h3>
<p>So I'll admit it - I'm a bit of a CSS pre-processor geek.  I don't write CSS because I love it, but because I need to get stuff done, and I want to write as little of it as possible.  Tools like <a href="http://lesscss.org/" target="_blank">LESS</a> and <a href="http://sass-lang.com/" target="_blank">Sass</a> provide missing features for programmers in CSS like variables, mixins, nesting, and built in common functions.

<a href="/images/2012/06/less.png">
<img src="/images/2012/06/less.png" alt="Write LESS with validation, formatting, and IntelliSense"   />
</a>

The LESS editor in WebMatrix not only provides syntax highlighting, but also provides LESS specific validation, IntelliSense for variables and mixins, and LESS specific formatting.  Most node developers are going to process their LESS on the server using the npm module, but if you want to compile LESS locally, you can use the <a href="http://extensions.webmatrix.com/packages/OrangeBits/" target="_blank">Orange Bits compiler</a> to compile your CSS at design time.

<a href="/images/2012/06/sass.png">
<img src="/images/2012/06/sass.png" alt="WebMatrix provides syntax highlighting for Sass"  />
</a>

<h3>CoffeeScript Editor</h3>
<p>
In the same way LESS and Sass make it easier to write CSS, <a href="http://coffeescript.org/" target="_blank">CoffeeScript</a> simplifies the way you write JavaScript.  WebMatrix 2 provides syntax highlighting, code outlining, and completion that simplifies the editing experience.  If you want to use CoffeeScript without compiling it on the server, you can use the <a href="http://extensions.webmatrix.com/packages/OrangeBits/" target="_blank">Orange Bits compiler</a> to compile your CoffeeScript into JavaScript at design time.
</p>
<a href="/images/2012/06/coffeescript.png">
<img src="/images/2012/06/coffeescript.png" alt="WebMatrix and CoffeeScript"   />
</a>

<h3>Mobile Emulators</h3>
<p>
Designing applications for mobile can't be an afterthought.  WebMatrix 2 is trying to make this easier in a couple of ways.  First - the visual templates (in this case the Node Starter Template) is designed taking advantage of responsive layouts in the main StyleSheet:

<ul><li><a href="https://github.com/MicrosoftWebMatrix/ExpressStarter/blob/master/public/stylesheets/style.less" target="_blank">styles.less</a></li></ul>

This is great if you don't need to change the content of your site, but is lacking for more complex scenarios.  To get around that, the node starter template uses a piece of connect middleware to detect if the user is coming from a mobile device, and sends them to a mobile layout based on jQuery Mobile (more on this in another post).  For individual views, there is a convention based system that allows you to create {viewName}_mobile.jade views which are only loaded on mobile devices.
</p>

<p>
It gets even better.  What if you need to see what your site will look like in various browsers and mobile devices?  WebMatrix 2 provides an extensibility model that allows you to add mobile and desktop browsers to the run menu:
</p>

</p>
<a href="/images/2012/06/emulators.png">
<img src="/images/2012/06/emulators.png" alt="WebMatrix shows all of the browsers and emulators on your system"  />
</a>

<p>Today, we offer a Windows Phone emulator, and iPhone / iPad simulators.  In the future we're looking for people to build support for other emulators *coughs* android *coughs*, and even build bridges to online browser testing applications:</p>

<a href="/images/2012/06/iphone.png">
<img src="/images/2012/06/iphone.png" alt="Test your websites on the iPhone simulator"   />
</a>

<h3>Extensions & Open Source</h3>
<p>
A code editing tool is only as valuable as the developers that commit to the platform.  We want to achieve success with everyone, and grow together.  As part of that goal, we've opened up an extensibility model that allows developers to build custom extensions and share them with other developers.  The extension gallery is available online (more on this to come) at <a href="http://extensions.webmatrix.com" target="_blank">http://extensions.webmatrix.com</a>.  We're planning to move a bunch of these extensions into GitHub, and the NodePowerTools extension is the first one to go open source:

<ul>
<li><a href="https://github.com/MicrosoftWebMatrix/NodePowerTools" target="_blank">Node Power Tools</a></li>
<li><a href="https://github.com/JustinBeckwith/OrangeBits" target="_blank">OrangeBits Compiler</a></li>
</ul>

In the coming months you'll start to see more extensions from Microsoft, and more open source.
</p>

<a href="/images/2012/06/extension-gallery.png">
<img src="/images/2012/06/extension-gallery.png" alt="Build extensions and share them on the extension gallery"   />
</a>

<h3>Everyone worked together</h3>
I want to make sure I thank everyone who helped make this release happen, including the WebMatrix team, Glenn Block, Claudio Caldato, our Node Advisory board, Isaac Schlueter, and everyone at Joyent.  For more information, please visit:

<ul>
<li><a href="http://bit.ly/LG7gs8" target="_blank">WebMatrix on Microsoft.com</a></li>
<li><a href="https://twitter.com/#!/webmatrix" target="_blank">WebMatrix on Twitter</a></li>
<li><a href="https://github.com/MicrosoftWebMatrix" target="_blank">WebMatrix on GitHub</a></li>
<li><a href="http://webmatrix.uservoice.com" target="_blank">WebMatrix on UserVoice</a></li>
<li><a href="http://www.microsoft.com/web/post/how-to-use-the-nodejs-starter-template-in-webmatrix" target="_blank">WebMatrix and Node on Microsoft.com</a></li>
<li><a href="http://codebetter.com/glennblock/2012/06/07/windowsazure-just-got-a-lot-friendlier-to-node-js-developers/" target="_blank">Windows Azure just got a lot friendlier to node.js developers</a></li>
<li><a href="http://vishaljoshi.blogspot.com/2012/06/announcing-webmatrix-2-rc.html" target="_blank">Vishal Joshi's blog post</a></li>
</ul>
<br />
<br />
<h4>Enjoy!</h4>
