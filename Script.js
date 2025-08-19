// Initialize the map
const map = L.map('map').setView([17.3493, 78.3399], 15);

// Tile layer for the map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// Custom bus icon
const busIcon = L.icon({
   iconUrl:'https://cdn-icons-png.flaticon.com/128/1068/1068631.png',// Use a local bus icon image or link
    iconSize: [30, 30], // size of the icon
    iconAnchor: [15, 15], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -15] // point from which the popup should open relative to the iconAnchor
});

// Bus data
const buses = [
    { id: 1, name: "Bus 1", coords: [17.482810, 78.539660] },
    { id: 2, name: "Bus 2", coords: [17.468565, 78.480964] },
    { id: 3, name: "Bus 3", coords: [17.261186572177298, 78.38784307219129] },
    { id: 4, name: "Bus 4", coords: [17.370475, 78.491825] },
    { id: 5, name: "Bus 5", coords: [17.435536, 78.349401] },
    { id: 6, name: "Bus 6", coords: [17.315502, 78.132617] },
    { id: 7, name: "Bus 7", coords: [17.191249, 78.646975] },
    { id: 8, name: "Bus 8", coords: [17.345982, 78.551251] },
    { id: 9, name: "Bus 9", coords: [17.400949, 78.559765] }

];

// Add bus markers with the custom icon
buses.forEach(bus => {
    const marker = L.marker(bus.coords, { icon: busIcon }).addTo(map);
    marker.bindPopup(`<b>${bus.name}</b><br>Location: ${bus.coords}`);
});

// Search function
document.getElementById('searchButton').addEventListener('click', () => {
    const busNumber = parseInt(document.getElementById('busSearch').value);
    const bus = buses.find(b => b.id === busNumber);

    if (bus) {
        map.setView(bus.coords, 15);
        const marker = L.marker(bus.coords, { icon: busIcon }).addTo(map);
        marker.bindPopup(`<b>${bus.name}</b><br>Location: ${bus.coords}`).openPopup();
    } else {
        alert("Bus not found!");
    }
});
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

const userIcon = L.icon({
    iconUrl: 'https://cdn-icons-png.flaticon.com/512/727/727399.png',
    iconSize: [30, 30],
    iconAnchor: [15, 15]
});



let routeControl;

document.getElementById('searchButton').addEventListener('click', () => {
    const busNumber = parseInt(document.getElementById('busSearch').value);
    const bus = buses.find(b => b.id === busNumber);

    if (bus) {
        if (navigator.geolocation) {
            navigator.geolocation.watchPosition(position => {
                const userLocation = [position.coords.latitude, position.coords.longitude];
                map.setView(userLocation, 15);

                // Add markers for user and bus
                const userMarker = L.marker(userLocation, { icon: userIcon }).addTo(map);
                const busMarker = L.marker(bus.coords, { icon: busIcon }).addTo(map);

                // Remove existing route if any
                if (routeControl) {
                    map.removeControl(routeControl);
                }

                // Add a route between user and bus
                routeControl = L.Routing.control({
                    waypoints: [
                        L.latLng(userLocation),
                        L.latLng(bus.coords)
                    ],
                    routeWhileDragging: true,
                }).addTo(map);

            }, error => {
                alert('Unable to access your location!');
            });
        } else {
            alert('Geolocation is not supported by your browser.');
        }
    } else {
        alert('Bus not found!');
    }
});