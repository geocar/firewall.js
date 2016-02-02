parent.postMessage('anti','*');

if('__firewall_config' in window) {
  parent.postMessage('blocked:__firewall_config','*');
} else {
  parent.postMessage('pass','*');
}

