<?php
/**
 * The template used for displaying page content in page.php
 *
 * @package WordPress
 * @subpackage Twenty_Twelve
 * @since Twenty Twelve 1.0
 */
global $isRoot;
?>
<div class="row">

	<div id="leftContent" class="span2">
		<div class="pagenav">
		<ul>
		<?php
			//$pageParent = getParent($post->ID);
			
			$pageRoot = getRoot($post);
			$section = get_post($pageRoot);
						
			$args = array(
				"child_of" => $pageRoot,
				"title_li" => "",
			);
			
			$menuName = $section->post_name;
			
			$menu = wp_get_nav_menu_items($menuName);
			
			if ($menu) {
				wp_nav_menu( array( 'menu' => $menuName, 'menu_class' => 'nav-menu' ) ); 
			} else {
				wp_list_pages( $args ); 
			}
		?>
		</ul>
		</div>
	</div>
	
	<div id="mainContent" class="span7">
		<div class="entry-content">
			<?php if (!$isRoot): ?>
			<h2><?php the_title(); ?></h2>
			<?php endif; ?>
			<?php the_content(); ?>
			
		</div>
		<footer class="entry-meta">
			<?php edit_post_link( __( 'Edit', 'twentytwelve' ), '<span class="edit-link">', '</span>' ); ?>
		</footer><!-- .entry-meta -->
		
	</div>
	
	<?php get_sidebar(); ?>
</div>
