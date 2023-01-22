function getNthChild(father, n){
    var child = father;
    for (var i=0; i<n; i+=1){
        child = child.children.item(0);
    }
    return child;
}

var impression_display = "none";
// var impression_display = "block";

function processTweet(tweet){
    var child = getNthChild(tweet, 3)
    console.log('child:')
    console.log(child)

    var body = child.children.item(1).children.item(1).children.item(1)
    console.log('body:')
    console.log(body)

    var footer = body.lastChild.children.item(0)
    console.log('footer:')
    console.log(footer)

    var stats = footer.children.item(3)
    console.log('stats:')
    console.log(stats)

    if (stats) {
        stats.style.display=  impression_display;
        tweet.classList.add('flag');
    }

    // stats?.style?.display=  "none";

    // footer.removeChild(stats)
}
function mywork(){
    var obj = document.getElementsByTagName("article")
    console.log("Number of tweets found:", obj.length)
    for(var i=0; i<obj.length; i+=1) {
        // If 'flag' not there:
        //  process tweet and append flag
        // else:
        // ignore

        if (!obj[i].classList.contains('flag')){
            console.log("Processing tweet: ", i);
            console.log(obj[i]);
            processTweet(obj[i]);
        }
    }
    
}

function delayAndExecute() {
    setTimeout(function () { mywork() }, 2500);
}

window.addEventListener("scroll", function() {
    delayAndExecute()
}, false);

// Everything but IE
window.addEventListener("load", function() {
    delayAndExecute()
}, false); 

// IE
window.attachEvent("onload", function() {
    delayAndExecute();
});

// Remove child not working
// Running script on new tweets