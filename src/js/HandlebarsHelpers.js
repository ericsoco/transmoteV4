define(
	[
		'handlebars',
		'./templates',
	],

	function (Handlebars, templates) {

		"use strict";

		var MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		var SHORT_MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
		var VIMEO_PLAYER_PREFIX = "vimeo-player-";

		var inited = false;

		function isEmbed (media) {
			return typeof media.embedType !== "undefined";
		}

		function isFlashEmbed (media) {
			return media.embedType === "flash";
		}

		/**
		 * Creates an embedded Vimeo player.
		 */
		function createVimeoEmbed (obj, index) {
			var vimeoPlayerId = VIMEO_PLAYER_PREFIX + index;

			// iframe id to access via Froogaloop
			// https://developer.vimeo.com/player/js-api
			var embedStr = "id="+ vimeoPlayerId;

			// link to video
			embedStr += " src="+ obj.path;

			// apply vimeo settings
			embedStr += "?title=1&byline=0&portrait=0&color=C3C3B9&api=1&player_id="+ vimeoPlayerId;

			embedStr += " width="+ obj.width;
			embedStr += " height="+ obj.height;

			return embedStr;
		}

		/**
		 * Creates an embedded Youtube player.
		 */
		function createYoutubeEmbed (obj, index) {

			// link to video
			var embedStr = " src="+ obj.path;

			embedStr += " width="+ obj.width;
			embedStr += " height="+ obj.height;

			return embedStr;
		}

		/**
		 * Creates an embedded Flash player.
		 */
		function createFlashEmbed (obj, index) {

			return "<object width='" + obj.width + "' height='" + obj.height + "'><param name='movie' value='" + obj.path + "'/><param name='wmode' value='transparent'/><param name='FlashVars' value='" + obj.flashvars + "'/><embed src='" + obj.path + "' wmode='transparent' width='" + obj.width + "' height='" + obj.height + "' type='application/x-shockwave-flash' FlashVars='" + obj.flashvars + "'></embed></object>";

		}

		return {

			init: function () {

				if (inited) { return; }
				inited = true;

				Handlebars.registerPartial("projectThumbList", templates['projectThumbList']);

				/**
				 * Concatenates a list of string arguments with "/" as a delimiter,
				 * to generate a resource path.
				 */
				Handlebars.registerHelper("concatPath", function () {
					// strip data-hash object passed by Handlebars
					var args = Array.prototype.slice.call(arguments, 0, -1);
					return args.join("/");
				});

				/**
				 * Returns sum of passed arguments (numeric addition).
				 */
				Handlebars.registerHelper("add", function () {
					var args = Array.prototype.slice.call(arguments, 0, -1);
					var out = 0;
					args.forEach(function (arg) {
						out += arg;
					});
					return out;
				});

				/**
				 * Accepts "YYYY.MM.DD" date and returns "mmm YYYY"
				 */
				Handlebars.registerHelper("datestamp", function (dateStr, shortname) {
					if (typeof shortname === "undefined") { shortname = true; }
					var ymd = dateStr.split(".");
					var date = new Date(ymd[0], ymd[1]-1, ymd[2]);

					var yearStr = String(date.getFullYear());
					var monthStr = (shortname ? SHORT_MONTH_NAMES : MONTH_NAMES)[date.getMonth()].toLowerCase();

					return (monthStr + " " + yearStr);
				});

				/**
				 * Evaluates a media object for a project;
				 * returns true if the file should be displayed in an embed player.
				 */
				Handlebars.registerHelper("ifEmbed", function (media, options) {
					if (isEmbed(media)) {
						return options.fn(this);
					} else {
						return options.inverse(this);
					}
				});

				/**
				 * Evaluates a media object for a project;
				 * returns true if the file should be displayed in a flash embed player.
				 */
				Handlebars.registerHelper("ifFlashEmbed", function (media, options) {
					if (isFlashEmbed(media)) {
						return options.fn(this);
					} else {
						return options.inverse(this);
					}
				});

				Handlebars.registerHelper("createEmbed", function (index) {
					switch (this.embedType) {
						case 'vimeo':
							return createVimeoEmbed(this, index);
						case 'youtube':
							return createYoutubeEmbed(this, index);
						case 'flash':
							return createFlashEmbed(this, index);
						default:
							console.warn("Invalid videoplayer specified:", this.embedType);
							return '';
					}
				});

			}

		};

	}
	
);
