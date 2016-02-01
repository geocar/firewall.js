innerhtml_observe('SVG');
innerhtml_cdata('SVG', function(text) {
  var d = new DOMParser().parseFromString(this.outerHTML, "application/xml");
  visit(d.firstChild, {});

  innerhtml_orig.set.call(this,text);

  function visit(elem) {
    if(!elem) return;
    visit(elem.nextSibling), visit(elem.firstChild);
    if(elem.getAttributeNS("http://www.w3.org/1999/xlink", "href")) {
      blocked();
    }
  }
});

