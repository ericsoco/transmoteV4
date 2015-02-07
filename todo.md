[RUN]
local dev: `grunt` will build and start up server.
local deploy: `grunt deploy` to build to build/deploy/, start MAMP, open local.transmote.com or local.v4.transmote.com.
	hostname configured in /etc/hosts;
	virtual host mapping in /Applications/MAMP/conf/apache/extra/httpd-vhosts.conf

[TODO]
( ) test:
	( ) browsers
	( ) ios
	( ) android
( ) clear out unused libs, fonts, etc
( ) deploy

( ) seo
	( ) serverside rendering for SEO
		(X) render pages with phantomjs
		(X) get phantomjs running on dreamhost
		(X) get phantomjs rendering a page via php on dreamhost
			http://transmote.com/lab/v4/index-bots.php
		( ) clean up local and git commit
		( ) pass URL through index-bots.php into phantom
		( ) redirect bots to index-bots.php (via .htaccess)


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


		( ) php-phantomJS
			( ) .htaccess: redirect bots to php 

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
( ) improve pagespeed
	http://www.feedthebot.com/pagespeed/
( ) update analytics to use Google Tag Manager
	https://support.google.com/tagmanager/answer/2574305
( ) add projects supported in v3
( ) route /about, /contact? (could probably just leave as full pages)
	( ) point about/contact links to ./about and ./contact
		and open modals via that
	( ) client (page.js)
	( ) server (.htaccess)
( ) improve index page appearance while loading

[BUGS]
( ) about/contact adds to history stack, minor nuisance.
( ) scroll down, click into project, nav back, scroll up and click transmote.com link in header.
	jumps down page because it's refreshing scroll position.
	maybe better to cache scroll position as History state.

[DONE]
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

