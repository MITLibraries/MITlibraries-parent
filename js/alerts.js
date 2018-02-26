// Loads alert-level posts on the top of all pages
function filterAlerts(posts) {
	// This processes an array of posts for valid, confirmed, alerts
	var filtered = [],
		post,
		post_meta,
		i;

	for (i = 0; i < posts.length; i++) {
		// Each post
		post = posts[i];
		// Make sure the field exists
		if ($(post.meta).length) {
			// Post meta fields
			post_meta = post.meta;
			// Make sure the field exists, is an alert, and is confirmed
			if ($(post_meta.alert).length && true === post_meta.alert && true === post_meta.confirm_alert ) {
				filtered.push(post);
			}
		}
	};

	return filtered;
}

function renderAlert(markup,id) {
	// If localStorage
	if (Modernizr.localstorage) {
		// Check for the localStorage alert ID item
		if (localStorage.getItem('alert_closed-' + id) !== 'true') {
			// Append the template
			$(markup).prependTo('.wrap-page');
			$('.gldp-default').animate({"top":"292px"});
			// Remove the necessary transition class with a timeout, so that the animation shows.
			setTimeout(function() {
				$('.posts--preview--alerts').removeClass('transition-vertical--hide');
			}, 300);
		}
	} else { // No localStorage
		// Append the template, etc.
		$(markup).prependTo('.wrap-page');
		setTimeout(function() {
			$('.posts--preview--alerts').removeClass('transition-vertical--hide');
		}, 300);
	}
}

function setClosable(alert_ID) {
	// Add a Close icon/svg/button
	$('.posts--preview--alerts .post').append('<a href="#0" id="close" class="action-close"><span class="sr">Dismiss</span><i class="icon-remove-sign" aria-hidden="true"></i></a>');
	// On click
	$('#close').click(function(){
		// Add the necessary transition hide class
		$('.posts--preview--alerts').addClass('transition-vertical--hide');
		$('.gldp-default').css({"top":"105px"});
		// If localStorage
		if (Modernizr.localstorage) {
			// Set the localStorage item, using the post ID
			localStorage.setItem('alert_closed-' + alert_ID, 'true');
		}
	});
}

function showAlerts(json) {
	var alert_posts_arr = [],
		alert_ID,
		alert_template;

	alert_posts_arr = filterAlerts(json)

	// If there is an alert post
	if (alert_posts_arr.length) {

		// Check for empty title
		if ('' === alert_posts_arr[0].title.rendered) {
			alert_posts_arr[0].title.rendered = 'Alert!';
		}

		// Alert HTML template
		alert_template = '<div class="posts--preview--alerts transition-vertical transition-vertical--hide">' +
			'<div class="post alert--critical flex-container">' +
				'<i class="fas fa-exclamation-triangle"></i>' +
				'<div class="content-post alertText">' +
					'<h3>' + alert_posts_arr[0].title.rendered + '</h3> ' + alert_posts_arr[0].content.rendered +
				'</div>' +
			'</div>' +
		'</div>';

		// Alert post ID
		alert_ID = alert_posts_arr[0].id;

		renderAlert(alert_template,alert_ID);

		// If this is a closable alert
		if (true === alert_posts_arr[0].meta.closable) {
			setClosable(alert_ID);
		}
	}
}

$(function(){

	// This retrieves a list of posts, with additional parsing to determine if
	// any are displayable alerts.
	$.getJSON('/wp-json/wp/v2/posts')
		.done(function(data){
			showAlerts(data);
		});

});
