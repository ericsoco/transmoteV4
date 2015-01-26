[RUN]
local dev: `grunt` will build and start up server.
local deploy: `grunt deploy` to build to build/deploy/, start MAMP, open local.transmote.com or local.v4.transmote.com.
	hostname configured in /etc/hosts;
	virtual host mapping in /Applications/MAMP/conf/apache/extra/httpd-vhosts.conf

[TODO]
( ) serverside rendering for SEO (phantom.js?)
( ) check TODO from transmote V4.0: missing anything else?
( ) test on mobile:
	( ) ios
	( ) android
( ) deploy

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

