h =document.getElementsByName('head')[0];
if(!h)document.documentElement.appendChild( h=document.createElement('head') );

g=document.createElement('link');
h.appendChild(g);

g.rel='stylesheet', g.href='http://www.example.com/?link';


