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

  executeLogic();
};

function executeLogic() {

  //Update the popup page
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var tab = tabs[0];

    chrome.tabs.executeScript(
      tab.id,
      { code: `localStorage.getItem("enabled");` },
      (data) => {
        enabled = data[0];
        console.log('enabled:', enabled);
        if (enabled === "true") {
          myButton.textContent = "Disable";
          myButton.classList.remove('enable-btn')
          myButton.classList.add('disable-btn')
        } else {
          myButton.textContent = "Enable";
          myButton.classList.remove('disable-btn')
          myButton.classList.add('enable-btn')
        }
        console.log('button text:', myButton.textContent);
      }
    );
  });

  // Inject code to twitter
  chrome.tabs.getSelected(null, function (tab) {
    chrome.tabs.executeScript(tab.id, { file: './custom_js_script.js' });
  });
}

window.addEventListener("load", executeLogic)
