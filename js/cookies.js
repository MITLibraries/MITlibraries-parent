/** internal class for setting and getting cookies */
/* cookie functions.js */
/*
*  @name September 23, 2011
*  @author wbossons
*/

var cookies = {

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
		var cookieValue = (isEncrypted == "true") ? base64.decode(cookies.readCookie(cookieName)) : cookies.readCookie(cookieName);
		return cookieValue;
	},

	/**
	* setCookie
	*
	* Undocumented by previous developer
	*/
	setCookie : function (name,value,days) {
		var expires = "";
		if (days) {
			var date = new Date();
			date.setTime(date.getTime()+(days*24*60*60*1000));
			expires = "; expires="+date.toGMTString();
		}
		value = base64.encode(value);
		document.cookie = name + "=" + value + expires + "; path=/;" + "secure=true;";
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
		var cookieValue = cookies.getCookie(name, "true");
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
