<?php
/**
 * Template Name: Location Template
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site will use a
 * different template.
 *
 * @package WordPress
 * @subpackage Twenty_Twelve
 * @since Twenty Twelve 1.0
 */
 
$pageRoot = getRoot($post);
$section = get_post($pageRoot);
$isRoot = $section->ID == $post->ID;

get_header(); ?>
		<!-- Version 1.9 -->
		<div id="breadcrumb" class="inner" role="navigation" aria-label="breadcrumbs">
			<a href="/">Libraries home</a>
			&raquo; <?php showBreadTitle(); ?>
		</div>

		<?php 
			$objs = get_field("page_location");
			
			$args = array(
				'p' => $objs->ID,
				'post_type' => 'any'
			);
			
			$posts = new WP_Query($args);
			
		?>
		
		<?php while ( $posts->have_posts() ) : $posts->the_post(); ?>

			<?php get_template_part( 'content', 'location' ); ?>
		
		<?php endwhile; // end of the loop. ?>

<?php get_footer(); ?>