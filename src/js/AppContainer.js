define(

	[
		'jquery',
		'ProjectModelStore',
		'templates',
		'pages/IndexPage',
		'pages/ProjectPage',
		'pages/MissingPage'
	],

	function ($, ProjectModelStore, templates, IndexPage, ProjectPage, MissingPage) {

		'use strict';

		var pendingPageData;

		return {

			$el: null,

			init: function () {
				this.render();
				if (pendingPageData) {
					this.displayPage(pendingPageData);
				}
				return this;
			},

			render: function () {
				this.$el = $('#main');

				var headerHTML = templates['header']({});
				var mainContentHTML = templates['mainContent']();
				var footerHTML = templates['footer']({});

				this.$el.append(headerHTML);
				this.$el.append(mainContentHTML);
				this.$el.append(footerHTML);
			},

			displayPage: function (pageData) {
				if (!pageData) { return; }

				if (!this.$el) {
					pendingPageData = pageData;
					return;
				}

				switch (pageData.path) {
					case 'index':
						ProjectPage.hide();
						MissingPage.hide();
						IndexPage.show();
						break;
					case 'project':
						IndexPage.hide();
						MissingPage.hide();
						ProjectPage.show(ProjectModelStore.getProjectModel(pageData.projectId));
						break;
					case '404':
						IndexPage.hide();
						ProjectPage.hide();
						MissingPage.show();
				}
			}

		};

	}
	
);
