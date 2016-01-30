/* It's possible to inspect the name of functions using the f.name -- not all javascript engines support this directly,
 * but sometimes they have a toString or toSource that expose this information, and of course _those_ functions need to have the correct name as well.
 *
 * If body isn't a constructor, we can just use body.bind(null) to get "native code", but there's no way to tell that nobody will call new body()
 */
function function_named(name, body) {
  var f = function() {
    return body.apply(this,arguments);
  };
  if(function_named.name === "function_named") f.name = name;

  var name_string = new Function().bind(null).toString().replace(/ \(/,name+"(");
  f.toString = function toString() { return name_string }.bind(null);
  if(f.toLocaleString) f.toLocaleString = function toLocaleString() { return name_string }.bind(null);
  if(f.toSource) f.toSource = function toSource() { return name_string }.bind(null);
  return f;
}
