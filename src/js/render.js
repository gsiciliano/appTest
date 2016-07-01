module.exports =  {
    renderSearchResult: function(data){
        // data is volumeInfo
        document.getElementById('renderDiv').removeChild(document.getElementById('msg'));
        var baseDiv = document.createElement('ul');
        baseDiv.className = 'list-group';
        baseDiv.id='output';
        if (data){
            if (data.title){
                var outDiv = document.createElement('li');
                outDiv.className = 'list-group-item'; 
                outDiv.innerHTML = 'Titolo: <b>'+data.title+'</b>';
                if (data.description){
                    outDiv.innerHTML += '<br>Descr: <b>'+data.description+'</b>';
                }    
                baseDiv.appendChild(outDiv);
            }    
        } else {
            var outDiv = document.createElement('li');
            outDiv.className = 'list-group-item list-group-item-danger'; 
            outDiv.innerHTML = 'cannot find book!';
            baseDiv.appendChild(outDiv);
        }    
        document.getElementById('renderDiv').appendChild(baseDiv);
    },
    renderGeocodeResult: function(data){
        if (data){
            if (data.results.length > 0){
                document.getElementById('myPos').innerHTML = 'In questo momento ti trovi in: <br>'+data.results[0].formatted_address;       
            } else {
                document.getElementById('myPos').innerHTML = 'OOPS! no addresses';       
            }
        } else {
            document.getElementById('myPos').innerHTML = 'OOPS! render error';       
        }    
    },
    renderNearbyPlaces: function(data){
        document.getElementById('renderDiv').removeChild(document.getElementById('msg'));
        var baseDiv = document.createElement('div');
        baseDiv.id='output';
        if (data){
            var outUl = document.createElement('ul');
            outUl.className = 'list-group';
            for (i=0;i<data.length;i++){
                var outUlLi = document.createElement('li');
                outUlLi.className = 'list-group-item';
                outUlLi.innerHTML = '<b>'+data[i].name+'</b>'+'<br>'+data[i].vicinity;
                outUl.appendChild(outUlLi);
            }    
            baseDiv.appendChild(outUl);
        } else {
            baseDiv.textContent = 'No places founded!';
        }
        document.getElementById('renderDiv').appendChild(baseDiv);
    },
    renderWaiting: function(){
        var outDiv = document.createElement('div');
        outDiv.id = 'msg';
        outDiv.innerHTML = '<img src="img/loading.gif" style="width:100%;heght:100%">';
        return outDiv;
    }
};