(function () {
  "use strict";

  function indexOfDay(name) {
    for (var i = 0; i < DAY_ORDER.length; i++) {
      if (DAY_ORDER[i] === name) return i;
    }
    return -1;
  }

  function filterByCat(items, cat) {
    var out = [];
    for (var i = 0; i < items.length; i++) {
      if (items[i].cat === cat) out.push(items[i]);
    }
    return out;
  }

  var today = new Date();
  var todayIdx = today.getDay() - 1; // Sun=0 -> -1, Mon=1 -> 0
  var todayName = (todayIdx >= 0 && todayIdx < DAY_ORDER.length) ? DAY_ORDER[todayIdx] : null;
  var isOpenToday = todayName !== null && indexOfDay(todayName) !== -1;
  var defaultDay = isOpenToday ? todayName : "Monday";

  // ---- Hero "today" block ----
  var heroDay = document.getElementById("heroTodayDay");
  var heroPick = document.getElementById("heroTodayPick");
  if (heroDay && heroPick) {
    if (isOpenToday) {
      heroDay.textContent = todayName;
      var proteins = filterByCat(MENU[todayName].items, "protein");
      var names = [];
      for (var i = 0; i < proteins.length && i < 3; i++) {
        names.push(proteins[i].name);
      }
      var pickText = names.join(" \u00B7 ");
      if (proteins.length > 3) {
        pickText += " \u00B7 and more";
      }
      heroPick.textContent = pickText;
    } else {
      heroDay.textContent = "Closed today";
      heroPick.textContent = "Back at it Monday morning. Take a look at the week ahead below.";
    }
  }

  // ---- Day tabs ----
  var tabsEl = document.getElementById("dayTabs");
  var d;
  for (d = 0; d < DAY_ORDER.length; d++) {
    (function (day) {
      var btn = document.createElement("button");
      btn.className = "day-tab";
      btn.setAttribute("data-day", day);
      btn.innerHTML = "<span class=\"dot\"></span>" + day;
      btn.onclick = function () { showDay(day); };
      tabsEl.appendChild(btn);
    })(DAY_ORDER[d]);
  }

  // ---- Menu board ----
  var boardEl = document.getElementById("menuBoard");
  for (d = 0; d < DAY_ORDER.length; d++) {
    var day = DAY_ORDER[d];
    var panel = document.createElement("div");
    panel.className = "day-panel";
    panel.setAttribute("data-day", day);

    var head = document.createElement("div");
    head.className = "day-panel-head";
    var headHtml = "<h2 class=\"day-panel-title\">" + day + "</h2>";
    if (MENU[day].note) {
      headHtml += "<p class=\"day-panel-note\">" + MENU[day].note + "</p>";
    }
    head.innerHTML = headHtml;
    panel.appendChild(head);

    for (var c = 0; c < CAT_ORDER.length; c++) {
      var cat = CAT_ORDER[c];
      var items = filterByCat(MENU[day].items, cat);
      if (items.length === 0) continue;
      var block = document.createElement("div");
      block.className = "cat-block";
      block.setAttribute("data-cat", cat);
      var cardsHtml = "";
      for (var ci = 0; ci < items.length; ci++) {
        cardsHtml += "<div class=\"item-card\">" + items[ci].name + "</div>";
      }
      block.innerHTML = "<div class=\"cat-label\">" + CAT_LABEL[cat] + "</div>" +
        "<div class=\"item-grid\">" + cardsHtml + "</div>";
      panel.appendChild(block);
    }

    boardEl.appendChild(panel);
  }

  function addClass(el, cls) {
    if (el.className.indexOf(cls) === -1) {
      el.className = el.className + " " + cls;
    }
  }
  function removeClass(el, cls) {
    el.className = el.className.replace(cls, "").replace(/\s+/g, " ").replace(/^\s|\s$/g, "");
  }

  function showDay(day) {
    var tabs = document.querySelectorAll(".day-tab");
    var i;
    for (i = 0; i < tabs.length; i++) {
      if (tabs[i].getAttribute("data-day") === day) {
        addClass(tabs[i], "is-active");
      } else {
        removeClass(tabs[i], "is-active");
      }
    }
    var panels = document.querySelectorAll(".day-panel");
    for (i = 0; i < panels.length; i++) {
      if (panels[i].getAttribute("data-day") === day) {
        addClass(panels[i], "is-active");
      } else {
        removeClass(panels[i], "is-active");
      }
    }
  }

  showDay(defaultDay);
})();
