chrome.runtime.sendMessage({
  message: "activate_icon",
});

let active_tab_id = 0;

chrome.tabs.onActivated.addListener((tab) => {
  chrome.tabs.get(tab.tabId, (current_tab_info) => {
    active_tab_id = tab.tabId;

    if (/^https:\/\/www\.twitter/.test(current_tab_info.url)) {
      chrome.tabs.executeScript(null, { file: "./custom_js_script.js" }, () =>
        console.log("i injected")
      );
    }
  });
});
