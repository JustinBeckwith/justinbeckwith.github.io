---
layout: post
title: WordPress and WebMatrix
category: WebMatrix
tags:
- featured
- MySQL
- PHP
- Programming
- WebMatrix
- WordPress
status: publish
type: post
published: true
excerpt: >
  After releasing WebMatrix 2 RC this week, I'm excited to head out to NYC for WordCamp 2012.  While I get ready to present tomorrow,  I figured I would share some of the amazing work the WebMatrix team has done to create a great experience for WordPress developers.
---

<img src="/images/2012/06/wp_title_header.png" alt="WordPress and WebMatrix"  />

After releasing WebMatrix 2 RC this week, I'm excited to head out to NYC for WordCamp 2012.  While I get ready to present tomorrow,  I figured I would share some of the amazing work the WebMatrix team has done to create a great experience for WordPress developers.  For a more complete overview of the WebMatrix 2 RC, check out <a href="http://vishaljoshi.blogspot.com/2012/06/announcing-webmatrix-2-rc.html" target="_blank">Vishal Joshi's blog post</a>.

If you want to skip all of this and just download the bits, here you go:
<p><a href="http://bit.ly/L77V6w" target="_blank"><img style="display: inline" title="image" alt="image" src="http://lh5.ggpht.com/-lm1GuUL20p8/T9HReoCZk7I/AAAAAAAABU4/uO7oVvNCGPQ/image%25255B4%25255D.png?imgmax=800" width="170" height="45"></a></p>

<h3>Welcome to WebMatrix</h3>

WebMatrix gives you a couple of ways to get started with your application.  Anything we do is going to be focused on building web applications, with as few steps as possible.  WebMatrix supports opening remote sites, opening local sites, creating new sites with PHP, or creating an application by starting with the Application Gallery.

<a href="/images/2012/06/wp_start_screen.png">
<img src="/images/2012/06/wp_start_screen.png" alt="Welcome to WebMatrix" />
</a>

<h3>The Application Gallery</h3>

We work with the community to maintain a list of open source applications that just work with WebMatrix on the Windows platform.  This includes installing the application locally, and deploying to Windows Server or Windows Azure:

<a href="/images/2012/06/wp_app_gallery.png">
<img src="/images/2012/06/wp_app_gallery.png" alt="WebMatrix application gallery" />
</a>

<h3>Install PHP and MySQL Automatically</h3>
When you pick the application you want to install, WebMatrix knows what dependencies need to be installed on your machine.  This means you don't need to set up a web server, install and configure MySQL, mess around with the MySQL command line - none of that.  It all just happens auto-magically.

<a href="/images/2012/06/wp_dependencies.png">
<img src="/images/2012/06/wp_dependencies.png" alt="Install and setup automatically" />
</a>

<h3>The Dashboard</h3>
After installing WordPress and all of it's dependencies, WebMatrix provides you with a dashboard that's been customized for WordPress.  We open up an extensibility model that makes it easier for open source communities to plug into WebMatrix, and we've been working with several groups to make sure we provide this kind of experience:

<a href="/images/2012/06/wp_dashboard.png">
<img src="/images/2012/06/wp_dashboard_clipped.png" alt="WordPress Dashboard" />
</a>

<h3>Protected Files</h3>
When you move into the files work space, you'll notice a lock file next to many of the files in the root.  We worked with the WordPress community to define a list of files that are protected in WordPress.  These are files that power the core of WordPress, and probably shouldn't be changed:

<a href="/images/2012/06/wp_locked_files.png">
<img src="/images/2012/06/wp_locked_files.png" alt="Locked system files" />
</a>

We won't stop you from editing the file, but hopefully this prevents people from making mistakes:

<a href="/images/2012/06/wp_lock_warning.png">
<img src="/images/2012/06/wp_lock_warning.png" alt="WebMatrix saves you from yourself"  />
</a>

