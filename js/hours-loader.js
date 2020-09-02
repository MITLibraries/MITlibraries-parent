(function($){

var HoursLoader = {

	cache: '/app/libhours-buildjson/',

	date: '',

	debug: true,

	exceptions: [],

	hours: {},

	locations: [],

	markers: [
		"table.hrList tr",
		"[data-location-hours]",
	],

	semesters: [],

	step: 0,

	week: [],

	// This method transposes the exceptions array of arrays
	// From https://stackoverflow.com/a/17428779/2245617
	assembleExceptions: function() {
		console.log('Assembling relevant exceptions');
		var testweek;
		rebuild = [];
		testweek = this.week;
		this.exceptions = _.zip.apply(_, this.exceptions);
		// Now we filter the exceptions array for only those events within our target week...
		_.each(this.exceptions, function(except) {
			except_date = new Date(except[1]);
			if (except_date <= testweek[6] && except_date >= testweek[0]) {
				rebuild.push(except);
			}
		});
		console.log(rebuild);
	},

	// This assembles the final hours information from all previous data.
	assembleHours: function() {
		console.log('Assembling final hours object');
		testhours = {};
		var loc, testexceptions, testlocations, testsemesters, testweek;
		testexceptions = this.exceptions;
		testlocations = this.locations;
		testsemesters = this.semesters;
		testweek = this.week;
		// For each location...
		_.each(testlocations, function(location) {
			console.log(location);
			loc = [];
			locname = location[0];
			loc = location.slice(1);
			testhours[locname] = loc;
		});
		console.log(testhours);
		this.hours = testhours;

	},

	// This iterates over the assembled week, loading each day's hours from the relevant semester.
	assembleSemesterHours: function() {
		console.log('Loading appropriate semester hours for each day of the week');
		var testweek;
		testweek = this.week;
		console.log(testweek);
		_.each(testweek, function(dayofweek) {
			console.log(dayofweek);
		});
	},

	assembleWeek: function() {
		console.log('Assembling semester information about target week');
		var regex, testday, testweek, testsemesters, semester_cache, semester_start, semester_end, rebuildsemesters, rebuildweek;
		rebuildsemesters = [];
		rebuildweek = [];
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
		console.log('Rebuilt semesters array is:');
		console.log(rebuildsemesters);
		this.semesters = _.uniq(rebuildsemesters);
		console.log('Trimmed semesters list is now:');
		console.log(this.semesters);
		this.week = rebuildweek;
	},

	init: function() {
		// Setup phase
		// Define any needed properties
		this.setTestDate();
		this.setWeek();

		// Load all required files, then take further action
		files = [
			'default-hours.json',
			'semester-breakdown.json',
			'holidays-and-special-hours.json'
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
			this.loadSemesterHours.bind(this)
		)
		.catch(function(error) {
			console.error('Error encountered loading required data files:')
			console.error(error);
		});

	},

	log: function(message) {
		if ( this.debug ) {
			console.log( this.step + ':\n');
			console.log( message );
			console.log('\n==============================\n\n');
			this.step++;
		}
	},

	// This method loads a file inside the cache directory, using a Promise
	loadCacheFile: function(path) {
		var url = this.cache + path;
		return new Promise( function( resolve, reject ) {
			var request = new XMLHttpRequest();
			request.responseType = 'json';
			request.open('GET', url);
			request.onload = function() {
				if ( 200 == request.status ) {
					resolve( request.response );
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

	// This is the second part of the loading and rendering sequence.
	// By this point we have populated the target dates array, and
	// filtered the exceptions and semesters list based on those dates.
	//
	// This sets up the second Promise chain, which starts with loading
	// the list of applicable semester hours, and then starts assembling
	// all loaded data into the final Hours object.
	//
	// The chain finishes by calling the render() method.
	loadSemesterHours: function() {
		console.log('Loading required semester hours');
		var cache, files, loader;
		cache = this.cache;
		files = [];
		loader = this.loadCacheFile;
		_.each(this.semesters, function(semester) {
			files.push(semester[4]);
		})
		console.log('Files to be loaded:');
		console.log(files);

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
			this.assembleSemesterHours.bind(this)
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

	// This is the main render function, which detects markup conditions and calls the appropriate render function.
	render: function() {
		console.log('Render method');
		if ( jQuery("[data-location-hours]").length > 0 ) {
			this.renderSingle();
		} else if ( jQuery("table.hrList").length > 0 ) {
			this.renderGrid();
		}
	},

	// This renders an hours grid in response to a specific table class in markup.
	renderGrid: function() {
		console.log('Rendering hours grid');
	},

	// This renders a single hours value in response to a data attribute in markup.
	renderSingle: function() {
		console.log('Rendering single hours value');

	},

	// This method stores data loaded by the Promise into object properties.
	// Data is an array of file contents defined within the init method.
	setData: function(data) {
		console.log('First batch of data loaded from local cache:');
		this.locations = data[0];
		console.log('Locations:');
		console.log(this.locations);
		this.semesters = data[1];
		console.log('Semesters:');
		console.log(this.semesters);
		this.exceptions = data[2];
		console.log('Exceptions:');
		console.log(this.exceptions);
	},

	// This stores an array of saved semester hours.
	setSemesterHours: function(data) {
		this.semester_hours = data;
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
		this.log('Date set to ' + this.date);
	},

	// This method will return the Target Dates array.
	setWeek: function() {
		var week = [];
		var moment_date = moment(this.date);
		var start_date = moment_date.clone().subtract(moment_date.isoWeekday()-1, 'days');
		for (var i=0; i < 7; i++) {
			var idate = start_date.clone().add(i, 'days');
			week.push(idate);
		}
		this.week = week;
		this.log('Week set to ' + this.week);
	}

}

window.HoursLoader = HoursLoader;

$(document).ready(function(){HoursLoader.init()});

})(jQuery);
