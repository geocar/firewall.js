firewall.js creates an `<iframe>` that blocks networking and downloading.

    var x = document.createElement("iframe");
    document.body.appendChild(x);
 
    var f = firewall(x);
    f.load("<script>new Image().src='http://www.google.com/'</script>")

firewall.js is very new and incomplete: There are a *lot* of ways that JavaScript can be used to perform
a network request, a lot of different subtly incompatible web browsers, and there's only about 30 test vectors at the moment,
covering:

* Basic html tags like [a](tests/a.js), [link](tests/link.js), [audio](tests/audio.js), [video](tests/video.js), [images](tests/image.js) and [script](tests/script.js)
* Complex browser interaction like [innerHTML](tests/innerhtml.js) and [events](tests/a2.js)
* JavaScript API like [location](tests/location.js), [sendBeacon](tests/sendbeacon.js) and [xmlhttprequest](tests/xmlhttprequest.js)
* CSS/Stylesheets [inline](tests/style6.js), [parsed](tests/style4.js), and [programmatic](tests/style5.js)
* [SVG](tests/svg.js)

Ideally, a firewalled script will not be able to detect firewall.js

Suggestions and contributions are welcome.

##Limitations
Safari can't intercept changes to `innerHTML` and element attributes, so a `MutationObserver` is used instead.

This means that network operations might not be blocked, although at least they can be detected and the iframe
shutdown.
##Building

###Pre-flight

Node.JS is required to build the script and its test cases.

    npm install

###Development

To build `firewall.min.js` and `tests.html` run:

    npm run build

##Contributing
###Tests
Tests need to produce network activity; a full-featured test will send a signal to the [test system](tests.src.html).
On Google Chrome, we can reliably [detect network activity](firewall/99_poll.js) even if we can't block it, however
if your test only works on another browser, you may need to add some instrumentation:

* `parent.postMessage("fail",'*')` if you have (or believe you have) performed network activity
* `parent.postMessage("pass",'*')` if you are not performing network activity
* `parent.postMessage("block",'*')` if you can detect (e.g. with an exception) that network activity has not occurred

If you cannot "detect" network activity, but can manually verify it (by using developer tools or tcpdump), mark as
failed after the critical command -- using setTimeout and a small delay if necessary.

Look at [sendbeacon.js](tests/sendbeacon.js), [image.js](tests/image.js) and [xmlhttpreqest.js](tests/xmlhttprequest.js)
for some simple examples, and [a3.js](tests/a3.js) for a more complex one.

After every change, rebuild the test system with:

    npm run build

then verify the test by loading `tests.html` in a web browser. Note you can load a specific test by opening `tests.html#`*testname* e.g. `tests.html#style` will load [tests/style.js](tests/style.js).

###Anti-Test
An Anti-Test will make sure that a test *isn't* blocked. If you have example code that *should* work but doesn't with
firewall.js, you can contribute an Anti-Test to prevent further regressions.

* `parent.postMessage("anti",'*')`

This should be done first. Look at [anti\_a.js](tests/anti_a.js) for an example.

###Firewall
The firewall is built out of many small files in [firewall/](firewall/). The number at the beginning is to force the files
into an order when they are assmbled, so files in `10` can use functions defined by `06`.

Variables created should be based on the filename, so `innerhtml_slow` is defined in
[firewall/06\_innerhtml.js](firewall/06_innerhtml.js).

The API is in [firewall.js](firewall.js) - note the assembly process is in [build.js](build.js).

##Licensing
firewall.js, and its product `firewall.min.js` are redistributable under the [LGPL v3 or any later version](http://www.gnu.org/licenses/lgpl.en.html), and for the avoidance of doubt and confusion, are derived from the [tests](tests/).

The intention is: if you use firewall.js in your own product, you are **not** required to make available the source code to your product unless you introduce the ability to protect against a new attack vector.
