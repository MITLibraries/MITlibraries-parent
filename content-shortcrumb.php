<?php
/**
 * The template used for displaying page content for pages in the shortrumb category in page-standard.php
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
					<?php the_content(); ?>
				</div>
			</div>

