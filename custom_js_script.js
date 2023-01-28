console.log('custom_js_script.js called');
var enabled = window.localStorage.getItem('enabled'); //default

var impression_display = enabled == 'true' ? 'none' : 'block'; //default
function getNthChild(father, n) {
  var child = father;
  for (var i = 0; i < n; i += 1) {
    child = child.children.item(0);
  }
  return child;
}

function processTweet(tweet) {
  var child = getNthChild(tweet, 3);
  var body = child.children.item(1).children.item(1).children.item(1);
  var footer = body.lastChild.children.item(0);
  var stats = footer.children.item(3);

  if (stats) {
    debugger;
    stats.style.display = impression_display;
    tweet.classList.add('flag');
  }
}

function mywork() {
  var obj = document.getElementsByTagName('article');
  // removed flag condition because it used to get only recent tweets
  for (var i = 0; i < obj.length; i += 1) {
    processTweet(obj[i]);
  }
}

function delayAndExecute() {
  console.log('executing script:', enabled);
  setTimeout(function () {
    mywork();
  }, 2500);
}

window.addEventListener(
  'scroll',
  function () {
    delayAndExecute();
  },
  false
);

console.log('script enabled:', enabled, 'hence:', impression_display);
mywork();
