(function(module){
  function firewall(elem, options, oops) {
    var code, key, extra_oops = null, counter = 0;
    if(options === undefined || options === null || typeof options === "string") {
      code = options;
      options = {};
    } else if (options.code) {
      code = options.code;
    }
    elem.setAttribute("firewall","");
    elem.setAttribute("sandbox","allow-scripts");

    elem.addEventListener("load", function() {
      if(counter > 0) shutdown("javascript:onload");
      ++counter;
    });
    reset();

    function shutdown(reason) {
      reset();
      try{oops(reason)}catch(_){};
      try{extra_oops(reason)}catch(_){};
      try{options.onblock({data:reason})}catch(_){};
      try{elem.onblock({data:reason})}catch(_){};
    }

    window.addEventListener("message", function(e) {
      if(e.source === elem.contentWindow) {
        if(e.data === null) return;
        if(e.data === key) {
          readyp=true;
          if(code !== null) send();
          return;
        }
        if(typeof e.data === "string" && e.data.match(/^block:/)) {
          shutdown(e.data.substr(6,e.data.length-6));
        }
      }
    },true);

    function send() {
      key = null;
      try{elem.contentWindow.postMessage("window.__firewall_config="+JSON.stringify(options.settings)
+";@@code@@;setTimeout(new Function("+JSON.stringify(code)+'),0)','*')}catch(_){};
    }
    function reset() {
      key = "$"+Math.random().toString(36).substr(2);
      elem.srcdoc = '<b></b>';
      elem.srcdoc = '<scr'+'ipt>(function(k){function f(x){if(!k)++k,setTimeout(new Function(x.data))};addEventListener("message",f);try{document.documentElement.innerHTML="";}catch(_){};parent.postMessage('+JSON.stringify(key)+',"*")})()</scr'+'ipt>';
      readyp = false;
    }

    elem.whitelist = function(list) {
      if(options.settings === undefined) options.settings = {};
      options.settings.whitelist = list;
    };
    elem.blacklist = function(list) {
      if(options.settings === undefined) options.settings = {};
      options.settings.blacklist = list;
    };
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
