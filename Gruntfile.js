module.exports = function (grunt) {
    'use strict';

    // Display the elapsed execution time of grunt tasks
    require('time-grunt')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // Sets main project directories
        config: {
          src: 'src/',
          tmp: 'tmp/',
          dist: 'web/'
        },

        // Compiles SCSS partials to CSS
        sass: {
            site: {
                files: [{
                    expand: true,
                    cwd: '<%= config.src %>/assets/scss',
                    src: ['*.scss'],
                    dest: '<%= config.dist %>/assets/styles',
                    ext: '.css'
                }],
                options: {
                    outputStyle: (grunt.option('build') ? 'compressed' : 'nested')
                }
            }
        },

        // Compiles Handlebars files into HTML pages
        assemble: {
            options: {
                assets: '<%= config.src %>/assets/**',
                data:   '<%= config.src %>/assets/data/*.{json,yml}',
                layoutdir: '<%= config.src %>/layouts',
                partials: '<%= config.src %>/partials/**/*.hbs'
            },
            site: {
                files: [{
                    expand: true,
                    cwd: '<%= config.src %>',
                    dest: '<%= config.tmp %>',
                    ext: '.html',
                    src: [
                        '**/*.hbs',
                        '!partials/**',
                        '!layouts/**',
                        '!assets/vendor/**'
                    ]
                }]
            }
        },

        // Takes ugly handlebars compiled HTML and makes it pretty
        prettify: {
            site: {
                options: {
                    indent: 4,
                    wrap_line_length: 999999,
                    indent_inner_html: false,
                    unformatted: [
                        'a', 'b', 'code', 'i', 'p',
                        'pre', 'small', 'span',
                        'sub', 'sup', 'u', 'textarea'
                    ]
                },
                files: [{
                    expand: true,
                    cwd: '<%= config.tmp %>',
                    dest: '<%= config.dist %>',
                    src: ['**/*.html']
                }]
            }
        },

        // Copies static files over to web folder
        copy: {
            site: {
                files: [{
                    expand: true,
                    cwd: '<%= config.src %>',
                    src: [
                        'assets/media/**',
                        'assets/scripts/**/*.js',
                        'assets/vendor/**/*.js'
                    ],
                    dest: '<%= config.dist %>'
                }]
            }
        },

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            watchMarkup: {
                files: ['<%= config.src %>/**/*.{hbs,html}'],
                tasks: ['assemble:site', 'prettify:site']
            },
            watchStatic: {
                files: ['<%= config.src %>/assets/media/**'],
                tasks: ['copy:site']
            },
            watchStyles: {
                files: ['<%= config.src %>/assets/{scss,vendor}/**/*.{s,}css'],
                tasks: ['sass:site']
            },
            watchScripts: {
                files: ['<%= config.src %>/assets/{scripts,vendor}/**/*.js'],
                tasks: ['copy']
            }
        },

        // Merges the paths of installed Bower components into the paths property of your RequireJS config.
        bower: {
            site: {
                rjsConfig: '<%= config.src %>/assets/scripts/config.js'
            }
        }
    });

    grunt.loadNpmTasks('assemble');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-bower-requirejs');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-prettify');

    grunt.registerTask('build', [
        'assemble:site',
        'copy:site',
        'sass:site',
        'prettify:site'
    ]);
};