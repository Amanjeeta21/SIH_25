function generateRandomFenceData(numRows = 10) {
    const lats = [11.074666, 11.074720, 11.073617, 11.073653];
    const lons = [76.615677, 76.616359, 76.615766, 76.616550];

    const minLat = Math.min(...lats);
    const maxLat = Math.max(...lats);
    const minLon = Math.min(...lons);
    const maxLon = Math.max(...lons);

    const owners = ["Aman", "Ravi", "Sita", "Kiran"];
    const statuses = ["Active", "Inactive"];

    const data = [];

    for (let i = 0; i < numRows; i++) {
        const lat = (Math.random() * (maxLat - minLat) + minLat).toFixed(6);
        const lon = (Math.random() * (maxLon - minLon) + minLon).toFixed(6);
        const coord = `${lat},${lon}`;

        data.push({
            Mission_ID: `M${Math.floor(Math.random() * 900 + 100)}`,
            Owner: owners[Math.floor(Math.random() * owners.length)],
            Location: coord,
            Voltage: (Math.random() * (5000 - 2000) + 2000).toFixed(2),
            Fence_ID: `F${Math.floor(Math.random() * 10 + 1)}`,
            Status: statuses[Math.floor(Math.random() * statuses.length)]
        });
    }

    return data;
}

// Populate the table
function renderFenceTable() {
    const data = generateRandomFenceData(10); // 10 rows
    const tbody = document.querySelector("#fenceTable tbody");
    tbody.innerHTML = ""; // Clear old rows

    data.forEach(row => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${row.Mission_ID}</td>
            <td>${row.Owner}</td>
            <td>${row.Location}</td>
            <td>${row.Voltage} V</td>
            <td>${row.Fence_ID}</td>
            <td class="${row.Status==='Active' ? 'status-safe':'status-danger'}">${row.Status}</td>
        `;
        tbody.appendChild(tr);
    });

    return data; // return for CSV export
}

// Download CSV
function downloadFenceCSV(data) {
    if(!data || data.length === 0) return alert("No data to export");
    
    const rows = [["Mission_ID","Owner","Location","Voltage","Fence_ID","Status"]];
    data.forEach(r => rows.push([r.Mission_ID, r.Owner, r.Location, r.Voltage, r.Fence_ID, r.Status]));

    const csv = rows.map(r => r.map(c => `"${c}"`).join(',')).join('\n');
    const blob = new Blob([csv], {type: 'text/csv'});
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'fence_data.csv';
    a.click();
    URL.revokeObjectURL(url);
}

// Initialize on load
window.onload = () => {
    const fenceData = renderFenceTable();

    // Export button
    const exportBtn = document.getElementById("exportFenceCSV");
    if(exportBtn) {
        exportBtn.addEventListener("click", () => downloadFenceCSV(fenceData));
    }
};
