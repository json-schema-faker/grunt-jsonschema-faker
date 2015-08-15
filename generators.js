/**
 * @see https://github.com/ducin/grunt-jsonschema-faker#external
 *
 * This file contains generator functions that are used as intermediate
 * preprocessors for external data collections loaded into JSON Schema.
 * When a collection, having *n* items, is loaded as external data source, there
 * is a question: which item to choose for particular JSON generated object?
 * The functions below give the opportunity to make it one by one (a cycle),
 * just a random value or anything else.
 */

var _ = require('lodash');

module.exports = {
    random: function(collection){
        return function(){
            return _.sample(collection);
        };
    },
    cycle: function(collection){
        var ind = 0;
        return function(){
            var res = collection[ind];
            ind++;
            if (ind === collection.length){
                ind = 0;
            }
            return res;
        };
    }
};
