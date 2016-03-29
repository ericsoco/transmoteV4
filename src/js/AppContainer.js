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

				var projectModel;

				switch (pageData.path) {
					case 'index':
						ProjectPage.hide();
						MissingPage.hide();
						IndexPage.show();
						break;
					case 'project':
						projectModel = ProjectModelStore.getProjectModel(pageData.projectId);
						IndexPage.hide();
						MissingPage.hide();
						ProjectPage.show(projectModel);
						break;
					case '404':
						IndexPage.hide();
						ProjectPage.hide();
						MissingPage.show();
				}

				this.updateMetaTags(pageData, projectModel);

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

			updateMetaTags: function (pageData, projectModel) {

				console.log(">>>>> projectModel:", projectModel);

				if (!pageData || !projectModel) {

					// no pageData or no projectModel; display default transmote meta tags

					// html
					document.querySelector('meta[name="description"]').setAttribute('content', "Selected works by Eric Socolofsky. Once an architect, now mapping and visualizing @Stamen. In between: exhibit designer, web engineer, interaction designer/programmer, game developer, teacher.");
					document.title = 'transmote [v4] : selected works by Eric Socolofsky';

					// facebook opengraph
					document.querySelector('meta[property="og:url"]').setAttribute('content', "http://transmote.com/");
					document.querySelector('meta[property="og:title"]').setAttribute('content', "transmote [v4] : selected works by Eric Socolofsky");
					document.querySelector('meta[property="og:description"]').setAttribute('content', "Selected works by Eric Socolofsky. Once an architect, now mapping and visualizing @Stamen. In between: exhibit designer, web engineer, interaction designer/programmer, game developer, teacher.");
					// document.querySelector('meta[property="og:site_name"]').setAttribute('content', "transmote");
					document.querySelector('meta[property="og:image"]').setAttribute('content', "http://transmote.com/img/transmoteEmbedImage.jpg");
					// document.querySelector('meta[property="og:image:type"]').setAttribute('content', "image/jpeg");
					document.querySelector('meta[property="og:image:width"]').setAttribute('content', "1280");
					document.querySelector('meta[property="og:image:height"]').setAttribute('content', "640");
					
					// twitter card
					// document.querySelector('meta[name="twitter:card"]').setAttribute('content', "summary_large_image");
					// document.querySelector('meta[name="twitter:site"]').setAttribute('content', "@ericsoco");
					// document.querySelector('meta[name="twitter:creator"]').setAttribute('content', "@ericsoco");
					document.querySelector('meta[name="twitter:title"]').setAttribute('content', "transmote [v4]");
					document.querySelector('meta[name="twitter:description"]').setAttribute('content', "Selected works by Eric Socolofsky. Once an architect, now mapping and visualizing @Stamen. In between: exhibit designer, web engineer, interaction designer/programmer, game developer, teacher.");
					document.querySelector('meta[name="twitter:image"]').setAttribute('content', "http://transmote.com/img/transmoteEmbedImage.jpg");

				} else {

					// projectModel available; customize meta tags to display selected project

					// html
					document.querySelector('meta[name="description"]').setAttribute('content', "Selected works by Eric Socolofsky. Once an architect, now mapping and visualizing @Stamen. In between: exhibit designer, web engineer, interaction designer/programmer, game developer, teacher.");
					document.title = 'transmote [v4] : ' + projectModel.name;

					// facebook opengraph
					document.querySelector('meta[property="og:url"]').setAttribute('content', "http://transmote.com/");
					document.querySelector('meta[property="og:title"]').setAttribute('content', "transmote [v4]");
					document.querySelector('meta[property="og:description"]').setAttribute('content', projectModel.brief);
					// document.querySelector('meta[property="og:site_name"]').setAttribute('content', "transmote");
					document.querySelector('meta[property="og:image"]').setAttribute('content', "http://transmote.com/img/transmoteEmbedImage.jpg");
					// document.querySelector('meta[property="og:image:type"]').setAttribute('content', "image/jpeg");
					document.querySelector('meta[property="og:image:width"]').setAttribute('content', "1280");
					document.querySelector('meta[property="og:image:height"]').setAttribute('content', "640");
					
					// twitter card
					// document.querySelector('meta[name="twitter:card"]').setAttribute('content', "summary_large_image");
					// document.querySelector('meta[name="twitter:site"]').setAttribute('content', "@ericsoco");
					// document.querySelector('meta[name="twitter:creator"]').setAttribute('content', "@ericsoco");
					document.querySelector('meta[name="twitter:title"]').setAttribute('content', 'transmote [v4] : ' + projectModel.name);
					document.querySelector('meta[name="twitter:description"]').setAttribute('content', projectModel.brief);
					document.querySelector('meta[name="twitter:image"]').setAttribute('content', "http://transmote.com/img/transmoteEmbedImage.jpg");

				}

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
