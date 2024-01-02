chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  chrome.storage.local.get('enabled', data => {
    if (data.enabled && changeInfo.status === 'complete') {
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: ['copypaste.js']
      });
    }
  });
});
