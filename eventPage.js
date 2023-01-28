console.log('eventpage.js called')

chrome.extension.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.message === "activate_icon") {
    chrome.tabs.query({ active: true, currentWindow: true, }, function () {
      chrome.pageAction.show(sender.tab.id);
    })
  }
});
