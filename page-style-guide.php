<?php
/**
 * Template Name: Style Guide
 *
 * @package WordPress
 * @subpackage Twenty_Twelve
 * @since Twenty Twelve 1.0
 */

get_header(); ?>

		<div id="breadcrumb" class="inner hidden-phone" role="navigation" aria-label="breadcrumbs">
			<?php wsf_breadcrumbs(" &raquo; ", ""); ?>
		</div>

		<?php while ( have_posts() ) : the_post(); ?>
		
		<div class="contain-main" role="main">
	
			<div class="title-page">
				<h1><?php the_title(); ?></h1>
				<?php the_content(); ?>
			</div>
			
			<div class="content-page">
				<div class="guide-style">
					<article id="guide-headings">
						<h1 class="title-section">Headings (default)</h1>
						<h1>Heading 1</h1>
						<h2>Heading 2</h2>
						<h3>Heading 3</h3>
						<h4>Heading 4</h4>
						<h5>Heading 5</h5>
						<h6>Heading 6</h6>
					</article>
					<article id="guide-links">
						<h1 class="title-section">Links</h1>
						<h2 class="title-setting">Default</h2>
						<a href="#0">Lorem ipsum dolor</a>
						<a href="#0">Lorem ipsum dolor</a>
						<a href="#0">Lorem ipsum dolor</a>
						<a href="#0">Lorem ipsum dolor</a>
						<a href="#0">Lorem ipsum dolor</a>
						<h2 class="title-setting">Headings</h2>
						<a href="#0"><h1>Heading 1</h1></a>
						<a href="#0"><h2>Heading 2</h2></a>
						<a href="#0"><h3>Heading 3</h3></a>
						<a href="#0"><h4>Heading 4</h4></a>
						<a href="#0"><h5>Heading 5</h5></a>
						<a href="#0"><h6>Heading 6</h6></a>
					</article>
					<article id="guide-paragraphs">
						<h1 class="title-section">Paragraphs (default)</h1>
						<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque odio soluta fuga esse accusantium, voluptate, eos quod impedit! Quas cum saepe eaque quisquam culpa libero ipsum fuga necessitatibus tempore? Sequi!</p>
						<p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.</p>
						<p><em>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque laborum explicabo, praesentium commodi libero non odio totam quas culpa debitis dolores cupiditate eveniet vel, consequatur voluptatum? Alias quasi nesciunt, iusto.</em></p>
						<p><strong>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.</strong></p>
						<p><em><strong>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore saepe recusandae natus neque modi et minus, qui deleniti, sit voluptatibus laborum nemo quaerat dolorem id quam. Qui omnis incidunt illum.</strong></em></p>
					</article>
				</div>
			</div>

		</div>
		<?php endwhile; // end of the loop. ?>
<?php get_footer(); ?>