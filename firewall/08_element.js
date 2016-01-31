function element_attribute(obj, key, getter, setter) {
  var descriptor = {
    configurable: true,
    get: getter
  };
  var lkey = key.toLowerCase(), fkey = function(q) { return lkey === (""+q).toLowerCase() };
  if(setter) {
    descriptor.set = setter;
    wrap_filter(obj, "setAttribute", fkey, function(key, value) {
      setter.call(this, value);
    });
    wrap_filter(obj, "removeAttribute", fkey, function(key) {
      setter.call(this, undefined);
    });
  }
  wrap_filter(obj, "getAttribute", fkey, function(key) {
    return getter();
  });
  Object.defineProperty(obj, key, descriptor);
  return obj
}
