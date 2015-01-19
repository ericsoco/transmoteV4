define(

	[
		'jquery',
		'../templates'
	],

	function ($, templates) {

		'use strict';

		var currentProjectId;
		var renderedPages = {};
		var scrollPositions = {};

		return {

			$el: null,

			show: function (projectModel) {
				this.$el = this.render(projectModel);
				$('#content').append(this.$el);

				currentProjectId = projectModel.id;

				// restore scroll position if exists, or scroll to top
				var cachedScrollTop = scrollPositions[currentProjectId] || 0;
				$(window).scrollTop(cachedScrollTop);

				return this.$el;
			},

			hide: function () {
				if (!this.$el) { return; }

				// cache scroll position
				scrollPositions[currentProjectId] = $(window).scrollTop();

				this.$el.remove();
				return this.$el;
			},

			render: function (projectModel) {

				var projectPageHTML;
					
				// Fetch from cache if available; else, render
				projectPageHTML = renderedPages[projectModel.id];
				if (!projectPageHTML) {
					projectPageHTML = templates['projectPage'](projectModel);
					renderedPages[projectModel.id] = projectPageHTML;
				}

				return $(projectPageHTML);
			}

		};

	}
	
);
