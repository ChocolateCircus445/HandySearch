var searchBar = document.getElementById("searchBar");
var searchButton = document.getElementById("searchButton");
searchBar.value = ""
searchButton.innerHTML = strings.search;

for (let i in searchEngines) {
  if (i = searchEngine) {
    searchEngineObj = eval("searchEngines." + i);
  }
}

var searchInternet = function() {
  if (searchBar.value.trim() != "") {
    searchButton.style.backgroundColor = "#004b8c";
    location.assign(searchEngineObj.urlPrefix + encodeURI(searchBar.value));
  }
}

function onEnterKey(e){
  //Thanks to Matt on StackOverflow for this! https://stackoverflow.com/users/1571497/matt
  var code = (e.keyCode ? e.keyCode : e.which);
  if (code == 13) {
    searchInternet();
  }
}

searchButton.setAttribute("onclick", "searchInternet()");
searchBar.setAttribute("onkeypress", "onEnterKey(event)");
if (!eval("strings.se_" + searchEngineObj.id)) {
  searchBar.setAttribute("placeholder", searchEngineObj.name);
} else {
  searchBar.setAttribute("placeholder", eval("strings.se_" + searchEngineObj.id));
}
