(function() {
'use strict';
  document.addEventListener('DOMContentLoaded', function() {
    var el = document.querySelector('#search');

    var populateList = function() {
      var v = el.value;
      var l = document.querySelector('.search-results ul');
      l.innerHTML = '';

      var f = courses.filter(function(e) {
        var keys = Object.keys(e);

        // Combine course's key values into one string to match against
        var str = keys.reduce(function(c, k) {
          if (typeof e[k] === 'string')
            c += e[k];
          return c;
        }, '');

        // Check "object string" against user's search string
        return v.split(' ').every(function(element) {
          return str.toLowerCase().indexOf(element.toLowerCase()) > -1;
        });
      });

      // Add results to list
      f.forEach(function(e, i) {
        var tsHtml = '';

        e.timeslots.forEach(function(ts, j) {
          var id = "ts-" + i + "-" + j;
          tsHtml += "<input type='checkbox' data-tsi='" + j + "' id='" + id + "'/>" +
                    "<label for='" + id + "'>" + ts.startTime + " - " + ts.endTime + " (" + ts.prof + ")</label><br/>";
        });


        l.innerHTML += "<li data-ci='" + i + "'>" + 
                          "<div class='collapsible-header'>" +
                            e.dept + " " + e.num + "<br/> " + e.name +
                          "</div>" +

                          "<div class='collapsible-body'>" +
                            "<b>Timeslots</b><br/>" +
                            tsHtml +
                          "</div>" +
                        "</li>";
      });

      $(".collection-item").click(function() {
        /* TODO: expand and show timeslots */
        var c = window.courses[$(this).attr("data-ci")];
        window.calendar.viewTSInfo(c, 0);
      });
    };
    el.addEventListener('keyup', populateList, false);
    populateList();
  }, false);
})();
