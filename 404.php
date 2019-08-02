<?php
/**
 * The template for displaying 404 pages (Not Found).
 *
 * @package MIT_Libraries_Parent
 * @since 1.2.1
 */

get_header(); ?>

		<div id="stage" class="inner" role="main">
			<div id="content" class="content has-sidebar">

				<div class="main-content content-main">

					<article id="post-0" class="post error404 no-results not-found">

						<?php if ( is_active_sidebar( 'sidebar-404' ) ) { ?>

							<div id="sidebar-404" class="widget-area" role="complementary">
								<?php dynamic_sidebar( 'sidebar-404' ); ?>
							</div>

						<?php } else { ?>

							<header class="entry-header">
								<h1 class="entry-title">The requested content was not found.</h1>
							</header>
							<?php get_template_part( 'inc/site-search' ); ?>

						<?php } ?>

					</article><!-- #post-0 -->

				</div>

			<?php get_sidebar(); ?>

		</div><!-- #content -->
	</div><!-- #stage -->

<?php get_footer(); ?>
