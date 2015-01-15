define(

	[
		'jquery'
	],

	function ($) {

		'use strict';

		function render (projectModel) {
			// TODO: render via template
			// stuff into container element (out of DOM)
			// return entire element

			// temp for testing:
			projectModel.dummy = 'temp';
			return $('<div>');
		}

		return {

			$el: null,

			show: function (projectModel) {
				if (!this.$el) {
					this.$el = render(projectModel);
				}

				console.log(">>>>> ProjectPage.show() project:", projectModel);

				this.$el.removeClass('hidden');

				return this.$el;
			},

			hide: function () {
				if (!this.$el) { return; }

				console.log(">>>>> ProjectPage.hide()");

				this.$el.addClass('hidden');
				return this.$el;
			}

		};

	}
	
);
