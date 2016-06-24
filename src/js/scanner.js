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
