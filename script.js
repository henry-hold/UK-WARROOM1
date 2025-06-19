
function validateLogin() {
  const u = document.getElementById('username').value;
  const p = document.getElementById('password').value;
  if (u === "henry.holder" && p === "warroom1") {
    document.getElementById('login-screen').style.display = "none";
    document.getElementById('main-app').classList.remove("hidden");
    initDashboard();
  } else {
    document.getElementById('login-error').innerText = "Incorrect credentials.";
  }
}

function showPage(id) {
  document.querySelectorAll(".page").forEach(p => p.classList.add("hidden"));
  document.getElementById(id).classList.remove("hidden");
  if (id === "map") initMap();
}

function initDashboard() {
  const ctx = document.getElementById('riskChart');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      datasets: [{
        label: 'Risk Level (1–10)',
        data: [2, 4, 5, 7, 6],
        borderColor: 'red',
        fill: false
      }]
    },
    options: {
      scales: {
        y: { beginAtZero: true, title: { display: true, text: 'Risk Level' } },
        x: { title: { display: true, text: 'Day' } }
      }
    }
  });
  loadClocks();
  loadNews();
}

function loadClocks() {
  const zones = [
    ['London', 'Europe/London'],
    ['New York', 'America/New_York'],
    ['Chicago', 'America/Chicago'],
    ['Denver', 'America/Denver'],
    ['Los Angeles', 'America/Los_Angeles'],
    ['Moscow', 'Europe/Moscow'],
    ['Tehran', 'Asia/Tehran'],
    ['Tel Aviv', 'Asia/Jerusalem'],
    ['Beijing', 'Asia/Shanghai'],
    ['Tokyo', 'Asia/Tokyo'],
    ['Kyiv', 'Europe/Kyiv']
  ];
  function updateClocks() {
    let html = zones.map(([label, zone]) => {
      const now = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: zone });
      return `<strong>${label}:</strong> ${now}`;
    }).join(' | ');
    document.getElementById("clock-ticker-bar").innerHTML = html;
  }
  updateClocks();
  setInterval(updateClocks, 60000);
}

function loadNews() {
  const headlines = [
    "[23:00] NATO calls emergency summit - BBC",
    "[22:55] Drone strike kills Iranian commander - Reuters",
    "[22:50] China launches drills near Taiwan - Al Jazeera",
    "[22:45] Russia escalates Ukraine strikes - RT"
  ];
  const links = [
    "https://www.bbc.co.uk/news",
    "https://www.reuters.com/world",
    "https://www.aljazeera.com/news",
    "https://www.rt.com/news"
  ];
  let ticker = "";
  for (let i = 0; i < headlines.length; i++) {
    ticker += `<a href="${links[i]}" target="_blank">${headlines[i]}</a> • `;
  }
  document.getElementById('ticker-text').innerHTML = ticker;
}

function initMap() {
  if (!window.mapInit) {
    const map = L.map('map-container').setView([20, 0], 2);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    L.marker([32.08, 34.78]).addTo(map).bindPopup("Tel Aviv: ALERT");
    L.marker([51.5, -0.12]).addTo(map).bindPopup("London: Stable");
    window.mapInit = true;
  }
}

function toggleSiren() {
  const audio = document.getElementById("siren-audio");
  const light = document.getElementById("siren-light");
  if (document.getElementById("siren-toggle").checked) {
    light.classList.remove("hidden");
    audio.play();
  } else {
    light.classList.add("hidden");
    audio.pause();
    audio.currentTime = 0;
  }
}

function generateBriefing() {
  alert("Briefing PDF generation coming soon. Data feeds and PDF export in progress.");
}
