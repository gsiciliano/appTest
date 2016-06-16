/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.getElementById('btnFind').addEventListener('click', this.btnFindClick, false);
        document.getElementById('btnScan').addEventListener('click', this.btnScanClick, false);
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
        searchBook(document.getElementById('edtISBN').value);
    },
    btnScanClick: function(){
        cordova.plugins.barcodeScanner.scan(ScanOnSuccess,ScanOnError,      
        {
          "preferBackCamera" : true, // iOS and Android
          "showFlipCameraButton" : true, // iOS and Android
          "prompt" : "Visualizzare un codice all'interno dell'area di scansione", // supported on Android only
         // "formats" : "QR_CODE,PDF_417,EAN_13,CODE_39", // default: all but PDF_417 and RSS_EXPANDED
          "orientation" : "potrait" // Android only (portrait|landscape), default unset so it rotates with the device
        });
    }
};
function ScanOnSuccess(result) {
    if (!result.cancelled) {
      if (result.format == 'EAN_13'){
        searchBook(result.text);
      } else {
        alert("Codice non supportato");  
      }
    } 
}
function ScanOnError(error) {
    alert("Scanning failed: " + error);
}
function searchBook(isbn){
    utils.hideClass('outDiv');
    utils.showClass('errDiv');
    document.getElementById('errMsg').textContent = 'calling service...';
    google.searchIsbn(isbn, function(){
        var data = JSON.parse(this.responseText);
        if (data){
            if (data.totalItems > 0){
                utils.showClass('outDiv');
                utils.hideClass('errDiv');
                if (data.items[0].volumeInfo.title){
                    document.getElementById('isbnTitle').textContent = data.items[0].volumeInfo.title;
                }    
                if (data.items[0].volumeInfo.description){
                    document.getElementById('isbnDesc').textContent = data.items[0].volumeInfo.description;
                }    
            } else {
                utils.hideClass('outDiv');
                utils.showClass('errDiv');
                document.getElementById('errMsg').textContent = 'cannot find book!';
            }
        } else {
            utils.hideClass('outDiv');
            utils.showClass('errDiv');
            document.getElementById('errMsg').textContent = 'OOPS! we got an error!';
        }    
    });
}

app.initialize();