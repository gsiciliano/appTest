module.exports = {
    speech: function(){
        recognition = new SpeechRecognition();
        recognition.onresult = function(event) {
            //document.getElementById('renderDiv').innerHTML = event.results[0][0].transcript;
            this.render.renderSpeechText(event.results[0][0].transcript);
        };
        recognition.start();    
    }
};