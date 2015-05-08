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
