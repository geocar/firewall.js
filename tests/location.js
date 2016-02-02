location.href="javascript:parent.postMessage('fail','*')";
setTimeout(function() { parent.postMessage('block:javascript:location','*') }, 2);
