var enabled = 'false';
var counter = 'false'
var statsButton = document.getElementById('stats-toggle');
var countButton = document.getElementById('count-toggle');

function getCounter() { return localStorage.getItem("counter"); }
function getEnabled() { return localStorage.getItem("enabled"); }
function setCounter(val) {
  console.log("setting count as:", val)
  localStorage.setItem("counter", val);
}
function setEnabled(val) {
  console.log("setting enabled as:", val)
  localStorage.setItem("enabled", val);
}

console.log("hello, world")

statsButton.onclick = () => {
  enabled = enabled == 'true' ? 'false' : 'true';
  chrome.storage.sync.set({ enabled: enabled });

  console.log("enabled:", enabled)
  // Update to localStorage
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id, allFrames: true },
      func: setEnabled,
      args: [enabled],
    });
  });

  executeStatsLogic();
  injectScript();
};

countButton.onclick = () => {
  counter = counter == 'true' ? 'false' : 'true';
  chrome.storage.sync.set({ counter: counter });

  console.log("counter:", counter)
  // Update to localStorage
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var tab = tabs[0];

    chrome.scripting.executeScript({
      target: { tabId: tab.id, allFrames: true },
      func: setCounter,
      args: [counter],
    });
  });

  executeCountLogic();
  injectScript();
};

function executeStatsLogic() {

  //Update the popup page
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var tab = tabs[0];

    chrome.scripting.executeScript({
      target: { tabId: tab.id, allFrames: true },
      func: getEnabled
    }).then((data) => {
      enabled = data[0].result;
      if (enabled === 'true') {
        statsButton.textContent = "Disable";
        statsButton.classList.remove('enable-btn')
        statsButton.classList.add('disable-btn')
      } else {
        statsButton.textContent = "Enable";
        statsButton.classList.remove('disable-btn')
        statsButton.classList.add('enable-btn')
      }
    })

  });

}




function executeCountLogic() {

  //Update the popup page
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var tab = tabs[0];

    chrome.scripting.executeScript({
      target: { tabId: tab.id, allFrames: true },
      func: getCounter
    }).then((data) => {
      counter = data[0].result;
      if (counter === 'true') {
        countButton.textContent = "Disable";
        countButton.classList.remove('enable-btn')
        countButton.classList.add('disable-btn')
      } else {
        countButton.textContent = "Enable";
        countButton.classList.remove('disable-btn')
        countButton.classList.add('enable-btn')
      }
    })
  });

}


function injectScript() {
  // Inject code to twitter
  chrome.tabs.query({ active: true, currentWindow: true }, function (tab) {
    chrome.scripting.executeScript({
      target: { tabId: tab[0].id, allFrames: true },
      files: ['./custom_js_script.js'],
    });
    // chrome.scripting.executeScript(tab[0].id, { file: './custom_js_script.js' });
  });
}

window.addEventListener("load", () => {
  executeStatsLogic();
  executeCountLogic();
  injectScript();
})
