//
// News
//

$(function(){
	// Use WP API, don't cache requests
	$.ajax({
		cache: false,
		url: '/news/wp-json/posts',
		dataType: "json"
	})
	.done(function(json){
		// Empty posts Arr
		var postsArr = [];
		for (var i = 0; i < json.length; i++) {
			// Each post
			var post = json[i];
			// Get the username for each post
			var user = post.author.username;
			if (user === 'mit-admin') {
				// Create an array of posts from a single user
				postsArr.push(post);
			}
		}

				}
			}
			console.log(postsArr);
			// Template; 2 posts
			for (var i = 0; i < 2; i++) {
				//var featuredImage = postsArr[i].featured_image;
				var postCat = postsArr[i].meta.is_event,
						catName,
						featuredImage;
				if (postsArr[i].featured_image !== null) {
					featuredImage = postsArr[i].featured_image.source;
				}
				else {
					featuredImage = '';
				}
				function checkEvent() {
					if (postCat) {
						catName = 'Event';
					}
					else {
						catName = 'News'
					}
				};
				checkEvent();
				var newsPostsCompiled = _.template(
				'<div class="post-news">' +
					'<div class="except-news">' +
						'<div class="category-post">' +
							catName +
						'</div>' +
						'<h3 class="title-post">' +
							'<%= meta.homepage_post_title %>' +
						'</h3>' +
						'<div class="image" style="background-image: url(\'' + featuredImage + '\');" />'
				);

				var newsPostsTemplate = newsPostsCompiled(postsArr[i]);
				$('#home-posts-news > .flex-container').append(newsPostsTemplate);
			};

		});

});