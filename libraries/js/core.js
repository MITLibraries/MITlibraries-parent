var needMap = 1;
var map;
var arMarkers = new Array();
var focusMarker;

var lastMarker = "";

var showMap = 0;

var mapIconBase = 'http://libraries-test.mit.edu/wp-content/themes/libraries/images/';

(function($){

var Core = {
	ondomready: function(){
		// page functions go here
		
		Core.linkLogo();
		Core.linkExpandable();
		Core.linkTabs();
		Core.buildUberMenu();
		
		Core.buildLocationGallery();
		
		Core.fixSidebar();
		
		Core.buildDatePicker();
		
		Core.buildMap();
		
		$(window).resize(function() {
			Core.handleResize();
		});
		Core.handleResize();
	},
	
	handleResize: function() {
		Core.fixMobileSizes();
	},
	
	fixMobileSizes: function() {

		$(".mobileToday").each(function() {
			console.log($(this).html());
			var par = $(this).parent();
			console.log(par.height());
			$(this).height(par.height()+5);
		});	
		
		$(".hrList tbody tr").each(function() {
			var maxHeight = 0;
			$(this).find("td:not(.name)").each(function() {
				var td = $(this);
				maxHeight = Math.max(td.height(), maxHeight);
			});

			$(this).find("td:not(.name)").each(function() {
				$(this).height(maxHeight);
			});
		});
	},	
	
	buildMap: function() {
		$(".map").click(function(e) {
			//e.preventDefault();
			var stage = $("#stage");
			if (needMap) Core.initMap();

			if (stage.hasClass("activeMap")) {
				// map open
			} else {
				// open map
				$("#showMap").click();
			}
			
			var id = $(this).attr("data-target");
			
			
			for(i=0;i<arMarkers.length;i++) {
				var marker = arMarkers[i];
				
				if (marker.id == id) {
					focusMarker = marker;
					map.panTo(marker.getPosition());
					google.maps.event.trigger(marker, "click");
					
				}
			}

			
			$("html, body").animate({scrollTop: 0}, 500);
			


			
			
			
		});
		
		$("#showMap").click(function(e) {
			e.preventDefault();
			if (needMap) Core.initMap();
			
			if ($(this).hasClass("btn-warning")) {
				$(this).toggleClass("btn-warning", false);
				$(this).html("Hide Map");
				$("#stage").toggleClass("activeMap", true);
				Core.showMap();
				location.hash = "!map";
				

				
			} else {
				$(this).toggleClass("btn-warning", true);
				$(this).html("Show Map");
				$("#stage").toggleClass("activeMap", false);
				Core.hideMap();
				// reset hash
				location.hash = "!";
			}
		});
		
		
		if (showMap) {
			$("#showMap").click();
		}
		
		var hash = location.hash.substr(2);
		if (hash != "") {
			if (hash == "map") {
				$("#showMap").click();
			} else {
				$("a[href='#!"+hash+"']").click();
			}
		}
		
		
		
		

	},
	
	initMap: function() {
		var canvas = document.getElementById('map');
		var opts = {
			center: new google.maps.LatLng(42.35978069999999, -71.09360909999998),
			zoom: 15,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		map = new google.maps.Map(canvas, opts);
		needMap = 0;		
		
		Core.buildMarkers();
	},
	
	buildMarkers: function() {
		$("#mapMarkers .location").each(function() {
			var name = $(this).find(".name").html();
			name = name.replace("&amp;", "&");
			var lat = parseFloat($(this).find(".lat").html());
			var lng = parseFloat($(this).find(".lng").html());
			var description = $(this).find(".description").html();
			var id = $(this).find(".id").html();
			
			var latlng = new google.maps.LatLng(lat, lng);
			//var latlng = new google.maps.LatLng(42.358330, -71.093173)
			
			var infowindow = new google.maps.InfoWindow({
				
			});
			
			var infoBox = new InfoBox({
				content: description,
				disableAutoPan: false,
				maxWidth: 280,
				pixelOffset: new google.maps.Size(-140,-181),
				boxStyle: {
					//background: 'url(http://mitlibraries.seangw.com/wp-content/themes/libraries/images/infobox.png)',
					opacity: 1,
					
					//width: "280px",
					//height: "180px",
				},
				closeBoxURL: "http://mitlibraries.seangw.com/wp-content/themes/libraries/images/close.gif",
				closeBoxMargin: "4px 4px 4px 4px",
				infoBoxClearance: new google.maps.Size(1,1),
				isHidden: false,
				pane: "floatPane",
				enableEventPropagation: false
			});
			
			var activeMarker = new google.maps.MarkerImage(mapIconBase + 'new-marker-active.png');

			var defaultMarker = new google.maps.MarkerImage(mapIconBase + 'new-marker-default.png');
			
			
			var marker = new google.maps.Marker({
				position: latlng,
				map: map,
				icon: defaultMarker,
				html: description,
				id: id,
				title: name
			});
			
			google.maps.event.addListener(marker, "click", function () {
				for (var i=0; i<arMarkers.length; i++) {
					arMarkers[i].setIcon(defaultMarker);
					}
					this.setIcon(activeMarker);
			});
			
			google.maps.event.addListener(marker, 'click', function() {
				//infowindow.setContent(this.html);
				//infowindow.open(map,marker);
				
				if (lastMarker != "")
					lastMarker.close();
				lastMarker = infoBox;
				infoBox.open(map, marker);
				
			});
			
			google.maps.event.addListener(map, 'click', function() {
				if(infoBox) {
					infoBox.close();
					marker.setIcon(mapIconBase + 'new-marker-default.png');
				}					
			});
			
			arMarkers.push(marker);
		});
	},
	
	showMap: function() {
		$("#map").slideDown(200, function() {
			google.maps.event.trigger(map, 'resize');
		});
	},
	
	hideMap: function() {
		$("#map").slideUp(200);
	},
	
	buildDatePicker: function() {
		$("#hourCalendar").glDatePicker({
				showAlways: true,
				selectedDate: todayDate,
				
				prevArrow: '<i class="icon-arrow-left"></i>',
				nextArrow: '<i class="icon-arrow-right"></i>',
				dowNames: "SMTWTFS",
				dowOffset: 1,
				onClick: function(target, cell, date, date2) {
					var newDate = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
					
					var path = window.location.pathname;
					var newUrl = path+"?d="+newDate;

					window.location = newUrl;
				}
				
		});
		
	},
	
	fixSidebar: function() {
		$(".sidebarWidgets").each(function() {
			$(this).find(".widget:last").toggleClass("lastWidget", true);
		});
	},
	
	buildLocationGallery: function() {
		$(".slideshow").cycle({
			fx: "fade",
			speed: 1500,
			pause: 0,
			/*
			pager: "#slideshowNav",
			
			pagerAnchorBuilder: function(idx, slide) {
				var obj = $(slide);
				
				return "<a href='#' class='thumb'><img src='"+obj.attr('data-thumb')+"' width='38' height='38' /></a>";
			}
			*/

		});		
	},
	
	buildUberMenu: function() {
		
		// cancel wrong clicks
		$("#megaMenu .ss-nav-menu-item-depth-1>a").click(function(e) {
			e.preventDefault();
		});
		
		$(".megaMenu>li").each(function() {
			$(this).find(".ss-nav-menu-item-depth-1:not(.ss-nav-menu-highlight):nth-child(odd)").each(function() {
				var obj = $(this);
				var next = $(this).next();
								
				if (next.height() > obj.height()) {
					obj.toggleClass("noBorderRight", true);
					next.toggleClass("borderLeft", true);
				}
				
				if (obj.is(":last-child") || next.is(".ss-nav-menu-highlight")) {
					obj.toggleClass("noBorderRight", true);
				}
			});
			$(this).find(".ss-nav-menu-item-depth-1:not(.ss-nav-menu-highlight):nth-child(even)").toggleClass("lastSubMenu", true);
			$(this).find(".ss-nav-menu-item-depth-1:not(.ss-nav-menu-highlight):nth-child(odd)").toggleClass("firstSubMenu", true);
		});
	},
	
	linkTabs: function() {
		$(".tabnav a").click(function(e) {
			e.preventDefault();
			var par = $(this).parent();
			var container = par.parent();
			
			container.find("li.active").toggleClass("active", false);
			par.toggleClass("active", true);
			
			var id = $(this).attr("href");
			
			var tar = $(id);
			
			var contentPar = tar.parent();
			contentPar.find(".tab.active").toggleClass("active", false);
			
			tar.toggleClass("active", true);
		});
	},
	
	linkExpandable: function() {
		var num = 0;
		
		var hash = window.location.hash;
		hash = hash.replace("#", "");
		
		$(".expandable h3").click(function(e) {
			e.preventDefault();
			
			var par = $(this).parent();
			var hash = par.attr("data-anchor");
			
			if (par.hasClass("active")) {
				par.toggleClass("active", false);
				par.find(".content").slideUp(200);
				par.find(".content").attr('aria-expanded', 'false');
				window.location.hash = ""; //note: this causes the browser to jump to the top of the page
			} else {
				par.toggleClass("active", true);
				par.find(".content").slideDown(200);
				par.find(".content").attr('aria-expanded', 'true');
				window.location.hash = "#"+hash;
			}
		});
		
		$(".expandable").each(function() {
			var obj = $(this);
			var h3 = obj.find("h3:first");
			
			var setHash = encodeURIComponent(h3.html());
			obj.attr("data-anchor", setHash);

			if (setHash == hash) {
				obj.toggleClass("active", true);
				obj.find(".content").slideDown(200);
				$(document.body).animate({
					'scrollTop': $(obj).offset().top - 50
				}, 500);
			}
			
			num++;
		});

	},
	
	linkLogo: function() {
		$("#logo").click(function(e) {
			e.preventDefault();
			document.location = "/";
		});
	}
}

window.Core = Core;

$(document).ready(function(){Core.ondomready()});

})(jQuery);
