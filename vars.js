var lang;
var strings;
var is24hr = eval(localStorage.getItem("handySearch-is24hr"));
if (is24hr == undefined) {
  is24hr = false;
  localStorage.setItem("handySearch-is24hr", "false");
}
if (!localStorage.getItem("handySearch-lang")) {
  lang = "en"
  localStorage.setItem("handySearch-lang", "en");
} else {
  lang = localStorage.getItem("handySearch-lang");
}
eval("strings = " + lang);
String.prototype.replaceAll = function(search, replacement) {
    //Big thank you to Cory Gross and Peter Mortensen on Stack Overflow for this
    var target = this;
    return target.split(search).join(replacement);
};
var stringJoin = function(strng, concatuates) {
  var sng = strng;
  for (i = 0; i < concatuates.length; i++) {
    sng.replaceAll("%" + i.toString(), concatuates[i]);
  }
  return sng;
}
if (!localStorage.getItem("handySearch-background")) {
  localStorage.setItem("handySearch-background", "aerial_seashore_rocks");
}
var allBookmarks = [];
var menuItems = [];
var SearchEngine = function(name, id, urlPrefix, protectsPrivacy) {
  this.name = name;
  this.id = id;
  this.urlPrefix = urlPrefix;
  this.protectsPrivacy = protectsPrivacy;
}
var searchEngines = {
  google: new SearchEngine("Google", "google", "https://www.google.com/search?q=", false),
  duckduckgo: new SearchEngine("DuckDuckGo", "duckduckgo", "https://duckduckgo.com/?q=", true),
  bing: new SearchEngine("Bing", "bing", "https://www.bing.com/search?q=", false),
  yahoo: new SearchEngine("Yahoo!", "yahoo", "https://search.yahoo.com/search?p=", false),
  startpage: new SearchEngine("Startpage.com", "startpage", "https://www.startpage.com/do/search?q=", true),
  searx: new SearchEngine("Searx", "searx", "https://searx.me/?q=", true),
  biglobe: new SearchEngine("\u30d3\u30c3\u30b0\u30ed\u30fc\u30d6", "biglobe", "https://cgi.search.biglobe.ne.jp/cgi-bin/search2-b?search=検索&q=", false),
  gigablast: new SearchEngine("Gigablast", "gigablast", "https://www.gigablast.com/search?q=", true),
}
var searchEngine = localStorage.getItem("handySearch-searchEngine")
if (!localStorage.getItem("handySearch-searchEngine")) {
  searchEngine = "google";
  localStorage.setItem("handySearch-searchEngine", searchEngine);
}
var searchEngineObj;
var menuDisplay = false;
