(function($) {
$(document).ready(function() {
    // If cookie is set, scroll to the position saved in the cookie.
    if ( $.cookie("scroll") !== null ) {
        $(document).scrollTop( $.cookie("scroll") );
    }
    // When a button is clicked...
    $('#hourNav a').on("click", function() {
        // Set a cookie that holds the scroll position.
        $.cookie("scroll", $(document).scrollTop() );
    });
});
})(jQuery);