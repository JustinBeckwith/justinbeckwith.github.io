---
slug: '2012/06/07/node-js-meet-webmatrix-2'
title: 'Node.js meet WebMatrix 2'
date: '2012-06-07'
authors:
  - justin
tags:
  - coffeescript
  - featured
  - less
  - node
  - programming
  - projects
  - sass
  - webmatrix
description: "After months of hard work by the WebMatrix team, it's exciting to introduce the release candidate of WebMatrix 2. WebMatrix 2 includes tons of new features, but today I want to give an overview of the work we've done to enable building applications with Node.js"
---

![WebMatrix 2 + Node.js = love](/img/2012/06/title-header.png)

After months of hard work by the WebMatrix team, it's exciting to introduce the release candidate of WebMatrix 2. WebMatrix 2 includes tons of new features, but today I want to give an overview of the work we've done to enable building applications with Node.js.

If you want to skip all of this and just get a download link (it's free!), [here you go](http://bit.ly/LG7gs8).

<!--truncate-->

### How far we have come

Less than a year ago, I was working at Carnegie Mellon University, trying to use Node.js with ASP.NET for real time components of our online learning environment. Running Linux inside of our customers' data centers was a non-starter, and running a production system in cygwin was even less ideal. Developing node on Windows wasn't exactly easy either - if you managed to get node running, getting NPM to work was near impossible. Using node in an environment favorable to Windows was more than an up hill battle.

In the last 12 months since I've joined Microsoft, we've seen various partnerships between Joyent and Microsoft, resulting in new releases of node and npm to support Windows, and a [commitment to Node on Windows Azure](https://www.windowsazure.com/en-us/develop/nodejs/). We've worked together to build a better experience for developers, IT administrators, and ultimately, the users who use our systems.

One of the results of that work is a vastly improved experience for building applications with Node.js on Windows Azure. Glenn Block on the SDK team has done a [fabulous write up](http://codebetter.com/glennblock/2012/06/07/windowsazure-just-got-a-lot-friendlier-to-node-js-developers/) on the ways Microsoft is making Azure a great place for Node.js developers. As our favorite VP Scott Guthrie says on his blog, [meet the new Windows Azure](http://weblogs.asp.net/scottgu/archive/2012/06/07/meet-the-new-windows-azure.aspx).

### Enter WebMatrix 2

Today, getting started with node.js is a relatively simple task. You install node, npm (which is now bundled with the node installers), and get started with your favorite text editor. There are infinite possibilities, and limitless configurations for managing projects, compiling CoffeeScript & LESS, configuring your production settings, and deploying your apps. WebMatrix 2 sets out to provide another way to build node.js apps: everything you need to build great apps is one place.

![Welcome to WebMatrix](/img/2012/06/splash.png)

WebMatrix 2 is first and foremost designed for building web applications. From the start screen, you can create applications using pre-built templates, or install common open source applications from the Web Gallery. The current set of templates support creating applications with [Node.js](http://nodejs.org/), [PHP](http://php.net/), and (of course) [ASP.NET Web Pages](http://www.asp.net/web-pages). Out of the box, WebMatrix 2 includes three templates for Node.js:

- Empty Node.js Site
- Express Site
- Express Starter Site

The empty site provides a very basic example of using an http server - the same sample that's available on [nodejs.org](http://nodejs.org). The Express Site is a basic application generated using the scaffolding tool in the Node.js framework [express](http://expressjs.com/). The Node Starter Site is where things start to get interesting. This boilerplate is [hosted on GitHub](https://github.com/MicrosoftWebMatrix/ExpressStarter), and shows how to implement sites that include parent/child layouts with jade, LESS css, logins with Twitter and Facebook, mobile layouts, and captcha. When you create a new application using any of these templates, WebMatrix 2 is going to ensure node, npm, and IISNode are installed on your system. If not, it will automatically install any missing dependencies. This feature is also particularly useful if you are building PHP/MySQL applications on Windows.

![WebMatrix installs node, npm, and iisnode](/img/2012/06/dependencies.png)

The end result of the Node Starter Site is a fully functional application that includes Express, Jade, LESS, chat with socket.io, logins with EveryAuth, and mobile support with jQuery Mobile:

![The node starter template](/img/2012/06/template.png)

### IntelliSense for Node.js

One of the goals of WebMatrix 2 is reduce the barrier of entry for developers getting started with Node.js. One of the ways to do that is to provide IntelliSense for the core modules on which all applications are built. The documentation we use is actually built from the docs on the [node.js docs site](http://nodejs.org/api/).

![WebMatrix provides IntelliSense that makes it easier to get started](/img/2012/06/moduleIntelliSense.png)

In addition to providing IntelliSense for core Node.js modules, WebMatrix 2 also provides code completion for your own JavaScript code, and third party modules installed through NPM. There are infinite ways to build your application, and the NPM gallery recently [surpassed 10,000 entries](https://twitter.com/JavaScriptDaily/status/203878468205817857). As developers start building more complex applications, it can be difficult (or even intimidating) to get started. WebMatrix 2 is making it easier to deal with open source packages:

![Use third party modules with code completion](/img/2012/06/thirdpartyintellisense.png)

### Support for Jade & EJS

To build a truly useful tool for building Node.js web applications, we decided to provide first class editors for [Jade](http://jade-lang.com/) and [EJS](http://embeddedjs.com/). WebMatrix 2 provides syntax highlighting, HTML validation, code outlining, and auto-completion for Jade and EJS.

![WebMatrix has syntax highlighting for Jade](/img/2012/06/jade.png)

If you're into the whole angle bracket thing, the experience in EJS even better, since it's based off of our advanced HTML editor:

![WebMatrix has IntelliSense for EJS](/img/2012/06/ejs.png)

### The best LESS editor on the planet

So I'll admit it - I'm a bit of a CSS pre-processor geek. I don't write CSS because I love it, but because I need to get stuff done, and I want to write as little of it as possible. Tools like [LESS](http://lesscss.org/) and [Sass](http://sass-lang.com/) provide missing features for programmers in CSS like variables, mixins, nesting, and built in common functions.

![Write LESS with validation, formatting, and IntelliSense](/img/2012/06/less.png)

The LESS editor in WebMatrix not only provides syntax highlighting, but also provides LESS specific validation, IntelliSense for variables and mixins, and LESS specific formatting. Most node developers are going to process their LESS on the server using the npm module, but if you want to compile LESS locally, you can use the [Orange Bits compiler](http://extensions.webmatrix.com/packages/OrangeBits/) to compile your CSS at design time.

![WebMatrix provides syntax highlighting for Sass](/img/2012/06/sass.png)

### CoffeeScript Editor

In the same way LESS and Sass make it easier to write CSS, [CoffeeScript](http://coffeescript.org/) simplifies the way you write JavaScript. WebMatrix 2 provides syntax highlighting, code outlining, and completion that simplifies the editing experience. If you want to use CoffeeScript without compiling it on the server, you can use the [Orange Bits compiler](http://extensions.webmatrix.com/packages/OrangeBits/) to compile your CoffeeScript into JavaScript at design time.

![WebMatrix and CoffeeScript](/img/2012/06/coffeescript.png)

### Mobile Emulators

Designing applications for mobile can't be an afterthought. WebMatrix 2 is trying to make this easier in a couple of ways. First - the visual templates (in this case the Node Starter Template) is designed taking advantage of responsive layouts in the main StyleSheet:

- [styles.less](https://github.com/MicrosoftWebMatrix/ExpressStarter/blob/master/public/stylesheets/style.less)

This is great if you don't need to change the content of your site, but is lacking for more complex scenarios. To get around that, the node starter template uses a piece of connect middleware to detect if the user is coming from a mobile device, and sends them to a mobile layout based on jQuery Mobile (more on this in another post). For individual views, there is a convention based system that allows you to create `[viewName]_mobile.jade` views which are only loaded on mobile devices.

It gets even better. What if you need to see what your site will look like in various browsers and mobile devices? WebMatrix 2 provides an extensibility model that allows you to add mobile and desktop browsers to the run menu:

![WebMatrix shows all of the browsers and emulators on your system](/img/2012/06/emulators.png)

Today, we offer a Windows Phone emulator, and iPhone / iPad simulators. In the future we're looking for people to build support for other emulators _coughs_ android _coughs_, and even build bridges to online browser testing applications:

![Test your websites on the iPhone simulator](/img/2012/06/iphone.png)

### Extensions & Open Source

A code editing tool is only as valuable as the developers that commit to the platform. We want to achieve success with everyone, and grow together. As part of that goal, we've opened up an extensibility model that allows developers to build custom extensions and share them with other developers. The extension gallery is available online (more on this to come) at [http://extensions.webmatrix.com](http://extensions.webmatrix.com). We're planning to move a bunch of these extensions into GitHub, and the NodePowerTools extension is the first one to go open source:

- [Node Power Tools](https://github.com/MicrosoftWebMatrix/NodePowerTools)
- [OrangeBits Compiler](https://github.com/JustinBeckwith/OrangeBits)

In the coming months you'll start to see more extensions from Microsoft, and more open source.

![Build extensions and share them on the extension gallery](/img/2012/06/extension-gallery.png)

### Everyone worked together

I want to make sure I thank everyone who helped make this release happen, including the WebMatrix team, Glenn Block, Claudio Caldato, our Node Advisory board, Isaac Schlueter, and everyone at Joyent. For more information, please visit:

- [WebMatrix on Microsoft.com](http://bit.ly/LG7gs8)
- [WebMatrix on Twitter](https://twitter.com/#!/webmatrix)
- [WebMatrix on GitHub](https://github.com/MicrosoftWebMatrix)
- [WebMatrix on UserVoice](http://webmatrix.uservoice.com)
- [WebMatrix and Node on Microsoft.com](http://www.microsoft.com/web/post/how-to-use-the-nodejs-starter-template-in-webmatrix)
- [Windows Azure just got a lot friendlier to node.js developers](http://codebetter.com/glennblock/2012/06/07/windowsazure-just-got-a-lot-friendlier-to-node-js-developers/)
- [Vishal Joshi's blog post](http://vishaljoshi.blogspot.com/2012/06/announcing-webmatrix-2-rc.html)

#### Enjoy
