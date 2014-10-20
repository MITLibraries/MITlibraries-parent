// Loads alert-level posts on the top of all pages
$(function mitlib_alerts(){
	$.ajax({
		cache: false,
		url: "/wp-json/posts",
		dataType: "json"
	})
		.done(function(json){
			var posts = json.length,
					post,
					post_meta,
					is_alert,
					confirm,
					alert_posts_arr = [],
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
				alert_content = alert_posts_arr[0].content;
				alert_template = 	'<div class="posts--preview--alerts inactive">' +
														'<div class="post alert--critical flex-container">' +
															'<svg width="2048" height="2048" viewBox="0 0 2048 2048" xmlns="http://www.w3.org/2000/svg"><path d="M1024 256q209 0 385.5 103t279.5 279.5 103 385.5-103 385.5-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103zm128 1247v-190q0-14-9-23.5t-22-9.5h-192q-13 0-23 10t-10 23v190q0 13 10 23t23 10h192q13 0 22-9.5t9-23.5zm-2-344l18-621q0-12-10-18-10-8-24-8h-220q-14 0-24 8-10 6-10 18l17 621q0 10 10 17.5t24 7.5h185q14 0 23.5-7.5t10.5-17.5z"/></svg>' +
															'<div class="content-post">' +
																'<h1>Alert!</h1> ' + alert_content +
															'</div>' +
														'</div>' +
													'</div>';
				$(alert_template).prependTo('.wrap-page');

				setTimeout(function() {
				  $('.posts--preview--alerts').removeClass('inactive');
				}, 300);
			}
			
		}).fail(function(){
			console.log('Alert posts failed to load');
		});
});