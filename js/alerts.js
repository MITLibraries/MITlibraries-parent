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

  //   alert_closed = localStorage.getItem('alert_closed');

  //   // If first time visitor
  //   if (alert_closed === 'true') {
  //     // Set localStorage item
  //     alert_closed = true;
  //     console.log('localStorage: alert_closed = true');
  //   } else {
  //     // Returning visitor
  //     alert_closed = false;
  //     console.log('localStorage: alert_closed = false');
  //   }
  // } else {
  //   // If no localStorage
  //   alert_closed = false;
  // }
  
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
					alert_ID;
					alert_content,
					alert_template;

			for (var i = 0; i < posts; i++) {
				// Each post
				post = json[i];
				// Post meta fields
				post_meta = post.meta;
				// Post alert field
				is_alert = post_meta.alert;

				if (is_alert === true) {
					confirm = post_meta.confirm_alert;
					if (confirm === true) {
						alert_posts_arr.push(post);
					}
				}
			};
			// If there is an alert post
			if (alert_posts_arr.length) {
				alert_title = alert_posts_arr[0].title;
				// Check for empty title
				if (alert_title === '') {
					alert_title = 'Alert!'
				}
				alert_content = alert_posts_arr[0].content;
				alert_ID = alert_posts_arr[0].ID;
				alert_template = 	'<div class="posts--preview--alerts transition-vertical transition-vertical--hide">' +
														'<div class="post alert--critical flex-container">' +
															'<svg class="icon-exclamation-circle width="2048" height="2048" viewBox="0 0 2048 2048" xmlns="http://www.w3.org/2000/svg"><path d="M1024 256q209 0 385.5 103t279.5 279.5 103 385.5-103 385.5-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103zm128 1247v-190q0-14-9-23.5t-22-9.5h-192q-13 0-23 10t-10 23v190q0 13 10 23t23 10h192q13 0 22-9.5t9-23.5zm-2-344l18-621q0-12-10-18-10-8-24-8h-220q-14 0-24 8-10 6-10 18l17 621q0 10 10 17.5t24 7.5h185q14 0 23.5-7.5t10.5-17.5z"/></svg>' +
															'<div class="content-post">' +
																'<h1>' + alert_title + '</h1> ' + alert_content +
															'</div>' +
														'</div>' +
													'</div>';
				// Closeable alert
				closable_alert = alert_posts_arr[0].meta.closable;

				if (local_storage === true) {
					if (localStorage.getItem('alert_closed-' + alert_ID) !== 'true') {
				  	$(alert_template).prependTo('.wrap-page');
						setTimeout(function() {
							$('.posts--preview--alerts').removeClass('transition-vertical--hide');
						}, 300);
				  }
				} else {
					$(alert_template).prependTo('.wrap-page');
					setTimeout(function() {
						$('.posts--preview--alerts').removeClass('transition-vertical--hide');
					}, 300);
				}
				
				if (closable_alert === true) {
					// Add a Close icon/svg/button
					$('.posts--preview--alerts .post').append('<a href="#0" id="close" class="action-close"><svg width="2048" height="2048" viewBox="0 0 2048 2048" xmlns="http://www.w3.org/2000/svg"><path d="M1353 1207l-146 146q-10 10-23 10t-23-10l-137-137-137 137q-10 10-23 10t-23-10l-146-146q-10-10-10-23t10-23l137-137-137-137q-10-10-10-23t10-23l146-146q10-10 23-10t23 10l137 137 137-137q10-10 23-10t23 10l146 146q10 10 10 23t-10 23l-137 137 137 137q10 10 10 23t-10 23zm215-183q0-148-73-273t-198-198-273-73-273 73-198 198-73 273 73 273 198 198 273 73 273-73 198-198 73-273zm224 0q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z"/></svg></a>');
					$('#close').click(function(){
				  	$('.posts--preview--alerts').addClass('transition-vertical--hide');
				  	if (local_storage === true) {
				  		localStorage.setItem('alert_closed-' + alert_ID, 'true');
				  	}
					});
				}

			}

		}).fail(function(){
			console.log('Alert posts failed to load');
		});
});