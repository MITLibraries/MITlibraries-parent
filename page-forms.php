<?php
/**
 * Template Name: Forms
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site will use a
 * different template.
 *
 * @package MIT_Libraries_Parent
 * @since 1.2.1
 */

$pageRoot = getRoot( $post );
$section = get_post( $pageRoot );
$isRoot = $section->ID == $post->ID;

// Read and treat Shibboleth EPPN value for use in page.
$eppn = shibboleth_eppn();

get_header();

?>
<script language="JavaScript" type="text/javascript">
  <!--
  /** Add any load time jquery actions here */
  $(document).ready(function() {
	if (cookies.readCookie("libForma") != null) {
		cookies.setDocumentValues("libForma", ",", "=");
	}
});

document.addEventListener( 'wpcf7mailsent', function( event ) {
	ga( 'send', 'event', 'Form', 'submit' );
}, false );
//-->
</script>
	<?php if ( is_active_sidebar( 'sidebar-search' ) ) : ?>
		<div id="sidebar-search" class="widget-area" role="complementary">
			<?php dynamic_sidebar( 'sidebar-search' ); ?>
		</div>
	<?php endif; ?>

	<?php
	if ( in_category( 'shortcrumb' ) ) {
		get_template_part( 'inc/breadcrumbs', 'noChild' );
	} else {
		get_template_part( 'inc/breadcrumbs' );
	}
	while ( have_posts() ) : the_post();

		$has_sidebar = '';
		if ( is_active_sidebar( 'sidebar-1' ) ) {
			$has_sidebar = ' has-sidebar';
		}
		?>

		<div id="stage" class="inner" role="main">
		
		<div id="content" class="content<?php echo esc_html( $has_sidebar ); ?>">
		
			<?php if ( in_category( 'shortcrumb' ) ) { ?>
			<?php get_template_part( 'content', 'shortcrumb' ); ?>
			<?php } else { ?>				
			<?php get_template_part( 'content', 'form' ); ?>
			<?php } ?>
							
			<?php if ( is_active_sidebar( 'sidebar-1' ) ) : ?>
			<?php get_sidebar(); ?>
			<?php endif; ?>

			</div>
		
		</div><!-- end div#stage -->
		
		<?php endwhile; ?>
<form id="loginForm">
	<input type="hidden" id="eppn" name="eppn" value="<?php echo esc_attr( $eppn ); ?>">
</form>

<script type="text/javascript">
<!--
$(document).ready(function() {

	eppn = document.getElementById("eppn").value;
	if (eppn) {

		console.log( 'Authenticating _' + eppn + '_' );
		logins.doAuthenticate(eppn);
		var timeout = setTimeout('cookies.setDocumentValues("libForma",",","=")',5000);

	} else {
		console.log( 'EPPN not found' );
	}

});

-->
</script>
<?php get_footer(); ?>
