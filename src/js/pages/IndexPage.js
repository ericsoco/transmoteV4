define(

	[
		'jquery',
		'../templates',
		'ProjectModelStore'/*,
		'require-css!../css/projectThumb'*/
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
				var $main = $('#main');

				var headerHTML = templates['header']({});
				var projectThumbHTML = templates['projectThumbList']({
					projects: ProjectModelStore.getProjectModels()
				});
				var footerHTML = templates['footer']({});

				var $el = $(projectThumbHTML);

				$main.append(headerHTML);
				$main.append($el);
				$main.append(footerHTML);

				return $el;
			}

		};

	}
	
);
