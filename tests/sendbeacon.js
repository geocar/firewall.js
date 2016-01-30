if(navigator.sendBeacon) {
  navigator.sendBeacon('about:blank');
  parent.postMessage("fail",'*');
} else {
  parent.postMessage("pass",'*');
}
