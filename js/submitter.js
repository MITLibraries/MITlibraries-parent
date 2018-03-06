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