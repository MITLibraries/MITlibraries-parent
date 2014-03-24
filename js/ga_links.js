$(function() {
	$('.ss-nav-menu-item-depth-0 > a').click(function(){
		var linkHref = $(this).attr('href');
		var linkText = $(this).text();
		var linkInfo = 'top_' + linkText + '_' + linkHref;
		TrackEvent('links', 'mega-nav', linkInfo, 1);
		console.log('top link clicked');
	});
	$('.sub-menu a').click(function(){
		var linkHref = $(this).attr('href');
		var linkText = $(this).text();
		var linkInfo = 'sub_' + linkText + '_' + linkHref;
		TrackEvent('links', 'mega-nav', linkInfo, 1);
		console.log('sub link clicked');
	});
	function TrackEvent(Category,Action,Label, Value){
		_gaq.push(['_trackEvent', Category, Action, Label, Value]);
	}
});

