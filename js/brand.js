$(function(){

	// Initialize Modernizr object
	var Modernizr;

	// What variable are we using to store toggle status?
	var toggle = 'brand_closed_dev';

	// This checks if the user has already closed the branding header.
	// If localStorage
	if (Modernizr.localstorage) {
		console.log('Localstorage found');
		// Check for the localStorage alert ID item
		var status = localStorage.getItem(toggle);
		if (localStorage.getItem(toggle) === 'true') {
			console.log('Branding has already been closed');
			$('.brand-splash').removeClass('big').addClass('compact');
		} else {
			console.log('Branding has not yet been closed');
		}
	} else { // No localStorage
		console.log('No Localstorage found.');
	}

	// On click
	$('.btn-minimize').click(function(){
		console.log('Minimize branding');
		$('.brand-splash').removeClass('big').addClass('compact');
		// If localStorage:
		if (Modernizr.localstorage) {
			// Set the localStorage item, using the post ID
			localStorage.setItem(toggle, 'true');
		}
		// Prevent the default click behavior.
		return false;
	});

});
