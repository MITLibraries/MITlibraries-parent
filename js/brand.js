$(function(){

	// This checks if the user has already closed the branding header.
	// If localStorage
	if (Modernizr.localstorage) {
		console.log('Localstorage found');
		// Check for the localStorage alert ID item
		if (localStorage.getItem('brand_closed_dev') !== 'true') {
			console.log('Branding has already been closed');
			$('.brand-splash').removeClass('big').addClass('compact');
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
			localStorage.setItem('brand_closed_dev', 'true');
		}
		// Prevent the default click behavior.
		return false;
	});

});
