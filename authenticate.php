
<?php
/**
 * Template Name: Authenticate
 *
 * @package MIT_Libraries_Parent
 * @since 1.2.1
 */
get_header(); 
?>


<script type="text/javascript" src="/wp-content/themes/libraries/js/login_functions.js"></script>
<script type="text/javascript">
function getCookie(name)
{
var i,x,y,ARRcookies = document.cookie.split(";");
for (i = 0;i < ARRcookies.length;i++)
{
  x = ARRcookies[i].substr(0,ARRcookies[i].indexOf("="));
  y = ARRcookies[i].substr(ARRcookies[i].indexOf("=")+1);
  x = x.replace(/^\s+|\s+$/g,"");
  if (x == name)
    {
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
            eppn = '<?php echo $_SERVER["REDIRECT_eppn"]; ?>';
        	loginFunctions.doAuthenticate(eppn, redirecTo);
	     }
	});
</script>

<style type="text/css">
	div.loading {<br />
	    display:block;<br />
            width:100%;<br />
	    height:100%;<br />
	    margin-left:auto;<br />
	    margin-right:auto;<br />
            vertical-align:middle;<br />
	    text-align:center;<br />
	}<br />
	div.inner {<br />
	    display:block;<br />
            border:thin solid #659EC7;<br />
	    margin-top:20%;<br />
	    margin-left:auto;<br />
	    margin-right:auto;<br />
            width:33%;<br />
	    padding:1em;<br />
            font-family: 'verdana', 'sans serif', 'helvetica';<br />
	    font-weight:600;<br />
            font-size:.75em;<br />
	    color:#659EC7;<br />
	}<br />
	img.loading {<br />
	    display:block;<br />
	    clear:both;<br />
            top:1%;<br />
	    margin-left:auto;<br />
	    margin-right:auto;<br />
	}<br />
    </style>
 
 <br/>

<div class="loading" align="center">
<div class="inner">Loading,
please wait . . .
<img class="loading" src="/images/load.gif" /></div>
</div>
</body>
</html>