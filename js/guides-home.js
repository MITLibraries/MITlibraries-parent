$(function(){
	var guideNum = Math.ceil(Math.random()*6);
	var randGuide = '/wp-content/themes/libraries/guide-list.html '+'.guide-list-'+guideNum;
	$('#guide-list-home').load(randGuide);
});