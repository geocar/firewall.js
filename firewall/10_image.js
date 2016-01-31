function intercept_image(obj) {
  element_attribute(obj, "src", function() { return "" }, blocked);
  element_attribute(obj, "ismap", function() { return false }, blocked);
  return obj;
}

intercept_image(Image.prototype);
intercept_image(HTMLImageElement.prototype);
innerhtml_observe("IMG",Image);
