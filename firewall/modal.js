/* the <iframe> has sandbox enabled, so these should generate an exception
   if these routines are called.
*/
var function_named   =require("./function_named");
var blocked = require("./blocked");

function intercept_modal(fn) {
  window[fn] = function_named(fn, function() {
    blocked('javascript:' + fn);
  });
}

intercept_modal("alert");
intercept_modal("prompt");
intercept_modal("confirm");
