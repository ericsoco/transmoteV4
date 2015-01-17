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

				console.log(">>>>> IndexPage.show()");

				this.$el.removeClass('hidden');

				return this.$el;
			},

			hide: function () {
				if (!this.$el) { return; }

				console.log(">>>>> IndexPage.hide()");
				
				this.$el.addClass('hidden');
				return this.$el;
			},

			render: function () {
				var $el = $('#main');

				console.log(">>>>> render");
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
