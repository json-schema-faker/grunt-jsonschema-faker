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
