/* If new() were a function, this does what new.apply should do.  */
function new_apply(klass, args) {
  args = [].slice.call(args);
  var body = "return new klass(" + args.map(function(_,i){ return "args["+i+"]" }).join(",") + ")";
  return new Function("klass", "args", body)(klass, args);
}

module.exports = new_apply;
