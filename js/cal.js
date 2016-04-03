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
  	viewTSInfo: function(c, tsi) {
  		var ts = c.timeslots[tsi];
  		var weekdays = ["Sunday", "Monday", "Tuesday","Wednesday",
  										"Thursday", "Friday", "Saturday"];

  		// Populate modal
  		$("#course-info-modal .ci-modal-name").text(c.name);
  		$("#course-info-modal .ci-modal-cc").text(c.dept + " " + c.num);
			$("#course-info-modal .ci-modal-prof").text(ts.prof);
			$("#course-info-modal .ci-modal-loc").text(ts.location);

  		// Format time string
  		var timeStr = "";
  		for (var i = 0; i < ts.days.length; ++i)
  			timeStr += " " + weekdays[ts.days[i]];
  		timeStr += ", " + ts.startTime + "-" + ts.endTime;

  		$("#course-info-modal .ci-modal-time").text(timeStr);
  		$("#course-info-modal").openModal({
        in_duration:100,
        out_duration:100
      });
  	},
    removeCourse: function(c, tsi) {
    	// Remove course from calendar
      var timeslot = c.timeslots[tsi];

      // Undo DOM changes
      var cells = this.findTSCells(timeslot);
      for (var i = 0; i < cells.length; ++i) {
				cells[i].removeClass("timeslot-temp");
				cells[i].attr("data-ci", null);
				cells[i].attr("data-tsi", null);
				cells[i].html("");
      }
    },
    addCourse: function(c, tsi) {
    	// Add course to the calendar
      var timeslot = c.timeslots[tsi];

      var cells = this.findTSCells(timeslot);
	    var h = "<p class='timeslot-course-name'>" + c.dept + " " + c.num + "</p>" +
	      "<p class='timeslot-course-info'>" + timeslot.prof + "</p>" +
	      "<p class='timeslot-course-info'>" + timeslot.location + "</p>";

	    // Add for each day the class occurs on
	    for (var i = 0; i < cells.length; ++i) {
	    	cells[i].addClass("timeslot-temp");
	    	cells[i].attr("data-ci", courses.indexOf(c));
	    	cells[i].attr("data-tsi", tsi);
	      cells[i].html(h);
	    }
    },
    findTSCells: function(ts) {
    	// Find the DOM elements in the calendar for the timeslot

    	var res = [];
      // Find row
      $("#calendar > table > tbody > tr > th").each(function() {
        if ($(this).text().trim().startsWith(ts.startTime)) {
          // find col
          for (var i = 0; i < ts.days.length; ++i)
            res.push($($(this).parent().find("td")[ts.days[i] - 1]));
        }
      });
      return res;
    },
    isTSEmpty: function(ts) {
    	// True if the calendar table cell doesn't have a course or temp course in it
    	var cells = this.findTSCells(ts);
    	for (var i = 0 ; i < cells.length; ++i) {
    		if (cells[i].hasClass("timeslot-filled") || cells[i].hasClass("timeslot-temp"))
    			return false;
    	}
    	return true;
    },
    showHideConflict: function(ts, show) {
    	var cells = this.findTSCells(ts);
    	for (var i = 0 ; i < cells.length; ++i) {
    		if (show)
    			cells[i].addClass("timeslot-error");
    		else
    			cells[i].removeClass("timeslot-error");
    	}
    }
  };
})();


$(document).ready(function(){
	// Timeslot click handler
	$("#calendar table tbody tr td").click(function() {
		var cell = $(this);

		// Show timeslot info for course
		if (cell.hasClass("timeslot-filled")) {
			var c = courses[cell.attr("data-ci")];
  			var tsi = cell.attr("data-tsi");

  			calendar.viewTSInfo(c, tsi);
		}
	});
});
