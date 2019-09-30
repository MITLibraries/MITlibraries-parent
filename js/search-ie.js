function oldIESearch() {
	// Old IE class
	var oldIE = jQuery('html').hasClass('lte-ie9');
	// Check for old IE
	if (oldIE) {
		// Remove ul#resources and div.selected
		jQuery('#resources, .wrap-select--resources .selected').remove();
		// Append a select menu
		jQuery('.wrap-select--resources').append('<select id="resources-select"></select');
		// New select menu options
		jQuery('#resources-select')
			.append('<option value="option-1">Articles, e-books, &amp; more</option>')
			.append('<option value="option-2">E-Journals &amp; databases</option>')
			.append('<option value="option-3">Books &amp; more at MIT</option>')
			.append('<option value="option-4">Books &amp; more worldwide</option>')
			.append('<option value="option-5">Course Reserves</option>')
			.append('<option value="option-6">Site Search</option>');
		jQuery('#resources-select').change(function(){
			// Hide all forms on option change
			jQuery('#search-main form').removeClass('input-submit active');
			// Hide all inputs on option change
			jQuery('#search-main input').removeClass('active');
			// Get the selected val...
			var selectedVal = jQuery('#resources-select option:selected').val();
			// ...and show the corresponding form
			jQuery('#search-main input.'+selectedVal).parent().addClass('active input-submit');
			// ...and active input
			jQuery('#search-main input.'+selectedVal).addClass('active');
			// Repeat for keyword selects
			jQuery('.keywords').parent().removeClass('active');
			jQuery('.keywords').removeClass('active');
			jQuery('#search-main .keywords.'+selectedVal).addClass('active');
			jQuery('#search-main .keywords.'+selectedVal).parent().addClass('active');
			// Trigger option-change (better to use callback function?)
			//jQuery(this).trigger('option-change');
			// Advanced search
			var searchSelected = jQuery('#resources li.active').attr('data-target');
			jQuery('#search-main a.search-advanced').removeClass('active');
			jQuery('#search-main a.search-advanced.'+searchSelected).addClass('active');
		});
	}
	else {
		return;
	}
}
// Run
jQuery(function(){
	oldIESearch();
});