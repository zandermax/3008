(function() {
  'use strict';
  window.calendar = {
  	weekdays: ["Sunday", "Monday", "Tuesday","Wednesday",
  						 "Thursday", "Friday", "Saturday"],
  	viewCourseInfo: function(ci, tsi) {
  		var c = courses[ci];
  		var ts = c.timeslots[tsi];

  		// Populate modal
      var m = $("#course-info-modal");
  		m.attr("data-ci", ci);

  		m.find(".ci-modal-name").text(c.name);
  		m.find(".ci-modal-cc").text(c.dept + " " + c.num);
      m.find(".ci-modal-desc").text(c.desc);

      // Only show timeslot-specific info if it's available
      if (tsi) {
        m.attr("data-tsi", tsi);
        m.find(".ci-modal-prof").text(ts.prof);
        m.find(".ci-modal-loc").text(ts.location);

        // Format time string
        var timeStr = "";
        for (var i = 0; i < ts.days.length; ++i)
          timeStr += " " + this.weekdays[ts.days[i]];
        timeStr += ", " + ts.startTime + "-" + ts.endTime;

        m.find(".ci-modal-time").text(timeStr);

        m.find(".ci-modal-ts-specific").show();
        $("#modal-remove-btn").show();
      } else {
        m.find(".ci-modal-ts-specific").hide();
        $("#modal-remove-btn").hide();
      }

  		$("#course-info-modal").openModal({
        in_duration:100,
        out_duration:100
      });
  	},
    updateView: function() {
    	// Clear all cells
    	$("#calendar > table > tbody > tr > td").each(function() {
    		$(this).removeClass("timeslot-queued");
    		$(this).removeClass("timeslot-dequeued");
    		$(this).removeClass("timeslot-filled");
    		$(this).html("");
    	});

    	$("#fabs").hide();

    	courses.forEach(function(c, ci) {
    		c.timeslots.forEach(function(ts, tsi) {
    			var cells = calendar.findTSCells(ts);

    			if (ts.selected || ts.added) {
    				var h = "<p class='timeslot-course-name'>" + c.dept + " " + c.num + "</p>" +
	      						"<p class='timeslot-course-info'>" + ts.prof + "</p>" +
	      						"<p class='timeslot-course-info'>" + ts.location + "</p>";

	      		// If course is on calendar in any way (even temporarily), show its info
	      		cells.forEach(function(cell) {
	      			var h2 = h;

	    				cell.attr("data-ci", ci);
	    				cell.attr("data-tsi", tsi);

	      			if (ts.added) {
	      				cell.addClass("timeslot-filled");

	      				if (!ts.selected) {
	      					// Course only added --> queued to be removed
	      					cell.addClass("timeslot-dequeued");
	      					$("#fabs").show();
	      					h2 += "<span class='cell-info'>To be removed</span>";
	      				}
	      			}	else {
	      				// Course only selected --> queued to be added
	      				cell.addClass("timeslot-queued");
	      				$("#fabs").show();
	      				h2 += "<span class='cell-info'>To be added</span>";
	      			}

	      			cell.html(h2);
	      		});
    			}
    		});
    	});
    },
    applyChanges: function() {
    	courses.forEach(function(c, ci) {
    		c.timeslots.forEach(function(ts, tsi) {
    			// Add course
    			if (ts.selected && !ts.added)
    				ts.added = true;

    			// Remove course
    			else if (!ts.selected && ts.added)
    				ts.added = false;
    		});
    	});
    },
    undoChanges: function() {
    	courses.forEach(function(c, ci) {
    		c.timeslots.forEach(function(ts, tsi) {
    			// Undo add
    			if (ts.selected && !ts.added)
    				ts.selected = false;

    			// Undo remove
    			else if (!ts.selected && ts.added)
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
    		if (cells[i].hasClass("timeslot-filled") ||
    				cells[i].hasClass("timeslot-queued") ||
    				cells[i].hasClass("timeslot-dequeued"))
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
    },
    searchTSCourses: function(cell) {
    	var st = cell.siblings("th").text().trim().split(" ")[0]; // Start time
    	var d = cell.parent().children("td").index(cell)+1; // Day
    	var l = document.querySelector("#timeslot-search-modal .modal-content ul");
    	l.innerHTML = '';

    	// Filter courses occuring on this date and time
    	var results = courses.filter(function(c, ci) {
    		var found = false;
    		var taken = false;
    		c.timeslots.forEach(function(ts, tsi) {
    			if (ts.days.indexOf(d) > -1 && ts.startTime == st)
    				found = true;
    			if (ts.selected || ts.added)
    				taken = true;
    		});
    		return found && !taken;
    	});
      $("#timeslot-search-modal .ts-modal-title").text(
        results.length ? "Available courses for " +
        this.weekdays[d] + "s at " + st + " (click to add)" : "No available courses for this time slot.");

    	// Add found courses to the modal's list
    	results.forEach(function(c, ci) {
    		var tsi;
    		c.timeslots.forEach(function(ts, i) {
        	if (ts.days.indexOf(d) > -1 && ts.startTime == st)
        		tsi = i;
	      });

    		var h = "<li class='collection-item' data-ci='" + courses.indexOf(c) + "' data-tsi='" + tsi + "'><div>" +
	        			c.dept + " " + c.num + "<br/>" + c.name + "<br/>";
        c.timeslots[tsi].days.forEach(function(day) {
        	h += calendar.weekdays[day] + " ";
        });
	      h += "(" + c.timeslots[tsi].prof + ")" + "</div></li>";

	      l.innerHTML = h;
    	});

    	$("#timeslot-search-modal .modal-content ul > li").click(function() {
    		// Select course timeslot on click
    		var ci = $(this).closest("li").attr("data-ci");
        var tsi = $(this).closest("li").attr("data-tsi");
        courses[ci].timeslots[tsi].selected = true;
        calendar.updateView();
        sidebar.updateTimeslots();
        $("#timeslot-search-modal").closeModal();
    	});

			$("#timeslot-search-modal").openModal({
        in_duration:100,
        out_duration:100
      });
    }
  };
})();


$(document).ready(function(){
	// Timeslot click handler
	$("#calendar table tbody tr td").click(function() {
		var cell = $(this);

		// Show timeslot info for course
		if (!cell.hasClass("timeslot-dequeued")) {
			if (cell.hasClass("timeslot-filled")) {
  			calendar.viewCourseInfo(cell.attr("data-ci"), cell.attr("data-tsi"));

	  	// Show timeslot search modal if empty
			} else if (!cell.hasClass("timeslot-queued")) {
				calendar.searchTSCourses(cell);
			}
		}
	});

	var showHidePlus = function(cell, show) {
		if (!cell.hasClass("timeslot-queued") &&
			  !cell.hasClass("timeslot-dequeued") &&
			  !cell.hasClass("timeslot-filled")) {
			if (show)
				cell.html("<i class='mdi-content-add'></i>");
			else
				cell.html("");
		}
	};

	$("#calendar table tbody tr td").hover(function() {
		showHidePlus($(this), true);
	},
	function() {
		showHidePlus($(this), false);
	});

	$("#calendar .btn-apply").click(function() {
		calendar.applyChanges();
		calendar.updateView();
		sidebar.updateTimeslots();
		Materialize.toast('Changes applied', 4000);
	});

	$("#calendar .btn-discard").click(function() {
		calendar.undoChanges();
		calendar.updateView();
		sidebar.updateTimeslots();
		Materialize.toast('Changes discarded', 4000);
	});

	// Dequeue course from modal
	$("#modal-remove-btn").click(function() {
		var m = $(this).closest(".modal");
		courses[m.attr("data-ci")].timeslots[m.attr("data-tsi")].selected = false;
		calendar.updateView();
		sidebar.updateTimeslots();
		m.closeModal();
	});

	calendar.updateView();
});
