/* This can't block _actual_ real events
 */
wrap_before(EventTarget.prototype, "dispatchEvent", function(e) {
  if(!e.cancelable) blocked();
  if(e.type === 'click' || e.type.match(/^mouse/) || e.type === 'submit') e.preventDefault();
  return arguments;
})

