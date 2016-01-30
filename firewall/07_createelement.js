var orig_createElement=document.createElement.bind(document);
var element_database = {};
function createelement_constructor(tag, constructor) {
  console.log("tag:",tag,constructor);
  element_database[ tag.toUpperCase() ] = constructor;
}

Object.defineProperty(document,'createElement',{
  configurable: true,
  value: function_named('createElement', function(type) {
    var elem = orig_createElement(type), cons = element_database[ type.toUpperCase().replace(/^</,"").replace(/[ >].*$/,"") ];
    if(cons) elem = cons(elem);
    return elem;
  })
});

