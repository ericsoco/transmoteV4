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
				phantom: true,

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
					lineNumbers: true,
					require: 'sass-globbing'
				},

				src: ['./src/sass/main.scss'],
				dest: './build/deploy/css/main.css'

			}
		},

		json5_to_json: {
			options: {
				space: '\t'
			},
			dev: {
				options: {
					space: '\t'
				},
				src: ['./src/data/projects.json5'],
				dest: './build/dev/data/projects.json'
			},
			deploy: {
				options: {
					space: '\t'
				},
				src: ['./src/data/projects.json5'],
				dest: './build/deploy/data/projects.json'
			}
		},

		handlebars: {
			options: {
				amd: true,
				namespace: 'transmote',
				processName: function (filePath) {
					// Strip initial path and file extension
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
						src: ['**/*.html', '.htaccess'],
						dest: './build/dev/',
						ext: '.html'
					},
					{
						expand: true,
						cwd: './src/',
						src: ['**/*.php', '.htaccess'],
						dest: './build/dev/',
						ext: '.php'
					},
					{
						src: './src/.htaccess',
						dest: './build/dev/.htaccess',
					},
					{
						src: './src/projects/.htaccess',
						dest: './build/dev/projects/.htaccess',
					},
					/*
					{
						src: './src/.htaccess',
						dest: './build/server-config/htaccess.txt',
					},
					{
						src: './src/projects/.htaccess',
						dest: './build/server-config/htaccess-projects.txt',
					},
					*/
					{
						expand: true,
						cwd: './src/css/',
						src: ['**/*.*'],
						dest: './build/dev/css/'
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
					},
					{
						expand: true,
						cwd: './src/renderer/',
						src: ['**/*'],
						dest: './build/dev/renderer/'
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
						cwd: './src/',
						src: ['**/*.php', '.htaccess'],
						dest: './build/deploy/',
						ext: '.php'
					},
					{
						src: './src/.htaccess',
						dest: './build/deploy/.htaccess',
					},
					{
						src: './src/projects/.htaccess',
						dest: './build/deploy/projects/.htaccess',
					},
					{
						expand: true,
						cwd: './src/css/',
						src: ['**/*.*'],
						dest: './build/deploy/css/'
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
					},
					{
						expand: true,
						cwd: './src/renderer/',
						src: ['**/*'],
						dest: './build/deploy/renderer/'
					}
				]
			}
		},

		chmod: {
			options: {
				mode: '755'
			},
			dev: {
				src: ['./build/dev/renderer/*']
			},
			deploy: {
				src: ['./build/deploy/renderer/*']
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
			json5_to_json: {
				options: {
					title: '-- Building --',
					message: '...converting JSON5...'
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
		'newer:json5_to_json:dev',
		'newer:copy:dev',
		'newer:chmod:dev'
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
		'notify:json5_to_json',
		'newer:json5_to_json:dev',
		'notify:copy',
		'newer:copy:dev',
		'newer:chmod:dev',
		'notify:done'
	]);

	grunt.registerTask('dev-all', [
		'handlebars',
		'jshint:dev',
		'requirejs:dev',
		'sass:dev',
		'json5_to_json:dev',
		'copy:dev',
		'chmod:dev'
	]);

	grunt.registerTask('deploy', [
		'handlebars',
		'jshint:deploy',
		'requirejs:deploy',
		'sass:deploy',
		'json5_to_json:deploy',
		'copy:deploy',
		'chmod:deploy',
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
