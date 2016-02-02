var function_named   =require("./function_named");
var blocked = require("./blocked");

blat(window, ["RTCPeerConnection", "mozRTCPeerConnection", "webkitRTCPeerConnection", "msRTCPeerConnection", "RTCSessionDescription", "mozRTCSessionDescription"]);
blat(navigator,["getUserMedia","mozGetUserMedia","webkitGetUserMedia","msGetUserMedia"]);

function blat(x,a) {
  var n=a.length,i;
  for(i=0;i<n;++i) {
    var k = a[i];
    if(k) window[k]= function_named(k,blocked);
  }
}
