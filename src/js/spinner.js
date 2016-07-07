var spinner = require('spin');
module.exports = {
    spin: function (container) {
        this.hideContents();
        var s = new spinner().spin();
        container.style.display = 'block';
        container.innerHTML = '';
        container.appendChild(s.el);
    },

    hideContents: function () {
        var contentResult = document.querySelectorAll('.content-result');
        for (var i = 0; i < contentResult.length; i++) {
            contentResult[i].style.display = 'none';
        }
    }    
}