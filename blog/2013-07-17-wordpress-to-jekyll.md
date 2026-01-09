---
slug: '2013/07/17/wordpress-to-jekyll'
title: 'Switching from Wordpress to Jekyll'
date: '2013-07-17'
authors:
  - justin
tags:
  - featured
  - meta
  - jekyll
description: "Over the last few weeks, I've been slowly moving my blog from Wordpress to Jekyll. The change has been a long time coming, and so far I couldn't be happier with the results. I thought it may be interesting to make the ultimate meta post, and write a blog post about my blog. You can take a look at the source code on GitHub. Jekyll takes a bit of a different approach to serving up a blog. Instead of the traditional model of hosting an active web application with PHP/Ruby/.NET/whatever and a database, you simply post static pages."
---

![jekyll is fun](/img/posts/wordpress-to-jekyll/jekyll.png)

Over the last few weeks, I've been slowly moving my blog from Wordpress to [Jekyll](http://jekyllrb.com/). The change has been a long time coming, and so far I couldn't be happier with the results. I thought it may be interesting to make the ultimate meta post, and write a blog post about my blog. You can take a look at the [source code on GitHub](https://github.com/JustinBeckwith/justinbeckwith.github.io).

## What's wrong with Wordpress?

<!--truncate-->

In short? Absolutely nothing. I love Wordpress. I've been using it across multiple sites for years, I worked on a [product that supported Wordpress development](http://webmatrix.com), I've even blogged here about [speaking at WordCamp](http://jbeckwith.com/2012/06/09/wordpress-and-webmatrix/). The problem is that for me, the costs of a full featured blog engine outweigh the benefits.

![Every damn time.](/img/posts/wordpress-to-jekyll/update.png)

Let me give you an example. My post rate on this blog is atrocious. Part of the reason is that like most people I'm freakishly busy, but there's another nagging reason - every time I sit down to write a post, I'm burdened with maintenance costs. On the few evenings I have the time or content to write a post, it would usually go like this:

```text
9:00 PM - Kids are in bed. Time to sit down and write that blog post.
9:05 PM - I'm logged into the Wordpress admin site. Looks like I need an update. Better install it.
9:15 PM - Oh, I have some permissions error when I try to download. I'll do it manually.
9:35 PM - Alright, I backed up my database, downloaded the new Wordpress version and did a manual upgrade.
9:40 PM - My plugins are broken. Dammit.
9:45 PM - Updating my plugins causes another access denied error.
9:50 PM - I had to use putty and remember the flags for chmod. F-me.
10:00 PM - That was fun. I'm going to bed.
```

Running a Wordpress blog comes with a cost. You need to keep it updated. You need to find the right plugins, and keep those updated. You need to back up databases. You need to have a strategy for backing up changes to the theme. For someone that's posting every week, these costs may be worth it. It just isn't worth it to me.

### Enter Jekyll

Jekyll takes a bit of a different approach to serving up a blog. Instead of the traditional model of hosting an active web application with PHP/Ruby/.NET/whatevs and a database, you simply post static pages. You write your posts in one of the supported markup languages (I use good ol' HTML), and then write the jekyll build tool to generate your static HTML pages. There are around 100 posts on setting up jekyll, [none better than the official documentation](http://jekyllrb.com/docs/home/) - so I won't go too deep into how jekyll works. I'll just share my setup.

#### Importing Wordpress

After playing around with the [quick start guide](http://jekyllrb.com/docs/quickstart/), I got started by importing the Wordpress data to script out the first version of the site. The jekyll site has a great section on [migrating from other blogs](http://jekyllrb.com/docs/migrations/), so I mostly followed their steps.

First, I downloaded my wordpress.xml file from the Wordpress admin:

![export](/img/posts/wordpress-to-jekyll/export.png)

Next I ran the import tool:

```sh
gem install hpricot
ruby -rubygems -e 'require "jekyll/jekyll-import/wordpressdotcom";
    JekyllImport::WordpressDotCom.process({ :source => "wordpress.xml" })'
```

This downloaded all of my existing posts, and created new posts with metadata in jekyll format (woo!). What it didn't do was download all of my images. To get around that, I just connected with my FTP client and downloaded my images directory into the root of my jekyll site.

#### Syntax Highlighting

One of the plugins I had installed on my Wordpress site was [SyntaxHighlighter Evolved](http://wordpress.org/plugins/syntaxhighlighter/). Jekyll comes with a built in syntax highlighting sysyntax using Pygments and Liquid:

```js
var logger = new winston.Logger({
  transports: [
    new winston.transports.Console(),
    new winston.transports.Skywriter({
      account: stName,
      key: stKey,
      partition: require('os').hostname() + ':' + process.pid,
    }),
  ],
});
logger.info('Started wazstagram backend');
```

That's all well and good but - the syntax highlighter wasn't quite as nice as I would like. I also didn't feel the need to lock myself into liquid for something that can be handled on the client. I chose to use [PrismJS](http://prismjs.com/), largely because I've used it in the past with success. Someone even wrote a fancy jekyll plugin to [generate your highlighted markup at compile time](http://gmurphey.com/2012/08/09/jekyll-plugin-syntax-highlighting-with-prism.html), if that's your thing.

#### --watch and livereload

As I worked on the site, I was making a lot of changes, rebuilding, waiting for the build to finish, and reloading the browser. To make some of this easier, I did a few things. Instead of saving my file, building, and running the server every time, you can just use the built in watch command:

```sh
jekyll serve --watch
```

This will run the server, watch for changes, and perform a build anytime something is modified on disk. The other side to this is refreshing the browser automatically. To accomplish that, I used [LiveReload](http://livereload.com/) with the Chrome browser plugin:

![LiveReload refreshes the browser after a change](/img/posts/wordpress-to-jekyll/livereload.png)

The OSX version of LiveReload lets you set a delay between noticing the change on the filesystem and refreshing the browser. You really want to set that to a second or two just to give jekyll enough time to compile the full site after the first change hits the disk.

#### RSS Feed

One of the pieces that isn't baked into jekyll is the construction of an RSS feed. The good news is that [someone already solved this problem](https://github.com/snaptortoise/jekyll-rss-feeds). This repository has a few great examples.

#### Archive by Category

One of the pieces I wanted to add was a post archive page. Building this was relatively straight forward - you create a list of categories used across all of the posts in your site. Next you render an excerpt for each post:

```html
{% raw %}
<div class="container">
  <div id="home">
    <h1>The Archive</h1>
    <div class="hrbar"> </div>
    <div class="categories">
      {% for category in site.categories %}
      <span><a href="#{{ category[0] }}">{{ category[0] }} ({{ category[1].size }})</a></span>
      <span class="dot"> </span>
      {% endfor %}
    </div>
    <div class="hrbar"> </div>
    <div class="all-posts">
      {% for category in site.categories %}
      <div>
        <a name="{{category[0]}}"></a>
        ### {{ category[0] }}
        <ul class="posts">
          {% for post in category[1] %}
          <li>
            <span>{{ post.date | date_to_string }}</span> »
            <a href="{{ post.url }}">{{ post.title }}</a>
          </li>
          {% endfor %}
        </ul>
      </div>
      {% endfor %}
    </div>
  </div>
</div>
{% endraw %}
```

For the full example, [check it out on GitHub](https://github.com/JustinBeckwith/justinbeckwith.github.io/blob/master/archive.html).

#### Disqus

I used [Disqus](http://disqus.com/) for my commenting and discussion engine. This probably isn't news to anyone, but disqus is pretty awesome. Without a backend database to power user sign ups and comments, it's easier to just hand this over to a third party service (and it's free!). One tip though - disqus has a 'discovery' feature turned on by default. It shows a bunch of links I don't want, and muddied up the comments. Here's where you can turn it off:

![turn off discovery under settings->discovery->Just comments](/img/posts/wordpress-to-jekyll/disqus.png)

#### Backups

With no database, backing up means just backing up the files. Good news everyone! I'm just using good ol [GitHub and a git repository](https://github.com/JustinBeckwith/justinbeckwith.github.io) to track changes and store my files. I keep local files in Dropbox just in case.

#### Hosting the bits

The coolest part of using Jekyll is that you can [host your site on GitHub - for free](https://help.github.com/articles/using-jekyll-with-pages). They build the site when you push changes, and even let you set up a [custom domain](https://help.github.com/articles/setting-up-a-custom-domain-with-pages).

#### What's Next?

Now that I've got the basic workflow for the site rolling (hopefully with less maintenance costs), the next piece I'll probably tackle is performance. Between Bootstrap, JQuery, and Prism I'm pushing a lot of JavaScript and CSS that should be bundled and minified. Until then, I'm just going to keep enjoying writing my posts in SublimeText and publishing with a git push. Let me know what you think!
