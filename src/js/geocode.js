module.exports = {
    getCurrPos: function(callback){
        navigator.geolocation.getCurrentPosition(
                function(position){
                    
                    callback('Lat: '+position.coords.latitude+' - Long: '+position.coords.longitude);
                },
                function(error){
                    callback(error.message);
                }); 
    },
    watchCurrPos: function(callback){
        navigator.geolocation.watchPosition(
                function(position){
                    callback(position.coords);
                },
                function(error){
                    console.log(error.message);
                },
                { maximumAge: 3000, timeout: 5000});
    },
    getAddrFromLatLng: function(lat,lng,callback){
        var base_url = 'https://maps.googleapis.com/maps/api/geocode/json?sensor=false&latlng=';
        var url = base_url+lat+','+lng;
        var request = new XMLHttpRequest();
        request.callback = callback;
        request.open('GET', url, true);
        request.onload = function() {
          if (request.status >= 200 && request.status < 400) {
            // Success!
            callback(JSON.parse(request.responseText));
          } else {
            // We reached our target server, but it returned an error
            console.log('error 1');
          }
        };
        request.onerror = function() {
          // There was a connection error of some sort
          console.log('error 2');
        };
        request.send();        
    }
}