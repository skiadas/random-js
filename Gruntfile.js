'use strict';

module.exports = function (grunt) {
    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);


    grunt.initConfig({
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                '*.js',
                'specs/{,*/}*.js',
                'tests/{,*/}*.js'
            ]
        },
        mocha: {
            all: {
                options: {
                    run: true,
        // urls: ['http://localhost:<%= connect.options.port %>/index.html']
                }
            }
        },
        concurrent: {
            server: [
                'coffee:dist',
                'compass:server'
            ],
            test: [
                'coffee',
                'compass'
            ],
            dist: [
                'coffee',
                'compass:dist',
                'imagemin',
                'svgmin',
                'htmlmin'
            ]
        },
    });

    grunt.registerTask('test', [ 'mocha' ]);

    grunt.registerTask('default', [
        'jshint',
        'test'
    ]);
};
