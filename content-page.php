<?php
/**
 * The template used for displaying page content in page.php
 *
 * @package WordPress
 * @subpackage Twenty_Twelve
 * @since Twenty Twelve 1.0
 */
 

 
global $isRoot;


 
?>

	<?php if (in_category('has-menu')) { ?>
		<?php get_template_part('inc/content', 'secmenu'); ?>
			<?php } ?>

	<div class="content-main flex-container">
		<div class="col-1 content-page">
			<div class="entry-content">
				<div class="entry-page-title">
				<?php if (!$isRoot): ?>
				<h1><?php the_title(); ?></h1>
				<?php endif; ?>
				</div>
				<?php the_content(); ?>
			</div>
			<footer class="entry-meta">
				<?php edit_post_link( __( 'Edit', 'twentytwelve' ), '<span class="edit-link">', '</span>' ); ?>
			</footer><!-- .entry-meta -->
		</div>
<?php if ( is_active_sidebar( 'sidebar-1' ) ) { ?>
		<div class="col-2">
		<?php get_sidebar( 'sidebar-1' ); ?>
<?php } ?>
		</div>
	</div>
	
	 
