<?php
/**
 *
 * Unline other pages in the Libraries theme,
 * this page template renders the page title
 * from the post, rather than from the parent
 * if the page is a child page.
 *
 * @package MIT_Libraries_Parent
 * @since 1.2.1
 */

$pageRoot = getRoot( $post );
$section = get_post( $pageRoot );
$isRoot = $section->ID == $post->ID;
?>

				<div class="title-page">
					<h1><?php the_title(); ?></h1>
				</div>
