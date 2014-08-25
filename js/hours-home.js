//
// Hours
//

$(function(){

	$(document).on('click', '.hours-locations .show-more', function(){
		var all = $(this).parent();
		var hiddenLocs = $(all).children('.hidden-mobile');
		$(this).addClass('inactive').trigger('more-locs');
	});

	$(document).on('more-locs', function(){
		$('.hours-locations .show-more').hide(100);
		$('.hours-locations .hidden-mobile').removeClass('hidden-mobile').removeClass('inactive-mobile');
	});

	function findToday() {
		var today, d, m, yyyy;
		today = new Date();
		d = today.getDate();
		m = today.getMonth() + 1;
		yyyy = today.getFullYear();
		today = m + "/" + d + "/" + yyyy;
		return today;
	}

	function getHours() {
		// What day is it?
		var thisDay = findToday(thisDay);
		// Empty array for library locations
		var libArr = [];
		// Get the number of locations
		var locs = $('.hours-locations h3').length;
		for (var i = 0; i < locs; i++) {
			// Populate an array, "libArr", with location names
			var loc = $('.hours-locations h3')[i];
			var locName = $(loc).text();
			libArr.push(locName); 
		};
		
		$.ajax({
				cache: false,
				url: "/wp-content/themes/libraries/hours.json",
				dataType: "json"
			})
			.done(function(json) {
				// Empty array for library hours
				var libHrsArr = [];
				// Run the loop again
				for (var i = 0; i < locs; i++) {
					// Each library
					var libs = json[libArr[i]];
					// Each library's hours, today
					var libHrsToday = libs.hours[thisDay];
					// Add these values to the array
					libHrsArr.push(libHrsToday);
				};
				// Append each value to a location, shifting off each object as it is used
				$('.hours-locations .location .hours').each(function(){
					$(this).append(libHrsArr[0]+' <span class="today">today</today>');
					libHrsArr.shift();
				});
				// Add a comma if 24/7 space
				$('.hours-locations .location').has('.special').each(function(){
					$('.today', this).append(',');
				})

			})
			.fail(function(textStatus, error) {
				// Show link to /hours if Ajax request fails
				$('.hours-locations .location .hours').each(function(){
					$(this).append('<a href="/hours">View Hours</a>');
				});
			});
	}
	getHours();

	//
	// Location Images
	//
	$(function(){
		$('.img-loc').css('background-image', 'url(/wp-content/themes/libraries/images/locations-sprite-74.png)').trigger('image-ready');
	});

});