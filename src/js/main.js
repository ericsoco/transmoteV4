/**
 * App main entry point (require.js config).
 * Called by require.js via data-main="js/main" in <script src="require.js"> in index.html.
 */
 require.config({

	paths: {
		'domReady':				'./lib/domReady',
		'handlebars':			'./lib/handlebars-v2.0.0',
		'jquery':				'./lib/jquery-2.1.3',
		'page':					'./lib/page',
		'bootstrap':			'./lib/bootstrap'
	},

	shim: {
		'handlebars': {
			exports: "Handlebars"
		},
		'bootstrap': {
			deps: ['jquery'],
			exports: "$"
		}
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
