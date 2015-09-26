function initialize() {

  var mapCanvas = document.getElementById('map');

  var mapOptions = {
    center: new google.maps.LatLng(40.771509, -73.973805),
    zoom: 14,
    disableDefaultUI: true,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  var map = new google.maps.Map(mapCanvas, mapOptions);
}
google.maps.event.addDomListener(window, 'load', initialize);

