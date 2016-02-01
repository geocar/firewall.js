function intercept_source(obj) {
  element_attribute(obj, "src",    function() { return "" }, blocked);
  return obj;
}

intercept_source(HTMLSourceElement.prototype);
innerhtml_observe("SOURCE");
