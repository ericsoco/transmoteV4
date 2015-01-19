define(

	[
		'jquery',
		'../templates',
		'ProjectModelStore'
	],

	function ($, templates, ProjectModelStore) {

		'use strict';

		return {

			$el: null,

			show: function () {
				if (!this.$el) {
					this.$el = this.render();
				}

				this.$el.removeClass('closed');

				return this.$el;
			},

			hide: function () {
				if (!this.$el) { return; }

				this.$el.addClass('closed');
				return this.$el;
			},

			render: function () {
				var projectThumbHTML = templates['projectThumbList']({
					projects: ProjectModelStore.getProjectModels()
				});

				var $el = $(projectThumbHTML);
				$('#content').append($el);

				return $el;
			}

		};

	}
	
);
