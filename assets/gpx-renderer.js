var map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

var gpxLayer = new L.GPX("/maps/Twin_Peaks_Mt_Sutro.gpx", {
    async: true,
    marker_options: {
        startIconUrl: 'path/to/start-icon.png',
        endIconUrl: 'path/to/end-icon.png',
        shadowUrl: 'path/to/shadow.png'
    }
});

gpxLayer.on("loaded", function(e) {
    map.fitBounds(e.target.getBounds());
});

gpxLayer.addTo(map);
