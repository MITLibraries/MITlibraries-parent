$(function(){
	// Activate hamburger menu on mobile displays.
	// Why are there two of these toggles?
	$('header .menu--toggle').click(function(){
		$('#nav-main').toggleClass('active');
		$('.wrap-page').toggleClass('mobile-nav-active');
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
	// TODO: when the user has NVDA open, this will not work - but menus can
	// still be closed by pressing "enter" on the parent item.
	$( '#nav-main' ).on( 'keydown' , function(e) {
		if (e.keyCode == 27) {
			$( '.link-primary' ).removeClass( 'open' );
			$( '.menu-control' ).attr('aria-expanded', 'false');
			$( '.links-sub' ).attr( 'aria-hidden', 'true' );
		}
	});

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
		$(this).closest( '.link-primary' ).toggleClass( 'open' );
		var state = $(this).attr( 'aria-expanded' ) === 'false' ? true : false;
		$(this).attr( 'aria-expanded', state );
		panel.attr( 'aria-hidden', !state );
	});

});
