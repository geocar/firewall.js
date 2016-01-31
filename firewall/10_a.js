function intercept_a(obj) {
  obj['click'] = function_named('click',blocked);
  return obj;
}
intercept_a(HTMLAnchorElement.prototype);
innerhtml_observe("A");

