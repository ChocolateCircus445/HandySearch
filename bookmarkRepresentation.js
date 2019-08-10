var createBookmark = function(bookmark, index) {
  var html = `<div class="bookmarkRep" index="${index}"><span><img src="https://www.google.com/s2/favicons?domain=${bookmark.url}" width="32" height="32">${bookmark.name}<img src="pencil.png" width="16" height="16" onclick="editBMName(${index})"></span><p style="font-size: 8; color: gray; background-color: white; margin: 0;">${bookmark.url}<img src="pencil.png" width="16" height="16" onclick="editBMUrl(${index})"><img src="delete.png" width="16" height="16" onclick="deleteBookmark(${index})"></p></div>`;
  return html;
}
var editBMName = function(index) {
  var name = prompt(strings.newBMName ? strings.newBMName : "What is the bookmark's new name?");
  var name = name ? name : bkm[index].name;
  bkm[index].name = name;
  allBookmarks = bkm;
  bkm = [];
  putBookmarks();
}
var editBMUrl = function(index) {
  var url = prompt(strings.newBMUrl ? strings.newBMUrl : "What is the bookmark's new url?");
  var url = url ? url : bkm[index].url;
  bkm[index].url = url;
  allBookmarks = bkm;
  bkm = [];
  putBookmarks();
}

var addBookmark = function() {
  let name = prompt(strings.bmName ? strings.bmName : "What is the name of the bookmark?");
  if (!name) {
    alert(strings.bmNameErr ? strings.bmNameErr : "Error: No name");
    return;
  }
  let url = prompt(strings.bmUrl ? strings.bmUrl : "What is the url of the bookmark?");
  if (!url) {
    alert(strings.bmUrlErr ? strings.bmUrlErr : "Error: No url present");
    return;
  }
  let nbm = new Bookmark(url, name);
  bkm.push(nbm);
  allBookmarks = bkm;
  bkm = [];
  putBookmarks();
}

var deleteBookmark = function(index) {
  if (confirm(strings.deleteBMCF ? strings.deleteBMCF : "Are you sure you want to delete this bookmark?")) {
    bkm.splice(index, 1);
    allBookmarks = bkm;
    bkm = [];
    putBookmarks();
  }
}

var saveBMSettings = function() {
  saveBookmarks();
  location.assign("index.html");
}
