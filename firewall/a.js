var function_named = require("./function_named");
var blocked = require("./blocked");
var innerhtml_observe = require("./innerhtml").observe;

/* click is intercepted here, and in 09_events.js, but nothing else
   is modified because of a common pattern, where the "a" element is
   used as a URL parser.
*/
function intercept_a(obj) {
  obj['click'] = function_named('click',blocked);
  return obj;
}
intercept_a(HTMLAnchorElement.prototype);
innerhtml_observe("A");
