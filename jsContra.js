//Google Maps
var refreshMaps;

function initializeMaps() {
	var mapCanvas = document.getElementsByClassName("map");
	var UkrainianHallLatLng = new google.maps.LatLng(45.5197048,-73.5984252);
	var HouseFriendshipLatLng = new google.maps.LatLng(45.5179750,-73.5781522);

	var maps = [];
	var markers = [];
	var infowindows = [];

	for (var i = 0; i <= mapCanvas.length - 1; i++) {
		var location;
		if (mapCanvas[i].className.includes("houseFriendship")) {
			location = HouseFriendshipLatLng;
		}
		if (mapCanvas[i].className.includes("ukrainianHall")) {
			location = UkrainianHallLatLng;
		}

		var mapOptions = {
			center: location,
			zoom: 16,
			mapTypeControl: false
		};
		var map = new google.maps.Map(mapCanvas[i], mapOptions);
		maps[i] = map;

		var marker = new google.maps.Marker({
			position: location,
			map: map
		});
		markers[i] = marker;

		var infowindow = new google.maps.InfoWindow({
			content: mapCanvas[i].previousElementSibling.innerHTML
		});
		infowindow.open(map, marker);
		infowindows[i] = infowindow;
	}

	refreshMaps = function() {
		for (var i = maps.length - 1; i >= 0; i--) {
			google.maps.event.trigger(maps[i], 'resize');
			maps[i].setCenter(markers[i].getPosition());
			infowindows[i].open(maps[i], markers[i]);
		}
	}	
	google.maps.event.addDomListener(window, 'load', refreshMaps);
}


// Accordions
function accordionFunc(id, lgg) {
	var x = $("#" + id + lgg);
	var xB = $("#" + id + lgg + "Button");
	var speed = 600;

	if( $(xB).hasClass("active") ) {
		//Clicking a button off			
		$(xB).removeClass("active");
		$(x).slideUp(speed);
		
	} else {  //Clicking a button on
		//Desactivate any previous clicks, then activate new click
		$("." + id + "Btn").removeClass("active");			
		$(xB).addClass("active");
		$("." + id + "Panel").slideUp(speed);
		$(x).slideDown(speed);
		$("html, body").animate({
			scrollTop: $(xB).offset().top
		}, speed, refreshMaps);
	}
}


//Switching between languages on narrow devices (smartphones)
function unilingual() {
	//Desactivate any previous click on accordion buttons
	$(".btnRow .accordionBtn").removeClass("active");			
	$(".accordionPanel").slideUp(0);

	unilingual2()
}
function unilingual2() {
	//Switch news tile and accordions buttons to the other language
	if ($("button.unilingual").html() === "&nbsp;English&nbsp;") {
		//French to English
		$(".btnRow [lang|='en']").css({"display": "block"});
		$(".news:lang(en)").css({"display": "block"});

		$(".btnRow [lang|='fr']").css({"display": "none"});
		$(".news:lang(fr)").css({"display": "none"});

		$("button.unilingual").html("Français");

	} else {
		//English to French
		$(".btnRow [lang|='fr']").css({"display": "block"});
		$(".news:lang(fr)").css({"display": "block"});

		$(".btnRow [lang|='en']").css({"display": "none"});
		$(".news:lang(en)").css({"display": "none"});

		$("button.unilingual").html("&nbsp;English&nbsp;");
	}
}

//Switching automatically to French if coming from a dance page in French, on a smartphone device
if ( window.matchMedia("(max-width: 600px)").matches && 
	/[?]lang=fr/.test(window.location.href) ) {
		unilingual2();
}

//Displaying both language if screen size is increased above 600px
function resiz() {
	if (window.matchMedia("(min-width: 601px)").matches) {
		$(".btnRow div").css({"display": "block"});
		$(".news").css({"display": "block"});
	}
	// var unidiv = $("div.unilingual");
	//  && unidiv.style.display !== "none"
	if (window.matchMedia("(max-width: 600px)").matches) {
		//Desactivate any previous click on accordion buttons of the other language
		if ($("button.unilingual").html() === "&nbsp;English&nbsp;") {
			$(".btnRow [lang|='en'] .accordionBtn").removeClass("active");
			$(".accordionPanel[lang|='en']").slideUp(0);
		} else {
			$(".btnRow [lang|='fr'] .accordionBtn").removeClass("active");
			$(".accordionPanel[lang|='fr']").slideUp(0);
		}

		//Display only news tiles and accordions buttons of the current language
		unilingual2();
		unilingual2();
	}

}

