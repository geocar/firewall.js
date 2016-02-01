h=document.getElementsByTagName('head')[0];
if(!h)document.documentElement.appendChild(h=document.createElement('head'));
h.appendChild(s=document.createElement('style'))
s.type='text/css';
s=document.styleSheets[0];
s.insertRule('body{background:url(http://www.example.com/);}',0);

