<?php 
	get_header();
?>

	<div class="search--lib-resources">
		<h2>Search in</h2>
		<select name="" id="">
			<option value="">Option #1</option>
			<option value="">Option #2</option>
			<option value="">Option #3</option>
			<option value="">Option #4</option>
			<option value="">Option #5</option>
		</select>
		<label>for</label>
		<input type="text">
		<label>by</label>
		<select name="" id="">
			<option value="">Option #1</option>
			<option value="">Option #2</option>
			<option value="">Option #3</option>
			<option value="">Option #4</option>
			<option value="">Option #5</option>
		</select>
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
		<div class="item-1"><h3></h3></div>
		<div class="item-2"><h3></h3></div>
		<script>
			$.get('/news', function(data) {
				var newsItem1 = $(data).find('h2[data-post-number="0"]').text();
				var newsItem2 = $(data).find('h2[data-post-number="1"]').text();
				$('.item-1 h3').append(newsItem1);
				$('.item-2 h3').append(newsItem2);
			});
			// $('.item-1').load('/news h2[data-post-number="0"]');
			// $('.item-2').load('/news h2[data-post-number="1"]');
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
	</div>

<?php 
	get_footer();
?>