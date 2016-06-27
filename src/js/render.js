module.exports =  {
    renderSearchResult: function(data){
        document.getElementById('outDiv').removeChild(document.getElementById('msg'));
        if (data){
            var baseDiv = document.createElement('div');
            baseDiv.id='output';
            if (data.totalItems > 0){
                if (data.items[0].volumeInfo.title){
                    var outDiv = document.createElement('div');
                    outDiv.innerHTML = 'Titolo: <b>'+data.items[0].volumeInfo.title+'</b>';
                    baseDiv.appendChild(outDiv);
                }    
                if (data.items[0].volumeInfo.description){
                    var outDiv = document.createElement('div');
                    outDiv.innerHTML = 'Descr: <b>'+data.items[0].volumeInfo.description+'</b>';
                    baseDiv.appendChild(outDiv);
                }    
            } else {
                baseDiv.textContent = 'cannot find book!';
            }
        } else {
            baseDiv.textContent = 'OOPS! we got an error!';
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
            for (i=0;i<data.results.length;i++){
                var outUlLi = document.createElement('li');
                outUlLi.innerHTML = '<b>'+data.results[i].name+'</b>'+'<br>'+data.results[i].vicinity;
                //var outDiv = document.createElement('div');
                //var outDivSpan1 = document.createElement('p');
                //outDivSpan1.innerHTML = 'Nome:'+data.results[i].name;
                //outDiv.appendChild(outDivSpan1);
                //var outDivSpan2 = document.createElement('p');
                //outDivSpan2.innerHTML = 'Ind:'+data.results[i].vicinity;
                //outDiv.appendChild(outDivSpan2);
                //baseDiv.appendChild(outDiv);
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