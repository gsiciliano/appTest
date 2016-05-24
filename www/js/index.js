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
        document.getElementById('btnFind').addEventListener('click', this.buttonClick, false);
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
    buttonClick: function(){
        utils.hideClass('outDiv');
        utils.showClass('errDiv');
        document.getElementById('errMsg').textContent = 'calling service...';
        google.searchIsbn(document.getElementById('edtISBN').value, function(){
            var data = JSON.parse(this.responseText);
            if (data){
                if (data.totalItems > 0){
                    utils.showClass('outDiv');
                    utils.hideClass('errDiv');
                    document.getElementById('isbnTitle').textContent = data.items[0].volumeInfo.title;
                    document.getElementById('isbnDesc').textContent = data.items[0].volumeInfo.description;
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
};
var utils = {
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
var google = {
    searchIsbn: function(isbn, fCallBack){
        var base_url = 'https://www.googleapis.com/books/v1/volumes?q=isbn:';
        var url = base_url+isbn;
        var request = new XMLHttpRequest();
        request.callback = fCallBack;
        request.open('GET', url, true);
        request.onload = function() {
          if (request.status >= 200 && request.status < 400) {
            // Success!
            this.callback.apply(this);
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

app.initialize();