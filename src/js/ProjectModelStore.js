define(
	[
		'jquery'
	],

	function ($) {

		"use strict";

		var projectsById;
		var featuredProjectsById;
		var moreProjectsById;

		return {

			init: function () {
				return this;
			},

			getProjectModel: function (projectId) {
				return projectsById[projectId];
			},

			getAllProjectModels: function () {
				return projectsById;
			},

			getFeaturedProjectModels: function () {
				return featuredProjectsById;
			},

			getMoreProjectModels: function () {
				return moreProjectsById;
			},

			loadProjects: function (dataPath, loadedCB) {

				// TODO: use Promises instead.

				$.ajax({

					url: dataPath,
					dataType: "json",

					success: function (data) {
						var projects = data.project_list.project;

						projects.sort(function (a, b) {
							var dateVals = a.date.split(".");
							var time_a = new Date(dateVals[0], dateVals[1]-1, dateVals[2]).getTime();
							dateVals = b.date.split(".");
							var time_b = new Date(dateVals[0], dateVals[1]-1, dateVals[2]).getTime();
							if (time_a > time_b) { return -1; }
							else if (time_b > time_a) { return 1; }
							else { return 0; }
						});

						projectsById = {};
						featuredProjectsById = {};
						moreProjectsById = {};
						projects.forEach(function (project) {
							// skip projects with no media assigned yet
							if (!project.media.length) { return; }

							projectsById[project.id] = project;

							if (project.featured) {
								featuredProjectsById[project.id] = project;
							} else {
								moreProjectsById[project.id] = project;
							}
						});

						loadedCB();
					},

					error: function (jqXHR, status, err) {
						console.log("json load error:", status, err);
					}

				});

			}

		};

	}

);
