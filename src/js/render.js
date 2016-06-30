module.exports =  {
    renderSearchResult: function(data){
        // data is volumeInfo
        document.getElementById('outDiv').removeChild(document.getElementById('msg'));
        if (data){
            var baseDiv = document.createElement('div');
            baseDiv.id='output';
            if (data.title){
                var outDiv = document.createElement('div');
                outDiv.innerHTML = 'Titolo: <b>'+data.title+'</b>';
                baseDiv.appendChild(outDiv);
            }    
            if (data.description){
                var outDiv = document.createElement('div');
                outDiv.innerHTML = 'Descr: <b>'+data.description+'</b>';
                baseDiv.appendChild(outDiv);
            }    
        } else {
            baseDiv.textContent = 'cannot find book!';
        }    
        document.getElementById('outDiv').appendChild(baseDiv);
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
        document.getElementById('outDiv').removeChild(document.getElementById('msg'));
        var baseDiv = document.createElement('div');
        baseDiv.id='output';
        if (data){
            var outUl = document.createElement('ul');
            for (i=0;i<data.length;i++){
                var outUlLi = document.createElement('li');
                outUlLi.innerHTML = '<b>'+data[i].name+'</b>'+'<br>'+data[i].vicinity;
                outUl.appendChild(outUlLi);
            }    
            baseDiv.appendChild(outUl);
        } else {
            baseDiv.textContent = 'No places founded!';
        }
        document.getElementById('outDiv').appendChild(baseDiv);
    },
    renderWaiting: function(){
        var outDiv = document.createElement('div');
        outDiv.id = 'msg';
        outDiv.innerHTML = '<img src="img/loading.gif" style="width:100%;heght:100%">';
        return outDiv;
    }
};