/*
 *  deepcopy is simple recursive function to copy objects of primitive types
 *  @param from {Object} source
 *  @param to   {Object} destination
 *
 *  Sample:
 *  =======
 *  source      : {labels: { one: {id: 1, label: "one"}, two: {id: 2, label: "two"} }}
 *  destination : {labels: { one: {id: 1, label: "one"}, two: {id: 2, label: "two"} }}
 */

var deepcopy = function(from, to) {
  if (from) {
    to = to || {};
    for(let key in from) {
      if (from.hasOwnProperty(key)) {
        let value = from[key];
        if (value && value !== void 0) {
          if (typeof value === 'object') {
            to[key] = to[key] || {};
            deepcopy(from[key], to[key]);
          } else {
            to[key] = value;
          }
        }
      }
    }
  }
};