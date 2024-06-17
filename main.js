function getLocation() {

    var map = L.map('map').setView([0, 0], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    if ("geolocation" in navigator) {
        navigator.geolocation.watchPosition(success, error);
    } else {
        alert("Geolocation is not supported by this browser.");
    }

    let marker, circle;

    function success(pos) {

        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;
        const accuracy = pos.coords.accuracy;

        if (marker) {
            map.removeLayer(marker);
            map.removeLayer(circle);
            // console.log(maximumAge)
        }

        marker = L.marker([lat, lng]).addTo(map);
        circle = L.circle([lat, lng], { radius: accuracy }).addTo(map);

        map.setView([lat, lng], 15);
        map.fitBounds(circle.getBounds());
    }

    function error(err) {
        if (err.code === 1) {
            alert("Please allow at location access")
        } else {
            alert("Cannot get current location")
        }
    }

}