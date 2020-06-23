<?php
/**
 * The OpenGraph (or other social integration) metadata for a page.
 *
 * @package MIT_Libraries_Parent
 * @since 1.9.2
 */

?>
<?php
/**
 * We need to load the global $wp object in order to accurately render the
 * current URL.
 */
global $wp;

/**
 * We need the global $post object to load page content, because we aren't
 * in The Loop yet.
 * Reference: https://codex.wordpress.org/Class_Reference/WP_Post
 */
global $post;

?>
<meta property="og:title" content="<?php wp_title( '|', true, 'right' ); ?>"/>
<meta property="og:type" content="website" />
<meta property="og:image" content="<?php echo esc_url( get_template_directory_uri() . '/images/mit-libraries-logo-black-yellow-1200-1200.png', 'https' ); ?>"/>
<meta property="og:image:type" content="image/png" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="1200" />
<meta property="og:image:alt" content="MIT Libraries logo" />
<meta property="og:description" content="<?php echo esc_attr( ( $post->excerpt ) ? $post->excerpt : wp_trim_excerpt( $post->id ) ); ?>" />
<meta property="og:url" content="<?php echo esc_url( home_url( $wp->request ) . '/' ); ?>">
