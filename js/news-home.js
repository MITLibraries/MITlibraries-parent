//
// News
//

$(function(){

	$.getJSON('/news/wp-json/posts?type[]=post&type[]=event')
		.done(function(data){
			var newsItem1 = data[0];
			var newsItem2 = data[1];
			var item1Cat = newsItem1.type;
			var item2Cat = newsItem2.type;
			// Check the Post Type
			if (item1Cat == 'post') {
				// Append the the Post Type
				$('.item-1 .category-post').text('News');
			}
			else {
				$('.item-1 .category-post').text('Event');
			}
			// Append the post title, trigger an event
			$('.item-1 h3').append(newsItem1.title).trigger('newsLoaded1');
			// Get the image attached to the post
			var newsImage1 = '/news/files/'+newsItem1.featured_image.attachment_meta.file;
			// Set the image as a background
			$('.item-1 .image').css('background-image', 'url('+newsImage1+')');
			// Check the Post Type
			if (item2Cat == 'post') {
				// Append the the Post Type
				$('.item-2 .category-post').text('News');
			}
			else {
				$('.item-2 .category-post').text('Event');
			}
			// Append the post title, trigger an event
			$('.item-2 h3').append(newsItem2.title).trigger('newsLoaded2');
			// Get the image attached to the post
			var newsImage2 = '/news/files/'+newsItem2.featured_image.attachment_meta.file;
			// Set the image as a background
			$('.item-2 .image').css('background-image', 'url('+newsImage2+')');
		})
		.fail(function(){
			$('.news-events > .flex-container')
				.append('<div class="error-load">MIT Libraries News is currently unavailable.</div>');
				$('.item-1').hide();
				$('.item-2').hide();
		});
		$('.item-1').on('newsLoaded1', function(){
			$('.item-1 .spinner').hide();
		});
		$('.item-2').on('newsLoaded2', function(){
			$('.item-2 .spinner').hide();
		});

});