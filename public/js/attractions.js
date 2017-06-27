let $hotelChoices = $('#hotel-choices');
let $restaurantChoices = $('#restaurant-choices');
let $activityChoices = $('#activity-choices');
let allMarkers = {
  hotel: [],
  restaurant: [],
  activity: []
}

  var fullstackAcademy = new google.maps.LatLng(40.705086, -74.009151);

  var styleArr = [{
    featureType: 'landscape',
    stylers: [{ saturation: -100 }, { lightness: 60 }]
  }, {
    featureType: 'road.local',
    stylers: [{ saturation: -100 }, { lightness: 40 }, { visibility: 'on' }]
  }, {
    featureType: 'transit',
    stylers: [{ saturation: -100 }, { visibility: 'simplified' }]
  }, {
    featureType: 'administrative.province',
    stylers: [{ visibility: 'off' }]
  }, {
    featureType: 'water',
    stylers: [{ visibility: 'on' }, { lightness: 30 }]
  }, {
    featureType: 'road.highway',
    elementType: 'geometry.fill',
    stylers: [{ color: '#ef8c25' }, { lightness: 40 }]
  }, {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{ visibility: 'off' }]
  }, {
    featureType: 'poi.park',
    elementType: 'geometry.fill',
    stylers: [{ color: '#b6c54c' }, { lightness: 40 }, { saturation: -40 }]
  }];

  var mapCanvas = document.getElementById('map-canvas');

  var currentMap = new google.maps.Map(mapCanvas, {
    center: fullstackAcademy,
    zoom: 13,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    styles: styleArr
  });

  var iconURLs = {
    hotel: '/images/lodging_0star.png',
    restaurant: '/images/restaurant.png',
    activity: '/images/star-3.png'
  };

  function drawMarker (type, coords) {
    var latLng = new google.maps.LatLng(coords[0], coords[1]);
    var iconURL = iconURLs[type];
    var marker = new google.maps.Marker({
      icon: iconURL,
      position: latLng
    });
    marker.setMap(currentMap);
  }


hotels.forEach(function(hotel) {
  let coords = hotel.place.location;
  var latLng = new google.maps.LatLng(coords[0], coords[1]);
  var marker = new google.maps.Marker({
    icon: iconURLs['hotel'],
    position: latLng
  });
  allMarkers.hotel.push(marker);
})


function setMarker(selectChoice) {
    let type = selectChoice.data('type');
    let id = parseInt(selectChoice.val()) - 1;
    let attractionArray;
    if (type === "hotel") attractionArray = hotels;
    else if (type === "restaurant") attractionArray = restaurants;
    else if (type === "activity") attractionArray = activities;
    drawMarker(type, attractionArray[id].place.location);
    console.log(type, attractionArray[id].place.location);
}


function options(attraction) {
    let $option = $('<option></option>').text(attraction.name).val(attraction.id);
    this.append($option);
}

hotels.forEach(options, $hotelChoices);
restaurants.forEach(options, $restaurantChoices);
activities.forEach(options, $activityChoices);

$('#options-panel').on('click', '.pull-right', function() {
    let $selectChoice = $(this).siblings('select');
    let choiceType = "." + $selectChoice.data('type');
    setMarker($selectChoice);
    let $selectItem = $selectChoice.find(':selected').text();
    let newChoice = $('<span class=title></span>').text($selectItem);
    let newDelete = $('<button class="btn btn-xs btn-danger remove dayAttractions btn-circle"></button>').text('x');
    $(choiceType).append(newChoice).append(newDelete);
    console.log(allMarkers.hotel);
})

$('#itinerary').on('click', '.dayAttractions', function() {
  console.log($(this).prev());
  $(this).prev().remove();
  $(this).remove();

});




//function span(name){
//      let $span=
// }
