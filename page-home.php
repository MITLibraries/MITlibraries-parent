<?php 
	get_header();
?>

	<div id="search-main" class="search--lib-resources">
		<h2>Search in</h2>
		<select name="" id="resource" tabindex="2">
			<option value="option-1">Resource #1</option>
			<option value="option-2">Resource #2</option>
			<option value="option-3">Resource #3</option>
			<option value="option-4">Resource #4</option>
			<option value="option-5">Resource #5</option>
		</select>
		<label>for</label>
		<input type="text" class="option-1 active" placeholder="Resource #1" autofocus="autofocus" tabindex="1">
		<input type="text" class="option-2" placeholder="Resource #2">
		<input type="text" class="option-3" placeholder="Resource #3">
		<input type="text" class="option-4" placeholder="Resource #4">
		<input type="text" class="option-5" placeholder="Resource #5">
		<label>by</label>
		<select name="" id="" tabindex="3">
			<option value="">Option #1</option>
			<option value="">Option #2</option>
			<option value="">Option #3</option>
			<option value="">Option #4</option>
			<option value="">Option #5</option>
		</select>
		<script>
			
			$('#resource').change(function(){
				$('#search-main input').removeClass('active');
				var resourceOption = $('#resource option:selected').val();
				$('#search-main input.'+resourceOption).addClass('active');
			});
			
		</script>
	</div>
	<div class="hours-locations">
		<h2>Hours &amp; Locations</h2>
		<?php get_template_part('inc/location', 'info'); ?>
		<a href="/map">View Map</a>
		<a href="/study" class="study">Find a Study Space</a>
		<a href="/hours" class="button-primary">All Hours &amp; Locations</a>
	</div>
	<div class="news-events">
		<h2>News &amp; Events</h2>
		<div class="flex-container">
			<div class="item-1">
				<div class="spinner">
				  <div class="rect1"></div>
				  <div class="rect2"></div>
				  <div class="rect3"></div>
				  <div class="rect4"></div>
				  <div class="rect5"></div>
				</div>
				<h3></h3>
				<div class="image"></div>
			</div>
			<div class="item-2">
				<div class="spinner">
				  <div class="rect1"></div>
				  <div class="rect2"></div>
				  <div class="rect3"></div>
				  <div class="rect4"></div>
				  <div class="rect5"></div>
				</div>
				<h3></h3>
				<div class="image"></div>
			</div>
		</div>
		<script>
			$.get('/news', function(data) {
				var newsItem1 = $(data).find('.post[data-post-number="0"] h2').text();
				var newsItem2 = $(data).find('.post[data-post-number="1"] h2').text();
				$('.item-1 h3').append(newsItem1).trigger('newsLoaded1');
				$('.item-2 h3').append(newsItem2).trigger('newsLoaded2');
				$('.item-1 .image').load('/news .post[data-post-number="0"] img');
				$('.item-2 .image').load('/news .post[data-post-number="1"] img');
			});
			$('.item-1').on('newsLoaded1', function(){
				$('.item-1 .spinner').hide();
			});
			$('.item-2').on('newsLoaded2', function(){
				$('.item-2 .spinner').hide();
			});
		</script>
		<a href="/news" class="button-primary">All News &amp; Events</a>
	</div>
	<div class="guides-experts">
		<h2>Research Guides &amp; Experts</h2>
		<p class="caption">Specialized guides for every research interest.</p>
		<p class="caption">Not sure where to start?<a href="/ask">Ask Us</a></p>
		<a href="" class="button-secondary">Astronomy</a>
		<a href="" class="button-secondary">Music</a>
		<a href="" class="button-secondary">Real Estate</a>
		<a href="" class="button-secondary">Environmental Engineering</a>
		<a href="" class="button-secondary">Medicine</a>
		<a href="" class="button-secondary">Physics</a>
		<a href="" class="button-secondary">Women and Gender Studies</a>
		<a href="" class="button-primary">All 125 Guides</a>
		<div class="experts-group flex-container">
			<div class="expert">
			</div>
			<div class="expert">
			</div>
			<div class="expert hidden-mobile">
			</div>
			<div class="expert hidden-mobile">
			</div>
		</div>
		<a href="" class="button-primary view-experts">All <span class="count"></span> Experts</a>
		<script>
			$.getJSON('/wp-json/posts?type=experts')
				.done(function(data){
					// Count the objects
					var dataLength = data.length;
					var arr = [];
					while(arr.length < 4){
					  var randomNumber=Math.ceil(Math.random()*dataLength);
					  var found=false;
					  for(var i=0;i<arr.length;i++){
					    if(arr[i]==randomNumber){found=true;break}
					  }
					  if(!found)arr[arr.length]=randomNumber;
					}
					var expertName1 = data[arr[0]].title;
					var expertName2 = data[arr[1]].title;
					var expertName3 = data[arr[2]].title;
					var expertName4 = data[arr[3]].title;

					var expertPhoto1 = data[arr[0]].featured_image.guid;
					var expertPhoto2 = data[arr[1]].featured_image.guid;
					var expertPhoto3 = data[arr[2]].featured_image.guid;
					var expertPhoto4 = data[arr[3]].featured_image.guid;

					// Pick two random numbers from the data array
					// var randomImage1 = Math.round(Math.random()*dataLength);
					// var randomImage2 = Math.round(Math.random()*dataLength);
					// // Regenerate randomImage2 if it equals randomImage1
					// while (randomImage1 == randomImage2) {
					// 	randomImage2 = Math.round(Math.random()*dataLength);
					// }
					// console.log('object 1 is '+randomImage1+' and object 2 is '+randomImage2);
					// // Get the image URL
					// var expertPhoto1 = data[randomImage1].featured_image.guid;
					// var expertPhoto2 = data[randomImage2].featured_image.guid;
					// Append expert image only if JSON request successful
					$('.expert').append('<img class="expert-photo">');
					// Append empty spans for expert names
					$('.expert').append('<span class="name"></span>');
					// Add expert name to appropriate span
					$('.expert .name:eq(0)').text(expertName1);
					$('.expert .name:eq(1)').text(expertName2);
					$('.expert .name:eq(2)').text(expertName3);
					$('.expert .name:eq(3)').text(expertName4);
					// Add image URL to src attribute
					$('.expert .expert-photo:eq(0)').attr('src', expertPhoto1);
					$('.expert .expert-photo:eq(1)').attr('src', expertPhoto2);
					$('.expert .expert-photo:eq(2)').attr('src', expertPhoto3);
					$('.expert .expert-photo:eq(3)').attr('src', expertPhoto4);
					// Add the expert count to the "All Experts" button
					$('.view-experts .count').text(dataLength);
				});
		</script>
	</div><!-- end div.guides-experts -->

<?php 
	get_footer();
?>