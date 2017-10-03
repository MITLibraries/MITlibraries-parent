// Functions to interact with ldap and touchstone
// Use to prefill fields for MIT related personnel
//
// @author wbossons
// @date June 2011
//
//   

var loginFunctions = {};
loginFunctions.lookupURL = "https://libraries.mit.edu/ldaplookup.cgi?";
mail = "";

loginFunctions.cookieString = "";
loginFunctions.formsUri = "https://libraries.mit.edu/forms-mit/utils/authenticate.html?pid=";

function setCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	} else {
		var expires = "";
	}
	value = Base64.encode(value);
	document.cookie = name + "=" + value + expires + "; path=/;" + "secure=true;";
}


/* getUserData
*
*  This function will perform the ldap authentication
* and then populate the form data.
* It will do so via the DOM. However, the doAuthenticate
* method is currently used due to currently preferred cookie
* support/approach.
*
*/
loginFunctions.getUserData = function(eperson) {
		eperson = eperson.substr(0, eperson.indexOf("@"));
		$.getJSON(loginFunctions.lookupURL,{"id":eperson}, function(json) {
			$.each(json, function(key, val) {
				$.each(val, function(subkey, value) {
					if (subkey == "cn") {
						commonName = value;
					} else if (subkey == "givenname") {	
					    document.getElementById("firstname").value = value;
					} else if (subkey == "sn") {	
					    document.getElementById("lastname").value = value;
					} else if (subkey == "mail") {
						document.getElementById("email").value = value;
					} else if (subkey == "edupersonprimaryaffiliation") {
						obj = (document.getElementById("status") != null) ? obj = document.getElementById("status") : null;
						if (obj != null) {
						    for (var i = 0; i < obj.length; i++) {
								if (obj.options[i].value == value) {
									obj.options[i].selected = true;
								}
						    }
						}
					} else if (subkey == "telephonenumber") {
						document.getElementById("phone").value = value;
					} else if (subkey == "roomnumber") {
						document.getElementById("address").value = value;
					} else if (subkey == "ou") {

document.getElementById("department").value = loginFunctions.toLowerCase(value);
					}
				});
    		}); 
    	});
    }

  /** getCookieString
   *
   *
   * @author Wendy Bossons
   */
   loginFunctions.setCookieString = function(jsonValue) {
	if (loginFunctions.cookieString == "") {
		loginFunctions.cookieString += jsonValue;
	} else {
		loginFunctions.cookieString += "," + jsonValue;
	}
   }

   /** toLowerCase(obj)
    *  
    * json returns an object value
    * that must be cast to a string
    * in order to use javascript 
    * toLowerCase() method.
    *
    *
    */
    loginFunctions.toLowerCase = function(obj) {
	stringValue = new String(obj);
	return stringValue.toLowerCase();
    }
   
   /** doAuthenticate
    *  @author Wendy Bossons
    */
   loginFunctions.doAuthenticate = function(eperson, xhref) {
		eperson = eperson.substr(0, eperson.indexOf("@"));
		$.getJSON(loginFunctions.lookupURL,{"id":eperson},function(json) {
			var lastname = "";
			var firstname = "";
			var fullname = "";
			var kvPair = "";
			$.each(json, function(key, val) {
				$.each(val, function(subkey, value) {
					switch (subkey) {
					case "cn":
						kvPair = value;
                                                break;
					case "givenname":
						kvPair = "firstname=" +  value;
						firstname = value;
						break;
					case "sn":
						kvPair =  "lastname=" + value;
						lastname = value;
						break;
					case "mail":
						kvPair = "email=" + value;
						break;
					case "edupersonprimaryaffiliation":
						kvPair = "status=" + value; 
						break;
					case "telephonenumber":
						kvPair = "phone=" + value;
						break;
					case "roomnumber":
						kvPair = "address=" + value;
						break;
					case "ou":
						kvPair = "department=" + 
loginFunctions.toLowerCase(value);
						break;
					default:
						break;
				    	}
					if (kvPair != "") loginFunctions.setCookieString(kvPair);
					kvPair = "";
				});
    		});
		loginFunctions.setCookieString("fullname=" + firstname + " " + lastname);
setCookie("libForma", loginFunctions.cookieString, "");
    	});
    	if (arguments.length > 1)
    		setTimeout("location.href=\"" + xhref + "\"",1000);
    }
    
    loginFunctions.doLoginAndRedirect = function (pid) {
    	location.href = loginFunctions.formsUri + pid;
    }

