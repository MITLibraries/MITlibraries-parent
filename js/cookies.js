/** internal class for setting and getting cookies */
/* cookie functions.js */
/*
*  @name September 23, 2011
*  @author wbossons
*/

var cookie_functions = {

	/**
	* readCookie
	*
	* what
	*/
	readCookie : function (name) {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++) {
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		}
		return null;
	},

	/** 
	* getCookie
	*
	* return a cookie value based on whether or not it's encrypted
	*/
	getCookie : function (cookieName, isEncrypted) {
		var cookieValue = (isEncrypted == "true") ? Base64.decode(cookie_functions.readCookie(cookieName)) : cookie_functions.readCookie(cookieName);
		return cookieValue;
	},

	/**
	* setDocumentValue
	*
	* @description takes a cookie with a separator
	* @param cookie name of the cookie
	* @param delimiter the character to split on first.
	* @param separator the character to split on to get k/v pairs.
	* @return value extract a value
	*
	* Example ...setDocumentValues("userData", ",", "=") . . .
	*/
	setDocumentValues : function (name, delimiter, separator) {
		var cookieValue = cookie_functions.getCookie(name, "true");
		var cookie= cookieValue.split(delimiter);
		for (var i = 0; i < cookie.length; i++) {
			var splitCookies = cookie[i].split(separator);
			var obj = (document.getElementsByName(splitCookies[0])[0] != null) ? 
			document.getElementsByName(splitCookies[0])[0] : null;
			if (obj != null)
				obj.value = splitCookies[1];
		}
	}
}
