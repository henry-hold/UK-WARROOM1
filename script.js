
function validateLogin() {
    const u = document.getElementById('username').value;
    const p = document.getElementById('password').value;
    if (u === "henry.holder" && p === "warroom1") {
        document.getElementById('login-screen').style.display = "none";
        document.getElementById('main-app').classList.remove('hidden');
        initDashboard();
    } else {
        document.getElementById('login-error').innerText = "Incorrect credentials.";
    }
}

function showPage(pageId) {
    document.querySelectorAll(".page").forEach(p => p.classList.add("hidden"));
    document.getElementById(pageId).classList.remove("hidden");
    if (pageId === "map") initMap();
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
    loadNews();
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

function loadNews() {
    const headlines = [
        "BREAKING: NATO calls emergency summit - BBC",
        "US drone strike kills Iranian commander - Reuters",
        "China launches military exercises near Taiwan - Al Jazeera",
        "Russia escalates air raids in Ukraine - RT"
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
