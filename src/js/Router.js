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
				page.base(document.querySelector('head base').getAttribute('href'));
				page('', index);
				page('projects/:project', project);
				page(/^.+\.(jpg|png|gif|bmp)$/, passthru);
				page('*', notFound);
				page();
			}

		};

	}

);
