define(

	[
		'jquery'
	],

	function ($) {

		'use strict';

		function render () {
			// TODO: render via template
			// stuff into container element (out of DOM)
			// return entire element

			// temp for testing:
			return $('<div>');
		}

		return {

			$el: null,

			show: function () {
				if (!this.$el) {
					this.$el = render();
				}

				console.log(">>>>> IndexPage.show()");

				this.$el.removeClass('hidden');

				return this.$el;
			},

			hide: function () {
				if (!this.$el) { return; }

				console.log(">>>>> IndexPage.hide()");
				
				this.$el.addClass('hidden');
				return this.$el;
			}

		};

	}
	
);
