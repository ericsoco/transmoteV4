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

				this.$el.removeClass('hidden');

				return this.$el;
			},

			hide: function () {
				if (!this.$el) { return; }

				this.$el.addClass('hidden');
				return this.$el;
			},

			render: function () {
				var $el = $('#main');

				var headerHTML = templates['header']({});
				var projectThumbHTML = templates['projectThumbList']({
					projects: ProjectModelStore.getProjectModels()
				});
				var footerHTML = templates['footer']({});

				$el.append(headerHTML);
				$el.append(projectThumbHTML);
				$el.append(footerHTML);

				return $el;
			}

		};

	}
	
);
