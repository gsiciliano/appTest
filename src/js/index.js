var barcodeScanner = require('./barcodeScanner');
var utils  = require('./utils');
var render = require('./render');
var google = require('./google');

app = {
    barcodeScanner: null,
    utils: null,
    render: null,
    google: null,
    // Application Constructor
    initialize: function(barcodeScanner,utils, render, google) {
        this.bindEvents();
        this.barcodeScanner = barcodeScanner;
        this.utils = utils;
        this.render = render;
        this.google = google;
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.getElementById('btnFind').addEventListener('click', this.btnFindClick.bind(this), false);
        document.getElementById('btnScan').addEventListener('click', this.btnScanClick.bind(this), false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent();
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
app.initialize(barcodeScanner,utils,render,google);