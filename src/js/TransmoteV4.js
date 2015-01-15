define(

	[
		'jquery',
		'ProjectModelStore',
		'Router'
	],

	function ($, ProjectModelStore, Router) {

		'use strict';

		var projectModelStore;

		return {

			$el: null,

			init: function () {

				this.$el = $("#main");

				Router.init();

				projectModelStore = ProjectModelStore.init();
				// this.$el.append(projectModelStore.$el);
				projectModelStore.loadProjects("data/projects.json", function () {
					console.log(">>>>> projects loaded.");
					// HistoryManager.init(projectModelStore);
					// projectModelStore.$el.on("appStateChange", HistoryManager.setAppState);
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
			},

			render: function () {

			}

		};

	}
	
);
