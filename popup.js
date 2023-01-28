var enabled = 'false'; //disabled by default
var storageKey = 'enabled';
var myButton = document.getElementById('toggle');

myButton.onclick = () => {
  console.log('Clicked here');
  enabled = enabled == 'true' ? 'false' : 'true';
  chrome.storage.sync.set({ enabled: enabled });

  // Update to localStorage
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var tab = tabs[0];

    chrome.tabs.executeScript(
      tab.id,
      { code: `localStorage.setItem("enabled", ${enabled});` },
      (data) => {
        console.log('update cache data:', data);
      }
    );
  });

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var tab = tabs[0];

    chrome.tabs.executeScript(
      tab.id,
      { code: `localStorage.getItem("enabled");` },
      (data) => {
        enabled = data[0];
        console.log('enabled:', enabled);
        myButton.textContent = enabled == 'true' ? 'Disable' : 'Enable';
        console.log('button text:', myButton.textContent);
      }
    );
  });

  // Reload
  chrome.tabs.getSelected(null, function (tab) {
    // calling external js file directly instead of on load
    chrome.tabs.executeScript(tab.id, { file: './custom_js_script.js' });
  });
};
