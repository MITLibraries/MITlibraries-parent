<?php
/**
 * The template used for displaying conditional header content in page.php
 *
 * @package WordPress
 * @subpackage Twenty_Twelve
 * @since Twenty Twelve 1.0
 */
 
$pageRoot = getRoot($post);
$section = get_post($pageRoot);
$isRoot = $section->ID == $post->ID;

?>

<div class="title-page">
				<?php if ($isRoot): ?>
				<h1><?php echo $section->post_title; ?></h1>
				<?php else: ?>
				<a class="title-page" href="<?php echo get_permalink($section->ID) ?>"><?php echo $section->post_title; ?></a>
				<?php endif; ?>
			</div>