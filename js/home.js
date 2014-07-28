//
// Search
//

// All available resources	
var resourcesAll = $('#resources li');

// Forms
var bartonplusForm = $('#bartonplus');
var veraForm = $('#vera');
var bartonForm = $('#barton');
var worldcatForm = $('#worldcat');
var courseReservesForm = $('#course-reserves');
var siteSearchForm = $('#site-search');

// Mimic a <select> element with a <ul>
$('#resources').on('click', 'li', function(event) {
	// Cancel if the li has a link in it
	if ($(this).hasClass('has-link')) {
		return;
	}
	else {
		// To show or hide the parent <ul>
		$(this).parent().toggleClass('active');
		// Remove active class from any <li> that has it...
		$(resourcesAll).removeClass('active');
		// And add the class to the <li> that gets clicked
		$(this).toggleClass('active');
		
		// Get the main text of the currently selected <li>
		var selectedText = $('#resources li.active .main').text();
		// Show this text above the dropdown (when active), mimicing a <select>
		if ($('#resources').hasClass('active')) {
			console.log('open');
			$('.wrap-select--resources .selected').text(selectedText).addClass('active');
		}
		// Remove the text when the dropdown is closed
		else {
			console.log('closed');
			$('.wrap-select--resources .selected').text('').removeClass('active');
		}
		// Get the class of the selected resource
		var searchSelected = $('#resources li.active').attr('data-target');
		// Apply this class, as an id, to the form.
		$('#search-main form').attr('id', searchSelected);
	}

});

function searchBy() {
	var optionSelected = $('#search-main select.active option:selected').val();
	if ($('#bartonplus').length) {
		if(optionSelected == 'keyword') {
			$('input.active').attr('placeholder', 'ex: carbon nanotubes');
		}
		if(optionSelected == 'title') {
			$('input.active').attr('placeholder', 'ex: freakonomics');
		}
		if(optionSelected == 'author') {
			$('input.active').attr('placeholder', 'ex: noam chomsky');
		}
	}
	if ($('#vera').length) {
		if(optionSelected == 'partial-words') {
			$('input.active').attr('placeholder', 'ex: new eng j of med');
		}
		if(optionSelected == 'title-start') {
			$('input.active').attr('placeholder', 'ex: journal of cell biology');
		}
		if(optionSelected == 'title-exact') {
			$('input.active').attr('placeholder', 'ex: web of science');
		}
	}
	if ($('#barton').length) {
		if(optionSelected == 'keyword') {
			$('input.active').attr('placeholder', 'ex: game design');
		}
		if(optionSelected == 'title-start') {
			$('input.active').attr('placeholder', 'ex: introduction to fluid mechanics');
		}
		if(optionSelected == 'author') {
			$('input.active').attr('placeholder', 'ex: shakespeare william');
		}
		if(optionSelected == 'call-number') {
			$('input.active').attr('placeholder', 'ex: ta405.t5854');
		}
	}
	if ($('#worldcat').length) {
		if(optionSelected == 'keyword') {
			$('input.active').attr('placeholder', 'ex: carbon nanotubes');
		}
		if(optionSelected == 'author') {
			$('input.active').attr('placeholder', 'ex: william shakespeare');
		}
		if(optionSelected == 'title') {
			$('input.active').attr('placeholder', 'ex: introduction to fluid mechanics');
		}
	}
	if ($('#course-reserves').length) {
		if(optionSelected == 'course-number') {
			$('input.active').attr('placeholder', 'ex: STS.320');
		}
		if(optionSelected == 'instructor') {
			$('input.active').attr('placeholder', 'ex: cohen');
		}
		if(optionSelected == 'course-name') {
			$('input.active').attr('placeholder', 'ex: introduction chemistry');
		}
	}
}

searchBy();

function searchBySwitch() {
	// Get the value of the active "search-by" option
	var optionSelected = $('#search-main select.active option:selected').val();
	console.log(optionSelected);

	// Change the value on select change
	$('#search-main select.active').change(function(){
		var optionSelected = $('#search-main select.active option:selected').val();
		console.log(optionSelected);
		searchBy();
	});

}

searchBySwitch();

