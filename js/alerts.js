// Loads alert-level posts on the top of all pages
function filterAlerts(posts) {
	// This processes an array of posts for valid, confirmed, alerts
	var filtered = [],
		post,
		post_meta,
		i;

	// For each post...
	for (i = 0; i < posts.length; i++) {
		post = posts[i];

		// If the post has no meta fields, skip it.
		if ( ! $(post.meta).length ) {
			continue;
		}

		// If post is not flagged, and confirmed, as an alert, skip it.
		if ( ! ($(post.meta.alert).length && true === post.meta.alert && true === post.meta.confirm_alert ) ) {
			continue;
		}

		// If user has already dismissed this alert, skip it.
		if (Modernizr.localstorage) {
			if ( 'true' === localStorage.getItem('alert_closed-' + post.id) ) {
				continue;
			}
		}

		// Still here? Add post to list for processing.
		filtered.push(post);

	};

	return filtered;
}

// This is needed because, for some reason, the hours screen uses a navigation
// element that is absolutely positioned. Thus, as alerts are added or closed,
// we need to explicitly reposition that element.
function moveCalendar(stepSize) {
	if ( ! $('.gldp-default').position() ) {
		return;
	}
	oldTop = $('.gldp-default').position().top;
	$('.gldp-default').animate({top: oldTop + stepSize});
}

function renderAlert(markup,id) {
	// Append the template
	$(markup).prependTo('.wrap-page');
	// Remove the necessary transition class with a timeout, so that the animation shows.
	setTimeout(function() {
		$('.posts--preview--alerts').removeClass('transition-vertical--hide');
	}, 300);
}

function setClosable(alert_ID) {
	// Add a Close icon/svg/button
	$('.posts--preview--alerts .post').append('<a href="#0" id="close" class="action-close"><span class="sr">Dismiss</span><i class="icon-remove-sign" aria-hidden="true"></i></a>');
	// On click
	$('#close').click(function(){
		// Add the necessary transition hide class
		$(this).closest('.posts--preview--alerts').addClass('transition-vertical--hide');
		// Bump the hours calendar down, if it is present.
		moveCalendar(-152);
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
		alert_title,
		alert_template;

	alert_posts_arr = filterAlerts(json)

	// If there is an alert post
	if ( ! alert_posts_arr.length) {
		return
	}

	for (i = 0; i < alert_posts_arr.length; i++) {
		// Alert post ID
		alert_ID = alert_posts_arr[i].id;

		// Check for empty title
		alert_title = ('' === alert_posts_arr[i].title.rendered) ? 'Alert!' : alert_posts_arr[i].title.rendered;

		// Alert HTML template
		alert_template = '<div class="posts--preview--alerts transition-vertical transition-vertical--hide">' +
			'<div class="post alert--critical flex-container">' +
				'<i class="icon-exclamation-sign" aria-hidden="true"></i>' +
				'<div class="content-post alertText">' +
					'<h3>' + alert_title + '</h3> ' + alert_posts_arr[i].content.rendered +
				'</div>' +
			'</div>' +
		'</div>';

		renderAlert(alert_template,alert_ID);

		// If this is a closable alert
		if (true === alert_posts_arr[i].meta.closable) {
			setClosable(alert_ID);
		}
	}

	// Bump the hours calendar down, if it is present.
	moveCalendar(alert_posts_arr.length * 152);

}

$(function(){

	// This retrieves a list of posts, with additional parsing to determine if
	// any are displayable alerts.
	$.getJSON('/wp-json/wp/v2/posts')
		.done(function(data){
			showAlerts(data);
		});

});
