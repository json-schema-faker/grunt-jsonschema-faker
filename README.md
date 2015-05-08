# grunt-jsonschema-faker v0.1.0 [![Build Status: Linux](https://travis-ci.org/tkoomzaaskz/grunt-jsonschema-faker.svg?branch=master)](https://travis-ci.org/tkoomzaaskz/grunt-jsonschema-faker)

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

![grunt-jsonschema-faker dependency status](https://david-dm.org/tkoomzaaskz/grunt-jsonschema-faker.png "grunt-jsonschema-faker dependency status")

Executes [`json-schema-faker`](https://github.com/pateketrueke/json-schema-faker)
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

### Usage Examples

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


## Release History

 * 2015-05-08   v0.1.0   Initial version. Task working correctly. [object Object] Travis CI

---

Task submitted by [Tomasz Ducin](http://ducin.it)

*This file was generated on Fri May 08 2015 19:29:06.*
