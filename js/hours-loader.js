(function($){

var HoursLoader = {

	cache: '/app/libhours-buildjson/',

	date: '',

	debug: false,

	exceptions: [],

	hours: {},

	locations: [],

	// This is an array of markup conditions, any of which indicates that
	// hours are called for on the page. If found, the rest of the code
	// is executed.
	markers: [
		"table.hrList tr",
		"[data-location-hours]",
	],

	semesters: [],

	step: 0,

	week: [],

	// This iterates over the assembled week, loading each day's hours from the relevant semester.
	// At the beginning of this method, the locations array is populated by the base default hours,
	// coming from the Default Hours sheet.
	// At the end of this method, those values have been replaced according to which semester governs
	// that date.
	applySemesterHours: function() {
		this.logArray('Loading appropriate semester hours into locations arrays for each day of the week');
		// Transfer values into local scope so that the coming anonymous functions can still read them.
		var locations, needle, semesters, semester_hours, testweek;
		locations = this.locations;
		semesters = this.semesters;
		semester_hours = this.semester_hours;
		testweek = this.week;
		// Loop over our Week construct
		_.each(testweek, function(dayofweek, i) {
			// Define which column in the data collections we're replacing for this day of the week.
			target_column = (0 === dayofweek.getDay()) ? 7 : dayofweek.getDay();
			// Find the element in semester_hours that corresponds to this semester
			needle = _.find(semesters, function(swap) {
				return dayofweek.semestername === swap[0];
			});
			id = _.indexOf(_.pluck(semesters, 0), needle[0]);
			// Pluck the column for this date from the relevant source data
			relevant = _.pluck(semester_hours[id], target_column);
			// This isn't quite as elegant as _.pluck, but close. Drop the
			// relevant data over the appropriate element in the locations array-of-arrays.
			locations = _.map(locations, function(loc, j) {
				loc[target_column] = relevant[j];
				return loc;
			});
		});
		this.locations = locations;
		this.logArray([
			'Applied semester hours',
			this.locations,
			'\n'
		]);
	},

	// This method applies the remaining exceptions that still exist in memory.
	// (The list of exceptions was previously filtered in assembleExceptions)
	applyExceptionHours: function() {
		this.logArray('Applying (already-filtered) hours exceptions to location arrays');
		// Transfer values into local scope for anonymous functions.
		var exception_hours, haystack, locations, logArray, needle, week;
		logArray = this.logArray;
		locations = this.locations;
		this.logArray([
			'Current state of compiled hours:',
			locations
		]);
		week = this.week;
		// This builds an array of dates in a comparable format to how the exceptions are recorded.
		haystack = _.map(week, function(day) {
			return(moment(day).format('M/D/YYYY'));
		});
		this.logArray([
			'Haystack for searching within the following loop:',
			haystack
		]);
		// Loop over our array of exceptions...
		_.each(this.exceptions, function(exception, i) {
			exception_hours = exception.slice(2); // Skips first two values
			// Extract the actual new values into a separate array.
			// Exception[0] is a text string describing why the exception exists. It is never displayed.
			// Exception[1] is the effective date, which we need to look up in the week array.
			needle = exception[1];
			target = _.indexOf(haystack, needle);
			// The haystack dates are already sorted with Monday first, so the index find just above
			// only needs to be increased by one due to the compiled array-of-arrays having a label field.
			target_column = target + 1;
			values = _.pluck(locations, target_column);
			// Iterate over the new values, overwriting any non-blank values
			_.each(exception_hours, function(new_value, j) {
				// The index j of this loop is within the 12-element list of locations.
				// In order to transfer this accurately to the compiled hours information, we increment by two.
				// (see note above about our not storing exceptions for the chat service hours)
				if ( "" !== new_value && undefined !== new_value ) {
					target_row = j + 1; // offset one row because of row labels
					locations[target_row][target_column] = new_value;
				}
			});
		});
		this.locations = locations;
		this.logArray([
			'Hours with all exceptions applied:',
			this.locations,
			'\n'
		]);
	},

	// This method transposes the exceptions array of arrays
	// From https://stackoverflow.com/a/17428779/2245617
	assembleExceptions: function() {
		this.logArray('Assembling relevant exceptions');
		var testweek;
		rebuild = [];
		testweek = this.week;
		this.exceptions = _.zip.apply(_, this.exceptions);
		this.logArray([
			'Transposed exceptions:',
			this.exceptions
		]);
		// Now we filter the exceptions array for only those events within our target week...
		_.each(this.exceptions, function(except) {
			except_date = new Date(except[1]);
			if (except_date <= testweek[6] && except_date >= testweek[0]) {
				rebuild.push(except);
			}
		});
		this.exceptions = rebuild;
		this.logArray([
			'New exceptions list:',
			this.exceptions,
			'\n'
		]);
	},

	// This reshapes the compiled hours array-of-arrays from its build location
	// inside this.locations, and dumps it into this.hours in a format which
	// the render functions are expecting.
	assembleHours: function() {
		this.logArray('Assembling final hours object');
		testhours = {};
		var loc, testlocations;
		testlocations = this.locations;
		// For each location, add an object to the final hours object.
		// the key for this object is the first value in the location array,
		// while the rest of the values are converted to an object with keys
		// of the index value.
		//
		// Example:
		// starting location:
		// [
		//   "Administrative Offices",
		//   "closed",
		//   "closed",
		//   "closed",
		//   "By appt only",
		//   "By appt only",
		//   "closed",
		//   "closed"
		// ]
		//
		// Final object:
		// "Administrative Offices": {
		//   "0": "closed",
		//   "1": "closed",
		//   "2": "closed",
		//   "3": "By appt only",
		//   "4": "By appt only",
		//   "5": "closed",
		//   "6": "closed"
		// }
		_.each(testlocations, function(location) {
			loc = location.slice(1);
			// This used to be [...loc.keys()] instead of [0,1,2,3,4,5,6] but was dropped to support IE.
			testhours[location[0]] = _.object([0,1,2,3,4,5,6], loc);
		});
		this.hours = testhours;
		this.logArray([
			'New hours data:',
			this.hours,
			'\n'
		]);
	},

	assembleWeek: function() {
		this.logArray('Assembling semester information about target week')
		var regex, testday, testweek, testsemesters, semester_cache, semester_start, semester_end, rebuildsemesters, rebuildweek;
		rebuildsemesters = [];
		rebuildweek = [];
		// This regex is used to convert a sheet name to a filename.
		regex = / /gi;
		testweek = this.week;
		testsemesters = this.semesters;
		// For each date in the week...
		_.each(testweek, function(dayofweek) {
			testday = new Date(dayofweek);
			rebuildsemester = [];
			// Cycle through each term, determining which it belongs to.
			// (This is inefficient, I know...)
			_.each(testsemesters, function(semester) {
				semester_start = new Date(semester[1]);
				semester_end = new Date(semester[2]);
				if ( semester[0] !== 'Default Hours' && testday >= semester_start && testday <= semester_end ) {
					rebuildsemester = semester;
					semester_cache = semester[0].replace(regex, '-') + '.json'
					testday.semestername = semester[0];
					testday.start = semester[1];
					testday.end = semester[2];
				}
			});
			rebuildsemester.push(semester_cache);
			rebuildsemesters.push(rebuildsemester);
			rebuildweek.push(testday);
		});
		this.logArray([
			'Rebuilt semesters data:',
			rebuildsemesters
		]);
		this.semesters = _.uniq(rebuildsemesters);
		this.logArray([
			'Unique semesters data:',
			this.semesters
		]);
		this.week = rebuildweek;
		this.logArray([
			'Rebuilt week data:',
			this.week,
			'\n'
		]);
	},

	compileStepOne: function() {
		this.logArray('Hours markers found. Proceeding...');

		// Setup phase
		// Define any needed properties
		this.setTestDate();
		this.setWeek();

		// Load all required files, then take further action
		files = [
			'Default-Hours.json',
			'Semester-Breakdown.json',
			'Holidays-and-Special-Hours.json'
		];

		Promise.all([
			this.loadCacheFile(files[0]),
			this.loadCacheFile(files[1]),
			this.loadCacheFile(files[2])
		])
		.then(
			this.setData.bind(this)
		)
		.then(
			this.assembleWeek.bind(this)
		)
		.then(
			this.compileStepTwo.bind(this)
		)
		.catch(function(error) {
			console.error('Error encountered loading required data files:')
			console.error(error);
		});
	},

	// This is the second part of the loading and rendering sequence.
	// By this point we have populated the target dates array, and
	// filtered the exceptions and semesters list based on those dates.
	//
	// This sets up the second Promise chain, which starts with loading
	// the list of applicable semester hours, and then starts assembling
	// all loaded data into the final Hours object.
	//
	// The chain finishes by calling the render() method.
	compileStepTwo: function() {
		this.logArray([
			'Compile Step Two...\n',
			'Loading required semester hours'
		]);
		var cache, files, loader;
		cache = this.cache;
		files = [];
		_.each(this.semesters, function(semester) {
			files.push(semester[3]);
		})
		this.logArray([
			'Files to be loaded:',
			files,
			'\n'
		]);

		Promise.all(
			files.map(this.loadCacheFile.bind(this))
		)
		.then(
			this.setSemesterHours.bind(this)
		)
		.then(
			this.assembleExceptions.bind(this)
		)
		.then(
			this.applySemesterHours.bind(this)
		)
		.then(
			this.applyExceptionHours.bind(this)
		)
		.then(
			this.assembleHours.bind(this)
		)
		.then(
			this.render.bind(this)
		)
		.catch(function(error) {
			console.error('Error encountered loading semester hours');
			console.error(error);
		});

	},

	init: function() {
		// Check for any of the conditions in the markup array. If found, start the compilation process.
		if ( _.find(this.markers, function(marker) { return jQuery(marker).length }) ) {
			this.compileStepOne();
		}
	},

	// This method is necessary for a few reasons:
	// 1. Can easily turn on / off debugging with an object property (this.debug)
	// 2. Provides a wrapper around console.log( JSON.parse( JSON.stringify( ) ) ),
	//    which is needed as described in https://stackoverflow.com/a/15364821/2245617
	// 3. Allows methods to pass an array of values for logging, which I hope
	//    will be easier to read within code.
	// PLEASE NOTE: This method currently does not log some objects accurately,
	// particularly Date objects.
	logArray: function(messages) {
		if ( this.debug ) {
			// If we were sent a string, just log it and return.
			if ("string" === typeof(messages)) {
				console.log( JSON.parse( JSON.stringify( messages ) ) );
				return;
			}
			// Otherwise, iterate over the object and log each line.
			_.each(messages, function(line) {
				console.log( JSON.parse( JSON.stringify( line ) ) );
			});
		}
	},

	// This method loads a file inside the cache directory, using a Promise
	loadCacheFile: function(path) {
		var url = this.cache + path;
		this.logArray([
			'Loading file inside a Promise:',
			url
		]);
		return new Promise( function( resolve, reject ) {
			var request = new XMLHttpRequest();
			request.open('GET', url);
			request.onloadstart = function() {
				request.responseType = 'json';
			};
			request.onload = function() {
				if ( 200 == request.status ) {
					// This is a hack to force IE to parse the response as JSON.
					// From: https://stackoverflow.com/questions/24861073/detect-if-any-kind-of-ie-msie#comment86300642_24861185
					if ( /Trident|MSIE/.test(navigator.userAgent) ) {
							resolve( JSON.parse( request.response ) );
					} else {
							resolve( request.response );
					}
				} else {
					reject( Error( request.statusText ) );
				}
			};
			request.onerror = function() {
				reject( Error( "Network Error" ) );
			};
			request.send();
		});
	},

	// This is the main render function, which detects markup conditions and calls the appropriate render function.
	render: function() {
		if ( jQuery("[data-location-hours]").length > 0 ) {
			this.renderSingle();
		} else if ( jQuery("table.hrList").length > 0 ) {
			this.renderGrid();
		}
	},

	// This renders an hours grid in response to a specific table class in markup.
	renderGrid: function() {
		this.logArray('Rendering grid of hours');
		var hours, needle, thisLocation;
		hours = this.hours;
		// For each row in the table with a "location" data-attribute, look up the
		// corresponding record in the compiled hours object, apply last-minute
		// formatting, and drop into the markup for each cell.
		jQuery("table.hrList tr").each(function() {
			if(jQuery(this).data("location")) {
				thisLocation = jQuery(this).data("location");
				// Iterate over each cell in the row, rendering the hours string
				// twice (once for full width display, once for mobile).
				for (var i = 0; i < 7; i++) {
					hoursText = hours[thisLocation][i];
					day = jQuery(this).find("td[data-day="+i+"]");
					// Append full version, with any last-minute formatting.
					day.append(function() {
						var fullEl = document.createElement("span");
						fullEl.setAttribute("class","hidden-mobile");
						var fullText = hoursText
							.replace("-"," - ")
							.replace(/:00/g,"");
						fullEl.innerHTML = fullText;
						return fullEl;
					});
					// Append mobile version, with any last-minute formatting.
					day.append(function() {
						var mobileEl = document.createElement("span");
						mobileEl.setAttribute("class","hidden-non-mobile");
						var mobileText = hoursText
							.replace("-"," - ")
							.replace("midnight","midn")
							.replace(/am/g,"a")
							.replace(/pm/g,"p")
							.replace(/:00/g,"");
						mobileEl.innerHTML = mobileText;
						return mobileEl;
					});
				}

			}
		});

	},

	// This renders a single hours value in response to a data attribute in markup.
	renderSingle: function() {
		this.logArray('Rendering single hours value');
		var hours;
		hours = this.hours;
		jQuery("[data-location-hours]").each(function() {
			// Read the relevant location from data attributes in the markup.
			loc = jQuery(this).data("location-hours");
			// Perform any last-minute formatting
			singleHoursValue = hours[loc][moment(Date()).isoWeekday()-1]
			    .replace(/:00/g,"");
			// Write out to the page
			jQuery(this).html(singleHoursValue);
		});

	},

	// This method stores data loaded by the Promise into object properties.
	// Data is an array of file contents defined within the init method.
	setData: function(data) {
		this.locations = data[0];
		this.semesters = data[1];
		this.exceptions = data[2];
		this.logArray([
			'First batch of data loaded from local cache:',
			'Locations:',
			this.locations,
			'Semesters:',
			this.semesters,
			'Exceptions:',
			this.exceptions,
			'\n'
		]);
	},

	// This stores an array of saved semester hours.
	setSemesterHours: function(data) {
		this.semester_hours = data;
		this.logArray([
			'Loaded semester hours:',
			this.semester_hours,
			'\n'
		]);
	},

	// This method defines the date about which we are concerned.
	setTestDate: function() {
		// We start with todays date unless something else is specified.
		var testDate = new Date();
		if ( window.location.search ) {
			// Need to make sure that we're getting a valid date specification
			// per http://stackoverflow.com/a/2880929/2245617
			var urlParams;
			var match,
			pl     = /\+/g,  // Regex for replacing addition symbol with a space
			search = /([^&=]+)=?([^&]*)/g,
			decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); },
			query  = window.location.search.substring(1);
			urlParams = {};

			while (match = search.exec(query))
			urlParams[decode(match[1])] = decode(match[2]);

			dateParts = "";
			if ( urlParams["d"] ) {
				dateParts = urlParams["d"].split("-");
			}

			if ( dateParts.length === 3 ) {
				year = +dateParts[0];
				month = +dateParts[1] - 1; // javascript months are zero-based. SMH.
				day = +dateParts[2];
				testDate = new Date(year, month, day);
			}
		}
		this.date = testDate;
		this.logArray([
			'Date set to:',
			this.date,
			'\n'
		]);
	},

	// This method will return the Target Dates array.
	setWeek: function() {
		var week = [];
		var moment_date = moment(this.date).startOf('day');
		var start_date = moment_date.clone().subtract(moment_date.isoWeekday()-1, 'days');
		for (var i=0; i < 7; i++) {
			var idate = start_date.clone().add(i, 'days');
			week.push(idate);
		}
		this.week = week;
		this.logArray([
			'Week set to:',
			this.week,
			'\n'
		]);
	}

}

window.HoursLoader = HoursLoader;

$(document).ready(function(){HoursLoader.init()});

})(jQuery);
