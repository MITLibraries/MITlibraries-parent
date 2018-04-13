<?php
/**
 * Template Name: Authenticate
 *
 * This page template is used to implement a lookup feature that is desired by
 * some users. It should be used by one Page on WordPress, and placed on a
 * path that is protected by Shibboleth / Touchstone.
 *
 * The page using this template will have no content - all code is contained in
 * this template. It will read the user's username (provided by Shibboleth),
 * and use this to request (via curl) a lookup service for additional
 * information about the user. Returned data will be set as a cookie in the
 * user's browser.
 *
 * After the cookie has been set, the user is redirected to whatever page sent
 * them here. The cookie that is set will then be read to populate various
 * form fields for them.
 *
 * @package MIT_Libraries_Parent
 * @since 1.7.0
 */

// Read and treat Shibboleth EPPN value for use in page.
$eppn = shibboleth_eppn();

get_header();
?>

<script type="text/javascript">
function getCookie(name) {
	var i,x,y,ARRcookies = document.cookie.split(";");
	for (i = 0;i < ARRcookies.length;i++) {
		x = ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
		y = ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
		x = x.replace(/^\s+|\s+$/g,"");
		if (x == name) {
			return unescape(y);
		}
	}
}

var referer = document.referer;
var redirecTo = "";

$(document).ready(function() {
	if (referer != "" && referer != "undefined") {
		start = location.href.indexOf("pid");
		newlocation = location.href.substr(start);
		redirecTo = newlocation.substr(newlocation.indexOf("=")+1);
		eppn = '<?php echo esc_js( $eppn ); ?>';
		loginFunctions.doAuthenticate(eppn, redirecTo);
	 }
});
</script>

<div class="loading-container" align="center">
	<div class="inner">Loading, please wait . . .
		<img class="loading" src="/images/load.gif" alt="Loading..." />
	</div>
</div>
</body>
</html>