function hiddenFields() {
	// Add hidden fields, necessary for BartonPlus search
	if ($('#bartonplus').length) {
		$('#bartonplus')
			.append("<input name='direct' value='true' type='hidden'>")
			.append("<input name='scope' value='site' type='hidden'>")
			.append("<input name='site' value='eds-live' type='hidden'>")
			.append("<input name='authtype' value='ip,guest' type='hidden'>")
			.append("<input name='custid' value='s8978330' type='hidden'>")
			.append("<input name='profile' value='eds' type='hidden'>")
			.append("<input name='groupid' value='main' type='hidden'>")
			.append('<input name="bquery" value="" type="hidden">');
	}
	// Vera
	if($('#vera').length) {
		$('#vera')
		.append("<input type='hidden' name='param_perform_save' value='searchTitle' />")
		.append("<input type='hidden' name='param_chinese_checkbox_save' value='0' />")
		.append("<input type='hidden' name='param_type_save' value='textSearch' />")
		.append("<input type='hidden' name='param_type_value' value='textSearch' />")
		.append("<input type='hidden' name='param_jumpToPage_value' value='' />")
		.append("<input type='hidden' name='param_services2filter_save' value='getAbstract' />")
		.append("<input type='hidden' name='param_services2filter_save' value='getFullTxt' />");
	}
	// Worldcat
	if($('#worldcat'.length)) {
		$('#worldcat')
			.append("<input type='hidden' name='qt' value='wc_org_mit'/>")
			.append("<input type='hidden' name='qt' value='affiliate'/>");
	}
	// Site Search
	if($('#site-search').length) {
		$('#site-search')
			.append('<input type="hidden" name="cx" value="016240528703941589557:i7wrbu9cdxu" />')
			.append('<input type="hidden" name="ie" value="UTF-8" />');
	}
}

$('#search-main').on('click', '#resources', function(event){
	// Hide all inputs on option change
	$('#search-main input').removeClass('active');
	// Get the value of the selected option...
	var resourceOption = $('#resources li.active').attr('data-option');
	// ...and show the corresponding input
	$('#search-main input.'+resourceOption).addClass('active');
	// Repeat for keyword selects
	$('.keywords').parent().removeClass('active');
	$('.keywords').removeClass('active');
	$('#search-main .keywords.'+resourceOption).addClass('active');
	$('#search-main .keywords.'+resourceOption).parent().addClass('active');
	// Trigger option-change (better to use callback function?)
	$(this).trigger('option-change');
	// Advanced search
	var searchSelected = $('#resources li.active').attr('data-target');
	$('#search-main a.search-advanced').removeClass('active');
	$('#search-main a.search-advanced.'+searchSelected).addClass('active');

});

// Run searchBy on option-change event
$('#search-main').on('option-change', function(){
	searchBySwitch();
	searchBy();
})

// Close the faux select menu when clicking outside it 
$(document).on('click', function(event){
	if(!$('#resources.active').has(event.target).length == 0) {
		return;
	}
	else {
		$('#resources').removeClass('active');
		$('#search-main .selected').removeClass('active').text('');
	}
});


