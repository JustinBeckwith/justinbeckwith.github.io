---
layout: post
title: Realtime services with io.js, redis and Azure
tags:
- Azure
- featured
- Microsoft
- node
- io.js
- redis
- socket.io
- portal
status: publish
category: azure
type: post
published: true
featuredImage: "/images/2013/01/waz-blog3.png"
excerpt: >
    A few years ago, I put together a fun little app that used node.js, service bus, cloud services, and the Instagram realtime API to build a realtime visualization of images posted to Instagram. In 2 years time, a lot has changed on the Azure platform.  I decided to go back into that code, and retool it to take advantage of some new technology and platform features.  And for fun.   
---

[!["View the demo"](/images/2013/01/waz-screenshot.png)](http://wazstagram.azurewebsites.net)

A few years ago, I put together a [fun little app](http://jbeckwith.com/2013/01/30/building-scalable-realtime-services-with-node-js-socket-io-and-windows-azure/) that used node.js, service bus, cloud services, and the Instagram realtime API to build a realtime visualization of images posted to Instagram. In 2 years time, a lot has changed on the Azure platform.  I decided to go back into that code, and retool it to take advantage of some new technology and platform features.  And for fun.  

- [Original blog post](http://jbeckwith.com/2013/01/30/building-scalable-realtime-services-with-node-js-socket-io-and-windows-azure/)
- [View the demo on Azure](http://wazstagram.azurewebsites.net/)
- [View the code on GitHub](https://github.com/JustinBeckwith/wazstagram)

Let's take a look through the updates!


## Resource groups

I'm using [resource groups](http://azure.microsoft.com/en-us/documentation/articles/azure-preview-portal-using-resource-groups/) to organize the various services.  Resource groups provide a nice way to visualize and manage the services that make up an app.  RBAC and aggregated monitoring are two of the biggest features that make this useful.

!["Using a resource group makes it easier to organize services"](/images/2015/wazstagram/resource-group.png)


## Websites & Websockets

In the original version of this app, I chose to use [cloud services](http://azure.microsoft.com/en-us/services/cloud-services/) instead of [Azure web sites](http://azure.microsoft.com/en-us/documentation/services/websites/).  One of the biggest reasons for this choice was websocket support with socket.io.  At the time, Azure websites did not support websockets.  Well...  now it does.  There are a lot of reasons to choose websites over cloud services:

- Fast continuous deployment via Github
- Low concept count, no special tooling needed
- Now supports deployment slots, ssl, enterprise features

When you create your site, make sure to turn on websockets:

!["setting up websockets"](/images/2015/wazstagram/websockets.png)


## io.js

[io.js](https://iojs.org/) is a fork of [node.js](http://nodejs.org/) that provides a faster release cycle and es6 support.  It's pretty easy to get it running on Azure, thanks to [iojs-azure](https://github.com/felixrieseberg/iojs-azure).  Just to prove I'm running io.js instead of node.js, I added this little bit in my server.js:

<pre><code class="language-javascript">logger.info(`Started wazstagram running on ${process.title} ${process.version}`);</code></pre>

The results:

!["Console says it's io.js"](/images/2015/wazstagram/iojs.png)


## redis

In the previous version of this app, I used service bus for publishing messages from the back end process to the scaled out front end nodes.  This worked great, but I'm more comfortable with redis.  There are a lot of options for redis on Azure, but we recently rolled out a first class redis cache service, so I decided to give that a try.  I'm really looking to use two features from redis:

- Pub / Sub - Messages received by Instagram are published to the scaled out front end
- Caching - I keep a cache of 100 messages around to auto-fill the page on the initial visit

You can create a new redis cache from the Gallery:

!["Create a new redis cache"](/images/2015/wazstagram/redis-create.png)

After creating the cache, you have a good ol standard redis database. Nothing special/fancy/funky.  You can connect to it using the standard redis-cli from the command line:

!["I can connect using standard redis tools"](/images/2015/wazstagram/redis-cli.png)

Note the password I'm using is actually one of the management keys provided in the portal.  I also chose to disable SSL, as nothing I'm storing is sensitive data:

!["Set up non-SSL connections"](/images/2015/wazstagram/redis-ssl.png)

I used [node-redis](https://github.com/mranney/node_redis) to talk to the database, both for pub/sub and cache.  First, create a new redis client:

<pre><code class="language-javascript">function createRedisClient() {
    return redis.createClient(
        6379,
        nconf.get('redisHost'), 
        {
            auth_pass: nconf.get('redisKey'), 
            return_buffers: true
        }
    ).on("error", function (err) {
        logger.error("ERR:REDIS: " + err);
    });    
}

// create redis clients for the publisher and the subscriber
var redisSubClient = createRedisClient();
var redisPubClient = createRedisClient();</code></pre>

**PROTIP**:  Use [nconf](https://github.com/flatiron/nconf) to store secrets in json locally, and read from [app settings](http://azure.microsoft.com/blog/2013/07/17/windows-azure-web-sites-how-application-strings-and-connection-strings-work/) in Azure. 

When the Instagram API sends a new image, it's published to a channel, and centrally cached:

<pre><code class="language-javascript">logger.verbose('new pic published from: ' + message.city);
logger.verbose(message.pic);
redisPubClient.publish('pics', JSON.stringify(message));

// cache results to ensure users get an initial blast of (n) images per city
redisPubClient.lpush(message.city, message.pic);
redisPubClient.ltrim(message.city, 0, 100);
redisPubClient.lpush(universe, message.pic);
redisPubClient.ltrim(universe, 0, 100);</code></pre>

The centralized cache is great, since I don't need to use up memory in each io.js process used in my site (keep scale out in mind).  Each client also connects to the pub/sub channel, ensuring every instance gets new messages:

<pre><code class="language-javascript">// listen to new images from redis pub/sub
redisSubClient.on('message', function(channel, message) {
    logger.verbose('channel: ' + channel + " ; message: " + message);
    var m = JSON.parse(message.toString());
    io.sockets.in (m.city).emit('newPic', m.pic);
    io.sockets.in (universe).emit('newPic', m.pic);
}).subscribe('pics');</code></pre>

After setting up the service, I was using the redis-cli to do a lot of debugging.  There's also some great monitoring/metrics/alerts available in the portal:

!["monitoring and metrics"](/images/2015/wazstagram/redis-mon.png)

## Wrapping up

If you have any questions, feel free to [check out the source](http://github.com/JustinBeckwith/wazstagram), or find me [@JustinBeckwith](https://twitter.com/JustinBeckwith).

