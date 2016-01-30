function intercept_image(obj) {
  element_attribute(obj, "src", function() { return "" }, blocked);
  return obj;
}

wrap_constructor(window,"Image",intercept_image);
createelement_constructor("IMG", intercept_image);
