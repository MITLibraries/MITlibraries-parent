// Today
var today, d, m, yyyy;
today = new Date();
d = today.getDate();
m = today.getMonth() + 1;
yyyy = today.getFullYear();
today = m + "/" + d + "/" + yyyy;

// Day of week
var day = moment().format('dddd').toLowerCase(); // to match JSON

var addDay = moment().add('days', 1).format('M/DD/YYYY');

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

		for (var i = 0; i < locations.length; i++) {
			// Empty exceptions arr for each location
			var exceptionsArr = [];
			// Find the first exception that matches today's date
			var exceptions = _.findWhere(locations[i].exceptions, {"date" : today});
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
			var dayCompiled = _.template(
				'<tr>' +
					'<td>' +
						'<%= locationName %>' +
					'</td>' +
					'<td>' +
						todayOpen +
					'</td>' +
					'<td>' +
						todayClosed +
					'</td>' +
				'</tr>'
			);
			// Location exception template
			var locationsCompiled = _.template(
				'<h2 class="name-location">' +
					'<%= locationName %> exceptions' +
				'</h2>' +
				'<table>' +
					'<tbody class="table-exceptions">' +
						'<tr>' +
							'<th>Date</th>' +
							'<th>Open</th>' +
							'<th>Closed</th>' +
						'</tr>' +
					'</tbody>'+
				'</table>'
			);
			var locationTemplate = locationsCompiled(locations[i]);
			// Append the location exception template
			$('.entry-content').append(locationTemplate);
			// Exceptions per location
			var exceptionsPer = locations[i].exceptions;
			
			for (var ii = 0; ii < exceptionsPer.length; ii++) {
				// Template for each exception
				var exceptionsCompiled = _.template(
					'<tr>' +
						'<td>' +
							'<%= date %>' +
						'</td>' +
						'<td>' +
							'<%= open %>' +
						'</td>' +
						'<td>' +
							'<%= closed %>' +
						'</td>' +
					'</tr>'
				);
				var exceptionsTemplate = exceptionsCompiled(locations[i].exceptions[ii]);
				// Append each exception to the most recently create location exception list
				$('.table-exceptions:last').append(exceptionsTemplate);
			};
			
			// Set today's hours for each location
			var dayTemplate = dayCompiled(locations[i]);
			$('#table-today').append(dayTemplate);

		};

		// Append term start and end times
		$('#date-term-begin').text(theTerm.termStart);
		$('#date-term-end').text(theTerm.termEnd);
	})