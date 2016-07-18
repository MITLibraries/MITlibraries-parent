<?php
/**
 * The template used for displaying page content in page.php
 *
 * @package MIT_Libraries_Parent
 * @since 1.2.1
 */

global $isRoot;
?>		
		
		<div class="main-content content-main">
		
			<div class="entry-content">
				<?php if ( ! $isRoot ) : ?>
				<h2><?php the_title(); ?></h2>
				<?php endif; ?>
				<?php the_content(); ?>
			</div>

		</div>

