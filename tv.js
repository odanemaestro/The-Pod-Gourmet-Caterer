(function () {
  "use strict";

  var stage = document.getElementById("tvStage");
  var strip = document.getElementById("tvDaystrip");

  function filterByCat(items, cat) {
    var out = [];
    for (var i = 0; i < items.length; i++) {
      if (items[i].cat === cat) out.push(items[i]);
    }
    return out;
  }

  function buildItemsHtml(items) {
    var html = "";
    for (var i = 0; i < items.length; i++) {
      html += "<li>" + items[i].name + "</li>";
    }
    return html;
  }

  // Build day strip dots
  for (var d = 0; d < DAY_ORDER.length; d++) {
    var day = DAY_ORDER[d];
    var dot = document.createElement("div");
    dot.className = "tv-day-dot";
    dot.setAttribute("data-day", day);
    dot.textContent = day;
    strip.appendChild(dot);
  }

  // Build one panel per day
  for (var p = 0; p < DAY_ORDER.length; p++) {
    var dayName = DAY_ORDER[p];
    var panel = document.createElement("div");
    panel.className = "tv-panel";
    panel.setAttribute("data-day", dayName);

    var items = MENU[dayName].items;
    var proteins = filterByCat(items, "protein");
    var soups = filterByCat(items, "soup");
    var rice = filterByCat(items, "rice");
    var side = filterByCat(items, "side");
    var boiled = filterByCat(items, "boiled");

    var head = document.createElement("div");
    head.className = "tv-panel-head";
    var headHtml = "<h1 class=\"tv-panel-title\">" + dayName + "</h1>";
    if (MENU[dayName].note) {
      headHtml += "<p class=\"tv-panel-note\">" + MENU[dayName].note + "</p>";
    }
    head.innerHTML = headHtml;
    panel.appendChild(head);

    var cols = document.createElement("div");
    cols.className = "tv-cols";

    var mainsCount = proteins.length + soups.length;
    var riceCount = rice.length + side.length;
    var boiledCount = boiled.length;

    // Column 1: Mains (proteins + soup)
    var col1 = document.createElement("div");
    col1.className = "tv-col" + (mainsCount > 6 ? " is-dense" : "");
    col1.setAttribute("data-cat", "protein");
    col1.innerHTML = "<div class=\"tv-col-label\">Today's Mains</div>" +
      "<ul class=\"tv-col-items\">" + buildItemsHtml(proteins) + buildItemsHtml(soups) + "</ul>";
    cols.appendChild(col1);

    // Column 2: Rice & Starch + Salads
    var col2 = document.createElement("div");
    col2.className = "tv-col" + (riceCount > 6 ? " is-dense" : "");
    col2.setAttribute("data-cat", "rice");
    col2.innerHTML = "<div class=\"tv-col-label\">Rice, Starch &amp; Salads</div>" +
      "<ul class=\"tv-col-items\">" + buildItemsHtml(rice) + buildItemsHtml(side) + "</ul>";
    cols.appendChild(col2);

    // Column 3: Boiled provisions, only if present
    if (boiledCount > 0) {
      var col3 = document.createElement("div");
      col3.className = "tv-col" + (boiledCount > 6 ? " is-dense" : "");
      col3.setAttribute("data-cat", "boiled");
      col3.innerHTML = "<div class=\"tv-col-label\">Boiled Today</div>" +
        "<ul class=\"tv-col-items\">" + buildItemsHtml(boiled) + "</ul>";
      cols.appendChild(col3);
    }

    if (boiledCount === 0) {
      cols.className = cols.className + " two-col";
    }

    panel.appendChild(cols);
    stage.appendChild(panel);
  }

  var dayPanels = document.querySelectorAll(".tv-panel");
  var dayDots = document.querySelectorAll(".tv-day-dot");

  function addClass(el, cls) {
    if (el.className.indexOf(cls) === -1) {
      el.className = el.className + " " + cls;
    }
  }
  function removeClass(el, cls) {
    el.className = el.className.replace(cls, "").replace(/\s+/g, " ").replace(/^\s|\s$/g, "");
  }

  function setActiveDay(day) {
    var i;
    for (i = 0; i < dayPanels.length; i++) {
      if (dayPanels[i].getAttribute("data-day") === day) {
        addClass(dayPanels[i], "is-active");
      } else {
        removeClass(dayPanels[i], "is-active");
      }
    }
    for (i = 0; i < dayDots.length; i++) {
      if (dayDots[i].getAttribute("data-day") === day) {
        addClass(dayDots[i], "is-active");
      } else {
        removeClass(dayDots[i], "is-active");
      }
    }
  }

  // Determine real "today"; weekend falls back to Monday
  function getTodayName() {
    var jsDay = new Date().getDay(); // 0=Sun..6=Sat
    var idx = jsDay - 1; // Mon=0
    if (idx >= 0 && idx < 5) {
      return DAY_ORDER[idx];
    }
    return null;
  }

  var currentDay = getTodayName() || "Monday";
  setActiveDay(currentDay);

  // Manual click-to-jump on dots
  for (var k = 0; k < dayDots.length; k++) {
    (function (dotEl) {
      dotEl.onclick = function () {
        currentDay = dotEl.getAttribute("data-day");
        setActiveDay(currentDay);
      };
    })(dayDots[k]);
  }

  // Clock
  var clockEl = document.getElementById("tvClock");
  function padTwo(n) {
    n = "" + n;
    if (n.length < 2) {
      return "0" + n;
    }
    return n;
  }
  function tickClock() {
    var now = new Date();
    var h = now.getHours();
    var m = padTwo(now.getMinutes());
    var ampm = h >= 12 ? "PM" : "AM";
    h = h % 12;
    if (h === 0) h = 12;
    clockEl.textContent = h + ":" + m + " " + ampm;
  }
  tickClock();
  setInterval(tickClock, 1000 * 15);

  // Auto re-check the date so the TV rolls to the new day on its own
  setInterval(function () {
    var real = getTodayName();
    if (real && real !== currentDay) {
      currentDay = real;
      setActiveDay(currentDay);
    }
  }, 1000 * 60);
})();
