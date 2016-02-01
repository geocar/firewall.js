h=document.getElementsByTagName('head')[0];
if(!h)document.documentElement.appendChild(h=document.createElement('head'));
h.appendChild(s=document.createElement('style'))
s.type='text/css';
s=document.styleSheets[0];
s.insertRule('body{color:red;}',0);
s.cssRules[0].style.backgroundImage='url(http://www.example.com/?style5)';
