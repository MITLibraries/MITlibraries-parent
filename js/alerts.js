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

			if (alert_posts_arr.length) {
				alert_content = alert_posts_arr[0].content;
				alert_template = 	'<div class="posts-alerts">' +
														'<div class="alert--critical">' +
															 '<h1>Alert!</h1> ' + alert_content +
														'</div>' +
													'</div>';
				$(alert_template).prependTo('.wrap-page');
			}
			
		}).fail(function(){
			console.log('Alert posts failed to load');
		});
});