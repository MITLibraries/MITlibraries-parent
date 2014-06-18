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
		<div class="expert">
		</div>
		<div class="expert">
		</div>
		<a href="" class="button-primary">All 27 Experts</a>
		<script>
			$.getJSON('/wp-json/posts?type=experts')
				.done(function(data){
					// Count the objects
					var dataLength = data.length;
					console.log(dataLength);
					// Pick two random numbers from the data array
					var randomImage1 = Math.round(Math.random()*dataLength);
					var randomImage2 = Math.round(Math.random()*dataLength);
					// Regenerate randomImage2 if it equals randomImage1
					while (randomImage1 == randomImage2) {
						randomImage2 = Math.round(Math.random()*dataLength);
					}
					console.log('object 1 is '+randomImage1+' and object 2 is '+randomImage2);
					// Get the image URL
					var expertPhoto1 = data[randomImage1].featured_image.guid;
					var expertPhoto2 = data[randomImage2].featured_image.guid;
					// Append expert image only if JSON request successful
					$('.expert').append('<img class="expert-photo">');
					// Add image URL to src attribute
					$('.expert .expert-photo:first').attr('src', expertPhoto1);
					$('.expert .expert-photo:last').attr('src', expertPhoto2);
				});
		</script>
	</div><!-- end div.guides-experts -->

<?php 
	get_footer();
?>