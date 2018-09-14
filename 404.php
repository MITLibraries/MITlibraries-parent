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
						<header class="entry-header">
							<h1 class="entry-title">This file was not found.</h1>
						</header>

						<div class="entry-content">
							<h2>Search the Libraries\' web site:</h2>

							<form action="https://www.google.com/cse" id="cse-search-box">
								<div>
									<input type="hidden" name="cx" value="012139403769412284441:qmnizspyywg">
									<input type="hidden" name="ie" value="UTF-8">
									<input type="text" name="q" size="80" style="width: 300px;">
									<input type="submit" name="sa" value="Search">
								</div>
							</form>

							<h2>Browse our <a href="/about/site-search">A-Z index of pages</a> on this site.</h2>

							<p>You can also check out these commonly-used resources:</p>

							<ul>
								<li><a href="//libraries.mit.edu/quicksearch">Quick search: Books, articles, &amp; more at MIT</a></li>
								<li><a href="//libguides.mit.edu/directory">Staff directory</a></li>
								<li><a href="/research-guides">Research guides - databases by subject</a></li>
								<li><a href="/about/shortcuts/">Shortcuts to frequently used pages</a></li>
								<li><a href="//web.mit.edu/search.html">MIT web site search</a></li>
							</ul>

							<p><a href="/ask">Need more help? Ask us!</a></p>

						</div><!-- .entry-content -->

					</article><!-- #post-0 -->

				</div>

			<?php get_sidebar(); ?>

		</div><!-- #content -->
	</div><!-- #stage -->

<?php get_footer(); ?>
