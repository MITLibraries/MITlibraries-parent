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
		};;
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
			
			// Set today's hours for each location
			var dayTemplate = dayCompiled(locations[i]);
			$('#table-today').append(dayTemplate);
		};

		//
		// Weekly view -- EXPERIMENTING.
		//

		var week = 	[
									'sunday',
									'monday',
									'tuesday',
									'wednesday',
									'thursday',
									'friday',
									'saturday'
								];
		// Index of today in the week
		var todayWeek = week.indexOf(day);
		// Array of days remaining in the week
		var daysRemain = _.rest(week, [todayWeek]);
		// Days from today to the beginning of the week (e.g. Sunday - today)
		var daysDiff = _.difference(week, daysRemain);
		// Seven days from today
		var newWeek = daysRemain.concat(daysDiff);
		console.log(newWeek);


		// console.log(sevenDays);
		// console.log(day);
		// console.log(week);
		// console.log(todayWeek);
		// for (var i = 0; i < week.length; i++) {
			
		// };

		// Empty week dates array
		var weekDates = [];

		for (var i = 0; i < 7; i++) {
			// Next seven dates, starting from today
			var nextDay = moment().add('days', i).format('M/DD/YYYY');
			weekDates.push(nextDay);

			var weekDatesCompiled = _.template(
				'<th>' +
					weekDates[i] +
				'</th>'
			);

			$('#hours-week').append(weekDatesCompiled);
		};

		// for (var i = 0; i < locations.length; i++) {
		// 	var dayWeek = moment().add('days', i).format('dddd').toLowerCase();
		// 	// Empty exceptions arr for each location
		// 	var exceptionsArr = [];
		// 	// Find the first exception that matches today's date
		// 	var exceptions = _.findWhere(locations[i].exceptions, {"date" : today});
		// 	// Set the open/closed hours if there is an exception...
		// 	if (exceptions != undefined) {
		// 		var todayOpen = '<%= '+'"'+exceptions.open+'"'+' %>';
		// 		var todayClosed = '<%= '+'"'+exceptions.closed+'"'+' %>';
		// 	}
		// 	// or else use today's default hours
		// 	else {
		// 		var todayOpen = '<%= '+dayWeek+'.open %>';
		// 		var todayClosed = '<%= '+dayWeek+'.closed %>';
		// 	}
		// 	console.log(dayWeek);

		// 	for (var ii = 0; ii < 7; ii++) {
		// 		// 7 day week view
		// 		var weekCompiled = _.template(
		// 			'<tr>' +
		// 				'<td>' +
		// 					todayOpen + ' - ' + todayClosed +
		// 				'</td>' +
		// 			'</tr>'
		// 		);

		// 	};
			
		// };

		// END WEEKLY VIEW


		// Append term start and end times
		$('#date-term-begin').text(theTerm.termStart);
		$('#date-term-end').text(theTerm.termEnd);
	})