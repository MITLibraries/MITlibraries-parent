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
			var locId = locations[i].locationName.substr(0, locations[i].locationName.indexOf(' ')).toLowerCase();
			console.log(locId);
			// Location default Mon-Sun hours template
			var weekCompiled = _.template(
				'<h2 id="hours-week-' + locId + '" class="name-location">' +
					'<%= locationName %> Monday - Sunday' +
				'</h2>' +
				'<table>' +
					'<tbody class="table-mon-sun">' +
						'<tr>' +
							'<th>Day</th>' +
							'<th>Open</th>' +
							'<th>Closed</th>' +
						'</tr>' +
						'<tr>' +
							'<td>' +
								'Monday' +
							'</td>' +
							'<td>' +
								'<%= monday.open %>' +
							'</td>' +
							'<td>' +
								'<%= monday.closed %>' +
							'</td>' +
						'</tr>' +
						'<tr>' +
							'<td>' +
								'Tuesday' +
							'</td>' +
							'<td>' +
								'<%= tuesday.open %>' +
							'</td>' +
							'<td>' +
								'<%= tuesday.closed %>' +
							'</td>' +
						'</tr>' +
						'<tr>' +
							'<td>' +
								'Wednesday' +
							'</td>' +
							'<td>' +
								'<%= wednesday.open %>' +
							'</td>' +
							'<td>' +
								'<%= wednesday.closed %>' +
							'</td>' +
						'</tr>' +
						'<tr>' +
							'<td>' +
								'Thursday' +
							'</td>' +
							'<td>' +
								'<%= thursday.open %>' +
							'</td>' +
							'<td>' +
								'<%= thursday.closed %>' +
							'</td>' +
						'</tr>' +
						'<tr>' +
							'<td>' +
								'Friday' +
							'</td>' +
							'<td>' +
								'<%= friday.open %>' +
							'</td>' +
							'<td>' +
								'<%= friday.closed %>' +
							'</td>' +
						'</tr>' +
						'<tr>' +
							'<td>' +
								'Saturday' +
							'</td>' +
							'<td>' +
								'<%= saturday.open %>' +
							'</td>' +
							'<td>' +
								'<%= saturday.closed %>' +
							'</td>' +
						'</tr>' +
						'<tr>' +
							'<td>' +
								'Sunday' +
							'</td>' +
							'<td>' +
								'<%= sunday.open %>' +
							'</td>' +
							'<td>' +
								'<%= sunday.closed %>' +
							'</td>' +
						'</tr>' +
					'</tbody>'+
				'</table>'
			);
			// Location exception template
			var locationsCompiled = _.template(
				'<h2 id="hours-exceptions-' + locId + '" class="name-location">' +
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

			var weekTemplate = weekCompiled(locations[i]);
			// Append the Mon-Sun hours template
			$('.entry-content').append(weekTemplate);
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
		$('#date-term-end').text(theTerm.termEnd).trigger('hours-loaded');
	});

// Append a jump nav

// $(document).on('hours-loaded', function(){
// 	$('<nav id="nav-hours" class="nav-page--dynamic" />').appendTo('.content-main');
// 	$('.content-page').css('width', '67%');
// 	$('.entry-content h2').each(function(){
// 		var jumpLink = $(this).attr('id');
// 		var jumpText = $(this).text();
// 		$('#nav-hours')
// 			.append('<a href="#' + jumpLink + '">' + jumpText + '</a>');
// 	});
// 	var navHeight = $('#nav-hours').outerHeight() + 530;
// 	console.log(navHeight);
// 	$('#nav-hours').css('margin-bottom', navHeight);
// });