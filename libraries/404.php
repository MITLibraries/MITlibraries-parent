<?php
/**
 * The template for displaying 404 pages (Not Found).
 *
 * @package WordPress
 * @subpackage Twenty_Twelve
 * @since Twenty Twelve 1.0
 */

get_header(); ?>

	<div id="primary" class="site-content">
		<div id="content" role="main">

			<article id="post-0" class="post error404 no-results not-found">
				<header class="entry-header">
					<h1 class="entry-title"><?php _e( 'This file was not found.', 'twentytwelve' ); ?></h1>
				</header>

				<div class="entry-content">

					<p><?php _e( 'Search the Libraries\' web site:', 'twentytwelve' ); ?></p>

					<form action="http://www.google.com/cse" id="cse-search-box">
					  <div>
					    <input type="hidden" name="cx" value="012139403769412284441:qmnizspyywg">
					    <input type="hidden" name="ie" value="UTF-8">
					    <input type="text" name="q" size="31">
					    <input type="submit" name="sa" value="Search">
					  </div>
					</form>

					<h2><?php _e('Or, try one of the following resources:', 'twentytwelve'); ?></h2>

					<p><?php _e('BartonPlus', 'twentytwelve'); ?></p>

					<p><?php _e('Need more help? <a href="/ask">Ask us</a> or <a href="/research/help-yourself.html">help yourself</a>.', 'twentytwelve'); ?></p>

				</div><!-- .entry-content -->

			</article><!-- #post-0 -->

		</div><!-- #content -->
	</div><!-- #primary -->

<?php get_footer(); ?>