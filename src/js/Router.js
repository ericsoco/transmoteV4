define(
	
	[
		'page',
		'AppContainer'
	],

	function (page, AppContainer) {

		"use strict";

		function index () {
			AppContainer.displayPage({
				path: 'index'
			});
		}

		function project (context) {
			AppContainer.displayPage({
				path: 'project',
				projectId: context.params.project
			});
		}

		function fallthru () {
			AppContainer.displayPage({
				path: '404'
			});
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
