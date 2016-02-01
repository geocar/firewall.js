var events_prototype;
if(typeof EventTarget === "object") {
  events_prototype = EventTarget.prototype;
} else {
  events_prototype = HTMLElement.prototype;
}

wrap_before(events_prototype, "dispatchEvent", function(e) {
  if(!e.cancelable) blocked();
  if(e.type === 'click' || e.type.match(/^mouse/) || e.type === 'submit') e.preventDefault();
  return arguments;
})

