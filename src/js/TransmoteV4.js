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

				/*
				document.body.innerHTML = templates['main']({
					headerTitle: 'Header Title',
					content: 'Proactively synthesize cost effective platforms via backward-compatible products. Collaboratively fabricate mission-critical services rather than just in time deliverables. Authoritatively orchestrate go forward services for revolutionary functionalities.',
					footerTitle: 'Footer Title'
				});
				*/
			}

		};

	}
	
);
