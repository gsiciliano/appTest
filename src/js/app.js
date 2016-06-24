module.exports = {
    barcodeScanner: null,
    utils: null,
    render: null,
    google: null,
    geocode: null,
    // Application Constructor
    initialize: function(barcodeScanner,utils, render, google, geocode) {
        this.bindEvents();
        this.barcodeScanner = barcodeScanner;
        this.utils = utils;
        this.render = render;
        this.google = google;
        this.geocode = geocode;
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        document.getElementById('btnFind').addEventListener('click', this.btnFindClick.bind(this), false);
        document.getElementById('btnScan').addEventListener('click', this.btnScanClick.bind(this), false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        this.receivedEvent();
        var that = this;
        this.geocode.watchCurrPos(function(result){
            that.geocode.getAddrFromLatLng(result.latitude,result.longitude,that.render.renderGeocodeResult);
        });
        
    },
    // Update DOM on a Received Event
    receivedEvent: function() {
        console.log('Received Event: Device ready');
    },
    btnFindClick: function(){
        this.searchBook(document.getElementById('edtISBN').value);
    },
    btnScanClick: function(){
        this.barcodeScanner.scan(this.searchBook.bind(this),this.render.renderResult.bind(this)); 
    },
    searchBook: function(isbn){
        this.utils.hideClass('outDiv');
        this.utils.showClass('errDiv');
        document.getElementById('errMsg').textContent = 'calling service...';
        this.google.searchIsbn(isbn, this.render.renderResult.bind(this));
    }
};