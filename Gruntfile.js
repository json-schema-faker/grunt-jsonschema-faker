/*
 * grunt-jsonschema-faker
 * https://github.com/tkoomzaaskz/grunt-jsonschema-faker
 *
 * Copyright (c) 2015 Tomasz Ducin
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

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
                    size: 2
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
            fakerExtended: {
                src: 'test/fixtures/faker-extended.json',
                dest: 'tmp/faker-extended.json',
                options: {
                    size: 30,
                    extend: function(jsf) {
                        jsf.extend('faker', function(faker){
                            faker.locale = "pl"; // or any other language
                            faker.custom = {
                                statement: function(length) {
                                    return faker.name.firstName() + " has " + faker.finance.amount() + " on " + faker.finance.account(length) + ".";
                                }
                            };
                            return faker;
                        });
                    }
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

    // By default, lint and run all tests.
    grunt.registerTask('default', ['jshint', 'test', 'build-contrib']);
};
