/*
Functions for map
functionalities

@author Elena Blisi
*/


// Declare `map` and `marker` in the global scope
var map = null;
var marker = null;

// Update the marker's position
function setMarker(latlng) {
    var elMapUrl = document.getElementById("google-maps-url");
    
    // Remove the existing marker if it exists
    if (marker) {
        map.removeLayer(marker);
    }

    // Create and add a new marker
    marker = L.marker(latlng).addTo(map);

    // Update the URL in the input field with the new marker location
    elMapUrl.value = `https://www.google.com/maps/search/?api=1&query=${latlng.lat},${latlng.lng}`;
}


// Define the bounds for Cyprus
var cyprusBounds = [
    [34.5, 32.0],  // Southwest corner of Cyprus
    [35.7, 34.6]   // Northeast corner of Cyprus
];

// Function to initialize the map
function initializeMap(mapCenter) {
    // Default center coordinates
    const defaultCenter = [34.702160, 33.084360];

    // Validate mapCenter
    if (!mapCenter || typeof mapCenter[0] === undefined || typeof mapCenter[1] === undefined) {
        mapCenter = defaultCenter;
    }

    var mapContainer = document.getElementById('map');
    if (mapContainer) {
        // Create Map
        map = L.map('map', {
            center: mapCenter,
            zoom: 12,
            minZoom: 9,
            maxZoom: 19,
            maxBounds: cyprusBounds, // Bounds for Cyprus
            maxBoundsViscosity: 1.0,
        });

        // Add OpenStreetMap tile layer to the map
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            minZoom: 9,
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="https://www.geoapify.com/">Geoapify</a>'
        }).addTo(map);

        // Reorder zoom control to the bottom right
        var zoomControl = map.zoomControl;
        if (zoomControl) map.removeControl(zoomControl);
        L.control.zoom({ position: 'bottomright' }).addTo(map);

        var filter = "&filter=countrycode:cy";
        var myAPIKey = "f83aafc477994b0dba99e2527dbacda9"; // Get an API Key on https://myprojects.geoapify.com

        // Add Geoapify Address Search control
        const addressSearchControl = L.control.addressSearch(myAPIKey + filter, {
            position: 'topleft',
            resultCallback: (address) => {
                if (!address) {
                    return;
                }

                var elFullAddress = document.getElementById("address");

                // Construct full address string
                var fullAddress = `${address.address_line1}${address.city ? ', ' + address.city : ''}${address.postcode ? ', ' + address.postcode : ''}, ${address.country}`; //If city or postcode is null, it will be skipped
                elFullAddress.value = fullAddress;

                var newLatLng = L.latLng(address.lat, address.lon);

                // Set marker at the new location
                setMarker(newLatLng);

                // Fit map bounds if bounding box exists, otherwise center map on the new location
                if (address.bbox && address.bbox.lat1 !== address.bbox.lat2 && address.bbox.lon1 !== address.bbox.lon2) {
                    map.fitBounds([[address.bbox.lat1, address.bbox.lon1], [address.bbox.lat2, address.bbox.lon2]], { padding: [100, 100] });
                } else {
                    map.setView([address.lat, address.lon], 15);
                }
            },
            suggestionsCallback: (suggestions) => {
            }
        });
        map.addControl(addressSearchControl);

        // Add a click event to the map to set marker at clicked location
        map.on('click', function(e) {
            // Get the latitude and longitude of the click event
            var latlng = e.latlng;
            setMarker(latlng);
        });
    } else {
        console.error('Map container not found.'); // Log an error if map container is missing
    }
}