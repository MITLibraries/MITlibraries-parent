// Functions to interact with ldap and touchstone
// Use to prefill fields for MIT related personnel
//
// @author wbossons
// @date June 2011
//
//

var logins = {

	/**
	 * Private properties
	 */
	_cookieString : "",
	_hostname : window.location.hostname,
	_formsUri : "https://" + this._hostname + "/forms-mit/?pid=",
	_lookupURL : "https://" + this._hostname + "/ldaplookup.cgi?",

	/* getUserData
	*
	*  This function will perform the ldap authentication
	* and then populate the form data.
	* It will do so via the DOM. However, the doAuthenticate
	* method is currently used due to currently preferred cookie
	* support/approach.
	*
	*/
	getUserData : function(eperson) {
		eperson = eperson.substr(0, eperson.indexOf("@"));
		$.getJSON(this._lookupURL,{"id":eperson}, function(json) {
			console.log(json);
			$.each(json, function(key, val) {
				$.each(val, function(subkey, value) {
					if (subkey == "cn") {
						var commonName = value;
					} else if (subkey == "givenname") {
						document.getElementsByName("firstname")[0].value = value;
					} else if (subkey == "sn") {
						document.getElementsByName("lastname")[0].value = value;
					} else if (subkey == "mail") {
						document.getElementsByName("email")[0].value = value;
					} else if (subkey == "edupersonprimaryaffiliation") {
						var obj;
						obj = (document.getElementsByName("status")[0] != null) ? obj = document.getElementById("status") : null;
						if (obj != null) {
							for (var i = 0; i < obj.length; i++) {
								if (obj.options[i].value == value) {
									obj.options[i].selected = true;
								}
							}
						}
					} else if (subkey == "telephonenumber") {
						document.getElementsByName("phone")[0].value = value;
					} else if (subkey == "roomnumber") {
						document.getElementsByName("address")[0].value = value;
					} else if (subkey == "ou") {
						document.getElementsByName("department")[0].value = logins.toLowerCase(value);
					}
				});
			});
		});
	},

	/** getCookieString
	*
	* @author Wendy Bossons
	*/
	setCookieString : function(jsonValue) {
		if (logins._cookieString == "") {
			logins._cookieString += jsonValue;
		} else {
			logins._cookieString += "," + jsonValue;
		}
	},

	/** toLowerCase(obj)
	*  
	* json returns an object value
	* that must be cast to a string
	* in order to use javascript 
	* toLowerCase() method.
	*
	*
	*/
	toLowerCase : function(obj) {
		var stringValue = new String(obj);
		return stringValue.toLowerCase();
	},

   /** doAuthenticate
    *  @author Wendy Bossons
    */
	doAuthenticate : function(eperson, xhref) {
		console.log( 'Authenticating ' + eperson );
		console.log( 'from ' + this._lookupURL );
		eperson = eperson.substr(0, eperson.indexOf("@"));
		$.getJSON(this._lookupURL,{"id":eperson},function(json) {
			console.log( "Request received:" );
			console.log( json );
			var lastname = "";
			var firstname = "";
			var kvPair = "";
			$.each(json, function(key, val) {
				$.each(val, function(subkey, value) {
					console.log( 'key: ' + subkey );
					console.log( 'val: ' + value );
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
						kvPair = "department=" + logins.toLowerCase(value);
						break;
					default:
						break;
					}
					if (kvPair != "") logins.setCookieString(kvPair);
					kvPair = "";
				});
			});
			logins.setCookieString("fullname=" + firstname + " " + lastname);
			cookies.setCookie("libForma", logins.cookieString, "");
		})
		.fail(function( jqxhr, textStatus, error ) {
			var err = textStatus + ", " + error;
			console.log( "Request Failed: " + err );
		});
		console.log( 'Cookie set' );
		if (arguments.length > 1)
			console.log( 'Would now forward to: ' + xhref );
			// setTimeout("location.href=\"" + xhref + "\"",1000);
	},

	doLoginAndRedirect : function (pid) {
		location.href = this._formsUri + pid;
	}
}
