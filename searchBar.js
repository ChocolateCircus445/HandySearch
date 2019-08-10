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
    if (searchBar.value.split(".")[0] == "www" || searchBar.value.substring(0, 3) == "#w,") {
      //www.example.com
      //#w,chocolatecircus445.github.io/talk-like-a-pickle
      location.assign("http://" + searchBar.value.split("#w,").join(""));
    } else if (searchBar.value.substring(0, 3) == "#m,") {
      //[M]ust include
      //#m,[term to include]
      location.assign(searchEngineObj.urlPrefix + encodeURI("\"" + searchBar.value.substring(3, searchBar.value.length) + "\""));
    } else if (searchBar.value.substring(0, 3) == "#n,") {
      //Can [n]ot include
      //#n,[term to omit],[other term to omit],[included term]
      var terms = searchBar.value.split(",");
      terms.shift();
      for (let i = 0; i < terms.length - 1; i++) {
        terms[i] = "-" + terms[i] + " ";
      }
      terms = terms.join("");
      location.assign(searchEngineObj.urlPrefix + encodeURI(terms));
    } else if (searchBar.value.substring(0, 3) == "#r,") {
        //Sub[r]eddit
        //#r,[subreddit (no "r/")]
        location.assign("http://reddit.com/r/" + searchBar.value.substring(3, searchBar.value.length));
      } else if (searchBar.value.substring(0, 3) == "#t,") {
        //[T]witter hashtag
        //#t,[hashtag (without hash mark)]
        location.assign("https://twitter.com/hashtag/" + encodeURI(searchBar.value.split("#t,").join("")));
      }
      else if (searchBar.value.substring(0, 3) == "#y,") {
        //[Y]ouTube video search
        //#y,[keyword]
        location.assign("https://youtube.com/search?q=" + encodeURI(searchBar.value.split("#y,").join("")));
      } else {
      location.assign(searchEngineObj.urlPrefix + encodeURI(searchBar.value));
    }
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
