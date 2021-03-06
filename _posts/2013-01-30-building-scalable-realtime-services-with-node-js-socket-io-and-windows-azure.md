---
layout: post
title: Scalable realtime services with Node.js, Socket.IO and Windows Azure
tags:
- Azure
- featured
- Microsoft
- node
- Service Bus
- socket.io
- WebMatrix
status: publish
category: azure
type: post
published: true
featuredImage: "/images/2013/01/waz-blog3.png"
excerpt: >
    Wazstagram is a fun experiment with node.js on Windows Azure and the Instagram Realtime API. The project uses various services in Windows Azure to create a scalable window into Instagram traffic across multiple cities.  The application is written in node.js, using cloud services in Windows Azure.  A scalable set of backend nodes receive messages from the Instagram Realtime API.  Those messages are sent to the front end nodes using Windows Azure Service Bus. The front end nodes are running node.js with express and socket.io.
---

<p><a href="http://wazstagram.azurewebsites.net/"><img alt="WAZSTAGRAM" src="/images/2013/01/waz-screenshot.png" title="View the Demo"/></a>
</p>

<p><a href="http://wazstagram.azurewebsites.net/">Wazstagram</a> is a fun experiment with node.js on <a href="http://www.windowsazure.com/en-us/develop/nodejs/">Windows Azure</a> and the <a href="http://instagram.com/developer/realtime/">Instagram Realtime API</a>.  The project uses various services in Windows Azure to create a scalable window into Instagram traffic across multiple cities.
</p>

<ul>
<li><a href="http://wazstagram.azurewebsites.net/">View the demo on Windows Azure</a></li>
<li><a href="https://github.com/JustinBeckwith/wazstagram/">View the code on GitHub</a></li>
</ul>

The code I used to build <a href="https://github.com/JustinBeckwith/wazstagram/" target="_blank">WAZSTAGRAM</a> is under an <a href="https://github.com/JustinBeckwith/wazstagram/blob/master/LICENSE.md" target="_blank">MIT license</a>, so feel free to learn and re-use the code.


<h3>How does it work</h3>

<p>The application is written in node.js, using cloud services in Windows Azure.  A scalable set of backend nodes receive messages from the Instagram Realtime API.  Those messages are sent to the front end nodes using <a href="http://msdn.microsoft.com/en-us/library/hh690929.aspx">Windows Azure Service Bus</a>.  The front end nodes are running node.js with <a href="http://expressjs.com/">express</a> and <a href="http://socket.io/">socket.io</a>.
</p>

<p>
<a href="/images/2013/01/architecture.png">
<img alt="WAZSTAGRAM Architecture" title="WAZSTAGRAM Architecture" src="/images/2013/01/architecture.png"/>
</a>
</p>

<h3>Websites, and Virtual Machines, and Cloud Services, Oh My!</h3>

<p>One of the first things you need to grok when using Windows Azure is the different options you have for your runtimes.  Windows Azure supports three distinct models, which can be mixed and matched depending on what you&#39;re trying to accomplish:
</p>

<h5>Websites</h5>

<p><a href="http://www.windowsazure.com/en-us/home/scenarios/web-sites/">Websites</a> in Windows Azure match a traditional PaaS model, when compared to something like Heroku or AppHarbor.  They work with node.js, asp.net, and php.  There is a free tier.  You can use git to deploy, and they offer various scaling options.  For an example of a real time node.js site that works well in the Website model, check out my <a href="https://github.com/JustinBeckwith/TwitterMap">TwitterMap</a> example.  I chose not to use Websites for this project because a.) websockets are currently not supported in our Website model, and b.) I want to be able to scale my back end processes independently of the front end processes.  If you don&#39;t have crazy enterprise architecture or scaling needs, Websites work great.
</p>

<h5>Virtual Machines</h5>

<p>The <a href="http://www.windowsazure.com/en-us/home/scenarios/virtual-machines/">Virtual Machine</a> story in Windows Azure is pretty consistent with IaaS offerings in other clouds.  You stand up a VM, you install an OS you like (yes, <a href="http://www.windowsazure.com/en-us/manage/linux/">we support linux</a>), and you take on the management of the host.  This didn&#39;t sound like a lot of fun to me because I can&#39;t be trusted to install patches on my OS, and do other maintainency things.
</p>

<h5>Cloud Services</h5>

<p><a href="http://www.windowsazure.com/en-us/manage/services/cloud-services/">Cloud Services</a> in Windows Azure are kind of a different animal.  They provide a full Virtual Machine that is stateless - that means you never know when the VM is going to go away, and a new one will appear in it&#39;s place.  It&#39;s interesting because it means you have to architect your app to not depend on stateful system resources pretty much from the start.  It&#39;s great for new apps that you&#39;re writing to be scalable.  The best part is that the OS is patched automagically, so there&#39;s no OS maintenance.  I chose this model because a.) we have some large scale needs, b.) we want separation of conerns with our worker nodes and web nodes, and c.) I can&#39;t be bothered to maintain my own VMs.
</p>

