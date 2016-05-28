<?php
/**
 * Template Name: Location Template
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site will use a
 * different template.
 *
 * @package MIT_Libraries_Parent
 * @since 1.2.1
 */
 
$pageRoot = getRoot($post);
$section = get_post($pageRoot);
$isRoot = $section->ID == $post->ID;

get_header(); ?>
		<!-- Version 1.9 -->
		<?php get_template_part('inc/breadcrumbs'); ?>

		<?php 
			$objs = get_field("page_location");
			
			$args = array(
				'p' => $objs->ID,
				'post_type' => 'any'
			);
			
			$locPosts = new WP_Query($args);
			
		?>
		
		<?php while ( $locPosts->have_posts() ) : $locPosts->the_post(); ?>

			<?php get_template_part( 'content', 'location' ); ?>
		
		<?php endwhile; // end of the loop. ?>

<?php get_footer(); ?>
