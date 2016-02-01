/* the <iframe> has sandbox enabled, so these should generate an exception
   if these routines are called.
*/
window["alert"]  =function_named("alert",  blocked);
window["prompt"] =function_named("prompt", blocked);
window["confirm"]=function_named("confirm",blocked);
