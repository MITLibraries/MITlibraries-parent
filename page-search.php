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

$pageRoot = getRoot($post);
$section = get_post($pageRoot);
$isRoot = $section->ID == $post->ID;



get_header(); ?>

		<?php get_template_part('inc/search'); ?>
		
		<div id="breadcrumb" class="breadcrumbs inner hidden-phone" role="navigation" aria-label="breadcrumbs">
			<?php wsf_breadcrumbs(" &raquo; ", ""); ?>
		</div>

		<?php while ( have_posts() ) : the_post(); ?>
			
		<div id="stage" class="inner" role="main">


			<div class="title-page">
				<?php if ($isRoot): ?>
				<h1><?php echo $section->post_title; ?></h1>
				<?php else: ?>
				<h1><a href="<?php echo get_permalink($section->ID) ?>"><?php echo $section->post_title; ?></a></h1>
				<?php endif; ?>
			</div>

			<div id="content" class="content has-sidebar">
				<?php get_template_part( 'content', 'pagefull' ); ?>
				<?php get_sidebar(); ?>
			</div>
		</div>
		<?php endwhile; // end of the loop. ?>

		<?php get_footer(); ?>
