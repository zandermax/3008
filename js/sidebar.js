(function() {
'use strict';
  document.addEventListener('DOMContentLoaded', function() {
    var el = document.querySelector('#search');
    var populateList = function() {
      var v = el.value;
      var l = document.querySelector('.collection');
      l.innerHTML = '';
      var f = courses.filter(function(e) {
        var keys = Object.keys(e);
        var str = keys.reduce(function(c, k) {
          if (typeof e[k] === 'string')
            c += e[k];
          return c;
        }, '');
        return v.split(' ').every(function(element) {
          return str.toLowerCase().indexOf(element.toLowerCase()) > -1;
        });
      });
      f.forEach(function(e, i) {
        l.innerHTML += "<li class='collection-item' data-ci='" + i + "'>" + e.dept + " " + e.num + "<br/> " + e.name + "</li>"
      });
    };
    el.addEventListener('keyup', populateList, false);
    populateList();

    $(".collection-item").click(function() {
      var c = window.courses[$(this).attr("data-ci")];
      window.calendar.viewTSInfo(c, 0);
    });
  }, false);
})();
