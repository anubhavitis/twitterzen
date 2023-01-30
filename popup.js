var enabled = 'false'; //disabled by default
var counter = 'false' //disabled by default
var statsButton = document.getElementById('stats-toggle');
var countButton = document.getElementById('count-toggle');

statsButton.onclick = () => {
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

  executeStatsLogic();
  injectScript();
};

countButton.onclick = () => {
  console.log('Clicked here');
  counter = counter == 'true' ? 'false' : 'true';
  chrome.storage.sync.set({ counter: counter });

  // Update to localStorage
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var tab = tabs[0];

    chrome.tabs.executeScript(
      tab.id,
      { code: `localStorage.setItem("counter", ${counter});` },
      (data) => {
        console.log('update cache data:', data);
      }
    );
  });

  executeCountLogic();
  injectScript();
};

function executeStatsLogic() {

  //Update the popup page
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var tab = tabs[0];

    chrome.tabs.executeScript(
      tab.id,
      { code: `localStorage.getItem("enabled");` },
      (data) => {
        enabled = data[0];
        console.log('enabled:', enabled);
        if (enabled === 'true') {
          statsButton.textContent = "Disable";
          statsButton.classList.remove('enable-btn')
          statsButton.classList.add('disable-btn')
        } else {
          statsButton.textContent = "Enable";
          statsButton.classList.remove('disable-btn')
          statsButton.classList.add('enable-btn')
        }
        console.log('button text:', statsButton.textContent);
      }
    );
  });

}

function executeCountLogic() {

  //Update the popup page
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var tab = tabs[0];

    chrome.tabs.executeScript(
      tab.id,
      { code: `localStorage.getItem("counter");` },
      (data) => {
        counter = data[0];
        console.log('counter:', counter);
        if (counter === 'true') {
          countButton.textContent = "Disable";
          countButton.classList.remove('enable-btn')
          countButton.classList.add('disable-btn')
        } else {
          countButton.textContent = "Enable";
          countButton.classList.remove('disable-btn')
          countButton.classList.add('enable-btn')
        }
        console.log('button text:', countButton.textContent);
      }
    );
  });

}


function injectScript() {
  // Inject code to twitter
  chrome.tabs.getSelected(null, function (tab) {
    chrome.tabs.executeScript(tab.id, { file: './custom_js_script.js' });
  });
}

window.addEventListener("load", () => {
  executeStatsLogic();
  executeCountLogic();
  injectScript();
})
