var localforage = require('localforage');
module.exports = {
    saveData: function(key,data){
        localforage.setItem(key, JSON.stringify(data)).catch(function(err){
           console.log(err);
        });
    },
    getData: function(key, callback){
        localforage.getItem(key).then(function(value){
            callback(JSON.parse(value));
        }).catch(function(err){
            callback(null);
            console.log(err);
        });
    },
    removeData: function(key,callback){
        localforage.removeItem(key).then(function(){
            callback(0);
        }).catch(function(err){
            callback(-1);
            console.log(err);
        });
    }
};