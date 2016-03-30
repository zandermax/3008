(function(){
  'use strict';
  document.addEventListener('DOMContentLoaded', function(){
    var el = document.querySelector('#search');
    el.addEventListener('keyup', function(){
      var v = el.value;
      var l = document.querySelector('.collection');
      l.innerHTML = '';
      var f = courses.filter(function(e){
        var keys = Object.keys(e);
        var str = keys.reduce(function(c, k){
          if(typeof e[k] === 'string')
            c += e[k];
          return c;
        }, '');
        return v.split(' ').every(function(element){
          return str.toLowerCase().indexOf(element.toLowerCase()) > -1;
        });
      });
      console.log(f);
      f.forEach(function(e){
        l.innerHTML += "<li class='collection-item'>" + e.dept + " " + e.num + "<br/> " + e.name + "</li>"
      });
    }, false);
  }, false);
})();