<h3>Getting Started</h3>

<p>After picking your runtime model, the next thing you&#39;ll need is some tools.  Before we move ahead, you&#39;ll need to <a href="http://www.windowsazure.com/en-us/pricing/free-trial/">sign up for an account</a>.  Next, get the command line tools.  Windows Azure is a little different because we support two types of command line tools:
</p>

<ul><li><a href="http://www.windowsazure.com/en-us/develop/nodejs/how-to-guides/powershell-cmdlets/">PowerShell Cmdlets</a>: these are great if you&#39;re on Windows and dig the PowerShell thing.
</li><li><a href="http://www.windowsazure.com/en-us/manage/linux/other-resources/command-line-tools/">X-Platform CLI</a>:  this tool is interesting because it&#39;s written in node, and is available as a node module.  You can actually just <code>npm install -g azure-cli</code> and start using this right away.  It looks awesome, though I wish they had kept the flames that were in the first version.
</li></ul>

<p>
<a href="/images/2013/01/cli.png">
<img alt="X-Plat CLI" title="X-Plat CLI" src="/images/2013/01/cli.png" />
</a>
</p>

<p>For this project, I chose to use the PowerShell cmdlets.  I went down this path because the Cloud Services stuff is not currently supported by the X-Platform CLI (I&#39;m hoping this changes).  If you&#39;re on MacOS and want to use Cloud Services, you should check out <a href="https://github.com/tjanczuk/git-azure">git-azure</a>.   To bootstrap the project, I pretty much followed the <a href="http://www.windowsazure.com/en-us/develop/nodejs/tutorials/app-using-socketio/">&#39;Build a Node.js Chat Application with Socket.IO on a Windows Azure Cloud Service&#39; tutorial</a>.  This will get all of your scaffolding set up.
</p>

<h3>My node.js editor - WebMatrix 2</h3>

<p>After using the PowerShell cmdlets to scaffold my site, I used <a href="http://www.microsoft.com/web/webmatrix/">Microsoft WebMatrix</a> to do the majority of the work.  I am very biased towards WebMatrix, as I helped <a href="http://jbeckwith.com/2012/06/07/node-js-meet-webmatrix-2/">build the node.js experience</a> in it last year.  In a nutshell, it&#39;s rad because it has a lot of good editors, and just works.  Oh, and it has IntelliSense for everything:
</p>

<p>
<a href="/images/2013/01/webmatrix.png">
<img alt="I &lt;3 WebMatrix" title="WebMatrix FTW" src="/images/2013/01/webmatrix.png" />
</a>
</p>

<h4>Install the Windows Azure NPM module</h4>

<p>The <a href="https://npmjs.org/package/azure">azure npm module</a> provides the basis for all of the Windows Azure stuff we&#39;re going to do with node.js.  It includes all of the support for using blobs, tables, service bus, and service management.  It&#39;s even <a href="https://github.com/WindowsAzure/azure-sdk-for-node/">open source</a>.  To get it, you just need to cd into the directory you&#39;re using and run this command:
</p>

<p><code>npm install azure</code></p>

After you have the azure module, you're ready to rock.

<h3>The Backend</h3>

<p>The <a href="https://github.com/JustinBeckwith/wazstagram/tree/master/backend">backend</a> part of this project is a worker role that accepts HTTP Post messages from the Instagram API.  The idea is that their API batches messages, and sends them to an endpoint you define.  Here&#39;s <a href="http://instagram.com/developer/realtime/">some details</a> on how their API works.  I chose to use <a href="http://expressjs.com/">express</a> to build out the backend routes, because it&#39;s convenient.  There are a few pieces to the backend that are interesting:
</p>

<ol>
<li><h5>Use <a href="https://github.com/flatiron/nconf">nconf</a> to store secrets.  Look at the .gitignore.</h5>

If you&#39;re going to build a site like this, you are going to need to store a few secrets.  The backend includes things like the Instagram API key, my Windows Azure Storage account key, and my Service Bus keys.  I create a keys.json file to store this, though you could add it to the environment.  I include an example of this file with the project.  **DO NOT CHECK THIS FILE INTO GITHUB!**  Seriously, <a href="https://github.com/blog/1390-secrets-in-the-code" target="_blank">don&#39;t do that</a>.  Also, pay **close attention** to my <a href="https://github.com/JustinBeckwith/wazstagram/blob/master/.gitignore" target="_blank">.gitignore file</a>.  You don&#39;t want to check in any *.cspkg or *.csx files, as they contain archived versions of your site that are generated while running the emulator and deploying.  Those archives contain your keys.json file.  That having been said - nconf does makes it really easy to read stuff from your config:

{% highlight javascript %}
// read in keys and secrets
nconf.argv().env().file('keys.json');
var sbNamespace = nconf.get('AZURE_SERVICEBUS_NAMESPACE');
var sbKey = nconf.get('AZURE_SERVICEBUS_ACCESS_KEY');
var stName = nconf.get('AZURE_STORAGE_NAME');
var stKey = nconf.get('AZURE_STORAGE_KEY');
{% endhighlight %}
</li>

<li><h5>Use <a href="https://github.com/flatiron/winston">winston</a> and <a href="https://github.com/pofallon/winston-skywriter">winston-skywriter</a> for logging.</h5>
The cloud presents some challenges at times.  Like *how do I get console output* when something goes wrong.  Every node.js project I start these days, I just use winston from the get go.  It&#39;s awesome because it lets you pick where your console output and logging gets stored.  I like to just pipe the output to console at dev time, and write to <a href="http://www.windowsazure.com/en-us/develop/nodejs/how-to-guides/table-services/" target="_blank">Table Storage</a> in production.  Here&#39;s how you set it up:

{% highlight javascript %}
// set up a single instance of a winston logger, writing to azure table storage
var logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.Skywriter)({
            account: stName,
            key: stKey,
            partition: require('os').hostname() + ':' + process.pid
        })
    ]
});

