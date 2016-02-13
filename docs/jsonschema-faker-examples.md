# Usage Examples

## Basic

```javascript
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
```

It is also important to define the JSON schema properly. Use [JSON schema
generator](http://jsonschema.net/#/) along with [`json-schema-faker` online
demo](http://json-schema-faker.js.org/) for faster development.

## Extending dependencies

You may also want to extend faker.js and/or chance. In order to do that, define
a `extend` option function (for each target or globally):

```javascript
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
```

## External Sources

Following example illustrates using external sources to generate relative data:

```javascript
grunt.initConfig({
    jsonschema_faker: {
        externalSources: {
            src: 'schema/external-sources.json',
            dest: 'data/external-sources.json',
            options: {
                external: [{
                    name: 'randomUserId',
                    generator: 'random',
                    src: 'data/faker.json',
                    map: function(element) {
                        return element.id;
                    }
                }, {
                    name: 'cycledSsn',
                    generator: 'cycle',
                    src: 'data/chance.json',
                    map: function(element) {
                        return element.ssn;
                    }
                }]
            }
        }
    }
});
```
