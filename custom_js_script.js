var impression_display = "none";

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
    stats.style.display = impression_display;
    tweet.classList.add("flag");
  }
}
function mywork() {
  var obj = document.getElementsByTagName("article");
  for (var i = 0; i < obj.length; i += 1) {
    if (!obj[i].classList.contains("flag")) {
      processTweet(obj[i]);
    }
  }
}

function delayAndExecute() {
  setTimeout(function () {
    mywork();
  });
}

window.addEventListener(
  "scroll",
  function () {
    delayAndExecute();
  },
  false
);

// Everything but IE
window.addEventListener(
  "load",
  function () {
    delayAndExecute();
  },
  false
);

// // IE
// window.attachEvent("onload", function () {
//   delayAndExecute();
// });
