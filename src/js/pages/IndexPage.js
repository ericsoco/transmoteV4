define(

	[
		'jquery',
		'../templates',
		'ProjectModelStore'
	],

	function ($, templates, ProjectModelStore) {

		'use strict';

		var scrollPosition;

		return {

			$el: null,

			show: function () {
				if (!this.$el) {
					this.$el = this.render();
				}

				this.$el.removeClass('closed');

				// restore scroll position if exists.
				// have to do this on a timeout, for some reason.
				if (scrollPosition) {
					window.setTimeout(function () {
						$(window).scrollTop(scrollPosition);
					}, 1);
				}

				return this.$el;
			},

			hide: function () {
				if (!this.$el) { return; }

				scrollPosition = $(window).scrollTop();

				// cache scroll position
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
