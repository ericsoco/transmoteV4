/**
 * App main entry point (require.js config).
 * Called by require.js via data-main="js/main" in <script src="require.js"> in index.html.
 */
 require.config({

	paths: {
		'domReady':				"./lib/domReady",
		'handlebars':			"./lib/handlebars-v2.0.0",
		'jquery':				"./lib/jquery-2.1.3",
		'page':					"./lib/page"/*,
		'json':					"libs/json",
		'json2':				"libs/json2",
		'text':					"libs/text"*/
	},

	shim: {
		'handlebars': {
			exports: "Handlebars"
		},
	}

});

require(

	[
		'domReady',
		'TransmoteV4'
	],

	function (domReady, TransmoteV4) {

		'use strict';

		domReady(function () {
			TransmoteV4.init();
		});

	}

);
