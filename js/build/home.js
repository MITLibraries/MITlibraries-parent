// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());
function oldIESearch() {
	// Old IE class
	var oldIE = $('html').hasClass('lte-ie9');
	// Check for old IE
	if (oldIE) {
		// Remove ul#resources and div.selected
		$('#resources, .wrap-select--resources .selected').remove();
		// Append a select menu
		$('.wrap-select--resources').append('<select id="resources-select"></select');
		// New select menu options
		$('#resources-select')
			.append('<option value="option-1">Articles, e-books, &amp; more</option>')
			.append('<option value="option-2">E-Journals &amp; databases</option>')
			.append('<option value="option-3">Books &amp; more at MIT</option>')
			.append('<option value="option-4">Books &amp; more worldwide</option>')
			.append('<option value="option-5">Course Reserves</option>')
			.append('<option value="option-6">Site Search</option>');
		$('#resources-select').change(function(){
			// Hide all forms on option change
			$('#search-main form').removeClass('input-submit active');
			// Hide all inputs on option change
			$('#search-main input').removeClass('active');
			// Get the selected val...
			var selectedVal = $('#resources-select option:selected').val();
			// ...and show the corresponding form
			$('#search-main input.'+selectedVal).parent().addClass('active input-submit');
			// ...and active input
			$('#search-main input.'+selectedVal).addClass('active');
			// Repeat for keyword selects
			$('.keywords').parent().removeClass('active');
			$('.keywords').removeClass('active');
			$('#search-main .keywords.'+selectedVal).addClass('active');
			$('#search-main .keywords.'+selectedVal).parent().addClass('active');
			// Trigger option-change (better to use callback function?)
			//$(this).trigger('option-change');
			// Advanced search
			var searchSelected = $('#resources li.active').attr('data-target');
			$('#search-main a.search-advanced').removeClass('active');
			$('#search-main a.search-advanced.'+searchSelected).addClass('active');
		});
	}
	else {
		return;
	}
}
// Run
$(function(){
	oldIESearch();
});
//
// Search
//

