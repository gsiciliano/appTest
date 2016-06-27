module.exports = {
    getCurrPos: function(callback){
        navigator.geolocation.getCurrentPosition(
                function(position){
                    callback(position.coords);
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
                    callback(error.message);
                },
                { maximumAge: 3000, timeout: 5000});
    },
    getAddrFromLatLng: function(lat,lng,callback){
        var baseUrl = 'https://maps.googleapis.com/maps/api/geocode/json?sensor=false&latlng=';
        var url = baseUrl+lat+','+lng;
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
    },
    getNearByPlaces: function(radius,placeTag,lat,lng,callback){
        var googleKey = 'AIzaSyD72rJop2VZYj7H6eUOZOvWskDLKW2UZvE';
        var baseUrl   = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?';
        var url = baseUrl+'location='+lat+','+lng+'&radius='+radius+'&type='+placeTag+'&key='+googleKey;
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
};