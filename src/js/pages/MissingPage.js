define(

	[
		'jquery',
		'../templates',
	],

	function ($, templates) {

		'use strict';

		return {

			$el: null,

			show: function () {
				if (!this.$el) {
					this.render();
				}

				$('#content').append(this.$el);

				return this.$el;
			},

			hide: function () {
				if (!this.$el) { return; }

				this.$el.remove();
				return this.$el;
			},

			render: function (projectModel) {
				this.$el = $(templates['missingPage']());
				this.$el.find('img').on('load', function (event) {
					console.log(">>>>> img loaded");
					this.$el.find('.copy').removeClass('hidden');
				}.bind(this));
			}

		};

	}
	
);
