// The latitude and longitude of your business / place
var position = [10.871218190007781, 106.80308855586284];

function showGoogleMaps() {

    var latLng = new google.maps.LatLng(position[0], position[1]);

    var mapOptions = {
        zoom: 16, // initialize zoom level - the max value is 21
        streetViewControl: false, // hide the yellow Street View pegman
        scaleControl: true, // allow users to zoom the Google Map
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        mapId: "8e0a97af9386fef",
        center: latLng,
        gestureHandling: 'greedy',
        scrollwheel: false
    };

    map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);

    // Show the default red marker at the location
    marker = new google.maps.Marker({
        position: latLng,
        map: map,
        draggable: false,
        animation: google.maps.Animation.DROP
    });
}

google.maps.event.addDomListener(window, 'load', showGoogleMaps);
