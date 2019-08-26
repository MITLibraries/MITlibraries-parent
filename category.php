<?php
/**
 * The template for displaying Category pages.
 *
 * Used to display archive-type pages for posts in a category.
 *
 * Learn more: http://codex.wordpress.org/Template_Hierarchy
 *
 * @package MIT_Libraries_Parent
 * @since 1.2.1
 */

get_header();

$sidebar_class = '';
if ( is_active_sidebar( 'sidebar-1' ) ) {
	$sidebar_class = 'has-sidebar';
}
?>

<div id="stage" class="inner" role="main">
	<div id="content" class="content <?php echo esc_attr( $sidebar_class ); ?>">

		<div class="content-main main-content">

			<?php if ( have_posts() ) : ?>
				<header class="archive-header">
					<h1 class="archive-title">
						<?php printf( 'Category Archives: %s', '<span>' . single_cat_title( '', false ) . '</span>' ); ?>
					</h1>
				</header><!-- .archive-header -->
			<?php endif; ?>

			<?php
			/* We removed the loop because we don't use this display template. */
			?>

		</div>

		<?php if ( is_active_sidebar( 'sidebar-1' ) ) : ?>
			<?php get_sidebar(); ?>
		<?php endif; ?>

	</div><!-- #content -->
</div>

<?php get_footer(); ?>
