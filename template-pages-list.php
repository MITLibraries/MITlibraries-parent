<?php
/**
 * Template Name: Template Page List
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

	<?php

	$template_page_args = array(
	    'meta_key' => '_wp_page_template',
	    'meta_value' => 'page-full.php',
	    'depth' => -1,
      'hierarchical' => 0
	);

	$template_pages = get_pages($template_page_args);
	
	$template_query_args = array (
		'meta_key' => '_wp_page_template',
		'meta_value' => 'page-full.php'
	);
	
	$template_queries = get_pages($template_query_args);

	?>

	<?php

		if(!current_user_can('manage_options')) {
			include( get_query_template( '404' ) );
			exit();
		}

		else {
			?>
			<ul>
				<?php
				foreach ( $template_pages as $template_page ) {
				    echo '<li><a href="' . get_permalink( $template_page->ID ) . '">' . $template_page->post_title  . '</a></li>';
				}
				?>
			</ul>
			

		<?php } ?>

	<?php get_footer(); ?>