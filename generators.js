var _ = require('lodash');

module.exports = {
    index: function (){
        var ind = 0;
        return function (faker, item){
            var from  = parseInt(item.from);
            if ((ind === 0) && (from > 0)){
                ind = from;
            } 
            return ind++;
        };
    },
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
