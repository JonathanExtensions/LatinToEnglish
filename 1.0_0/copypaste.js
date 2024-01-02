let intervalId;

function handlePaste(e) {
  if (e.target.type === 'text') {
    e.preventDefault();

    /* Where the magic happens. Clipboard text cleanup */
    let text = (e.clipboardData || window.clipboardData).getData('text');
    text = text.normalize("NFD").replace(/[\u0300-\u036F]/g, "").replace(/\uFFFD/g,"").replace(/\u2026/g,"...").replace(/\u22EF/g,"...").replace(/\u0060/g,"'").replace(/\u00B4/g,"'").trim();
    let existingText = e.target.value;
    let selectionStart = e.target.selectionStart;
    let selectionEnd = e.target.selectionEnd;
    let textBeforeSelection = existingText.slice(0, selectionStart);
    let textAfterSelection = existingText.slice(selectionEnd);
    e.target.value = textBeforeSelection + text + textAfterSelection;

    /* Create input event for recognition in HTML */
    const inputEvent = new Event('input', { bubbles: true });
    e.target.dispatchEvent(inputEvent);

    e.target.selectionStart = textBeforeSelection.length + text.length;
    e.target.selectionEnd = textBeforeSelection.length + text.length;
  }
}


chrome.storage.local.get('enabled', function (data) {
  if (data.enabled) {
    document.body.addEventListener('paste', handlePaste);
  } else {
    document.body.removeEventListener('paste', handlePaste);
  }
});

chrome.storage.onChanged.addListener(function (changes, area) {
  if (area === 'local' && 'enabled' in changes) {
    if (changes.enabled.newValue) {
      document.body.addEventListener('paste', handlePaste);
    } else {
      if (intervalId) {
        clearInterval(intervalId);
      }
      document.body.removeEventListener('paste', handlePaste);
    }
  }
});
