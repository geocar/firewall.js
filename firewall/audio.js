var innerhtml_observe = require("./innerhtml").observe;
var element_attribute = require("./element_attribute");
var blocked = require("./blocked");

function intercept_audio(obj) {
  element_attribute(obj, "src",    function() { return "" }, blocked);
  return obj;
}

intercept_audio(HTMLAudioElement.prototype);
innerhtml_observe("AUDIO");

