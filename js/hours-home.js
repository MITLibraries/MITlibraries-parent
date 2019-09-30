//
// Hours
//

jQuery(document).on('click', '.hours-locations .show-more', function(){
	var all = jQuery(this).parent();
	var hiddenLocs = jQuery(all).children('.hidden-mobile');
	jQuery(this).addClass('inactive').trigger('more-locs');
});

jQuery(document).on('more-locs', function(){
	jQuery('.hours-locations .show-more').hide(100);
	jQuery('.hours-locations .hidden-mobile').removeClass('hidden-mobile').removeClass('inactive-mobile');
});

//
// Location Images
//
jQuery(function(){
	jQuery('.img-loc').css('background-image', 'url(/wp-content/themes/libraries/images/locations-sprite-74.png)').trigger('image-ready');
});