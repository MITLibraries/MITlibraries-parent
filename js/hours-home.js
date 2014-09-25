//
// Hours
//

$(document).on('click', '.hours-locations .show-more', function(){
	var all = $(this).parent();
	var hiddenLocs = $(all).children('.hidden-mobile');
	$(this).addClass('inactive').trigger('more-locs');
});

$(document).on('more-locs', function(){
	$('.hours-locations .show-more').hide(100);
	$('.hours-locations .hidden-mobile').removeClass('hidden-mobile').removeClass('inactive-mobile');
});

$(function(){

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

	// Empty hours array
	var hoursArr = [];

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
			// For only the six main locations
			for (var i = 0; i < 6; i++) {
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
				var hoursTodayCompiled = _.template(
						todayOpen + '-' + todayClosed
				);

				var hoursTodayTemplate = hoursTodayCompiled(locations[i]);
				// Push these to the hoursArr array
				hoursArr.push(hoursTodayTemplate);
			};
			// Add each location hours...
			$('.location .hours').each(function() {
				$(this).append(hoursArr[0].replace(/:00/g,"").replace(/12am/g,"midnight")+' <span class="today">today</today>');
				// And shift off from the array
				hoursArr.shift();
			});
			// Add a comma if 24/7 space
			$('.hours-locations .location').has('.special').each(function(){
				$('.today', this).append(',');
			});
		})
		.fail(function(textStatus, error) {
			// Show link to /hours if Ajax request fails
			$('.hours-locations .location .hours').each(function(){
				$(this).append('<a href="/hours">View Hours</a>');
			});
		});
});

//
// Location Images
//
$(function(){
	$('.img-loc').css('background-image', 'url(/wp-content/themes/libraries/images/locations-sprite-74.png)').trigger('image-ready');
});