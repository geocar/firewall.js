if(performance&&performance.getEntries)!function poll_performance_entries() {
  var a=performance.getEntries(),n=a.length,i;
  for(i=0;i<n;++i)if((""+a[i].name).match(/^https?:/))parent.postMessage('fail','*');
  setTimeout(poll_performance_entries,100);
}()

