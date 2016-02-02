var innerhtml_observe = require("./innerhtml").observe;
var element_attribute = require("./element_attribute");
var blocked = require("./blocked");

function intercept_link(obj) {
  element_attribute(obj, "href", function() { return "" }, blocked);
  return obj;
}

intercept_link(HTMLLinkElement.prototype);
innerhtml_observe("LINK");

