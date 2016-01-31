var a = document.createElement("a");
a.href="javascript:parent.postMessage('fail','*')";
a.click();
