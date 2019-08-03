var settingsBg = localStorage.getItem("handySearch-background");
settingsLocalize = function() {
  eval("strings = " + document.getElementById("languageDropdown").value);
  document.getElementById('settingsTitle').innerHTML = strings.settings;
  document.getElementById('languageTitle').innerHTML = strings.language;
  document.getElementById('saveButton').innerHTML = strings.save;
  document.getElementById('backgroundText').innerHTML = strings.background;
  document.getElementById("use24hr").innerHTML = strings.clock24hr + ` <input id="use24hrcheck" type="checkbox"></input>`;
  document.getElementById("use24hrcheck").checked = eval(localStorage.getItem("handySearch-is24hr"));
  document.getElementById("searchEngineText").innerHTML = strings.searchEngine;
  document.getElementById('background').innerHTML = "";
  document.getElementById("searchEngine").innerHTML = "";
  var bgOps = [];
  var createOpFromBg = function(bg) {
    var option = document.createElement("option");
    option.value = bg;
    option.innerHTML = eval("strings.bg_" + bg);
    if (eval("strings.bg_" + bg) == undefined) {
      option.innerHTML = bg;
    }
    if (settingsBg == bg) {
      option.defaultSelected = true;
    }
    return option;
  }
  for (var i in backgrounds) {
    bgOps.push(createOpFromBg(i));
  }
  for (var i of bgOps) {
    document.getElementById("background").appendChild(i);
  }
  var createOptionFromSE = function(se) {
    var o = document.createElement("option");
    o.value = se.id;
    if (se.id == localStorage.getItem("handySearch-searchEngine")) {
      o.defaultSelected = true;
    }
    var seName = eval("strings.se_" + se.id);
    if (!eval("strings.se_" + se.id)) {
      seName = se.name;
    }
    if (se.protectsPrivacy) {
      o.innerHTML = seName + " (" + strings.protectsPrivacy + ")";
    } else {
      o.innerHTML = seName + " (" + strings.notProtectsPrivacy + ")";
    }
    return o;
  }
  var seList = []
  for (var o in searchEngines) {
    seList.push(createOptionFromSE(eval("searchEngines." + o)));
  }
  for (var o of seList) {
    document.getElementById("searchEngine").appendChild(o);
  }
}

if (is24hr) {
  document.getElementById("use24hrcheck").checked = true;
} else {
  document.getElementById("use24hrcheck").checked = false;
}

for (let l in langs) {
  let o = document.createElement("option");
  o.value = l;
  o.innerHTML = eval(l + ".langName");
  document.getElementById('languageDropdown').appendChild(o);
}


var langOps = document.getElementById('languageDropdown').children;
eval("backgrounds." + localStorage.getItem("handySearch-background") + ".apply()");
for (var i of langOps) {
  if (i.value == localStorage.getItem("handySearch-lang")) {
    i.defaultSelected = true;
  }
}

changeBg = function() {
  settingsBg = document.getElementById('background').value;
  eval("backgrounds." + document.getElementById('background').value + ".apply()");
}
saveSettings = function() {
  localStorage.setItem("handySearch-lang", document.getElementById("languageDropdown").value);
  localStorage.setItem("handySearch-background", document.getElementById("background").value);
  localStorage.setItem("handySearch-is24hr", document.getElementById("use24hrcheck").checked);
  localStorage.setItem("handySearch-searchEngine", document.getElementById("searchEngine").value);
  location.assign("index.html");
}
