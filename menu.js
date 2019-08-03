document.getElementById("menuText").innerHTML = strings.menu;

MenuItem = function(stringLoc, link) {
  this.stringLoc = stringLoc;
  if (eval("strings." + this.stringLoc) == undefined) {
    this.stringLoc = "redacted"
  }
  this.link = link;
  this.html = `<div class="menuItem" onclick="location.assign('${this.link}')">${eval("strings." + this.stringLoc)}</div>`
}

MenuItem.prototype.apply = function() {
  document.getElementById("menu").innerHTML += this.html;
}

//Menu items
menuItems = [
new MenuItem("about", "actions_about.html"),
/*new MenuItem("bookmarks", "actions_bookmarks.html"),*/
new MenuItem("settingsGear", "settings.html"),
new MenuItem("featuresPlanned", "action_featuresplanned.html"),
];


for (let i of menuItems) {
  i.apply();
}

var toggleMenu = function() {
  if (!menuDisplay) {
    document.getElementById("menu").style.display = "block";
  } else {
    document.getElementById("menu").style.display = "none";
  }
  menuDisplay = !menuDisplay
}
