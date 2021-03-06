---
layout: post
title: Building a user map with SignalR and Bing
category: asp.net
tags:
- .NET
- Bing
- featured
- JavaScript
- Programming
- SignalR
status: publish
type: post
published: true
excerpt: >
  Building asynchronous real time apps with bidirectional communication has traditionally been a very difficult thing to do.  HTTP was originally designed to speak in terms of requests and responses, long before concepts of rich media, social integration, and real time communication were considered staples of modern web development.  Over the years, various solutions have been hacked together to solve this problem.  You can use plugins like flash or silverlight to make a true socket connection on your behalf - but not all clients support plugins.  You can use long polling to manage multiple connections via HTTP - but this can be tricky to implement, and can eat up system resources.  The Web Socket standard promises to give web developers a first class socket connection, but browser support is spotty and inconsistent.
---


<a href="https://signalrmap.apphb.com"  target="_blank"><img src="/images/2011/10/signalrheader.png" alt="" title="Building a user map with SignalR and Bing" width="430" height="290"/></a>

Building asynchronous real time apps with bidirectional communication has traditionally been a very difficult thing to do.  HTTP was originally designed to speak in terms of requests and responses, long before concepts of rich media, social integration, and real time communication were considered staples of modern web development.  Over the years, various solutions have been hacked together to solve this problem.  You can use plugins like flash or silverlight to make a true socket connection on your behalf - but not all clients support plugins.  You can use long polling to manage multiple connections via HTTP - but this can be tricky to implement, and can eat up system resources.  The <a href="http://dev.w3.org/html5/websockets/" target="_blank">Web Socket standard</a> promises to give web developers a first class socket connection, but browser support is spotty and inconsistent.



Various tools across multiple stacks have been release to solve this problem, but in this post I would like to talk about the first real asynchronous client/server package for ASP.NET:  <a href="https://github.com/SignalR/SignalR" target="_blank">SignalR</a>.  SignalR allows .NET developers to change the way we think about client/server messaging:  instead of worrying about implementation details of  web sockets, we can focus on the way communication flows across the various components of our applications.


<h3>This sounds familiar: socket.io with node.js</h3>
Over the last year or so, <a href="http://nodejs.org/" target="_blank">node.js</a> has burst onto the scene as a popular stack for building highly asynchronous applications.  The event driven model of JavaScript, paired with a community of inventive developers, led to a platform well suited for these needs.  The package <a href="http://socket.io/" target="_blank">socket.io</a> provides what I have found to be the missing piece in the comet puzzle:  a front and back end framework that just makes sockets over the web work.  No more building flash applications to attempt opening connections over various ports.  No more poorly implemented long polling solutions.  Most importantly, socket.io made web sockets just plain easy to use:

{% highlight html %}
<script src="/socket.io/socket.io.js"></script>
<script>
  var socket = io.connect('http://localhost');
  socket.on('news', function (data) {
    console.log(data);
    socket.emit('my other event', { my: 'data' });
  });
</script>
{% endhighlight %}

Node.js and socket.io paved the way for a series of new tools and frameworks across multiple stacks that enable developers to have a first class client/server messaging experience.  Node.js and socket.io are wonderful tools - but let's get back to focusing on SignalR.

<h3>Two ways to build apps with SignalR</h3>

There are two ways you can go about setting up the server for SignalR.  If you want a low level experience, you can add a 'PersistentConnection' class along with a custom route.  This will give you basic messaging capabilities, suitable for many apps.  Straight from the <a href="https://github.com/SignalR/SignalR" target="_blank">SignalR github</a>, here is an example:

{% highlight csharp %}
using SignalR;

public class MyConnection : PersistentConnection {
    protected override Task OnReceivedAsync(string clientId, string data) {
        // Broadcast data to all clients
        return Connection.Broadcast(data);
    }
}
{% endhighlight %}

This works well if you're dealing with simple messaging - the other model SignalR supports is the 'hub' model.  This is where things start to get interesting.  Using hubs, you can invoke client side functions from the server, and server side functions from the client.  Here's another example from the documentation:

Here is the server:
{% highlight csharp %}
public class Chat : Hub {
    public void Send(string message) {
        // Call the addMessage method on all clients
        Clients.addMessage(message);
    }
}
{% endhighlight %}

And the client:
{% highlight html %}
<script type="text/javascript">
$(function () {
	// Proxy created on the fly
	var chat = $.connection.chat;

	// Declare a function on the chat hub so the server can invoke it
	chat.addMessage = function(message) {
			$('#messages').append('<li>'   message   '</li>');
	};

	$("#broadcast").click(function () {
			// Call the chat method on the server
			chat.send($('#msg').val())
					.fail(function(e) { alert(e); }) // Supports jQuery deferred
	});

	// Start the connection
	$.connection.hub.start();
});
</script>

<input type="text" id="msg" />
<input type="button" id="broadcast" />

<ul id="messages">
</ul>
{% endhighlight %}

I chose the high level API, because well... it's just cool.  For a wonderful break down of the differences between these two methods, check out <a href="http://www.hanselman.com/blog/AsynchronousScalableWebApplicationsWithRealtimePersistentLongrunningConnectionsWithSignalR.aspx" target="_blank">Scott Hanselman's post on the topic</a>.

