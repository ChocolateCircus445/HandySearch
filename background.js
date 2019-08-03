var BackgroundImage = function(url, creator, langAddress) {
  this.url = url;
  this.creator = creator;
  this.langAddress = langAddress;
  this.title = eval("strings.bg_" + langAddress);
  if (this.title == undefined) {
    this.title = langAddress;
  }
  this.courtesyMessage = /*stringJoin(strings.bgCourtesy, ["", creator])*/ creator;
  this.image = document.createElement("img");
  this.image.setAttribute("src", this.url)
  this.isWhite = true;
}
BackgroundImage.prototype.apply = function() {
  document.body.style.backgroundImage = "url('" + this.url + "')";
  var splitLoc = location.href.split('/')
  if (splitLoc[splitLoc.length - 1] == "index.html") {
    document.getElementById("courtesy").innerHTML = this.courtesyMessage;
  }
}

var backgrounds = {
  aerial_seashore_rocks: new BackgroundImage("bg/aerial-seashore-rocks-artem-beliaikin.jpg", "Artem Beliaikin", "aerial_seashore_rocks"),
  new_york_skyline: new BackgroundImage("bg/new-york-skyline-handysearch.jpg", "HandySearch", "new_york_skyline"),
  mountains_cloudy_skies: new BackgroundImage("bg/mountains-cloudy-skies-stephan-seeber.jpg", "Stephan Seeber", "mountains_cloudy_skies"),
  devils_tower_1: new BackgroundImage("bg/devils-tower-1-handysearch.jpg", "HandySearch", "devils_tower_1"),
  devils_tower_2: new BackgroundImage("bg/devils-tower-2-handysearch.jpg", "HandySearch", "devils_tower_2"),
  mount_rushmore: new BackgroundImage("bg/mount-rushmore-handysearch.jpg", "HandySearch", "mount_rushmore"),
  white_brick_wall: new BackgroundImage("bg/white-brick-wall-rawpixel-com.jpg", "rawpixel.com", "white_brick_wall"),
  rocky_beach: new BackgroundImage("bg/rocky-beach-handysearch.jpg", "HandySearch", "rocky_beach"),
  butte_along_river: new BackgroundImage("bg/butte-along-river-handysearch.jpg", "HandySearch", "butte_along_river"),
};

//console.log(backgrounds.aerial_seashore_rocks.image);
eval("backgrounds." + localStorage.getItem("handySearch-background") + ".apply()");
