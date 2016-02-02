var innerhtml_observe = require("./innerhtml").observe;
var element_attribute = require("./element_attribute");
var blocked = require("./blocked");

function intercept_iframe(obj) {
  element_attribute(obj, "src",    function() { return "" }, blocked);
  element_attribute(obj, "srcdoc", function() { return "" }, blocked);
  return obj;
}
intercept_iframe(HTMLIFrameElement.prototype);
innerhtml_observe("IFRAME",blocked);

