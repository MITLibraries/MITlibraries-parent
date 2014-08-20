<?php get_header(); ?>
<?php

	$args = array(
		'post_type' => 'expert',
		'posts_per_page' => -1,
		'orderby' => 'menu_order',
		'order' => 'ASC'
	);							
	$experts = new WP_Query( $args );
?>

<?php while ( $experts->have_posts() ) : $experts->the_post(); ?>

	<?php the_title(); ?>

<?php endwhile; ?>

<?php wp_footer(); ?>