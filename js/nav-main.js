jQuery(function(){
  
  // Toggle "visually-hidden" class
  jQuery('.link-primary').hover(function(){
     jQuery(this).find('.links-sub').toggleClass('visually-hidden');
     jQuery('>a',this).toggleClass('active');
  });

  // Calc nav and div.links-sub width
  var navWidth = jQuery('.nav-main').width();
  var subWidth = jQuery('.links-sub').width(); 
     
  jQuery('.link-primary').each(function(){
    //jQuery(this).find('.links-sub').toggleClass('active');
    var linkPos = jQuery(this).position();
    if (linkPos.left+subWidth >= navWidth) {
      jQuery(this).toggleClass('push');
    }
  });
  
});