$('#search-main form').on('submit', function(){
	// Get the query entered...
	var searchQuery = $('input.active', this).val();
	if (searchQuery == '') {
		// Show alert if no search term is entered
		alert('Please enter a search term.');
		// Is this proper?
		return false;
	}
	else {
		// Barton...
		if ($('#bartonplus').length) {
			// Set the correct action for the BartonPlus form
			$('#bartonplus').attr('action', 'http://search.ebscohost.com/login.aspx');
			// Add hidden fields
			hiddenFields();
			// Add search query to the bquery value, which sends it along to EDS
			$('input[name="bquery"]', this).val(searchQuery);
			}
		// Vera...
		if ($('#vera').length) {
			// Vera actions
			$('#vera')
				.attr('action', 'http://owens.mit.edu/sfx_local/az/mit_all')
				.attr('name', 'az_user_form')
				.attr('method', 'get')
				.attr('accept-charset', 'UTF-8')
				.attr('id', 'verasearch')
				.addClass('searchform');
			// Add hidden fields
			hiddenFields();
			// Add the query val
			$('input', this)
				.attr('name','param_pattern_value')
				.attr('id','param_pattern_value')
				.addClass('searchtext')
				.val(searchQuery);
		}
		// Barton
		if($('#barton').length) {
			
			$('#barton')
			.addClass('searchform')
			.attr('action', 'http://library.mit.edu/F/')
			.attr('name', 'booksearch')
			.attr('method', 'get');

			// Add hidden fields
			hiddenFields();

			$('input.active', this)
				.attr('type', 'text')
				.attr('id', 'bookrequest')
				.addClass('searchtext')
				.val(searchQuery);
		}
		// Worldcat
		if($('#worldcat').length) {
			$(this).attr('action', 'http://mit.worldcat.org/search');
			// Add hidden fields
			hiddenFields();
			$('input.active', this)
				.attr("name","q")
				.val(searchQuery);
		}
		// Site Search
		if($('#site-search').length) {
			$(this)
				.attr('action', 'http://www.google.com/cse');
			hiddenFields();
			$('input.active', this)
				.attr('name', 'q')
				.val(searchQuery);
			$('button', this)
				.attr('name', 'sa')
				.attr('value', 'Search');
		}
	}
});

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
	
	$.getJSON('/wp-content/themes/libraries/hours.json')
		.done(function(data) {
			// Empty array for library hours
			var libHrsArr = [];
			// Run the loop again
			for (var i = 0; i < locs; i++) {
				// Each library
				var libs = data[libArr[i]];
				// Each library's hours, today
				var libHrsToday = libs.hours[thisDay];
				// Add these values to the array
				libHrsArr.push(libHrsToday);
			};
			// Append each value to a location, shifting off each object as it is used
			$('.hours-locations a.location .hours').each(function(){
				$(this).append(libHrsArr[0]+' <span class="today">today</today>');
				libHrsArr.shift();
			});
			// Add a comma if 24/7 space
			$('.hours-locations a.location').has('.special').each(function(){
				$('.today', this).append(',');
			})

		})
		.fail(function(textStatus, error) {
			// Show link to /hours if Ajax request fails
			$('.hours-locations a.location .hours').each(function(){
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
	console.log('success');
});

//
// News
//

$.getJSON('/news/wp-json/posts')
	.done(function(data){
		var newsItem1 = data[0];
		var newsItem2 = data[1];
		var item1Cat = newsItem1.type;
		var item2Cat = newsItem2.type;
		// Check the Post Type
		if (item1Cat == 'post') {
			// Append the the Post Type
			$('.item-1 .category-post').text('News');
			// Append the post title, trigger an event
			$('.item-1 h3').append(newsItem1.title).trigger('newsLoaded1');
			// Get the image attached to the post
			var newsImage1 = '/news/files/'+newsItem1.featured_image.attachment_meta.file;
			// Set the image as a background
			$('.item-1 .image').css('background-image', 'url('+newsImage1+')');
		}
		// Check the Post Type
		if (item2Cat == 'post') {
			// Append the the Post Type
			$('.item-2 .category-post').text('News');
			// Append the post title, trigger an event
			$('.item-2 h3').append(newsItem2.title).trigger('newsLoaded2');
			// Get the image attached to the post
			var newsImage2 = '/news/files/'+newsItem2.featured_image.attachment_meta.file;
			// Set the image as a background
			$('.item-2 .image').css('background-image', 'url('+newsImage2+')');
		}	
	})
	.fail(function(){
		$('.news-events > .flex-container')
			.append('<div class="error-load">MIT Libraries News is currently unavailable.</div>')
			$('.item-1').hide();
			$('.item-2').hide();
	});
	$('.item-1').on('newsLoaded1', function(){
		$('.item-1 .spinner').hide();
	});
	$('.item-2').on('newsLoaded2', function(){
		$('.item-2 .spinner').hide();
	});

//
// Experts
//

$.getJSON('/wp-json/posts?type=experts')
	.done(function(data){
		// Count the objects
		var dataLength = data.length;
		var arr = [];
		while(arr.length < 4){
		  var randomNumber=Math.ceil(Math.random()*dataLength);
		  var found=false;
		  for(var i=0;i<arr.length;i++){
		    if(arr[i]==randomNumber){
		    	found=true;
		    	break;
		    }
		  }
		  if(!found)arr[arr.length]=randomNumber;
		}
		var expertName1 = data[arr[0]].title;
		var expertName2 = data[arr[1]].title;
		var expertName3 = data[arr[2]].title;
		var expertName4 = data[arr[3]].title;

		var expertPhoto1 = data[arr[0]].featured_image.guid;
		var expertPhoto2 = data[arr[1]].featured_image.guid;
		var expertPhoto3 = data[arr[2]].featured_image.guid;
		var expertPhoto4 = data[arr[3]].featured_image.guid;

		// Append expert image only if JSON request successful
		$('.expert').append('<img class="expert-photo">');
		// Append empty spans for expert names
		$('.expert').append('<span class="name"></span>');
		// Append empty spans for expert titles
		$('.expert').append('<span class="title-job"></span>');
		// Add expert name to appropriate span
		$('.expert .name:eq(0)').text(expertName1);
		$('.expert .name:eq(1)').text(expertName2);
		$('.expert .name:eq(2)').text(expertName3);
		$('.expert .name:eq(3)').text(expertName4);
		// Add image URL to src attribute
		$('.expert .expert-photo:eq(0)').attr('src', expertPhoto1);
		$('.expert .expert-photo:eq(1)').attr('src', expertPhoto2);
		$('.expert .expert-photo:eq(2)').attr('src', expertPhoto3);
		$('.expert .expert-photo:eq(3)').attr('src', expertPhoto4);
		// Add the expert count to the "All Experts" button
		$('.view-experts .count').text(dataLength);
	});