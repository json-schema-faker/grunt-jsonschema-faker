/*
 * grunt-jsonschema-faker
 * https://github.com/json-schema-faker/grunt-jsonschema-faker
 *
 * Copyright (c) 2015-2016 Tomasz Ducin
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt){

    // Project configuration.
    grunt.initConfig({
        jsonschema_faker: {
            options: {
                indent: 2
            },
            faker: {
                src: 'test/fixtures/faker.json',
                dest: 'tmp/faker.json',
                options: {
                    size: 20
                }
            },
            chance: {
                src: 'test/fixtures/chance.json',
                dest: 'tmp/chance.json',
                options: {
                    size: 3
                }
            },
            list: {
                src: 'test/fixtures/list.json',
                dest: 'tmp/list.json',
                options: {
                    size: 5 
                }
            },
            array: {
                src: 'test/fixtures/array.json',
                dest: 'tmp/array.json',
                options: {
                    size: 200
                }
            },
            integer: {
                src: 'test/fixtures/integer.json',
                dest: 'tmp/integer.json'
            },
            boolean: {
                src: 'test/fixtures/boolean.json',
                dest: 'tmp/boolean.json'
            },
            multi: {
                files: [
                    {
                        expand: true,
                        cwd: "test/fixtures",
                        src: "?????.json", // 5-letter-long files
                        dest: "tmp/multi1",
                        ext: '.json',
                        rename: function (dest, src){
                            return dest + "/renamed-" + src;
                        }
                    },
                    {
                        expand: true,
                        cwd: "test/fixtures",
                        src: "???????.json", // 7-letter-long files
                        dest: "tmp/multi2",
                        ext: '.json',
                        rename: function (dest, src){
                            return dest + "/renamed-" + src;
                        }
                    }
                ]
            },
            fakerExtended: {
                src: 'test/fixtures/faker-extended.json',
                dest: 'tmp/faker-extended.json',
                options: {
                    size: 30,
                    extend: function(jsf){
                        jsf.extend('faker', function(faker){
                            faker.locale = "pl"; // or any other language
                            faker.custom = {
                                statement: function(length){
                                    return faker.name.firstName() + " has " + faker.finance.amount() + " on " + faker.finance.account(length) + ".";
                                }
                            };
                            return faker;
                        });
                    }
                }
            },
            externalSources: {
                src: 'test/fixtures/external-sources.json',
                dest: 'tmp/external-sources.json',
                options: {
                    size: 15,
                    external: [{
                        name: 'randomUserId',
                        generator: 'random',
                        src: 'tmp/faker.json',
                        map: function(element){
                            return element.id;
                        }
                    }, {
                        name: 'cycledSsn',
                        generator: 'cycle',
                        src: 'tmp/chance.json',
                        map: function(element){
                            return element.ssn;
                        }
                    }]
                }
            }
        },
        jshint: {
            all: [
                'Gruntfile.js',
                'tasks/*.js',
                '<%= nodeunit.tests %>'
            ],
            options: {
                jshintrc: '.jshintrc'
            }
        },

        clean: {
            tmp: ['tmp'],
        },

        // Unit tests.
        nodeunit: {
            tests: ['test/*_test.js'],
        },

        // Post contrib-build.
        concat: {
            'README.md': ['docs/header.md', 'README.md']
        }
    });

    // Actually load this plugin's task(s).
    grunt.loadTasks('tasks');

    // These plugins provide necessary tasks.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-nodeunit');
    grunt.loadNpmTasks('grunt-contrib-internal');

    // Whenever the 'test' task is run, first run jshint, clean the placeholder,
    // then run this plugin's task(s), then test the result.
    grunt.registerTask('test', ['jshint', 'clean', 'jsonschema_faker', 'nodeunit']);

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.registerTask('build', ['build-contrib', 'concat']);

    // By default, lint and run all tests.
    grunt.registerTask('default', ['jshint', 'test', 'build']);
};
