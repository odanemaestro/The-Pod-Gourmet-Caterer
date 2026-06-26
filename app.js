(function () {
  const today = new Date();
  const todayName = DAY_ORDER[today.getDay() - 1]; // Sun=0 -> undefined, Mon=1 -> index0
  const defaultDay = DAY_ORDER.includes(todayName) ? todayName : "Monday";

  // ---- Hero "today" block ----
  const heroDay = document.getElementById("heroTodayDay");
  const heroPick = document.getElementById("heroTodayPick");
  if (heroDay && heroPick) {
    if (DAY_ORDER.includes(todayName)) {
      heroDay.textContent = todayName;
      const proteins = MENU[todayName].items
        .filter(i => i.cat === "protein")
        .map(i => i.name);
      heroPick.textContent = proteins.slice(0, 3).join(" · ") + (proteins.length > 3 ? " · and more" : "");
    } else {
      heroDay.textContent = "Closed today";
      heroPick.textContent = "Back at it Monday morning. Take a look at the week ahead below.";
    }
  }

  // ---- Day tabs ----
  const tabsEl = document.getElementById("dayTabs");
  DAY_ORDER.forEach(day => {
    const btn = document.createElement("button");
    btn.className = "day-tab";
    btn.dataset.day = day;
    btn.innerHTML = `<span class="dot"></span>${day}`;
    btn.addEventListener("click", () => showDay(day));
    tabsEl.appendChild(btn);
  });

  // ---- Menu board ----
  const boardEl = document.getElementById("menuBoard");
  DAY_ORDER.forEach(day => {
    const panel = document.createElement("div");
    panel.className = "day-panel";
    panel.dataset.day = day;

    const head = document.createElement("div");
    head.className = "day-panel-head";
    head.innerHTML = `<h2 class="day-panel-title">${day}</h2>` +
      (MENU[day].note ? `<p class="day-panel-note">${MENU[day].note}</p>` : "");
    panel.appendChild(head);

    CAT_ORDER.forEach(cat => {
      const items = MENU[day].items.filter(i => i.cat === cat);
      if (!items.length) return;
      const block = document.createElement("div");
      block.className = "cat-block";
      block.dataset.cat = cat;
      block.innerHTML = `<div class="cat-label">${CAT_LABEL[cat]}</div>
        <div class="item-grid">${items.map(i => `<div class="item-card">${i.name}</div>`).join("")}</div>`;
      panel.appendChild(block);
    });

    boardEl.appendChild(panel);
  });

  function showDay(day) {
    document.querySelectorAll(".day-tab").forEach(b => b.classList.toggle("is-active", b.dataset.day === day));
    document.querySelectorAll(".day-panel").forEach(p => p.classList.toggle("is-active", p.dataset.day === day));
  }

  showDay(defaultDay);
})();
