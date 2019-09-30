jQuery(function(){
	$('#menu--toggle').click(function(){
		$(this).toggleClass('active');
		$(this).next().toggleClass('active');
		console.log('clicked');
		if ($(this).hasClass('active')) {
			$(this).text('Hide Menu');
		}
		else {
			$(this).text('View Menu');
		}
	});
});

// why are there two of these toggles?
jQuery('header .menu--toggle').click(function(){
	$('#nav-main').toggleClass('active');
	$('.wrap-page').toggleClass('mobile-nav-active');
});


jQuery( '.link-primary' ).bind( "mouseenter", function() {
	$( '.link-primary' ).removeClass( 'open' );
	$(this).find( '.menu-control' ).attr( 'aria-expanded', 'true' );
	$(this).closest( '.link-primary' ).addClass( 'open' );
});
jQuery( '.link-primary' ).bind( "mouseleave", function() {
	$(this).find( '.menu-control' ).attr( 'aria-expanded', 'false' );
	$( '.link-primary' ).removeClass( 'open' );
});

// make esc close all menus
jQuery( '#nav-main' ).on( 'keydown' , function(e) {
	if (e.keyCode == 27) {
		hideMenu(e);
	}
});

function hideMenu() {
	$( '.link-primary' ).removeClass( 'open' );
	$( '.menu-control' ).attr('aria-expanded', 'false');
	$( '.links-sub' ).attr( 'aria-hidden', 'true' );
}

// thanks to http://heydonworks.com/practical_aria_examples/
jQuery('.main-nav-header').each(function() {

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
