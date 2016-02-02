var innerhtml_observe = require("./innerhtml").observe;
var element_attribute = require("./element_attribute");
var blocked = require("./blocked");

function intercept_object(obj) {
  element_attribute(obj, "data",     function() { return "" }, blocked);
  element_attribute(obj, "codeBase", function() { return "" }, blocked);
  element_attribute(obj, "archive",  function() { return "" }, blocked);
  element_attribute(obj, "usemap",   function() { return "" }, blocked);
  return obj;
}

intercept_object(HTMLObjectElement.prototype);
innerhtml_observe("OBJECT");
