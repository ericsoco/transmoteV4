module.exports = function (grunt) {
	'use strict';

	// Load all 'grunt-*' tasks from package.json,
	// instead of loadNpmTasks()-ing each one.
	require('load-grunt-tasks')(grunt, {
		pattern: ['grunt-*']
	});

	grunt.initConfig({

		pkg: grunt.file.readJSON('package.json'),

		jsFiles: [
			'./Gruntfile.js',
			'./src/js/**/*.js',
			'!./src/js/lib/**/*'
		],
		/*
		sassFiles: [
			'*.scss'
		],
		*/
		templateFiles: [
			'./src/templates/**/*.hb'
		],
		compiledTemplate: './src/js/templates.js',

		requirejs: {
			options: {
				baseUrl: './src/js',
				mainConfigFile: './src/js/main.js',
				fileExclusionRegExp: /^\.|node_modules|Gruntfile|\.md|package.json/,
				modules: [
					{
						name: 'main'
					}
				]
			},
			dev: {
				options: {
					dir: './build/dev/js',
					optimize: "none"
				}
			},
			deploy: {
				options: {
					dir: './build/deploy/js',
					uglify2: {
						compress: {
							drop_console: true
						}
					},
					optimize: "uglify2",
					generateSourceMaps: true,
					preserveLicenseComments: false /* required when generateSourceMaps: true */
				}
			}
		},

		jshint: {
			src: ['<%= jsFiles %>'],
			options: {
				ignores: ['<%= compiledTemplate %>'],

				// Enforcing options
				curly: true,
				eqeqeq: true,
				immed: true,
				latedef: true,
				newcap: true,
				noarg: true,
				nonbsp: true,
				nonew: true,
				undef: true,
				unused: 'vars',
				strict: true,
				trailing: true,

				// Relaxing options
				smarttabs: true,
				sub: true,

				// Environments:
				browser: true,
				nonstandard: true,

				globals: {
					// AMD/Require:
					define: true,
					module: true,
					require: true,
					requirejs: true,

					console: true
				}
			},
			dev: {
				src: ['<%= jsFiles %>'],
				options: {
					debug: true,
					devel: true
				}
			},
			deploy: {
				src: ['<%= jsFiles %>'],
				options: {
					debug: false,
					devel: true
				}
			}
		},

		sass: {
			dev: {
				options: {
					sourcemap: 'auto',
					style: 'compressed',
					lineNumbers: true,
					require: 'sass-globbing'
				},

				src: ['./src/sass/main.scss'],
				dest: './build/dev/css/main.css'

			},
			deploy: {
				options: {
					sourcemap: 'auto',
					style: 'compressed',
					lineNumbers: true
				},

				src: ['./src/sass/main.scss'],
				dest: './build/deploy/css/main.css'

			}
		},

		handlebars: {
			options: {
				amd: true,
				namespace: 'transmote',
				processName: function (filePath) {
					// Strip initial path and file extension
					console.log("filePath:", filePath);
					return filePath.replace(/^\.\/src\/templates\//, '').replace(/\.hb$/, '');
				}
			},
			all: {
				src: ['<%= templateFiles %>'],
				dest: '<%= compiledTemplate %>'
			}
		},

		copy: {

			// how to use globbing for dest??
			// dev: {
			// 	src: './src/**/*.html',
			// 	dest: './build/dev/**/*.html'
			// },

			dev: {
				files: [
					{
						expand: true,
						cwd: './src/',
						src: ['**/*.html'],
						dest: './build/dev/',
						ext: '.html'
					},
					{
						expand: true,
						cwd: './src/css/',
						src: ['**/*.*'],
						dest: './build/dev/css/'
					},
					{
						expand: true,
						cwd: './src/data/',
						src: ['**/*.*'],
						dest: './build/dev/data/'
					},
					{
						expand: true,
						cwd: './src/font/',
						src: ['**/*.*'],
						dest: './build/dev/font/'
					},
					{
						expand: true,
						cwd: './src/img/',
						src: ['**/*.*'],
						dest: './build/dev/img/'
					},
					{
						expand: true,
						cwd: './src/projects/',
						src: ['**/*.*'],
						dest: './build/dev/projects/'
					}
				]
			},
			deploy: {
				files: [
					{
						expand: true,
						cwd: './src/',
						src: ['**/*.html'],
						dest: './build/deploy/',
						ext: '.html'
					},
					{
						expand: true,
						cwd: './src/css/',
						src: ['**/*.*'],
						dest: './build/deploy/css/'
					},
					{
						expand: true,
						cwd: './src/data/',
						src: ['**/*.*'],
						dest: './build/deploy/data/'
					},
					{
						expand: true,
						cwd: './src/font/',
						src: ['**/*.*'],
						dest: './build/deploy/font/'
					},
					{
						expand: true,
						cwd: './src/img/',
						src: ['**/*.*'],
						dest: './build/deploy/img/'
					},
					{
						expand: true,
						cwd: './src/projects/',
						src: ['**/*.*'],
						dest: './build/deploy/projects/'
					}
				]
			}
		},
		
		connect: {
			dev: {
				options: {
					base: './build/dev/',
					protocol: 'http',
					hostname: 'localhost',
					port: '5421',
					open: true
				}
			},
			deploy: {
				options: {
					base: './build/deploy/',
					protocol: 'http',
					hostname: 'localhost',
					port: '5420',
					open: true,
					keepalive: true
				}
			}
		},
		
		watch: {
			css: {
				// files: ['<%= sass.dev.src %>'],
				files: ['./src/sass/**/*.scss'],
				tasks: [
					'dev-notify'
				]
			},
			data: {
				files: ['./src/data/*.*'],
				tasks: [
					'dev-notify'
				]
			},
			html: {
				// files: ['<%= copy.dev.src %>'],
				files: ['./src/**/*.html'],
				tasks: [
					'dev-notify'
				]
			},
			js: {
				files: ['<%= jsFiles %>'],
				tasks: [
					'dev-notify'
				]
			},
			templates: {
				files: ['<%= templateFiles %>'],
				tasks: [
					'dev-notify'
				]
			}
		},

		notify: {
			start: {
				options: {
					title: '-- Building --',
					message: 'Starting...'
				}
			},
			handlebars: {
				options: {
					title: '-- Building --',
					message: '...Compiling templates...'
				}
			},
			jshint: {
				options: {
					title: '-- Building --',
					message: '...JSHinting...'
				}
			},
			requirejs: {
				options: {
					title: '-- Building --',
					message: '...Modularizing / Compressing / Uglifying...'
				}
			},
			sass: {
				options: {
					title: '-- Building --',
					message: '...Sassifying...'
				}
			},
			copy: {
				options: {
					title: '-- Building --',
					message: '...Copying static files...'
				}
			},
			done: {
				options: {
					title: '-- Building --',
					message: '...Complete.'
				}
			}
		}

	});

	grunt.registerTask('dev', [
		'newer:handlebars',
		'newer:jshint:dev',
		'requirejs:dev',
		'sass:dev',
		'newer:copy:dev'
	]);

	grunt.registerTask('dev-notify', [
		'notify:start',
		'notify:handlebars',
		'newer:handlebars',
		'notify:jshint',
		'newer:jshint:dev',
		'notify:requirejs',
		'requirejs:dev',
		'notify:sass',
		'sass:dev',
		'notify:copy',
		'newer:copy:dev',
		'notify:done'
	]);

	grunt.registerTask('dev-all', [
		'handlebars',
		'jshint:dev',
		'requirejs:dev',
		'sass:dev',
		'newer:copy:dev'
	]);

	grunt.registerTask('deploy', [
		'handlebars',
		'jshint:deploy',
		'requirejs:deploy',
		'sass:deploy',
		'newer:copy:deploy',
		'connect:deploy'
	]);

	grunt.registerTask('default', [
		'dev',
		'connect:dev',
		'watch'
	]);

	grunt.registerTask('serve', [
		'connect:dev'
	]);

	// Shut up "Running ... task" header logs in Terminal
	grunt.log.header = function () {};

};
