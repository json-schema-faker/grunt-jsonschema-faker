var _ = require('lodash');

module.exports = {
    random: function(collection) {
        return function(){
            return _.sample(collection);
        };
    },
    cycle: function(collection) {
        var ind = 0;
        return function(){
            var res = collection[ind];
            ind++;
            if (ind === collection.length) {
                ind = 0;
            }
            return res;
        };
    }
};
