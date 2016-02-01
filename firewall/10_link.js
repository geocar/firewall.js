function intercept_link(obj) {
  element_attribute(obj, "href", function() { return "" }, blocked);
  return obj;
}

intercept_link(HTMLLinkElement.prototype);
innerhtml_observe("LINK");

