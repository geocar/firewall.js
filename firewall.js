(function(module){
  function firewall(elem, code, oops) {
    var key, extra_oops = null;
    if(code === undefined) code = null;
    elem.setAttribute("firewall","");
    elem.setAttribute("sandbox","allow-scripts");
    reset();

    window.addEventListener("message", function(e) {
      if(e.source === elem.contentWindow) {
        if(e.data === null) {
        } else if(e.data === 'block') {
          reset();
          if(oops) setTimeout(oops,0);
          if(extra_oops) setTimeout(extra_oops,0);

        } else if(e.data === key) {
          readyp=true;
          if(code !== null) send();
        }
      }
    },true);

    function send() {
      key = null;
      try{elem.contentWindow.postMessage("@@code@@;setTimeout(new Function("+JSON.stringify(code)+'),0)','*')}catch(_){};
    }
    function reset() {
      key = "$"+Math.random().toString(36).substr(2);
      elem.srcdoc = '<b></b>';
      elem.srcdoc = '<scr'+'ipt>(function(k){function f(x){if(!k)++k,setTimeout(new Function(x.data))};addEventListener("message",f);parent.postMessage('+JSON.stringify(key)+',"*")})()</scr'+'ipt>';
      readyp = false;
    }

    elem.load = function(text, oops) {
      if(code !== null) reset();
      extra_oops = oops;

      code = text;
      if(readyp) send();
    };

    return elem;
  }
  
  try{module.exports=firewall}catch(_){window.FirewallJS=firewall};
})( (function(){return this["module"]}).call(this) );
