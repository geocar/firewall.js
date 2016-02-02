var wrap = require("./wrap");

var element_attribute_mutating = false;
function element_attribute(obj, key, getter, setter) {
  var orig = Object.getOwnPropertyDescriptor(obj, key);
  var descriptor = { "configurable": true };

  var lkey = key.toLowerCase(), fkey = function(q) { return lkey === (""+q).toLowerCase() };
  if(setter) {
    descriptor.set = setter;
    wrap.filter(obj, "setAttribute", fkey, function(key, value) {
      setter.call(this, value);
      if(orig && orig.set) orig.set.call(this,value);
    });
    wrap.filter(obj, "removeAttribute", fkey, function(key) {
      setter.call(this, null);
      if(orig && orig.set) orig.set.call(this,null);
    });
  }
  if(getter) {
    descriptor["get"] = getter;
    wrap.filter(obj, "getAttribute", fkey, function(key) {
      return getter();
    });
  }

  try { Object.defineProperty(obj, key, descriptor); } catch(_){};
  new MutationObserver(function(a) {
    if(element_attribute_mutating)return;
    element_attribute_mutating = true;

    var n = a.length, i, e = null;
    for(i=0;i<n;++i) {
      var o=a[i];
      if(o.type === "attributes" && o.attributeName === lkey && o.target.__proto__===obj) {
        try {
          setter.call(o.target, o.attributeValue)
        } catch(_) {
          e = _;
          o.target.parentNode.removeChild(o.target);
        };
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
  return obj
}

module.exports = element_attribute;
