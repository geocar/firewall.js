var innerhtml_observe = require("./innerhtml").observe;
var element_attribute = require("./element_attribute");
var blocked = require("./blocked");

function intercept_script(obj) {
  element_attribute(obj, "src",    function() { return "" }, blocked);
  return obj;
}

intercept_script(HTMLScriptElement.prototype);
innerhtml_observe("SCRIPT");
