var Bookmark = function(url, name) {
  this.url = url;
  this.name = name;
  this.html = `<td class=\"bookmark\" url=\"${url}\" onclick=\"location.assign('http://${url}')\"><img src=\"https://www.google.com/s2/favicons?domain=${url}\"><span>${name}</span></td>`
}

Bookmark.prototype.toString = function() {
  return `{url: "${this.url}", name: "${this.name}", html: \`${this.html}\`}`;
}

var loadBookmarks = function() {
  var bookmarkLS = localStorage.getItem("handySearch-bookmarkCode");
  if (bookmarkLS == undefined || bookmarkLS == "") {
    localStorage.setItem("handySearch-bookmarkCode", "<td class=\"bookmark\" style=\"text-align: center;\">\n<span>+</span>\n</td>");
    bookmarkLS = localStorage.getItem("handySearch-bookmarkCode");
  }
  if (localStorage.getItem("handySearch-bookmarks") == undefined || localStorage.getItem("handySearch-bookmarks") == "") {
    localStorage.setItem("handySearch-bookmarks", "[]");
  }
  allBookmarks = eval(localStorage.getItem("handySearch-bookmarks"));
  for (var i = 0; i < allBookmarks.length; i++) {
    var untainted = allBookmarks[i];
    var newBM = new Bookmark(untainted.url, untainted.name);
    allBookmarks[i] = newBM;
  }
  document.getElementById("bookmarkPlace").innerHTML = bookmarkLS;

}

var saveBookmarks = function() {
  var totalBookmarkCode = "<td class=\"bookmark\" style=\"text-align: center;\">\n<span>+</span>\n</td>\n";
  for (var i = 0; i < allBookmarks.length; i++) {
    totalBookmarkCode += allBookmarks[i].html + "\n";
  }
  localStorage.setItem("handySearch-bookmarkCode", totalBookmarkCode);
  localStorage.setItem("handySearch-bookmarks", "[" + allBookmarks + "]")
}

var clearBookmarks = function() {
  localStorage.setItem("handySearch-bookmarks", "");
  localStorage.setItem("handySearch-bookmarkCode", "");
}

var setWidthOfBookmarks = function() {
  var bookmarks = document.getElementsByClassName("bookmark");
  var lengthPercent = (1 / bookmarks.length) * 100;
  for (var i = 0; i < bookmarks.length; i++) {
    bookmarks[i].style.width = lengthPercent + "%";
  }
}

loadBookmarks();
setWidthOfBookmarks();