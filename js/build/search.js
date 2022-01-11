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
