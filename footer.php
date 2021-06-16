<?php
/**
 * The template for displaying the footer.
 *
 * @package MIT_Libraries_Parent
 * @since 1.2.1
 */

?>
<footer>
	
	<?php
	if ( 'alma' === get_site_option( 'network_discovery_mode' ) ) {
		get_template_part( 'inc/footer', 'alma' );
	} else {
		get_template_part( 'inc/footer', 'main' );
	}
	?>

	<div class="footer-info-institute">
		<a class="link-logo-mit" href="https://www.mit.edu">
			<span class="sr">MIT</span>
			<svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0" y="0" width="54" height="28" viewBox="0 0 54 28" enable-background="new 0 0 54 28" xml:space="preserve" class="logo-mit"><rect x="28.9" y="8.9" width="5.8" height="19.1" class="color"/><rect width="5.8" height="28"/><rect x="9.6" width="5.8" height="18.8"/><rect x="19.3" width="5.8" height="28"/><rect x="38.5" y="8.9" width="5.8" height="19.1"/><rect x="38.8" width="15.2" height="5.6"/><rect x="28.9" width="5.8" height="5.6"/></svg>
		</a><!-- End MIT Logo -->
		
		<div class="about-mit">
			<span class="item">Massachusetts Institute of Technology</span>
		</div><!-- End div.about-mit -->
		
		<div class="license">Content created by the MIT Libraries, <a href="https://creativecommons.org/licenses/by-nc/4.0/">CC BY-NC</a> unless otherwise noted. <a href="https://libraries.mit.edu/research-support/notices/copyright-notify/">Notify us about copyright concerns</a>.
	</div><!-- End div.footer-info-institure -->
</footer>
	

</div><!-- End div.wrap-page -->

<?php wp_footer(); ?>
</body>
</html>
