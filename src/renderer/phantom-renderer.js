(function() {
	'use strict';

	var args = require('system').args;

	if (args.length < 2) {
		console.error('Usage: \'$ phantomjs phantom-renderer.js <url>\'');
		phantom.exit(1);
	}

	var url = args[1],
	    page = require('webpage').create(),
	    pageTimeout,
	    pageTimeoutDelay = 7000;

	// Do not return the rendered page until the app says it's complete.
	page.onCallback = function (data) {

		if (data && data.type === 'initialPageRendered') {

			if (pageTimeout) {
				clearTimeout(pageTimeout);
			}

			// Render screenshot to an image file
			// page.render('example.png');

			var documentHTML = page.evaluate(function () {
				return document.documentElement.innerHTML;
			});

			// Output result of page.open() to php.
			// There's probably a better way to return the HTML than echoing out to console,
			// and catching that in php's exec(), but I don't know what it is.
			console.log(documentHTML);

			phantom.exit(0);
		}

	};

	page.onInitialized = function () {
		pageTimeout = setTimeout(function () {
			console.error('Page timeout after ' + pageTimeoutDelay + 'ms.');
			phantom.exit(1);
		}, pageTimeoutDelay);
	};

	page.open(url, function (status) {

		if (status !== 'success') {
			console.error('Error loading page; status:', status);
			phantom.exit(1);
		}

	});

	/*
	page.onResourceRequested = function(request) {
	  console.log('Request ' + JSON.stringify(request, undefined, 4));
	};
	page.onResourceReceived = function(response) {
	  console.log('Receive ' + JSON.stringify(response, undefined, 4));
	};

	// Route `console.log()` calls from within the Page context to the main Phantom context (i.e. current `this`)
	page.onConsoleMessage = function(msg) {
		console.log(msg);
	};

	page.onInitialized = function() {
		timeoutRef = setTimeout(function(){
			console.error('Test Run Failed. Timeout Exceeded. Took longer than '+ timeLimit / 1000 +' seconds.');
			phantom.exit(1);
		}, timeLimit);
	};
	
	page.onAlert = function(message) {
		clearTimeout(timeoutRef);
		phantom.exit(0);
	};
	*/

})();