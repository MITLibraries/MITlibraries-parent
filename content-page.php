<?php
/**
 * The template used for displaying page content in page-standard.php
 *
 * @package MIT_Libraries_Parent
 * @since 1.2.1
 */

global $isRoot;



?>

	<?php if ( in_category( 'has-menu' ) ) { ?>
		<?php get_template_part( 'inc/content', 'secmenu' ); ?>
			<?php } ?>

			<div class="main-content content-main">
			<div class="entry-content">
				<div class="entry-page-title">
				<?php if ( ! $isRoot ) : ?>
				<h1><?php the_title(); ?></h1>
				<?php endif; ?>
				</div>
				<?php the_content(); ?>
			</div>
		</div>

