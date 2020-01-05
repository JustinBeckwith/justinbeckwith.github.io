---
layout: post
title: Docker, Revel, and App Engine
tags:
- App Engine
- Google
- Go
- Docker
- Revel
status: publish
category: Google Cloud
type: post
published: true
excerpt: >
    Revel is an easy to use web application framework for Go.  Recently I wrapped up a Revel app inside of a docker container, and published it to Google App Engine.
---

!["Revel running on Google App Engine with Docker"](/images/2015/docker-revel-appengine/revel.png)

** note:  I recently updated this post to make sure all of the commands still work. **

I've spent some time recently using [the Go programming language](https://jbeckwith.com/2015/01/04/comparing-go-and-dotnet/) for my side web projects. The Go standard libraries are minimal by design - meaning it doesn't come with a prescriptive web framework out of the box. The good news is that there are a ton of options:

- [Revel](https://revel.github.io/)
- [Gin](https://github.com/gin-gonic/gin)
- [Martini](https://martini.codegangsta.io/)
- [Beego](https://beego.me/)
- [Gorilla](https://www.gorillatoolkit.org/)

Of course, you could decide to just [not use a web framework at all](https://news.ycombinator.com/item?id=8772760). Comparing these is a topic of great debate - but that topic is for another post :)  I decided to try out Revel first, as it was the closest to a full featured rails-esque framework at a glance. I'll likely give all of these a shot at some point.

After building an app on Revel, I wanted to get a feel for deploying my app to see if it posed any unique challenges. I recently started a new gig working on [Google Cloud](https://cloud.google.com), and decided to try out [App Engine](https://cloud.google.com/appengine/docs). The default runtime environment for Go in App Engine is [sandboxed](https://cloud.google.com/appengine/docs/go/#Go_The_sandbox). This comes with some benefits, and a few challenges. You get a lot of stuff for free, but you also are restricted in terms of file system access, network access, and library usage. Given the restrictions, I decided to use the new [App Engine Flexible](https://cloud.google.com/appengine/docs/go/managed-vms/) service. App Engine Flex lets you deploy your application in a docker container, while still having access to the other App Engine features like [datastore](https://cloud.google.com/appengine/features/#datastore), [logging](https://cloud.google.com/appengine/features/#logs), [caching](https://cloud.google.com/appengine/features/#memcache), etc. The advantage of using docker here is that I don't need to write any App Engine specific code. I can write a standard Go/Revel app, and just deploy to docker.

## Starting with Revel

There's a pretty great [getting started tutorial for Revel](https://revel.github.io/tutorial/gettingstarted.html). After getting the libraries installed, scaffold a new app with the [<code>revel new</code>](https://revel.github.io/tutorial/createapp.html) command:

{% highlight console %}
go get github.com/revel/revel
go get github.com/revel/cmd/revel
revel new myapp
{% endhighlight %}


## Using Docker

Before touching App Engine Flexible, the first step is to get it working with docker. It took a little time and effort, but once docker is [completely set up on your machine](https://docs.docker.com/installation/), writing the docker file is straight forward.

Here's the docker file I'm using right now:

{% highlight docker %}
# Use the official go docker image built on debian.
FROM golang:1.4.2

# Grab the source code and add it to the workspace.
ADD . /go/src/github.com/JustinBeckwith/revel-appengine

# Install revel and the revel CLI.
RUN go get github.com/revel/revel
RUN go get github.com/revel/cmd/revel

# Use the revel CLI to start up our application.
ENTRYPOINT revel run github.com/JustinBeckwith/revel-appengine dev 8080

# Open up the port where the app is running.
EXPOSE 8080
{% endhighlight %}

There are a few things to call out with this Dockerfile:

1. I chose to use the [golang docker image](https://registry.hub.docker.com/_/golang/) as my base. You could replicate the steps needed to install and configure go with a base debian/ubuntu image, but I found this easier. I could have also used the [pre-configured App ngine golang image](https://cloud.google.com/appengine/docs/managed-vms/custom-runtimes#base_images), but I did not need the additional service account support.

2. The <code>ENTRYPOINT</code> command tells Docker (and App Engine) which process to run when the container is started. I'm using the CLI included with revel.

3. For the <code>ENTRYPOINT</code> and <code>EXPOSE</code> directives, make sure to use port 8080 - this is a hard coded port for App Engine.

To start using docker with your existing revel app, you need to [install docker](https://docs.docker.com/installation/) and copy the [dockerfile](https://github.com/JustinBeckwith/revel-appengine/blob/master/Dockerfile) into the root of your app. Update the dockerfile to change the path in the `ADD` and `ENTRYPOINT` instructions to use the local path to your revel app instead of mine.

After you have docker setup, build your image and try running the app:

{% highlight console %}
# build and run the image
docker build -t revel-appengine .
docker run -it -p 8080:8080 revel-appengine
{% endhighlight %}

This will run docker, build the image locally, and then run it. Try hitting [`http://localhost:8080`](http://localhost:8080) in your browser. You should see the revel startup page:

!["Running revel in docker"](/images/2015/docker-revel-appengine/docker.png)

Now we're running revel inside of docker.


## App Engine Flexible

The original version of App Engine had a bit of a funny way of managing application runtimes. There are a limited set of stacks available, and you're left using a locked down version an approved runtime. Flex gets rid of this restriction by letting you run pretty much anything inside of a container. You just need to define a little bit of extra config in a <code>app.yaml</code> file that tells App Engine how to treat your container:

{% highlight yaml %}
runtime: custom
vm: true
api_version: go1
{% endhighlight %}

This config lets me use App Engine, with a custom docker image as my runtime, running on a managed virtual machine. You can copy my [app.yaml](https://github.com/JustinBeckwith/revel-appengine/blob/master/app.yaml) into your app directory, alongside the [Dockerfile](https://github.com/JustinBeckwith/revel-appengine/blob/master/Dockerfile). Next, make sure you've signed up for a [Google Cloud](https://cloud.google.com/) account, and download the [Google Cloud SDK](https://cloud.google.com/sdk/). After getting all of that setup, you'll need to create a new project in the [developer console](https://console.developers.google.com/).

{% highlight console %}
# Install the Google Cloud SDK
curl https://sdk.cloud.google.com | bash

# Log into your account
gcloud init
{% endhighlight %}

That covers the initial setup. After you have a project created, you can try deploying the app. This is essentially going to startup your app using the Dockerfile we defined earlier on Google Cloud:

{% highlight console %}
# Deploy the application
gcloud app deploy
{% endhighlight %}

After deploying, you can visit your site here:
[<code>https://revel-gae.appspot.com</code>](https://revel-gae.appspot.com)

![Revel running on App Engine](/images/2015/docker-revel-appengine/appengine.png)


## Wrapping up

So that's it. I decided to use revel for this one, but the whole idea behind using docker for App Engine is that you can bring pretty much any stack. If you have any questions, feel free to [check out the source](https://github.com/JustinBeckwith/revel-appengine), or find me [@JustinBeckwith](https://twitter.com/JustinBeckwith).
