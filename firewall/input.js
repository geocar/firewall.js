var innerhtml_observe = require("./innerhtml").observe;
var element_attribute = require("./element_attribute");
var blocked = require("./blocked");

function intercept_input(obj) {
  element_attribute(obj, "src", function() { return "" }, blocked);
  obj["submit"] = blocked;
  return obj;
}

intercept_input(HTMLInputElement.prototype);
innerhtml_observe("INPUT");

