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
	            self.geocode.getNearByPlacesJS(1000,'school',result.latitude,result.longitude,self.render.renderNearbyPlaces);
	        });    
	//        this.geocode.getCurrPos(function(result){
	//            self.geocode.getNearByPlaces(1000,'school',result.latitude,result.longitude,self.render.renderNearbyPlaces);
	//        });
	    },
	    searchBook: function(isbn){
	        self.google.searchIsbn(isbn, self.render.renderSearchResult);
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
	                } else {
	                    callback(null, render);
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
	            el.className += ' hidden';            
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
	    renderSearchResult: function(data){
	        document.getElementById('outDiv').removeChild(document.getElementById('msg'));
	        if (data){
	            var baseDiv = document.createElement('div');
	            baseDiv.id='output';
	            if (data.totalItems > 0){
	                if (data.items[0].volumeInfo.title){
	                    var outDiv = document.createElement('div');
	                    outDiv.innerHTML = 'Titolo: <b>'+data.items[0].volumeInfo.title+'</b>';
	                    baseDiv.appendChild(outDiv);
	                }    
	                if (data.items[0].volumeInfo.description){
	                    var outDiv = document.createElement('div');
	                    outDiv.innerHTML = 'Descr: <b>'+data.items[0].volumeInfo.description+'</b>';
	                    baseDiv.appendChild(outDiv);
	                }    
	            } else {
	                baseDiv.textContent = 'cannot find book!';
	            }
	        } else {
	            baseDiv.textContent = 'OOPS! we got an error!';
	        }    
	        document.getElementById('outDiv').appendChild(baseDiv);
	    },
	    renderGeocodeResult: function(data){
	        if (data){
	            if (data.results.length > 0){
	                document.getElementById('myPos').textContent = data.results[0].formatted_address;       
	            } else {
	                document.getElementById('myPos').textContent = 'OOPS! no addresses';       
	            }
	        } else {
	            document.getElementById('myPos').textContent = 'OOPS! render error';       
	        }    
	    },
	    renderNearbyPlaces: function(data){
	        document.getElementById('outDiv').removeChild(document.getElementById('msg'));
	        var baseDiv = document.createElement('div');
	        baseDiv.id='output';
	        if (data){
	            var outUl = document.createElement('ul');
	            for (i=0;i<data.length;i++){
	                var outUlLi = document.createElement('li');
	                outUlLi.innerHTML = '<b>'+data[i].name+'</b>'+'<br>'+data[i].vicinity;
	                //var outDiv = document.createElement('div');
	                //var outDivSpan1 = document.createElement('p');
	                //outDivSpan1.innerHTML = 'Nome:'+data.results[i].name;
	                //outDiv.appendChild(outDivSpan1);
	                //var outDivSpan2 = document.createElement('p');
	                //outDivSpan2.innerHTML = 'Ind:'+data.results[i].vicinity;
	                //outDiv.appendChild(outDivSpan2);
	                //baseDiv.appendChild(outDiv);
	                outUl.appendChild(outUlLi);
	            }    
	            baseDiv.appendChild(outUl);
	        } else {
	            baseDiv.textContent = 'No places founded!';
	        }
	        document.getElementById('outDiv').appendChild(baseDiv);
	    },
	    renderWaiting: function(){
	        var outDiv = document.createElement('div');
	        outDiv.id = 'msg';
	        outDiv.innerHTML = '<img src="img/loading.gif" style="width:100%;heght:100%">';
	        return outDiv;
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
	                    callback(position.coords);
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
	                    callback(error.message);
	                },
	                { maximumAge: 3000, timeout: 5000});
	    },
	    getAddrFromLatLng: function(lat,lng,callback){
	        var baseUrl = 'https://maps.googleapis.com/maps/api/geocode/json?sensor=false&latlng=';
	        var url = baseUrl+lat+','+lng;
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
	    },
	    getNearByPlaces: function(radius,placeTag,lat,lng,callback){
	        var googleKey = 'AIzaSyD72rJop2VZYj7H6eUOZOvWskDLKW2UZvE';
	        var baseUrl   = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?';
	        var url = baseUrl+'location='+lat+','+lng+'&radius='+radius+'&type='+placeTag+'&key='+googleKey;
	        var request = new XMLHttpRequest();
	        request.callback = callback;
	        request.open('GET', url, true);
	        request.onload = function() {
	          if (request.status >= 200 && request.status < 400) {
	            // Success!
	            var data = JSON.parse(request.responseText);
	            callback(data.results);
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
	        
	    },
	    getNearByPlacesJS: function(radius,placeTag,lat,lng,callback){
	            var myLoc = {lat: lat, lng: lng};
	            var map = new google.maps.Map(document.getElementById('map'), {
	                center: myLoc,
	                zoom: 15
	            });
	            var request = {
	                location: myLoc,
	                radius: radius,
	                types: [placeTag]
	            };
	            service = new google.maps.places.PlacesService(map);
	            service.nearbySearch(request, function(results, status){
	                  if (status == google.maps.places.PlacesServiceStatus.OK) {
	                    callback(results);  
	                  }
	            });
	        
	    }
	};

/***/ }
/******/ ]);
//# sourceMappingURL=app.bundle.js.map