/* the <iframe> has sandbox enabled, so these should generate an exception
   if these routines are called.
*/
var function_named   =require("./function_named");
var blocked = require("./blocked");

window["alert"]  =function_named("alert",  blocked);
window["prompt"] =function_named("prompt", blocked);
window["confirm"]=function_named("confirm",blocked);
