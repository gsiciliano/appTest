module.exports = {
    barcodeScanner: null,
    utils: null,
    render: null,
    google: null,
    geocode: null,
    self:null,
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
        document.getElementById('schNearby').addEventListener('click', this.btnSchNearby.bind(this), false);
        document.getElementById('btnBack').addEventListener('click', this.btnBack.bind(this), false);
    },
    // deviceready Event Handler
    onDeviceReady: function() {
        this.receivedEvent();
        //var that = this;
        document.getElementById('myPos').textContent = 'wait for geolocation...';
        this.geocode.watchCurrPos(function(result){
            self.geocode.getAddrFromLatLng(result.latitude,result.longitude,self.render.renderGeocodeResult);
        });
        
    },
    // Update DOM on a Received Event
    receivedEvent: function() {
        console.log('Received Event: Device ready');
    },
    btnBack: function(){
        this.utils.showClass('app');
        this.utils.hideClass('outDiv');
        var output = document.getElementById('output');
        if (output) {
            document.getElementById('outDiv').removeChild(output);
        }    
        document.getElementById('edtISBN').value = '';
    },
    btnFindClick: function(){
        this.utils.hideClass('app');
        this.utils.showClass('outDiv');
        document.getElementById('outDiv').appendChild(this.render.renderWaiting());
        if (document.getElementById('edtISBN').value){
            this.searchBook(document.getElementById('edtISBN').value);
        } else {
            this.barcodeScanner.scan(this.searchBook,this.render.renderSearchResult); 
        }    
    },
    btnSchNearby: function(){
        this.utils.hideClass('app');
        this.utils.showClass('outDiv');
        document.getElementById('outDiv').appendChild(this.render.renderWaiting());
        this.geocode.getCurrPos(function(result){
            self.geocode.getNearByPlaces(1000,'school',result.latitude,result.longitude,self.render.renderNearbyPlaces);
        });
    },
    searchBook: function(isbn){
        self.google.searchIsbn(isbn, self.render.renderSearchResult);
    }
};