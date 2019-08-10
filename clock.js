var ClockDef = function(langFile) {
  /*
  lang = language
  timeFormat = the format of the time, i.e. $%h:%m| %x in English would be 7:10 AM
  dateFormat = the format of the date, i.e. %l/%d/%y in English would be displayed as 4/5/2019, or, in words, April 5th, 2019
  weekdays = an array of weekdays (for example, ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"])
  timeSuffixes = length is 2 [am, pm]

  PERCENT CODES:
  %d = day
  %h = hour
  %l = month (l is for [l]unar cycle)
  %m = minute
  %w = weekday
  %x = suffi[x] (i.e. AM, PM, gozen, gogo, etc.)
  %y = year (4 digits)
  $ = begin big text
  | = end big text

  English template would be: "$%h:%m|%x"
  */
  this.lang = langFile;
  this.timeFormat = eval(langFile + ".timeFormat");
  this.dateFormat = eval(langFile + ".dateFormat");
  this.weekdays = eval(langFile + ".weekdays");
  //this.isAMPM = isAMPM;
  this.timeSuffixes = eval(langFile + ".timeSuffixes");
  this.is24hr = eval(langFile + ".is24hr");
  /*
  if (this.is24hr) {
    this.timeFormat = "$%h:%m|";
  }
  */
  this.html = "<div id=\"clock\" style=\"line-height: 0.7;\">";
  this.time = "<p id=\"time\" style=\"font-family: MPLUS-Bold;\">"
  this.timeFormat = this.timeFormat.replaceAll("$", "<span style=\"font-family: Nunito; font-size: 72pt;\">");
  this.timeFormat = this.timeFormat.replaceAll("|", "</span>");
  this.timeFormat = this.timeFormat.replaceAll("%h", "<span id=\"hour\"></span>");
  this.timeFormat = this.timeFormat.replaceAll("%m", "<span id=\"minute\"></span>");
  this.timeFormat = this.timeFormat.replaceAll("%x", "<span id=\"suffix\"></span>");
  this.timeFormat += "</p>";
  this.html += this.time + this.timeFormat + "</p><p id=\"date\" style=\"font-family: MPLUS;\">";
  this.dateFormat = this.dateFormat.replaceAll("%w", "<span id=\"weekday\"></span>");
  this.dateFormat = this.dateFormat.replaceAll("%d", "<span id=\"day\"></span>");
  this.dateFormat = this.dateFormat.replaceAll("%l", "<span id=\"month\"></span>");
  this.dateFormat = this.dateFormat.replaceAll("%y", "<span id=\"year\"></span>");
  this.html += this.dateFormat + "</p><p id=\"notOnline\" style=\"display: none; font-family: MPLUS;\">No internet</p></div>";
}

ClockDef.prototype.apply = function() {
  document.getElementById("clock_container").innerHTML = this.html;
  var timeSuffixes = this.timeSuffixes;
  var weekdays = this.weekdays;
  setInterval(function(tv) {
    var d = new Date();
    var minute = d.getMinutes();
    var isAM = true;
    if (minute < 10) {
      minute = "0" + minute;
    }
    document.getElementById("minute").innerHTML = minute;
    var hour = d.getHours();
    if (hour > 11) {
      isAM = false;
    }
    if (hour > 12 && !this.is24hr) {
      hour = hour - 12;
    }
    if (hour == 0 && !this.is24hr) {
      hour = 12;
    }
    document.getElementById("hour").innerHTML = hour;
    if (!this.is24hr) {
      if (isAM) {
        document.getElementById("suffix").innerHTML = timeSuffixes[0];
      } else {
        document.getElementById("suffix").innerHTML = timeSuffixes[1];
      }
    }
    document.getElementById("day").innerHTML = d.getDate();
    document.getElementById("month").innerHTML = d.getMonth() + 1;
    document.getElementById("year").innerHTML = d.getFullYear();
    document.getElementById("weekday").innerHTML = weekdays[d.getDay()];
  },100);
}

var clockDefs = {
  /*
  en: new ClockDef("en"),
  es: new ClockDef("es"),
  ja: new ClockDef("ja"),
  */
};
for (let c in langs) {
  eval("clockDefs." + c + " = new ClockDef(\"" + c + "\")")
}
eval("clockDefs." + lang + ".apply()");
