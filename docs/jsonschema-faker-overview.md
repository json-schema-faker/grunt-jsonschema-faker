Task targets, files and options may be specified according to the grunt [Configuring tasks](http://gruntjs.com/configuring-tasks) guide.

[![grunt-jsonschema-faker npm module](https://nodei.co/npm/grunt-jsonschema-faker.png?downloads=true&stars=true "grunt-jsonschema-faker npm module")](https://www.npmjs.com/package/grunt-jsonschema-faker)

[![Dependency Status](https://david-dm.org/ducin/grunt-jsonschema-faker/status.svg)](https://david-dm.org/ducin/grunt-jsonschema-faker)
[![devDependency Status](https://david-dm.org/ducin/grunt-jsonschema-faker/dev-status.svg)](https://david-dm.org/ducin/grunt-jsonschema-faker#info=devDependencies)

Executes [`json-schema-faker`](https://github.com/pateketrueke/json-schema-faker)
over a [JSON Schema](http://json-schema.org/) file to produce randomized data
that conforms to the schema. In other words, the schema specifies what might be
the content of a JSON (it specifies content, structure, nesting, types, etc.)
and `json-schema-faker` generates such content, using 3rd party libs beneath
([faker.js](https://github.com/Marak/faker.js),
[chance.js](https://github.com/victorquinn/chancejs) and
[randexp.js](http://fent.github.io/randexp.js/)).
