<?php
/**
 * Template Name: RSS Page
 *
 *
 * @package WordPress
 * @subpackage Twenty_Twelve
 * @since Twenty Twelve 1.0
 */
 
$pageRoot = getRoot($post);
$section = get_post($pageRoot);
$isRoot = $section->ID == $post->ID;


get_header(); ?>

		<?php get_template_part('inc/breadcrumbs', 'noChild'); ?>

		<?php while ( have_posts() ) : the_post(); ?>
		<?php
			$rssLink = get_field('rss_link');
			$rssScript = get_field('rss_script');
		?>
		
		<div id="stage" class="stage inner group" role="main">
	
				<div class="pageTitle">
					<h1><?php the_title(); ?></h1>
				</div>
			
			<div id="content" class="allContent group">

				<?php echo '<a href="'.$rssLink.'" class="rss-link">RSS</a>';?>
				
				<div class="rss-feed">
					<?php echo '<script src="'.$rssScript.'" type="text/javascript"></script>'; ?>
				</div>
				
			</div>
		
		</div>
		
		<?php endwhile; // end of the loop. ?>

<?php get_footer(); ?>