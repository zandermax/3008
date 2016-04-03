(function() {
  'use strict';
  document.addEventListener('DOMContentLoaded', function() {
    var el = document.querySelector('#search');
    var courseFilters = $('.course-filters input[type=checkbox]');

    var filters = {
      'checkbox-morning': function(e){
        if(typeof e !== 'object') throw Error('requires[object]');
        return e.timeslots.some(function(t){
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

    var highlightConflict = function(tsr, show) {
      var ci = tsr.closest("li").attr("data-ci");
      var tsi = tsr.attr("data-tsi");
      calendar.showHideConflict(courses[ci].timeslots[tsi], show);
    };

    var updateTimeslots = function() {
      $(".search-results ul > li .collapsible-body input[type=checkbox]").each(function() {
        var ci = $(this).closest("li").attr("data-ci");
        var tsi = $(this).closest(".timeslot-row").attr("data-tsi");

        // Update timeslot checkboxes to reflect calendar state
        if (courses[ci].timeslots[tsi].selected || courses[ci].timeslots[tsi].added)
          $(this).attr("checked", true);

        // Warn of course conflicts
        else if (!calendar.isTSEmpty(courses[ci].timeslots[tsi])) {
          $(this).attr("disabled", true);
          $(this).siblings(".ts-icon").addClass("mdi-alert-warning");
        }
        else {
          $(this).attr("disabled", false);
          $(this).siblings(".ts-icon").removeClass("mdi-alert-warning");
        }
      });
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

      // Apply selected filters
      f = f.filter(function(e){
        var checked = $('.course-filters input[type=checkbox]:checked');
        var pass = !checked.length;
        checked.each(function() {
          pass |= filters[this.id](e);
        });
        return pass;
      });

      // Add results to list
      f.forEach(function(e, i) {
        var tsHtml = '';
        var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday",
            "Thursday", "Friday", "Saturday"
          ];

        e.timeslots.forEach(function(ts, j) {
          // Format time string
          var timeStr = "";
          for (var di = 0; di < ts.days.length; ++di)
            timeStr += " " + weekdays[ts.days[di]];
          timeStr += ", " + ts.startTime + "-" + ts.endTime;

          var id = "ts-" + i + "-" + j;
          tsHtml += "<span class='timeslot-row' data-tsi='" + j + "'><input type='checkbox' id='" + id + "'/>" +
            "<label for='" + id + "'>" + timeStr + " (" + ts.prof + ")</label> <i class='ts-icon'></i></span>";
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
        var ci = $(this).closest("li").attr("data-ci");
        var tsi = $(this).closest(".timeslot-row").attr("data-tsi");
        calendar[$(this).is(":checked") ? 'addCourse' : 'removeCourse'](courses[ci], tsi);

        courses[ci].timeslots[tsi].selected = $(this).is(":checked");
        updateTimeslots();

        // Uncheck/remove other timeslots for this course
        $(this).siblings("input[type=checkbox]").each(function() {
          $(this).attr("checked", false);
          calendar.removeCourse(courses[ci], $(this).closest(".timeslot-row").attr("data-tsi"));
        });
      });

      // Timeslot hover handler
      $(".search-results ul > li .collapsible-body .timeslot-row").hover(
        function() {
          if ($(this).children(".ts-icon").hasClass("mdi-alert-warning"))
            highlightConflict($(this), true);
        },
        function() {
          highlightConflict($(this), false);
      });

      updateTimeslots();
    };

    courseFilters.on('change', populateList);
    el.addEventListener('keyup', populateList, false);
    populateList();
  }, false);
})();
