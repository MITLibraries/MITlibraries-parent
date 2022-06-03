<?php
/**
 * The Header for our theme.
 *
 * Displays all of the <head> section and everything up till div#breadcrumb
 *
 * @package MIT_Libraries_Parent
 * @since 1.2.1
 */

?><!DOCTYPE html>
<!--[if lte IE 9]><html class="no-js lte-ie9" lang="en"><![endif]-->
<!--[if !(IE 8) | !(IE 9) ]><!-->
<html <?php language_attributes(); ?> class="no-js">
<!--<![endif]-->
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>" />
<!-- <meta name="format-detection" content="telephone=no"> -->
<!--<meta name="viewport" content="width=device-width" />-->
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="description" content="The libraries of the Massachusetts Institute of Technology - Search, Visit, Research, Explore" />
<title><?php wp_title( '|', true, 'right' ); ?></title>
<?php get_template_part( 'inc/header', 'opengraph' ); ?>
<link rel="profile" href="https://gmpg.org/xfn/11" />
<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>" />
<?php wp_head(); ?>
<?php
		// $askUrl = get_post_meta($post->ID, "ask_us_override", 1);
		$askUrl = '';
		if ( '' === $askUrl ) {
			$askUrl = '/ask';
		}
?>
	<script>
		todayDate="";
	</script>
</head>

<body <?php body_class(); ?>>
	<div id="skip"><a href="#content">Skip to Main Content</a></div>
	<div class="wrap-page">
		<header class="header-main flex-container flex-end">
	
			<?php get_template_part( 'inc/nav', 'hamburger' ); ?>

			<?php get_template_part( 'inc/liblogo' ); ?>

			<?php
			if ( 'alma' === get_site_option( 'network_discovery_mode' ) ) {
				get_template_part( 'inc/nav', 'alma' );
			} else {
				get_template_part( 'inc/nav', 'main' );
			}
			?>
			
			<a class="link-logo-mit" href="http://www.mit.edu"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0" y="0" width="54" height="28" viewBox="0 0 54 28" enable-background="new 0 0 54 28" xml:space="preserve" class="logo-mit"><title>Massaschusetts Institute of Technology logo</title><rect x="28.9" y="8.9" width="5.8" height="19.1" class="color"/><rect width="5.8" height="28"/><rect x="9.6" width="5.8" height="18.8"/><rect x="19.3" width="5.8" height="28"/><rect x="38.5" y="8.9" width="5.8" height="19.1"/><rect x="38.8" width="15.2" height="5.6"/><rect x="28.9" width="5.8" height="5.6"/></svg>
				<span class="sr">MIT Logo</span>
			</a><!-- End MIT Logo -->

			<?php get_template_part( 'inc/nav', 'smalldisplays' ); ?>

		</header>

		<?php

			$pageRoot = getRoot( $post );
			$section = get_post( $pageRoot );

		?>
