//
// Experts
//

$(function(){
	
	$.getJSON('/wp-json/posts?type=experts')
		.done(function(data){
			// Count the objects
			var dataLength = data.length;
			var arr = [];
			while(arr.length < 4){
			  var randomNumber=Math.ceil(Math.random()*dataLength);
			  var found=false;
			  for(var i=0;i<arr.length;i++){
			    if(arr[i]==randomNumber){
			    	found=true;
			    	break;
			    }
			  }
			  if(!found)arr[arr.length]=randomNumber;
			}
			var expertName1 = data[arr[0]].title;
			var expertName2 = data[arr[1]].title;
			var expertName3 = data[arr[2]].title;
			var expertName4 = data[arr[3]].title;

			var expertPhoto1 = data[arr[0]].featured_image.guid;
			var expertPhoto2 = data[arr[1]].featured_image.guid;
			var expertPhoto3 = data[arr[2]].featured_image.guid;
			var expertPhoto4 = data[arr[3]].featured_image.guid;

			// Append expert image only if JSON request successful
			$('.expert').append('<img class="expert-photo">');
			// Append empty spans for expert names
			$('.expert').append('<span class="name"></span>');
			// Append empty spans for expert titles
			$('.expert').append('<span class="title-job"></span>');
			// Add expert name to appropriate span
			$('.expert .name:eq(0)').text(expertName1);
			$('.expert .name:eq(1)').text(expertName2);
			$('.expert .name:eq(2)').text(expertName3);
			$('.expert .name:eq(3)').text(expertName4);
			// Add image URL to src attribute
			$('.expert .expert-photo:eq(0)').attr('src', expertPhoto1);
			$('.expert .expert-photo:eq(1)').attr('src', expertPhoto2);
			$('.expert .expert-photo:eq(2)').attr('src', expertPhoto3);
			$('.expert .expert-photo:eq(3)').attr('src', expertPhoto4);
			// Add the expert count to the "All Experts" button
			$('.view-experts .count').text(dataLength);
		});
});