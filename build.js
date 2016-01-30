U=require("uglifyjs"),fs=require("fs")

T=[];
fs.readdirSync("tests/").forEach(function(x){
  if(x.match(/[^\.].*\.js$/)){
    var e=fs.readFileSync("tests/"+x)+"";
    T.push([x,e]);
  }
});
fs.writeFileSync("tests.html", 
  (fs.readFileSync("tests.src.html")+"").replace(/@@data@@/,JSON.stringify(T))
);


f=fs.readdirSync("firewall/").filter(function(x){ return x.match(/^[^\.].*\.js$/) });f.sort();
console.log('firewall/');
f=U.minify("(function(){"+f.map(function(x){return fs.readFileSync("firewall/"+x)+""}).join("")+"})()",{fromString:true,compress:{unsafe:true,hoist_vars:true}}).code;

console.log('code');
fs.writeFileSync("firewall.min.js.tmp", U.minify("firewall.js",{compress:{unsafe:true,hoist_vars:true}}).code.replace(/@@code@@/,JSON.stringify(f).replace(/^"/,'').replace(/"$/,'')));
fs.renameSync("firewall.min.js.tmp", "firewall.min.js");
