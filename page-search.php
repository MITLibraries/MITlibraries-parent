<?php
/**
 * Template Name: Seach Page
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site will use a
 * different template.
 *
 * @package MIT_Libraries_Parent
 * @since 1.2.1
 */

get_header(); ?>

	<?php if ( is_active_sidebar( 'sidebar-search' ) ) : ?>
		<div id="sidebar-search" class="widget-area" role="complementary">
			<?php dynamic_sidebar( 'sidebar-search' ); ?>
		</div>
	<?php else : ?>
		<?php get_template_part( 'inc/search' ); ?>
	<?php endif; ?>

		<?php get_template_part( 'inc/breadcrumbs' ); ?>

		<?php while ( have_posts() ) : the_post(); ?>
			
		<div id="stage" class="inner" role="main">

			<div id="content" class="content has-sidebar">
				
				<?php get_template_part( 'content', 'page' ); ?>
				
				<?php get_sidebar(); ?>
			
			</div>
			
		</div>
		
		<?php endwhile; // end of the loop. ?>

		<?php get_footer(); ?>
