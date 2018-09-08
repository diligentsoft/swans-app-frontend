function initLocationPicker(position) {
  var latitudeInput = $('#latitude')
  var longitudeInput = $('#longitude')
  $('#location-picker').locationpicker({
    location: {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    },
    radius: 0,
    onchanged: function (currentLocation, radius, isMarkerDropped) {
      console.log('Changed position: ' + currentLocation.latitude + ' ' + currentLocation.longitude)
      fieldVal(latitudeInput, currentLocation.latitude)
      fieldVal(longitudeInput, currentLocation.longitude)
    }
  });
  console.log('Init position: ' + position.coords.latitude + ' ' + position.coords.longitude)
  fieldVal(latitudeInput, position.coords.latitude)
  fieldVal(longitudeInput, position.coords.longitude)
}

function fieldVal(fieldElement, newValue) {
  fieldElement.val(newValue).trigger('change')
}

navigator.geolocation.getCurrentPosition(initLocationPicker);
