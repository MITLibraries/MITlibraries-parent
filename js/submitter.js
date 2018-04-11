/**
* Submitter object constructor
*/
function Submitter() {

	// Initialize values.
	this._cookieString = "";
	this._hostname = window.location.hostname;
	this._formsURL = "https://" + this._hostname + "/forms-mit/?pid=";
	this._lookupURL = "https://" + this._hostname + "/ldaplookup.cgi?";

};

Submitter.prototype.doAuthenticate = function(eperson, xhref) {
	console.log( 'Authenticating ' + eperson );
	console.log( 'From ' + this._lookupURL );
	console.log( 'Then we redirect to ' + xhref );

	eperson = eperson.substr(0, eperson.indexOf("@"));

	$.getJSON( this._lookupURL, {"id":eperson}, function( json ){
		console.log( 'Request received:' );
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
					kvPair = "department=" + this.toLowerCase(value);
					break;
				default:
					break;
				}
				if (kvPair != "") this.setCookieString(kvPair);
				kvPair = "";
			});
		});
		this.setCookieString("fullname=" + firstname + " " + lastname);
		cookies.setCookie("libForma", this.cookieString, "");
	})
	.fail(function( jqxhr, textStatus, error ) {
		var err = textStatus + ", " + error;
		console.log( "Request Failed: " + err );
	});

	console.log( 'Request completed' );

	if ( arguments.length > 1 ) {
		console.log( 'Would now forward to ' + xhref );
	}
}