/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/***/ function(module, exports, __webpack_require__) {

	var app = __webpack_require__ (/*! ./app */ 1);
	var barcodeScanner = __webpack_require__(/*! ./scanner */ 2);
	var utils  = __webpack_require__(/*! ./utils */ 3);
	var render = __webpack_require__(/*! ./render */ 4);
	var google = __webpack_require__(/*! ./google */ 5);
	var geocode = __webpack_require__(/*! ./geocode */ 6)
	app.initialize(barcodeScanner,utils,render,google,geocode);

/***/ },
/* 1 */
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
/***/ function(module, exports) {

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

/***/ },
/* 2 */
/*!***************************!*\
  !*** ./src/js/scanner.js ***!
  \***************************/
/***/ function(module, exports) {

	module.exports = {
	    scan: function (callback, render) {
	        cordova.plugins.barcodeScanner.scan(
	            function (result) {
	                if(!result.cancelled) {
	                    callback(result.text, render);
	                }
	            },
	            function (error) {
	                alert("Scanning failed: " + error);
	            },
	            {
	                'preferBackCamera': true,
	                'showFlipCameraButton': true,
	                'prompt': 'Visualizzare un codice nell\'area di scan',
	                'formats': 'EAN_13',
	                'orientation': 'portait'
	            }
	        );
	    }
	
	};


/***/ },
/* 3 */
/*!*************************!*\
  !*** ./src/js/utils.js ***!
  \*************************/
/***/ function(module, exports) {

	module.exports =  {
	    showClass: function(eid){
	        var el = document.getElementById(eid);
	        var cl = el.className;
	        if (cl.indexOf('hidden') >= 0 ) {
	           el.className = cl.replace('hidden', '');            
	        }   
	    },
	    hideClass: function(eid){
	        var el = document.getElementById(eid);
	        var cl = el.className;
	        if (cl.indexOf('hidden') < 0 ) {
	            el.className += cl+' hidden';            
	        }    
	    }
	};


/***/ },
/* 4 */
/*!**************************!*\
  !*** ./src/js/render.js ***!
  \**************************/
/***/ function(module, exports) {

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

/***/ },
/* 5 */
/*!**************************!*\
  !*** ./src/js/google.js ***!
  \**************************/
/***/ function(module, exports) {

	module.exports =  {
	    searchIsbn: function(isbn, fCallBack){
	        var base_url = 'https://www.googleapis.com/books/v1/volumes?q=isbn:';
	        var url = base_url+isbn;
	        var request = new XMLHttpRequest();
	        request.callback = fCallBack;
	        request.open('GET', url, true);
	        request.onload = function() {
	          if (request.status >= 200 && request.status < 400) {
	            // Success!
	            fCallBack(JSON.parse(request.responseText));
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


/***/ },
/* 6 */
/*!***************************!*\
  !*** ./src/js/geocode.js ***!
  \***************************/
/***/ function(module, exports) {

	module.exports = {
	    getCurrPos: function(callback){
	        navigator.geolocation.getCurrentPosition(
	                function(position){
	                    
	                    callback('Lat: '+position.coords.latitude+' - Long: '+position.coords.longitude);
	                },
	                function(error){
	                    callback(error.message);
	                }); 
	    },
	    watchCurrPos: function(callback){
	        navigator.geolocation.watchPosition(
	                function(position){
	                    callback(position.coords);
	                },
	                function(error){
	                    console.log(error.message);
	                },
	                { maximumAge: 3000, timeout: 5000});
	    },
	    getAddrFromLatLng: function(lat,lng,callback){
	        var base_url = 'https://maps.googleapis.com/maps/api/geocode/json?sensor=false&latlng=';
	        var url = base_url+lat+','+lng;
	        var request = new XMLHttpRequest();
	        request.callback = callback;
	        request.open('GET', url, true);
	        request.onload = function() {
	          if (request.status >= 200 && request.status < 400) {
	            // Success!
	            callback(JSON.parse(request.responseText));
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
	}

/***/ }
/******/ ]);
//# sourceMappingURL=app.bundle.js.map