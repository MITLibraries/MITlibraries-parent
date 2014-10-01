// Build today's hours on individual location pages
$(function(){
	var locSelector = $('[data-location-hours]'),
			apptOnlyLoc = ['Document Services', 'Library Storage Annex'],
			apptOnly;
	// If the selector exists
	if (locSelector.length) {
		// Today
		var today, d, m, yyyy;
		today = new Date();
		d = today.getDate();
		m = today.getMonth() + 1;
		yyyy = today.getFullYear();
		today = m + "/" + d + "/" + yyyy;

		// Day of week
		var day = moment().format('dddd').toLowerCase(); // to match JSON
		
		var addDay = moment().add(1, 'days').format('M/DD/YYYY');

		$.ajax({
				cache: false,
				url: "/wp-content/themes/libraries/term-hours.json",
				dataType: "json"
			})
			.done(function(json) {
				// The terms
				var terms = json.terms;

				for (var i = 0; i < terms.length; i++) {
					// Check each term for start/end dates
					var termStart = terms[i].termStart;
					var termEnd = terms[i].termEnd;
					// Check the range (using Moment.js w/ Twix plugin)
					var termActive = moment.twix(termStart, termEnd, {parseStrict: true}).isCurrent();
					// Set the active term
					if (termActive === true) {
						var theTerm = terms[i];
					}
				};
				// Active term locations
				var locations = theTerm.locations;
				// Each location
				locSelector.each(function(){

					var location = $(this).data('location-hours');

					// The location
					var locationHrs = _.findWhere(theTerm.locations, {"locationName" : location});
					// Empty exceptions arr for each location
					var exceptionsArr = [];
					// Find the first exception that matches today's date
					var exceptions = _.findWhere(locationHrs.exceptions, {"date" : today});
					// Set the open/closed hours if there is an exception...
					if (exceptions != undefined) {
						var todayOpen = '<%= '+'"'+exceptions.open+'"'+' %>';
						var todayClosed = '<%= '+'"'+exceptions.closed+'"'+' %>';
					}
					// or else use today's default hours
					else {
						var todayOpen = '<%= '+day+'.open %>';
						var todayClosed = '<%= '+day+'.closed %>';
					}

					// The template for today's hours
					var hoursTodayCompiled = _.template(
							todayOpen + '-' + todayClosed
					);

					var hoursTodayTemplate = hoursTodayCompiled(locationHrs);

					$(this).append(hoursTodayTemplate.replace(/:00/g,"").replace(/12am/g,"midnight"));

				});
				// If location hours are "by appoinment only"
				if (apptOnlyLoc.indexOf(location) !== -1) {
					locSelector.append(' (by appointment only)');
				}

			});
		}
});