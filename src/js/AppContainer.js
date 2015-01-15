define(

	[
		'jquery',
		'pages/IndexPage',
		'pages/ProjectPage',
		'pages/MissingPage'
	],

	function ($, IndexPage, ProjectPage, MissingPage) {

		'use strict';

		var pendingPageData;

		return {

			$el: null,

			init: function () {
				this.$el = $('#main');
				if (pendingPageData) {
					this.displayPage(pendingPageData);
				}
				return this;
			},

			displayPage: function (pageData) {
				if (!pageData) { return; }

				if (!this.$el) {
					pendingPageData = pageData;
					return;
				}

				switch (pageData.path) {
					case 'index':
						IndexPage.show();
						ProjectPage.hide();
						MissingPage.hide();
						break;
					case 'project':
						IndexPage.hide();
						ProjectPage.show(pageData.projectId);
						MissingPage.hide();
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
