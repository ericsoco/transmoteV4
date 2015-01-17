define(

	[
		'HandlebarsHelpers',
		'Router',
		'ProjectModelStore',
		'AppContainer',
	],

	function (HandlebarsHelpers, Router, ProjectModelStore, AppContainer) {

		'use strict';

		return {

			init: function () {
				HandlebarsHelpers.init();
				Router.init();

				ProjectModelStore.init().loadProjects("data/projects.json", function () {
					AppContainer.init();
				});
				
				// initModals();

				return this;

			}

		};

	}
	
);
