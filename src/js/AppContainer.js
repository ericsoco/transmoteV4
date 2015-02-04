define(

	[
		'jquery',
		'ProjectModelStore',
		'templates',
		'pages/IndexPage',
		'pages/ProjectPage',
		'pages/MissingPage',
		'bootstrap'
	],

	function ($, ProjectModelStore, templates, IndexPage, ProjectPage, MissingPage, Bootstrap) {

		'use strict';

		var pendingPageData;
		var $siteModal;

		return {

			$el: null,

			init: function () {
				this.render();

				if (pendingPageData) {
					this.displayPage(pendingPageData, true);
				}

				this.initModals();

				return this;
			},

			render: function () {
				this.$el = $('#main');

				var headerHTML = templates['header']({});
				var mainContentHTML = templates['mainContent']();
				var footerHTML = templates['footer']({});

				this.$el.append(headerHTML);
				this.$el.append(mainContentHTML);
				this.$el.append(footerHTML);
			},

			displayPage: function (pageData, notifyPhantom) {
				if (!pageData) { return; }

				if (!this.$el) {
					pendingPageData = pageData;
					return;
				}

				switch (pageData.path) {
					case 'index':
						ProjectPage.hide();
						MissingPage.hide();
						IndexPage.show();
						break;
					case 'project':
						IndexPage.hide();
						MissingPage.hide();
						ProjectPage.show(ProjectModelStore.getProjectModel(pageData.projectId));
						break;
					case '404':
						IndexPage.hide();
						ProjectPage.hide();
						MissingPage.show();
				}

				if (notifyPhantom) {
					this.notifyPhantomOnRouteComplete();
				}
			},

			initModals: function () {
				$siteModal = $(templates['siteModal']());
				$('body').append($siteModal);

				$siteModal.on('show.bs.modal', function (event) {
					var link = $(event.relatedTarget);
					var modalDialog = $(this).find('.modal-dialog');
					$('iframe').attr('src', link.data('src'));

					// remove previous classes (hardcoded kludge...)
					modalDialog.removeClass('modal-large');
					modalDialog.removeClass('modal-small');

					modalDialog.addClass(link.data('class'));
				});
			},

			// Notify phantom.js that route is complete,
			// if running in phantom.js environment.
			notifyPhantomOnRouteComplete: function () {
				if (typeof window.callPhantom === 'function') {

					// Strip <script> tags from rendered HTML to prevent JS execution
					var scriptTags = document.querySelectorAll('script'),
					    scriptTag;
					for (var i=0; i<scriptTags.length; i++) {
						scriptTag = scriptTags[i];
						if (scriptTag.parentNode) {
							scriptTag.parentNode.removeChild(scriptTag);
						}
					}

					window.callPhantom({
						type: 'initialPageRendered'
					});
				}
			}

		};

	}
	
);
