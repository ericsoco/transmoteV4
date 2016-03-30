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

				try {

					var widthMeta,
						heightMeta;

					if (!pageData || !projectModel) {

						// no pageData or no projectModel; display default transmote meta tags

						// html
						document.querySelector('meta[name="description"]').setAttribute('content', "Selected works by Eric Socolofsky. Once an architect, now mapping and visualizing @Stamen. In between: exhibit designer, web engineer, interaction designer/programmer, game developer, teacher.");
						document.title = 'transmote [v4] : selected works by Eric Socolofsky';

						// facebook opengraph
						document.querySelector('meta[property="og:url"]').setAttribute('content', "http://transmote.com/");
						document.querySelector('meta[property="og:title"]').setAttribute('content', "transmote [v4] : selected works by Eric Socolofsky");
						document.querySelector('meta[property="og:description"]').setAttribute('content', "Selected works by Eric Socolofsky. Once an architect, now mapping and visualizing @Stamen. In between: exhibit designer, web engineer, interaction designer/programmer, game developer, teacher.");
						document.querySelector('meta[property="og:image"]').setAttribute('content', "http://transmote.com/img/transmoteEmbedImage.jpg");

						// width and height metatags may have been omitted
						// by a project without a width/height available
						// (see below), so restore them if necessary
						widthMeta = document.querySelector('meta[property="og:image:width"]');
						if (!widthMeta) {
							widthMeta = document.createElement('meta');
							widthMeta.setAttribute('property', 'og:image:width');
							document.querySelector('head').appendChild(widthMeta);
						}
						widthMeta.setAttribute('content', "1280");

						heightMeta = document.querySelector('meta[property="og:image:height"]');
						if (!heightMeta) {
							heightMeta = document.createElement('meta');
							heightMeta.setAttribute('property', 'og:image:height');
							document.querySelector('head').appendChild(heightMeta);
						}
						heightMeta.setAttribute('content', "640");
						
						// twitter card
						document.querySelector('meta[name="twitter:title"]').setAttribute('content', "transmote [v4]");
						document.querySelector('meta[name="twitter:description"]').setAttribute('content', "Selected works by Eric Socolofsky. Once an architect, now mapping and visualizing @Stamen. In between: exhibit designer, web engineer, interaction designer/programmer, game developer, teacher.");
						document.querySelector('meta[name="twitter:image"]').setAttribute('content', "http://transmote.com/img/transmoteEmbedImage.jpg");

					} else {

						// projectModel available; customize meta tags to display selected project

						// html
						document.querySelector('meta[name="description"]').setAttribute('content', projectModel.brief);
						document.title = 'transmote [v4] : ' + projectModel.name;

						var image,
							width,
							height;

						if (projectModel.media && projectModel.media.length && projectModel.media[0]) {
							var media = projectModel.media[0];
							if (typeof media.embedType !== 'undefined') {
								image = "projects/" + projectModel.id + "/" + media.poster;
							} else {
								image = "projects/" + projectModel.id + "/" + media.path;
							}
							width = media.width;
							height = media.height;
						}

						if (!image) {
							image = 'img/transmoteEmbedImage.jpg';
							width = '1280';
							height = '640';
						}

						// facebook opengraph
						document.querySelector('meta[property="og:url"]').setAttribute('content', "http://transmote.com/projects/" + projectModel.id + "/");
						document.querySelector('meta[property="og:title"]').setAttribute('content', "transmote [v4] : " + projectModel.name);
						document.querySelector('meta[property="og:description"]').setAttribute('content', projectModel.brief);
						document.querySelector('meta[property="og:image"]').setAttribute('content', "http://transmote.com/" + image);

						// width and height metatags may have been omitted
						// by a project without a width/height available
						// so restore them if necessary and populate with values from projectModel
						if (width) {
							widthMeta = document.querySelector('meta[property="og:image:width"]');
							if (!widthMeta) {
								widthMeta = document.createElement('meta');
								widthMeta.setAttribute('property', 'og:image:width');
								document.querySelector('head').appendChild(widthMeta);
							}
							widthMeta.setAttribute('content', width.toString());
						} else {
							document.querySelector('head').removeChild(document.querySelector('meta[property="og:image:width"]'));
						}

						if (height) {
							heightMeta = document.querySelector('meta[property="og:image:height"]');
							if (!heightMeta) {
								heightMeta = document.createElement('meta');
								heightMeta.setAttribute('property', 'og:image:height');
								document.querySelector('head').appendChild(heightMeta);
							}
							heightMeta.setAttribute('content', height.toString());
						} else {
							document.querySelector('head').removeChild(document.querySelector('meta[property="og:image:height"]'));
						}
						
						// twitter card
						document.querySelector('meta[name="twitter:title"]').setAttribute('content', "transmote [v4] : " + projectModel.name);
						document.querySelector('meta[name="twitter:description"]').setAttribute('content', projectModel.brief);
						document.querySelector('meta[name="twitter:image"]').setAttribute('content', "http://transmote.com/" + image);

					}

				} catch (error) {

					console.error("Error updating metatags:", error);

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
