parent.postMessage('anti','*');

var a = document.createElement('a');
a.href='http://google.com/';
a.path='/';

var x = a.href;

parent.postMessage('pass','*');
