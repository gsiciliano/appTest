module.exports =  {
    renderSearchResult: function(data){
        if (data){
            if (data.totalItems > 0){
                document.getElementById('outDiv').removeChild(document.getElementById('msg'));
                var baseDiv = document.createElement('div');
                baseDiv.id='output';
                if (data.items[0].volumeInfo.title){
                    var outDiv = document.createElement('div');
                    outDiv.innerHTML = 'Titolo: '+data.items[0].volumeInfo.title;
                    baseDiv.appendChild(outDiv);
                }    
                if (data.items[0].volumeInfo.description){
                    var outDiv = document.createElement('div');
                    outDiv.innerHTML = 'Descr: '+data.items[0].volumeInfo.description;
                    baseDiv.appendChild(outDiv);
                }    
                document.getElementById('outDiv').appendChild(baseDiv);
            } else {
                document.getElementById('msg').textContent = 'cannot find book!';
            }
        } else {
            document.getElementById('msg').textContent = 'OOPS! we got an error!';
        }    
    },
    renderGeocodeResult: function(data){
        if (data){
            if (data.results.length > 0){
                document.getElementById('myPos').textContent = data.results[0].formatted_address;       
            } else {
                document.getElementById('myPos').textContent = 'OOPS! no addresses';       
            }
        } else {
            document.getElementById('myPos').textContent = 'OOPS! render error';       
        }    
    },
    renderNearbyPlaces: function(data){
        if (data){
            document.getElementById('outDiv').removeChild(document.getElementById('msg'));
            var baseDiv = document.createElement('div');
            baseDiv.id='output';
            for (i=0;i<data.results.length;i++){
                var outDiv = document.createElement('div');
                var outDivSpan1 = document.createElement('p');
                outDivSpan1.innerHTML = 'Nome:'+data.results[i].name;
                outDiv.appendChild(outDivSpan1);
                var outDivSpan2 = document.createElement('p');
                outDivSpan2.innerHTML = 'Ind:'+data.results[i].vicinity;
                outDiv.appendChild(outDivSpan2);
                baseDiv.appendChild(outDiv);
            }    
            document.getElementById('outDiv').appendChild(baseDiv);
        }
    }
};