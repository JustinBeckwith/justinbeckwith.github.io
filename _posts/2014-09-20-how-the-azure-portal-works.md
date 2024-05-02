---
layout: post
title: Under the hood of the new Azure Portal
tags:
  - featured
  - azure
  - typescript
  - portal
status: publish
category: azure
type: post
published: true
featuredImage: "/images/2014/how-the-azure-portal-works/portalfeature.png"
excerpt: >
  For the last year and a half, I've been part of the team that's building the new Azure portal - and it's been quite an experience. A lot has been said about the end to end experience, the integration of Visual Studio Online, and even some of the new services that have been released lately. All of that's awesome, but it's not what I want to talk about today.  As much as those things are great (and I mean, who doesn't like the design), the real interesting piece is the underlying architecture. Let's take a look under the hood of the new Azure portal.
---

![Damn, we look good.](/images/2014/how-the-azure-portal-works/portal.png)

So - I haven't been doing much blogging or speaking on WebMatrix or node recently. For the last year and a half, I've been part of the team that's building the new [Azure portal](http://portal.azure.com) - and it's been quite an experience. A lot has been said about the [end to end experience](http://channel9.msdn.com/Blogs/Windows-Azure/Azure-Preview-portal), the [integration of Visual Studio Online](http://blogs.msdn.com/b/bharry/archive/2014/04/03/visual-studio-online-integration-in-the-azure-portal.aspx), and even some of the [new services that have been released lately](http://weblogs.asp.net/scottgu/azure-new-documentdb-nosql-service-new-search-service-new-sql-alwayson-vm-template-and-more). All of that's awesome, but it's not what I want to talk about today. As much as those things are great (and I mean, who doesn't like the design), the real interesting piece is the underlying architecture. Let's take a look under the hood of the new Azure portal.

### A little history

To understand how the new portal works, you need to know a little about the [current management portal](http://manage.windowsazure.com). When the current portal was started, there were only a handful of services in Azure. Off of the top of my head, I think they were:

- Cloud Services
- Web sites
- Storage
- Cache
- CDN

Out of the gate - this was pretty easy to manage. Most of those teams were all in the same organization at Microsoft, so coordinating releases was feasible. The portal team was a single group that was responsible for delivering the majority of the UI. There was little need to hand off responsibility to the individual experiences to the teams which wrote the services, as it was easier to keep everything in house. There is a single ASP.NET MVC application, which contains all of the CSS, JavaScript, and shared widgets used throughout the app.

![The current Azure portal, in all of it's blue glory](/images/2014/how-the-azure-portal-works/vcurrent.png)

The team shipped every 3 weeks, tightly coordinating the schedule with each service team. It works ... pretty much as one would expect a web application to work.

**_And then everything went crazy._**

As we started ramping up the number of services in Azure, it became infeasible for one team to write all of the UI. The teams which owned the service were now responsible (mostly) for writing their own UI, inside of the portal source repository. This had the benefit of allowing individual teams to control their own destiny. However - it now mean that we had hundreds of developers all writing code in the same repository. A change made to the SQL Server management experience could break the Azure Web Sites experience. A change to a CSS file by a developer working on virtual machines could break the experience in storage. Coordinating the 3 week ship schedule became really hard. The team was tracking dependencies across multiple organizations, the underlying REST APIs that powered the experiences, and the release cadence of ~40 teams across the company that were delivering cloud services.

### Scaling to &infin; services

Given the difficulties of the engineering and ship processes with the current portal, scaling to 200 different services didn't seem like a great idea with the current infrastructure. The next time around, we took a different approach.

The new portal is designed like an operating system. It provides a set of UI widgets, a navigation framework, data management APIs, and other various services one would expect to find with any UI framework. The portal team is responsible for building the operating system (or the shell, as we like to call it), and for the overall health of the portal.

#### Sandboxing in the browser

To claim we're an OS, we had to build a sandboxing model. One badly behaving application shouldn't have the ability to bring down the whole OS. In addition to that - an application shouldn't be able to grab data from another, unless by an approved mechanism. JavaScript by default doesn't really lend itself well to this kind of isolation - most web developers are used to picking up something like jQuery, and directly working against the DOM. This wasn't going to work if we wanted to protect the OS against badly behaving (or even malicious) code.

To get around this, each new service in Azure builds what we call an 'extension'. It's pretty much an application to our operating system. It runs in isolation, inside of an IFRAME. When the portal loads, we inject some bootstrapping scripts into each IFRAME at runtime. Those scripts provide the structured API extensions use to communicate with the shell. This API includes things like:

- Defining parts, blades, and commands
- Customizing the UI of parts
- Binding data into UI elements
- Sending notifications

The most important aspect is that the extension developer doesn't get to run arbitrary JavaScript in the portal's window. They can only run script in their IFRAME - which does not project UI. If an extension starts to fault - we can shut it down before it damages the broader system. We spent some time looking into web workers - but found some reliability problems when using > 20 of them at the same time. We'll probably end up back there at some point.

#### Distributed continuous deployment

In this model, each extension is essentially it's own web application. Each service hosts their own extension, which is pulled into the shell at runtime. The various UI services of Azure aren't composed until they are loaded in the browser. This lets us do some really cool stuff. At any given point, a separate experience in the portal (for example, Azure Websites) can choose to deploy an extension that affects only their UI - completely independent of the rest of the portal.

**_IFRAMEs are not used to render the UI - that's all done in the core frame. The IFRAME is only used to automate the JavaScript APIs that communicate over window.postMessage()._**

![Each extension is loaded into the shell at runtime from their own back end](/images/2014/how-the-azure-portal-works/extensions.png)

This architecture allows us to scale to &infin; deployments in a given day. If the media services team wants to roll out a new feature on a Tuesday, but the storage team isn't ready with updates they're planning - that's fine. They can each deploy their own changes as needed, without affecting the rest of the portal.

### Stuff we're using

Once you start poking around, you'll notice the portal is big single page application. That came with a lot of challenges - here are some of the technologies we're using to solve them.

#### TypeScript

Like any single page app, the portal runs a lot of JavaScript. We have a ton of APIs that run internal to the shell, and APIs that are exposed for extension authors across Microsoft. To support our enormous codebase, and the many teams using our SDK to build portal experiences, we chose to use [TypeScript](http://www.typescriptlang.org/).

- **TypeScript compiles into JavaScript.** There's no runtime VM, or plug-ins required.
- **The tooling is awesome.** Visual Studio gives us (and partner teams) IntelliSense and compile time validation.
- **Generating interfaces for partners is really easy.** We distribute d.ts files which partners use to program against our APIs.
- **There's great integration for using AMD module loading.** This is critical to us for productivity and performance reasons. (more on this in another post).
- **JavaScript is valid TypeScript - so the learning curve isn't so high.** The syntax is also largely forward looking to ES6, so we're actually getting a jump on some new concepts.

#### Less

Visually, there's a lot going on inside of the portal. To help organize our CSS, and promote usability, we've adopted [{LESS}](http://lesscss.org/). Less does a couple of cool things for us:

- **We can create variables for colors.** We have a pre-defined color palette - less makes it easy to define those up front, and re-use the same colors throughout our style sheets.
- **The tooling is awesome.** Similar to TypeScript, Visual Studio has great Less support with full IntelliSense and validation.
- **It made theming easier.**

![The dark theme of the portal was much easier to make using less](/images/2014/how-the-azure-portal-works/portaldark.png)

#### Knockout

With the new design, we were really going for a 'live tile' feel. As new websites are added, or new log entries are available, we wanted to make sure it was easy for developers to update that information. Given that goal, along with the quirks of our design (extension authors can't write JavaScript that runs in the main window), [Knockout](http://knockoutjs.com/) turned out to be a fine choice. There are a few reasons we love Knockout:

- **Automatic refreshing of the UI** - The data binding aspect of Knockout is pretty incredible. We make changes to underlying model objects in TypeScript, and the UI is updated for us.
- **The tooling is great.** This is starting to be a recurring theme :) Visual Studio has some great tooling for Knockout data binding expressions (thanks [Mads](http://madskristensen.net/)).
- **The binding syntax is pure** - We're not stuck putting invalid HTML in our code to support the specifics of the binding library. Everything is driven off of data-\* attributes.

I'm sure there are 100 other reasons our dev team could come up with on why we love Knockout. Especially the ineffable [Steve Sanderson](http://blog.stevensanderson.com/), who joined our dev team to work on the project. He even gave an awesome talk on the subject at NDC:

<!-- markdownlint-disable-next-line -->
<div class='embed-container'>
<!-- markdownlint-disable-next-line -->
<iframe title="Steve Sanderson - Architecting large Single Page Applications with Knockout.js" style="margin-left: auto; margin-right: auto" src="//player.vimeo.com/video/97519516" width="100%" height="400" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe> <a href="http://vimeo.com/97519516">Steve Sanderson - Architecting large Single Page Applications with Knockout.js</a> from <a href="http://vimeo.com/ndcoslo">NDC Conferences</a> on <a href="https://vimeo.com">Vimeo</a>.
</div>

### What's next

I'm really excited about the future of the portal. Since our first release at //build, we've been working on new features, and responding to a lot of the [customer feedback](http://feedback.azure.com/forums/223579-azure-preview-portal). Either way - we really want to know what you think.
