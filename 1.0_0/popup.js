
window.onload = function() {
  chrome.storage.local.get('enabled', function(data) {
    if (data.enabled === undefined) {
      chrome.storage.local.set({enabled: false});
      document.getElementById('toggleButton').textContent = 'Enable Safe Paste';
    } else if (data.enabled === true) {
      document.getElementById('toggleButton').textContent = 'Disable Safe Paste';
    } else {
      document.getElementById('toggleButton').textContent = 'Enable Safe Paste';
    }
  });
}

document.getElementById('toggleButton').addEventListener('click', function() {

  chrome.storage.local.get('enabled', data => {
    let enabled = !data.enabled;

    this.textContent = enabled ? 'Disable Safe Paste' : 'Enable Safe Paste';

    chrome.storage.local.set({enabled: enabled});
  });
});
