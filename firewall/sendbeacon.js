var function_named = require("./function_named");
if("sendBeacon" in navigator)
  navigator["sendBeacon"] = function_named("sendBeacon", require("./blocked"));
