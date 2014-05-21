<?php
/**
 * The Header for our theme.
 *
 * Displays all of the <head> section and everything up till div#breadcrumb
 *
 * @package WordPress
 * @subpackage Twenty_Twelve
 * @since Twenty Twelve 1.0
 */
?><!DOCTYPE html>
<!--[if IE 7]>
<html class="ie ie7" <?php language_attributes(); ?>>
<![endif]-->
<!--[if IE 8]>
<html class="ie ie8" <?php language_attributes(); ?>>
<![endif]-->
<!--[if !(IE 7) | !(IE 8)  ]><!-->
<html <?php language_attributes(); ?> class="no-js">
<!--<![endif]-->
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>" />
<!-- <meta name="format-detection" content="telephone=no"> -->
<!--<meta name="viewport" content="width=device-width" />-->
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title><?php wp_title( '|', true, 'right' ); ?></title>
<link rel="profile" href="http://gmpg.org/xfn/11" />
<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>" />
<link href='http://fonts.googleapis.com/css?family=Open+Sans:400,300,400italic,700,700italic' rel='stylesheet' type='text/css'>
<?php wp_head(); ?>
<?php
		//$askUrl = get_post_meta($post->ID, "ask_us_override", 1);
		$askUrl = "";
		if ($askUrl == "") $askUrl = "/ask";
?>
	<script>
		todayDate="";
	</script>
</head>

<body <?php body_class(); ?>>
	<div class="wrap-page">
		<header class="header-main group">

			<a href="/" class="logo-mit-lib">MIT Libraries</a>

			<?php get_template_part('inc/nav', 'main'); ?>
			
		</header>

		<?php 
			// Temporary maintenance page for site under development.
			// Change $blog_id to match.
			if (!is_user_logged_in() && $blog_id == 99) {
				get_template_part('inc/maintenance');
				get_footer();
				exit;
			}

			else {
				$pageRoot = getRoot($post);
				$section = get_post($pageRoot);
			}
		?>