<?php 
	get_header();
?>

	<div class="search--resources">
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
	</div>
	<div class="news-events">
		<h2>News &amp; Events</h2>
	</div>
	<div class="guides-experts">
		<h2>Research Guides &amp; Experts</h2>
	</div>

<?php 
	get_footer();
?>