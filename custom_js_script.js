console.log('custom_js_script.js called');
var enabled = window.localStorage.getItem('enabled'); //default
var counter = window.localStorage.getItem('counter');

var count_display = counter == 'true' ? 'none' : 'block';
var impression_display = enabled == 'true' ? 'none' : 'block'; //default


function getNthChild(father, n) {
  var child = father;
  for (var i = 0; i < n; i += 1) {
    child = child.children.item(0);
  }
  return child;
}

function removeCounts(obj) {

  for (var i = 0; i < 3; i += 1) {
    var child = getNthChild(obj.children.item(i), 2)
    if (!child) return;
    var counter = child.lastChild
    if (!counter) return;
    counter.style.display = count_display
  }
}


function processTweet(tweet) {
  var child = getNthChild(tweet, 3);
  var body = child.children.item(1).children.item(1).children.item(1);
  if (!body) return
  var footer = body.lastChild.children.item(0);
  removeCounts(footer)

  var stats = footer.children.item(3);

  if (stats) {
    stats.style.display = impression_display;
    tweet.classList.add('flag');
  }


}

function mywork() {
  console.log('stats script enabled:', enabled, 'hence:', impression_display);
  console.log('count script enabled:', counter, 'hence:', count_display);

  var obj = document.getElementsByTagName('article');
  // removed flag condition because it used to get only recent tweets
  for (var i = 0; i < obj.length; i += 1) {
    processTweet(obj[i]);
  }
}

window.addEventListener(
  'scroll',
  function () {
    mywork();
  },
  false
);

mywork();
