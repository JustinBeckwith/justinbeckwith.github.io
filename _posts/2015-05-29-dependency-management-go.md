---
layout: post
title: Dependency management and Go
tags:
- Go
status: publish
category: Golang
type: post
published: true
featuredImage: "/images/2015/comparing-go-and-dotnet/gopher.png"
excerpt: >
    Most programming languages have a story for dependency management.  Go does as well.  Sort of.  The differences between the dependency management story of node.js | .net | ruby | python is interesting.
---

I find dependency management and package managers interesting. Each language has its own package manager, and each one has characteristics that are specific to that community.  NuGet for .NET has great tooling and Visual Studio support, since that's important to the .NET developer audience.  NPM has a super flexible model, and great command line tools.

In a lot of ways, golang is a little [quirky](https://golang.org/doc/faq#Why_doesnt_Go_have_feature_X).  And that's awesome. However - I've really struggled to wrap my head around dependency management in Go.

!["Dependency management and golang"](/images/2015/dependency-management-go/package.png)


When dealing with dependency management, I expect a few things:


#### 1. Repeatable builds

Given the same source code, I expect to be able to reproduce the same set of binaries. Every. Time. Every bit of information needed to complete a build, whether it be on my local dev box or on a build server, should be explicitly called out in my source code.  No surprises.

#### 2. Isolated environments

I am likely to be working on multiple projects at a time.  Each project may have a requirement on different compilers, and different versions of the same dependency.  At no point should changing a dependency in one project have an effect on the dependencies on a completely separate project.

#### 3. Consensus

Having a package management story is awesome.  What's even better is making sure everyone uses the same one :)  As long as developers are inventive and curious, there will always be alternatives.  But there needs to be consensus on the community accepted standard on how a package manager will work.  If 5 projects use 5 different models of dependency management, we're all out of luck.


## How node.js does it

[As I've talked about before](http://jbeckwith.com/2015/01/04/comparing-go-and-dotnet/), I like to use my experience with other languages as a way to learn about a new language (just like most people I'd assume).  Let's take a look at how NPM for node.js solves these problems.

Similar to the `go get` command, there is an `npm install` command.  It looks like this:

{% highlight console %}
npm install --save yelp
{% endhighlight %}

The big difference you'll see is `--save`.  This tells NPM to save the dependency, and the version I'm using into the `package.json` for my project:
{% highlight json %}
{
  "name": "pollster",
  "version": "2.0.0",
  "private": true,
  "scripts": {
    "start": "node server"
  },
  "dependencies": {
    "express": "~3.1.0",
    ...
    "nconf": "~0.6.7",
    "socket.io": "~0.9.13"
  }
}
{% endhighlight %}

`package.json` is stored in the top level directory of my app.  It provides my `isolation`.  If I start another project - that means another project.json, another set of dependencies.  The environments are entirely isolated.  The list of dependencies and their versions provides my `repeatability`.  Every time someone clones my repository and runs `npm install`, they will get the same list of dependencies from a centralized source.  The fact that most people use NPM provides my `consensus`.

Version pinning is accomplished using [semver](http://semver.org/).  The `~` relaxes the rules on version matching, meaning I'm ok with bringing down a different version of my dependency, as long as it is only a `PATCH` - which means no API breaking changes, only bug fixes.  If you're being super picky (on production stuff I am), you can specify a specific version minus the `~`.  For downstream dependencies (dependencies of your dependencies) you can lock those in as well using [npm-shrinkwrap](https://docs.npmjs.com/cli/shrinkwrap).  On one of my [projects](http://azure.microsoft.com/en-us/marketplace/partners/microsoft/nodejsstartersite/), I got bit by the lack of shrink-wrapping when a misbehaved package author used a wildcard import for a downstream dependency that actually broke us in production.

The typical workflow is to check in your `package.json`, and then .gitignore your `node_modules` directory that contains the actual source code of 3rd party packages.

It's all pretty awesome.



## Go out of the box

With the out of the box behavior, Go is less than ideal in repeatability, isolation, and consensus. If you follow the setup guide for golang, you'll find yourself with a single directory where you're supposed to keep all of your code.  Inside of there, you create a /src directory, and a new directory for each project you're going to work on.  When you install a dependency using `go get`, it will essentially drop the source code from that repository into  `$GOPATH/src'.  In your source code, you just tell the compiler where it needs to go to grab the latest sources:

{% highlight go %}
import "github.com/JustinBeckwith/go-yelp/yelp"
...
client := yelp.New(options)
result, err := client.DoSimpleSearch("coffee", "seattle")
{% endhighlight %}

So this is *really* bad.  The [go-yelp](https://github.com/JustinBeckwith/go-yelp) library I'm importing from github is pulled down at compile time (if not already available from a `go get` command), and built into my project.  That is pointing to the *master* branch of my github repository.  Who's to say I won't change my API tomorrow, breaking everyone who has imported the library in this way?  As a library author, I'm left with 3 options:

  1. Never make breaking changes.
  2. Make a completely new repository on GitHub for a new version of my API that has breaking changes.
  3. Make breaking changes, and assume / hope developers are using a dependency management tool.

Without using an external tool (or one of the methods I'll talk about below), there is no concept of version pinning in go.  You point towards a namespace, and that path is used to find your code during the build.  For most open source projects - the out of the box behavior is broken.

My problem is that the default workflow on a go project leads you down a path of sadness.  You start with a magical `go get` command that installs the latest and greatest version of a dependency - but doesn't ask you which specific version or hash of that dependency you should be using.  Most web developers have been conditioned to not check our dependencies into source control, if they're managed by a package manager (see: gem, NuGet, NPM, bower, etc).  The end result is that I could easily break someone else, and I can easily be broken.



## Vendoring, import rewrites, and the GOPATH

There is currently no agreed upon package manager for Go.  Recently the Go team kicked up [a great thread](https://groups.google.com/forum/#!msg/golang-dev/nMWoEAG55v8/iJGgur7W_SEJ) asking the community for their thoughts on a package management system.  There are a few high level concepts that are helpful to understand.

#### Vendoring

At Google, the source code for a dependency is copied into the source tree, and checked into source control.  This provides `repeatability`.  There is never a question on where the source is downloaded from, because it is always available in the source tree. Copying the source from a dependency into your own source is referred to as "vendoring".

#### Import rewriting

After you copy the code into your source tree, you need to change your import path to not point at the original source, but rather to point at a path in your tree.  This is called "Import rewriting".

After copying a library into your tree, instead of this:

{% highlight go %}
import "github.com/JustinBeckwith/go-yelp/yelp"
...
client := yelp.New(options)
{% endhighlight %}

you would do this:

{% highlight go %}
import "yourtree/third_party/github.com/JustinBeckwith/go-yelp/yelp"
...
client := yelp.New(options)
{% endhighlight %}


#### GOPATH rewriting

Vendoring and import rewriting provide our repeatable builds.  But what about isolation?  If project (x) relies on go-yelp#v1.0, project (y) should be able to rely on go-yelp#v2.0.  They should be isolated.  If you follow [How to write go code](https://golang.org/doc/code.html), you're led down a path of a single workspace, which is driven by `$GOPATH`. `$GOPATH` is where libraries installed via `go get` will be installed.  It controls where your own binaries are generated.  It's generally the defining variable for the root of your workspace.  If you try to run multiple projects out of the same directory - it completely blows up `isolation`.  If you want to be able to reference different versions of the same dependency, you need to change the $GOPATH variable for each current project.  The act of changing the $GOPATH environment variable when switching projects is "GOPATH rewriting".


## Package managers & tools

Given the lack of prescriptive guidance and tools on how to deal with dependency management, just a few tools have popped up. In no particular order, here are a few I found:

- [https://github.com/tools/godep](https://github.com/tools/godep)
- [https://github.com/gpmgo/gopm](https://github.com/gpmgo/gopm)
- [https://github.com/pote/gpm](https://github.com/pote/gpm)
- [https://github.com/nitrous-io/goop](https://github.com/nitrous-io/goop)
- [https://github.com/alouche/rodent](https://github.com/alouche/rodent)
- [https://github.com/jingweno/nut](https://github.com/jingweno/nut)
- [https://github.com/niemeyer/gopkg](https://github.com/niemeyer/gopkg)
- [https://github.com/mjibson/party](https://github.com/mjibson/party)
- [https://github.com/kardianos/vendor](https://github.com/kardianos/vendor)
- [https://github.com/kisielk/vendorize](https://github.com/kisielk/vendorize)
- [https://github.com/mattn/gom](https://github.com/mattn/gom)
- [https://github.com/dkulchenko/bunch](https://github.com/dkulchenko/bunch)
- [https://github.com/skelterjohn/wgo](https://github.com/skelterjohn/wgo)
- [https://github.com/Masterminds/glide](https://github.com/Masterminds/glide)
- [https://github.com/robfig/glock](https://github.com/robfig/glock)
- [https://bitbucket.org/vegansk/gobs](https://bitbucket.org/vegansk/gobs)
- [https://launchpad.net/godeps](https://launchpad.net/godeps)
- [https://github.com/d2fn/gopack](https://github.com/d2fn/gopack)
- [https://github.com/laher/gopin](https://github.com/laher/gopin)
- [https://github.com/LyricalSecurity/gigo](https://github.com/LyricalSecurity/gigo)
- [https://github.com/VividCortex/johnny-deps](https://github.com/VividCortex/johnny-deps)

Given my big 3 requirements above, I checked out the most popular of the repos above, and settled on godep.  The alternatives all fell into at least one of these traps:

- Forced rewriting the url, making it harder to manage dependency paths
- Relied on a centralized service
- Only works on a single platform
- Doesn't provide isolation in the $GOPATH



### godep

[Godep](https://github.com/tools/godep) matched most of my requirements for a package manager, and is the most popular solution in the community.  It solves the repeatability and isolation issues above.  The workflow:

Run `go get` to install a dependency (nothing new here):

{% highlight console %}
go get github.com/JustinBeckwith/go-yelp/yelp
{% endhighlight %}

When you're done installing dependencies, use the `godep save` command.  This will copy all of the referenced code imported into the project from the current $GOPATH into the ./Godeps directory in your project.  Make sure to check this into source control.

{% highlight console %}
godep save
{% endhighlight %}

It also will walk the graph of dependencies and create a `./Godeps/Godeps.json` file:

{% highlight json %}
{
	"ImportPath": "github.com/JustinBeckwith/coffee",
	"GoVersion": "go1.4.2",
	"Deps": [
		{
			"ImportPath": "github.com/JustinBeckwith/go-yelp/yelp",
			"Rev": "e0e1b550d545d9be0446ce324babcb16f09270f5"
		},
		{
			"ImportPath": "github.com/JustinBeckwith/oauth",
			"Rev": "a1577bd3870218dc30725a7cf4655e9917e3751b"
		},
    ....
{% endhighlight %}

When it's time to build, use the godep tool instead of the standard go toolchain:

{% highlight console %}
godep go build
{% endhighlight %}

The `$GOPATH` is automatically rewritten to use the local copy of dependencies, ensuring you have isolation for your project.  This approach is great for a few reasons:

1. *Repeatable builds* - When someone clones the repository and runs it, everything you need to build is present.  There are no floating versions.
2. *No external repository needed for dependencies* - with all dependencies checked into the local repository, there's no need to worry about a centralized service.  [NPM](http://blog.npmjs.org/post/76918947811/registry-downtime-2014-02-16) will occasionally go down, as does [NuGet](http://blog.nuget.org/20140403/nuget-2.8.1-april-2nd-downtime.html).
3. *Isolated environment* - With $GOPATH being rewritten at build time, you have complete isolation from one project to the next.
4. *No import rewriting* - A few other tools operate by changing the import url from the origin repository to a rewritten local repository.  This makes installing dependencies a little painful, and makes the import statement somewhat unsightly.

There are a few negatives though as well:

1. Not checking in your dependencies is convenient.  It's a pain to check in thousands of source files I won't really edit.  Without a centralized repository, this is not likely to be solved.
2. You need to use a wrapped toolchain with the `godep` commands.  There is still no real consensus.

For an example of a project that uses godep, check out [coffee](https://github.com/JustinBeckwith/coffee).


## Wrapping up

While using godep is great - I'd really love to see consensus.  It's way too easy for newcomers to fall into the trap of floating dependencies, and it's hard without much official guidance to come to any sort of consensus on the right approach.  At this stage - it's really up to each team to pick what they value in their dependency management story and choose one of the (many) options out there.  Until proven otherwise, I'm sticking with godep.


## Great posts on this subject

There have been a lot of great posts by others on this subject, check these out as well:

- [http://dave.cheney.net/2013/10/10/why-i-think-go-package-management-is-important](http://dave.cheney.net/2013/10/10/why-i-think-go-package-management-is-important)
- [http://dave.cheney.net/2014/03/22/thoughts-on-go-package-management-six-months-on](http://dave.cheney.net/2014/03/22/thoughts-on-go-package-management-six-months-on)
- [http://nathany.com/go-packages/](http://nathany.com/go-packages/)
- [http://blog.gopheracademy.com/advent-2014/deps/](http://blog.gopheracademy.com/advent-2014/deps/)
- [http://blog.gopheracademy.com/advent-2014/case-against-3pl/](http://blog.gopheracademy.com/advent-2014/case-against-3pl/)
- [http://kylelemons.net/blog/2012/04/22-rx-for-go-headaches.article](http://kylelemons.net/blog/2012/04/22-rx-for-go-headaches.article)
- [http://dev.af83.com/2013/09/14/a-journey-in-golang-package-manager.html](http://dev.af83.com/2013/09/14/a-journey-in-golang-package-manager.html)
