// SPA navigation
const pages = document.querySelectorAll('.page');
const links = document.querySelectorAll('.sidebar nav a');

links.forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    links.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
    pages.forEach(p => p.classList.remove('active'));
    document.querySelector(link.getAttribute('href')).classList.add('active');
  });
});

// Sidebar collapse
document.getElementById('collapseSidebar').addEventListener('click', () => {
  document.querySelector('.sidebar').classList.toggle('collapsed');
});

// Map
let map;
function initMap() {
  map = L.map('mapid').setView([20.5937, 78.9629], 5);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 18
  }).addTo(map);
}

// Charts
let pieChart, barChart, lineWay, barPerFence, timelineChart;
function initCharts() {
  pieChart = new Chart(document.getElementById('pieChart'), {
    type: 'pie',
    data: { labels: ['Authorized', 'Unauthorized'],
      datasets: [{ data: [0,0], backgroundColor:['green','red'] }]
    }
  });
  barChart = new Chart(document.getElementById('barChart'), {
    type: 'bar',
    data: { labels: [], datasets: [{label:'Voltage', data:[]}] }
  });
  lineWay = new Chart(document.getElementById('lineWay'), {
    type: 'line',
    data: { labels: [], datasets: [{label:'Waypoints per Min', data:[]}] }
  });
  barPerFence = new Chart(document.getElementById('barPerFence'), {
    type: 'bar',
    data: { labels: [], datasets: [{label:'Per-Fence Voltage', data:[]}] }
  });
  timelineChart = new Chart(document.getElementById('timelineChart'), {
    type: 'line',
    data: { labels: [], datasets: [{label:'Unauthorized Detections', data:[]}] }
  });
}

// Fetch mission data (demo version)
async function fetchMission() {
  return {
    waypoints: 15,
    authorized: 12,
    unauthorized: 3,
    detections: [
      {wp:"WP-01", status:"Authorized", voltage:220},
      {wp:"WP-02", status:"Unauthorized", voltage:180},
      {wp:"WP-03", status:"Authorized", voltage:210}
    ]
  };
}

// Render mission data
function renderMission(m) {
  document.getElementById('wpCount').textContent = m.waypoints;
  document.getElementById('authCount').textContent = m.authorized;
  document.getElementById('unauthCount').textContent = m.unauthorized;

  const at = document.querySelector('#alertsTable tbody');
  if(at){
    at.innerHTML='';
    const now = new Date().toLocaleTimeString();
    at.innerHTML = `
      <tr><td>${now}</td><td>Unauthorized</td><td>Unauthorized fence detected at WP-02</td><td>No</td></tr>
      <tr><td>${now}</td><td>Battery</td><td>Low battery warning on Fence #12</td><td>Yes</td></tr>`;
  }

  pieChart.data.datasets[0].data = [m.authorized, m.unauthorized];
  pieChart.update();

  barChart.data.labels = m.detections.map(r=>r.wp);
  barChart.data.datasets[0].data = m.detections.map(r=>r.voltage);
  barChart.update();

  lineWay.data.labels = m.detections.map(r=>r.wp);
  lineWay.data.datasets[0].data = m.detections.map(()=>Math.floor(Math.random()*5)+1);
  lineWay.update();

  barPerFence.data.labels = m.detections.map(r=>r.wp);
  barPerFence.data.datasets[0].data = m.detections.map(r=>r.voltage);
  barPerFence.update();

  timelineChart.data.labels = m.detections.map((r,i)=> new Date().getTime() - (i*60000));
  timelineChart.data.datasets[0].data = m.detections.map(r=> r.status==='Unauthorized'?1:0);
  timelineChart.update();
}

// Init
window.addEventListener('DOMContentLoaded', async ()=>{
  initMap();
  initCharts();
  const mission = await fetchMission();
  renderMission(mission);
  document.getElementById('lastUpdated').textContent = new Date().toLocaleString();

  document.getElementById('refreshBtn').addEventListener('click', async ()=>{
    const mission = await fetchMission();
    renderMission(mission);
    document.getElementById('lastUpdated').textContent = new Date().toLocaleString();
  });

  document.getElementById('exportBtn').addEventListener('click', ()=> alert('Export CSV clicked (demo only)'));
  document.getElementById('exportAllCSV').addEventListener('click', ()=> alert('Export All CSV clicked (demo only)'));
  document.getElementById('exportPDF').addEventListener('click', ()=> alert('Export PDF clicked (demo only)'));

  document.getElementById('addRfid').addEventListener('click', ()=>{
    const val = document.getElementById('rfidInput').value.trim();
    if(val) alert(`RFID ${val} added to whitelist (demo)`);
  });
});
