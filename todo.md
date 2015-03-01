[RUN]
local dev: `grunt` will build and start up server.
local deploy: `grunt deploy` to build to build/deploy/, start MAMP, open local.transmote.com or local.v4.transmote.com.
	hostname configured in /etc/hosts;
	virtual host mapping in /Applications/MAMP/conf/apache/extra/httpd-vhosts.conf

[TODO]
( ) verify all existing projects look correct
	(img paths, copy, etc)
	( ) links to images (from project pages) get routed strangely
		cannot back-nav from images
(X) vertically center images within project thumbs
	img: { margin-top }, but have to update this on resize
	since it's relative to image height (which changes based on container width)
( ) section headers wrap on iphone;
	make font sizes smaller in media query.
( ) meta-blurb at top of home page (what/who is this? what do i do?)
( ) add projects supported in v3
	(X) d-fuse: add captions
	(X) dividing space: add captions
	(X) house of days
		(X) more footage?
	( ) picturing place
	( ) elastotron
		( ) new explo footage??
	( ) heresay
	----- more projects -----
	(X) breaking ground
	(X) anthony mccall
	( ) quickcomic
	( ) silly walks generator
	( ) terraformer
	( ) vectogram

	(X) display on homepage as second section,
		with shorter (very cropped) hero images
( ) should bot rewrites be [R=301]s?
	tried adding that flag but it broke rewrites in funny ways.
(X) get v3 working at transmote.com/v3
( ) get v4 working at transmote.com/v4
( ) test:
	( ) browsers
	(X) iphone
	( ) ipad
	(X) android
