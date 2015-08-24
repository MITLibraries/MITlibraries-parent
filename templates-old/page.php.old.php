<?php
/**
 * The template for displaying all pages.
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

				



 
if ( is_home() ) :
get_header('home');
else : 
get_header(); 
endif;
?>
			<?php if (in_category('shortcrumb')) { ?>
		<?php get_template_part('inc/breadcrumbs', 'noChild'); ?>
			<?php } else { ?>

		<div id="breadcrumb" class="inner hidden-phone" role="navigation" aria-label="breadcrumbs">
			<?php wsf_breadcrumbs(" &raquo; ", ""); ?>
		</div>
		<?php } ?>

			
			<?php while ( have_posts() ) : the_post(); ?>
			
		
		
		<div id="stage" class="inner" role="main">
			
			<?php if (!in_category('page-root')) { ?>
			<?php get_template_part( 'inc/content','root'); ?>
			<?php } ?>
			
			
			
			<div class="content-main">
				<?php get_template_part( 'content', 'page' ); ?>
			</div>
		</div>
		<?php endwhile; // end of the loop. ?>
<?php get_footer(); ?>