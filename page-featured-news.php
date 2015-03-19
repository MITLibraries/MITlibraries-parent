<?php 
/**
 * Template Name: Featured News Article List
 *
 */
	get_header();
?>


		<div class="col-2 flex-item ">
			<div id="home-posts-news" class="posts--preview news-events">
				<h2>Featured Articles</h2>
				<div class="home">
					<div class="news-events">
						<div class="flex-container" style="background-color: #f3f3f3; margin: 0 auto; flex-direction: column; width: 662px; padding: 10px;">
							<?php DebugNews(); ?>
						</div>
					</div>
				</div>
				<hr>
				<div class="debug">
		<?php
			// switch to news blog
			switch_to_blog(7);

			/*
			$foo = get_blog_details(7);
			echo '<pre>';
			var_dump($foo);
			echo '</pre>';
			*/
			
			$args = array(
				'meta_query' => array(
					array(
						'key' => 'featuredArticle',
						'value' => 'True',
						'compare' => '='
						),
					),
				'post_type' => array( 'post' , 'spotlights' , 'bibliotech'),
				'post_status' => 'publish',
				'posts_per_page' => 50,
				'orderby' => 'post_title',
				'order' => 'ASC',
				'ignore_sticky_posts' => 1
				);
			$the_stories = null;
			$the_stories = new WP_Query($args);

			if( $the_stories->have_posts() ) {
				while ( $the_stories->have_posts() ) : $the_stories->the_post();
					// setup_postdata($post);
					$custom = get_post_custom();
					// var_dump($custom);

					// URL
					$url = get_permalink($post->id);
					// echo 'get blog: ' . get_blog_permalink(7, $post->id ) . '<br>';
					// echo 'post: ' . post_permalink($post->id) . '<br>';

					// Highlight image - use 17616 for debugging
					$imageTag = "";
					if($post->post_type === "post" || $post->post_type === "bibliotech") {
						if($custom["homeImg"][0] != "") {
							$image = json_decode($custom["homeImg"][0]);
							$imageURL = wp_get_attachment_image_src( $image->cropped_image, 'original');
							$imageURL = str_replace('/wp-content/uploads/','/news/files/',$imageURL[0]);
							$imageTag = '<img src="' . $imageURL . '" alt="">';
						}
					}

					echo '<div class="post--full-bleed no-underline" href="';
					the_permalink();
					echo '">';

					// card label
					if($post->post_type === "post") {
						if($post->is_event[0] === "1") {
							$label = "Event";
						} else {
							$label = "News";
						}
					} else {
						if($post->post_type === "spotlights") {
							$label = $custom["feature_type"][0];
						} elseif($post->post_type === "bibliotech") {
							$label = "Bibliotech";
						} else {
							$label = "Other";
						}
					}

					// card date
					if($post->post_type === "post" && $post->is_event[0] === "1") {
						$eventDate = DateTime::createFromFormat('Ymd',$post->event_date);
						$eventDate = '<span class="date">' . date_format($eventDate,'F j') . '</span>';
						if($post->event_start_time != '') {
							$eventDate = $eventDate . " " . $post->event_start_time;
						};
						if($post->event_end_time != '') {
							$eventDate = $eventDate . " - " . $post->event_end_time;
						};
					}

					echo 	'<div class="excerpt-news" style="background-color: #ddf;border:1px solid blue;">';
					echo        '<div class="category-post">' . $label . '</div>';
					// echo        '<div class="category-post">' . $url . '</div>';
					echo        '<div class="href">';
					if($post->post_type === "post" || $post->post_type === "bibliotech") {
						the_permalink();
					} elseif($post->post_type === "spotlights") {
						echo $custom["external_link"][0];
					} else {

					}
					echo  		'</div>';
					if($post->post_type === "post" && $post->is_event[0] === "1") {
						echo 	'<div class="datetime">' . $eventDate . '</div>';						
					}
					echo 		'<h3 class="title-post">';

					if($custom["homepage_post_title"][0]) {
						echo $custom["homepage_post_title"][0];
					} else {
						the_title();
					}
					echo        '</h3>';
					echo    	$imageTag;
					echo    '</div>';

					echo '<div class="control" style="background-color:#fdd;">';
					echo '<span>Post metadata</span><br>';
					echo '<pre class="toggle meta">';
					var_dump($post);
					echo '</pre>';
					echo '</div>';

					echo '<div class="control" style="background-color:#dfd;">';
					echo '<span>Custom values</span><br>';
					echo '<pre class="toggle meta">';
					var_dump($custom);
					echo '</pre>';
					echo '</div>';

					echo '</div>';

				endwhile;
			}

			// switch back to parent site
			restore_current_blog();
		?>
					</div><!-- end div.debug -->
				</div>
			</div><!-- end div.news-events -->
		</div><!-- end div.col-2 -->

<?php 
	get_footer();
?>
<script>
jQuery(function() {
	// This drives the show/hide toggles on post metadata
	jQuery(".control span").click(function() {
		jQuery(this).parent().find(".toggle").toggleClass("meta");
	})
});
</script>
<style type="text/css">
.debug .post--full-bleed.no-underline {
	border:1px solid black; 
	margin-bottom: 1rem; 
	padding: 1rem;
	padding-bottom: 0;
}
.debug .excerpt-news {
	margin-bottom: 1rem;
	background-color: #ddf;
	border: 1px solid blue;
}
.debug .control {
	margin-bottom: 1rem;
	font-family: monospace;
	font-size: 12px;
}
.debug .control span {
	font-size: 1.2rem;
	padding: 0.5rem;

}
</style>