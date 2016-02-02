var innerhtml = require("./innerhtml");
var blocked = require("./blocked");

innerhtml.observe('SVG');
innerhtml.cdata('SVG', function(text) {
  var d = new DOMParser().parseFromString(this.outerHTML, "application/xml");
  visit(d.firstChild, {});

  innerhtml.orig.set.call(this,text);

  function visit(elem) {
    if(!elem) return;
    visit(elem.nextSibling), visit(elem.firstChild);
    if(elem.getAttributeNS("http://www.w3.org/1999/xlink", "href")) {
      blocked();
    }
  }
});

