let $hotelChoices = $('#hotel-choices');
let $restaurantChoices = $('#restaurant-choices');
let $activityChoices = $('#activity-choices');


// hotels.forEach(function(hotel) {
//   let $option = $('<option></option>').text(hotel.name).val(hotel.id);
//   hotelChoices.append($option);
// })

function options(attraction) {
  let $option = $('<option></option>').text(attraction.name).val(attraction.id);
  this.append($option);
}

hotels.forEach(options, $hotelChoices);
restaurants.forEach(options, $restaurantChoices);
activities.forEach(options, $activityChoices);

$('#options-panel').on('click', '.pull-right', function() {
  console.log($(this).siblings('select'));
})
