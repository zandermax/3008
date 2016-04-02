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

      $(".search-results ul > li .collapsible-body input[type=checkbox]").change(function() {
        var c = courses[$(this).closest("li").attr("data-ci")];
        var tsi = $(this).attr("data-tsi");

        if ($(this).is(":checked"))
          calendar.addCourse(c, tsi);
        else
          calendar.removeCourse(c, tsi);

        // Remove other timeslots for this course
        $(this).siblings("input[type=checkbox]").each(function() {
          $(this).attr("checked", false);
          calendar.removeCourse(c, $(this).attr("data-tsi"));
        });
      });
    };
    el.addEventListener('keyup', populateList, false);
    populateList();
  }, false);
})();
