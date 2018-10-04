<?php
/**
 * The template used for displaying conditional header content in page.php
 *
 * @package MIT_Libraries_Parent
 * @since 1.2.1
 */

$pageRoot = getRoot( $post );
$section = get_post( $pageRoot );
$isRoot = $section->ID == $post->ID;

?>

<div class="title-page">
				<?php if ( $isRoot ) : ?>
				<h1><?php echo esc_html( $section->post_title ); ?></h1>
				<?php else : ?>
				<a class="title-page-link" href="<?php echo esc_url( get_permalink( $section->ID ) ); ?>"><?php echo esc_html( $section->post_title ); ?></a>
				<?php endif; ?>
			</div>
