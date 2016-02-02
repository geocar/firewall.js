U=require("uglifyjs"),fs=require("fs"),MemoryFS = require("memory-fs");
P="var __config=window['__firewall_config'];delete window['__firewall_config'];";

f=fs.readdirSync("firewall/").filter(function(x){
  if(!x.match(/^[^\.].*\.js$/)) return false;      // not javascript
  var body = fs.readFileSync("firewall/"+x)+"";
  if(body.match(/module\.exports/i)) return false; // not an entry point
  return true;
}).map(function(x){ return "./"+x });f.sort();

T=[];
fs.readdirSync("tests/").forEach(function(x){
  if(x.match(/[^\.].*\.js$/)){
    var e=fs.readFileSync("tests/"+x)+"";
    T.push([x,e]);
  }
});
T.sort();T.reverse();
fs.writeFileSync("tests.html", 
  (fs.readFileSync("tests.src.html")+"").replace(/@@data@@/,JSON.stringify(T))
);



W = require("webpack")({ 
  context:__dirname+"/firewall/",
  entry:f,
  target:"web",
  output:{filename:'tmp.js',path:'/',library:false},
  node:{console:false,global:false,process:false,Buffer:false,__filename:true,__dirname:false},
});
F=W.outputFileSystem = new MemoryFS();
W.run(function(err,stats) {
  if(err)throw err;
  console.log(stats.toString({chunks:false,errorDetails:true,colors:true}));

  if(stats.hasErrors())process.exit(1);

  var f="(function(){"+P+F.readFileSync("/tmp.js")+'})();', g;
  try {
    g=U.minify(f,{fromString:true,compress:{unsafe:true,hoist_vars:true}}).code;
  } catch(e) {
    var a = f.split("\n");
    console.log("Error minifing firewall:");
    if(e.line > 1)
      console.log("  " + a[e.line-2]);
    console.log("> " + a[e.line-1]);
    if(e.line < a.length)
      console.log("  " + a[e.line]);
    process.exit(1);
  };
  try {
    f=U.minify("firewall.js",{compress:{unsafe:true,hoist_vars:true}}).code.replace(/@@code@@/,JSON.stringify(g).replace(/^"/,'').replace(/"$/,''));
  } catch(e) {
    console.log("Error in firewall.js line "+e.line);
    process.exit(1);
  };

  fs.writeFileSync("firewall.min.js.tmp", f);
  fs.renameSync("firewall.min.js.tmp", "firewall.min.js");

});