$(function(){

	// This saves the current search UI state to localstorage as the form is
	// submitted, allowing the patron's next visit to start from this point
	function saveFormState() {
		"use strict";

		var options = {};
		var searchTool = '';

		if (Modernizr.localstorage) {
			searchTool = readToolState();
			options.tool = searchTool.tool;
			options.refine = readRefineState();
			localStorage.setItem('tool',options.tool);
			localStorage.setItem('refine',options.refine);
		}
	}

	// This looks for a previously-saved search UI state from the patron's
	// last visit. If found, this will be used as the starting point for this
	// session.
	function loadFormState() {
		"use strict";

		// initial/default values
		var formState = {};
		formState.status = 'unsupported';
		formState.tool = 'bartonplus';
		formState.refine = '';

		// If localstorage is supportd, look for saved search
		if (Modernizr.localstorage) {
			if (localStorage.getItem('tool') !== null) {
				formState.status = 'return visit';
				formState.tool = localStorage.getItem('tool');
				formState.refine = localStorage.getItem('refine');
			} else {
				formState.status = 'first visit';
			}
		}

		// read option number - this probably needs to be refactored
		formState.resource = $("#resources").children("."+formState.tool).attr('data-option');

		return formState;
	}

	// Mimic a <select> element with a <ul>
	$('#resources').on('click', 'li', function(event) {
		// All available resources	
		var resourcesAll = $('#resources li');
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
			// Show this text above the dropdown (when active), along with select arrows SVG, mimicing a <select>
			if ($('#resources').hasClass('active')) {
				// Open
				$('.wrap-select--resources .selected').text(selectedText).append('<svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="8.071px" height="14px" viewBox="0 0 8.071 14" enable-background="new 0 0 8.071 14" xml:space="preserve" class="select-arrows"><path d="M0.069 8.74c0.08-0.159 0.252-0.264 0.436-0.274 0.023 0 1.743-0.104 3.531-0.104s3.508 0.104 3.53 0.104C7.751 8.476 7.911 8.581 8.003 8.74c0.092 0.161 0.092 0.356 0 0.517 -1.364 2.431-3.508 4.517-3.6 4.598 -0.206 0.194-0.528 0.194-0.734 0 -0.091-0.081-2.235-2.167-3.6-4.598C-0.023 9.096-0.023 8.901 0.069 8.74M8.003 5.259c-0.08 0.16-0.252 0.264-0.437 0.275 -0.022 0-1.742 0.103-3.53 0.103S0.528 5.535 0.505 5.535C0.321 5.523 0.161 5.419 0.069 5.259c-0.092-0.161-0.092-0.355 0-0.516 1.365-2.431 3.508-4.517 3.6-4.598 0.206-0.194 0.528-0.194 0.734 0 0.092 0.081 2.235 2.167 3.6 4.598C8.095 4.904 8.095 5.099 8.003 5.259"></path></svg>').addClass('active');
			}
			// Remove the text when the dropdown is closed
			else {
				// Closed
				$('.wrap-select--resources .selected').text('').removeClass('active');
				// Remove any input text
				$('#search-main input').val('');
				$(this).trigger('search-change');
			}
			// // Get the class of the selected resource
			// var searchSelected = $('#resources li.active').attr('data-target');
			// // Apply this class, as an id, to the form.
			// $('#search-main form').attr('id', searchSelected);
		}
	});

	// Close the faux select menu when clicking outside it 
	$(document).on('click', function(event){
		if(!$('#resources.active').has(event.target).length == 0) {
			return;
		}
		else {
			$('#resources').removeClass('active');
			$('#search-main .selected').removeClass('active').text('');
		}
		searchBySwitch();
	});
	
	// Placeholder text changes
	function searchBy() {
		var optionSelected = $('#search-main select.active option:selected').val();
		if ($('#bartonplus.active').length) {
			if(optionSelected == '') {
				$('input.active').attr('placeholder', 'ex: carbon nanotubes');
			}
			if(optionSelected == 'TI ') {
				$('input.active').attr('placeholder', 'ex: freakonomics');
			}
			if(optionSelected == 'AU ') {
				$('input.active').attr('placeholder', 'ex: noam chomsky');
			}
		}
		if ($('#vera.active').length) {
			if(optionSelected == 'contains') {
				$('input.active').attr('placeholder', 'ex: new eng j of med');
			}
			if(optionSelected == 'startsWith') {
				$('input.active').attr('placeholder', 'ex: journal of cell biology');
			}
			if(optionSelected == 'exactMatch') {
				$('input.active').attr('placeholder', 'ex: web of science');
			}
		}
		if ($('#barton.active').length) {
			if(optionSelected == 'find_WRD') {
				$('input.active').attr('placeholder', 'ex: game design');
			}
			if(optionSelected == 'scan_TTL') {
				$('input.active').attr('placeholder', 'ex: introduction to fluid mechanics');
			}
			if(optionSelected == 'scan_AUT') {
				$('input.active').attr('placeholder', 'ex: shakespeare william');
			}
			if(optionSelected == 'scan_CND') {
				$('input.active').attr('placeholder', 'ex: ta405.t5854');
			}
		}
		if ($('#worldcat.active').length) {
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
		if ($('#course-reserves.active').length) {
			if(optionSelected == 'scan_CNB') {
				$('input.active').attr('placeholder', 'ex: 21F.108');
			}
			if(optionSelected == 'find_WIN') {
				$('input.active').attr('placeholder', 'ex: cohen');
			}
			if(optionSelected == 'find_WOU') {
				$('input.active').attr('placeholder', 'ex: introduction chemistry');
			}
		}
	}

	function searchBySwitch() {
		// Get the value of the active "search-by" option
		var optionSelected = $('#search-main select.active option:selected').val();
		// Change the value on select change
		$('#search-main select.active').change(function(){
			var optionSelected = $('#search-main select.active option:selected').val();
			searchBy();
			// Remove any input text
			//$('#search-main input').val('');
		});

	}

	// Handles hidden fields
	function hiddenFields() {
		// Get the value of the "search by" select element
		var selectVal = $('#search-main select.active').val();
		// Remove any hidden fileds
		$('#search-main form .hidden-fields').html('');
		// Add hidden fields, respective of search selected
		if ($('#bartonplus.active').length) {
			$('#bartonplus .hidden-fields')
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
		if($('#vera.active').length) {
			$('#vera .hidden-fields')
				.append("<input type='hidden' name='param_perform_save' value='searchTitle' />")
				.append("<input type='hidden' name='param_chinese_checkbox_save' value='0' />")
				.append("<input type='hidden' name='param_type_save' value='textSearch' />")
				.append("<input type='hidden' name='param_type_value' value='textSearch' />")
				.append("<input type='hidden' name='param_jumpToPage_value' value='' />")
				.append("<input type='hidden' name='param_services2filter_save' value='getAbstract' />")
				.append("<input type='hidden' name='param_services2filter_save' value='getFullTxt' />");
			// Check the select val...
			if (selectVal == 'contains') {
				// and append a radio input to the form
				$('#vera').append('<input type="radio" name="param_textSearchType_value" id="contains" value="contains" checked="checked" class="radio" />');
			}
			if (selectVal == 'startsWith') {
				$('#vera').append('<input type="radio" name="param_textSearchType_value" id="startsWith" value="startsWith" class="radio" checked="checked" />');
			}
			if (selectVal == 'exactMatch') {
				$('#vera').append('<input type="radio" name="param_textSearchType_value" id="exactMatch" value="exactMatch" class="radio" checked="checked" />');
			}
		}
		if($('#barton.active').length) {
			$('#barton').append("<input type='hidden' name='func' value='scan'/>");
			// Keyword search
			if (selectVal == 'find_WRD') {
				$('#barton').append('<input type="radio" name="code" id="bartonkeyword" value="find_WRD" checked="checked" class="radio" />');
			}
			// Title search
			if (selectVal == 'scan_TTL') {
				$('#barton').append('<input type="radio" name="code" id="bartontitle" value="scan_TTL" class="radio" checked="checked" />');
			}
			// Author search
			if (selectVal == 'scan_AUT') {
				$('#barton').append('<input type="radio" name="code" id="bartonauthor" value="scan_AUT" class="radio" checked="checked" />');
			}
			// Call number search
			if (selectVal == 'scan_CND') {
				$('#barton').append('<input type="radio" name="code" id="bartoncallnumber" value="scan_CND" class="radio" checked="checked" />');
			}
		}
		// Worldcat
		if($('#worldcat.active').length) {
			$('#worldcat .hidden-fields')
				.append("<input type='hidden' name='qt' value='wc_org_mit'/>")
				.append("<input type='hidden' name='qt' value='affiliate'/>");
		}
		// Course reserves
		if($('#course-reserves.active').length) {
			$('#course-reserves .hidden-fields')
				.append("<input type='hidden' name='func' value=''/>");
			// Course number search
			if(selectVal == 'scan_CNB') {
				$('#course-reserves').append('<input name="code" id="coursenumber" value="scan_CNB" checked="checked" type="radio" class="radio" />');
			}
			// Instructor keyword search
			if(selectVal == 'find_WIN') {
				$('#course-reserves').append('<input name="code" id="instructorkeyword" value="find_WIN" type="radio" class="radio" checked="checked" />');
			}
			if(selectVal == 'find_WOU') {
				$('#course-reserves').append('<input name="code" id="coursenamekeyword" value="find_WOU" type="radio" class="radio" checked="checked" />');
			}
		}
		// Site Search
		if($('#site-search.active').length) {
			$('#site-search .hidden-fields')
				.append('<input type="hidden" name="cx" value="016240528703941589557:i7wrbu9cdxu" />')
				.append('<input type="hidden" name="ie" value="UTF-8" />');
		}
	}

	// This is the initial setup of the search UI, along the lines of what was loaded from localstorage
	function initSearchUI(state) {
		resetSearchUI();

		// Faked select box
		$('#resources li').removeClass('active');
		// Refine select
		$('#search-main .keywords.'+state.tool).val(state.refine);

		setSearchState(state);

		searchBy();

		return state;
	}

	// This reads the current search UI state (from markup), and logs it to the console.
	// Used only for debugging
	function logSearchState() {
		"use strict"
		var tempState = {};
		tempState = readToolState();
		tempState.refine = readRefineState();
	}

	function resetSearchUI() {
		// Hide all forms on option change
		$('#search-main form').removeClass('input-submit active');
		// Hide all inputs on option change
		$('#search-main input').removeClass('active');
		// Repeat for keyword selects
		$('.keywords').parent().removeClass('active');
		$('.keywords').removeClass('active');
		$('#search-main a.search-advanced').removeClass('active');
	}

	function readToolState() {
		// This looks at the faked selection UI, #resources, and reports back what is active 
		var state = {};
		// Get the value of the selected option...
		state.resource = $('#resources li.active').attr('data-option');
		// Advanced search
		// toolname - was .search
		state.tool = $('#resources li.active').attr('data-target');
		return state;
	}

	function readRefineState() {
		return $('#search-main select.active option:selected').val();
	}

	// This adds 'active' classes on the three relevant parts of the search
	// interface: tool, refine, and advanced search link. The placeholder text
	// is changed after this function
	function setSearchState(state) {
		// Faked select box
		$('#resources li.'+state.tool).addClass('active');
		// Tool
		$('#search-main input.'+state.tool).parent().addClass('active input-submit');
		$('#search-main input.'+state.tool).addClass('active');
		// Refine
		$('#search-main .keywords.'+state.tool).addClass('active');
		$('#search-main .keywords.'+state.tool).parent().addClass('active');
		// Advanced search
		$('#search-main a.search-advanced.'+state.tool).addClass('active');

		// Trigger option-change (better to use callback function?)
		// $(this).trigger('option-change');
		searchBySwitch();
		return state;
	}

	function updateSearchUI() {
		resetSearchUI();

		state = readToolState();

		setSearchState(state);
	}

	// Handles the toggling of forms
	$('#search-main').on('click', '#resources', function(event){
		updateSearchUI();
	});

	// Run searchBy on option-change event
	$('#search-main').on('option-change', function(){
		searchBySwitch();
		searchBy();
	});

	// On form submit
	$('#search-main form').on('submit', function(){
		saveFormState();
		// Remove added inputs
		$('#search-main input[type="hidden"], #search-main input[type="radio"]').remove();
		// Get the query entered...
		var searchQuery = $('input.active', this).val();
		if (searchQuery == '') {
			// Show alert if no search term is entered
			alert('Please enter a search term.');
			// Is this proper?
			return false;
		}
		else {
		// Get the value of the "search by" select element
		var selectVal = $('#search-main select.active').val();
		var splitOptions = '';
			// Barton...
			if ($('#bartonplus.active').length) {
				// Set the correct action for the BartonPlus form
				$('#bartonplus')
					.attr('action', 'https://search.ebscohost.com/login.aspx')
					.attr('method', 'get')
					.attr('target', '_top');
				// Add hidden fields
				hiddenFields();
				// Add search query to the bquery value, along with the select val, which sends it along to EDS
				$('input[name="bquery"]', this).val((selectVal+searchQuery).replace(/"/g, '&quot;'));
			}
			// Vera...
			if ($('#vera.active').length) {
				// Vera actions
				$('#vera')
					.attr('action', 'https://owens.mit.edu/sfx_local/az/mit_all')
					.attr('name', 'az_user_form')
					.attr('method', 'get')
					.attr('accept-charset', 'UTF-8')
					.addClass('searchform');
				// Add hidden fields
				hiddenFields();
				// Add the query val
				$('input.active', this)
					.attr('name','param_pattern_value')
					.attr('id','param_pattern_value')
					.addClass('searchtext')
					.val(searchQuery);
			}
			// Barton
			if($('#barton.active').length) {
				// Split the query
				splitOptions = selectVal.split('_');
				$('#barton')
					.addClass('searchform')
					.attr('action', 'https://library.mit.edu/F/')
					.attr('name', 'booksearch')
					.attr('method', 'get');

				// Add hidden fields
				hiddenFields();
				$('input.active', this)
					.attr('name', 'request')
					.attr('type', 'text')
					.attr('id', 'bookrequest')
					.val(searchQuery);
				// Set the val of the checked option
				$('#barton input[name = "code"]:checked').val(splitOptions[1]);
				// What is F8?
				if ( splitOptions[0] == "find" || splitOptions[0] == "F8" ) {
					$("#barton .hidden-fields").append("<input type='hidden' name='func' value='find-b'/>");
					$("#barton input[name = 'code']").attr("name","find_code");
				}
				else {
					$("#barton .hidden-fields").append("<input type='hidden' name='func' value='scan'/>");
					$("#barton input[name = 'code']").attr("name","scan_code");
					$("#barton input.searchtext").attr("name","scan_start");
				}
			}
			// Worldcat
			if($('#worldcat.active').length) {
				$(this).attr('action', 'https://mit.worldcat.org/search');
				// Add hidden fields
				hiddenFields();
				$('input.active', this).attr('method','get');
				if (selectVal == 'keyword') {
					$('input.active', this)
						.attr("name","q")
						.val(searchQuery);
				}
				if (selectVal == 'author') {
					searchQuery = 'au:'+$('input.active', this).val();
					$('#worldcat.active').append('<input type="hidden" name="q" value="'+searchQuery+'" />');
				}
				if (selectVal == 'title') {
					searchQuery = 'ti:'+$('input.active', this).val();
					$('#worldcat.active').append('<input type="hidden" name="q" value="'+searchQuery+'" />');
				}
			}
			// Course Reserves
			if($('#course-reserves.active').length) {
				$('#course-reserves')
					.addClass('searchform')
					.addClass('barton')
					.attr('action', 'https://library.mit.edu/F/')
					.attr('method', 'get')
					.attr('name', 'getInfo');
				$('input.active', this)
					.attr('name', 'request')
					.val(searchQuery);
				// Add hidden fields
				hiddenFields();
				// Split the query
				splitOptions = selectVal.split('_');
				$("#course-reserves input[name = 'code']:checked").val(splitOptions[1]);
				$("#course-reserves .hidden-fields").append("<input type='hidden' name='local_base' value='u-mit30'/>");
				if (splitOptions[0] == "find") {	
					$("#course-reserves .hidden-fields input[name = 'func']").val("find-b");
					$("#course-reserves input[name = 'code']").attr("name","find_code");
				} else {
					$("#course-reserves .hidden-fields input[name = 'func']").val("scan");
					$("#course-reserves input[name = 'code']").attr("name","scan_code");
					$("#course-reserves input[name = 'request']").attr("name","scan_start");
				};
			}
			// Site Search
			if($('#site-search.active').length) {
				$(this)
					.attr('action', 'https://www.google.com/cse');
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

    // load previous search state
    var searchFormState = loadFormState();

    // reset search UI
    initSearchUI(searchFormState);

});
// Detect keyboard navigation to setup pseudo classes for focus to allow for
// only setting focus for keyboard nav
// https://medium.com/hackernoon/removing-that-ugly-focus-ring-and-keeping-it-too-6c8727fefcd2
// This works in conjunction with adding a focus element for .main-nav-link
// if this `user-is-tabbing` exists on body.
function handleFirstTab(e) {
    if (e.keyCode === 9) { // the "I am a keyboard user" key
        document.body.classList.add('user-is-tabbing');
        window.removeEventListener('keydown', handleFirstTab);
    }
  } 
window.addEventListener('keydown', handleFirstTab);

// Toggle hamburger menu on mobile displays.
$('header .menu--toggle').click(function(){
    // This toggles the aria-hidden value on the mobile menu.
    $("#nav-mobile").attr("aria-hidden", function (i, attr) {
        return (
            "true" === attr ? "false" : "true"
        );
    })
    // These toggle the CSS classes controlling mobile menu visibility.
    $("#nav-mobile").toggleClass('active');
    $('.wrap-page').toggleClass('mobile-nav-active');

    // toggle link visibility (important to keep them out of tabindex until needed)
    $(".mobile-nav-link").toggleClass('hide-mobile-nav-link');
    $(".mobile-nav-link").toggleClass('main-nav-link');
});

// Show or hide the flyout menus on main navigation in response to
// mouseenter / mouseleave
$( '.link-primary' ).bind( "mouseenter", function() {
    $( '.link-primary' ).removeClass( 'open' );
    $(this).find( '.menu-control' ).attr( 'aria-expanded', 'true' );
    $(this).closest( '.link-primary' ).addClass( 'open' );
});
$( '.link-primary' ).bind( "mouseleave", function() {
    $(this).find( '.menu-control' ).attr( 'aria-expanded', 'false' );
    $( '.link-primary' ).removeClass( 'open' );
});

// Make ESC close all menus.
$(document).keyup(function(e) {
    if (e.keyCode === 27) {
        // Close all desktop menu flyouts
        $( '.link-primary' ).removeClass( 'open' );
        $( '.menu-control' ).attr('aria-expanded', 'false');
        $( '.links-sub' ).attr( 'aria-hidden', 'true' );

        // Close mobile menu
        $("#nav-mobile").removeClass('active');
        $('.wrap-page').removeClass('mobile-nav-active');
        $(".mobile-nav-link").addClass('hide-mobile-nav-link');
        $(".mobile-nav-link").removeClass('main-nav-link');
    }
});

// This initializes the ARIA labels for the main navigation.
// thanks to http://heydonworks.com/practical_aria_examples/
$('.main-nav-header').each(function() {

    var $this = $(this);

    // create unique id for a11y relationship
    var id = 'collapsible-' + $( '#nav-main h2' ).index(this);

    // identify panel and make it focusable
    var panel = $(this).next( '.links-sub' ).attr( 'aria-hidden', 'true' ).attr( 'id', id);

    // Add default aria states to button
    $this.children( '.menu-control' ).attr( 'aria-expanded', 'false' ).attr( 'aria-controls', id);
    var button = $this.children( '.menu-control' );

    // Toggle the state properties
    button.on( 'click', function() {

        // first close any currently open flyouts
        $( '.link-primary' ).removeClass( 'open' );
        $( '.menu-control' ).attr('aria-expanded', 'false');
        $( '.links-sub' ).attr( 'aria-hidden', 'true' );

        // now open the appropriate flyout
        $(this).closest( '.link-primary' ).toggleClass( 'open' );
        var state = $(this).attr( 'aria-expanded' ) === 'false' ? true : false;
        $(this).attr( 'aria-expanded', state );
        panel.attr( 'aria-hidden', !state );
    });

});

$(function(){
   $.getScript('//v2.libanswers.com/load_chat.php?hash=be2c654b63dd43f31c56295ee5d78d88');
});

//! moment.js
//! version : 2.8.3
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com
(function(a){function b(a,b,c){switch(arguments.length){case 2:return null!=a?a:b;case 3:return null!=a?a:null!=b?b:c;default:throw new Error("Implement me")}}function c(a,b){return zb.call(a,b)}function d(){return{empty:!1,unusedTokens:[],unusedInput:[],overflow:-2,charsLeftOver:0,nullInput:!1,invalidMonth:null,invalidFormat:!1,userInvalidated:!1,iso:!1}}function e(a){tb.suppressDeprecationWarnings===!1&&"undefined"!=typeof console&&console.warn&&console.warn("Deprecation warning: "+a)}function f(a,b){var c=!0;return m(function(){return c&&(e(a),c=!1),b.apply(this,arguments)},b)}function g(a,b){qc[a]||(e(b),qc[a]=!0)}function h(a,b){return function(c){return p(a.call(this,c),b)}}function i(a,b){return function(c){return this.localeData().ordinal(a.call(this,c),b)}}function j(){}function k(a,b){b!==!1&&F(a),n(this,a),this._d=new Date(+a._d)}function l(a){var b=y(a),c=b.year||0,d=b.quarter||0,e=b.month||0,f=b.week||0,g=b.day||0,h=b.hour||0,i=b.minute||0,j=b.second||0,k=b.millisecond||0;this._milliseconds=+k+1e3*j+6e4*i+36e5*h,this._days=+g+7*f,this._months=+e+3*d+12*c,this._data={},this._locale=tb.localeData(),this._bubble()}function m(a,b){for(var d in b)c(b,d)&&(a[d]=b[d]);return c(b,"toString")&&(a.toString=b.toString),c(b,"valueOf")&&(a.valueOf=b.valueOf),a}function n(a,b){var c,d,e;if("undefined"!=typeof b._isAMomentObject&&(a._isAMomentObject=b._isAMomentObject),"undefined"!=typeof b._i&&(a._i=b._i),"undefined"!=typeof b._f&&(a._f=b._f),"undefined"!=typeof b._l&&(a._l=b._l),"undefined"!=typeof b._strict&&(a._strict=b._strict),"undefined"!=typeof b._tzm&&(a._tzm=b._tzm),"undefined"!=typeof b._isUTC&&(a._isUTC=b._isUTC),"undefined"!=typeof b._offset&&(a._offset=b._offset),"undefined"!=typeof b._pf&&(a._pf=b._pf),"undefined"!=typeof b._locale&&(a._locale=b._locale),Ib.length>0)for(c in Ib)d=Ib[c],e=b[d],"undefined"!=typeof e&&(a[d]=e);return a}function o(a){return 0>a?Math.ceil(a):Math.floor(a)}function p(a,b,c){for(var d=""+Math.abs(a),e=a>=0;d.length<b;)d="0"+d;return(e?c?"+":"":"-")+d}function q(a,b){var c={milliseconds:0,months:0};return c.months=b.month()-a.month()+12*(b.year()-a.year()),a.clone().add(c.months,"M").isAfter(b)&&--c.months,c.milliseconds=+b-+a.clone().add(c.months,"M"),c}function r(a,b){var c;return b=K(b,a),a.isBefore(b)?c=q(a,b):(c=q(b,a),c.milliseconds=-c.milliseconds,c.months=-c.months),c}function s(a,b){return function(c,d){var e,f;return null===d||isNaN(+d)||(g(b,"moment()."+b+"(period, number) is deprecated. Please use moment()."+b+"(number, period)."),f=c,c=d,d=f),c="string"==typeof c?+c:c,e=tb.duration(c,d),t(this,e,a),this}}function t(a,b,c,d){var e=b._milliseconds,f=b._days,g=b._months;d=null==d?!0:d,e&&a._d.setTime(+a._d+e*c),f&&nb(a,"Date",mb(a,"Date")+f*c),g&&lb(a,mb(a,"Month")+g*c),d&&tb.updateOffset(a,f||g)}function u(a){return"[object Array]"===Object.prototype.toString.call(a)}function v(a){return"[object Date]"===Object.prototype.toString.call(a)||a instanceof Date}function w(a,b,c){var d,e=Math.min(a.length,b.length),f=Math.abs(a.length-b.length),g=0;for(d=0;e>d;d++)(c&&a[d]!==b[d]||!c&&A(a[d])!==A(b[d]))&&g++;return g+f}function x(a){if(a){var b=a.toLowerCase().replace(/(.)s$/,"$1");a=jc[a]||kc[b]||b}return a}function y(a){var b,d,e={};for(d in a)c(a,d)&&(b=x(d),b&&(e[b]=a[d]));return e}function z(b){var c,d;if(0===b.indexOf("week"))c=7,d="day";else{if(0!==b.indexOf("month"))return;c=12,d="month"}tb[b]=function(e,f){var g,h,i=tb._locale[b],j=[];if("number"==typeof e&&(f=e,e=a),h=function(a){var b=tb().utc().set(d,a);return i.call(tb._locale,b,e||"")},null!=f)return h(f);for(g=0;c>g;g++)j.push(h(g));return j}}function A(a){var b=+a,c=0;return 0!==b&&isFinite(b)&&(c=b>=0?Math.floor(b):Math.ceil(b)),c}function B(a,b){return new Date(Date.UTC(a,b+1,0)).getUTCDate()}function C(a,b,c){return hb(tb([a,11,31+b-c]),b,c).week}function D(a){return E(a)?366:365}function E(a){return a%4===0&&a%100!==0||a%400===0}function F(a){var b;a._a&&-2===a._pf.overflow&&(b=a._a[Bb]<0||a._a[Bb]>11?Bb:a._a[Cb]<1||a._a[Cb]>B(a._a[Ab],a._a[Bb])?Cb:a._a[Db]<0||a._a[Db]>23?Db:a._a[Eb]<0||a._a[Eb]>59?Eb:a._a[Fb]<0||a._a[Fb]>59?Fb:a._a[Gb]<0||a._a[Gb]>999?Gb:-1,a._pf._overflowDayOfYear&&(Ab>b||b>Cb)&&(b=Cb),a._pf.overflow=b)}function G(a){return null==a._isValid&&(a._isValid=!isNaN(a._d.getTime())&&a._pf.overflow<0&&!a._pf.empty&&!a._pf.invalidMonth&&!a._pf.nullInput&&!a._pf.invalidFormat&&!a._pf.userInvalidated,a._strict&&(a._isValid=a._isValid&&0===a._pf.charsLeftOver&&0===a._pf.unusedTokens.length)),a._isValid}function H(a){return a?a.toLowerCase().replace("_","-"):a}function I(a){for(var b,c,d,e,f=0;f<a.length;){for(e=H(a[f]).split("-"),b=e.length,c=H(a[f+1]),c=c?c.split("-"):null;b>0;){if(d=J(e.slice(0,b).join("-")))return d;if(c&&c.length>=b&&w(e,c,!0)>=b-1)break;b--}f++}return null}function J(a){var b=null;if(!Hb[a]&&Jb)try{b=tb.locale(),require("./locale/"+a),tb.locale(b)}catch(c){}return Hb[a]}function K(a,b){return b._isUTC?tb(a).zone(b._offset||0):tb(a).local()}function L(a){return a.match(/\[[\s\S]/)?a.replace(/^\[|\]$/g,""):a.replace(/\\/g,"")}function M(a){var b,c,d=a.match(Nb);for(b=0,c=d.length;c>b;b++)d[b]=pc[d[b]]?pc[d[b]]:L(d[b]);return function(e){var f="";for(b=0;c>b;b++)f+=d[b]instanceof Function?d[b].call(e,a):d[b];return f}}function N(a,b){return a.isValid()?(b=O(b,a.localeData()),lc[b]||(lc[b]=M(b)),lc[b](a)):a.localeData().invalidDate()}function O(a,b){function c(a){return b.longDateFormat(a)||a}var d=5;for(Ob.lastIndex=0;d>=0&&Ob.test(a);)a=a.replace(Ob,c),Ob.lastIndex=0,d-=1;return a}function P(a,b){var c,d=b._strict;switch(a){case"Q":return Zb;case"DDDD":return _b;case"YYYY":case"GGGG":case"gggg":return d?ac:Rb;case"Y":case"G":case"g":return cc;case"YYYYYY":case"YYYYY":case"GGGGG":case"ggggg":return d?bc:Sb;case"S":if(d)return Zb;case"SS":if(d)return $b;case"SSS":if(d)return _b;case"DDD":return Qb;case"MMM":case"MMMM":case"dd":case"ddd":case"dddd":return Ub;case"a":case"A":return b._locale._meridiemParse;case"X":return Xb;case"Z":case"ZZ":return Vb;case"T":return Wb;case"SSSS":return Tb;case"MM":case"DD":case"YY":case"GG":case"gg":case"HH":case"hh":case"mm":case"ss":case"ww":case"WW":return d?$b:Pb;case"M":case"D":case"d":case"H":case"h":case"m":case"s":case"w":case"W":case"e":case"E":return Pb;case"Do":return Yb;default:return c=new RegExp(Y(X(a.replace("\\","")),"i"))}}function Q(a){a=a||"";var b=a.match(Vb)||[],c=b[b.length-1]||[],d=(c+"").match(hc)||["-",0,0],e=+(60*d[1])+A(d[2]);return"+"===d[0]?-e:e}function R(a,b,c){var d,e=c._a;switch(a){case"Q":null!=b&&(e[Bb]=3*(A(b)-1));break;case"M":case"MM":null!=b&&(e[Bb]=A(b)-1);break;case"MMM":case"MMMM":d=c._locale.monthsParse(b),null!=d?e[Bb]=d:c._pf.invalidMonth=b;break;case"D":case"DD":null!=b&&(e[Cb]=A(b));break;case"Do":null!=b&&(e[Cb]=A(parseInt(b,10)));break;case"DDD":case"DDDD":null!=b&&(c._dayOfYear=A(b));break;case"YY":e[Ab]=tb.parseTwoDigitYear(b);break;case"YYYY":case"YYYYY":case"YYYYYY":e[Ab]=A(b);break;case"a":case"A":c._isPm=c._locale.isPM(b);break;case"H":case"HH":case"h":case"hh":e[Db]=A(b);break;case"m":case"mm":e[Eb]=A(b);break;case"s":case"ss":e[Fb]=A(b);break;case"S":case"SS":case"SSS":case"SSSS":e[Gb]=A(1e3*("0."+b));break;case"X":c._d=new Date(1e3*parseFloat(b));break;case"Z":case"ZZ":c._useUTC=!0,c._tzm=Q(b);break;case"dd":case"ddd":case"dddd":d=c._locale.weekdaysParse(b),null!=d?(c._w=c._w||{},c._w.d=d):c._pf.invalidWeekday=b;break;case"w":case"ww":case"W":case"WW":case"d":case"e":case"E":a=a.substr(0,1);case"gggg":case"GGGG":case"GGGGG":a=a.substr(0,2),b&&(c._w=c._w||{},c._w[a]=A(b));break;case"gg":case"GG":c._w=c._w||{},c._w[a]=tb.parseTwoDigitYear(b)}}function S(a){var c,d,e,f,g,h,i;c=a._w,null!=c.GG||null!=c.W||null!=c.E?(g=1,h=4,d=b(c.GG,a._a[Ab],hb(tb(),1,4).year),e=b(c.W,1),f=b(c.E,1)):(g=a._locale._week.dow,h=a._locale._week.doy,d=b(c.gg,a._a[Ab],hb(tb(),g,h).year),e=b(c.w,1),null!=c.d?(f=c.d,g>f&&++e):f=null!=c.e?c.e+g:g),i=ib(d,e,f,h,g),a._a[Ab]=i.year,a._dayOfYear=i.dayOfYear}function T(a){var c,d,e,f,g=[];if(!a._d){for(e=V(a),a._w&&null==a._a[Cb]&&null==a._a[Bb]&&S(a),a._dayOfYear&&(f=b(a._a[Ab],e[Ab]),a._dayOfYear>D(f)&&(a._pf._overflowDayOfYear=!0),d=db(f,0,a._dayOfYear),a._a[Bb]=d.getUTCMonth(),a._a[Cb]=d.getUTCDate()),c=0;3>c&&null==a._a[c];++c)a._a[c]=g[c]=e[c];for(;7>c;c++)a._a[c]=g[c]=null==a._a[c]?2===c?1:0:a._a[c];a._d=(a._useUTC?db:cb).apply(null,g),null!=a._tzm&&a._d.setUTCMinutes(a._d.getUTCMinutes()+a._tzm)}}function U(a){var b;a._d||(b=y(a._i),a._a=[b.year,b.month,b.day,b.hour,b.minute,b.second,b.millisecond],T(a))}function V(a){var b=new Date;return a._useUTC?[b.getUTCFullYear(),b.getUTCMonth(),b.getUTCDate()]:[b.getFullYear(),b.getMonth(),b.getDate()]}function W(a){if(a._f===tb.ISO_8601)return void $(a);a._a=[],a._pf.empty=!0;var b,c,d,e,f,g=""+a._i,h=g.length,i=0;for(d=O(a._f,a._locale).match(Nb)||[],b=0;b<d.length;b++)e=d[b],c=(g.match(P(e,a))||[])[0],c&&(f=g.substr(0,g.indexOf(c)),f.length>0&&a._pf.unusedInput.push(f),g=g.slice(g.indexOf(c)+c.length),i+=c.length),pc[e]?(c?a._pf.empty=!1:a._pf.unusedTokens.push(e),R(e,c,a)):a._strict&&!c&&a._pf.unusedTokens.push(e);a._pf.charsLeftOver=h-i,g.length>0&&a._pf.unusedInput.push(g),a._isPm&&a._a[Db]<12&&(a._a[Db]+=12),a._isPm===!1&&12===a._a[Db]&&(a._a[Db]=0),T(a),F(a)}function X(a){return a.replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g,function(a,b,c,d,e){return b||c||d||e})}function Y(a){return a.replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&")}function Z(a){var b,c,e,f,g;if(0===a._f.length)return a._pf.invalidFormat=!0,void(a._d=new Date(0/0));for(f=0;f<a._f.length;f++)g=0,b=n({},a),null!=a._useUTC&&(b._useUTC=a._useUTC),b._pf=d(),b._f=a._f[f],W(b),G(b)&&(g+=b._pf.charsLeftOver,g+=10*b._pf.unusedTokens.length,b._pf.score=g,(null==e||e>g)&&(e=g,c=b));m(a,c||b)}function $(a){var b,c,d=a._i,e=dc.exec(d);if(e){for(a._pf.iso=!0,b=0,c=fc.length;c>b;b++)if(fc[b][1].exec(d)){a._f=fc[b][0]+(e[6]||" ");break}for(b=0,c=gc.length;c>b;b++)if(gc[b][1].exec(d)){a._f+=gc[b][0];break}d.match(Vb)&&(a._f+="Z"),W(a)}else a._isValid=!1}function _(a){$(a),a._isValid===!1&&(delete a._isValid,tb.createFromInputFallback(a))}function ab(a,b){var c,d=[];for(c=0;c<a.length;++c)d.push(b(a[c],c));return d}function bb(b){var c,d=b._i;d===a?b._d=new Date:v(d)?b._d=new Date(+d):null!==(c=Kb.exec(d))?b._d=new Date(+c[1]):"string"==typeof d?_(b):u(d)?(b._a=ab(d.slice(0),function(a){return parseInt(a,10)}),T(b)):"object"==typeof d?U(b):"number"==typeof d?b._d=new Date(d):tb.createFromInputFallback(b)}function cb(a,b,c,d,e,f,g){var h=new Date(a,b,c,d,e,f,g);return 1970>a&&h.setFullYear(a),h}function db(a){var b=new Date(Date.UTC.apply(null,arguments));return 1970>a&&b.setUTCFullYear(a),b}function eb(a,b){if("string"==typeof a)if(isNaN(a)){if(a=b.weekdaysParse(a),"number"!=typeof a)return null}else a=parseInt(a,10);return a}function fb(a,b,c,d,e){return e.relativeTime(b||1,!!c,a,d)}function gb(a,b,c){var d=tb.duration(a).abs(),e=yb(d.as("s")),f=yb(d.as("m")),g=yb(d.as("h")),h=yb(d.as("d")),i=yb(d.as("M")),j=yb(d.as("y")),k=e<mc.s&&["s",e]||1===f&&["m"]||f<mc.m&&["mm",f]||1===g&&["h"]||g<mc.h&&["hh",g]||1===h&&["d"]||h<mc.d&&["dd",h]||1===i&&["M"]||i<mc.M&&["MM",i]||1===j&&["y"]||["yy",j];return k[2]=b,k[3]=+a>0,k[4]=c,fb.apply({},k)}function hb(a,b,c){var d,e=c-b,f=c-a.day();return f>e&&(f-=7),e-7>f&&(f+=7),d=tb(a).add(f,"d"),{week:Math.ceil(d.dayOfYear()/7),year:d.year()}}function ib(a,b,c,d,e){var f,g,h=db(a,0,1).getUTCDay();return h=0===h?7:h,c=null!=c?c:e,f=e-h+(h>d?7:0)-(e>h?7:0),g=7*(b-1)+(c-e)+f+1,{year:g>0?a:a-1,dayOfYear:g>0?g:D(a-1)+g}}function jb(b){var c=b._i,d=b._f;return b._locale=b._locale||tb.localeData(b._l),null===c||d===a&&""===c?tb.invalid({nullInput:!0}):("string"==typeof c&&(b._i=c=b._locale.preparse(c)),tb.isMoment(c)?new k(c,!0):(d?u(d)?Z(b):W(b):bb(b),new k(b)))}function kb(a,b){var c,d;if(1===b.length&&u(b[0])&&(b=b[0]),!b.length)return tb();for(c=b[0],d=1;d<b.length;++d)b[d][a](c)&&(c=b[d]);return c}function lb(a,b){var c;return"string"==typeof b&&(b=a.localeData().monthsParse(b),"number"!=typeof b)?a:(c=Math.min(a.date(),B(a.year(),b)),a._d["set"+(a._isUTC?"UTC":"")+"Month"](b,c),a)}function mb(a,b){return a._d["get"+(a._isUTC?"UTC":"")+b]()}function nb(a,b,c){return"Month"===b?lb(a,c):a._d["set"+(a._isUTC?"UTC":"")+b](c)}function ob(a,b){return function(c){return null!=c?(nb(this,a,c),tb.updateOffset(this,b),this):mb(this,a)}}function pb(a){return 400*a/146097}function qb(a){return 146097*a/400}function rb(a){tb.duration.fn[a]=function(){return this._data[a]}}function sb(a){"undefined"==typeof ender&&(ub=xb.moment,xb.moment=a?f("Accessing Moment through the global scope is deprecated, and will be removed in an upcoming release.",tb):tb)}for(var tb,ub,vb,wb="2.8.3",xb="undefined"!=typeof global?global:this,yb=Math.round,zb=Object.prototype.hasOwnProperty,Ab=0,Bb=1,Cb=2,Db=3,Eb=4,Fb=5,Gb=6,Hb={},Ib=[],Jb="undefined"!=typeof module&&module.exports,Kb=/^\/?Date\((\-?\d+)/i,Lb=/(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/,Mb=/^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/,Nb=/(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Q|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,4}|X|zz?|ZZ?|.)/g,Ob=/(\[[^\[]*\])|(\\)?(LT|LL?L?L?|l{1,4})/g,Pb=/\d\d?/,Qb=/\d{1,3}/,Rb=/\d{1,4}/,Sb=/[+\-]?\d{1,6}/,Tb=/\d+/,Ub=/[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i,Vb=/Z|[\+\-]\d\d:?\d\d/gi,Wb=/T/i,Xb=/[\+\-]?\d+(\.\d{1,3})?/,Yb=/\d{1,2}/,Zb=/\d/,$b=/\d\d/,_b=/\d{3}/,ac=/\d{4}/,bc=/[+-]?\d{6}/,cc=/[+-]?\d+/,dc=/^\s*(?:[+-]\d{6}|\d{4})-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d(?::?\d\d)?|\s*Z)?)?$/,ec="YYYY-MM-DDTHH:mm:ssZ",fc=[["YYYYYY-MM-DD",/[+-]\d{6}-\d{2}-\d{2}/],["YYYY-MM-DD",/\d{4}-\d{2}-\d{2}/],["GGGG-[W]WW-E",/\d{4}-W\d{2}-\d/],["GGGG-[W]WW",/\d{4}-W\d{2}/],["YYYY-DDD",/\d{4}-\d{3}/]],gc=[["HH:mm:ss.SSSS",/(T| )\d\d:\d\d:\d\d\.\d+/],["HH:mm:ss",/(T| )\d\d:\d\d:\d\d/],["HH:mm",/(T| )\d\d:\d\d/],["HH",/(T| )\d\d/]],hc=/([\+\-]|\d\d)/gi,ic=("Date|Hours|Minutes|Seconds|Milliseconds".split("|"),{Milliseconds:1,Seconds:1e3,Minutes:6e4,Hours:36e5,Days:864e5,Months:2592e6,Years:31536e6}),jc={ms:"millisecond",s:"second",m:"minute",h:"hour",d:"day",D:"date",w:"week",W:"isoWeek",M:"month",Q:"quarter",y:"year",DDD:"dayOfYear",e:"weekday",E:"isoWeekday",gg:"weekYear",GG:"isoWeekYear"},kc={dayofyear:"dayOfYear",isoweekday:"isoWeekday",isoweek:"isoWeek",weekyear:"weekYear",isoweekyear:"isoWeekYear"},lc={},mc={s:45,m:45,h:22,d:26,M:11},nc="DDD w W M D d".split(" "),oc="M D H h m s w W".split(" "),pc={M:function(){return this.month()+1},MMM:function(a){return this.localeData().monthsShort(this,a)},MMMM:function(a){return this.localeData().months(this,a)},D:function(){return this.date()},DDD:function(){return this.dayOfYear()},d:function(){return this.day()},dd:function(a){return this.localeData().weekdaysMin(this,a)},ddd:function(a){return this.localeData().weekdaysShort(this,a)},dddd:function(a){return this.localeData().weekdays(this,a)},w:function(){return this.week()},W:function(){return this.isoWeek()},YY:function(){return p(this.year()%100,2)},YYYY:function(){return p(this.year(),4)},YYYYY:function(){return p(this.year(),5)},YYYYYY:function(){var a=this.year(),b=a>=0?"+":"-";return b+p(Math.abs(a),6)},gg:function(){return p(this.weekYear()%100,2)},gggg:function(){return p(this.weekYear(),4)},ggggg:function(){return p(this.weekYear(),5)},GG:function(){return p(this.isoWeekYear()%100,2)},GGGG:function(){return p(this.isoWeekYear(),4)},GGGGG:function(){return p(this.isoWeekYear(),5)},e:function(){return this.weekday()},E:function(){return this.isoWeekday()},a:function(){return this.localeData().meridiem(this.hours(),this.minutes(),!0)},A:function(){return this.localeData().meridiem(this.hours(),this.minutes(),!1)},H:function(){return this.hours()},h:function(){return this.hours()%12||12},m:function(){return this.minutes()},s:function(){return this.seconds()},S:function(){return A(this.milliseconds()/100)},SS:function(){return p(A(this.milliseconds()/10),2)},SSS:function(){return p(this.milliseconds(),3)},SSSS:function(){return p(this.milliseconds(),3)},Z:function(){var a=-this.zone(),b="+";return 0>a&&(a=-a,b="-"),b+p(A(a/60),2)+":"+p(A(a)%60,2)},ZZ:function(){var a=-this.zone(),b="+";return 0>a&&(a=-a,b="-"),b+p(A(a/60),2)+p(A(a)%60,2)},z:function(){return this.zoneAbbr()},zz:function(){return this.zoneName()},X:function(){return this.unix()},Q:function(){return this.quarter()}},qc={},rc=["months","monthsShort","weekdays","weekdaysShort","weekdaysMin"];nc.length;)vb=nc.pop(),pc[vb+"o"]=i(pc[vb],vb);for(;oc.length;)vb=oc.pop(),pc[vb+vb]=h(pc[vb],2);pc.DDDD=h(pc.DDD,3),m(j.prototype,{set:function(a){var b,c;for(c in a)b=a[c],"function"==typeof b?this[c]=b:this["_"+c]=b},_months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),months:function(a){return this._months[a.month()]},_monthsShort:"Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),monthsShort:function(a){return this._monthsShort[a.month()]},monthsParse:function(a){var b,c,d;for(this._monthsParse||(this._monthsParse=[]),b=0;12>b;b++)if(this._monthsParse[b]||(c=tb.utc([2e3,b]),d="^"+this.months(c,"")+"|^"+this.monthsShort(c,""),this._monthsParse[b]=new RegExp(d.replace(".",""),"i")),this._monthsParse[b].test(a))return b},_weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),weekdays:function(a){return this._weekdays[a.day()]},_weekdaysShort:"Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),weekdaysShort:function(a){return this._weekdaysShort[a.day()]},_weekdaysMin:"Su_Mo_Tu_We_Th_Fr_Sa".split("_"),weekdaysMin:function(a){return this._weekdaysMin[a.day()]},weekdaysParse:function(a){var b,c,d;for(this._weekdaysParse||(this._weekdaysParse=[]),b=0;7>b;b++)if(this._weekdaysParse[b]||(c=tb([2e3,1]).day(b),d="^"+this.weekdays(c,"")+"|^"+this.weekdaysShort(c,"")+"|^"+this.weekdaysMin(c,""),this._weekdaysParse[b]=new RegExp(d.replace(".",""),"i")),this._weekdaysParse[b].test(a))return b},_longDateFormat:{LT:"h:mm A",L:"MM/DD/YYYY",LL:"MMMM D, YYYY",LLL:"MMMM D, YYYY LT",LLLL:"dddd, MMMM D, YYYY LT"},longDateFormat:function(a){var b=this._longDateFormat[a];return!b&&this._longDateFormat[a.toUpperCase()]&&(b=this._longDateFormat[a.toUpperCase()].replace(/MMMM|MM|DD|dddd/g,function(a){return a.slice(1)}),this._longDateFormat[a]=b),b},isPM:function(a){return"p"===(a+"").toLowerCase().charAt(0)},_meridiemParse:/[ap]\.?m?\.?/i,meridiem:function(a,b,c){return a>11?c?"pm":"PM":c?"am":"AM"},_calendar:{sameDay:"[Today at] LT",nextDay:"[Tomorrow at] LT",nextWeek:"dddd [at] LT",lastDay:"[Yesterday at] LT",lastWeek:"[Last] dddd [at] LT",sameElse:"L"},calendar:function(a,b){var c=this._calendar[a];return"function"==typeof c?c.apply(b):c},_relativeTime:{future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"},relativeTime:function(a,b,c,d){var e=this._relativeTime[c];return"function"==typeof e?e(a,b,c,d):e.replace(/%d/i,a)},pastFuture:function(a,b){var c=this._relativeTime[a>0?"future":"past"];return"function"==typeof c?c(b):c.replace(/%s/i,b)},ordinal:function(a){return this._ordinal.replace("%d",a)},_ordinal:"%d",preparse:function(a){return a},postformat:function(a){return a},week:function(a){return hb(a,this._week.dow,this._week.doy).week},_week:{dow:0,doy:6},_invalidDate:"Invalid date",invalidDate:function(){return this._invalidDate}}),tb=function(b,c,e,f){var g;return"boolean"==typeof e&&(f=e,e=a),g={},g._isAMomentObject=!0,g._i=b,g._f=c,g._l=e,g._strict=f,g._isUTC=!1,g._pf=d(),jb(g)},tb.suppressDeprecationWarnings=!1,tb.createFromInputFallback=f("moment construction falls back to js Date. This is discouraged and will be removed in upcoming major release. Please refer to https://github.com/moment/moment/issues/1407 for more info.",function(a){a._d=new Date(a._i)}),tb.min=function(){var a=[].slice.call(arguments,0);return kb("isBefore",a)},tb.max=function(){var a=[].slice.call(arguments,0);return kb("isAfter",a)},tb.utc=function(b,c,e,f){var g;return"boolean"==typeof e&&(f=e,e=a),g={},g._isAMomentObject=!0,g._useUTC=!0,g._isUTC=!0,g._l=e,g._i=b,g._f=c,g._strict=f,g._pf=d(),jb(g).utc()},tb.unix=function(a){return tb(1e3*a)},tb.duration=function(a,b){var d,e,f,g,h=a,i=null;return tb.isDuration(a)?h={ms:a._milliseconds,d:a._days,M:a._months}:"number"==typeof a?(h={},b?h[b]=a:h.milliseconds=a):(i=Lb.exec(a))?(d="-"===i[1]?-1:1,h={y:0,d:A(i[Cb])*d,h:A(i[Db])*d,m:A(i[Eb])*d,s:A(i[Fb])*d,ms:A(i[Gb])*d}):(i=Mb.exec(a))?(d="-"===i[1]?-1:1,f=function(a){var b=a&&parseFloat(a.replace(",","."));return(isNaN(b)?0:b)*d},h={y:f(i[2]),M:f(i[3]),d:f(i[4]),h:f(i[5]),m:f(i[6]),s:f(i[7]),w:f(i[8])}):"object"==typeof h&&("from"in h||"to"in h)&&(g=r(tb(h.from),tb(h.to)),h={},h.ms=g.milliseconds,h.M=g.months),e=new l(h),tb.isDuration(a)&&c(a,"_locale")&&(e._locale=a._locale),e},tb.version=wb,tb.defaultFormat=ec,tb.ISO_8601=function(){},tb.momentProperties=Ib,tb.updateOffset=function(){},tb.relativeTimeThreshold=function(b,c){return mc[b]===a?!1:c===a?mc[b]:(mc[b]=c,!0)},tb.lang=f("moment.lang is deprecated. Use moment.locale instead.",function(a,b){return tb.locale(a,b)}),tb.locale=function(a,b){var c;return a&&(c="undefined"!=typeof b?tb.defineLocale(a,b):tb.localeData(a),c&&(tb.duration._locale=tb._locale=c)),tb._locale._abbr},tb.defineLocale=function(a,b){return null!==b?(b.abbr=a,Hb[a]||(Hb[a]=new j),Hb[a].set(b),tb.locale(a),Hb[a]):(delete Hb[a],null)},tb.langData=f("moment.langData is deprecated. Use moment.localeData instead.",function(a){return tb.localeData(a)}),tb.localeData=function(a){var b;if(a&&a._locale&&a._locale._abbr&&(a=a._locale._abbr),!a)return tb._locale;if(!u(a)){if(b=J(a))return b;a=[a]}return I(a)},tb.isMoment=function(a){return a instanceof k||null!=a&&c(a,"_isAMomentObject")},tb.isDuration=function(a){return a instanceof l};for(vb=rc.length-1;vb>=0;--vb)z(rc[vb]);tb.normalizeUnits=function(a){return x(a)},tb.invalid=function(a){var b=tb.utc(0/0);return null!=a?m(b._pf,a):b._pf.userInvalidated=!0,b},tb.parseZone=function(){return tb.apply(null,arguments).parseZone()},tb.parseTwoDigitYear=function(a){return A(a)+(A(a)>68?1900:2e3)},m(tb.fn=k.prototype,{clone:function(){return tb(this)},valueOf:function(){return+this._d+6e4*(this._offset||0)},unix:function(){return Math.floor(+this/1e3)},toString:function(){return this.clone().locale("en").format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ")},toDate:function(){return this._offset?new Date(+this):this._d},toISOString:function(){var a=tb(this).utc();return 0<a.year()&&a.year()<=9999?N(a,"YYYY-MM-DD[T]HH:mm:ss.SSS[Z]"):N(a,"YYYYYY-MM-DD[T]HH:mm:ss.SSS[Z]")},toArray:function(){var a=this;return[a.year(),a.month(),a.date(),a.hours(),a.minutes(),a.seconds(),a.milliseconds()]},isValid:function(){return G(this)},isDSTShifted:function(){return this._a?this.isValid()&&w(this._a,(this._isUTC?tb.utc(this._a):tb(this._a)).toArray())>0:!1},parsingFlags:function(){return m({},this._pf)},invalidAt:function(){return this._pf.overflow},utc:function(a){return this.zone(0,a)},local:function(a){return this._isUTC&&(this.zone(0,a),this._isUTC=!1,a&&this.add(this._dateTzOffset(),"m")),this},format:function(a){var b=N(this,a||tb.defaultFormat);return this.localeData().postformat(b)},add:s(1,"add"),subtract:s(-1,"subtract"),diff:function(a,b,c){var d,e,f,g=K(a,this),h=6e4*(this.zone()-g.zone());return b=x(b),"year"===b||"month"===b?(d=432e5*(this.daysInMonth()+g.daysInMonth()),e=12*(this.year()-g.year())+(this.month()-g.month()),f=this-tb(this).startOf("month")-(g-tb(g).startOf("month")),f-=6e4*(this.zone()-tb(this).startOf("month").zone()-(g.zone()-tb(g).startOf("month").zone())),e+=f/d,"year"===b&&(e/=12)):(d=this-g,e="second"===b?d/1e3:"minute"===b?d/6e4:"hour"===b?d/36e5:"day"===b?(d-h)/864e5:"week"===b?(d-h)/6048e5:d),c?e:o(e)},from:function(a,b){return tb.duration({to:this,from:a}).locale(this.locale()).humanize(!b)},fromNow:function(a){return this.from(tb(),a)},calendar:function(a){var b=a||tb(),c=K(b,this).startOf("day"),d=this.diff(c,"days",!0),e=-6>d?"sameElse":-1>d?"lastWeek":0>d?"lastDay":1>d?"sameDay":2>d?"nextDay":7>d?"nextWeek":"sameElse";return this.format(this.localeData().calendar(e,this))},isLeapYear:function(){return E(this.year())},isDST:function(){return this.zone()<this.clone().month(0).zone()||this.zone()<this.clone().month(5).zone()},day:function(a){var b=this._isUTC?this._d.getUTCDay():this._d.getDay();return null!=a?(a=eb(a,this.localeData()),this.add(a-b,"d")):b},month:ob("Month",!0),startOf:function(a){switch(a=x(a)){case"year":this.month(0);case"quarter":case"month":this.date(1);case"week":case"isoWeek":case"day":this.hours(0);case"hour":this.minutes(0);case"minute":this.seconds(0);case"second":this.milliseconds(0)}return"week"===a?this.weekday(0):"isoWeek"===a&&this.isoWeekday(1),"quarter"===a&&this.month(3*Math.floor(this.month()/3)),this},endOf:function(a){return a=x(a),this.startOf(a).add(1,"isoWeek"===a?"week":a).subtract(1,"ms")},isAfter:function(a,b){return b=x("undefined"!=typeof b?b:"millisecond"),"millisecond"===b?(a=tb.isMoment(a)?a:tb(a),+this>+a):+this.clone().startOf(b)>+tb(a).startOf(b)},isBefore:function(a,b){return b=x("undefined"!=typeof b?b:"millisecond"),"millisecond"===b?(a=tb.isMoment(a)?a:tb(a),+a>+this):+this.clone().startOf(b)<+tb(a).startOf(b)},isSame:function(a,b){return b=x(b||"millisecond"),"millisecond"===b?(a=tb.isMoment(a)?a:tb(a),+this===+a):+this.clone().startOf(b)===+K(a,this).startOf(b)},min:f("moment().min is deprecated, use moment.min instead. https://github.com/moment/moment/issues/1548",function(a){return a=tb.apply(null,arguments),this>a?this:a}),max:f("moment().max is deprecated, use moment.max instead. https://github.com/moment/moment/issues/1548",function(a){return a=tb.apply(null,arguments),a>this?this:a}),zone:function(a,b){var c,d=this._offset||0;return null==a?this._isUTC?d:this._dateTzOffset():("string"==typeof a&&(a=Q(a)),Math.abs(a)<16&&(a=60*a),!this._isUTC&&b&&(c=this._dateTzOffset()),this._offset=a,this._isUTC=!0,null!=c&&this.subtract(c,"m"),d!==a&&(!b||this._changeInProgress?t(this,tb.duration(d-a,"m"),1,!1):this._changeInProgress||(this._changeInProgress=!0,tb.updateOffset(this,!0),this._changeInProgress=null)),this)},zoneAbbr:function(){return this._isUTC?"UTC":""},zoneName:function(){return this._isUTC?"Coordinated Universal Time":""},parseZone:function(){return this._tzm?this.zone(this._tzm):"string"==typeof this._i&&this.zone(this._i),this},hasAlignedHourOffset:function(a){return a=a?tb(a).zone():0,(this.zone()-a)%60===0},daysInMonth:function(){return B(this.year(),this.month())},dayOfYear:function(a){var b=yb((tb(this).startOf("day")-tb(this).startOf("year"))/864e5)+1;return null==a?b:this.add(a-b,"d")},quarter:function(a){return null==a?Math.ceil((this.month()+1)/3):this.month(3*(a-1)+this.month()%3)},weekYear:function(a){var b=hb(this,this.localeData()._week.dow,this.localeData()._week.doy).year;return null==a?b:this.add(a-b,"y")},isoWeekYear:function(a){var b=hb(this,1,4).year;return null==a?b:this.add(a-b,"y")},week:function(a){var b=this.localeData().week(this);return null==a?b:this.add(7*(a-b),"d")},isoWeek:function(a){var b=hb(this,1,4).week;return null==a?b:this.add(7*(a-b),"d")},weekday:function(a){var b=(this.day()+7-this.localeData()._week.dow)%7;return null==a?b:this.add(a-b,"d")},isoWeekday:function(a){return null==a?this.day()||7:this.day(this.day()%7?a:a-7)},isoWeeksInYear:function(){return C(this.year(),1,4)},weeksInYear:function(){var a=this.localeData()._week;return C(this.year(),a.dow,a.doy)},get:function(a){return a=x(a),this[a]()},set:function(a,b){return a=x(a),"function"==typeof this[a]&&this[a](b),this},locale:function(b){var c;return b===a?this._locale._abbr:(c=tb.localeData(b),null!=c&&(this._locale=c),this)},lang:f("moment().lang() is deprecated. Use moment().localeData() instead.",function(b){return b===a?this.localeData():this.locale(b)}),localeData:function(){return this._locale},_dateTzOffset:function(){return 15*Math.round(this._d.getTimezoneOffset()/15)}}),tb.fn.millisecond=tb.fn.milliseconds=ob("Milliseconds",!1),tb.fn.second=tb.fn.seconds=ob("Seconds",!1),tb.fn.minute=tb.fn.minutes=ob("Minutes",!1),tb.fn.hour=tb.fn.hours=ob("Hours",!0),tb.fn.date=ob("Date",!0),tb.fn.dates=f("dates accessor is deprecated. Use date instead.",ob("Date",!0)),tb.fn.year=ob("FullYear",!0),tb.fn.years=f("years accessor is deprecated. Use year instead.",ob("FullYear",!0)),tb.fn.days=tb.fn.day,tb.fn.months=tb.fn.month,tb.fn.weeks=tb.fn.week,tb.fn.isoWeeks=tb.fn.isoWeek,tb.fn.quarters=tb.fn.quarter,tb.fn.toJSON=tb.fn.toISOString,m(tb.duration.fn=l.prototype,{_bubble:function(){var a,b,c,d=this._milliseconds,e=this._days,f=this._months,g=this._data,h=0;g.milliseconds=d%1e3,a=o(d/1e3),g.seconds=a%60,b=o(a/60),g.minutes=b%60,c=o(b/60),g.hours=c%24,e+=o(c/24),h=o(pb(e)),e-=o(qb(h)),f+=o(e/30),e%=30,h+=o(f/12),f%=12,g.days=e,g.months=f,g.years=h},abs:function(){return this._milliseconds=Math.abs(this._milliseconds),this._days=Math.abs(this._days),this._months=Math.abs(this._months),this._data.milliseconds=Math.abs(this._data.milliseconds),this._data.seconds=Math.abs(this._data.seconds),this._data.minutes=Math.abs(this._data.minutes),this._data.hours=Math.abs(this._data.hours),this._data.months=Math.abs(this._data.months),this._data.years=Math.abs(this._data.years),this},weeks:function(){return o(this.days()/7)},valueOf:function(){return this._milliseconds+864e5*this._days+this._months%12*2592e6+31536e6*A(this._months/12)},humanize:function(a){var b=gb(this,!a,this.localeData());return a&&(b=this.localeData().pastFuture(+this,b)),this.localeData().postformat(b)},add:function(a,b){var c=tb.duration(a,b);return this._milliseconds+=c._milliseconds,this._days+=c._days,this._months+=c._months,this._bubble(),this},subtract:function(a,b){var c=tb.duration(a,b);return this._milliseconds-=c._milliseconds,this._days-=c._days,this._months-=c._months,this._bubble(),this},get:function(a){return a=x(a),this[a.toLowerCase()+"s"]()},as:function(a){var b,c;if(a=x(a),"month"===a||"year"===a)return b=this._days+this._milliseconds/864e5,c=this._months+12*pb(b),"month"===a?c:c/12;switch(b=this._days+qb(this._months/12),a){case"week":return b/7+this._milliseconds/6048e5;case"day":return b+this._milliseconds/864e5;case"hour":return 24*b+this._milliseconds/36e5;case"minute":return 24*b*60+this._milliseconds/6e4;case"second":return 24*b*60*60+this._milliseconds/1e3;case"millisecond":return Math.floor(24*b*60*60*1e3)+this._milliseconds;default:throw new Error("Unknown unit "+a)}},lang:tb.fn.lang,locale:tb.fn.locale,toIsoString:f("toIsoString() is deprecated. Please use toISOString() instead (notice the capitals)",function(){return this.toISOString()}),toISOString:function(){var a=Math.abs(this.years()),b=Math.abs(this.months()),c=Math.abs(this.days()),d=Math.abs(this.hours()),e=Math.abs(this.minutes()),f=Math.abs(this.seconds()+this.milliseconds()/1e3);return this.asSeconds()?(this.asSeconds()<0?"-":"")+"P"+(a?a+"Y":"")+(b?b+"M":"")+(c?c+"D":"")+(d||e||f?"T":"")+(d?d+"H":"")+(e?e+"M":"")+(f?f+"S":""):"P0D"},localeData:function(){return this._locale}}),tb.duration.fn.toString=tb.duration.fn.toISOString;for(vb in ic)c(ic,vb)&&rb(vb.toLowerCase());tb.duration.fn.asMilliseconds=function(){return this.as("ms")},tb.duration.fn.asSeconds=function(){return this.as("s")},tb.duration.fn.asMinutes=function(){return this.as("m")},tb.duration.fn.asHours=function(){return this.as("h")},tb.duration.fn.asDays=function(){return this.as("d")},tb.duration.fn.asWeeks=function(){return this.as("weeks")},tb.duration.fn.asMonths=function(){return this.as("M")},tb.duration.fn.asYears=function(){return this.as("y")},tb.locale("en",{ordinal:function(a){var b=a%10,c=1===A(a%100/10)?"th":1===b?"st":2===b?"nd":3===b?"rd":"th";
return a+c}}),Jb?module.exports=tb:"function"==typeof define&&define.amd?(define("moment",function(a,b,c){return c.config&&c.config()&&c.config().noGlobal===!0&&(xb.moment=ub),tb}),sb(!0)):sb()}).call(this);
(function(){var deprecate,hasModule,makeTwix,__slice=[].slice;hasModule=typeof module!=="undefined"&&module!==null&&module.exports!=null;deprecate=function(name,instead,fn){var alreadyDone;alreadyDone=false;return function(){var args;args=1<=arguments.length?__slice.call(arguments,0):[];if(!alreadyDone){if(typeof console!=="undefined"&&console!==null&&console.warn!=null){console.warn("#"+name+" is deprecated. Use #"+instead+" instead.")}}alreadyDone=true;return fn.apply(this,args)}};makeTwix=function(moment){var Twix,getPrototypeOf,languagesLoaded;if(moment==null){throw"Can't find moment"}languagesLoaded=false;Twix=function(){function Twix(start,end,parseFormat,options){var _ref;if(options==null){options={}}if(typeof parseFormat!=="string"){options=parseFormat!=null?parseFormat:{};parseFormat=null}if(typeof options==="boolean"){options={allDay:options}}this.start=moment(start,parseFormat,options.parseStrict);this.end=moment(end,parseFormat,options.parseStrict);this.allDay=(_ref=options.allDay)!=null?_ref:false}Twix._extend=function(){var attr,first,other,others,_i,_len;first=arguments[0],others=2<=arguments.length?__slice.call(arguments,1):[];for(_i=0,_len=others.length;_i<_len;_i++){other=others[_i];for(attr in other){if(typeof other[attr]!=="undefined"){first[attr]=other[attr]}}}return first};Twix.defaults={twentyFourHour:false,allDaySimple:{fn:function(options){return function(){return options.allDay}},slot:0,pre:" "},dayOfWeek:{fn:function(options){return function(date){return date.format(options.weekdayFormat)}},slot:1,pre:" "},allDayMonth:{fn:function(options){return function(date){return date.format(""+options.monthFormat+" "+options.dayFormat)}},slot:2,pre:" "},month:{fn:function(options){return function(date){return date.format(options.monthFormat)}},slot:2,pre:" "},date:{fn:function(options){return function(date){return date.format(options.dayFormat)}},slot:3,pre:" "},year:{fn:function(options){return function(date){return date.format(options.yearFormat)}},slot:4,pre:", "},time:{fn:function(options){return function(date){var str;str=date.minutes()===0&&options.implicitMinutes&&!options.twentyFourHour?date.format(options.hourFormat):date.format(""+options.hourFormat+":"+options.minuteFormat);if(!options.groupMeridiems&&!options.twentyFourHour){if(options.spaceBeforeMeridiem){str+=" "}str+=date.format(options.meridiemFormat)}return str}},slot:5,pre:", "},meridiem:{fn:function(options){return function(_this){return function(t){return t.format(options.meridiemFormat)}}(this)},slot:6,pre:function(options){if(options.spaceBeforeMeridiem){return" "}else{return""}}}};Twix.registerLang=function(name,options){return moment.lang(name,{twix:Twix._extend({},Twix.defaults,options)})};Twix.prototype.isSame=function(period){return this.start.isSame(this.end,period)};Twix.prototype.length=function(period){return this._trueEnd(true).diff(this._trueStart(),period)};Twix.prototype.count=function(period){var end,start;start=this.start.clone().startOf(period);end=this.end.clone().startOf(period);return end.diff(start,period)+1};Twix.prototype.countInner=function(period){var end,start,_ref;_ref=this._inner(period),start=_ref[0],end=_ref[1];if(start>=end){return 0}return end.diff(start,period)};Twix.prototype.iterate=function(intervalAmount,period,minHours){var end,hasNext,start,_ref;if(intervalAmount==null){intervalAmount=1}_ref=this._prepIterateInputs(intervalAmount,period,minHours),intervalAmount=_ref[0],period=_ref[1],minHours=_ref[2];start=this.start.clone().startOf(period);end=this.end.clone().startOf(period);hasNext=function(_this){return function(){return start<=end&&(!minHours||start.valueOf()!==end.valueOf()||_this.end.hours()>minHours||_this.allDay)}}(this);return this._iterateHelper(period,start,hasNext,intervalAmount)};Twix.prototype.iterateInner=function(intervalAmount,period){var end,hasNext,start,_ref,_ref1;if(intervalAmount==null){intervalAmount=1}_ref=this._prepIterateInputs(intervalAmount,period),intervalAmount=_ref[0],period=_ref[1];_ref1=this._inner(period,intervalAmount),start=_ref1[0],end=_ref1[1];hasNext=function(){return start<end};return this._iterateHelper(period,start,hasNext,intervalAmount)};Twix.prototype.humanizeLength=function(){if(this.allDay){if(this.isSame("day")){return"all day"}else{return this.start.from(this.end.clone().add(1,"day"),true)}}else{return this.start.from(this.end,true)}};Twix.prototype.asDuration=function(units){var diff;diff=this.end.diff(this.start);return moment.duration(diff)};Twix.prototype.isPast=function(){if(this.allDay){return this.end.clone().endOf("day")<moment()}else{return this.end<moment()}};Twix.prototype.isFuture=function(){if(this.allDay){return this.start.clone().startOf("day")>moment()}else{return this.start>moment()}};Twix.prototype.isCurrent=function(){return!this.isPast()&&!this.isFuture()};Twix.prototype.contains=function(mom){mom=moment(mom);return this._trueStart()<=mom&&this._trueEnd()>=mom};Twix.prototype.isEmpty=function(){return this._trueStart().valueOf()===this._trueEnd().valueOf()};Twix.prototype.overlaps=function(other){return this._trueEnd().isAfter(other._trueStart())&&this._trueStart().isBefore(other._trueEnd())};Twix.prototype.engulfs=function(other){return this._trueStart()<=other._trueStart()&&this._trueEnd()>=other._trueEnd()};Twix.prototype.union=function(other){var allDay,newEnd,newStart;allDay=this.allDay&&other.allDay;if(allDay){newStart=this.start<other.start?this.start:other.start;newEnd=this.end>other.end?this.end:other.end}else{newStart=this._trueStart()<other._trueStart()?this._trueStart():other._trueStart();newEnd=this._trueEnd()>other._trueEnd()?this._trueEnd():other._trueEnd()}return new Twix(newStart,newEnd,allDay)};Twix.prototype.intersection=function(other){var allDay,end,newEnd,newStart;newStart=this.start>other.start?this.start:other.start;if(this.allDay){end=moment(this.end);end.add(1,"day");end.subtract(1,"millisecond");if(other.allDay){newEnd=end<other.end?this.end:other.end}else{newEnd=end<other.end?end:other.end}}else{newEnd=this.end<other.end?this.end:other.end}allDay=this.allDay&&other.allDay;return new Twix(newStart,newEnd,allDay)};Twix.prototype.isValid=function(){return this._trueStart()<=this._trueEnd()};Twix.prototype.equals=function(other){return other instanceof Twix&&this.allDay===other.allDay&&this.start.valueOf()===other.start.valueOf()&&this.end.valueOf()===other.end.valueOf()};Twix.prototype.toString=function(){var _ref;return"{start: "+this.start.format()+", end: "+this.end.format()+", allDay: "+((_ref=this.allDay)!=null?_ref:{"true":"false"})+"}"};Twix.prototype.simpleFormat=function(momentOpts,inopts){var options,s;options={allDay:"(all day)",template:Twix.formatTemplate};Twix._extend(options,inopts||{});s=options.template(this.start.format(momentOpts),this.end.format(momentOpts));if(this.allDay&&options.allDay){s+=" "+options.allDay}return s};Twix.prototype.format=function(inopts){var common_bucket,end_bucket,fold,format,fs,global_first,goesIntoTheMorning,needDate,options,process,start_bucket,together,_i,_len;this._lazyLang();if(this.isEmpty()){return""}options={groupMeridiems:true,spaceBeforeMeridiem:true,showDate:true,showDayOfWeek:false,twentyFourHour:this.langData.twentyFourHour,implicitMinutes:true,implicitYear:true,yearFormat:"YYYY",monthFormat:"MMM",weekdayFormat:"ddd",dayFormat:"D",meridiemFormat:"A",hourFormat:"h",minuteFormat:"mm",allDay:"all day",explicitAllDay:false,lastNightEndsAt:0,template:Twix.formatTemplate};Twix._extend(options,inopts||{});fs=[];if(options.twentyFourHour){options.hourFormat=options.hourFormat.replace("h","H")}goesIntoTheMorning=options.lastNightEndsAt>0&&!this.allDay&&this.end.clone().startOf("day").valueOf()===this.start.clone().add(1,"day").startOf("day").valueOf()&&this.start.hours()>12&&this.end.hours()<options.lastNightEndsAt;needDate=options.showDate||!this.isSame("day")&&!goesIntoTheMorning;if(this.allDay&&this.isSame("day")&&(!options.showDate||options.explicitAllDay)){fs.push({name:"all day simple",fn:this._formatFn("allDaySimple",options),pre:this._formatPre("allDaySimple",options),slot:this._formatSlot("allDaySimple")})}if(needDate&&(!options.implicitYear||this.start.year()!==moment().year()||!this.isSame("year"))){fs.push({name:"year",fn:this._formatFn("year",options),pre:this._formatPre("year",options),slot:this._formatSlot("year")})}if(!this.allDay&&needDate){fs.push({name:"all day month",fn:this._formatFn("allDayMonth",options),ignoreEnd:function(){return goesIntoTheMorning},pre:this._formatPre("allDayMonth",options),slot:this._formatSlot("allDayMonth")})}if(this.allDay&&needDate){fs.push({name:"month",fn:this._formatFn("month",options),pre:this._formatPre("month",options),slot:this._formatSlot("month")})}if(this.allDay&&needDate){fs.push({name:"date",fn:this._formatFn("date",options),pre:this._formatPre("date",options),slot:this._formatSlot("date")})}if(needDate&&options.showDayOfWeek){fs.push({name:"day of week",fn:this._formatFn("dayOfWeek",options),pre:this._formatPre("dayOfWeek",options),slot:this._formatSlot("dayOfWeek")})}if(options.groupMeridiems&&!options.twentyFourHour&&!this.allDay){fs.push({name:"meridiem",fn:this._formatFn("meridiem",options),pre:this._formatPre("meridiem",options),slot:this._formatSlot("meridiem")})}if(!this.allDay){fs.push({name:"time",fn:this._formatFn("time",options),pre:this._formatPre("time",options),slot:this._formatSlot("time")})}start_bucket=[];end_bucket=[];common_bucket=[];together=true;process=function(_this){return function(format){var end_str,start_group,start_str;start_str=format.fn(_this.start);end_str=format.ignoreEnd&&format.ignoreEnd()?start_str:format.fn(_this.end);start_group={format:format,value:function(){return start_str}};if(end_str===start_str&&together){return common_bucket.push(start_group)}else{if(together){together=false;common_bucket.push({format:{slot:format.slot,pre:""},value:function(){return options.template(fold(start_bucket),fold(end_bucket,true).trim())}})}start_bucket.push(start_group);return end_bucket.push({format:format,value:function(){return end_str}})}}}(this);for(_i=0,_len=fs.length;_i<_len;_i++){format=fs[_i];process(format)}global_first=true;fold=function(_this){return function(array,skip_pre){var local_first,section,str,_j,_len1,_ref;local_first=true;str="";_ref=array.sort(function(a,b){return a.format.slot-b.format.slot});for(_j=0,_len1=_ref.length;_j<_len1;_j++){section=_ref[_j];if(!global_first){if(local_first&&skip_pre){str+=" "}else{str+=section.format.pre}}str+=section.value();global_first=false;local_first=false}return str}}(this);return fold(common_bucket)};Twix.prototype._trueStart=function(){if(this.allDay){return this.start.clone().startOf("day")}else{return this.start.clone()}};Twix.prototype._trueEnd=function(diffableEnd){if(diffableEnd==null){diffableEnd=false}if(this.allDay){if(diffableEnd){return this.end.clone().add(1,"day")}else{return this.end.clone().endOf("day")}}else{return this.end.clone()}};Twix.prototype._iterateHelper=function(period,iter,hasNext,intervalAmount){if(intervalAmount==null){intervalAmount=1}return{next:function(_this){return function(){var val;if(!hasNext()){return null}else{val=iter.clone();iter.add(intervalAmount,period);return val}}}(this),hasNext:hasNext}};Twix.prototype._prepIterateInputs=function(){var inputs,intervalAmount,minHours,period,_ref,_ref1;inputs=1<=arguments.length?__slice.call(arguments,0):[];if(typeof inputs[0]==="number"){return inputs}if(typeof inputs[0]==="string"){period=inputs.shift();intervalAmount=(_ref=inputs.pop())!=null?_ref:1;if(inputs.length){minHours=(_ref1=inputs[0])!=null?_ref1:false}}if(moment.isDuration(inputs[0])){period="milliseconds";intervalAmount=inputs[0].as(period)}return[intervalAmount,period,minHours]};Twix.prototype._inner=function(period,intervalAmount){var durationCount,durationPeriod,end,modulus,start;if(period==null){period="milliseconds"}if(intervalAmount==null){intervalAmount=1}start=this._trueStart();end=this._trueEnd(true);if(start>start.clone().startOf(period)){start.startOf(period).add(intervalAmount,period)}if(end<end.clone().endOf(period)){end.startOf(period)}durationPeriod=start.twix(end).asDuration(period);durationCount=durationPeriod.get(period);modulus=durationCount%intervalAmount;end.subtract(modulus,period);return[start,end]};Twix.prototype._lazyLang=function(){var e,langData,languages,_ref;langData=this.start.lang();if(langData!=null&&this.end.lang()._abbr!==langData._abbr){this.end.lang(langData._abbr)}if(this.langData!=null&&this.langData._abbr===langData._abbr){return}if(hasModule&&!(languagesLoaded||langData._abbr==="en")){try{languages=require("./lang");languages(moment,Twix)}catch(_error){e=_error}languagesLoaded=true}return this.langData=(_ref=langData!=null?langData._twix:void 0)!=null?_ref:Twix.defaults};Twix.prototype._formatFn=function(name,options){return this.langData[name].fn(options)};Twix.prototype._formatSlot=function(name){return this.langData[name].slot};Twix.prototype._formatPre=function(name,options){if(typeof this.langData[name].pre==="function"){return this.langData[name].pre(options)}else{return this.langData[name].pre}};Twix.prototype.sameDay=deprecate("sameDay","isSame('day')",function(){return this.isSame("day")});Twix.prototype.sameYear=deprecate("sameYear","isSame('year')",function(){return this.isSame("year")});Twix.prototype.countDays=deprecate("countDays","countOuter('days')",function(){return this.countOuter("days")});Twix.prototype.daysIn=deprecate("daysIn","iterate('days' [,minHours])",function(minHours){return this.iterate("days",minHours)});Twix.prototype.past=deprecate("past","isPast()",function(){return this.isPast()});Twix.prototype.duration=deprecate("duration","humanizeLength()",function(){return this.humanizeLength()});Twix.prototype.merge=deprecate("merge","union(other)",function(other){return this.union(other)});return Twix}();getPrototypeOf=function(o){if(typeof Object.getPrototypeOf==="function"){return Object.getPrototypeOf(o)}else if("".__proto__===String.prototype){return o.__proto__}else{return o.constructor.prototype}};Twix._extend(moment._locale||getPrototypeOf(moment.fn._lang),{_twix:Twix.defaults});Twix.formatTemplate=function(leftSide,rightSide){return""+leftSide+" - "+rightSide};moment.twix=function(){return function(func,args,ctor){ctor.prototype=func.prototype;var child=new ctor,result=func.apply(child,args);return Object(result)===result?result:child}(Twix,arguments,function(){})};moment.fn.twix=function(){return function(func,args,ctor){ctor.prototype=func.prototype;var child=new ctor,result=func.apply(child,args);return Object(result)===result?result:child}(Twix,[this].concat(__slice.call(arguments)),function(){})};moment.fn.forDuration=function(duration,allDay){return new Twix(this,this.clone().add(duration),allDay)};moment.duration.fn.afterMoment=function(startingTime,allDay){return new Twix(startingTime,moment(startingTime).clone().add(this),allDay)};moment.duration.fn.beforeMoment=function(startingTime,allDay){return new Twix(moment(startingTime).clone().subtract(this),startingTime,allDay)};moment.twixClass=Twix;return Twix};if(hasModule){module.exports=makeTwix(require("moment"))}if(typeof define==="function"){define("twix",["moment"],function(moment){return makeTwix(moment)})}if(this.moment!=null){this.Twix=makeTwix(this.moment)}}).call(this);
//     Underscore.js 1.7.0
//     http://underscorejs.org
//     (c) 2009-2014 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.
(function(){var n=this,t=n._,r=Array.prototype,e=Object.prototype,u=Function.prototype,i=r.push,a=r.slice,o=r.concat,l=e.toString,c=e.hasOwnProperty,f=Array.isArray,s=Object.keys,p=u.bind,h=function(n){return n instanceof h?n:this instanceof h?void(this._wrapped=n):new h(n)};"undefined"!=typeof exports?("undefined"!=typeof module&&module.exports&&(exports=module.exports=h),exports._=h):n._=h,h.VERSION="1.7.0";var g=function(n,t,r){if(t===void 0)return n;switch(null==r?3:r){case 1:return function(r){return n.call(t,r)};case 2:return function(r,e){return n.call(t,r,e)};case 3:return function(r,e,u){return n.call(t,r,e,u)};case 4:return function(r,e,u,i){return n.call(t,r,e,u,i)}}return function(){return n.apply(t,arguments)}};h.iteratee=function(n,t,r){return null==n?h.identity:h.isFunction(n)?g(n,t,r):h.isObject(n)?h.matches(n):h.property(n)},h.each=h.forEach=function(n,t,r){if(null==n)return n;t=g(t,r);var e,u=n.length;if(u===+u)for(e=0;u>e;e++)t(n[e],e,n);else{var i=h.keys(n);for(e=0,u=i.length;u>e;e++)t(n[i[e]],i[e],n)}return n},h.map=h.collect=function(n,t,r){if(null==n)return[];t=h.iteratee(t,r);for(var e,u=n.length!==+n.length&&h.keys(n),i=(u||n).length,a=Array(i),o=0;i>o;o++)e=u?u[o]:o,a[o]=t(n[e],e,n);return a};var v="Reduce of empty array with no initial value";h.reduce=h.foldl=h.inject=function(n,t,r,e){null==n&&(n=[]),t=g(t,e,4);var u,i=n.length!==+n.length&&h.keys(n),a=(i||n).length,o=0;if(arguments.length<3){if(!a)throw new TypeError(v);r=n[i?i[o++]:o++]}for(;a>o;o++)u=i?i[o]:o,r=t(r,n[u],u,n);return r},h.reduceRight=h.foldr=function(n,t,r,e){null==n&&(n=[]),t=g(t,e,4);var u,i=n.length!==+n.length&&h.keys(n),a=(i||n).length;if(arguments.length<3){if(!a)throw new TypeError(v);r=n[i?i[--a]:--a]}for(;a--;)u=i?i[a]:a,r=t(r,n[u],u,n);return r},h.find=h.detect=function(n,t,r){var e;return t=h.iteratee(t,r),h.some(n,function(n,r,u){return t(n,r,u)?(e=n,!0):void 0}),e},h.filter=h.select=function(n,t,r){var e=[];return null==n?e:(t=h.iteratee(t,r),h.each(n,function(n,r,u){t(n,r,u)&&e.push(n)}),e)},h.reject=function(n,t,r){return h.filter(n,h.negate(h.iteratee(t)),r)},h.every=h.all=function(n,t,r){if(null==n)return!0;t=h.iteratee(t,r);var e,u,i=n.length!==+n.length&&h.keys(n),a=(i||n).length;for(e=0;a>e;e++)if(u=i?i[e]:e,!t(n[u],u,n))return!1;return!0},h.some=h.any=function(n,t,r){if(null==n)return!1;t=h.iteratee(t,r);var e,u,i=n.length!==+n.length&&h.keys(n),a=(i||n).length;for(e=0;a>e;e++)if(u=i?i[e]:e,t(n[u],u,n))return!0;return!1},h.contains=h.include=function(n,t){return null==n?!1:(n.length!==+n.length&&(n=h.values(n)),h.indexOf(n,t)>=0)},h.invoke=function(n,t){var r=a.call(arguments,2),e=h.isFunction(t);return h.map(n,function(n){return(e?t:n[t]).apply(n,r)})},h.pluck=function(n,t){return h.map(n,h.property(t))},h.where=function(n,t){return h.filter(n,h.matches(t))},h.findWhere=function(n,t){return h.find(n,h.matches(t))},h.max=function(n,t,r){var e,u,i=-1/0,a=-1/0;if(null==t&&null!=n){n=n.length===+n.length?n:h.values(n);for(var o=0,l=n.length;l>o;o++)e=n[o],e>i&&(i=e)}else t=h.iteratee(t,r),h.each(n,function(n,r,e){u=t(n,r,e),(u>a||u===-1/0&&i===-1/0)&&(i=n,a=u)});return i},h.min=function(n,t,r){var e,u,i=1/0,a=1/0;if(null==t&&null!=n){n=n.length===+n.length?n:h.values(n);for(var o=0,l=n.length;l>o;o++)e=n[o],i>e&&(i=e)}else t=h.iteratee(t,r),h.each(n,function(n,r,e){u=t(n,r,e),(a>u||1/0===u&&1/0===i)&&(i=n,a=u)});return i},h.shuffle=function(n){for(var t,r=n&&n.length===+n.length?n:h.values(n),e=r.length,u=Array(e),i=0;e>i;i++)t=h.random(0,i),t!==i&&(u[i]=u[t]),u[t]=r[i];return u},h.sample=function(n,t,r){return null==t||r?(n.length!==+n.length&&(n=h.values(n)),n[h.random(n.length-1)]):h.shuffle(n).slice(0,Math.max(0,t))},h.sortBy=function(n,t,r){return t=h.iteratee(t,r),h.pluck(h.map(n,function(n,r,e){return{value:n,index:r,criteria:t(n,r,e)}}).sort(function(n,t){var r=n.criteria,e=t.criteria;if(r!==e){if(r>e||r===void 0)return 1;if(e>r||e===void 0)return-1}return n.index-t.index}),"value")};var m=function(n){return function(t,r,e){var u={};return r=h.iteratee(r,e),h.each(t,function(e,i){var a=r(e,i,t);n(u,e,a)}),u}};h.groupBy=m(function(n,t,r){h.has(n,r)?n[r].push(t):n[r]=[t]}),h.indexBy=m(function(n,t,r){n[r]=t}),h.countBy=m(function(n,t,r){h.has(n,r)?n[r]++:n[r]=1}),h.sortedIndex=function(n,t,r,e){r=h.iteratee(r,e,1);for(var u=r(t),i=0,a=n.length;a>i;){var o=i+a>>>1;r(n[o])<u?i=o+1:a=o}return i},h.toArray=function(n){return n?h.isArray(n)?a.call(n):n.length===+n.length?h.map(n,h.identity):h.values(n):[]},h.size=function(n){return null==n?0:n.length===+n.length?n.length:h.keys(n).length},h.partition=function(n,t,r){t=h.iteratee(t,r);var e=[],u=[];return h.each(n,function(n,r,i){(t(n,r,i)?e:u).push(n)}),[e,u]},h.first=h.head=h.take=function(n,t,r){return null==n?void 0:null==t||r?n[0]:0>t?[]:a.call(n,0,t)},h.initial=function(n,t,r){return a.call(n,0,Math.max(0,n.length-(null==t||r?1:t)))},h.last=function(n,t,r){return null==n?void 0:null==t||r?n[n.length-1]:a.call(n,Math.max(n.length-t,0))},h.rest=h.tail=h.drop=function(n,t,r){return a.call(n,null==t||r?1:t)},h.compact=function(n){return h.filter(n,h.identity)};var y=function(n,t,r,e){if(t&&h.every(n,h.isArray))return o.apply(e,n);for(var u=0,a=n.length;a>u;u++){var l=n[u];h.isArray(l)||h.isArguments(l)?t?i.apply(e,l):y(l,t,r,e):r||e.push(l)}return e};h.flatten=function(n,t){return y(n,t,!1,[])},h.without=function(n){return h.difference(n,a.call(arguments,1))},h.uniq=h.unique=function(n,t,r,e){if(null==n)return[];h.isBoolean(t)||(e=r,r=t,t=!1),null!=r&&(r=h.iteratee(r,e));for(var u=[],i=[],a=0,o=n.length;o>a;a++){var l=n[a];if(t)a&&i===l||u.push(l),i=l;else if(r){var c=r(l,a,n);h.indexOf(i,c)<0&&(i.push(c),u.push(l))}else h.indexOf(u,l)<0&&u.push(l)}return u},h.union=function(){return h.uniq(y(arguments,!0,!0,[]))},h.intersection=function(n){if(null==n)return[];for(var t=[],r=arguments.length,e=0,u=n.length;u>e;e++){var i=n[e];if(!h.contains(t,i)){for(var a=1;r>a&&h.contains(arguments[a],i);a++);a===r&&t.push(i)}}return t},h.difference=function(n){var t=y(a.call(arguments,1),!0,!0,[]);return h.filter(n,function(n){return!h.contains(t,n)})},h.zip=function(n){if(null==n)return[];for(var t=h.max(arguments,"length").length,r=Array(t),e=0;t>e;e++)r[e]=h.pluck(arguments,e);return r},h.object=function(n,t){if(null==n)return{};for(var r={},e=0,u=n.length;u>e;e++)t?r[n[e]]=t[e]:r[n[e][0]]=n[e][1];return r},h.indexOf=function(n,t,r){if(null==n)return-1;var e=0,u=n.length;if(r){if("number"!=typeof r)return e=h.sortedIndex(n,t),n[e]===t?e:-1;e=0>r?Math.max(0,u+r):r}for(;u>e;e++)if(n[e]===t)return e;return-1},h.lastIndexOf=function(n,t,r){if(null==n)return-1;var e=n.length;for("number"==typeof r&&(e=0>r?e+r+1:Math.min(e,r+1));--e>=0;)if(n[e]===t)return e;return-1},h.range=function(n,t,r){arguments.length<=1&&(t=n||0,n=0),r=r||1;for(var e=Math.max(Math.ceil((t-n)/r),0),u=Array(e),i=0;e>i;i++,n+=r)u[i]=n;return u};var d=function(){};h.bind=function(n,t){var r,e;if(p&&n.bind===p)return p.apply(n,a.call(arguments,1));if(!h.isFunction(n))throw new TypeError("Bind must be called on a function");return r=a.call(arguments,2),e=function(){if(!(this instanceof e))return n.apply(t,r.concat(a.call(arguments)));d.prototype=n.prototype;var u=new d;d.prototype=null;var i=n.apply(u,r.concat(a.call(arguments)));return h.isObject(i)?i:u}},h.partial=function(n){var t=a.call(arguments,1);return function(){for(var r=0,e=t.slice(),u=0,i=e.length;i>u;u++)e[u]===h&&(e[u]=arguments[r++]);for(;r<arguments.length;)e.push(arguments[r++]);return n.apply(this,e)}},h.bindAll=function(n){var t,r,e=arguments.length;if(1>=e)throw new Error("bindAll must be passed function names");for(t=1;e>t;t++)r=arguments[t],n[r]=h.bind(n[r],n);return n},h.memoize=function(n,t){var r=function(e){var u=r.cache,i=t?t.apply(this,arguments):e;return h.has(u,i)||(u[i]=n.apply(this,arguments)),u[i]};return r.cache={},r},h.delay=function(n,t){var r=a.call(arguments,2);return setTimeout(function(){return n.apply(null,r)},t)},h.defer=function(n){return h.delay.apply(h,[n,1].concat(a.call(arguments,1)))},h.throttle=function(n,t,r){var e,u,i,a=null,o=0;r||(r={});var l=function(){o=r.leading===!1?0:h.now(),a=null,i=n.apply(e,u),a||(e=u=null)};return function(){var c=h.now();o||r.leading!==!1||(o=c);var f=t-(c-o);return e=this,u=arguments,0>=f||f>t?(clearTimeout(a),a=null,o=c,i=n.apply(e,u),a||(e=u=null)):a||r.trailing===!1||(a=setTimeout(l,f)),i}},h.debounce=function(n,t,r){var e,u,i,a,o,l=function(){var c=h.now()-a;t>c&&c>0?e=setTimeout(l,t-c):(e=null,r||(o=n.apply(i,u),e||(i=u=null)))};return function(){i=this,u=arguments,a=h.now();var c=r&&!e;return e||(e=setTimeout(l,t)),c&&(o=n.apply(i,u),i=u=null),o}},h.wrap=function(n,t){return h.partial(t,n)},h.negate=function(n){return function(){return!n.apply(this,arguments)}},h.compose=function(){var n=arguments,t=n.length-1;return function(){for(var r=t,e=n[t].apply(this,arguments);r--;)e=n[r].call(this,e);return e}},h.after=function(n,t){return function(){return--n<1?t.apply(this,arguments):void 0}},h.before=function(n,t){var r;return function(){return--n>0?r=t.apply(this,arguments):t=null,r}},h.once=h.partial(h.before,2),h.keys=function(n){if(!h.isObject(n))return[];if(s)return s(n);var t=[];for(var r in n)h.has(n,r)&&t.push(r);return t},h.values=function(n){for(var t=h.keys(n),r=t.length,e=Array(r),u=0;r>u;u++)e[u]=n[t[u]];return e},h.pairs=function(n){for(var t=h.keys(n),r=t.length,e=Array(r),u=0;r>u;u++)e[u]=[t[u],n[t[u]]];return e},h.invert=function(n){for(var t={},r=h.keys(n),e=0,u=r.length;u>e;e++)t[n[r[e]]]=r[e];return t},h.functions=h.methods=function(n){var t=[];for(var r in n)h.isFunction(n[r])&&t.push(r);return t.sort()},h.extend=function(n){if(!h.isObject(n))return n;for(var t,r,e=1,u=arguments.length;u>e;e++){t=arguments[e];for(r in t)c.call(t,r)&&(n[r]=t[r])}return n},h.pick=function(n,t,r){var e,u={};if(null==n)return u;if(h.isFunction(t)){t=g(t,r);for(e in n){var i=n[e];t(i,e,n)&&(u[e]=i)}}else{var l=o.apply([],a.call(arguments,1));n=new Object(n);for(var c=0,f=l.length;f>c;c++)e=l[c],e in n&&(u[e]=n[e])}return u},h.omit=function(n,t,r){if(h.isFunction(t))t=h.negate(t);else{var e=h.map(o.apply([],a.call(arguments,1)),String);t=function(n,t){return!h.contains(e,t)}}return h.pick(n,t,r)},h.defaults=function(n){if(!h.isObject(n))return n;for(var t=1,r=arguments.length;r>t;t++){var e=arguments[t];for(var u in e)n[u]===void 0&&(n[u]=e[u])}return n},h.clone=function(n){return h.isObject(n)?h.isArray(n)?n.slice():h.extend({},n):n},h.tap=function(n,t){return t(n),n};var b=function(n,t,r,e){if(n===t)return 0!==n||1/n===1/t;if(null==n||null==t)return n===t;n instanceof h&&(n=n._wrapped),t instanceof h&&(t=t._wrapped);var u=l.call(n);if(u!==l.call(t))return!1;switch(u){case"[object RegExp]":case"[object String]":return""+n==""+t;case"[object Number]":return+n!==+n?+t!==+t:0===+n?1/+n===1/t:+n===+t;case"[object Date]":case"[object Boolean]":return+n===+t}if("object"!=typeof n||"object"!=typeof t)return!1;for(var i=r.length;i--;)if(r[i]===n)return e[i]===t;var a=n.constructor,o=t.constructor;if(a!==o&&"constructor"in n&&"constructor"in t&&!(h.isFunction(a)&&a instanceof a&&h.isFunction(o)&&o instanceof o))return!1;r.push(n),e.push(t);var c,f;if("[object Array]"===u){if(c=n.length,f=c===t.length)for(;c--&&(f=b(n[c],t[c],r,e)););}else{var s,p=h.keys(n);if(c=p.length,f=h.keys(t).length===c)for(;c--&&(s=p[c],f=h.has(t,s)&&b(n[s],t[s],r,e)););}return r.pop(),e.pop(),f};h.isEqual=function(n,t){return b(n,t,[],[])},h.isEmpty=function(n){if(null==n)return!0;if(h.isArray(n)||h.isString(n)||h.isArguments(n))return 0===n.length;for(var t in n)if(h.has(n,t))return!1;return!0},h.isElement=function(n){return!(!n||1!==n.nodeType)},h.isArray=f||function(n){return"[object Array]"===l.call(n)},h.isObject=function(n){var t=typeof n;return"function"===t||"object"===t&&!!n},h.each(["Arguments","Function","String","Number","Date","RegExp"],function(n){h["is"+n]=function(t){return l.call(t)==="[object "+n+"]"}}),h.isArguments(arguments)||(h.isArguments=function(n){return h.has(n,"callee")}),"function"!=typeof/./&&(h.isFunction=function(n){return"function"==typeof n||!1}),h.isFinite=function(n){return isFinite(n)&&!isNaN(parseFloat(n))},h.isNaN=function(n){return h.isNumber(n)&&n!==+n},h.isBoolean=function(n){return n===!0||n===!1||"[object Boolean]"===l.call(n)},h.isNull=function(n){return null===n},h.isUndefined=function(n){return n===void 0},h.has=function(n,t){return null!=n&&c.call(n,t)},h.noConflict=function(){return n._=t,this},h.identity=function(n){return n},h.constant=function(n){return function(){return n}},h.noop=function(){},h.property=function(n){return function(t){return t[n]}},h.matches=function(n){var t=h.pairs(n),r=t.length;return function(n){if(null==n)return!r;n=new Object(n);for(var e=0;r>e;e++){var u=t[e],i=u[0];if(u[1]!==n[i]||!(i in n))return!1}return!0}},h.times=function(n,t,r){var e=Array(Math.max(0,n));t=g(t,r,1);for(var u=0;n>u;u++)e[u]=t(u);return e},h.random=function(n,t){return null==t&&(t=n,n=0),n+Math.floor(Math.random()*(t-n+1))},h.now=Date.now||function(){return(new Date).getTime()};var _={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},w=h.invert(_),j=function(n){var t=function(t){return n[t]},r="(?:"+h.keys(n).join("|")+")",e=RegExp(r),u=RegExp(r,"g");return function(n){return n=null==n?"":""+n,e.test(n)?n.replace(u,t):n}};h.escape=j(_),h.unescape=j(w),h.result=function(n,t){if(null==n)return void 0;var r=n[t];return h.isFunction(r)?n[t]():r};var x=0;h.uniqueId=function(n){var t=++x+"";return n?n+t:t},h.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var A=/(.)^/,k={"'":"'","\\":"\\","\r":"r","\n":"n","\u2028":"u2028","\u2029":"u2029"},O=/\\|'|\r|\n|\u2028|\u2029/g,F=function(n){return"\\"+k[n]};h.template=function(n,t,r){!t&&r&&(t=r),t=h.defaults({},t,h.templateSettings);var e=RegExp([(t.escape||A).source,(t.interpolate||A).source,(t.evaluate||A).source].join("|")+"|$","g"),u=0,i="__p+='";n.replace(e,function(t,r,e,a,o){return i+=n.slice(u,o).replace(O,F),u=o+t.length,r?i+="'+\n((__t=("+r+"))==null?'':_.escape(__t))+\n'":e?i+="'+\n((__t=("+e+"))==null?'':__t)+\n'":a&&(i+="';\n"+a+"\n__p+='"),t}),i+="';\n",t.variable||(i="with(obj||{}){\n"+i+"}\n"),i="var __t,__p='',__j=Array.prototype.join,"+"print=function(){__p+=__j.call(arguments,'');};\n"+i+"return __p;\n";try{var a=new Function(t.variable||"obj","_",i)}catch(o){throw o.source=i,o}var l=function(n){return a.call(this,n,h)},c=t.variable||"obj";return l.source="function("+c+"){\n"+i+"}",l},h.chain=function(n){var t=h(n);return t._chain=!0,t};var E=function(n){return this._chain?h(n).chain():n};h.mixin=function(n){h.each(h.functions(n),function(t){var r=h[t]=n[t];h.prototype[t]=function(){var n=[this._wrapped];return i.apply(n,arguments),E.call(this,r.apply(h,n))}})},h.mixin(h),h.each(["pop","push","reverse","shift","sort","splice","unshift"],function(n){var t=r[n];h.prototype[n]=function(){var r=this._wrapped;return t.apply(r,arguments),"shift"!==n&&"splice"!==n||0!==r.length||delete r[0],E.call(this,r)}}),h.each(["concat","join","slice"],function(n){var t=r[n];h.prototype[n]=function(){return E.call(this,t.apply(this._wrapped,arguments))}}),h.prototype.value=function(){return this._wrapped},"function"==typeof define&&define.amd&&define("underscore",[],function(){return h})}).call(this);
//# sourceMappingURL=underscore-min.map
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

//
// Location Images
//
$(function(){
	$('.img-loc').css('background-image', 'url(/wp-content/themes/libraries/images/locations-sprite-74.png)').trigger('image-ready');
});
// Loads a random guide set from guide-list.html
$(function(){
	var	guideNum = Math.ceil(Math.random()*6),
			randGuide = '/wp-content/themes/libraries/guide-list.html '+'.guide-list-'+guideNum;
	$('#guide-list-home').load(randGuide);
});
//
// Experts
//

// This implements a Fisher-Yates shuffle.
// See also: https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
function shuffleExperts(data) {
	var m = data.length, t, i;

	// While there remain elements to shuffle…
	while (m) {

		// Pick a remaining element…
		i = Math.floor(Math.random() * m--);

		// And swap it with the current element.
		t = data[m];
		data[m] = data[i];
		data[i] = t;
	}
	return data;
}

// This parses the data structure returned by the WordPress API
function parseExperts(data) {

	// Expert names
	var expertName1 = data[0].title.rendered;
	var expertName2 = data[1].title.rendered;
	var expertName3 = data[2].title.rendered;
	var expertName4 = data[3].title.rendered;

	// Expert images
	var expertPhoto1 = data[0].featured_media;
	var expertPhoto2 = data[1].featured_media;
	var expertPhoto3 = data[2].featured_media;
	var expertPhoto4 = data[3].featured_media;

	// Expert job titles (post excerpts)
	var expertExcerpt1 = data[0].excerpt.rendered;
	var expertExcerpt2 = data[1].excerpt.rendered;
	var expertExcerpt3 = data[2].excerpt.rendered;
	var expertExcerpt4 = data[3].excerpt.rendered;

	// Expert URL (currently an ACF field)
	var expertURL1 = data[0].meta.expert_url;
	var expertURL2 = data[1].meta.expert_url;
	var expertURL3 = data[2].meta.expert_url;
	var expertURL4 = data[3].meta.expert_url;

	// Append extra markup only if JSON request successful
	$('.expert').append('<a class="link-profile no-underline">');
	// Append expert image div
	$('.expert .link-profile').append('<img alt="" class="expert-photo">');
	// Append empty spans for expert names
	$('.expert .link-profile').append('<span class="name"></span>');
	// Append empty spans for expert titles
	$('.expert .link-profile').append('<span class="title-job"></span>');
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
	// Add expert excerpt
	$('.expert .title-job:eq(0)').html(expertExcerpt1);
	$('.expert .title-job:eq(1)').html(expertExcerpt2);
	$('.expert .title-job:eq(2)').html(expertExcerpt3);
	$('.expert .title-job:eq(3)').html(expertExcerpt4);
	// Add expert URL
	$('.expert .link-profile:eq(0)').attr('href', expertURL1);
	$('.expert .link-profile:eq(1)').attr('href', expertURL2);
	$('.expert .link-profile:eq(2)').attr('href', expertURL3);
	$('.expert .link-profile:eq(3)').attr('href', expertURL4);
	// Add the expert count to the "All Experts" button
	$('.view-experts .count').text(data.length);
}

$(function(){
	
	// Much of this could be eliminated by just loading this URL:
	// /wp-json/wp/v2/experts?filter[orderby]=rand&filter[posts_per_page]=4
	$.getJSON('/wp-json/wp/v2/experts?per_page=99')
		.done(function(data){
			parseExperts(shuffleExperts(data));
		});

});

$(document).ready(function() {
	InitAnalytics();
});

function InitAnalytics(){

	// Check for old IE
	if($('html').hasClass('lte-ie9')) {
		// Store initial tab state
		var startOption = $('#resources-select option:selected');
		TrackEvent('Discovery','Initial Tab',startOption,1);
		
		// Loading a different tab
		$('#resources-select').change(function(){
			var optTarget = $('#resources-select option:selected').val();
			switch (optTarget) {
				case 'option-1':
					optTarget = 'Articles, e-books, & more';
					intValue = 1;
					break;
				case 'option-2':
					optTarget = 'E-journals & databases';
					intValue = 2;
					break;
				case 'option-3':
					optTarget = 'Books & more at MIT';
					intValue = 3;
					break;
				case 'option-4':
					optTarget = 'Books & more worldwide';
					intValue = 4;
					break;
				case 'option-5':
					optTarget = 'Course reserves';
					intValue = 5;
					break;
				case 'option-6':
					optTarget = 'Site search';
					intValue = 6;
					break;
				default:
					optTarget = 'Unknown option';
					intValue = 7;
					break;
			}
			TrackEvent('Discovery','Tab',optTarget,intValue);
		});
	}
	// All other browsers
	else {
		var startOption = $('#resources li').attr('data-target');
		TrackEvent('Discovery','Initial Tab',startOption,1);

		// Loading a different tab
		// Using custom event from search.js
		$('#resources').on('option-change', function(){
			var optTarget = $('#resources li.active').attr('data-target');
			switch (optTarget) {
				case 'bartonplus':
					optTarget = 'Articles, e-books, & more';
					intValue = 1;
					break;
				case 'vera':
					optTarget = 'E-journals & databases';
					intValue = 2;
					break;
				case 'barton':
					optTarget = 'Books & more at MIT';
					intValue = 3;
					break;
				case 'worldcat':
					optTarget = 'Books & more worldwide';
					intValue = 4;
					break;
				case 'course-reserves':
					optTarget = 'Course reserves';
					intValue = 5;
					break;
				case 'site-search':
					optTarget = 'Site search';
					intValue = 6;
					break;
				default:
					optTarget = 'Unknown option';
					intValue = 7;
					break;
			}
			TrackEvent('Discovery','Tab',optTarget,intValue);
		});
	}

	// Submitting a search form
	$('#search-main form').on('submit', function(e) {
		var thisForm, strSearchString, intValue, strOption, strAltSearchString, strSearchType, strArticles;
		intValue = -1;
		thisForm = $(this).attr('id');
		switch (thisForm) {

			case 'bartonplus':
				intValue = 100; // fallback value - shouldn't be needed
				strSearchString = $('#search-main input.active').val();
				strSearchType = $('#search-main select.active option:selected').val();
				switch (strSearchType) {
					case 'TI ':
						// Title search
						intValue = 106;
						strSearchString = 'a2_'+strSearchString;
						break;
					case 'AU ':
						// Author search
						intValue = 115;
						strSearchString = 'a3_'+strSearchString;
						break;
					default:
						// Keyword search (default)
						intValue = 101;
						strSearchString = 'a1_'+strSearchString;
						break;
				}
				break;

			case 'vera':
				strSearchString = $('#search-main input.active').val();
				intValue = 200; // fallback value - shouldn't be needed
				strSearchType = $('#search-main form.active input[name="param_textSearchType_value"]:checked').val();
				switch(strSearchType) {
					case 'contains':
						intValue = 201;
						strSearchString = 'b1_ '+strSearchString;
						break;
					case 'startsWith':
						intValue = 208;
						strSearchString = 'b2_ '+strSearchString;
						break;
					case 'exactMatch':
						intValue = 216;
						strSearchString = 'b3_ '+strSearchString;
						break;
					default:
						intValue = 200;
						break;
				}
				break;

			case 'barton':
				strSearchString = $('#search-main input.active').val();
				intValue = 300; // fallback value - shouldn't be needed
				strSearchType = $('#search-main form.active input[name="code"]:checked').val();
				switch(strSearchType) {
					case 'scan_TTL':
						intValue = 310;
						strSearchString = 'c2_ '+strSearchString;
						break;
					case 'scan_AUT':
						intValue = 320;
						strSearchString = 'c3_ '+strSearchString;
						break;
					case 'scan_CND':
						intValue = 331;
						strSearchString = 'c4_ '+strSearchString;
						break;
					default:
						intValue = 301;
						strSearchString = 'c1_ '+strSearchString;
						break;
				}
				break;

			case 'worldcat':
				strSearchString = $('#search-main input.active').val();
				intValue = 300; // fallback value - shouldn't be needed
				strSearchType = $('#search-main select.active option:selected').val();
				switch(strSearchType) {
					case 'author':
						intValue = 353;
						strSearchString = 'c6_ '+strSearchString;
						break;
					case 'title':
						intValue = 363;
						strSearchString = 'c7_ '+strSearchString;
						break;
					// Keyword
					default:
						intValue = 343;
						strSearchString = 'c5_'+strSearchString;
						break;
				}
				break;

			case 'course-reserves':
				strSearchString = $('#search-main input.active').val();
				intValue = 400; // fallback value - shouldn't be needed
				strSearchType = $('#search-main form.active input[name="code"]:checked').val();
				switch(strSearchType){
					case 'find_WIN':
						intValue = 414;
						strSearchString = 'd2_ '+strSearchString;
						break;
					case 'find_WOU':
						intValue = 428;
						strSearchString = 'd3_ '+strSearchString;
						break;
					default:
						intValue = 401;
						strSearchString = 'd1_ '+strSearchString;
						break;
				}
				break;

			case 'site-search':
				strSearchString = $('#search-main input.active').val();
				intValue = 501;
				strSearchString = 'f1_'+strSearchString;
				break;

		}
		TrackEvent('Discovery', 'Search', strSearchString, intValue);
		// return false;
	});
}

function TrackEvent(Category,Action,Label,Value){
	ga('send', {
		hitType: 'event',
		eventCategory: Category,
		eventAction: Action,
		eventLabel: Label,
		eventValue: Value
	});
	// alert('Click tracked: C'+Category+' _ A'+Action+' _ L'+Label+' _ V'+Value);
}

function showSubmitted(formname){
	// Used only for debugging - not in production
	$("form#"+formname+" :input").each(function(index, elm){
		alert(index+' | '+elm.name+' | '+elm.value);
	});	
}

// Loads alert-level posts on the top of all pages
function filterAlerts(posts) {
	// This processes an array of posts for valid, confirmed, alerts
	var filtered = [],
		post,
		post_meta,
		i;

	// For each post...
	for (i = 0; i < posts.length; i++) {
		post = posts[i];

		// If the post has no meta fields, skip it.
		if ( ! $(post.meta).length ) {
			continue;
		}

		// If post is not flagged, and confirmed, as an alert, skip it.
		if ( ! ($(post.meta.alert).length && true === post.meta.alert && true === post.meta.confirm_alert ) ) {
			continue;
		}

		// If user has already dismissed this alert, skip it.
		if (Modernizr.localstorage) {
			if ( 'true' === localStorage.getItem('alert_closed-' + post.id) ) {
				continue;
			}
		}

		// Still here? Add post to list for processing.
		filtered.push(post);

	};

	return filtered;
}

// This is needed because, for some reason, the hours screen uses a navigation
// element that is absolutely positioned. Thus, as alerts are added or closed,
// we need to explicitly reposition that element.
function moveCalendar(stepSize) {
	if ( ! $('.gldp-default').position() ) {
		return;
	}
	oldTop = $('.gldp-default').position().top;
	$('.gldp-default').animate({top: oldTop + stepSize});
}

function renderAlert(markup,id) {
	// Append the template
	$(markup).prependTo('.wrap-page');
	// Remove the necessary transition class with a timeout, so that the animation shows.
	setTimeout(function() {
		$('.posts--preview--alerts').removeClass('transition-vertical--hide');
	}, 300);
}

function setClosable(alert_ID) {
	// Add a Close icon/svg/button
	$('.posts--preview--alerts .post').append('<a href="#0" id="close" class="action-close"><span class="sr">Dismiss</span><i class="icon-remove-sign" aria-hidden="true"></i></a>');
	// On click
	$('#close').click(function(){
		// Add the necessary transition hide class
		$(this).closest('.posts--preview--alerts').addClass('transition-vertical--hide');
		// Bump the hours calendar down, if it is present.
		moveCalendar(-152);
		// If localStorage
		if (Modernizr.localstorage) {
			// Set the localStorage item, using the post ID
			localStorage.setItem('alert_closed-' + alert_ID, 'true');
		}
	});
}

function showAlerts(json) {
	var alert_posts_arr = [],
		alert_ID,
		alert_title,
		alert_template;

	alert_posts_arr = filterAlerts(json)

	// If there is an alert post
	if ( ! alert_posts_arr.length) {
		return
	}

	for (i = 0; i < alert_posts_arr.length; i++) {
		// Alert post ID
		alert_ID = alert_posts_arr[i].id;

		// Check for empty title
		alert_title = ('' === alert_posts_arr[i].title.rendered) ? 'Alert!' : alert_posts_arr[i].title.rendered;

		// Alert HTML template
		alert_template = '<div class="posts--preview--alerts transition-vertical transition-vertical--hide">' +
			'<div class="post alert--critical flex-container">' +
				'<i class="icon-exclamation-sign" aria-hidden="true"></i>' +
				'<div class="content-post alertText">' +
					'<h3>' + alert_title + '</h3> ' + alert_posts_arr[i].content.rendered +
				'</div>' +
			'</div>' +
		'</div>';

		renderAlert(alert_template,alert_ID);

		// If this is a closable alert
		if (true === alert_posts_arr[i].meta.closable) {
			setClosable(alert_ID);
		}
	}

	// Bump the hours calendar down, if it is present.
	moveCalendar(alert_posts_arr.length * 152);

}

$(function(){

	// This retrieves a list of posts, with additional parsing to determine if
	// any are displayable alerts.
	$.getJSON('/wp-json/wp/v2/posts')
		.done(function(data){
			showAlerts(data);
		});

});

var MTUserId='c94e9ea3-f77e-49c0-b38b-89b132d7e38d';
var MTFontIds = new Array();

MTFontIds.push("825376"); // Neue Haas Grotesk™ Text W01 Text 55 Roman 
MTFontIds.push("825379"); // Neue Haas Grotesk™ Text W01 Text 56 Italic 
MTFontIds.push("825382"); // Neue Haas Grotesk™ Text W01 Text 65 Medium 
MTFontIds.push("825385"); // Neue Haas Grotesk™ Text W01 Text 66 Medium Italic 
MTFontIds.push("825388"); // Neue Haas Grotesk™ Text W01 Text 75 Bold 
MTFontIds.push("825391"); // Neue Haas Grotesk™ Text W01 Text 76 Bold Italic 
MTFontIds.push("825400"); // Neue Haas Grotesk™ Display W01 Display 25 Thin 
MTFontIds.push("825424"); // Neue Haas Grotesk™ Display W01 Display 65 Medium 
MTFontIds.push("825430"); // Neue Haas Grotesk™ Display W01 Display 75 Bold 
MTFontIds.push("825436"); // Neue Haas Grotesk™ Display W01 Display 95 Black 
MTFontIds.push("5548918"); // Neue Haas Grotesk™ Display W01 Display 15 Ultra Thin 
MTFontIds.push("5548925"); // Neue Haas Grotesk™ Display W01 Display 16 Ultra Thin Italic 
MTFontIds.push("5548941"); // Neue Haas Grotesk™ Display W01 Display 26 Thin Italic 
MTFontIds.push("5548948"); // Neue Haas Grotesk™ Display W01 Display 35 Extra Light 
MTFontIds.push("5548955"); // Neue Haas Grotesk™ Display W01 Display 36 Extra Light Italic 
MTFontIds.push("5548962"); // Neue Haas Grotesk™ Display W01 Display 45 Light 
MTFontIds.push("5548969"); // Neue Haas Grotesk™ Display W01 Display 46 Light Italic 
MTFontIds.push("5548977"); // Neue Haas Grotesk™ Display W01 Display 56 Italic 
MTFontIds.push("5548992"); // Neue Haas Grotesk™ Display W01 Display 66 Medium Italic 
MTFontIds.push("5549007"); // Neue Haas Grotesk™ Display W01 Display 76 Bold Italic 
MTFontIds.push("5549021"); // Neue Haas Grotesk™ Display W01 Display 96 Black Italic 
MTFontIds.push("5549029"); // Neue Haas Grotesk™ Display W01 Display 55 Roman 

(function() {
	var mtTracking = document.createElement('script');
	mtTracking.type='text/javascript';
	mtTracking.async='true';
	mtTracking.src='/wp-content/themes/libraries/libs/FontShop/mtiFontTrackingCode.js';

	(document.getElementsByTagName('head')[0]||document.getElementsByTagName('body')[0]).appendChild(mtTracking);
})();
