<?php 
/**
 * Template Name: Featured News Article List
 *
 */
	get_header();
?>


		<div class="col-2 flex-item">
			<div id="home-posts-news" class="posts--preview news-events">
				<h2>Featured Articles</h2>

		<?php
			// switch to news blog
			switch_to_blog(7);

			$args = array(
				'meta_query' => array(
					array(
						'key' => 'featuredArticle',
						'value' => 'True',
						'compare' => '='
						),
					),
				/*
				'post_type' => array(
						'relation' => 'OR',
						array(
							'key' => 'post_type',
							'value' => 'post',
							'compare' => '='
						),
						array(
							'key' => 'post_type',
							'value' => 'bibliotech',
							'compare' => '='
						),
						array(
							'key' => 'post_type',
							'value' => 'spotlight',
							'compare' => '='
						)
					),
				*/
				'post_type' => array( 'post' , 'spotlights' , 'bibliotech'),
				'post_status' => 'publish',
				'posts_per_page' => 50,
				'orderby' => 'post_date',
				'order' => 'DESC',
				'ignore_sticky_posts' => 1
				);
			$the_stories = null;
			$the_stories = new WP_Query($args);

			if( $the_stories->have_posts() ) {
				while ( $the_stories->have_posts() ) : $the_stories->the_post();
					// setup_postdata($post);
					$custom = get_post_custom();
					// var_dump($custom);
					$image = json_decode($custom["homeImg"][0]);

					// image 17616
					$imageURL = wp_get_attachment_image_src( $image->cropped_image, 'original');
					// var_dump($imageURL);
					$imageURL = str_replace('/wp-content/uploads/','/news/files/',$imageURL[0]);
					// var_dump($imageURL);

					echo '<div class="post--full-bleed no-underline" style="border:1px solid black; margin-bottom: 1rem; padding: 1rem;" href="';
					the_permalink();
					echo '">';
					echo '<pre style="font-family:monospace;font-size:12px;background-color:#fdd;">';
					var_dump($post);
					echo '</pre>';
					echo '<pre style="font-family:monospace;font-size:12px;background-color:#dfd;">';
					var_dump($custom);
					echo '</pre>';

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
						echo 'date ' . $post->event_date . '<br>';
						echo 'start ' . $post->event_start_time . '<br>';
						echo 'end ' . $post->event_end_time . '<br>';
						$eventDate = DateTime::createFromFormat('Ymd',$post->event_date);
						$eventDate = '<span class="date">' . date_format($eventDate,'F j') . '</span>';
						if($post->event_start_time != '') {
							$eventDate = $eventDate . " " . $post->event_start_time;
						};
						if($post->event_end_time != '') {
							$eventDate = $eventDate . " - " . $post->event_end_time;
						};
					}

					echo 	'<div class="excerpt-news" style="background-color: #ddf;border:1px solid blue; margin-top: 1rem;">';
					echo        '<div class="category-post">' . $label . '</div>';
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
					echo    	'<img src="' . $imageURL . '" alt="">';
					echo    '</div>';
					echo '</div>';

				endwhile;
			}

			// switch back to Chomsky site
			restore_current_blog();
		?>
					<!-- Reference markup for an article 
					<a class="post--full-bleed no-underline flex-container" href="http://libraries.mit.edu/news/things-libraries-february/16987/">
						<div class="excerpt-news">
							<div class="category-post">News</div>
							<h3 class="title-post">Things to love at the Libraries this February</h3>
						</div>
						<div class="image" style="background-image: url('http://libraries-test.mit.edu/news/files/2015/01/book-heart.jpg');"></div>
					</a>
					-->

				</div>
			</div><!-- end div.news-events -->
		</div><!-- end div.col-2 -->

<?php 
	get_footer();
?>
