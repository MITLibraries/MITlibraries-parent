$(document).ready(function() {
	InitAnalytics();
});

function InitAnalytics(){

	// Store initial tab state
	var startTab = $('li.ui-tabs-selected a').text();
	TrackEvent('Discovery','Initial Tab',startTab,1);

	// Loading a different tab
	$("ul#mitlibrarysearchnav a").click(function() {
		var intPos = this.href.indexOf("#");
		var tabTarget = this.href.substring(intPos+1);
		switch (tabTarget) {
			case 'tab_start':
				tabTarget = 'Start your search';
				intValue = 1;
				break;
			case 'tab_ejournals':
				tabTarget = 'E-journals & databases';
				intValue = 2;
				break;
			case 'tab_books':
				tabTarget = 'Books & media';
				intValue = 3;
				break;
			case 'tab_coursereserves':
				tabTarget = 'Course Reserves';
				intValue = 4;
				break;
			case 'tab_more':
				tabTarget = 'More search options';
				intValue = 5;
				break;
			default:
				tabTarget = 'Unknown tab';
				intValue = 6;
				break;
		}
		TrackEvent('Discovery','Tab',tabTarget,intValue);
	});

	// Clicking a sidebar link
	$("div.mitlibrarysearchoptions a").click(function() {
		TrackEvent('Discovery','Sidebar',this.href,1);
	});

	// Clicking a "what am I searching" link
	$("div.whatami a.panel").click(function() {
		var Eform = $(this).parents(".mitlibrarysearchtabcontent").attr("id");
		TrackEvent('Discovery','Panel Toggle',Eform,1);
	});

	$("div.whatami table a").click(function() {
		var strLinkText = $(this).text();
		TrackEvent('Discovery','Panel Resource',strLinkText,1);
	});

	// Submitting a search form
	$('form.searchform').submit(function(e) {
		var thisForm, strSearchString, intValue, strOption, strAltSearchString, strSearchType, strArticles;
		intValue = -1;
		thisForm = $(this).attr('id');
		switch (thisForm) {

			case 'bartonplus':
				intValue = 100; // fallback value - shouldn't be needed
				strSearchString = $('input#bartonrequest').val();
				strSearchType = $('form#bartonplus input[name="r1"]:checked').val();
				strArticles = $('form#bartonplus input[name="articles"]:checked').val();
				switch (strSearchType) {
					case 'TI ':
						// Title search
						if(strArticles=='articles') {
							intValue = 110;
							strSearchString = 'a2e_'+strSearchString;
						} else {
							intValue = 106;
							strSearchString = 'a2_'+strSearchString;
						}
						break;
					case 'AU ':
						// Author search
						if(strArticles=='articles') {
							intValue = 121;
							strSearchString = 'a3e_'+strSearchString;
						} else {
							intValue = 115;
							strSearchString = 'a3_'+strSearchString;
						}
						break;
					default:
						// Keyword search (default)
						if(strArticles=='articles') {
							intValue = 103;
							strSearchString = 'a1e_'+strSearchString;
						} else {
							intValue = 101;
							strSearchString = 'a1_'+strSearchString;
						}
						break;
				}
				break;

			case 'verasearch':
				strSearchString = $('input#param_pattern_value').val();
				intValue = 200; // fallback value - shouldn't be needed
				strSearchType = $('input[name="param_textSearchType_value"]:checked').val();
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

			case 'booksearch':
				strSearchString = $('form#booksearch input#bookrequest').val();
				intValue = 300; // fallback value - shouldn't be needed
				strSearchType = $('form#booksearch input[name="BooksMediaSearch"]:checked').val();
				switch(strSearchType) {
					case 'WorldCat':
						intValue = 343;
						strSearchString = 'c5_'+strSearchString;
						break;
					default:
						strOption = $('form#booksearch input[name="code"]:checked').val();
						switch(strOption) {
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
				}
				break;

			case 'bartoncoursesearch':
				strSearchString = $('input#coursereservesrequest').val();
				intValue = 400; // fallback value - shouldn't be needed
				strSearchType = $('form#bartoncoursesearch input[name="code"]:checked').val();
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

			case 'othersearch':
				strSearchString = $('input#searchtext').val();
				intValue = 500;
				strSearchType = $('input[name="searchTarget"]:checked').val();
				switch(strSearchType){
					case 'dspace':
						intValue = 501;
						strSearchString = 'e1_'+strSearchString;
						break;
					case 'dome':
						intValue = 516;
						strSearchString = 'e2_'+strSearchString;
						break;
					case 'archnet':
						intValue = 532;
						strSearchString = 'e3_'+strSearchString;
						break;
					default:
						break;
				}
				break;

		}
		TrackEvent('Discovery', 'Search', strSearchString, intValue);
		// return false;

	});
}

function TrackEvent(Category,Action,Label,Value){
	_gaq.push(['_trackEvent', Category, Action, Label, Value]);
	// alert('Click tracked: C'+Category+' _ A'+Action+' _ L'+Label+' _ V'+Value);
}

function showSubmitted(formname){
	// Used only for debugging - not in production
	$("form#"+formname+" :input").each(function(index, elm){
		alert(index+' | '+elm.name+' | '+elm.value);
	});	
}
