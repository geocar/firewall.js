function blocked() {
  parent.postMessage('block','*');
  window.close(),location.href='about:blank';
  throw 69;
}
