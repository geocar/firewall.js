var function_named = require("./function_named");
var new_apply = require("./new_apply");

function wrap_after(obj,field,after) {
  var orig = obj[field];
  obj[field] = function_named(field, function() {
    var result = orig.apply(this,arguments);
    return after(result);
  });
  return obj;
}

function wrap_before(obj,field,before) {
  var orig = obj[field];
  obj[field] = function_named(field, function() {
    var args = before.apply(this, [].slice.call(arguments));
    return orig.apply(this,args);
  });
  return obj;
}

function wrap_constructor(obj,field,after) {
  var orig = obj[field];
  obj[field] = function_named(field, function() {
    var result = new_apply(orig, arguments);
    return after(result);
  });
  return obj;
}

function wrap_filter(obj,name,query, intercept) {
  var orig = obj[name];
  obj[name] = function_named(name, function(a) {
    return (query.apply(this,arguments)?intercept:orig).apply(this,arguments);
  });
}

module.exports = {
  after: wrap_after,
  before: wrap_before,
  constructor: wrap_constructor,
  filter: wrap_filter
};
