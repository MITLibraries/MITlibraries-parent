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
<title><?php wp_title( '|', true, 'right' ); ?></title>
<meta property="og:title" content="MIT Libraries"/>
<meta property="og:image" content="//libraries.mit.edu/wp-content/themes/libraries/images/mit-libraries-logo-bg-black-1200-1200.png"/>
<meta property="og:url" content="//libraries.mit.edu">
<link rel="profile" href="http://gmpg.org/xfn/11" />
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

<body id="libraries-homepage" <?php body_class(); ?>>
	<div class="wrap-page">
		<div id="skip"><a href="#wrap-content">Skip to Main Content</a></div>
		<header class="header-main flex-container flex-end">
			<h1 class="name-site group nav-logo">
				<a href="/" class="logo-mit-lib" alt="MIT Libraries Logo">
					<svg xmlns="http://www.w3.org/2000/svg" width="193.9" height="77.55" viewBox="0 0 193.9 77.55"><title>MIT Libraries logo</title><path d="M5.3,5.55H17.2L21.55,21.2q0.25,0.85.58,2.22T22.8,26.1q0.4,1.55.8,3.25h0.1q0.35-1.7.75-3.25,0.3-1.3.65-2.67t0.6-2.22L30.1,5.55h12V41.3H34V21.58q0-1.17,0-2.37,0-1.4.1-3.05H34q-0.4,1.55-.7,2.85t-0.53,2.22q-0.28,1.08-.42,1.58L27.25,41.3h-7.3l-5.1-18.45q-0.15-.5-0.45-1.6T13.85,19q-0.3-1.3-.65-2.85H13.1q0,1.65,0,3.05,0,1.2.08,2.4t0,1.75v18h-8V5.55Zm40,0h8.85V41.3H45.32V5.55ZM67.4,13H57V5.55H86.75V13H76.25V41.3H67.4V13ZM5.3,46.55h8.85V74.8H30.82v7.5H5.3V46.55Zm28.7,0h8.15v6.6H34v-6.6ZM34,56.7h8.15V82.3H34V56.7ZM61,83.1a9.84,9.84,0,0,1-4.55-1,7.87,7.87,0,0,1-3.2-3h-0.1V82.3h-7.8V46.55h8.15v13h0.15A9.45,9.45,0,0,1,56.55,57a8.63,8.63,0,0,1,4.37-1,9.89,9.89,0,0,1,4.53,1,10.16,10.16,0,0,1,3.45,2.85,13.44,13.44,0,0,1,2.2,4.3,17.91,17.91,0,0,1,.78,5.38,19.49,19.49,0,0,1-.78,5.72,12.5,12.5,0,0,1-2.2,4.28,9.47,9.47,0,0,1-3.45,2.67A10.66,10.66,0,0,1,61,83.1Zm-2.3-6.45a4.14,4.14,0,0,0,3.67-1.92,9.45,9.45,0,0,0,1.28-5.27,9.74,9.74,0,0,0-1.28-5.3,4.19,4.19,0,0,0-3.77-2,4.44,4.44,0,0,0-4,2.1,9.66,9.66,0,0,0-1.33,5.25,8.53,8.53,0,0,0,1.45,5.17A4.69,4.69,0,0,0,58.67,76.65ZM73.81,56.7h7.8v4h0.15a9.63,9.63,0,0,1,3-3.35,7.29,7.29,0,0,1,4-1,4.41,4.41,0,0,1,1.6.2v7h-0.2a7.36,7.36,0,0,0-6,1.27Q82,66.6,82,70.8V82.3H73.81V56.7ZM99.76,83a12,12,0,0,1-3.53-.5A7.54,7.54,0,0,1,93.46,81a7,7,0,0,1-1.8-2.45A8.11,8.11,0,0,1,91,75.15a7.29,7.29,0,0,1,.78-3.52,6.67,6.67,0,0,1,2.12-2.35A10.55,10.55,0,0,1,97,67.85a25.72,25.72,0,0,1,3.77-.75,24.65,24.65,0,0,0,5-1,1.92,1.92,0,0,0,1.45-1.85,2.57,2.57,0,0,0-.83-2,3.92,3.92,0,0,0-2.67-.75,4.45,4.45,0,0,0-3,.85,3.67,3.67,0,0,0-1.2,2.45h-7.5a8.46,8.46,0,0,1,.8-3.4,8.17,8.17,0,0,1,2.17-2.8,10.56,10.56,0,0,1,3.58-1.9,16.34,16.34,0,0,1,5-.7,19.62,19.62,0,0,1,4.9.52,9.73,9.73,0,0,1,3.4,1.58,7.29,7.29,0,0,1,2.45,3,10.63,10.63,0,0,1,.8,4.25V78.3a13,13,0,0,0,.17,2.42,1.78,1.78,0,0,0,.73,1.23V82.3h-7.9a3.37,3.37,0,0,1-.5-1.12,14.64,14.64,0,0,1-.35-1.72h-0.1A8.47,8.47,0,0,1,104.44,82,9.92,9.92,0,0,1,99.76,83Zm2.6-5.2a5.45,5.45,0,0,0,3.73-1.25,4.23,4.23,0,0,0,1.42-3.35v-3a11.85,11.85,0,0,1-1.87.73q-1.08.33-2.33,0.63a10.45,10.45,0,0,0-3.4,1.27,2.47,2.47,0,0,0-1.05,2.17,2.42,2.42,0,0,0,1,2.2A4.5,4.5,0,0,0,102.36,77.75Zm15.87-21H126v4h0.15a9.63,9.63,0,0,1,3-3.35,7.29,7.29,0,0,1,4-1,4.41,4.41,0,0,1,1.6.2v7h-0.2a7.36,7.36,0,0,0-6,1.27q-2.23,1.83-2.23,6V82.3h-8.15V56.7Zm18.94-10.15h8.15v6.6h-8.15v-6.6Zm0,10.15h8.15V82.3h-8.15V56.7Zm24,26.35a15.16,15.16,0,0,1-5.7-1,12.12,12.12,0,0,1-4.3-2.85,12.66,12.66,0,0,1-2.7-4.33,15.06,15.06,0,0,1-1-5.4,14.72,14.72,0,0,1,1-5.33,12.71,12.71,0,0,1,2.7-4.3A12.46,12.46,0,0,1,155.3,57a14.58,14.58,0,0,1,10.28-.17,12.28,12.28,0,0,1,3.83,2.35,12.76,12.76,0,0,1,3.42,5.33,20.72,20.72,0,0,1,1.08,7.13H155.5a7.52,7.52,0,0,0,1.8,4.1,5.14,5.14,0,0,0,4,1.5,4.81,4.81,0,0,0,2.65-.68,4.3,4.3,0,0,0,1.6-1.87h8a9.47,9.47,0,0,1-1.5,3.33,10.65,10.65,0,0,1-2.8,2.73,12.12,12.12,0,0,1-3.58,1.75A15.22,15.22,0,0,1,161.15,83Zm4.5-16.3a6,6,0,0,0-1.55-3.65,4.39,4.39,0,0,0-3.3-1.35,4.66,4.66,0,0,0-3.6,1.35,7,7,0,0,0-1.65,3.65h10.1Zm21.9,16.35q-5.65,0-8.95-2.42A8.35,8.35,0,0,1,175.1,74h7.7a4.15,4.15,0,0,0,1.45,2.85,5.09,5.09,0,0,0,3.25,1,5.63,5.63,0,0,0,2.92-.65,2.09,2.09,0,0,0,1.08-1.9,1.82,1.82,0,0,0-.55-1.37,4.08,4.08,0,0,0-1.45-.85,10.92,10.92,0,0,0-2.08-.5q-1.17-.17-2.42-0.42-1.65-.3-3.3-0.72a10.14,10.14,0,0,1-3-1.28,6.33,6.33,0,0,1-2.12-2.27,7.45,7.45,0,0,1-.8-3.68,7.1,7.1,0,0,1,.87-3.55A7.64,7.64,0,0,1,179,58a11.18,11.18,0,0,1,3.53-1.55,17,17,0,0,1,4.28-.52q5.45,0,8.35,2.2a8,8,0,0,1,3.2,6h-7.5a3,3,0,0,0-1.33-2.37,5.48,5.48,0,0,0-2.78-.62,5.1,5.1,0,0,0-2.52.58,1.9,1.9,0,0,0-1,1.78,1.33,1.33,0,0,0,.5,1.1,4.21,4.21,0,0,0,1.35.67,14.86,14.86,0,0,0,2,.48l2.33,0.4q1.7,0.3,3.42.73A10.59,10.59,0,0,1,196,68.2a7.05,7.05,0,0,1,2.32,2.42,7.75,7.75,0,0,1,.9,4A7.35,7.35,0,0,1,195.9,81a11.75,11.75,0,0,1-3.7,1.6A18.75,18.75,0,0,1,187.54,83.1Z" transform="translate(-5.3 -5.55)" /></svg>
					<span class="sr">MIT Libraries</span>
				</a><!-- End MIT Libraries Logo -->
			</h1><!-- End H1.name-site -->

			<?php get_template_part( 'inc/nav', 'main' ); ?>
			
			<a class="link-logo-mit" href="http://www.mit.edu" alt="Massaschusetts Institute of Technology logo"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0" y="0" width="54" height="28" viewBox="0 0 54 28" enable-background="new 0 0 54 28" xml:space="preserve" class="logo-mit"><rect x="28.9" y="8.9" width="5.8" height="19.1" class="color"/><rect width="5.8" height="28"/><rect x="9.6" width="5.8" height="18.8"/><rect x="19.3" width="5.8" height="28"/><rect x="38.5" y="8.9" width="5.8" height="19.1"/><rect x="38.8" width="15.2" height="5.6"/><rect x="28.9" width="5.8" height="5.6"/></svg>
				<span class="sr">MIT Logo</span>
			</a><!-- End MIT Logo -->

			<a href="/search" class="link-site-search hidden-non-mobile">
				<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="12" height="16" viewBox="0 0 12 12" alt="search" class="icon-search"><path d="M7.273 0.727q1.187 0 2.19 0.585t1.588 1.588 0.585 2.19-0.585 2.19-1.588 1.588-2.19 0.585q-1.278 0-2.33-0.676l-3.284 3.301q-0.295 0.284-0.688 0.284-0.403 0-0.688-0.284t-0.284-0.688 0.284-0.688l3.301-3.284q-0.676-1.051-0.676-2.33 0-1.188 0.585-2.19t1.588-1.588 2.19-0.585zM7.273 8q0.591 0 1.128-0.23t0.929-0.622 0.622-0.929 0.23-1.128-0.23-1.128-0.622-0.929-0.929-0.622-1.128-0.23-1.128 0.23-0.929 0.622-0.622 0.929-0.23 1.128 0.23 1.128 0.622 0.929 0.929 0.622 1.128 0.23z"></path></svg>
				<span class="bottom">Search</span>
			</a><!-- End Search -->
			
			<a href="/barton-account" class="link-account hidden-non-mobile">
				<svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0" y="0" width="15.4" height="16" viewBox="0 0 15.4 16" enable-background="new 0 0 15.445 16" xml:space="preserve" class="icon-account"><path d="M13.4 15.7C12.2 15.9 10.4 16 7.7 16c-5.4 0-7.3-0.6-7.3-0.6 -0.3-0.1-0.4-0.4-0.4-0.7 0.3-1.6 1.2-2.5 2.5-3.3 0.3-0.2 0.8-0.4 1.2-0.6 0.8-0.3 1.8-0.7 2-1.3C5.8 9.2 5.7 8.6 5.2 7.9c-1.4-2.3-1.7-4.3-0.8-5.9C5.1 0.7 6.4 0 7.7 0c1.4 0 2.6 0.7 3.3 2 0.9 1.6 0.7 3.6-0.8 5.9C9.8 8.6 9.6 9.2 9.8 9.6c0.2 0.6 1.2 1 2 1.3 0.4 0.2 0.9 0.4 1.2 0.6 1.2 0.8 2.1 1.6 2.5 3.3 0.1 0.3-0.1 0.6-0.4 0.7C15 15.4 14.5 15.6 13.4 15.7"/></svg>
				<span class="bottom">Account</span>
			</a><!-- End barton-account -->

			<a href="/contact" class="link-contact hidden-non-mobile">
				<svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0" y="0" width="13.001px" height="13px" viewBox="0 0 13.001 13" enable-background="new 0 0 13.001 13" xml:space="preserve"><path d="M3.727 13H3.67c-0.203 0-0.4-0.019-0.597-0.044 -0.286-0.032-0.571-0.108-0.87-0.223 -0.425-0.172-0.806-0.419-1.117-0.711l-0.641-0.641c-0.273-0.273-0.432-0.623-0.444-0.997 -0.013-0.394 0.127-0.755 0.4-1.028l1.803-1.803C2.458 7.3 2.8 7.16 3.175 7.16c0.394 0 0.781 0.159 1.054 0.432l0.978 0.983c0.54-0.298 1.238-0.711 1.949-1.421 0.717-0.717 1.123-1.416 1.422-1.949L7.593 4.228C7.034 3.663 7.015 2.742 7.555 2.203L9.358 0.4C9.612 0.14 9.96 0 10.329 0h0.057c0.375 0.013 0.725 0.171 0.997 0.438l0.635 0.641c0.298 0.317 0.546 0.698 0.718 1.117 0.113 0.305 0.189 0.59 0.229 0.882C12.989 3.275 13 3.472 13 3.669c0.02 1.974-1.078 4.189-3.104 6.227C7.878 11.896 5.688 13 3.727 13L3.727 13zM2.781 8.125L0.979 9.928c-0.114 0.114-0.171 0.261-0.165 0.425 0.006 0.166 0.076 0.324 0.203 0.451l0.641 0.635c0.229 0.223 0.521 0.406 0.844 0.539 0.229 0.09 0.451 0.146 0.679 0.172 0.165 0.025 0.33 0.038 0.495 0.038h0.051c1.72 0 3.758-1.048 5.599-2.869 1.835-1.854 2.882-3.91 2.862-5.643 0-0.159-0.012-0.33-0.037-0.495 -0.025-0.229-0.083-0.451-0.178-0.686 -0.127-0.317-0.312-0.609-0.54-0.851l-0.628-0.628c-0.121-0.127-0.279-0.197-0.451-0.203l0 0c-0.178 0-0.317 0.057-0.419 0.159L8.125 2.78C7.911 2.996 7.929 3.409 8.17 3.65l1.402 1.403 -0.203 0.4c-0.336 0.603-0.78 1.416-1.637 2.279 -0.857 0.851-1.67 1.301-2.26 1.625L5.06 9.579l-1.409-1.41C3.53 8.049 3.359 7.973 3.175 7.973 3.016 7.973 2.876 8.03 2.781 8.125z"/></svg>
				<span class="bottom">Contact</span>
			</a><!-- End /contact -->

		</header>

		<?php

			$pageRoot = getRoot( $post );
			$section = get_post( $pageRoot );

		?>

		<div class="brand-splash big">
			<a class="btn-minimize" title="minimize" href=""><span class="sr">Minimize</span><i class="fa fa-angle-up" aria-hidden="true"></i></a>

			<div class="wrap-lead">
				<h2 class="lead">The future of knowledge depends on libraries. That future starts here.</h2>
			</div>

			<div class="wrap-cta">
				<p class="cta">
					<span class="logo">
						<svg xmlns="http://www.w3.org/2000/svg" width="193.9" height="77.55" viewBox="0 0 193.9 77.55"><title>MIT Libraries logo</title><path d="M5.3,5.55H17.2L21.55,21.2q0.25,0.85.58,2.22T22.8,26.1q0.4,1.55.8,3.25h0.1q0.35-1.7.75-3.25,0.3-1.3.65-2.67t0.6-2.22L30.1,5.55h12V41.3H34V21.58q0-1.17,0-2.37,0-1.4.1-3.05H34q-0.4,1.55-.7,2.85t-0.53,2.22q-0.28,1.08-.42,1.58L27.25,41.3h-7.3l-5.1-18.45q-0.15-.5-0.45-1.6T13.85,19q-0.3-1.3-.65-2.85H13.1q0,1.65,0,3.05,0,1.2.08,2.4t0,1.75v18h-8V5.55Zm40,0h8.85V41.3H45.32V5.55ZM67.4,13H57V5.55H86.75V13H76.25V41.3H67.4V13ZM5.3,46.55h8.85V74.8H30.82v7.5H5.3V46.55Zm28.7,0h8.15v6.6H34v-6.6ZM34,56.7h8.15V82.3H34V56.7ZM61,83.1a9.84,9.84,0,0,1-4.55-1,7.87,7.87,0,0,1-3.2-3h-0.1V82.3h-7.8V46.55h8.15v13h0.15A9.45,9.45,0,0,1,56.55,57a8.63,8.63,0,0,1,4.37-1,9.89,9.89,0,0,1,4.53,1,10.16,10.16,0,0,1,3.45,2.85,13.44,13.44,0,0,1,2.2,4.3,17.91,17.91,0,0,1,.78,5.38,19.49,19.49,0,0,1-.78,5.72,12.5,12.5,0,0,1-2.2,4.28,9.47,9.47,0,0,1-3.45,2.67A10.66,10.66,0,0,1,61,83.1Zm-2.3-6.45a4.14,4.14,0,0,0,3.67-1.92,9.45,9.45,0,0,0,1.28-5.27,9.74,9.74,0,0,0-1.28-5.3,4.19,4.19,0,0,0-3.77-2,4.44,4.44,0,0,0-4,2.1,9.66,9.66,0,0,0-1.33,5.25,8.53,8.53,0,0,0,1.45,5.17A4.69,4.69,0,0,0,58.67,76.65ZM73.81,56.7h7.8v4h0.15a9.63,9.63,0,0,1,3-3.35,7.29,7.29,0,0,1,4-1,4.41,4.41,0,0,1,1.6.2v7h-0.2a7.36,7.36,0,0,0-6,1.27Q82,66.6,82,70.8V82.3H73.81V56.7ZM99.76,83a12,12,0,0,1-3.53-.5A7.54,7.54,0,0,1,93.46,81a7,7,0,0,1-1.8-2.45A8.11,8.11,0,0,1,91,75.15a7.29,7.29,0,0,1,.78-3.52,6.67,6.67,0,0,1,2.12-2.35A10.55,10.55,0,0,1,97,67.85a25.72,25.72,0,0,1,3.77-.75,24.65,24.65,0,0,0,5-1,1.92,1.92,0,0,0,1.45-1.85,2.57,2.57,0,0,0-.83-2,3.92,3.92,0,0,0-2.67-.75,4.45,4.45,0,0,0-3,.85,3.67,3.67,0,0,0-1.2,2.45h-7.5a8.46,8.46,0,0,1,.8-3.4,8.17,8.17,0,0,1,2.17-2.8,10.56,10.56,0,0,1,3.58-1.9,16.34,16.34,0,0,1,5-.7,19.62,19.62,0,0,1,4.9.52,9.73,9.73,0,0,1,3.4,1.58,7.29,7.29,0,0,1,2.45,3,10.63,10.63,0,0,1,.8,4.25V78.3a13,13,0,0,0,.17,2.42,1.78,1.78,0,0,0,.73,1.23V82.3h-7.9a3.37,3.37,0,0,1-.5-1.12,14.64,14.64,0,0,1-.35-1.72h-0.1A8.47,8.47,0,0,1,104.44,82,9.92,9.92,0,0,1,99.76,83Zm2.6-5.2a5.45,5.45,0,0,0,3.73-1.25,4.23,4.23,0,0,0,1.42-3.35v-3a11.85,11.85,0,0,1-1.87.73q-1.08.33-2.33,0.63a10.45,10.45,0,0,0-3.4,1.27,2.47,2.47,0,0,0-1.05,2.17,2.42,2.42,0,0,0,1,2.2A4.5,4.5,0,0,0,102.36,77.75Zm15.87-21H126v4h0.15a9.63,9.63,0,0,1,3-3.35,7.29,7.29,0,0,1,4-1,4.41,4.41,0,0,1,1.6.2v7h-0.2a7.36,7.36,0,0,0-6,1.27q-2.23,1.83-2.23,6V82.3h-8.15V56.7Zm18.94-10.15h8.15v6.6h-8.15v-6.6Zm0,10.15h8.15V82.3h-8.15V56.7Zm24,26.35a15.16,15.16,0,0,1-5.7-1,12.12,12.12,0,0,1-4.3-2.85,12.66,12.66,0,0,1-2.7-4.33,15.06,15.06,0,0,1-1-5.4,14.72,14.72,0,0,1,1-5.33,12.71,12.71,0,0,1,2.7-4.3A12.46,12.46,0,0,1,155.3,57a14.58,14.58,0,0,1,10.28-.17,12.28,12.28,0,0,1,3.83,2.35,12.76,12.76,0,0,1,3.42,5.33,20.72,20.72,0,0,1,1.08,7.13H155.5a7.52,7.52,0,0,0,1.8,4.1,5.14,5.14,0,0,0,4,1.5,4.81,4.81,0,0,0,2.65-.68,4.3,4.3,0,0,0,1.6-1.87h8a9.47,9.47,0,0,1-1.5,3.33,10.65,10.65,0,0,1-2.8,2.73,12.12,12.12,0,0,1-3.58,1.75A15.22,15.22,0,0,1,161.15,83Zm4.5-16.3a6,6,0,0,0-1.55-3.65,4.39,4.39,0,0,0-3.3-1.35,4.66,4.66,0,0,0-3.6,1.35,7,7,0,0,0-1.65,3.65h10.1Zm21.9,16.35q-5.65,0-8.95-2.42A8.35,8.35,0,0,1,175.1,74h7.7a4.15,4.15,0,0,0,1.45,2.85,5.09,5.09,0,0,0,3.25,1,5.63,5.63,0,0,0,2.92-.65,2.09,2.09,0,0,0,1.08-1.9,1.82,1.82,0,0,0-.55-1.37,4.08,4.08,0,0,0-1.45-.85,10.92,10.92,0,0,0-2.08-.5q-1.17-.17-2.42-0.42-1.65-.3-3.3-0.72a10.14,10.14,0,0,1-3-1.28,6.33,6.33,0,0,1-2.12-2.27,7.45,7.45,0,0,1-.8-3.68,7.1,7.1,0,0,1,.87-3.55A7.64,7.64,0,0,1,179,58a11.18,11.18,0,0,1,3.53-1.55,17,17,0,0,1,4.28-.52q5.45,0,8.35,2.2a8,8,0,0,1,3.2,6h-7.5a3,3,0,0,0-1.33-2.37,5.48,5.48,0,0,0-2.78-.62,5.1,5.1,0,0,0-2.52.58,1.9,1.9,0,0,0-1,1.78,1.33,1.33,0,0,0,.5,1.1,4.21,4.21,0,0,0,1.35.67,14.86,14.86,0,0,0,2,.48l2.33,0.4q1.7,0.3,3.42.73A10.59,10.59,0,0,1,196,68.2a7.05,7.05,0,0,1,2.32,2.42,7.75,7.75,0,0,1,.9,4A7.35,7.35,0,0,1,195.9,81a11.75,11.75,0,0,1-3.7,1.6A18.75,18.75,0,0,1,187.54,83.1Z" transform="translate(-5.3 -5.55)" /></svg>
						<span class="sr">MIT Libraries</span>
					</span>
					<span class="tag">Saving the world,<br />bit by bit.</span>
					<span class="cta-link-box"><a class="cta-link" href="/about/">Join us</a> &gt;</span>
				</p>
			</div>

		</div>
