$(function(){
	// Only run if div.tabnav exists
	if ($('ul.tabnav').length) {
		// Get the path
		var pathname = document.URL;
		// Split it
		var pathArr = pathname.split('/');
		// Count
		var pathParts = pathArr.length;
		// Find the last object
		var pathLast = pathArr[pathParts-1];
		console.log(pathname);
		console.log(pathParts);
		console.log(pathLast);
		if(pathLast.text().contains('#')) {
			console.log('yep');
		}
		else {
			console.log('nope');
		}
	}
	else {
		return;
	}

});

// OR

if(window.location.hash) {
  // Fragment exists
} else {
  // Fragment doesn't exist
}