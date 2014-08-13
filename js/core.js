var map;
var arMarkers = new Array();
var focusMarker;
var lastMarker = "";
var mapIconBase = '/wp-content/themes/libraries/images/';

(function($){

var Core = {
	ondomready: function(){
		Core.linkExpandable();
		Core.linkTabs();
		Core.initMap();
		Core.buildMap();
		Core.nullAlt();
		Core.buildHours();
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
		
		google.maps.event.addListener(map, 'idle', function() { // remove .gm-style added by GMAPs API
    		jQuery('.gm-style').removeClass('gm-style');
		});
		
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
				closeBoxURL: mapIconBase + "close-sfw.gif",
				closeBoxMargin: "4px 4px 4px 4px",
				infoBoxClearance: new google.maps.Size(1,1),
				isHidden: false,
				pane: "floatPane",
				enableEventPropagation: false
			});
			
			var activeMarker = new google.maps.MarkerImage(mapIconBase + 'map-marker-active.png');

			var defaultMarker = new google.maps.MarkerImage(mapIconBase + 'map-marker-default.png');
			
			
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
					marker.setIcon(defaultMarker);
				}					
			});
			
			google.maps.event.addListener(infoBox, "closeclick", function() {
				marker.setIcon(defaultMarker);
			});
			
			arMarkers.push(marker);
		});
	},
	
	linkTabs: function() {
		$(".tabnav h2 a").click(function(e) {
			e.preventDefault();
			var par = $(this).parent().parent();
			var container = par.parent().parent();
			
			container.find("li.active").toggleClass("active", false);
			par.toggleClass("active", true);
			
			var id = $(this).attr("href");
			
			var tar = $(id);
			
			var contentPar = tar.parent().parent();
			contentPar.find(".tab.active").toggleClass("active", false);
			
			tar.toggleClass("active", true);
		});
	},
	
	linkExpandable: function() {
	
		// Based on Jack Moore's accordion: http://www.jacklmoore.com/notes/jquery-accordion-tutorial/

		$(".expandable h3").click(function(e){
			e.preventDefault();
			$(this).closest("section").find(".content").not(":animated").slideToggle();
			$(this).closest("section").toggleClass("active");
			//var $clickLink = $(this).closest("section").find("a").attr("id");
			//window.location.hash = $clickLink;
		});

		$(".expandable h3 > a").each(function(){
			var $title = $(this).html().replace(/[^a-z0-9\s]/gi, '').replace(/[_\s]/g, '-');
			var $link = $(this);
			$(this).attr("id", $title);

			if(window.location.hash.substring(1) == $title) {
				$($link).closest("h3").click();
				console.log("the hash is: " + $title);
			}
		});
		
	},
	
	nullAlt: function() {
		$("img[alt='null'], img[alt='Null'], img[alt='NULL']").attr("alt", "");
	},

	findToday: function(testDay) {
		var today, d, m, yyyy;
		if (!testDay) {
			today = new Date();
			d = today.getDate();
			m = today.getMonth() + 1;
			yyyy = today.getFullYear();
			today = m + "/" + d + "/" + yyyy;
		} else {
			today = testDay;
		}
		return today;
	},

	buildHours: function() {
		var loc, name, thisDay, msg;
		loc = $('[data-location-hours]');
		msg = "unavailable";
		$.ajax({
			cache: false,
			url: "/wp-content/themes/libraries/hours.json",
			dataType: "json"
		})
			.done(function (json) {
				$.each(loc, function() {
					// get the name of this library
					name = $(this).data("location-hours");
					// look up that library's hours in JSON
					// thisDay = '1/1/1970';
					thisDay = Core.findToday(thisDay);
					if (json[name] && json[name].hours[thisDay]) {
						$(this).text(json[name].hours[thisDay].replace(/:00/g,""));
					} else {
						$(this).html(msg);
					}
				});
			})
			.fail(function (textStatus, error) {
				var err = textStatus + ", " + error;
				console.log("Hours lookup failed: " + err);
				$.each(loc, function() {
					$(this).html(msg);
				});
			});
	}
	
}

window.Core = Core;

$(document).ready(function(){Core.ondomready()});

})(jQuery);
