# grunt-jsonschema-faker v0.2.2 [![Build Status: Linux](https://travis-ci.org/json-schema-faker/grunt-jsonschema-faker.svg?branch=master)](https://travis-ci.org/json-schema-faker/grunt-jsonschema-faker)

> Grunt task generating fake data according to JSON schema



## Getting Started
This plugin requires Grunt `>=0.4.0`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-jsonschema-faker --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-jsonschema-faker');
```

*This plugin was designed to work with Grunt 0.4.x. If you're still using grunt v0.3.x it's strongly recommended that [you upgrade](http://gruntjs.com/upgrading-from-0.3-to-0.4), but in case you can't please use [v0.3.2](https://github.com/gruntjs/grunt-contrib-coffee/tree/grunt-0.3-stable).*


## Jsonschema-faker task
_Run this task with the `grunt jsonschema-faker` command._

Task targets, files and options may be specified according to the grunt [Configuring tasks](http://gruntjs.com/configuring-tasks) guide.

[![grunt-jsonschema-faker npm module](https://nodei.co/npm/grunt-jsonschema-faker.png?downloads=true&stars=true "grunt-jsonschema-faker npm module")](https://www.npmjs.com/package/grunt-jsonschema-faker)

[![Dependency Status](https://david-dm.org/json-schema-faker/grunt-jsonschema-faker/status.svg)](https://david-dm.org/json-schema-faker/grunt-jsonschema-faker)
[![devDependency Status](https://david-dm.org/json-schema-faker/grunt-jsonschema-faker/dev-status.svg)](https://david-dm.org/json-schema-faker/grunt-jsonschema-faker#info=devDependencies)

Executes [`json-schema-faker`](https://github.com/json-schema-faker/json-schema-faker)
over a [JSON Schema](http://json-schema.org/) file to produce randomized data
that conforms to the schema. In other words, the schema specifies what might be
the content of a JSON (it specifies content, structure, nesting, types, etc.)
and `json-schema-faker` generates such content, using 3rd party libs beneath
([faker.js](https://github.com/Marak/faker.js),
[chance.js](https://github.com/victorquinn/chancejs) and
[randexp.js](http://fent.github.io/randexp.js/)).

### Options

#### indent
Type: `integer`

If defined, generated JSON data is stringified using given indentation. If
undefined, the output becomes a big one-liner.

#### size
Type: `integer`

Specify how many elements conforming to a given schema shall be created.

#### extend
Type: `function`

If defined, the function may extend `json-schema-faker` dependencies. The
function accepts one argument, being `jsf` object itself on which `.extend`
may be called to alter faker.js and chance.js. The grunt-level (outer extend
function) doesn't have to return anything.

#### references
Type: `files`

If defined, jsf will load defined files and allow to use them as referenced
subschemas. [Grunt's `file.expand`](http://gruntjs.com/api/grunt.file#grunt.file.expand)
used to resolve file paths.

#### external
Type: `array` of `object`s

If defined, grunt will load external sources and let them re-use them in your
generated fake data (local grunt target). This is useful when you want to
generate several fake files in which data is **related**.

###### external source parameters

The `external` option needs to be an array of objects, each of them needs to
have following 4 fields defined:

 * *`name`*: `string`. This is just a name of the external source. It will be used in the JSON schema (as a `json-schema-faker` *custom format*)
 * *`generator`*: `string` [`random`|`cycle`]. Currently, two generators are provided, but you may write your own
 * *`src`*: `string`. Path to the external data source file.
 * *`map`*: `function`. This function will be used by [`_.map`](https://lodash.com/docs#map) to modify each element from the source file. You may return only the *id* of each source element, but you may as well need to return a complex structure to re-use.

Read the following section if you're not familiar with *external sources*.

###### example

Let's analyse a typical use case.

For example, groups of users are generated in `group.json` file and the users
are generated in `user.json`. Each user object should have `groupId` attribute
that points to a group object (which has an `id` attribute) in `group.json`
file. But, since both files are generated using a separate grunt task/target,
how can we generate exactly the same values in both files, `group.json` and
`user.json`, if using a random hash function?

This is where the `external` option comes in. You can mock entire database
keeping consistent relations between files.

###### explanation

 * first, you need to specify the order in which the files are generated. In our example `group.json` comes first, then it's `user.json`, because it needs groups to generate itself. `group.json` file might be whatever you want - it might be generated dynamically as well. The `user.json` defines the `external` option.
 * when `user.json` is about to be generated, the grunt task iterates over `external` definitions. For each external source:
   * it loads the content from `src` file
   * map all elements using given `map` function
   * creates a *closure* that will have access to the mapped collection.  The closure returns single values (which are products of `map`) and the strategy depends on `generator` used.
   * the closure is registered as an ordinary [`json-schema-faker` custom format](https://github.com/json-schema-faker/json-schema-faker#custom-formats) using the `name` 
   * the JSON schema will handle custom `name` format.

### Usage Examples

#### Basic

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

#### Extending dependencies

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

#### External Sources

Following example illustrates using external sources to generate relative data:

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


## Release History

 * 2015-09-03   v0.2.2   lodash as hard dependency (instead of devDependency)
 * 2015-09-02   v0.2.1   repository name changed (github json-schema-faker organisation created) 0.2.0 version relaetd config error fix
 * 2015-08-15   v0.2.0   dependency update / version bump [object Object]
 * 2015-07-13   v0.1.7   references option supported
 * 2015-06-25   v0.1.6   dependency update / version bump
 * 2015-06-24   v0.1.5   dependency update / version bump
 * 2015-06-07   v0.1.4   Moving ownership (user rename) tkoomzaaskz:ducin.
 * 2015-05-15   v0.1.3   Fixed missing file in v0.1.2.
 * 2015-05-15   v0.1.2   Deprecated. External sources support.
 * 2015-05-14   v0.1.1   Fixed test definitions. Updated json-schema-faker to 0.1.9. Allowing extending faker.js and chance.js, new test case.
 * 2015-05-08   v0.1.0   Initial version. Task working correctly. Testing 5 cases - faker, chance, array, integer and boolean. Travis CI integration.

---

Task submitted by [Tomasz Ducin](http://ducin.it)

*This file was generated on Thu Sep 03 2015 00:00:19.*
