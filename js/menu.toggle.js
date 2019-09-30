jQuery(function(){
	jQuery('#menu--toggle').click(function(){
		jQuery(this).toggleClass('active');
		jQuery(this).next().toggleClass('active');
		console.log('clicked');
		if (jQuery(this).hasClass('active')) {
			jQuery(this).text('Hide Menu');
		}
		else {
			jQuery(this).text('View Menu');
		}
	});
});

// why are there two of these toggles?
jQuery('header .menu--toggle').click(function(){
	jQuery('#nav-main').toggleClass('active');
	jQuery('.wrap-page').toggleClass('mobile-nav-active');
});


jQuery( '.link-primary' ).bind( "mouseenter", function() {
	jQuery( '.link-primary' ).removeClass( 'open' );
	jQuery(this).find( '.menu-control' ).attr( 'aria-expanded', 'true' );
	jQuery(this).closest( '.link-primary' ).addClass( 'open' );
});
jQuery( '.link-primary' ).bind( "mouseleave", function() {
	jQuery(this).find( '.menu-control' ).attr( 'aria-expanded', 'false' );
	jQuery( '.link-primary' ).removeClass( 'open' );
});

// make esc close all menus
jQuery( '#nav-main' ).on( 'keydown' , function(e) {
	if (e.keyCode == 27) {
		hideMenu(e);
	}
});

function hideMenu() {
	jQuery( '.link-primary' ).removeClass( 'open' );
	jQuery( '.menu-control' ).attr('aria-expanded', 'false');
	jQuery( '.links-sub' ).attr( 'aria-hidden', 'true' );
}

// thanks to http://heydonworks.com/practical_aria_examples/
jQuery('.main-nav-header').each(function() {

	var $this = jQuery(this);

	// create unique id for a11y relationship
	var id = 'collapsible-' + jQuery( '#nav-main h2' ).index(this);

	// identify panel and make it focusable
	var panel = jQuery(this).next( '.links-sub' ).attr( 'aria-hidden', 'true' ).attr( 'id', id);

	// Add default aria states to button
	$this.children( '.menu-control' ).attr( 'aria-expanded', 'false' ).attr( 'aria-controls', id);
	var button = $this.children( '.menu-control' );

	// Toggle the state properties
	button.on( 'click', function() {
		jQuery(this).closest( '.link-primary' ).toggleClass( 'open' );
		var state = jQuery(this).attr( 'aria-expanded' ) === 'false' ? true : false;
		jQuery(this).attr( 'aria-expanded', state );
		panel.attr( 'aria-hidden', !state );
	});

});
