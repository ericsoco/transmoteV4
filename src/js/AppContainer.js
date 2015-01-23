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
					this.displayPage(pendingPageData);
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

			displayPage: function (pageData) {
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
			},

			initModals: function () {
				$siteModal = $(templates['siteModal']());
				$('body').append($siteModal);

				// attempting to replace these JS click handlers
				// with data-toggle + data-target attribs in markup (header.hb)
				// NEXT: how to pass src and class into show.bs.modal when not using JS click handlers?
				// 		 added data-src and data-class to markup;
				//		 once i get that into the modal, i probably don't need showModal() anymore.

				$siteModal.on('show.bs.modal', function (event) {
					console.log(">>>>> show.bs.modal");

					var link = $(event.relatedTarget);
					var modalDialog = $(this).find('.modal-dialog');
					$('iframe').attr('src', link.data('src'));

					// remove previous classes (hardcoded kludge...)
					modalDialog.removeClass('modal-large');
					modalDialog.removeClass('modal-small');

					modalDialog.addClass(link.data('class'));

					// TODO: how to modal.removeClass()?
				});

				/*
				$('.modal-about').click({
					src: "pages/about.html",
					class: "modal-large"
					// width: 60,
					// height: 75
				}, this.showModal);

				$('.modal-contact').click({
					src: "pages/contact.html",
					class: "modal-small"
					// width: 25,
					// height: 25 
				}, this.showModal);
				*/
			},

			showModal: function (event) {
				/*
				$siteModal.css({
					"width": event.data.width + "%",
					"height": event.data.height + "%",
					"margin-left": 0.5*(100-event.data.width) + "%",
					// "margin-top": 0.5*(100-event.data.height) + "%"
					"margin-top": "100px"	// can't use percentage because body height increases with content (project thumbs)
				});
				*/

				var $backdrop;

				function onCloseClick (event) {
					$backdrop.off("click", onCloseClick);
					$siteModal.find('.close').off("click", onCloseClick);
					$siteModal.modal("hide");
				}

				var modalClass = event.data.class;
				$siteModal.addClass(modalClass);

				$siteModal.on("show.bs.modal", function (event) {
					console.log(">>>>> show.bs.modal");
					$('iframe').attr("src", event.data.src);
				});
				$siteModal.on("hidden.bs.modal", function onHidden (event) {
					console.log(">>>>> hidden.bs.modal");
					$siteModal.off("hidden.bs.modal", onHidden);
					$siteModal.removeClass(modalClass);
				});
				$siteModal.modal("show");

				$backdrop = $('.modal-backdrop');
				$backdrop.on("click", onCloseClick);
				$siteModal.find('.close').on("click", onCloseClick);

				console.log(">>>>> $siteModal:", $siteModal);
				console.log(">>>>> backdrop:", $backdrop);

			}

		};

	}
	
);
