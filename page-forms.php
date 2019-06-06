<?php
/**
 * Template Name: Forms
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site will use a
 * different template.
 *
 * @package MIT_Libraries_Parent
 * @since 1.2.1
 */

$pageRoot = getRoot( $post );
$section = get_post( $pageRoot );
$isRoot = $section->ID == $post->ID;

get_header();

?>
<script language="JavaScript" type="text/javascript">
<!--
document.addEventListener( 'wpcf7mailsent', function( event ) {
	ga( 'send', 'event', 'Form', 'submit' );
}, false );
//-->
</script>
	<?php if ( is_active_sidebar( 'sidebar-search' ) ) : ?>
		<div id="sidebar-search" class="widget-area" role="complementary">
			<?php dynamic_sidebar( 'sidebar-search' ); ?>
		</div>
	<?php endif; ?>

	<?php
	if ( in_category( 'shortcrumb' ) ) {
		get_template_part( 'inc/breadcrumbs', 'noChild' );
	} else {
		get_template_part( 'inc/breadcrumbs' );
	}
	while ( have_posts() ) : the_post();

		$has_sidebar = '';
		if ( is_active_sidebar( 'sidebar-1' ) ) {
			$has_sidebar = ' has-sidebar';
		}
		?>

		<div id="stage" class="inner" role="main">
		
			<?php if ( in_category( 'shortcrumb' ) ) { ?>
			<?php get_template_part( 'inc/self', 'title' ); ?>
			<?php } elseif ( ! in_category( 'page-root' ) ) { ?>
			<?php get_template_part( 'inc/content', 'root' ); ?>
			<?php } ?>

			<div id="content" class="content<?php echo esc_html( $has_sidebar ); ?>">

				<?php if ( in_category( 'shortcrumb' ) ) { ?>
				<?php get_template_part( 'content', 'shortcrumb' ); ?>
				<?php } else { ?>
				<?php get_template_part( 'content', 'page' ); ?>
				<?php } ?>

				<?php if ( is_active_sidebar( 'sidebar-1' ) ) : ?>
				<?php get_sidebar(); ?>
				<?php endif; ?>

			</div>
		
		</div><!-- end div#stage -->
		
		<?php endwhile; ?>
<?php get_footer(); ?>
