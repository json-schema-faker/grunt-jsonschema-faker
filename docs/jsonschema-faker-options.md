# Options

## indent
Type: `integer`

If defined, generated JSON data is stringified using given indentation. If
undefined, the output becomes a big one-liner.

## size
Type: `integer`

Specify how many elements conforming to a given schema shall be created.

## extend
Type: `function`

If defined, the function may extend `json-schema-faker` dependencies. The
function accepts one argument, being `jsf` object itself on which `.extend`
may be called to alter faker.js and chance.js. The grunt-level (outer extend
function) doesn't have to return anything.

## references
Type: `files`

If defined, jsf will load defined files and allow to use them as referenced
subschemas. [Grunt's `file.expand`](http://gruntjs.com/api/grunt.file#grunt.file.expand)
used to resolve file paths.

## external
Type: `array` of `object`s

If defined, grunt will load external sources and let them re-use them in your
generated fake data (local grunt target). This is useful when you want to
generate several fake files in which data is **related**.

#### external source parameters

The `external` option needs to be an array of objects, each of them needs to
have following 4 fields defined:

 * *`name`*: `string`. This is just a name of the external source. It will be used in the JSON schema (as a `json-schema-faker` *custom format*)
 * *`generator`*: `string`|`function`. Currently, the `string` option provides two generators (`random`|`cycle`), but you may use a `function` to provide your own custom [generator](https://github.com/json-schema-faker/grunt-jsonschema-faker/blob/master/generators.js).
 * *`src`*: `string`. Path to the external data source file.
 * *`map`*: `function`. This function will be used by [`_.map`](https://lodash.com/docs#map) to modify each element from the source file. You may return only the *id* of each source element, but you may as well need to return a complex structure to re-use.

Read the following section if you're not familiar with *external sources*.

#### example

Let's analyse a typical use case.

For example, groups of users are generated in `group.json` file and the users
are generated in `user.json`. Each user object should have `groupId` attribute
that points to a group object (which has an `id` attribute) in `group.json`
file. But, since both files are generated using a separate grunt task/target,
how can we generate exactly the same values in both files, `group.json` and
`user.json`, if using a random hash function?

This is where the `external` option comes in. You can mock entire database
keeping consistent relations between files.

#### explanation

 * first, you need to specify the order in which the files are generated. In our example `group.json` comes first, then it's `user.json`, because it needs groups to generate itself. `group.json` file might be whatever you want - it might be generated dynamically as well. The `user.json` defines the `external` option.
 * when `user.json` is about to be generated, the grunt task iterates over `external` definitions. For each external source:
   * it loads the content from `src` file
   * map all elements using given `map` function
   * creates a *closure* that will have access to the mapped collection.  The closure returns single values (which are products of `map`) and the strategy depends on `generator` used.
   * the closure is registered as an ordinary [`json-schema-faker` custom format](https://github.com/json-schema-faker/json-schema-faker#custom-formats) using the `name`
   * the JSON schema will handle custom `name` format.