<h3>HTML5 & CSS3 Tools</h3>
The HTML editor in WebMatrix has code completion, validation, and formatting for HTML5.  The editor is really, really good.  The CSS editor includes code completion, validation, and formatting for CSS3, including the latest and greatest CSS3 modules.  We also include support for CSS preprocessors like LESS and Sass.

I think my favorite part about the CSS editor is the way it makes dealing with color easier.  If you start off a color property, WebMatrix will look at the current CSS file, and provide a palette built from the other colors used throughout your site.  This prevents you from having 17 shades of the mostly same color blue:

<a href="/images/2012/06/wp_color_pallette.png">
<img src="/images/2012/06/wp_color_pallette.png" alt="The CSS Color Palette"  />
</a>

If you want to add a new color, we also have a full color picker.  This thing is awesome - my favorite part is the eye dropper that lets you choose colors in other applications.

<a href="/images/2012/06/wp_color_picker.png">
<img src="/images/2012/06/wp_color_picker.png" alt="The CSS Color Picker" />
</a>

<h3>PHP Code Completion</h3>

When you're ready to start diving into PHP, we include a fancy new PHP editor.  It provides code completion with documentation from php.net, and a lot of other little niceties that make writing PHP easier:
<a href="/images/2012/06/wp_php_intellisense.png">
<img src="/images/2012/06/wp_php_intellisense.png" alt="PHP Code Completion" />
</a>


<h3>WordPress Code Completion</h3>
So you've written some PHP, but now you want to start using the built-in functions available in WordPress.  We worked with the WordPress community to come up with a list of supported functions, along with documentation on how they work.  Any open source application in the gallery can provide this kind of experience:
<a href="/images/2012/06/wp_intellisense.png">
<img src="/images/2012/06/wp_intellisense.png" alt="WordPress specific Code Completion" />
</a>

<h3>MySQL Database Editor</h3>
If you need to make changes directly to the database, WebMatrix has a full featured MySQL editor built right into the product.  You can create tables, manage keys, or add data right through the UI.  No command line needed.
<a href="/images/2012/06/wp_mysql.png">
<img src="/images/2012/06/wp_mysql.png" alt="MySQL Database Manager" />
</a>

<h3>Remote Editing</h3>
If you need to make edits to a live running site, we can do that to.  Just enter your connection information (FTP or Web Deploy), and you can start editing your files without dealing with a FTP client:
<a href="/images/2012/06/wp_start_remote.png">
<img src="/images/2012/06/wp_start_remote.png" alt="Open a remote site"  />
</a>

After you make your changes, just save the file to automatically upload it to your server:
<a href="/images/2012/06/wp_remote_code.png">
<img src="/images/2012/06/wp_remote_code.png" alt="Edit files remotely" />
</a>


<h3>Easy Publishing</h3>
When you're ready to publish your application, you have the choice of using FTP or Web Deploy.  If you use Web Deploy, we can even publish your database automatically along with the files in your WordPress site.  When you make subsequent publish calls, only the changed files are published:

<a href="/images/2012/06/wp_publish.png">
<img src="/images/2012/06/wp_publish.png" alt="Easy Publishing" />
</a>


<h3>More Information</h3>
If you would like some more information to help you get started, check out some of these links:

<ul>
<li><a href="http://bit.ly/LG7gs8" target="_blank">WebMatrix on Microsoft.com</a></li>
<li><a href="https://twitter.com/#!/webmatrix" target="_blank">WebMatrix on Twitter</a></li>
<li><a href="https://github.com/MicrosoftWebMatrix" target="_blank">WebMatrix on GitHub</a></li>
<li><a href="http://webmatrix.uservoice.com" target="_blank">WebMatrix on UserVoice</a></li>
<li><a href="http://www.microsoft.com/Web/webmatrix/optimize.aspx" target="_blank">WebMatrix and Open Source Applications</a></li>
<li><a href="http://vishaljoshi.blogspot.com/2012/06/announcing-webmatrix-2-rc.html" target="_blank">Vishal Joshi's blog post</a></li>
</ul>
<br />
<br />
<h2>Happy Coding!</h2>
