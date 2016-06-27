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
