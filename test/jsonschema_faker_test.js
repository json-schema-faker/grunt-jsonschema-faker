'use strict';

var grunt = require('grunt');
//var _ = require('lodash');

function readFile(file) {
  var contents = grunt.file.read(file);
  if (process.platform === 'win32') {
    contents = contents.replace(/\r\n/g, '\n');
  }
  return contents;
}

function assertJSON(test, path, size, message) {
  var content = JSON.parse(readFile(path));
  if (size > 1) {
    test.equal(content.length, size, message);
  } else if (size === 1) {
    test.equal(content.length, undefined, message);
  }
}

exports.jsonschema_faker = {
  faker: function(test) {
    test.expect(1);

    assertJSON(test,
      'tmp/faker.json',
      20,
      'Should generate 20 faker elements');

    test.done();
  },
  chance: function(test) {
    test.expect(1);

    assertJSON(test,
      'tmp/chance.json',
      3,
      'Should generate 2 chance elements');

    test.done();
  },
  array: function(test) {
    test.expect(1);

    assertJSON(test,
      'tmp/array.json',
      200,
      'Should generate 200 array elements');

    test.done();
  },
  integer: function(test) {
    test.expect(1);

    assertJSON(test,
      'tmp/integer.json',
      1,
      'Should generate 1 integer element');

    test.done();
  },
  boolean: function(test) {
    test.expect(1);

    assertJSON(test,
      'tmp/boolean.json',
      1,
      'Should generate 1 boolean element');

    test.done();
  },
  fakerExtended: function(test) {
    test.expect(1);

    assertJSON(test,
      'tmp/faker-extended.json',
      30,
      'Should generate 30 faker-extended elements');

    test.done();
  },
  externalSources: function(test) {
    test.expect(1);

    assertJSON(test,
      'tmp/external-sources.json',
      15,
      'Should generate 15 elements with external sources re-used');

    test.done();
  }
};
  