var bookTemplate = require('../templates/book.hbs');
var placesTemplate = require('../templates/places.hbs');
var positionTemplate = require('../templates/position.hbs');
module.exports =  {
    renderSearchResult: function(data){
        // data is volumeInfo
        document.getElementById('renderDiv').innerHTML = bookTemplate({
            'book': data
        });  
    },
    renderGeocodeResult: function(data){
        if (data){
            if (data.results.length > 0){
                document.getElementById('myPos').innerHTML = positionTemplate({
                   'position':data.results[0].formatted_address
                });
            } else {
                document.getElementById('myPos').innerHTML = positionTemplate();
            }
        } else {
            document.getElementById('myPos').innerHTML = positionTemplate();
        }    
        
    },
    renderNearbyPlaces: function(data){
        document.getElementById('renderDiv').innerHTML = placesTemplate({
            'places': data
        });
    },
};