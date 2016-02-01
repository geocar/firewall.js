var element_attribute_mutating = false;
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
  var orig = Object.getOwnPropertyDescriptor(obj, key);
  if(orig && orig.configurable) {
    Object.defineProperty(obj, key, descriptor);
  } else {
    new MutationObserver(function(a) {
      if(element_attribute_mutating)return;
      element_attribute_mutating = true;

      var n = a.length, i, e = null;
      for(i=0;i<n;++i) {
        var o=a[i];
        if(o.type === "attributes" && o.attributeName === lkey && o.target.__proto__===obj) {
          try { setter.call(o.target, o.attributeValue) } catch(_) { e = _ };
        }
      }
      element_attribute_mutating = false;
      if(e) throw e;
    }).observe(document.body,{
      subtree: true,
      attributes: true,
      characterData: false,
      childList: false,
      "attributeFilter": [key]
    });
  }
  return obj
}
