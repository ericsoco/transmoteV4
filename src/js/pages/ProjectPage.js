define(

	[
		'jquery',
		'../templates'
	],

	function ($, templates) {

		'use strict';

		var renderedPages = {};

		return {

			$el: null,

			show: function (projectModel) {
				this.$el = this.render(projectModel);
				$('#content').append(this.$el);

				return this.$el;
			},

			hide: function () {
				if (!this.$el) { return; }

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
