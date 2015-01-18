define(

	[
		'jquery'
	],

	function ($) {

		'use strict';

		return {

			$el: null,

			show: function (projectModel) {
				if (!this.$el) {
					this.$el = this.render(projectModel);
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
			},

			render: function () {

				// TODO: implement
				return $('#main');

				/*
				var $main = $('#main');

				var headerHTML = templates['header']({});
				var projectThumbHTML = templates['projectThumbList']({
					projects: ProjectModelStore.getProjectModels()
				});
				var footerHTML = templates['footer']({});

				$main.append(headerHTML);
				$main.append(projectThumbHTML);
				$main.append(footerHTML);

				return $('#projectThumbList');
				*/
			}

		};

	}
	
);
