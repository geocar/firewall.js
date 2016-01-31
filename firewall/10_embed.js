function intercept_embed(obj) {
  element_attribute(obj, "src", function() { return "" }, blocked);
  return obj;
}

intercept_embed(HTMLEmbedElement.prototype);
innerhtml_observe("EMBED");
