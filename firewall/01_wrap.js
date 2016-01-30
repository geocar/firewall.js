function wrap_after(obj,field,after) {
  var orig = obj[field];
  obj[field] = function_named(field, function() {
    var result = orig.apply(this,arguments);
    return after(result);
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
  return function_named(name, function(a) {
    return (query.apply(this,arguments)?intercept:orig).apply(this,arguments);
  });
}
