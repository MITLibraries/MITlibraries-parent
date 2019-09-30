(function($) {
jQuery(document).ready(function() {
    // If cookie is set, scroll to the position saved in the cookie.
    if ( $.cookie("scroll") !== null ) {
        jQuery(document).scrollTop( $.cookie("scroll") );
    }
    // When a button is clicked...
    jQuery('#hourNav a').on("click", function() {
        // Set a cookie that holds the scroll position.
        $.cookie("scroll", jQuery(document).scrollTop() );
    });
});
})(jQuery);