<?php
/**
 * Template Name: 2/3 Width w/ Sidebar
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

		<div id="breadcrumb" class="inner hidden-phone" role="navigation" aria-label="breadcrumbs">
			<a href="/">Libraries home</a>
			&raquo; <?php showBreadTitle(); ?>
		</div>

		<?php while ( have_posts() ) : the_post(); ?>
		
		<div id="stage" class="inner row" role="main">
	
			<div class="title span12">
				<?php if ($isRoot): ?>
				<h2><?php echo $section->post_title; ?></h2>
				<?php else: ?>
				<h2><a href="<?php echo get_permalink($section->ID) ?>"><?php echo $section->post_title; ?></a></h2>
				<?php endif; ?>
			</div>
			
			<div id="content" class="span12">
				<?php get_template_part( 'content', 'pagefull' ); ?>
			</div>
			
			
			
		
			<div class="clear"></div>
		
		</div>
		
		<?php endwhile; // end of the loop. ?>

<?php get_footer(); ?>