/** Base64 encoding inner class */
/**
*
*  Base64 encode / decode
*  http://www.webtoolkit.info/
*
**/
 
var Base64 = {
 
	// private property
	_keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
 
	// public method for encoding
	encode : function (input) {
		var output = "";
		var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
		var i = 0;
 
		input = Base64._utf8_encode(input);
 
		while (i < input.length) {
 
			chr1 = input.charCodeAt(i++);
			chr2 = input.charCodeAt(i++);
			chr3 = input.charCodeAt(i++);
 
			enc1 = chr1 >> 2;
			enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
			enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
			enc4 = chr3 & 63;
 
			if (isNaN(chr2)) {
				enc3 = enc4 = 64;
			} else if (isNaN(chr3)) {
				enc4 = 64;
			}
 
			output = output +
			this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
			this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
 
		}
 
		return output;
	},
 
	// public method for decoding
	decode : function (input) {
		var output = "";
		var chr1, chr2, chr3;
		var enc1, enc2, enc3, enc4;
		var i = 0;
		input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
 
		while (i < input.length) {
 
			enc1 = this._keyStr.indexOf(input.charAt(i++));
			enc2 = this._keyStr.indexOf(input.charAt(i++));
			enc3 = this._keyStr.indexOf(input.charAt(i++));
			enc4 = this._keyStr.indexOf(input.charAt(i++));
 
			chr1 = (enc1 << 2) | (enc2 >> 4);
			chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
			chr3 = ((enc3 & 3) << 6) | enc4;
 
			output = output + String.fromCharCode(chr1);
 
			if (enc3 != 64) {
				output = output + String.fromCharCode(chr2);
			}
			if (enc4 != 64) {
				output = output + String.fromCharCode(chr3);
			}
 
		}
 
		output = Base64._utf8_decode(output);
 
		return output;
 
	},
 
	// private method for UTF-8 encoding
	_utf8_encode : function (string) {
		string = string.replace(/\r\n/g,"\n");
		var utftext = "";
 
		for (var n = 0; n < string.length; n++) {
 
			var c = string.charCodeAt(n);
 
			if (c < 128) {
				utftext += String.fromCharCode(c);
			}
			else if((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			}
			else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}
 
		}
 
		return utftext;
	},
 
	// private method for UTF-8 decoding
	_utf8_decode : function (utftext) {
		var string = "";
		var i = 0;
		var c = c1 = c2 = 0;
 
		while ( i < utftext.length ) {
 
			c = utftext.charCodeAt(i);
 
			if (c < 128) {
				string += String.fromCharCode(c);
				i++;
			}
			else if((c > 191) && (c < 224)) {
				c2 = utftext.charCodeAt(i+1);
				string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
				i += 2;
			}
			else {
				c2 = utftext.charCodeAt(i+1);
				c3 = utftext.charCodeAt(i+2);
				string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | 
(c3 & 63));
				i += 3;
			}
 
		}
 
		return string;
	}
 
}

/** internal class for setting and getting cookies */
/* cookie functions.js */
/*
*  @name September 23, 2011
*  @author wbossons
*/

var cookie_functions = {}

cookie_functions.readCookie = function(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}
	return null;
}

/** cookie_functions.getCookie
*
*  return a cookie value based on
* whether or not it's encrypted
*
*/
cookie_functions.getCookie = function (cookieName, isEncrypted) {
	cookieValue = (isEncrypted == "true") ? Base64.decode(cookie_functions.readCookie(cookieName)) : cookie_functions.readCookie(cookieName);
	return cookieValue;
}
		
		
/* setDocumentValues
*
*  @description takes a cookie with a separator
*  @param cookie name of the cookie
*  @param delimiter the character to split on first.
*  @param separator the character to split on to get k/v pairs.
*  @return value extract a value
*
*  Example ...setDocumentValues("userData", ",", "=") . . .
*/

cookie_functions.setDocumentValues = function (name, delimiter, separator) {
	var cookieValue = cookie_functions.getCookie(name, 
"true");
	cookie= cookieValue.split(delimiter);
	for (var i = 0; i < cookie.length; i++) {
		splitCookies = cookie[i].split(separator);
		obj = (document.getElementById(splitCookies[0]) != null) ?
		    document.getElementById(splitCookies[0]) : null;
		if (obj != null)
			obj.value = splitCookies[1];
	}
}

