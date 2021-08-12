<?php
/**
 * Template Name: Location (2021) Template
 *
 * This is the template that displays location records according to a new
 * page layout that was developed in 2021 as a result of the Hayden library
 * renovation.
 *
 * It does not display the standard sidebar, and the corresponding content
 * template (content-location-2021) does not use a tabbed layout.
 *
 * @package MIT_Libraries_Parent
 * @since 1.12.0
 */

$pageRoot = getRoot( $post );
$section = get_post( $pageRoot );
$isRoot = $section->ID == $post->ID;

get_header(); ?>

<?php get_template_part( 'inc/breadcrumbs' ); ?>

<?php
$objs = get_field( 'page_location' );

$args = array(
	'p' => $objs->ID,
	'post_type' => 'any',
);

$location_posts = new WP_Query( $args );
?>

<div id="stage" class="inner" role="main">

	<?php
	while ( $location_posts->have_posts() ) :
		$location_posts->the_post();
		?>

		<?php get_template_part( 'content', 'location-2021' ); ?>

	<?php endwhile; // end of the loop. ?>

</div>

<?php get_footer(); ?>
