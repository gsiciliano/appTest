var localforage = require('localforage');
module.exports = {
    saveData: function(data){
        var isbn = null;
        for (i=0;i<data.industryIdentifiers.length;i++){
           if (data.industryIdentifiers[i].type == 'ISBN_13'){
              isbn = data.industryIdentifiers[i].identifier; 
           } 
        };
/*
        objBook = {
            'isbn': isbn,
            'title': data.title,
            'subtitle': data.subtitle,
            'authors': data.authors,
            'pageCount': data.pageCount,
            'publisher': data.publisher,
            'publishedDate': data.publishedDate
        };
*/        
        localforage.setItem(isbn, JSON.stringify(data)).catch(function(err){
           console.log(err);
        });
    },
    getData: function(key, callback){
        localforage.getItem(key).then(function(value){
            callback(JSON.parse(value));
        }).catch(function(err){
            console.log(err);
        });
    }
}