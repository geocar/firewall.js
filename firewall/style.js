var innerhtml = require("./innerhtml");
var blocked = require("./blocked");
var wrap = require("./wrap");

function style_check(text) {
  if(text.cssRule) text = text.toString();
  var m = text.match(/url\s*\(([\s"']*http.*)/i);
  if(m) {
    m=m[1].replace(/^\s*/,"");
    var c = m.substr(0,1);
    if     (c == "'") m = m.substr(1,m.length-1).replace(/\s*'\s*\)/,"");
    else if(c == '"') m = m.substr(1,m.length-1).replace(/\s*"\s*\)/,'');
    else m = m.replace(/\s*\).*$/, "");
    blocked(m);
  }
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

wrap.before(CSSStyleSheet.prototype, "insertRule", function(text, position) {
  style_check(text);
  return arguments;
});

style_wrap(HTMLElement.prototype);
wrap.before(HTMLElement.prototype, "setAttribute", function(k, v) {
  if(k == "style") style_check(v);
  return arguments;
});

style_wrap(CSSStyleRule.prototype);
style_wrap(CSSRule.prototype);

innerhtml.cdata('STYLE', function(css) {
  style_check(css);
  innerhtml.orig.set.call(this,css);
});

