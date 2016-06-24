module.exports =  {
    renderResult: function(data){
        document.getElementById('isbnTitle').textContent='';
        document.getElementById('isbnDesc').textContent='';
        if (data){
            if (data.totalItems > 0){
                this.utils.showClass('outDiv');
                this.utils.hideClass('errDiv');
                if (data.items[0].volumeInfo.title){
                    document.getElementById('isbnTitle').textContent = data.items[0].volumeInfo.title;
                }    
                if (data.items[0].volumeInfo.description){
                    document.getElementById('isbnDesc').textContent = data.items[0].volumeInfo.description;
                }    
            } else {
                this.utils.hideClass('outDiv');
                this.utils.showClass('errDiv');
                document.getElementById('errMsg').textContent = 'cannot find book!';
            }
        } else {
            this.utils.hideClass('outDiv');
            this.utils.showClass('errDiv');
            document.getElementById('errMsg').textContent = 'OOPS! we got an error!';
        }    
    },
    renderGeocodeResult: function(data){
        if (data){
            if (data.results.length > 0){
                document.getElementById('myPos').textContent = data.results[0].formatted_address;       
                console.log(data);
            } else {
                document.getElementById('myPos').textContent = 'OOPS! no addresses';       
            }
        } else {
            document.getElementById('myPos').textContent = 'OOPS! render error';       
        }    
    }
};