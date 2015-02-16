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
					this.render();
				}
				$('#content').append(this.$el);

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

				// cache scroll position
				scrollPosition = $(window).scrollTop();

				this.$el.remove();

				return this.$el;
			},

			render: function () {
				this.$el = $(templates['index']({
					featuredProjects: {
						featured: true,
						projects: ProjectModelStore.getFeaturedProjectModels()
					},
					moreProjects: {
						featured: false,
						projects: ProjectModelStore.getMoreProjectModels()
					}
				}));
			}

		};

	}
	
);
