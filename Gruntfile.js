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
        uglify: {
            all: {
                files: {
                    'random.min.js': [ 'random.js' ]
                }
            }
        },
        mochacli: {
            all: [ 'test/**/*.spec.js' ]
        },
        mocha: {
            options: {
                bail: true,
                run: true
            },
            all: [ 'test/**/*.html' ]
        },
        concurrent: {
        },
    });

    grunt.registerTask('test', [ 'mocha', 'mochacli' ]);
    grunt.registerTask('minify', [ 'uglify' ]);
    grunt.registerTask('default', [
        'jshint',
        'test',
        'minify'
    ]);
};
