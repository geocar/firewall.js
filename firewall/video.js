var innerhtml_observe = require("./innerhtml").observe;
var element_attribute = require("./element_attribute");
var blocked = require("./blocked");

function intercept_video(obj) {
  element_attribute(obj, "src",    function() { return "" }, blocked);
  element_attribute(obj, "poster", function() { return "" }, blocked);
  return obj;
}

intercept_video(HTMLVideoElement.prototype);
innerhtml_observe("VIDEO");
