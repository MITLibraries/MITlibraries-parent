// Detect keyboard navigation to setup pseudo classes for focus to allow for
// only setting focus for keyboard nav
// https://medium.com/hackernoon/removing-that-ugly-focus-ring-and-keeping-it-too-6c8727fefcd2
// This works in conjunction with adding a focus element for .main-nav-link
// if this `user-is-tabbing` exists on body.
function handleFirstTab(e) {
    if (e.keyCode === 9) { // the "I am a keyboard user" key
        document.body.classList.add('user-is-tabbing');
        window.removeEventListener('keydown', handleFirstTab);
    }
  } 
window.addEventListener('keydown', handleFirstTab);

// Toggle hamburger menu on mobile displays.
$('header .menu--toggle').click(function(){
    // This toggles the aria-hidden value on the mobile menu.
    $("#nav-mobile").attr("aria-hidden", function (i, attr) {
        return (
            "true" === attr ? "false" : "true"
        );
    })
    // These toggle the CSS classes controlling mobile menu visibility.
    $("#nav-mobile").toggleClass('active');
    $('.wrap-page').toggleClass('mobile-nav-active');

    // toggle link visibility (important to keep them out of tabindex until needed)
    $(".mobile-nav-link").toggleClass('hide-mobile-nav-link');
    $(".mobile-nav-link").toggleClass('main-nav-link');
});

// Show or hide the flyout menus on main navigation in response to
// mouseenter / mouseleave
$( '.link-primary' ).bind( "mouseenter", function() {
    $( '.link-primary' ).removeClass( 'open' );
    $(this).find( '.menu-control' ).attr( 'aria-expanded', 'true' );
    $(this).closest( '.link-primary' ).addClass( 'open' );
});
$( '.link-primary' ).bind( "mouseleave", function() {
    $(this).find( '.menu-control' ).attr( 'aria-expanded', 'false' );
    $( '.link-primary' ).removeClass( 'open' );
});

// Make ESC close all menus.
$(document).keyup(function(e) {
    if (e.keyCode === 27) {
        // Close all desktop menu flyouts
        $( '.link-primary' ).removeClass( 'open' );
        $( '.menu-control' ).attr('aria-expanded', 'false');
        $( '.links-sub' ).attr( 'aria-hidden', 'true' );

        // Close mobile menu
        $("#nav-mobile").removeClass('active');
        $('.wrap-page').removeClass('mobile-nav-active');
        $(".mobile-nav-link").addClass('hide-mobile-nav-link');
        $(".mobile-nav-link").removeClass('main-nav-link');
    }
});

// This initializes the ARIA labels for the main navigation.
// thanks to http://heydonworks.com/practical_aria_examples/
$('.main-nav-header').each(function() {

    var $this = $(this);

    // create unique id for a11y relationship
    var id = 'collapsible-' + $( '#nav-main h2' ).index(this);

    // identify panel and make it focusable
    var panel = $(this).next( '.links-sub' ).attr( 'aria-hidden', 'true' ).attr( 'id', id);

    // Add default aria states to button
    $this.children( '.menu-control' ).attr( 'aria-expanded', 'false' ).attr( 'aria-controls', id);
    var button = $this.children( '.menu-control' );

    // Toggle the state properties
    button.on( 'click', function() {

        // first close any currently open flyouts
        $( '.link-primary' ).removeClass( 'open' );
        $( '.menu-control' ).attr('aria-expanded', 'false');
        $( '.links-sub' ).attr( 'aria-hidden', 'true' );

        // now open the appropriate flyout
        $(this).closest( '.link-primary' ).toggleClass( 'open' );
        var state = $(this).attr( 'aria-expanded' ) === 'false' ? true : false;
        $(this).attr( 'aria-expanded', state );
        panel.attr( 'aria-hidden', !state );
    });

});
