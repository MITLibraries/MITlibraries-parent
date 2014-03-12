<?php
/**
 * The template for displaying the footer.
 *
 * Contains footer content and the closing of the
 * #main and #page div elements.
 *
 * @package WordPress
 * @subpackage Twenty_Twelve
 * @since Twenty Twelve 1.0
 */
?>
		<div class="clear"></div>
		<footer class="inner" role="contentinfo">
			<div id="footerHeader" class="footerHeader">
				<a href="/" id="logoFooter">MIT Libraries</a>
				<div id="footerMainLink" class="">
					<a href="/" id="homeFooter"><span class="hidden-phone">Libraries</span> home</a> |
					<a href="/mobile" id="homeFooter">Mobile version</a>
				</div>
				<div id="footerSubLink" class="hidden-phone">
					<a href="/faculty">Faculty</a> | 
					<a href="/alumni">Alumni</a> | 
					<a href="/visitors">Visitors</a> | 
					<a href="/disabilities">Persons with disabilities</a>
				</div>
				<div id="socialFooter">
					<span class="hidden-phone">Find us on </span>
					<a href="http://twitter.com/mitlibraries" id="twitter" class="social">Twitter</a>
					<a href="/facebook" id="facebook" class="social">Facebook</a>
					<a href="/news/rss-feeds/" id="rss" class="social">RSS</a>
					<a href="http://www.flickr.com/photos/mit-libraries/" id="flickr" class="social">Flickr</a>
					<a href="https://foursquare.com/mitlibraries" id="foursquare" class="social">Foursquare</a>
					<a href="http://libguides.mit.edu/content.php?pid=104796&sid=788991" id="google" class="social">Google</a>
				</div>
			</div>
			<div id="footerContent" class="footerContent group">
				<?php

					global $mainSite;
					global $blog_id;
					$current_blog_id = $blog_id;

					switch_to_blog($mainSite);

					$args = array(
					
					);
					//$footer = wp_get_nav_menu_items("Footer");
					//print_r($footer);
					
					$root = menuWithParent("Footer", 0);
					
					foreach($root as $key => $item) {
						$title = $item->title;
						$objId = $item->object_id;
						$url = $item->url;
						$id = $item->ID;
				?>
				<div class="footerCol span2">
					<h3><a href="<?php echo $url ?>"><?php echo $title; ?></a></h3>
					<ul>
					<?php 
					
						$children = menuWithParent("Footer", $id);
						
						foreach($children as $key => $child) {
							$title = $child->title;
							$objId = $child->object_id;
							$url = $child->url;
							$id = $child->ID;						
					?>
						<li><a href="<?php echo $url ?>"><?php echo $title ?></a></li>

					<?php } ?>
					
					</ul>
				</div>

				<?php				
						
					}
					switch_to_blog($current_blog_id);
				?>
			</div>
			
			<div id="footerFooter" class="">
				<a href="http://www.mit.edu" id="mitLogo">Massachusetts Institute of Technology</a>
				<div class="copyright">
					<?php 
					
					$home = get_option("page_on_front"); 
					$homeText = get_post_meta($home, "footer_text", 1);
					
					if ($homeText != ""):?>
					<?php echo $homeText; ?>
					<?php else: ?>
					Licensed under the <a href="http://creativecommons.org/licenses/by-nc/2.0/" target="_blank">Creative Commons Attribution Non-Commercial License</a> unless otherwise noted.
					<?php endif; ?>
				</div>
			</div>
		</footer>		
	</div>



<!-- Load JS in Footer -->

<script type="text/javascript">
if (typeof jQuery == 'undefined')
{
    document.write(unescape("%3Cscript src='js/jquery.js' type='text/javascript'%3E%3C/script%3E"));
}
</script>
<script>

// Javascript to enable link to tab
var url = document.location.toString();

if (url.match('#')) {
    $('.tabnav a[href=#'+url.split('#')[1]+']').tab('show') ;
} 

// Change hash for page-reload
$('.tabnav a').on('shown', function (e) {
    window.location.hash = e.target.hash;
})

</script>

<?php	wp_footer(); ?>
</body>
</html>