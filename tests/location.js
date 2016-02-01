location.href="javascript:parent.postMessage('fail','*')";
setTimeout(function() { parent.postMessage('pass','*') }, 2);
