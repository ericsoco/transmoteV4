define(
	[
		'page'
	],

	function (page) {

		"use strict";

		function index () {
			console.log(">>>>> index page");
		}

		function project (context) {
			console.log(">>>>> project page; context:", context.params.project);
		}

		function fallthru () {
			console.log(">>>>> TODO: serve a 404");
		}

		return {

			init: function () {
				page.base('/');
				page('', index);
				page('projects/:project', project);
				page('*', fallthru);
				page();
			}

		};

	}

);
