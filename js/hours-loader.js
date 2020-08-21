(function($){

var HoursLoader = {

	cache: '/app/libhours-buildjson/',

	date: '',

	debug: true,

	locations: {},

	semesters: {},	

	step: 0,

	// This method assembles the complete record of library hours from the
	// local cache. This cache has been populated by the MITlib Pull Hours
	// plugin.
	assembleHoursObject: function() {
		// First we build the list of possible semesters and their dates.
		this.loadCacheFile('semester-breakdown.json', this.assembleSemesters);
		this.loadCacheFile('default-hours.json', this.assembleLocations);
		console.log('This is after both Semesters and Locations are assembled');
	},

	// This method populates the list of locations for which we have hours.
	assembleLocations: function(response) {
		console.log('This is assembleLocations');
		var haystack, sample, locs;
		locs = {};
		if (response.target.readyState !== 4 || response.target.status !== 200 ) {
			console.error('Unexpected response received!');
			return;
		}
		haystack = response.target.response;
		haystack.map(function(i) {
			if ('Location' === i[0]) {
				return;
			}
			sample = {}
			sample[0] = i[1];
			sample[1] = i[2];
			sample[2] = i[3];
			sample[3] = i[4];
			sample[4] = i[5];
			sample[5] = i[6];
			sample[6] = i[7];
			locs[i[0]] = sample;
		});
		console.log(locs);
	},

	// This method populates the list of semesters for which we have hours
	// information.
	assembleSemesters: function(response) {
		console.log('This is assembleSemesters');
		var drydock = {};
		if (response.target.readyState !== 4 || response.target.status !== 200 ) {
			console.error('Unexpected response received!');
			return;
		}
		console.log(response);
		console.log(response.target.response);
		drydock = response.target.response;

		this.semesters = drydock;
	},

	// This method builds the object describing a single location and its
	// hours for a week.
	buildLocation: function() {

	},

	// This method defines the date about which we are concerned.
	buildTestDate: function() {
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
		this.log(testDate);
		return testDate;
	},

	init: function() {
		if ( jQuery("[data-location-hours]").length > 0 ) {
			this.log('Found a placeholder for one location hours');
			// Single-location displays only ever show today's hours.
			this.date = new Date();
			this.assembleHoursObject();
		}

		if ( jQuery("table.hrList").length > 0 ) {
			this.log('Found a grid for all location hours');
			// The hours grid can be requested for any arbitrary date.
			this.date = this.buildTestDate();
			this.assembleHoursObject();
		}

	},

	log: function(message) {
		if ( this.debug ) {
			console.log( this.step + ':\n');
			console.log( message );
			console.log('\n==============================\n\n');
			this.step++;
		}
	},

	// This method loads a locally-cached file, and then passes it to the
	// specified callback.
	loadCacheFile: function(path, callback) {
		this.log( 'Loading ' + path + ' from cache');
		var request = new XMLHttpRequest();
		request.responseType = 'json';
		request.open('GET', this.cache + path);
		request.onload = callback;
		request.onerror = function(e) {
			console.error(request.statusText);
		};
		request.send(null);
	}

}

window.HoursLoader = HoursLoader;

$(document).ready(function(){HoursLoader.init()});

})(jQuery);;