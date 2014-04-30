$(function(){

	// Top-level menu items
	var topLinks = $('#menu-primary > li');

	// Add item-[number] class to each top link
	$(topLinks).each(function(i) {
		i = i+1;
		$(this).addClass('link-primary-' + i);
	});

});
