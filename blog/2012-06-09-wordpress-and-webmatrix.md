---
slug: '2012/06/09/wordpress-and-webmatrix'
title: 'WordPress and WebMatrix'
date: '2012-06-09'
authors:
  - justin
tags:
  - featured
  - mysql
  - php
  - programming
  - webmatrix
  - wordpress
description: "After releasing WebMatrix 2 RC this week, I'm excited to head out to NYC for WordCamp 2012. While I get ready to present tomorrow, I figured I would share some of the amazing work the WebMatrix team has done to create a great experience for WordPress developers."
---

![WordPress and WebMatrix](/img/2012/06/wp_title_header.png)

After releasing WebMatrix 2 RC this week, I'm excited to head out to NYC for WordCamp 2012. While I get ready to present tomorrow, I figured I would share some of the amazing work the WebMatrix team has done to create a great experience for WordPress developers. For a more complete overview of the WebMatrix 2 RC, check out [Vishal Joshi's blog post](http://vishaljoshi.blogspot.com/2012/06/announcing-webmatrix-2-rc.html).

If you want to skip all of this and just download the bits, here you go:

<!--truncate-->

[![image](http://lh5.ggpht.com/-lm1GuUL20p8/T9HReoCZk7I/AAAAAAAABU4/uO7oVvNCGPQ/image%25255B4%25255D.png?imgmax=800 'image')](http://bit.ly/L77V6w)

### Welcome to WebMatrix

WebMatrix gives you a couple of ways to get started with your application. Anything we do is going to be focused on building web applications, with as few steps as possible. WebMatrix supports opening remote sites, opening local sites, creating new sites with PHP, or creating an application by starting with the Application Gallery.

![Welcome to WebMatrix](/img/2012/06/wp_start_screen.png)

### The Application Gallery

We work with the community to maintain a list of open source applications that just work with WebMatrix on the Windows platform. This includes installing the application locally, and deploying to Windows Server or Windows Azure:

![WebMatrix application gallery](/img/2012/06/wp_app_gallery.png)

### Install PHP and MySQL Automatically

When you pick the application you want to install, WebMatrix knows what dependencies need to be installed on your machine. This means you don't need to set up a web server, install and configure MySQL, mess around with the MySQL command line - none of that. It all just happens auto-magically.

![Install and setup automatically](/img/2012/06/wp_dependencies.png)

### The Dashboard

After installing WordPress and all of it's dependencies, WebMatrix provides you with a dashboard that's been customized for WordPress. We open up an extensibility model that makes it easier for open source communities to plug into WebMatrix, and we've been working with several groups to make sure we provide this kind of experience:

![WordPress Dashboard](/img/2012/06/wp_dashboard_clipped.png)

### Protected Files

When you move into the files work space, you'll notice a lock file next to many of the files in the root. We worked with the WordPress community to define a list of files that are protected in WordPress. These are files that power the core of WordPress, and probably shouldn't be changed:

![Locked system files](/img/2012/06/wp_locked_files.png)

We won't stop you from editing the file, but hopefully this prevents people from making mistakes:

![WebMatrix saves you from yourself](/img/2012/06/wp_lock_warning.png)

### HTML5 & CSS3 Tools

The HTML editor in WebMatrix has code completion, validation, and formatting for HTML5. The editor is really, really good. The CSS editor includes code completion, validation, and formatting for CSS3, including the latest and greatest CSS3 modules. We also include support for CSS preprocessors like LESS and Sass.

I think my favorite part about the CSS editor is the way it makes dealing with color easier. If you start off a color property, WebMatrix will look at the current CSS file, and provide a palette built from the other colors used throughout your site. This prevents you from having 17 shades of the mostly same color blue:

![The CSS Color Palette](/img/2012/06/wp_color_pallette.png)

If you want to add a new color, we also have a full color picker. This thing is awesome - my favorite part is the eye dropper that lets you choose colors in other applications.

![The CSS Color Picker](/img/2012/06/wp_color_picker.png)

### PHP Code Completion

When you're ready to start diving into PHP, we include a fancy new PHP editor. It provides code completion with documentation from php.net, and a lot of other little niceties that make writing PHP easier:
![PHP Code Completion](/img/2012/06/wp_php_intellisense.png)

### WordPress Code Completion

So you've written some PHP, but now you want to start using the built-in functions available in WordPress. We worked with the WordPress community to come up with a list of supported functions, along with documentation on how they work. Any open source application in the gallery can provide this kind of experience:
![WordPress specific Code Completion](/img/2012/06/wp_intellisense.png)

### MySQL Database Editor

If you need to make changes directly to the database, WebMatrix has a full featured MySQL editor built right into the product. You can create tables, manage keys, or add data right through the UI. No command line needed.
![MySQL Database Manager](/img/2012/06/wp_mysql.png)

### Remote Editing

If you need to make edits to a live running site, we can do that to. Just enter your connection information (FTP or Web Deploy), and you can start editing your files without dealing with a FTP client:
![Open a remote site](/img/2012/06/wp_start_remote.png)

After you make your changes, just save the file to automatically upload it to your server:
![Edit files remotely](/img/2012/06/wp_remote_code.png)

### Easy Publishing

When you're ready to publish your application, you have the choice of using FTP or Web Deploy. If you use Web Deploy, we can even publish your database automatically along with the files in your WordPress site. When you make subsequent publish calls, only the changed files are published:

![Easy Publishing](/img/2012/06/wp_publish.png)

### More Information

If you would like some more information to help you get started, check out some of these links:

- [WebMatrix on Microsoft.com](http://bit.ly/LG7gs8)
- [WebMatrix on Twitter](https://twitter.com/#!/webmatrix)
- [WebMatrix on GitHub](https://github.com/MicrosoftWebMatrix)
- [WebMatrix on UserVoice](http://webmatrix.uservoice.com)
- [WebMatrix and Open Source Applications](http://www.microsoft.com/Web/webmatrix/optimize.aspx)
- [Vishal Joshi's blog post](http://vishaljoshi.blogspot.com/2012/06/announcing-webmatrix-2-rc.html)

Happy Coding!