logger.info('Started wazstagram backend');
{% endhighlight %}
</li>

<li><h5>Use <a href="http://msdn.microsoft.com/en-us/library/ee732537.aspx">Service Bus</a> - it&#39;s pub/sub (+) a basket of kittens.</h5>

<p>
<a href="http://msdn.microsoft.com/en-us/library/ee732537.aspx" target="_blank">Service Bus</a> is Windows Azure's swiss army knife of messaging.  I usually use it in the places where I would otherwise use the PubSub features of Redis.  It does all kinds of neat things like <a href="http://www.windowsazure.com/en-us/develop/net/how-to-guides/service-bus-topics/" target="_blank">PubSub</a>, <a href="http://msdn.microsoft.com/en-us/library/windowsazure/hh767287.aspx" target="_blank">Durable Queues</a>, and more recently <a href="https://channel9.msdn.com/Blogs/Subscribe/Service-Bus-Notification-Hubs-Code-Walkthrough-Windows-8-Edition" target="_blank">Notification Hubs</a>.   I use the topic subscription model to create a single channel for messages.  Each worker node publishes messages to a single topic.  Each web node creates a subscription to that topic, and polls for messages.  There's great <a href="http://www.windowsazure.com/en-us/develop/nodejs/how-to-guides/service-bus-topics/" target="_blank">support for Service Bus</a> in the <a href="https://github.com/WindowsAzure/azure-sdk-for-node" target="_blank">Windows Azure Node.js SDK</a>.
</p>

<p>
To get the basic implementation set up, just follow the <a href="http://www.windowsazure.com/en-us/develop/nodejs/how-to-guides/service-bus-topics/" target="_blank">Service Bus Node.js guide</a>. The interesting part of my use of Service Bus is the subscription clean up.  Each new front end node that connects to the topic creates it&#39;s own subscription.  As we scale out and add a new front end node, it creates another subscription.  This is a durable object in Service bus that hangs around after the connection from one end goes away (this is a feature).  To make sure sure you don&#39;t leave random subscriptions lying around, you need to do a little cleanup:
</p>

{% highlight javascript %}
function cleanUpSubscriptions() {
    logger.info('cleaning up subscriptions...');
    serviceBusService.listSubscriptions(topicName, function (error, subs, response) {
        if (!error) {
            logger.info('found ' + subs.length + ' subscriptions');
            for (var i = 0; i &lt; subs.length; i++) {
                // if there are more than 100 messages on the subscription, assume the edge node is down
                if (subs[i].MessageCount &gt; 100) {
                    logger.info('deleting subscription ' + subs[i].SubscriptionName);
                    serviceBusService.deleteSubscription(topicName, subs[i].SubscriptionName, function (error, response) {
                        if (error) {
                            logger.error('error deleting subscription', error);
                        }
                    });
                }
            }
        } else {
            logger.error('error getting topic subscriptions', error);
        }
        setTimeout(cleanUpSubscriptions, 60000);
    });
}
{% endhighlight %}
</li>
<li><h5>The <a href="https://github.com/JustinBeckwith/wazstagram/blob/master/backend/routes/home.js">NewImage endpoint</a></h5>
All of the stuff above is great, but it doesn't cover what happens when the Instagram API actually hits our endpoint.  The route that accepts this request gets metadata for each image, and pushes it through the Service Bus topic:

{% highlight javascript %}
serviceBusService.sendTopicMessage('wazages', message, function (error) {
	if (error) {
        logger.error('error sending message to topic!', error);
    } else {
        logger.info('message sent!');
    }
})
{% endhighlight %}
</li>
</ol>

