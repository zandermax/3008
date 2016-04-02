(function() {
  'use strict';
  document.addEventListener('DOMContentLoaded', function() {
    var el = document.querySelector('#search');
    var courseFilters = $('.course-filters input[type=checkbox]');

    var filters = {
      'checkbox-morning': function(e){
        if(typeof e !== 'object') throw Error('requires[object]');
        return e.timeslots.some(function(t){
          console.log(moment(t.startTime, 'h:mm').isBefore(moment('12:00', 'h:mm')));
          return moment(t.startTime, 'h:mm').isBefore(moment('12:00', 'h:mm'));
        });
      },
      'checkbox-afternoon': function(e){
        if(typeof e !== 'object') throw Error('requires[object]');
        return e.timeslots.some(function(t){
          return moment(t.startTime, 'h:mm').isAfter(moment('12:00', 'h:mm')) &&
                 moment(t.startTime, 'h:mm').isBefore(moment('17:00', 'h:mm'));
        });
      },
      'checkbox-night': function(e){
        if(typeof e !== 'object') throw Error('requires[object]');
        return e.timeslots.some(function(t){
          return moment(t.startTime, 'h:mm').isAfter(moment('17:00', 'h:mm'));
        });
      },
      'checkbox-compulsary': function(){return true},
      'checkbox-electives':  function(){return true}
    };

    var populateList = function() {
      var v = el.value;
      var l = document.querySelector('.search-results ul');
      l.innerHTML = '';

      var f = v ? courses.filter(function(e) {
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
      }) : courses;

      f = f.filter(function(e){
        return [].every.call($('.course-filters input[type=checkbox]:checked'), function(k){
          return filters[k.id](e);
        });
      })
      // Add results to list
      f.forEach(function(e, i) {
        var tsHtml = '';

        e.timeslots.forEach(function(ts, j) {
          // Format time string
          var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday",
            "Thursday", "Friday", "Saturday"
          ];
          var timeStr = "";
          for (var di = 0; di < ts.days.length; ++di)
            timeStr += " " + weekdays[ts.days[di]];
          timeStr += ", " + ts.startTime + "-" + ts.endTime;

          var id = "ts-" + i + "-" + j;
          tsHtml += "<input type='checkbox' data-tsi='" + j + "' id='" + id + "'/>" +
            "<label for='" + id + "'>" + timeStr + " (" + ts.prof + ")</label><br/>";
        });

        // Add entry for search result
        l.innerHTML += "<li data-ci='" + courses.indexOf(e) + "'>" +
          "<div class='collapsible-header'>" +
          e.dept + " " + e.num + "<br/> " + e.name +
          "</div>" +
          "<div class='collapsible-body'>" +
          "<b>Timeslots</b><br/>" +
          tsHtml +
          "</div>" +
          "</li>";
      });

      // Timeslot checkbox handler
      $(".search-results ul > li .collapsible-body input[type=checkbox]").change(function() {
        var c = courses[$(this).closest("li").attr("data-ci")];
        var tsi = $(this).attr("data-tsi");
        calendar[$(this).is(":checked") ? 'addCourse' : 'removeCourse'](c, tsi);
        // Uncheck/remove other timeslots for this course
        $(this).siblings("input[type=checkbox]").each(function() {
          $(this).attr("checked", false);
          calendar.removeCourse(c, $(this).attr("data-tsi"));
        });
      });
    };
    courseFilters.on('change', populateList);
    el.addEventListener('keyup', populateList, false);
    populateList();
  }, false);
})();
