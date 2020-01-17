---
layout: post
title: Comparing Go and .NET
tags:
- featured
- ASP.NET
- Go
status: publish
category: Golang
type: post
published: true
featuredImage: "/images/2015/comparing-go-and-dotnet/gopher.png"
excerpt: >
    I like to use the holiday break as a time to hang out with the family, disconnect from work, and learn about something new. I've been writing a lot of JavaScript lately, so I wanted to try something different. I decided to check out golang. I found myself wanting to understand Go in terms of what I already know about .NET and nodejs, and wishing there was a guide to bridge those gaps. My goal is to make it easier for those coming from a .NET background to understand Go, and get a feel for how it relates to similar concepts in the .NET world.
---

!["The gopher image is Creative Commons Attributions 3.0 licensed. Credit Renee French."](/images/2015/comparing-go-and-dotnet/gopher.png "The gopher image is Creative Commons Attributions 3.0 licensed. Credit Renee French.")

2014 was a crazy year. I spent most of the year thinking about client side code while working on [the new Azure Portal](http://jbeckwith.com/2014/09/20/how-the-azure-portal-works/). I like to use the holiday break as a time to hang out with the family, disconnect from work, and learn about something new. I figured a programming language used for distributed systems was about as far from client side JavaScript as I could get for a few weeks, so I decided to check out [golang](https://golang.org/).

Coming at this from 0 - I used a few resources to get started:

- [Tour of Go](https://tour.golang.org/welcome/1) - this was a great getting started guide that walks step by step through the language.
- [Go by Example](https://gobyexample.com/) - I actually learned more from go by example than the tour. It was great.
- [The github API wrapper in Go](https://github.com/google/go-github) - I figured I should start with some practical code samples written by folks at Google. When in doubt, I used this to make sure I was doing things 'the go way'.


I'm a learn-by-doing kind of guy - so I decided to learn by building something I've built in the past - an API wrapper for the Yelp API. A few years ago, I was working with the ineffable [Howard Dierking](https://twitter.com/howard_dierking) on a side project to compare RoR to ASP.NET. The project we picked needed to work with the Yelp API - and we noticed the lack of a NuGet package that fit the bill (for the record, there was a gem). To get that project kickstarted, I wrote a C# wrapper over the Yelp API - so I figure, why not do the same for Go?  You can see the results of these projects here:

- [YelpSharp](https://github.com/JustinBeckwith/YelpSharp) - C# / .NET Yelp wrapper API
- [go-yelp](https://github.com/JustinBeckwith/go-yelp) - Go Yelp wrapper API

To get a feel for the differences, it's useful to poke around the two repositories and compare apples to apples. This isn't a "Why I'm rage quitting .NET and moving to Go" post, or a "Why Go sucks and is doing it wrong" post. Each stack has it's strengths and weaknesses. Each is better suited for different teams, projects and development cultures. I found myself wanting to understand Go in terms of what I already know about .NET and nodejs, and wishing there was a guide to bridge those gaps. So I guess my goal is to make it easier for those coming from a .NET background to understand Go, and get a feel for how it relates to similar concepts in the .NET world. Here we go!


_**disclaimer:**  I've been writing C# for 14 years, and Go for 14 days. Please take all judgments of Go with a grain of salt._



### Environment Setup

In the .NET world, after you install Visual Studio - you're really free to set up a project wherever you like. By default, projects are created in ~/Documents, but that's just a default. When we need to reference another project - you create a project reference in Visual Studio, or you can install a NuGet package. Either way - there really aren't any restrictions on where the project lives.

Go takes a different approach. If you're getting started, it's really important to read/follow this guide:

[How to write go code](https://golang.org/doc/code.html)

All go code you write goes into a single root directory, which has a directory for each project / namespace. You tell the go tool chain where to find that directory via the $GOPATH environment variable. You can see on my box, I have all of the pieces I've written or played around with here:

![$GOPATH](/images/2015/comparing-go-and-dotnet/gopath.png)

For a single $GOPATH, you have one set of dependencies, and you keep a single version of the go toolchain. It felt a little uncomfortable, and at times it made me think of the [GAC](http://msdn.microsoft.com/en-us/library/yf1d93sz%28v=vs.110%29.aspx). It's also pretty similar to Ruby. Ruby has [RVM](https://github.com/wayneeseguin/rvm) to solve this problem, and Go has [GVM](https://github.com/moovweb/gvm). If you're working on different Go projects that have different requirements for runtime version / dependencies - I'd imagine you want to use GVM. Today, I only have one project - so it is less of a concern.


### Build & Runtime

In .NET land we use msbuild for compilation. On my team we use Visual Studio at dev time, and run msbuild via jenkins on our CI server. This is a pretty typical setup. At compile time, C# code is compiled down into IL, which is then just-in-time compiled at runtime to the native assembly language of the system's host.

Go is a little different, as it compiles directly to native code on the current platform. If I compile my yelp library in OSX, it creates an executable that will run on my current machine. This binary is not interpreted, or IL - it is a good ol' native executable. When linking occurs, the full native go runtime is embedded in your binary. It has much more of a c++ / gcc kind of feel. I'm sure this doesn't hurt in the performance department - which is one of the reasons folks move from Python/Ruby/Node to Go.

Compilation of *.go files is done by running the `go build` command from within the directory that contains your go files. I haven't really come across many projects using complex builds - its usually sufficient to just use `go build`. Outside of that - it seems like most folks are using [makefiles to perform build automation](http://blog.snowfrog.net/2013/06/18/golang-building-with-makefile-and-jenkins/). There's really no equivalent of a *.csproj file, or *.sln file in go - so there's no baked in file you would run through an msbuild equivalent. There are just *.go files in a directory, that you run the build tool against. At first I found all of this alarming. After a while - I realized that it mostly "just worked". It feels very similar to the csproj-less build system of [ASP.NET vNext](http://jbeckwith.com/2014/11/09/aspnet-vnext-oredev/).

### Package management

In the .NET world, package management is pretty well known:  it's all about [NuGet](http://nuget.org). You create a project it, add a nuspec, compile a nupkg with binaries, and publish them to [nuget.org](http://nuget.org). There are a lot of NuGet packages that fall under the "must have" category - things like [JSON.NET](http://www.nuget.org/packages/Newtonsoft.Json/), [ELMAH](http://www.nuget.org/packages/elmah/) and even [ASP.NET MVC](http://www.nuget.org/packages/Microsoft.AspNet.Mvc/6.0.0-beta1). It's not uncommon to have 30+ packages referenced in your project.

In .NET, we have a `packages.config` that contains a list of dependencies. This is nice, because it explicitly lays out what we depend upon, and the specific version we want to use:

{% highlight xml %}
<packages>
  <package id="Newtonsoft.Json" version="4.5.11" targetFramework="net40" />
  <package id="RestSharp" version="104.1" targetFramework="net40" />
</packages>
{% endhighlight %}

Go takes a bit of a different approach. The general philosophy of Go seems to trend towards avoiding external dependencies. I've found Blake Mizerany's talk to be pretty standard for sentiment from the community:

<div class='embed-container'><iframe title="Three fallacies of dependencies" src='http://www.youtube.com/embed/yi5A3cK1LNA' frameborder='0' allowfullscreen></iframe></div>

In Go - there's no equivalent of `packages.config`. It just doesn't exist. Instead - dependency installation is driven from Git/Hg repositories or local paths. The dependency is installed into your go path with the `go get` command:

{% highlight shell %}
$ go get github.com/JustinBeckwith/go-yelp/yelp
{% endhighlight %}

This command pulls down the relevant sources from the Git/Hg repository, and builds the binaries specific to your OS. To use the dependency, you don't reference a namespace or dll - you just import the library using the same url used to acquire the library:

{% highlight go %}
import "github.com/JustinBeckwith/go-yelp/yelp"
...
client := yelp.New(options)
result, err := client.DoSimpleSearch("coffee", "seattle")
{% endhighlight %}

When you `go compile`, the compiler walks through each *.go file, finds the list of external (non BCL) libraries, and implicitly does a `go get` if needed. This is both awesome and frightening at the same time. It's great that go doesn't require explicit dependencies. It's great that I don't need to think of the package and the namespace as different entities. It's **not** cool that I cannot choose a specific version of a package. No wonder the go community is skeptical of external dependencies - I wouldn't reference the tip of the master branch of any project and expect it to keep working for the long haul.

To get get around this limitation, a few package managers started to pop up in the community. [There are a lot of them.](https://code.google.com/p/go-wiki/wiki/PackageManagementTools)  Given the lack of a single winner in this space, I chose to write my package 'the go way' and not attempt using a package manager.


### Tooling

In the .NET world - [Visual Studio](http://msdn.microsoft.com/en-us/vstudio/aa718325.aspx) is king. I know a lot of folks that use things like JetBrains or SublimeText for code editing (I'm one of those SublimeText folks), but really it's all about VS. Visual Studio gives us project templates, IntelliSense, builds, tests, refactoring, code outlines - you get it. It's all in the box.  A giant box.

With Go, most developers tend to use a more stripped down code editor. There are a lot of folks using vim, sublimetext, or notepad++. Here are some of the more popular options:

- [GoSublime](https://github.com/DisposaBoy/GoSublime)
- [vim-go](https://github.com/fatih/vim-go)
- [LiteIDE](https://github.com/visualfc/liteide)

You can find a good conversation about the topic [on this reddit thread](http://www.reddit.com/r/golang/comments/2739gp/golang_ides/). Personally - I'm comfortable with SublimeText, so I went with that + the GoSublime plugin. It gave me syntax highlighting, auto-format on save, and some lightweight IntelliSense for core packages. That having been said, [LiteIDE](https://github.com/visualfc/liteide) feels a little more close to a full featured IDE:

![LiteIDE](/images/2015/comparing-go-and-dotnet/liteide.png)

There are a lot of options out there - which is a good thing :)  Go comes with a variety of other command line tools that make working with the framework easier:

- *go build* - builds your code
- *go install* - builds the code, and installs it in the $GOPATH
- *go test* - runs all tests in the project
- *gofmt* - formats your source code matching go coding standards
- *gocov* - perform code coverage analysis

I used all of these while working on my library.

### Testing

In [YelpSharp](https://github.com/JustinBeckwith/YelpSharp), I have the typical unit test project included with my package. I have several test files created, each of which has several test functions. I can then run my test through Visual Studio or the test runner. A typical test would look like this:

{% highlight csharp %}
[TestMethod]
public void VerifyGeneralOptions()
{
    var y = new Yelp(Config.Options);

    var searchOptions = new SearchOptions();
    searchOptions.GeneralOptions = new GeneralOptions()
    {
        term = "coffee"
    };

    searchOptions.LocationOptions = new LocationOptions()
    {
        location = "seattle"
    };

    var results = y.Search(searchOptions).Result;
    Assert.IsTrue(results.businesses != null);
    Assert.IsTrue(results.businesses.Count > 0);
}
{% endhighlight %}

The accepted pattern in Go for tests is to write a corresponding `<filename>_test.go` for each Go file. Every method that starts with `Test<RestOfFunctionName>` in the name, is executed as part of the test suite. By running `go test`, you run every test in the current project. It's pretty convenient, though I found myself wishing for something that auto-compiled my code and auto-ran tests (similar to the grunt/mocha/concurrent setup I like to use in node). A typical test function in go would look like this:

{% highlight go %}
// TestGeneralOptions will verify search with location and search term.
func TestGeneralOptions(t *testing.T) {
	client := getClient(t)
	options := SearchOptions{
		GeneralOptions: &GeneralOptions{
			Term: "coffee",
		},
		LocationOptions: &LocationOptions{
			Location: "seattle",
		},
	}
	result, err := client.DoSearch(options)
	check(t, err)
	assert(t, len(result.Businesses) > 0, containsResults)
}
{% endhighlight %}

The assert I used here is not baked in - there are [no asserts in Go](http://golang.org/doc/faq#assertions). For code coverage reports, the `gocov` tool does a nice job. To automatically run test against my GitHub repository, and auto-generate code coverage reports - I've using [Travis CI](https://travis-ci.org/) and [Coveralls.io](https://coveralls.io/). I'm planning on writing up another post on the tools you can use to build an effective open source Go library - so more on that later :)

### Programming language

Finally, let's take a look at some code. C# is amazing. It's been around now for 15 years or so, and it's grown methodically (in a good way). In terms of basic syntax, it's your standard C derivative language:

{% highlight csharp %}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace YelpSharp.Data.Options
{
    /// &lt;summary&gt;
    /// options for locale
    /// &lt;/summary&gt;
    public class LocaleOptions : BaseOptions
    {

        /// &lt;summary&gt;
        /// ISO 3166-1 alpha-2 country code. Default country to use when parsing the location field.
        /// United States = US, Canada = CA, United Kingdom = GB (not UK).
        /// &lt;/summary&gt;
        public string cc { get; set; }

        /// &lt;summary&gt;
        /// ISO 639 language code (default=en). Reviews written in the specified language will be shown.
        /// &lt;/summary&gt;
        public string lang { get; set; }

        /// &lt;summary&gt;
        /// format the properties for the querystring - bounds is a single querystring parameter
        /// &lt;/summary&gt;
        /// &lt;returns&gt;&lt;/returns&gt;
        public override Dictionary&lt;string, string&gt; GetParameters()
        {
            var ps = new Dictionary&lt;string, string&gt;();
            if (!String.IsNullOrEmpty(cc)) ps.Add(&quot;cc&quot;, this.cc);
            if (!String.IsNullOrEmpty(lang)) ps.Add(&quot;lang&quot;, this.lang);
            return ps;
        }
    }
}
{% endhighlight %}

C# supports both static and dynamic typing, but generally trends towards a static type style. I've always appreciated the way C# can appeal to both new and experienced developers. The best part about the language in my opinion has been the steady, thoughtful introduction of new features. Some of the things that happened between C# 1.0 and C# 5.0 (the current version) include:

- [Async / Await](http://msdn.microsoft.com/en-us/library/hh191443.aspx)
- [LINQ](http://msdn.microsoft.com/en-us/library/512aeb7t.aspx)
- [Partial Classes &amp; Methods](http://msdn.microsoft.com/en-us/library/wa80x488.aspx)
- [Iterators](http://msdn.microsoft.com/en-us/library/dscyy5s0.aspx)
- [Object initializers](http://msdn.microsoft.com/en-us/library/bb384062.aspx)
- [Optional paramters](http://msdn.microsoft.com/en-us/library/dd264739.aspx)
- [Variable type inference](http://msdn.microsoft.com/en-us/library/bb384061.aspx)
- [Extension methods](http://msdn.microsoft.com/en-us/library/bb383977.aspx)
- [Nullable Types](http://msdn.microsoft.com/en-us/library/1t3y8s4s.aspx)
- many things I'm forgetting...

There's more great stuff coming in [C# 6.0](http://msdn.microsoft.com/en-us/magazine/dn802602.aspx).

With Go - I found most language features to be... well... missing. It's a really basic language - you get interfaces (not the way we know them), maps, slices, arrays, and some primitives. It's very minimal - and this is by design. I was surprised when I started using go and found a few things missing (in no order):

- Generics
- Exception handling
- Method overloading
- Optional parameters
- Nullable types
- Implementing an interface explicitly
- foreach, while, yield, etc

To understand why Go doesn't have these features - you have to understand the roots of the language. Rob Pike (one of the designers of Go) really explains the problems they were trying to solve, and the design decisions of the language well in his post ["Less is exponentially more"](http://commandcenter.blogspot.com/2012/06/less-is-exponentially-more.html). The idea is to provide a set of base primitive constructs: only the ones that are absolutely required.

#### Interfaces, methods, and not-classes

Having written a lot of C# - I got used to having all of these features at my disposal. I got used to traditional OOP features like classes, inheritance, method overloading, and explicit interfaces. I also write a lot of JavaScript - so I understand (and love) dynamic typing. What's weird about Go is that is both statically typed - and doesn't provide many of the OOP features I've grown to lean upon.

To see how this plays out - lets look at the same structure written in Go:

{% highlight go %}
package yelp

// LocaleOptions provide additional search options that enable returning results
// based on a given country or locale.
type LocaleOptions struct {
	// ISO 3166-1 alpha-2 country code. Default country to use when parsing the location field.
	// United States = US, Canada = CA, United Kingdom = GB (not UK).
	cc   string

	// ISO 639 language code (default=en). Reviews written in the specified language will be shown.
	lang string
}

// getParameters will reflect over the values of the given struct, and provide a type appropriate
// set of querystring parameters that match the defined values.
func (o *LocaleOptions) getParameters() (params map[string]string, err error) {
	params = make(map[string]string)
	if o.cc != "" {
		params["cc"] = o.cc
	}
	if o.lang != "" {
		params["lang"] = o.lang
	}
	return params, nil
}
{% endhighlight %}

There are a few interesting things to call out from these two samples:

- The Go sample and C# are close to the same size - XMLDoc in this case really makes C# seem longer.
- I'm not using a class - but rather an interface. Interfaces can support methods via the syntax above. If you define a func that takes a pointer to an object of the interface type - it now supports methods.
- In my C# sample, this structure implements an interface. In Go, you write an interface, and then structures implement them ambiently - there is no `implements` keyword.
- Pointers are an important concept in Go. I haven't had to think about pointers since 2001 (the last time I wrote C++). It's not a big deal, but not something I expected to run into.
- Notice that the `getParameters()` function returns multiple results - that's new (and kind of cool).
- The `getParameters()` method returns an error as one of the potential return values. You need to do that since *there is no concept of an exception in Go*.

#### Error handling

Let that one sink for a moment. Go takes a strange (but effective) approach to error handling. Instead of tossing an exception and expecting the caller to catch and react, many (if not most) functions will return an error. It's on the caller to check the value of that error, and choose how to react. You can learn more about [error handling in Go here](http://blog.golang.org/error-handling-and-go). The net result, is that I wrote a lot of code like this:

{% highlight go %}
// DoSearch performs a complex search with full search options.
func (client *Client) DoSearch(options SearchOptions) (result SearchResult, err error) {

	// get the options from the search provider
	params, err := options.getParameters()
	if err != nil {
		return SearchResult{}, err
	}

	// perform the search request
	rawResult, _, err := client.makeRequest(searchArea, &quot;&quot;, params)
	if err != nil {
		return SearchResult{}, err
	}

	// convert the result from json
	err = json.Unmarshal(rawResult, &amp;result)
	if err != nil {
		return SearchResult{}, err
	}
	return result, nil
}
{% endhighlight %}

In this example, the `DoSearch` method returns multiple values (get used to this), one of which is an error. There are 3 different method calls made in this function - all of which may return an error. For each of them, you need to check the err value, and choose how to react - oftentimes, just bubbling the error back up through the callstack by hand. I haven't quite learned to love this aspect of the language yet.

#### Writing async code

In the previous sample, you may have noticed something fishy. On the following line, I'm making an HTTP request, checking for an error, and them moving forward:

{% highlight go %}
rawResult, _, err := client.makeRequest(searchArea, &quot;&quot;, params)
if err != nil {
	return SearchResult{}, err
}
...
{% endhighlight %}

That code is *synchronous*. When I first wrote this code - I was fairly certain I was making a mistake. Years of callbacks or promises in node, and years of tasks and async/await in C# had taught me something really clear - synchronous methods that block the thread are bad. But here's Go - just doing it's thing. I thought I was making a mistake, until I started poking around and found a [few people with the same misunderstanding](http://stackoverflow.com/questions/23709118/does-golang-have-callback-concept). To make a call asynchronously in Go, it's largely up to the caller, using a [goroutine](https://gobyexample.com/goroutines). Goroutines are kind of cool. You essentially point at a function and say 'run this asynchronously':

{% highlight go %}
func Announce(message string, delay time.Duration) {
    go func() {
        time.Sleep(delay)
        fmt.Println(message)
    }()  // Note the parentheses - must call the function.
}
{% endhighlight %}

Running `go <func>` in this manner will run the function concurrently in the same process. This does not create a system thread or fork the process - it's completely internal to the go runtime. Like most things with Go - I was confused and scared at first, as I tried to apply what I know about C# and JavaScript to their model. I haven't written enough of this style of asynchronous code to have a great feel for the subject, but I plan to spend a lot of time here in the coming weeks.

### What's next

My experience so far with Go has been at times frustrating, but certainty not boring. The best advice I can give for those new to the language is to let go of your preconceived notion of how [insert concept or task] works - it's almost like the designers of Go tried to do things differently for the sake of doing it differently at times.  And that's ok :) I was cursing far less at the end of the project than the beginning, and I've now started to move towards understanding why it's different (except for the lack of generics - that's just weird). It's helping me question some of the design decisions I've made on my own APIs at work, and helped me better appreciate the niceties of C#.

I've really only scratched the surface of what's out there for Go. Now that I've put together a library, I'm going to take the next step and start playing around with [revel](http://revel.github.io/), which provides an ASP.NET style web framework on top of Go. From there, I'm going to keep on building, and see where this goes. Happy coding!


*The gopher image is Creative Commons Attributions 3.0 licensed. Credit Renee French.*