<h3>The Frontend</h3>

<p>The <a href="https://github.com/JustinBeckwith/wazstagram/tree/master/frontend">frontend</a> part of this project is (despite my &#39;web node&#39; reference) a worker role that accepts accepts the incoming traffic from end users on the site.  I chose to use worker roles because I wanted to take advantage of Web Sockets.  At the moment, Cloud Services Web Roles do not provide that functionality.  I could stand up a VM with Windows Server 8 and IIS 8, but see my aformentioned anxiety about managing my own VMs.  The worker roles use <a href="http://socket.io/">socket.io</a> and <a href="http://expressjs.com">express</a> to provide the web site experience.  The front end uses the same NPM modules as the backend:  <a href="https://github.com/visionmedia/express/">express</a>, <a href="https://github.com/flatiron/winston">winston</a>, <a href="https://github.com/pofallon/winston-skywriter">winston-skywriter</a>, <a href="https://github.com/flatiron/nconf">nconf</a>, and <a href="https://github.com/WindowsAzure/azure-sdk-for-node">azure</a>.  In addition to that, it uses <a href="http://socket.io/">socket.io</a> and <a href="https://github.com/visionmedia/ejs">ejs</a> to handle the client stuff.  There are a few pieces to the frontend that are interesting:
</p>

<ol>
<li><h5>Setting up socket.io</h5>
Socket.io provides the web socket (or xhr) interface that we&#39;re going to use to stream images to the client.  When a user initially visits the page, they are going to send a `setCity` call, that lets us know the city to which they want to subscribe (by default all <a href="https://github.com/JustinBeckwith/wazstagram/blob/master/backend/cities.json" target="_blank">cities in the system</a> are returned).  From there, the user will be sent an initial blast of images that are cached on the server.  Otherwise, you wouldn&#39;t see images right away:

{% highlight javascript %}
// set up socket.io to establish a new connection with each client
var io = require('socket.io').listen(server);
io.sockets.on('connection', function (socket) {
    socket.on('setCity', function (data) {
        logger.info('new connection: ' + data.city);
        if (picCache[data.city]) {
            for (var i = 0; i &lt; picCache[data.city].length; i++) {
                socket.emit('newPic', picCache[data.city][i]);
            }
        }
        socket.join(data.city);
    });
});
{% endhighlight %}

</li>
<li><h5>Creating a Service Bus Subscription</h5>
To receive messages from the worker nodes, we need to create a single subscription for each front end node process.  This is going to create subscription, and start listening for messages:

{% highlight javascript %}
// create the initial subscription to get events from service bus
serviceBusService.createSubscription(topicName, subscriptionId,
    function (error) {
        if (error) {
            logger.error('error creating subscription', error);
            throw error;
        } else {
            getFromTheBus();
        }
});
{% endhighlight %}

</li><li><h5>Moving data between Service Bus and Socket.IO</h5>

As data comes in through the service bus subscription, you need to pipe it up to the appropriate connected clients.  Pay special attention to `io.sockets.in(body.city)` - when the user joined the page, they selected a city.  This call grabs all users subscribed to that city.  The other **important thing to notice** here is the way `getFromTheBus` calls itself in a loop.  There&#39;s currently no way to say &quot;just raise an event when there&#39;s data&quot; with the Service Bus Node.js implementation, so you need to use this model.

{% highlight javascript %}
function getFromTheBus() {
    try {
        serviceBusService.receiveSubscriptionMessage(topicName, subscriptionId, { timeoutIntervalInS: 5 }, function (error, message) {
            if (error) {
                if (error == &quot;No messages to receive&quot;) {
                    logger.info('no messages...');
                } else {
                    logger.error('error receiving subscription message', error)
                }
            } else {
                var body = JSON.parse(message.body);
                logger.info('new pic published from: ' + body.city);
                cachePic(body.pic, body.city);
                io.sockets. in (body.city).emit('newPic', body.pic);
                io.sockets. in (universe).emit('newPic', body.pic);
            }
            getFromTheBus();
        });
    } catch (e) {
        // if something goes wrong, wait a little and reconnect
        logger.error('error getting data from service bus' + e);
        setTimeout(getFromTheBus, 1000);
    }
}
{% endhighlight %}
</li></ol>

<h3>Learning</h3>

<p>The whole point of writing this code for me was to explore building performant apps that used a rate limited API for data.  Hopefully this model can effectively be used to accept data from any API responsibly, and scale it out to a number of connected clients to a single service.  If you have any ideas on how to make this app better, please let me know, or submit a PR!
</p>

<h3>Questions?</h3>

<p>If you have any questions, feel free to submit an issue here, or find me <a href="https://twitter.com/JustinBeckwith" target="_blank">@JustinBeckwith</a>
</p>
