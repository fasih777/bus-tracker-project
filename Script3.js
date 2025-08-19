const buses = [
    {
        id: 1,
        name: "Bus 1",
        coords: [17.482810, 78.539660],
        startTime: "06:30 AM",
        startPlace: "Naredmet X roads",
        upcomingStops: ["Sainikpuri", "Sikanderabad", "Begumpet","Banjara hills","Masab tank","Mehdipatnam","Langer house","Bandhlaguda","Kali mandir"]
    },
    {
        id: 2,
        name: "Bus 2",
        coords: [17.468565, 78.480964],
        startTime: "08:30 AM",
        startPlace: "Bowenpally",
        upcomingStops: ["LB Nagar", "Gachi Bowli"]
    },
    // Add more buses here
];

// Function to display bus details in separate boxes
function displayBusDetails() {
    const busContainer = document.getElementById('bus-container');
    busContainer.innerHTML = ''; // Clear existing content

    buses.forEach(bus => {
        const busDetailBox = document.createElement('div');
        busDetailBox.className = 'bus-detail';
        busDetailBox.innerHTML = `
            <h3>${bus.name}</h3>
            <p>ID: ${bus.id}</p>
            <p>Starting Time: ${bus.startTime}</p>
            <p>Starting Place: ${bus.startPlace}</p>
            <p>Upcoming Stops:</p>
            <ul>
                ${bus.upcomingStops.map(stop => `<li>${stop}</li>`).join('')}
            </ul>
            <p>Coordinates: ${bus.coords[0].toFixed(5)}, ${bus.coords[1].toFixed(5)}</p>
            <p>Estimated Time: <span id="eta-${bus.id}">Calculating...</span> minutes</p>
        `;
        busContainer.appendChild(busDetailBox);
    });
}

// Call the function to display bus details
displayBusDetails();