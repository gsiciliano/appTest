var bookTemplate = require('../templates/book.hbs');
var placesTemplate = require('../templates/places.hbs');
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
                document.getElementById('myPos').innerHTML = 'In questo momento ti trovi in: '+data.results[0].formatted_address;       
            } else {
                document.getElementById('myPos').innerHTML = 'OOPS! no addresses';       
            }
        } else {
            document.getElementById('myPos').innerHTML = 'OOPS! render error';       
        }    
    },
    renderNearbyPlaces: function(data){
        document.getElementById('renderDiv').innerHTML = placesTemplate({
            'places': data
        });
    },
    renderSpeechText: function(data){
        document.getElementById('renderDiv').innerHTML = data;
    }
};