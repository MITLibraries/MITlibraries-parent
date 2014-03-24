$(function() {
	$('.main-navigation .megaMenu > li a').click(function(){
		var linkHref = $(this).attr('href');
		var linkText = $(this).text();
		var linkInfo = 'top_' + linkText + '_' + linkHref;
		TrackEvent('links', 'mega-nav', linkInfo, 1);
	});
	$('.main-navigation .megaMenu .sub-menu a').click(function(){
		var linkHref = $(this).attr('href');
		var linkText = $(this).text();
		var linkInfo = 'sub_' + linkText + '_' + linkHref;
		TrackEvent('links', 'mega-nav', linkInfo, 1);
	});
	function TrackEvent(Category,Action,Label, Value){
		_gaq.push(['_trackEvent', Category, Action, Label, Value]);
	}
});

