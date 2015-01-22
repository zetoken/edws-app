/**
 * Created by ZTn on 22/01/2015.
 */
Array.prototype.groupBy = function (selector) {
    var result = [];

    for (var i = 0; i < this.length; i++) {
        var id = selector(this[i]);
        if (!result[id]) {
            result[id] = [];
        }
        result[id].push(this[i]);
    }

    return result;
};

Array.prototype.select = function (predicate) {
    var result = [];

    for (var i = 0; i < this.length; i++) {
        result[i] = predicate(this[i])
    }

    return result;
};

Array.prototype.where = function (selector) {
    var result = [];

    for (var i = 0; i < this.length; i++) {
        if (selector(this[i])) {
            result.push(this[i]);
        }
    }

    return result;
};

/*
 var d1 = {id: 1, value: 2};
 var d2 = {id: 2, value: 1};
 var d3 = {id: 3, value: 2};
 var l = [d1, d2, d3];
 console.log(l);
 console.log(l.select(function (d) {
 return d.value;
 }));

 console.log(l.groupBy(function (d) {
 return d.value
 }));
 */