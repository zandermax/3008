/**
 * 	Need to handle 3hr classes?
 *	Do away with times to label timeslots in courses.json/courses.js
 *		-Using indicies will simplify finding the corresponding cell in the table
 * @param  {[type]} function( [description]
 * @return {[type]}           [description]
 */
(function() {
  'use strict';
  window.calendar = {
    removeCourse: function(c, tsi) {
      var timeslot = c.timeslots[tsi];

      findTSCell(timeslot, function(cells) {
        for (var i = 0; i < cells.length; ++i) {
          cells[i].html("timeslot");
        }
      });
    },
    addCourse: function(c, tsi) {
      var timeslot = c.timeslots[tsi];

      findTSCell(timeslot, function(cells) {
        var h = "<p class='timeslot-course-name'>" + c.dept + " " + c.num + "</p>" +
          "<p class='timeslot-course-info'>" + timeslot.prof + "</p>" +
          "<p class='timeslot-course-info'>" + timeslot.location + "</p>";

        for (var i = 0; i < cells.length; ++i)
          cells[i].html(h);
      });
    },
    findTSCell: function(ts, cb) {
      // Find row
      $("#calendar > table > tbody > tr > th").each(function() {
        if ($(this).text().trim().startsWith(ts.startTime)) {
          var res = [];

          // find col
          for (var i = 0; i < ts.days.length; ++i)
            res.push($($(this).parent().find("td")[ts.days[i] - 1]));

          cb(res);
          return false;
        }
      });
    },
  };
})();
