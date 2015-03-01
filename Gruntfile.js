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

        // Copies static files over to web folder
        copy: {
            site: {
                files: [{
                    expand: true,
                    cwd: '<%= config.src %>',
                    src: [
                        '**/*.html',
                        'assets/media/**',
                        'assets/scripts/**/*.js',
                        'assets/vendor/**/*.js',
                        'assets/vendor/**/*.map'
                    ],
                    dest: '<%= config.dist %>'
                }]
            }
        },

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            watchMarkup: {
                files: ['<%= config.src %>/**/*.html'],
                tasks: ['copy:site']
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

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-bower-requirejs');
    grunt.loadNpmTasks('grunt-sass');

    grunt.registerTask('build', [
        'copy:site',
        'sass:site'
    ]);
};