var storage = require('./storage');
module.exports =  {
    searchIsbn: function(isbn, fCallBack){
        var base_url = 'https://www.googleapis.com/books/v1/volumes?q=isbn:';
        var url = base_url+isbn;
        var request = new XMLHttpRequest();
        request.callback = fCallBack;
        request.open('GET', url, true);
        request.onload = function() {
          if (request.status >= 200 && request.status < 400) {
            /* here we save in storage volumeInfo */
            data = JSON.parse(request.responseText);
            if (data.totalItems > 0){
                storage.saveData(data.items[0].volumeInfo);  
            }
            fCallBack(data.items[0].volumeInfo);

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
