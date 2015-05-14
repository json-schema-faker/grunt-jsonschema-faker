# Usage Examples

    grunt.initConfig({
        jsonschema_faker: {
            options: {
                indent: 2
            },
            target: {
                src: ['path/to/schema/file/**/*.json'],
                dest: 'path/to/dest/file.json',
                options: {
                    size: 100
                }
            }
        }
    });

It is also important to define the JSON schema properly. Use [JSON schema
generator](http://jsonschema.net/#/) along with [`json-schema-faker` online
demo](http://json-schema-faker.js.org/) for faster development.

You may also want to extend faker.js and/or chance. In order to do that, define
a `extend` option function (for each target or globally):

    grunt.initConfig({
        jsonschema_faker: {
            target: {
                src: ['path/to/schema/file/**/*.json'],
                dest: 'path/to/dest/file.json',
                options: {
                    size: 100,
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
        }
    });
