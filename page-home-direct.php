<?php
/**
 * Template Name: Home Page
 *
 * @package MIT_Libraries_Parent
 * @since 1.2.1
 */

	get_header(); ?>

<div id="content">
<?php
if ( is_active_sidebar( 'sidebar-search' ) ) :
?>
	<div id="sidebar-search" class="widget-area" role="complementary">
		<?php dynamic_sidebar( 'sidebar-search' ); ?>
	</div>
<?php else :
		get_template_part( 'inc/search' );
endif; ?>

	<div class="content-main flex-container libraries-home" role="main">
		<div class="col-1 flex-item">
			<div class="hours-locations">
				<?php if ( is_active_sidebar( 'sidebar-hours' ) ) { ?>
					<?php dynamic_sidebar( 'sidebar-hours' ); ?>
				<?php } else { ?>
					<?php get_template_part( 'inc/homepage-hours' ); ?>
				<?php } ?>
			</div><!-- end div.hours-locations -->
		</div><!-- end div.col-1 -->
		<div class="col-2 flex-item">
			<div id="home-posts-news" class="posts--preview news-events">
				<h2><a href="/news">News &amp; events</a></h2>
				<div class="flex-container">

		<?php
			// This calls the news routines that are found in /lib/news.php.
			LoadNews();
		?>

				</div>
				<a href="/news" class="button-primary--orange link-news">All news &amp; events</a>
			</div><!-- end div.news-events -->
			<div class="guides-experts">
				<h2><a href="/experts">Research guides &amp; experts</a></h2>
				<h3 class="hidden-text" style="margin-top: -1.5em; padding: 0;">Research guides</h3><!-- per accesibility review for screen readers -->
				<p class="caption">Specialized guides for every research interest.</p>
				<p class="caption">Not sure where to start? <a href="/ask" class="link-ask no-underline"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0" y="0" width="16" height="16" viewBox="0 0 16 16" enable-background="new 0 0 16 16" xml:space="preserve"><path d="M16 5v2c0 2.8-2.2 5-5 5h-1l-5 4v-4c-2.7 0-5-2.2-5-5V5c0-2.7 2.3-5 5-5h6C13.8 0 16 2.3 16 5zM15 5c0-2.2-1.8-4-4-4H5C2.8 1 1 2.8 1 5v2c0 2.2 1.8 4 4 4h1v1 1.9l3.4-2.7L9.6 11H10h1c2.2 0 4-1.8 4-4V5zM13 4.8C13 4.9 12.9 5 12.8 5h-9.5C3.1 5 3 4.9 3 4.8S3.1 4.5 3.3 4.5h9.5C12.9 4.5 13 4.6 13 4.8zM13 7.3c0 0.1-0.1 0.3-0.2 0.3h-9.5C3.1 7.5 3 7.4 3 7.3S3.1 7 3.3 7h9.5C12.9 7 13 7.1 13 7.3z"/></svg> Ask Us</a></p>
				<div id="guide-list-home" class="guide-list">
				</div>
				<div class="experts-group flex-container">
					<h3 class="hidden-text" style="margin-top: -1.5em; padding: 0;">Research experts</h3><!-- per accesibility review for screen readers -->
					<ul>
						<li class="expert"></li>
						<li class="expert"></li>
						<li class="expert"></li>
						<li class="expert"></li>
					</ul>
				</div>
				<a href="/experts" class="button-primary--magenta view-experts">All <span class="count">32</span> experts</a>
			</div><!-- end div.guides-experts -->
		</div><!-- end div.col-2 -->
	</div><!-- end div.content-main -->

<?php
	get_footer();
?>

</div>
<!-- end #content -->
