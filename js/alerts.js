// Loads alert-level posts on the top of all pages
$(function mitlib_alerts(){
  var closable_alert = false,
  		local_storage;

  // Check for localStorage
  if (Modernizr.localstorage) {
  	local_storage = true;
  } else {
  	local_storage = false;
  }
  
	$.ajax({
		cache: false,
		url: "/wp-json/posts",
		dataType: "json"
	})
		.done(function(json){
			var posts = json.length,
					post,
					alert_title,
					post_meta,
					is_alert,
					confirm,
					alert_posts_arr = [],
					alert_ID,
					alert_content,
					alert_template;

			for (var i = 0; i < posts; i++) {
				// Each post
				post = json[i];
				// Make sure the field exists
				if ($(post.meta).length) {
					// Post meta fields
					post_meta = post.meta;
					// Make sure the field exists
					if ($(post_meta.alert).length) {
						// Post alert field
						is_alert = post_meta.alert;
						// If an alert post
						if (is_alert === true) {
							// Confirm alert field
							confirm = post_meta.confirm_alert;
							if (confirm === true) {
								// Push alert posts to a unique array
								alert_posts_arr.push(post);
							}
						}
					}
				}			
			};
			// If there is an alert post
			if (alert_posts_arr.length) {
				// The alert title
				alert_title = alert_posts_arr[0].title;
				// Check for empty title
				if (alert_title === '') {
					alert_title = 'Alert!'
				}
				// Alert post content
				alert_content = alert_posts_arr[0].content;
				// Alert post ID
				alert_ID = alert_posts_arr[0].ID;

				// Alert HTML template
				alert_template = 	'<div class="posts--preview--alerts transition-vertical transition-vertical--hide">' +
														'<div class="post alert--critical flex-container">' +
																'<i class="icon-exclamation-sign" aria-hidden="true"></i>' +
															'<div class="content-post alertText">' +
																'<h3>' + alert_title + '</h3> ' + alert_content +
															'</div>' +
														'</div>' +
													'</div>';
				// Closeable alert
				closable_alert = alert_posts_arr[0].meta.closable;
				// If localStorage
				if (local_storage === true) {
					// Check for the localStorage alert ID item
					if (localStorage.getItem('alert_closed-' + alert_ID) !== 'true') {
						// Append the template
				  	$(alert_template).prependTo('.wrap-page');
					$('.gldp-default').animate({"top":"292px"});
				  	// Remove the necessary transition class with a timeout, so that the animation shows.
						setTimeout(function() {
							$('.posts--preview--alerts').removeClass('transition-vertical--hide');
						}, 300);
				  }
				} else { // No localStorage
					// Append the template, etc.
					$(alert_template).prependTo('.wrap-page');
					setTimeout(function() {
						$('.posts--preview--alerts').removeClass('transition-vertical--hide');
					}, 300);
				}
				// If this is a closable alert
				if (closable_alert === true) {
					// Add a Close icon/svg/button
					$('.posts--preview--alerts .post').append('<a href="#0" id="close" class="action-close"><i class="icon-remove-sign" aria-hidden="true"></i></a>');
					// On click
					$('#close').click(function(){
						// Add the necessary transition hide class
				  	$('.posts--preview--alerts').addClass('transition-vertical--hide');
					$('.gldp-default').css({"top":"105px"});
					// If localStorage
				  	if (local_storage === true) {
				  		// Set the localStorage item, using the post ID
				  		localStorage.setItem('alert_closed-' + alert_ID, 'true');
				  	}
					});
				}

			}

		}).fail(function(){
			console.log('Alert posts failed to load');
		});
});
