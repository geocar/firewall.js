var innerhtml_orig = Object.getOwnPropertyDescriptor(Element.prototype,'innerHTML');
var innerhtml_watches = {};
var innerhtml_cdata_filter = {};

function innerhtml_cdata(tag, impl) {
  innerhtml_cdata_filter[tag.toUpperCase()] = impl;
}

function innerhtml_observe(tag, cons) {
  if(!cons) cons = function(){ return document.createElement(tag); };
  innerhtml_watches[tag.toUpperCase()] = cons;
}

function innerhtml_slow(node, html) {
  /* doesn't fire <img src= inside a <template */
  var doc = document.createElement('template');
  innerhtml_orig.set.call(doc, html);
  visit(doc.content);
  move(node, doc.content);

  function move(dest, src) {
    var child = src.firstChild;
    while(child) {
      src.removeChild(child);
      dest.appendChild(child);
      child = src.firstChild;
    }
  }

  function visit(elem) {
    if(!elem)return;
    
    visit(elem.firstChild),visit(elem.nextSibling); //dfs

    var cons;
    if (elem.tagName && (cons=innerhtml_watches[ elem.tagName.toUpperCase() ])) {
      var replace = new cons(), attr = elem.attributes, n = attr.length, i = 0;
      for(; i < n; ++i) {
        var a = attr[i];
        replace.setAttribute(a.name, a.value);
      }
      move(replace, elem);
      elem.parentNode.replaceChild(replace, elem);
    }
  }
}

if(innerhtml_orig.get && innerhtml_orig.set) {
  Object.defineProperty(Element.prototype,'innerHTML',{
    enumerable:true,
    configurable:true,
    get: function() {
      return innerhtml_orig.get.call(this);
    },
    set: function(html) {
      var cf = innerhtml_cdata_filter[(""+this.tagName).toUpperCase()];
      if(cf) return cf.call(this, html);

      var qr = new RegExp(Object.keys(innerhtml_watches).join("|"),"i");
      if(html.match(qr)) innerhtml_slow(this, html); else innerhtml_orig.set.call(this,html);
    }
  });
}
