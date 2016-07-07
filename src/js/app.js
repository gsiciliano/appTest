var instantClick = require('instantclick2');
var storage = require('./storage');
module.exports = {
    barcodeScanner: null,
    utils: null,
    render: null,
    google: null,
    geocode: null,
    self:null,
    storage :null,
    // Application Constructor
    initialize: function(barcodeScanner,utils, render, google, geocode) {
        this.bindEvents();
        this.barcodeScanner = barcodeScanner;
        this.utils = utils;
        this.render = render;
        this.google = google;
        this.geocode = geocode;
        self = this;
    },
    // Bind Event Listeners
    //
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        document.getElementById('btnFind').addEventListener('click', this.btnFindClick.bind(this), false);
        //document.getElementById('schNearby').addEventListener('click', this.btnSchNearby.bind(this), false);
        var placeBtns = document.querySelectorAll('[data-action="schNearby"');
        for (var i = 0; i < placeBtns.length; i++) {
            var button = placeBtns[i];
            button.addEventListener('click', this.btnSchNearby.bind(this), false);
        }        
        document.getElementById('btnBack').addEventListener('click', this.btnBack.bind(this), false);
    },
    // deviceready Event Handler
    onDeviceReady: function() {
        this.receivedEvent();
        document.getElementById('myPos').innerHTML = 'wait for geolocation...';
        this.geocode.watchCurrPos(function(result){
            storage.removeData('currentPos',function(status){
               if (status == 0){
                    var objCurrPos = {
                      'latitude':result.latitude,
                      'longitude':result.longitude
                    };
                    storage.saveData('currentPos', objCurrPos);
               } 
            });
            self.geocode.getAddrFromLatLng(result.latitude,result.longitude,self.render.renderGeocodeResult);
        });
        
    },
    // Update DOM on a Received Event
    receivedEvent: function() {
        console.log('Received Event: Device ready');
        instantClick.init({
            preloadingMode: 50, //Mouseover duration before preload is triggered
            preloadCacheTimeLimit: 30000 //How long to cache preloaded pages
        });
    },
    btnBack: function(event){
        event.preventDefault();
        this.utils.showClass('app');
        this.utils.hideClass('outDiv');
        var output = document.getElementById('output');
        if (output) {
            document.getElementById('renderDiv').innerHTML='';
        }    
        document.getElementById('edtISBN').value = '';
    },
    btnFindClick: function(event){
        event.preventDefault();
        this.utils.hideClass('app');
        this.utils.showClass('outDiv');
        document.getElementById('renderDiv').appendChild(this.render.renderWaiting());
        if (document.getElementById('edtISBN').value){
            this.searchBook(document.getElementById('edtISBN').value);
        } else {
            this.barcodeScanner.scan(this.searchBook,this.render.renderSearchResult); 
        }    
    },
    btnSchNearby: function(event){
        event.preventDefault();
        this.utils.hideClass('app');
        this.utils.showClass('outDiv');
        document.getElementById('renderDiv').appendChild(this.render.renderWaiting());
        storage.getData('currentPos', function(result){
            if (result){
                self.geocode.getNearByPlacesJS(1000,'school',result.latitude,result.longitude,self.render.renderNearbyPlaces);
            } else {
                self.geocode.getCurrPos(function(result){
                    self.geocode.getNearByPlacesJS(1000,'school',result.latitude,result.longitude,self.render.renderNearbyPlaces);
                });    
            }
        });
/*        
        this call does not work in browser 
        this.geocode.getCurrPos(function(result){
            self.geocode.getNearByPlaces(1000,'school',result.latitude,result.longitude,self.render.renderNearbyPlaces);
        });
*/
    },
    searchBook: function(isbn){
        storage.getData(isbn, function(result){
            if (result){
                self.render.renderSearchResult(result);
            } else {
                self.google.searchIsbn(isbn, self.render.renderSearchResult);
            }    
        });
    }
};