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
        mocha: {
            all: {
                options: {
                    run: true,
        // urls: ['http://localhost:<%= connect.options.port %>/index.html']
                }
            }
        },
        concurrent: {
        },
    });

    grunt.registerTask('test', [ 'mocha' ]);
    grunt.registerTask('minify', [ 'uglify' ]);
    grunt.registerTask('default', [
        'jshint',
        'test',
        'minify'
    ]);
};
