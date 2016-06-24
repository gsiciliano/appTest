var app = require ('./app');
var barcodeScanner = require('./scanner');
var utils  = require('./utils');
var render = require('./render');
var google = require('./google');
var geocode = require('./geocode')
app.initialize(barcodeScanner,utils,render,google,geocode);