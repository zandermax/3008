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
    updateView: function() {
    	// Clear all cells
    	$("#calendar > table > tbody > tr > td").each(function() {
    		$(this).removeClass("timeslot-temp");
    		// TODO: remove class for "about to be removed"
    		$(this).html("");
    	});

    	courses.forEach(function(c, ci) {
    		c.timeslots.forEach(function(ts, tsi) {
    			var cells = calendar.findTSCells(ts);

    			if (ts.selected || ts.added) {
    				var h = "<p class='timeslot-course-name'>" + c.dept + " " + c.num + "</p>" +
	      						"<p class='timeslot-course-info'>" + ts.prof + "</p>" +
	      						"<p class='timeslot-course-info'>" + ts.location + "</p>";
	      		
	      		// If course is on calendar in any way (even temporarily), show its info
	      		cells.forEach(function(cell) {
	      			cell.addClass("timeslot-temp");
	    				cell.attr("data-ci", ci);
	    				cell.attr("data-tsi", tsi);
	      			cell.html(h);

	      			// Course only selected --> queued to be added
	      			if (!ts.added)
	      				cell.addClass("timeslot-temp");

	      			// Course only added --> queued to be removed
	      			else if (!selected) {
	      				/* TODO: add class for "about to be removed" */
	      			}
	      		});
    			}
    		});
    	});
    },
    undoChanges: function() {
    	courses.forEach(function(c, ci) {
    		c.timeslots.forEach(function(ts, tsi) {
    			// Undo add
    			if (!ts.added && ts.selected)
    				ts.selected = false;

    			// Undo remove
    			else if (ts.added && !ts.selected)
    				ts.selected = true;
    		});
    	});
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

	$("#calendar .btn-discard").click(function() {
		calendar.undoChanges();
		calendar.updateView();
		sidebar.updateTimeslots();
	});
});
