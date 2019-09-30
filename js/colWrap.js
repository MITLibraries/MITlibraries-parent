jQuery(function(){
	// Set vars for column content
	var colOne = jQuery('.col-1').nextUntil('.col-2').addBack();
	var colTwo = jQuery('.col-2').nextAll().addBack();

	// Append new divs that will take the column content
	jQuery('.wrap').append('<div class="column-first group" /><div class="column-second ground" />');

	// Append column content to new divs
	jQuery(colOne).appendTo('.column-first');
	jQuery(colTwo).appendTo('.column-second');

	// Get the .wrap height after all this is done
	var wrapOuter = jQuery('.wrap').outerHeight();

	// Calc .wrap height without any content
	var itemOuter = jQuery('.col-1').outerHeight();
	var wrapHeight = wrapOuter-itemOuter;

	// Calc height of each col
	for (var i = 0; i < jQuery('.col-1').length; i++) {
	  var eachCol = jQuery('.col-1').outerHeight();
	  var colHeight = eachCol*i;
	}  

	// Add the heights
	jQuery('.wrap').height(colHeight+wrapHeight);
});