// User's location (example coordinates near KL University)
const userLocation = [17.3493, 78.3399];

// Set an estimated constant speed in km per minute (adjustable)
const speed = 0.5; // km/min (this is a fictional speed for demo purposes)

// Function to calculate the distance between two coordinates in kilometers
function calculateDistance(coord1, coord2) {
    const R = 6371; // Radius of Earth in km
    const dLat = (coord2[0] - coord1[0]) * Math.PI / 180;
    const dLon = (coord2[1] - coord1[1]) * Math.PI / 180;
    const a = 
        Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(coord1[0] * Math.PI / 180) * Math.cos(coord2[0] * Math.PI / 180) *
        Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c; // Distance in km
}

// Function to calculate ETA in minutes
function calculateETA(busCoords) {
    const distance = calculateDistance(userLocation, busCoords);
    return Math.round(distance / speed); // ETA in minutes
}

// Add bus markers with ETA in popup
buses.forEach(bus => {
    const eta = calculateETA(bus.coords);
    const marker = L.marker(bus.coords, { icon: busIcon }).addTo(map);
    marker.bindPopup(`<b>${bus.name}</b><br>ETA: ${eta} minutes`);
});
