var a=document.createElement("div");
a.innerHTML='<a href="javascript:parent.postMessage(\'fail\',\'*\')">W</a>';
document.body.appendChild(a);

var x=3,y=3;
var e=document.createEvent("MouseEvents");
e.initMouseEvent("click", 
  false,false,document.defaultView,0,x,y,x,y,false,false,false,false,0,a);
a.firstChild.dispatchEvent(e);
setTimeout(function(){ parent.postMessage('block','*') },2);
