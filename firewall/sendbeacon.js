var wrap = require("./wrap");
var blocked = require("./blocked");
if("sendBeacon" in navigator)
  wrap.before(navigator, "sendBeacon", blocked);
