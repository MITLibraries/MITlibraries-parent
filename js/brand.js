$(function(){

	// What variable are we using to store toggle status?
	var toggle = 'brand_closed';

	// This checks if the user has already closed the branding header.
	// If localStorage
	if (Modernizr.localstorage) {
		// Check for the localStorage alert ID item
		if (localStorage.getItem(toggle) === 'true') {
			$('.brand-splash').removeClass('big').addClass('compact');
		}
	}

	// On click
	$('.btn-minimize').click(function(){
		$('.brand-splash').removeClass('big').addClass('compact');
		if (Modernizr.localstorage) {
			// Set the localStorage item, using the post ID
			localStorage.setItem(toggle, 'true');
		}
		// Prevent the default click behavior.
		return false;
	});

});
