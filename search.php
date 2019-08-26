<?php
/**
 * The template for displaying Search Results pages.
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
			<?php get_template_part( 'inc/site-search' ); ?>
		</div>

		<?php if ( is_active_sidebar( 'sidebar-1' ) ) : ?>
			<?php get_sidebar(); ?>
		<?php endif; ?>

	</div>
</div>

<?php get_footer(); ?>
