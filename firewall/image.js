var innerhtml_observe = require("./innerhtml").observe;
var element_attribute = require("./element_attribute");
var blocked = require("./blocked");

function intercept_image(obj) {
  element_attribute(obj, "src", function() { return "" }, blocked);
  return obj;
}

intercept_image(Image.prototype);
intercept_image(HTMLImageElement.prototype);
innerhtml_observe("IMG",Image);
