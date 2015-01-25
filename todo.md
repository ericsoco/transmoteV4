[TODO]
( ) when pages show/hide, don't just add/remove 'closed' class,
	actually pull out their DOM (and cache in memory).
	(see MissingPage.js for example)
( ) 404 page (MissingPage.js)
	( ) bounce-loop the gif:
		https://github.com/buzzfeed/libgif-js
	( ) text appears in wrong place briefly before gif loads.
		put a placeholder div in for the gif
( ) improve index page appearance while loading
( ) route /about, /contact
	( ) point about/contact links to ./about and ./contact
		and open modals via that
	( ) client (page.js)
	( ) server (.htaccess)
( ) serverside rendering for SEO (phantom.js?)
( ) serverside routing (.htaccess rewrites)
( ) deploy
( ) add projects supported in v3

[BUGS]


[DONE]
(X) eliminate blue outline around focused/clicked elements
(X) get modals working again
	(X) trim bootstrap down to just modals, no other JS components (trim CSS too?)
(X) ensure clicking images to view file URL directly is not routed.
(X) compress all CSS into one stylesheet
	(X) rename individual sass files to "_*.*" ("sass partial")
(-) perf: make project thumbs use background-image instead of img?
(X) restore scroll position when navigating back to index page
(X) scroll position when navigating in/out of project pages? what happens here? what should happen?

