function style_check(text) {
  if(text.cssRule) text = text.toString();
  if(text.match(/url\s*\([\s"']*http/i)) blocked();
}

function style_intercept_property(style, key) {
  var orig = Object.getOwnPropertyDescriptor(style, key);
  Object.defineProperty(style, key, {
    configurable: true,
    set: function(value) {
      style_check(value);
      orig.set.call(this, value);
    }
  });
}
function style_intercept(style) {
  style_intercept_property(style, "background");
  style_intercept_property(style, "backgroundImage");
  style_intercept_property(style, "cursor");
  style_intercept_property(style, "content");
  style_intercept_property(style, "listStyle");
  style_intercept_property(style, "listStyleImage");
  style_intercept_property(style, "filter");
  return style;
}

function style_wrap(proto) {
  var orig = Object.getOwnPropertyDescriptor(proto, "style");
  Object.defineProperty(proto, "style", {
    configurable: true,
    get: function() { return style_intercept(orig.get.call(this)) },
    set: function(text) { style_check(text); orig.set.call(this, text); }
  });
}

wrap_before(CSSStyleSheet.prototype, "insertRule", function(text, position) {
  style_check(text);
  return arguments;
});

style_wrap(HTMLElement.prototype);
style_wrap(CSSStyleRule.prototype);
style_wrap(CSSRule.prototype);

innerhtml_cdata('STYLE', function(css) {
  style_check(css);
  innerhtml_orig.set.call(this,css);
});

