var config = require("./config");
var whitelist = build_list(config["whitelist"]);
var blacklist = build_list(config["blacklist"]);

function build_list(list) {
  if(!list) return null;

  var i, n = list.length, a = new Array(n);
  for(i = 0; i < n; ++i) {
    a[i] =
      list[i].replace(/([\(|\)\\\?.*^$])/g, function(_,x){
      if(x === "*") return ".*";
      return "\\" + x;
    }).replace(/^\/\//, "https?://");
  };

  return new RegExp("^(" + a.join("|") + ")", "i");
}

function blocked(url) {
  if(url === undefined || url === null)return;
  if(!blacklist || !blacklist.exec(url))
    if(whitelist && whitelist.exec(url))return;
  parent.postMessage('block:' + url,'*');
  window.close(),location.href='about:blank';
  throw 69;
}

module.exports = blocked;
