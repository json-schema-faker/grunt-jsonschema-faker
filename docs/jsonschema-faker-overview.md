Task targets, files and options may be specified according to the grunt [Configuring tasks](http://gruntjs.com/configuring-tasks) guide.

Executes [`json-schema-faker`](https://github.com/json-schema-faker/json-schema-faker)
over a [JSON Schema](http://json-schema.org/) file to produce randomized data
that conforms to the schema. In other words, the schema specifies what might be
the content of a JSON (it specifies content, structure, nesting, types, etc.)
and `json-schema-faker` generates such content, using 3rd party libs beneath
([faker.js](https://github.com/Marak/faker.js),
[chance.js](https://github.com/victorquinn/chancejs) and
[randexp.js](http://fent.github.io/randexp.js/)).
