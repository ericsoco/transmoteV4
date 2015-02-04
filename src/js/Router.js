define(
	
	[
		'page',
		'AppContainer'
	],

	function (page, AppContainer) {

		"use strict";

		function index (context, next) {
			AppContainer.displayPage({
				path: 'index'
			});
		}

		function project (context, next) {
			AppContainer.displayPage({
				path: 'project',
				projectId: context.params.project
			});
		}

		function passthru (context, next) {
			window.location = '/' + context.path;
		}

		function notFound (context, next) {
			AppContainer.displayPage({
				path: '404'
			});
		}

		return {

			init: function () {
				var baseElement = document.querySelector('head base');

				// Use the <base> element to determine the root path for the router
				// if it exists (it will not when this is run by the phantom.js renderer)
				if (baseElement) {
					page.base(baseElement.getAttribute('href'));
				} else {
					page.base('/');
				}

				// IndexPage
				page('', index);

				// ProjectPage
				page('projects/:project', project);

				// image files
				page(/^.+\.(jpg|png|gif|bmp)$/, passthru);

				// MissingPage
				page('*', notFound);

				// Exit the middleware
				page();
			}

		};

	}

);
