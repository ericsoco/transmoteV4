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

				window.addEventListener('resize', this.throttle(this.onResize.bind(this)));

				// Center images if not running in phantom
				if (!window.phantom) {
					this.onResize();
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
			},

			throttle: function (fn, delay) {
				var lastCall,
				    timeout;

				if (!delay) {
					delay = 250;
				}

				return function () {
					var now = new Date().getTime();
					if (lastCall && now - lastCall < delay) {
						clearTimeout(timeout);
						timeout = setTimeout(function () {
							lastCall = now;
							fn();
						}, delay);
					} else {
						lastCall = now;
						fn();
					}
				};
			},

			onResize: function () {
				if (!this.projectModelThumbOffsets) {
					this.buildProjectModelThumbOffsets();
				}

				// measure each img height,
				// and set its margin-top to keep img centered.
				this.$el.find('.project-thumb').each(this.centerThumb.bind(this));
			},

			centerThumb: function (i, thumbEl) {
				var $thumb = $(thumbEl),
				    $img = $thumb.find('img'),
				    thumbHeight = $thumb.height(),
				    imgHeight = $img && $img.height();

				if (!imgHeight) {
					$img[0].addEventListener('load', function (event) {
						this.centerThumb(i, thumbEl);
					}.bind(this));
				}

				// $img.css('marginTop', 0.5 * (thumbHeight - imgHeight));
				$img.css('marginTop', (0.5 + this.projectModelThumbOffsets[i]) * (thumbHeight - imgHeight));
			},

			buildProjectModelThumbOffsets: function () {
				this.projectModelThumbOffsets = [];
				var models = ProjectModelStore.getFeaturedProjectModels(),
				    projectName;

				for (projectName in models) {
					this.projectModelThumbOffsets.push(models[projectName].thumbOffsetY || 0);
				}
				models = ProjectModelStore.getMoreProjectModels();
				for (projectName in models) {
					this.projectModelThumbOffsets.push(models[projectName].thumbOffsetY || 0);
				}
			}

		};

	}
	
);
