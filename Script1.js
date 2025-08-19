async function fetchBusData() {
    try {
        // Simulated API response
        const data = {
            buses: [
                { name: "Bus 1", coords: [17.482810, 78.539660] },
                { name: "Bus 2", coords: [17.468565, 78.480964] },
                { name: "Bus 3", coords: [17.261187, 78.387843] },
            ]
        };
        buses = data.buses;
        updateBusMarkers();
    } catch (error) {
        console.error('Error fetching bus data:', error);
    }
}
let buses = [];

async function fetchBusData() {
    try {
        // Simulating an API response
        const data = {
            buses: [
                { name: "Bus 1", coords: [17.482810, 78.539660] },
                { name: "Bus 2", coords: [17.468565, 78.480964] },
                { name: "Bus 3", coords: [17.261187, 78.387843] },
            ]
        };
        buses = data.buses;
        updateBusMarkers();
    } catch (error) {
        console.error('Error fetching bus data:', error);
    }
}

function updateBusMarkers() {
    buses.forEach(bus => {
        const marker = L.marker(bus.coords).addTo(map);
        marker.bindPopup(`<b>${bus.name}</b><br>Location: ${bus.coords}`).openPopup();
    });
}

fetchBusData();
setInterval(fetchBusData, 10000); // Update every 10 seconds
