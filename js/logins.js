// Functions to interact with ldap and touchstone
// Use to prefill fields for MIT related personnel
//
// @author wbossons
// @date June 2011
//
//   
var hostName = window.location.hostname;

var loginFunctions = {};
loginFunctions.lookupURL = "https://" +hostName +"/ldaplookup.cgi?";

loginFunctions.cookieString = "";
loginFunctions.formsUri = "https://" +hostName +"/forms-mit/?pid=";

function setCookie(name,value,days) {
	var expires = "";
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		expires = "; expires="+date.toGMTString();
	}
	value = Base64.encode(value);
	document.cookie = name + "=" + value + expires + "; path=/;" + "secure=true;";
}

var logins = {

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
		$.getJSON(loginFunctions.lookupURL,{"id":eperson}, function(json) {
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
						document.getElementsByName("department")[0].value = loginFunctions.toLowerCase(value);
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
		if (loginFunctions.cookieString == "") {
			loginFunctions.cookieString += jsonValue;
		} else {
			loginFunctions.cookieString += "," + jsonValue;
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
		eperson = eperson.substr(0, eperson.indexOf("@"));
		$.getJSON(loginFunctions.lookupURL,{"id":eperson},function(json) {
			var lastname = "";
			var firstname = "";
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
						kvPair = "department=" + loginFunctions.toLowerCase(value);
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
	},

	doLoginAndRedirect : function (pid) {
		location.href = loginFunctions.formsUri + pid;
	}
}
