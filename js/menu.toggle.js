$(function(){
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
$('header .menu--toggle').click(function(){
	$('#nav-main').toggleClass('active');
	$('.wrap-page').toggleClass('mobile-nav-active');
});


$( '.link-primary' ).bind( "mouseenter", function() {	
	$( '.link-primary' ).removeClass( 'open' );
	$(this).find( '.main-nav-link' ).attr('aria-expanded', 'true');
	$(this).closest( '.link-primary' ).addClass( 'open' );
});
$( '.link-primary' ).bind( "mouseleave", function() {	
	$(this).find( '.main-nav-link' ).attr('aria-expanded', 'false');
	$( '.link-primary' ).removeClass( 'open' );
});


$('#nav-main').keydown(function(e) {
	var $focused = document.activeElement;

	switch(e.keyCode)
	{
		// user presses the "space"
		case 32:		showMenu(e, $focused);
								break;

		// user presses the "esc" key
		case 27:		hideMenu(e);
								break;
	}
});

/* show/hide the menu on click */
function showMenu(e, focused) {
	$( '.link-primary' ).removeClass( 'open' );
	$(focused).closest( '.link-primary' ).addClass( 'open' );
	$(focused).attr('aria-expanded', 'true');
	event.preventDefault();
	event.stopPropagation();
}
function hideMenu() {
	$( '.link-primary' ).removeClass( 'open' );
	$( '.main-nav-link' ).attr('aria-expanded', 'false');
}
