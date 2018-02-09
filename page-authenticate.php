<?php
/**
 * Template Name: Authenticate
 *
 * @package MIT_Libraries_Parent
 * @since 1.2.1
 */

// Read and treat Shibboleth EPPN value for use in page.
$eppn = shibboleth_eppn();

get_header();
?>

<script type="text/javascript" src="/wp-content/themes/libraries/js/login_functions.js"></script>
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

<style type="text/css">
	div.loading {
		display:block;
		width:100%;
		height:100%;
		margin-left:auto;
		margin-right:auto;
		vertical-align:middle;
		text-align:center;
	}
	div.inner {
		display:block;
		border:thin solid #659EC7;
		margin-top:20%;
		margin-left:auto;
		margin-right:auto;
		width:33%;
		padding:1em;
		font-family: 'verdana', 'sans serif', 'helvetica';
		font-weight:600;
		font-size:.75em;
		color:#659EC7;
	}
	img.loading {
		display:block;
		clear:both;
		top:1%;
		margin-left:auto;
		margin-right:auto;
	}
	</style>
 
 <br/>

<div class="loading" align="center">
<div class="inner">Loading,
please wait . . .
<img class="loading" src="/images/load.gif" /></div>
</div>
</body>
</html>
