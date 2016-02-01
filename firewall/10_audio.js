function intercept_audio(obj) {
  element_attribute(obj, "src",    function() { return "" }, blocked);
  return obj;
}

intercept_audio(HTMLAudioElement.prototype);
innerhtml_observe("AUDIO");

