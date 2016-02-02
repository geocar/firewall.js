function blocked(url) {
  parent.postMessage('block:' + url,'*');
  window.close(),location.href='about:blank';
  throw 69;
}

module.exports = blocked;
