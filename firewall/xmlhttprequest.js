var blocked = require("./blocked");
var function_named = require("./function_named");
window["XMLHttpRequest"].prototype.open = function_named("open", function(method, url, asyncp) {
  blocked(url);
});