<h3>Lets build something!</h3>
One of the common examples of using these frameworks is a chat room:  it has all of the touch points that are otherwise difficult to implement.  How do we know when someone joins the room?  What about sending a message? What if I want to send a message to multiple people?  This is a perfect example of how client/server messaging over the web can make our lives easier.  The SignalR folks have a live sample of this application running on their <a href="http://chatapp.apphb.com/" target="_blank">demo site</a>. With the chat idea done, I decided to combine two tools into one project:  a user map.  I want to maintain a map that uses a pushpin for every user on the page.  As users come, a new pushpin will be added in their location in real time.  As they leave, the pushpin will be removed.  Before we dive into the code, check out the demo at <a href="http://signalrmap.apphb.com/" target="_blank">http://signalrmap.apphb.com/</a>.  If no one is in the room, you can slightly randomize your position by using the "random flag" at <a href="http://signalrmap.apphb.com/?random=true" target="_blank">http://signalrmap.apphb.com/?random=true</a>.  This will allow you to use multiple browser windows and watch the system add location push pins.


<h3>Building the client</h3>
The client of SignalRMap includes a Bing map, and some JavaScript to interact with the back end.  I used <a href="http://www.asp.net/mvc/mvc3" target="_blank">ASP.NET MVC 3</a> for this example, but this will work just fine with a web form.  To start, we need to include a few script files:

{% highlight html %}
<script charset="UTF-8" type="text/javascript" src="http://ecn.dev.virtualearth.net/mapcontrol/mapcontrol.ashx?v=7.0"></script>
<script src="@Url.Content("~/Scripts/jquery-1.6.4.min.js")" type="text/javascript"></script>
<script src="@Url.Content("~/Scripts/jquery.signalR.min.js")" type="text/javascript"></script>
<script type="text/javascript" src="@Url.Content("~/signalr/hubs")"></script>
{% endhighlight %}

The first thing we are including here is the Bing Maps JavaScript SDK - this will do all of the heavy lifting for our maps.  The SignalR client is dependent upon JavaScript, so we need to include it along with our SignalR reference.  Finally, we include the 'hubs' functionality into our application, linking our client and server side methods.

After including our scripts, connecting to a hub is crazy awesome easy:

{% highlight javascript %}
// create the connection to our hub
var mapHub = $.connection.mapHub;

// define some javascript methods the server side hub can invoke

// add a new client to the map
mapHub.addClient = function (client) {
	addClient(client);
	centerMap();
	var pins = getPushPins();
	$(&quot;#userCount&quot;).html(pins.length)
};

// start the hub
$.connection.hub.start(function () {
	// after the hub has started, get the current location from the browser
	navigator.geolocation.getCurrentPosition(function (position) {

		// create the map element on the page
		mappit(position);

		// notify the server a new user has joined the party
		var coords = isRandom ? createRandomPosition(position) : position.coords;
		var message = { 'user': '', 'location': { latitude: coords.latitude, longitude: coords.longitude} };
		mapHub.join(message);
	});
});
{% endhighlight %}

There are a few things going on here.  First, we reference our connection to the hub created on the server (note: the connection has not been established yet).  Notice the mapHub.addClient method - this method will be exposed in a way such that it can be invoked from the server.  *scratches head* - this is a neat concept.  After defining methods which can be invoked from the server, we start the connection to the hub.  Once the connection is established, we get the browser's current location, and send that location back to the server. That's about it.  Remember how simple it was to use socket.io?  Here we have the same experience.    There's a little more client script here to handle managing the map component.  For the full client source for the application, check out my <a href="https://github.com/JustinBeckwith/SignalRMap" target="_blank">github</a>.

<h3>Server side code</h3>
As mentioned above, I chose to take the 'hubs' route for my application.  One of the nice things about using a hub is that it doesn't require any custom routing - just create a class that extends 'Hub', and you're set.  In this example, I'm storing a persistent list of the clients connected to the application (obviously, this method will only work with a single web server).  As users show up at the site, they send their current position to the server.  The new MapClient is broadcasted to all of the connected clients, and the new client is given the master list of clients:

{% highlight csharp %}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using SignalR.Hubs;

namespace SignalRMap
{
	public class MapHub : Hub, IDisconnect
	{
		private static readonly Dictionary&lt;string, MapClient&gt; _clients = new Dictionary&lt;string, MapClient&gt;();

		public void Join(MapClient message)
		{
			_clients.Add(this.Context.ClientId, message);
			Clients.addClient(message);
			this.Caller.addClients(_clients.ToArray());
		}

		public void Disconnect()
		{
			MapClient client = _clients[Context.ClientId];
			_clients.Remove(Context.ClientId);
			Clients.removeClient(client);
		}

		/// &lt;summary&gt;
		/// model class for the join message. I tried to use dynamic here, but it didn't work.
		/// &lt;/summary&gt;
		public class MapClient
		{
			public string clientId { get; set; }
			public Location location { get; set; }

			public class Location
			{
				public float latitude { get; set; }
				public float longitude { get; set; }
			}
		}
	}
}
{% endhighlight %}

And that's it!  SignalR figured out what types of communication my browser supports, managed the tunnel, and just made the connection work.  Enjoy!

<ul>
<li><a href="http://signalrmap.apphb.com/?random=true" target="_blank">View the demo</a></li>
<li><a href="https://github.com/JustinBeckwith/SignalRMap" target="_blank">Download the source code</a></li>
<li><a href="https://github.com/SignalR/SignalR" target="_blank">SignalR on GitHub</a></li>
<li><a href="http://www.bingmapsportal.com/ISDK/AjaxV7" target="_blank">Bing Maps SDK</a></li>
</ul>
