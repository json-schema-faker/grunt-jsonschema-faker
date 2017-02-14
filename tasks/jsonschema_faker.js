/**
 * grunt-jsonschema-faker is a Grunt task generating fake data according to JSON schema
 *
 * @see https://github.com/json-schema-faker/grunt-jsonschema-faker
 *
 * @author Tomasz Ducin <tomasz@ducin.it> (https://github.com/ducin)
 * @copyright © 2015-2016 Tomasz Ducin
 * @license MIT https://raw.github.com/json-schema-faker/grunt-jsonschema-faker/blob/master/LICENSE
 */

'use strict';


module.exports = function(grunt){
  var path = require('path');
  var _ = require('lodash');
  var jsf = require('json-schema-faker');
  var externalFormats = require('../formats');
  var externalGenerators = require('../generators');

  grunt.registerMultiTask('jsonschema_faker', 'generating fake data', function(){
    var options = this.options();
    if (options.extend){
        options.extend(jsf);
    }

    // if there are any externals defined, then load generators to handle them
    // (https://github.com/json-schema-faker/grunt-jsonschema-faker#external)
    var references = [];
    if (options.references){
      grunt.file.expand(options.references).forEach(function(f){
        references.push(grunt.file.readJSON(f));
      });
    }

    // load additional JSON-Schema-faker formats
    _.each(externalFormats, function(formatFunction, formatName){
        jsf.format(formatName, formatFunction());
    });

    this.files.forEach(function (f){
      var cwd = path.normalize(f.orig.cwd || ''),
          cwdAbs = path.resolve(cwd || '.'),
          expand = !!f.orig.expand;
      f.src.map(function (file){
          file = path.normalize(file);
          return path.resolve(cwdAbs, (expand && cwd.length && (file.indexOf(cwd + path.sep) === 0)) ? file.substr(cwd.length + path.sep.length) : file);
      }).filter(function (file){
          if (!grunt.file.exists(file)){
              grunt.log.warn('Source file "' + file + '" not found.');
              return false;
          } else {
              grunt.log.ok('Reading file ' + file + '.');
              return true;
          }
      }).map(function(file){
        _.each(options.external, function(externalOptions){
            var externalContent = grunt.file.readJSON(externalOptions.src);
            var collection = _.map(externalContent, externalOptions.map);
            var generator = typeof externalOptions.generator === 'function' ? externalOptions.generator : externalGenerators[externalOptions.generator];
            jsf.format(externalOptions.name, generator(collection));
        });
        var schema = grunt.file.readJSON(file);
        var result = !options.size ? jsf(schema, references) :
            _.map(_.range(options.size), function(){
              return jsf(schema, references);
            });
        var destination = path.normalize(f.dest);
        grunt.log.ok('Writing file ' + destination + '.\n');
        grunt.file.write(destination, JSON.stringify(result, null, options.indent));
      });
    });
  });
};
