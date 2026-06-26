(function () {
  const stage = document.getElementById("tvStage");
  const strip = document.getElementById("tvDaystrip");

  // Build day strip dots
  DAY_ORDER.forEach(day => {
    const dot = document.createElement("div");
    dot.className = "tv-day-dot";
    dot.dataset.day = day;
    dot.textContent = day;
    strip.appendChild(dot);
  });

  // Build one panel per day
  DAY_ORDER.forEach(day => {
    const panel = document.createElement("div");
    panel.className = "tv-panel";
    panel.dataset.day = day;

    const proteins = MENU[day].items.filter(i => i.cat === "protein");
    const soups = MENU[day].items.filter(i => i.cat === "soup");
    const rice = MENU[day].items.filter(i => i.cat === "rice");
    const side = MENU[day].items.filter(i => i.cat === "side");
    const boiled = MENU[day].items.filter(i => i.cat === "boiled");

    const head = document.createElement("div");
    head.className = "tv-panel-head";
    head.innerHTML = `<h1 class="tv-panel-title">${day}</h1>` +
      (MENU[day].note ? `<p class="tv-panel-note">${MENU[day].note}</p>` : "");
    panel.appendChild(head);

    const cols = document.createElement("div");
    cols.className = "tv-cols";

    const mainsCount = proteins.length + soups.length;
    const riceCount = rice.length + side.length;
    const boiledCount = boiled.length;

    // Column 1: Mains (proteins + soup) — always present, gets density class
    const col1 = document.createElement("div");
    col1.className = "tv-col" + (mainsCount > 6 ? " is-dense" : "");
    col1.dataset.cat = "protein";
    col1.innerHTML = `<div class="tv-col-label">Today's Mains</div>
      <ul class="tv-col-items">${proteins.map(i => `<li>${i.name}</li>`).join("")}${soups.map(i => `<li>${i.name}</li>`).join("")}</ul>`;
    cols.appendChild(col1);

    // Column 2: Rice & Starch + Salads — always present
    const col2 = document.createElement("div");
    col2.className = "tv-col" + (riceCount > 6 ? " is-dense" : "");
    col2.dataset.cat = "rice";
    col2.innerHTML = `<div class="tv-col-label">Rice, Starch &amp; Salads</div>
      <ul class="tv-col-items">${rice.map(i => `<li>${i.name}</li>`).join("")}${side.map(i => `<li>${i.name}</li>`).join("")}</ul>`;
    cols.appendChild(col2);

    // Column 3: Boiled provisions — only render if there's anything boiled today
    if (boiledCount > 0) {
      const col3 = document.createElement("div");
      col3.className = "tv-col" + (boiledCount > 6 ? " is-dense" : "");
      col3.dataset.cat = "boiled";
      col3.innerHTML = `<div class="tv-col-label">Boiled Today</div>
        <ul class="tv-col-items">${boiled.map(i => `<li>${i.name}</li>`).join("")}</ul>`;
      cols.appendChild(col3);
    }

    // If boiled is empty, widen the other two columns to fill the space evenly
    cols.classList.toggle("two-col", boiledCount === 0);

    panel.appendChild(cols);
    stage.appendChild(panel);
  });

  const dayPanels = Array.from(document.querySelectorAll(".tv-panel"));
  const dayDots = Array.from(document.querySelectorAll(".tv-day-dot"));

  function setActiveDay(day) {
    dayPanels.forEach(p => p.classList.toggle("is-active", p.dataset.day === day));
    dayDots.forEach(d => d.classList.toggle("is-active", d.dataset.day === day));
  }

  // Determine real "today"; if weekend, show Monday and let manual cycling work
  function getTodayName() {
    const jsDay = new Date().getDay(); // 0=Sun..6=Sat
    const idx = jsDay - 1; // Mon=0
    return (idx >= 0 && idx < 5) ? DAY_ORDER[idx] : null;
  }

  let currentDay = getTodayName() || "Monday";
  setActiveDay(currentDay);

  // Manual click-to-jump on dots (for staff override on a touch screen, harmless on passive TV)
  dayDots.forEach(dot => {
    dot.addEventListener("click", () => {
      currentDay = dot.dataset.day;
      setActiveDay(currentDay);
    });
  });

  // Clock
  const clockEl = document.getElementById("tvClock");
  function tickClock() {
    const now = new Date();
    let h = now.getHours();
    const m = now.getMinutes().toString().padStart(2, "0");
    const ampm = h >= 12 ? "PM" : "AM";
    h = h % 12 || 12;
    clockEl.textContent = `${h}:${m} ${ampm}`;
  }
  tickClock();
  setInterval(tickClock, 1000 * 15);

  // Auto re-check the date at midnight-ish so the TV rolls to the new day on its own
  setInterval(() => {
    const real = getTodayName();
    if (real && real !== currentDay) {
      currentDay = real;
      setActiveDay(currentDay);
    }
  }, 1000 * 60); // check every minute
})();
