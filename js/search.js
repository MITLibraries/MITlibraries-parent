//
// Search
//

jQuery(function(){

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
		formState.resource = jQuery("#resources").children("."+formState.tool).attr('data-option');

		return formState;
	}

	// Mimic a <select> element with a <ul>
	jQuery('#resources').on('click', 'li', function(event) {
		// All available resources	
		var resourcesAll = jQuery('#resources li');
		// Cancel if the li has a link in it
		if (jQuery(this).hasClass('has-link')) {
			return;
		}
		else {
			// To show or hide the parent <ul>
			jQuery(this).parent().toggleClass('active');
			// Remove active class from any <li> that has it...
			jQuery(resourcesAll).removeClass('active');
			// And add the class to the <li> that gets clicked
			jQuery(this).toggleClass('active');
			
			// Get the main text of the currently selected <li>
			var selectedText = jQuery('#resources li.active .main').text();
			// Show this text above the dropdown (when active), along with select arrows SVG, mimicing a <select>
			if (jQuery('#resources').hasClass('active')) {
				// Open
				jQuery('.wrap-select--resources .selected').text(selectedText).append('<svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="8.071px" height="14px" viewBox="0 0 8.071 14" enable-background="new 0 0 8.071 14" xml:space="preserve" class="select-arrows"><path d="M0.069 8.74c0.08-0.159 0.252-0.264 0.436-0.274 0.023 0 1.743-0.104 3.531-0.104s3.508 0.104 3.53 0.104C7.751 8.476 7.911 8.581 8.003 8.74c0.092 0.161 0.092 0.356 0 0.517 -1.364 2.431-3.508 4.517-3.6 4.598 -0.206 0.194-0.528 0.194-0.734 0 -0.091-0.081-2.235-2.167-3.6-4.598C-0.023 9.096-0.023 8.901 0.069 8.74M8.003 5.259c-0.08 0.16-0.252 0.264-0.437 0.275 -0.022 0-1.742 0.103-3.53 0.103S0.528 5.535 0.505 5.535C0.321 5.523 0.161 5.419 0.069 5.259c-0.092-0.161-0.092-0.355 0-0.516 1.365-2.431 3.508-4.517 3.6-4.598 0.206-0.194 0.528-0.194 0.734 0 0.092 0.081 2.235 2.167 3.6 4.598C8.095 4.904 8.095 5.099 8.003 5.259"></path></svg>').addClass('active');
			}
			// Remove the text when the dropdown is closed
			else {
				// Closed
				jQuery('.wrap-select--resources .selected').text('').removeClass('active');
				// Remove any input text
				jQuery('#search-main input').val('');
				jQuery(this).trigger('search-change');
			}
			// // Get the class of the selected resource
			// var searchSelected = jQuery('#resources li.active').attr('data-target');
			// // Apply this class, as an id, to the form.
			// jQuery('#search-main form').attr('id', searchSelected);
		}
	});

	// Close the faux select menu when clicking outside it 
	jQuery(document).on('click', function(event){
		if(!jQuery('#resources.active').has(event.target).length == 0) {
			return;
		}
		else {
			jQuery('#resources').removeClass('active');
			jQuery('#search-main .selected').removeClass('active').text('');
		}
		searchBySwitch();
	});
	
	// Placeholder text changes
	function searchBy() {
		var optionSelected = jQuery('#search-main select.active option:selected').val();
		if (jQuery('#bartonplus.active').length) {
			if(optionSelected == '') {
				jQuery('input.active').attr('placeholder', 'ex: carbon nanotubes');
			}
			if(optionSelected == 'TI ') {
				jQuery('input.active').attr('placeholder', 'ex: freakonomics');
			}
			if(optionSelected == 'AU ') {
				jQuery('input.active').attr('placeholder', 'ex: noam chomsky');
			}
		}
		if (jQuery('#vera.active').length) {
			if(optionSelected == 'contains') {
				jQuery('input.active').attr('placeholder', 'ex: new eng j of med');
			}
			if(optionSelected == 'startsWith') {
				jQuery('input.active').attr('placeholder', 'ex: journal of cell biology');
			}
			if(optionSelected == 'exactMatch') {
				jQuery('input.active').attr('placeholder', 'ex: web of science');
			}
		}
		if (jQuery('#barton.active').length) {
			if(optionSelected == 'find_WRD') {
				jQuery('input.active').attr('placeholder', 'ex: game design');
			}
			if(optionSelected == 'scan_TTL') {
				jQuery('input.active').attr('placeholder', 'ex: introduction to fluid mechanics');
			}
			if(optionSelected == 'scan_AUT') {
				jQuery('input.active').attr('placeholder', 'ex: shakespeare william');
			}
			if(optionSelected == 'scan_CND') {
				jQuery('input.active').attr('placeholder', 'ex: ta405.t5854');
			}
		}
		if (jQuery('#worldcat.active').length) {
			if(optionSelected == 'keyword') {
				jQuery('input.active').attr('placeholder', 'ex: carbon nanotubes');
			}
			if(optionSelected == 'author') {
				jQuery('input.active').attr('placeholder', 'ex: william shakespeare');
			}
			if(optionSelected == 'title') {
				jQuery('input.active').attr('placeholder', 'ex: introduction to fluid mechanics');
			}
		}
		if (jQuery('#course-reserves.active').length) {
			if(optionSelected == 'scan_CNB') {
				jQuery('input.active').attr('placeholder', 'ex: 21F.108');
			}
			if(optionSelected == 'find_WIN') {
				jQuery('input.active').attr('placeholder', 'ex: cohen');
			}
			if(optionSelected == 'find_WOU') {
				jQuery('input.active').attr('placeholder', 'ex: introduction chemistry');
			}
		}
	}

	function searchBySwitch() {
		// Get the value of the active "search-by" option
		var optionSelected = jQuery('#search-main select.active option:selected').val();
		// Change the value on select change
		jQuery('#search-main select.active').change(function(){
			var optionSelected = jQuery('#search-main select.active option:selected').val();
			searchBy();
			// Remove any input text
			//jQuery('#search-main input').val('');
		});

	}

	// Handles hidden fields
	function hiddenFields() {
		// Get the value of the "search by" select element
		var selectVal = jQuery('#search-main select.active').val();
		// Remove any hidden fileds
		jQuery('#search-main form .hidden-fields').html('');
		// Add hidden fields, respective of search selected
		if (jQuery('#bartonplus.active').length) {
			jQuery('#bartonplus .hidden-fields')
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
		if(jQuery('#vera.active').length) {
			jQuery('#vera .hidden-fields')
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
				jQuery('#vera').append('<input type="radio" name="param_textSearchType_value" id="contains" value="contains" checked="checked" class="radio" />');
			}
			if (selectVal == 'startsWith') {
				jQuery('#vera').append('<input type="radio" name="param_textSearchType_value" id="startsWith" value="startsWith" class="radio" checked="checked" />');
			}
			if (selectVal == 'exactMatch') {
				jQuery('#vera').append('<input type="radio" name="param_textSearchType_value" id="exactMatch" value="exactMatch" class="radio" checked="checked" />');
			}
		}
		if(jQuery('#barton.active').length) {
			jQuery('#barton').append("<input type='hidden' name='func' value='scan'/>");
			// Keyword search
			if (selectVal == 'find_WRD') {
				jQuery('#barton').append('<input type="radio" name="code" id="bartonkeyword" value="find_WRD" checked="checked" class="radio" />');
			}
			// Title search
			if (selectVal == 'scan_TTL') {
				jQuery('#barton').append('<input type="radio" name="code" id="bartontitle" value="scan_TTL" class="radio" checked="checked" />');
			}
			// Author search
			if (selectVal == 'scan_AUT') {
				jQuery('#barton').append('<input type="radio" name="code" id="bartonauthor" value="scan_AUT" class="radio" checked="checked" />');
			}
			// Call number search
			if (selectVal == 'scan_CND') {
				jQuery('#barton').append('<input type="radio" name="code" id="bartoncallnumber" value="scan_CND" class="radio" checked="checked" />');
			}
		}
		// Worldcat
		if(jQuery('#worldcat.active').length) {
			jQuery('#worldcat .hidden-fields')
				.append("<input type='hidden' name='qt' value='wc_org_mit'/>")
				.append("<input type='hidden' name='qt' value='affiliate'/>");
		}
		// Course reserves
		if(jQuery('#course-reserves.active').length) {
			jQuery('#course-reserves .hidden-fields')
				.append("<input type='hidden' name='func' value=''/>");
			// Course number search
			if(selectVal == 'scan_CNB') {
				jQuery('#course-reserves').append('<input name="code" id="coursenumber" value="scan_CNB" checked="checked" type="radio" class="radio" />');
			}
			// Instructor keyword search
			if(selectVal == 'find_WIN') {
				jQuery('#course-reserves').append('<input name="code" id="instructorkeyword" value="find_WIN" type="radio" class="radio" checked="checked" />');
			}
			if(selectVal == 'find_WOU') {
				jQuery('#course-reserves').append('<input name="code" id="coursenamekeyword" value="find_WOU" type="radio" class="radio" checked="checked" />');
			}
		}
		// Site Search
		if(jQuery('#site-search.active').length) {
			jQuery('#site-search .hidden-fields')
				.append('<input type="hidden" name="cx" value="016240528703941589557:i7wrbu9cdxu" />')
				.append('<input type="hidden" name="ie" value="UTF-8" />');
		}
	}

	// This is the initial setup of the search UI, along the lines of what was loaded from localstorage
	function initSearchUI(state) {
		resetSearchUI();

		// Faked select box
		jQuery('#resources li').removeClass('active');
		// Refine select
		jQuery('#search-main .keywords.'+state.tool).val(state.refine);

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
		jQuery('#search-main form').removeClass('input-submit active');
		// Hide all inputs on option change
		jQuery('#search-main input').removeClass('active');
		// Repeat for keyword selects
		jQuery('.keywords').parent().removeClass('active');
		jQuery('.keywords').removeClass('active');
		jQuery('#search-main a.search-advanced').removeClass('active');
	}

	function readToolState() {
		// This looks at the faked selection UI, #resources, and reports back what is active 
		var state = {};
		// Get the value of the selected option...
		state.resource = jQuery('#resources li.active').attr('data-option');
		// Advanced search
		// toolname - was .search
		state.tool = jQuery('#resources li.active').attr('data-target');
		return state;
	}

	function readRefineState() {
		return jQuery('#search-main select.active option:selected').val();
	}

	// This adds 'active' classes on the three relevant parts of the search
	// interface: tool, refine, and advanced search link. The placeholder text
	// is changed after this function
	function setSearchState(state) {
		// Faked select box
		jQuery('#resources li.'+state.tool).addClass('active');
		// Tool
		jQuery('#search-main input.'+state.tool).parent().addClass('active input-submit');
		jQuery('#search-main input.'+state.tool).addClass('active');
		// Refine
		jQuery('#search-main .keywords.'+state.tool).addClass('active');
		jQuery('#search-main .keywords.'+state.tool).parent().addClass('active');
		// Advanced search
		jQuery('#search-main a.search-advanced.'+state.tool).addClass('active');

		// Trigger option-change (better to use callback function?)
		// jQuery(this).trigger('option-change');
		searchBySwitch();
		return state;
	}

	function updateSearchUI() {
		resetSearchUI();

		state = readToolState();

		setSearchState(state);
	}

	// Handles the toggling of forms
	jQuery('#search-main').on('click', '#resources', function(event){
		updateSearchUI();
	});

	// Run searchBy on option-change event
	jQuery('#search-main').on('option-change', function(){
		searchBySwitch();
		searchBy();
	});

	// On form submit
	jQuery('#search-main form').on('submit', function(){
		saveFormState();
		// Remove added inputs
		jQuery('#search-main input[type="hidden"], #search-main input[type="radio"]').remove();
		// Get the query entered...
		var searchQuery = jQuery('input.active', this).val();
		if (searchQuery == '') {
			// Show alert if no search term is entered
			alert('Please enter a search term.');
			// Is this proper?
			return false;
		}
		else {
		// Get the value of the "search by" select element
		var selectVal = jQuery('#search-main select.active').val();
		var splitOptions = '';
			// Barton...
			if (jQuery('#bartonplus.active').length) {
				// Set the correct action for the BartonPlus form
				jQuery('#bartonplus')
					.attr('action', 'https://search.ebscohost.com/login.aspx')
					.attr('method', 'get')
					.attr('target', '_top');
				// Add hidden fields
				hiddenFields();
				// Add search query to the bquery value, along with the select val, which sends it along to EDS
				jQuery('input[name="bquery"]', this).val((selectVal+searchQuery).replace(/"/g, '&quot;'));
			}
			// Vera...
			if (jQuery('#vera.active').length) {
				// Vera actions
				jQuery('#vera')
					.attr('action', 'https://owens.mit.edu/sfx_local/az/mit_all')
					.attr('name', 'az_user_form')
					.attr('method', 'get')
					.attr('accept-charset', 'UTF-8')
					.addClass('searchform');
				// Add hidden fields
				hiddenFields();
				// Add the query val
				jQuery('input.active', this)
					.attr('name','param_pattern_value')
					.attr('id','param_pattern_value')
					.addClass('searchtext')
					.val(searchQuery);
			}
			// Barton
			if(jQuery('#barton.active').length) {
				// Split the query
				splitOptions = selectVal.split('_');
				jQuery('#barton')
					.addClass('searchform')
					.attr('action', 'https://library.mit.edu/F/')
					.attr('name', 'booksearch')
					.attr('method', 'get');

				// Add hidden fields
				hiddenFields();
				jQuery('input.active', this)
					.attr('name', 'request')
					.attr('type', 'text')
					.attr('id', 'bookrequest')
					.val(searchQuery);
				// Set the val of the checked option
				jQuery('#barton input[name = "code"]:checked').val(splitOptions[1]);
				// What is F8?
				if ( splitOptions[0] == "find" || splitOptions[0] == "F8" ) {
					jQuery("#barton .hidden-fields").append("<input type='hidden' name='func' value='find-b'/>");
					jQuery("#barton input[name = 'code']").attr("name","find_code");
				}
				else {
					jQuery("#barton .hidden-fields").append("<input type='hidden' name='func' value='scan'/>");
					jQuery("#barton input[name = 'code']").attr("name","scan_code");
					jQuery("#barton input.searchtext").attr("name","scan_start");
				}
			}
			// Worldcat
			if(jQuery('#worldcat.active').length) {
				jQuery(this).attr('action', 'https://mit.worldcat.org/search');
				// Add hidden fields
				hiddenFields();
				jQuery('input.active', this).attr('method','get');
				if (selectVal == 'keyword') {
					jQuery('input.active', this)
						.attr("name","q")
						.val(searchQuery);
				}
				if (selectVal == 'author') {
					searchQuery = 'au:'+jQuery('input.active', this).val();
					jQuery('#worldcat.active').append('<input type="hidden" name="q" value="'+searchQuery+'" />');
				}
				if (selectVal == 'title') {
					searchQuery = 'ti:'+jQuery('input.active', this).val();
					jQuery('#worldcat.active').append('<input type="hidden" name="q" value="'+searchQuery+'" />');
				}
			}
			// Course Reserves
			if(jQuery('#course-reserves.active').length) {
				jQuery('#course-reserves')
					.addClass('searchform')
					.addClass('barton')
					.attr('action', 'https://library.mit.edu/F/')
					.attr('method', 'get')
					.attr('name', 'getInfo');
				jQuery('input.active', this)
					.attr('name', 'request')
					.val(searchQuery);
				// Add hidden fields
				hiddenFields();
				// Split the query
				splitOptions = selectVal.split('_');
				jQuery("#course-reserves input[name = 'code']:checked").val(splitOptions[1]);
				jQuery("#course-reserves .hidden-fields").append("<input type='hidden' name='local_base' value='u-mit30'/>");
				if (splitOptions[0] == "find") {	
					jQuery("#course-reserves .hidden-fields input[name = 'func']").val("find-b");
					jQuery("#course-reserves input[name = 'code']").attr("name","find_code");
				} else {
					jQuery("#course-reserves .hidden-fields input[name = 'func']").val("scan");
					jQuery("#course-reserves input[name = 'code']").attr("name","scan_code");
					jQuery("#course-reserves input[name = 'request']").attr("name","scan_start");
				};
			}
			// Site Search
			if(jQuery('#site-search.active').length) {
				jQuery(this)
					.attr('action', 'https://www.google.com/cse');
				hiddenFields();
				jQuery('input.active', this)
					.attr('name', 'q')
					.val(searchQuery);
				jQuery('button', this)
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