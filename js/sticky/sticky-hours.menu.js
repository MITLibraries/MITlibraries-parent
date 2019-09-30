(function($) {
jQuery(document).ready(function(){
    jQuery("#hourNav").sticky({
    	topSpacing: 0,
    	className: 'isSticky',
    	getWidthFrom:'.content-page'
    	});
});
})(jQuery);