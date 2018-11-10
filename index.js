var global;
var text = "";

var analysis = [
  
];

function createElementFromHTML(htmlString) {
  var div = document.createElement('html');
  div.innerHTML = htmlString.trim();
  return div;
}

chrome.runtime.onMessage.addListener(function(request, sender) {
  if (request.action == "getSource") {
    global = createElementFromHTML(request.source);
    var ps = $($(global)[0].children[1]).find("p");
    for (var i = 0; i < ps.length; i++){
      text += " " + ps[i].textContent;
    }
    console.log(text);
  }
});

function onWindowLoad() {
  var message = document.querySelector('#message');
  chrome.tabs.executeScript(null, {
    file: "getPagesSource.js"
  }, function() {
    // If you try and inject into an extensions page or the webstore/NTP you'll get an error
    if (chrome.runtime.lastError) {
      message.innerText = 'There was an error injecting script : \n' + chrome.runtime.lastError.message;
    }
  });
}

window.onload = onWindowLoad;

// function crawl(){
//   var elems = document.getElementsByTagName("p");
//   String s = "";
//   for (var i = 0; i < elems.length; i++){
//     s += elems[0] + " ";
//   }
// }
