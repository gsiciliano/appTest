var localforage = require('localforage');
module.exports = {
    saveData: function(isbn,data){
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
};