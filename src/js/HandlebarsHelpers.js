define(
	[
		'handlebars'
	],

	function (Handlebars) {

		"use strict";

		var MONTH_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		var SHORT_MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
		var VIMEO_PLAYER_PREFIX = "vimeo-player-";

		var inited = false;

		function isVideo (media) {
			return media.videoplayer === "vimeo";
		}

		return {

			init: function () {

				if (inited) { return; }
				inited = true;

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
				 * returns true if the file should be displayed in a video player.
				 */
				Handlebars.registerHelper("ifVideo", function (media, options) {
					if (isVideo(media)) {
						return options.fn(this);
					} else {
						return options.inverse(this);
					}
				});

				/**
				 * Creates an embedded Vimeo player.
				 */
				Handlebars.registerHelper("createVimeoEmbed", function (index) {
					var vimeoPlayerId = VIMEO_PLAYER_PREFIX + index;

					// iframe id to access via Froogaloop
					// https://developer.vimeo.com/player/js-api
					var vimeoStr = "id="+ vimeoPlayerId;

					// link to vimeo video
					vimeoStr += " src="+ this.path;

					// apply vimeo settings
					vimeoStr += "?title=1&byline=0&portrait=0&color=C3C3B9&api=1&player_id="+ vimeoPlayerId;

					vimeoStr += " width="+ this.width;
					vimeoStr += " height="+ this.height;

					return vimeoStr;
				});

			}

		};

	}
	
);
