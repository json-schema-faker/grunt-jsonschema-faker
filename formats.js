/**
 * @see https://github.com/pateketrueke/json-schema-faker#custom-formats
 *
 * This file contains functions that extend JSON Schema Faker custom formats.
 */
module.exports = {
    index: function (){
        var ind = 0;
        return function (gen, schema){
            var from  = parseInt(schema.from);
            if ((ind === 0) && (from > 0)){
                ind = from;
            } 
            return ind++;
        };
    },
};
