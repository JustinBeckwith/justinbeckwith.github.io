---
layout: post
title: Docker, Revel, and AppEngine
tags:
- AppEngine
- Google
- Go
- Docker
- Revel
status: publish
category: Google Cloud
type: post
published: true
excerpt: >
    Revel is an easy to use web application framework for Go.  Recently I wrapped up a Revel app inside of a docker container, and published it to Google AppEngine.
---

!["Revel running on Google AppEngine with Docker"](/images/2015/docker-revel-appengine/revel.png)

I've spent some time recently using [go](http://jbeckwith.com/2015/01/04/comparing-go-and-dotnet/) for my side web projects. The Go standard libraries are minimal by design - meaning it doesn't come with a prescriptive web framework out of the box. The good news is that there are a ton of options:

- [Revel](https://revel.github.io/)
- [Gin](https://github.com/gin-gonic/gin)
- [Martini](http://martini.codegangsta.io/)
- [Beego](http://beego.me/)
- [Gorilla](http://www.gorillatoolkit.org/)

Of course, you could decide to just [not use a web framework at all](https://news.ycombinator.com/item?id=8772760). Comparing these is a topic of great debate - but that topic is for another post :)  I decided to try out Revel first, as it was the closest to a full featured rails-esque framework at a glance. I'll likely give all of these a shot at some point.

After building an app on Revel, I wanted to get a feel for deploying my app to see if it posed any unique challenges. I recently started a new gig working on [Google Cloud](http://cloud.google.com), and decided to try out [AppEngine](https://cloud.google.com/appengine/docs). The default runtime environment for Go in AppEngine is [sandboxed](https://cloud.google.com/appengine/docs/go/#Go_The_sandbox). This comes with some benefits, and a few challenges. You get a lot of stuff for free, but you also are restricted in terms of file system access, network access, and library usage. Given the restrictions, I decided to use the new [managed VM](https://cloud.google.com/appengine/docs/go/managed-vms/) service. Managed VMs let you deploy your application in a docker container, while still having access to the other AppEngine features like [datastore](https://cloud.google.com/appengine/features/#datastore), [logging](https://cloud.google.com/appengine/features/#logs), [caching](https://cloud.google.com/appengine/features/#memcache), etc. The advantage of using docker here is that I don't need to write any AppEngine specific code. I can write a standard Go/Revel app, and just deploy to docker.

## Starting with Revel

There's a pretty great [getting started tutorial for Revel](https://revel.github.io/tutorial/gettingstarted.html). After getting the libraries installed, scaffold a new app with the [<code>revel new</code>](https://revel.github.io/tutorial/createapp.html) command:

<pre><code class="language-bash">go get github.com/revel/revel
go get github.com/revel/cmd/revel
revel new myapp
</code></pre>


## Using Docker

Before touching managed VMs in AppEngine, the first step is to get it working with docker. It took a little time and effort, but once docker is [completely set up on your machine](https://docs.docker.com/installation/), writing the docker file is straight forward.

Here's the docker file I'm using right now:

<pre><code class="language-docker">
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
</code></pre>

There are a few things to call out with this Dockerfile:

1. I chose to use the [golang docker image](https://registry.hub.docker.com/_/golang/) as my base. You could replicate the steps needed to install and configure go with a base debian/ubuntu image, but I found this easier. I could have also used the [pre-configured AppEngine golang image](https://cloud.google.com/appengine/docs/managed-vms/custom-runtimes#base_images), but I did not need the additional service account support.

2. The <code>ENTRYPOINT</code> command tells Docker (and AppEngine) which process to run when the container is started. I'm using the CLI included with revel.

3. For the <code>ENTRYPOINT</code> and <code>EXPOSE</code> directives, make sure to use port 8080 - this is a hard coded port for AppEngine.

To start using docker with your existing revel app, you need to [install docker](https://docs.docker.com/installation/) and copy the [dockerfile](https://github.com/JustinBeckwith/revel-appengine/blob/master/Dockerfile) into the root of your app. Update the dockerfile to change the path in the `ADD` and `ENTRYPOINT` instructions to use the local path to your revel app instead of mine.

After you have docker setup, build your image and try running the app:

<pre><code class="language-bash">
# make sure docker is running (I'm in OSX)
boot2docker up
$(boot2docker shellinit)

# build and run the image
docker build -t revel-appengine .
docker run -it -p 8080:8080 revel-appengine
</code></pre>

This will run docker, build the image locally, and then run it. Try hitting [`http://localhost:8080`](http://localhost:8080) in your browser. You should see the revel startup page:

!["Running revel in docker"](/images/2015/docker-revel-appengine/docker.png)

Now we're running revel inside of docker.


## AppEngine Managed VMs

The original version of AppEngine had a bit of a funny way of managing application runtimes. There are a limited set of stacks available, and you're left using a locked down version an approved runtime. Managed VMs get rid of this restriction by letting you run pretty much anything inside of a container. You just need to define a little bit of extra config in a <code>app.yaml</code> file that tells AppEngine how to treat your container:

<pre><code class="language-yaml">
runtime: custom
vm: true
api_version: go1
health_check:
  enable_health_check: False
</code></pre>

This config lets me use AppEngine, with a custom docker image as my runtime, running on a managed virtual machine. You can copy my [app.yaml](https://github.com/JustinBeckwith/revel-appengine/blob/master/app.yaml) into your app directory, alongside the [Dockerfile](https://github.com/JustinBeckwith/revel-appengine/blob/master/Dockerfile). Next, make sure you've signed up for a [Google Cloud](https://cloud.google.com/) account, and download the [Google Cloud SDK](https://cloud.google.com/sdk/). After getting all of that setup, you'll need to create a new project in the [developer console](https://console.developers.google.com/).

<pre><code class="language-bash">
# Install the Google Cloud SDK
curl https://sdk.cloud.google.com | bash

# Log into your account
gcloud auth login

# Install the preview components
gcloud components update app

# Set the project
gcloud config set project &lt;project-id&gt;
</code></pre>

That covers the initial setup. After you have a project created, you can try running the app locally. This is essentially going to startup your app using the Dockerfile we defined earlier:

<pre><code class="language-bash">
# Run the revel application locally
gcloud preview app run ./app.yaml

# Deploy the application
gcloud preview app deploy ./app.yaml
</code></pre>

After deploying, you can visit your site here:
[<code>http://revel-gae.appspot.com</code>](http://revel-gae.appspot.com)

![Revel running on AppEngine](/images/2015/docker-revel-appengine/appengine.png)


## Wrapping up

So that's it. I decided to use revel for this one, but the whole idea behind using docker for AppEngine is that you can bring pretty much any stack. If you have any questions, feel free to [check out the source](http://github.com/JustinBeckwith/revel-appengine), or find me [@JustinBeckwith](https://twitter.com/JustinBeckwith).