(X) deploy
	- note: `<base>` in index.html should contain current directory.
	  so, `<base href="/" />` at root; `<base href="/lab/v4/" />` in /lab/v4, etc.
	- note: phantom binary must be made executable (chmod 755);
	  must use linux-compiled binary (i'm currently on 1.9.2).
( ) verify google analytics is still working some time after launch

(X) support captions below video embeds
(X) support youtube embeds?
( ) social/sharing widgets
( ) improve pagespeed
	http://www.feedthebot.com/pagespeed/
	( ) minified JS (main.js) is still 158k??
	( ) cache TTL in htaccess
		http://www.feedthebot.com/pagespeed/leverage-browser-caching.html
	( ) concat CSS into one file if possible
( ) update analytics to use Google Tag Manager
	https://support.google.com/tagmanager/answer/2574305
( ) route /about, /contact? (could probably just leave as full pages)
	( ) point about/contact links to ./about and ./contact
		and open modals via that
	( ) client (page.js)
	( ) server (.htaccess)
( ) improve index page appearance while loading
( ) font-family mixins file (standardize across site)
	maybe also include box-shadows?

[BUGS]
( ) about/contact modal contains content of previously-clicked item, while animating in.
	repro: click about, then contact, or v.v.
( ) browser back navigation from images (clicked in project pages) does nothing
( ) visiting http://transmote.com/lab/v4/projects/vizthebay as UA: bot gets redirected incorrectly,
	to http://transmote.com/lab/v4/projects/vizthebay/?url=/lab/v4/projects/vizthebay
	HTML still looks fine but that URL is all jacked up...
( ) about/contact adds to history stack, minor nuisance.
( ) scroll down, click into project, nav back, scroll up and click transmote.com link in header.
	jumps down page because it's refreshing scroll position.
	maybe better to cache scroll position as History state.

[DONE]
(X) clear out unused libs, fonts, etc
(X) add alt to <img> tags
(X) 'about | contact' spacing is off in header
(X) seo
	(X) serverside rendering for SEO
		(X) render pages with phantomjs
		(X) get phantomjs running on dreamhost
		(X) get phantomjs rendering a page via php on dreamhost
			http://transmote.com/lab/v4/index-bots.php
		(X) clean up local and git commit
		(X) pass URL through index-bots.php into phantom
		(X) redirect bots to index-bots.php (via .htaccess)
			seems like deploy/lab/v4/.htaccess is almost working,
			but it's always sending /lab/v4/index.html to index-bots.php?url=
			where is redirect for all pages to /index.html? this seems to be why things are breaking...
			oh yeah, it's /projects/.htaccess, right? so i need to redirect bots there too...

			now fully-qualifying URL in index-bots.php, and it's pretty much working.
			however, output is unstyled...bots don't care but why is this different than
			when hitting index-bots.php directly?
			(note, testing by spoofing googlebot using devtools emulation.)
			--> it's the MIME type:
				Resource interpreted as Stylesheet but transferred with MIME type text/html:

			SUNDAY: there's some sort of redirect loop happening, most likely in my htaccess setup.
			Activity Monitor is showing many instances of phantomjs spun up simultaneously
			(and my compy is locking up!)
			may need to check htaccess logs to figure this out...
			is it possible that phantom is triggering htaccess rules and redirecting to itself?
			need to exclude phantom from rewrites....

			turned on LogLevel debug in httpd.conf, logs filling up in /Applications/MAMP/logs/apache_access.log
			i think the problem may be that my bot RewriteRule is acting on every resource request,
			not just the initial page request.
			need to limit the rewrite to act only on folder requests, not on file requests.

			>>>>> SUNDAY NIGHT: figured it out. <<<<<
			need to ensure bot rewrite rules don't affect file requests (add RewriteCond with !-f).
			have this set up on both /lab/v4/.htaccess and /lab/v4/projects/.htaccess.
			next steps:
			(X) get bot routing for index.html and '/' working
			(X) clean up .htaccess files; ensure bot rewrites with !-f are in place
			(X) update .htaccess files in /src and /src/projects,
				ensure they're copied correctly to build folders
			(X) same for index-bots.php and phantom-renderer.js
			(X) deploy to http://transmote.com/lab/v4 and test
				(X) verify unsafe access dump at bottom of page does not appear in prod
				(X) verify www.transmote.com works the same as transmote.com
					(rewrite in root .htaccess before bot rewrite)


	WEDS NIGHT:
	--> have to set absolute path; relative paths don't work in both <base> and in page.js.
	--> got php running by commenting out all AddType/AddHandler stuff in all
	    .htaccess files from lab/v4 up to root.
	(X) not, index-bots.php is returning nothing. is it actually running phantom?
		1. wrong url is hardcoded into index-bots.php
		2. running phantom from CLI via ./renderer/phantomjs ./renderer/phantom-renderer.js /lab/v4
			generates error: cannot execute binary file
			--> need to compile on DH server; file compiled on OSX cannot run on linux.
				https://groups.google.com/forum/#!topic/phantomjs/cgTH-jqCSGg
				http://stackoverflow.com/questions/8778513/how-can-i-setup-run-phantomjs-on-ubuntu
			    or just get binary?
			    Running 64-bit (x86_64) Debian Ubuntu 12.04.5 LTS (Precise Pangolin)
			(-) no support for Function.prototype.bind() (could only find linux binary 1.9.2)
				polyfill here: https://github.com/ariya/phantomjs/issues/10522#issuecomment-39248521
				--> doesn't seem to be a problem for my app...


	AS OF TUES NIGHT:
	trying to get site to run on transmote.com/lab/v4
	but there's path issues.
	base path is set in index.html,
	and *should* be copied in Router.js.
	also had it set in main.js require.config(), but removed that.

	once path issues resolved, test index-bots.php
	against http://www.feedthebot.com/pagespeed/


		(X) php-phantomJS
			(X) .htaccess: redirect bots to php 

			(X) do i even need php-phantomJS or can i just run:
				$response = exec('/path/to/phantomjs myscript.js');
				--> i can!

			(X) why is Router.js not accepting the url i'm passing in from php (thru phantom.js)?
				Router.js sees '/basic-request.php' instead of '/'.

			(X) timeout takes care of rendering;
				need to add functionality to pages to fire an event when they're completely loaded
				and handle that event in phantom (don't exit or log(documentHTML) until then.)
				don't really need images loaded tho, just html...
				but html isn't fully loaded until js runs and page.js renders it.
				so, event can fire after a page calls render().
				(how to handle it in phantomjs?)

			(X) SUNDAY: almost working but not quite...
				something is causing the app to init multiple times.
				take a careful look at the console logs and track it down...
				(note: i've turned off all compression/optimization/etc in gruntfile -> deploy)
				(also: does spinning up phantom take many seconds? why always so long to refresh basic_request.php?
					concerned that would make it an unacceptable solution for bot redirection/SEO...)

				note: the problem here might not be with multiple init cycles,
				but instead with not clearing out DOM when new page is created.
				there's an accumulation of pages at the bottom;
				just need to keep that from happening.

			i think this is mostly working,
			but i need to write a .js for phantom to run that will pass a url
			into Router.js, instead of letting it read window.location and
			show a 404 page because it doesn't know what to do with basic-request.php.

			trouble running php -> phantom on dreamhost?
			https://discussion.dreamhost.com/thread-137608.html
			more (not DH-specific):
			https://github.com/ariya/phantomjs/issues/11463
			http://michielve.blogspot.com/2013/04/phantomjs-cookie.html

			to install php-phantomJS, create a composer.phar file (composer runtime)
			$ curl -sS https://getcomposer.org/installer | php
			then run this in a folder with only composer.phar in it:
			$ php composer.phar require "jonnyw/php-phantomjs:3.*"

			debug php:
			<?php
			ini_set('display_errors', 'On');
			error_reporting(E_ALL);



		(-) php
			basic concept: same thing i did in v3,
			just add a php script to html, that pulls data from projects.json.
			keep it super simple, just get the text and images on the page.
		(-) phantom.js + node
			basic concept:
			1. redirect search engine bots to a node server via .htaccess
			2. node spawns a phantom process
			3. phantom renders HTML and returns to bot.

			however, can't run node on dreamhost shared server.
			the following process might work...
			1. redirect search engine bots to a phantom server via php
				http://stackoverflow.com/questions/20202407/how-to-execute-phantomjs-from-php
			2. requests returned by phantom are served directly to bots

			http://stackoverflow.com/questions/26896787/installing-phantomjs-on-server
			http://blog.42floors.com/sever-side-rendering-single-page-apps-using-phantomjs-node-js/

			http://wiki.dreamhost.com/Node.js <-- DO NOT INSTALL NODE ON DREAMHOST SHARED SERVER! against TOS.
			http://backbonetutorials.com/seo-for-single-page-apps/
			http://thedigitalself.com/blog/seo-and-javascript-with-phantomjs-server-side-rendering
	(X) or maybe it's fine as-is?
		test with http://www.feedthebot.com/tools/
(X) check TODO from transmote V4.0: missing anything else?
(X) copy over all required markup from v4/index.html
	(google analytics, meta for ios/mobile, etc.)
(X) serverside routing (.htaccess rewrites)
	(X) move .htaccess files into their proper folders
	(X) copy as non-hidden files to server-config
	(X) add tasks to gruntfile to:
		(X) copy as non-hidden files to a folder somewhere
		(X) copy to corresponding folders in build/
(X) when pages show/hide, don't just add/remove 'closed' class,
	actually pull out their DOM (and cache in memory).
	(see MissingPage.js for example)
	(X) IndexPage
	(X) ProjectPage
(X) 404 page (MissingPage.js)
	(-) bounce-loop the gif:
		https://github.com/buzzfeed/libgif-js
	(X) responsiveize
	(X) text appears in wrong place briefly before gif loads.
		put a placeholder div in for the gif
(X) eliminate blue outline around focused/clicked elements
(X) get modals working again
	(X) trim bootstrap down to just modals, no other JS components (trim CSS too?)
(X) ensure clicking images to view file URL directly is not routed.
(X) compress all CSS into one stylesheet
	(X) rename individual sass files to "_*.*" ("sass partial")
(-) perf: make project thumbs use background-image instead of img?
(X) restore scroll position when navigating back to index page
(X) scroll position when navigating in/out of project pages? what happens here? what should happen?

