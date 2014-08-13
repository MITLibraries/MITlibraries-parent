//
// News
//

$(function(){

	$.getJSON('/news/wp-json/posts')
		.done(function(data){
			// Empty posts Arr
			var postsArr = [];
			for (var i = 0; i < data.length; i++) {
				// Each post
				var post = data[i];
				// Get the username for each post
				var user = post.author.username;
				if (user == 'mit-admin') {
					// Create an array of posts from a single user
					postsArr.push(post);
				}
			}
			// Post featured image objects
			var featured_image1 = postsArr[0].featured_image;
			var featured_image2 = postsArr[1].featured_image;
			if (featured_image1 != null) {
				// Get the featured image URL
				var postImage1URL = postsArr[0].featured_image.source;
				$('.post-news:first .image').css('background-image', 'url('+postImage1URL+')');
			}
			if (featured_image2 != null) {
				// Get the featured image URL
				var postImage2URL = postsArr[1].featured_image.source;
				$('.post-news:first .image').css('background-image', 'url('+postImage2URL+')');
			}
		});

});