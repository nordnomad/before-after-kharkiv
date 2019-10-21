$(function() {
	$('body').css('margin', 0);
	var docW = $(window).width();
	var docH = $(window).height();

	$('#before').height(docH);
	$('#before').width(docW);
	$('#after').height(docH);
	$('#after').width(docW);
	
	 before = L.map('before', {attributionControl: false, inertia: true, maxZoom:16, minZoom:13, tileSize: 256, zoomControl:false})
				  .setView([49.988373245043924, 36.22535705566406], 13);
	 after = L.map('after', {attributionControl: false, inertia: true, maxZoom:16, minZoom:13, tileSize: 256, zoomControl:false})
					.setView([49.988373245043924, 36.22535705566406], 13);

	new L.Control.Zoom({ position: 'topright' }).addTo(after);
		L.control.locate({
		position: 'topright',
		icon : 'fa fa-location-arrow',
		strings: {
			title: "Show me where I am, yo!"
		}
	}).addTo(after);
	L.control.social({default_text: "Guess where I am", position: 'topright'}).addTo(after);
	
	
	 
	L.tileLayer('http://17200.selcdn.ru/AerialWWII/Z{z}/{y}/{x}.jpg').addTo(before);
	L.tileLayer('https://api.tiles.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoibm9yZG5vbWFkIiwiYSI6ImNrMjA3emg0cjEyc2YzY2w4MmltYWxqeGMifQ.jGJYfQpF8De6ZhhafArC1Q').addTo(after);
    //L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{subdomains:['mt0','mt1','mt2','mt3']}).addTo(after);
	
	/*
	var southWest = L.latLng(49.952876685992585, 36.10811233520508),
    northEast = L.latLng(50.023843626065265, 36.34260177612305),
    bounds = L.latLngBounds(southWest, northEast);
	//before.setMaxBounds(bounds);
	after.setMaxBounds(bounds);
	after.fitBounds(bounds);
	//before.fitBounds(bounds);
	*/
	$('#map-container').beforeAfter(before,after, {showFullLinks : true, dividerColor: '#888', arrowTop: .75});
	before.sync(after);
	after.sync(before);
	
	var ll = L.latLng(49.992843, 36.231661);
	 ll.id = 987// costitution square
	var ll2 = L.latLng(49.989593,36.205094);
	ll2.id = 986// railway station
	var ll3 = L.latLng(49.980829,36.2619546);
	ll3.id = 985// metalist

	function initializeMarker(latLng) {
	    var pulsingIcon = L.icon.pulse({iconSize:[20,20],color:'#C00', animate:true, heatbeat:1});
		var marker = L.marker(latLng, {icon: pulsingIcon});
		marker.on('mouseover', function(e) {
			this._icon.className = this._icon.className.replace("leaflet-not-pulsing-icon", "leaflet-pulsing-icon");
		});
		marker.on('mouseout', function(e) {
			this._icon.className = this._icon.className.replace("leaflet-pulsing-icon", "leaflet-not-pulsing-icon");
		});
		marker.on('click', function(e) {

            $.ajax({
                url : "point-" + latLng.id + ".json",
                dataType: "json",
                success : function (data) {
                    $('#before-content').text(data.before)
                    $('#after-content').text(data.after)
                    $('#after-title').text(data.title)
                    $('#before-title').text(data.title)
                }
            });
        });
		return marker;
	}
	
	var markerAfter2 = initializeMarker(ll2);
	markerAfter2.addTo(after);
	var markerBefore2 = initializeMarker(ll2);
	markerBefore2.addTo(before);
	var markerAfter3 = initializeMarker(ll3);
	markerAfter3.addTo(after);
	var markerBefore3 = initializeMarker(ll3);
	markerBefore3.addTo(before);
	var markerAfter = initializeMarker(ll);
	markerAfter.addTo(after);
	markerAfter.on('click', function(e){
        $('a[id^="showright"]').click();

        before.unsync(after);
        after.unsync(before);
        var targetPoint = before.project(e.latlng, 13).subtract([docW / 4, 0]),
            targetLatLng = before.unproject(targetPoint, 13);

        before.panTo(targetLatLng, {animate:true});
        after.panTo(targetLatLng, {animate:true});

        before.sync(after, {noInitialSync : true});
        after.sync(before, {noInitialSync : true});

        $('.cd-panel').addClass('is-visible');
	});
	
	var markerBefore = initializeMarker(ll);
	markerBefore.addTo(before);
	markerBefore.on('click', function(e){		
		$('a[id^="showleft"]').click();
		
		before.unsync(after);
		after.unsync(before);
		
		var targetPoint = after.project(e.latlng, 13).subtract([docW / 4, 0]),
			targetLatLng = after.unproject(targetPoint, 13);
		after.panTo(targetLatLng, {animate:true});
		before.panTo(targetLatLng, {animate:true});
				
		after.sync(before, {noInitialSync : true});
		before.sync(after, {noInitialSync : true});
		
		$('.cd-panel').addClass('is-visible');
	});

//	var llist = L.control.locationlist({locationsList : [
//						  {title: 'Other1', latlng : [49.992843, 36.231661], zoom: 13},
//                          {title: 'Other', latlng : [49.989593,36.205094], zoom: 13},
//                          {title: 'Other2', latlng : [49.980829,36.2619546], zoom: 13}],
//        nextText : '->',
//        nextTitle : 'Next',
//        prevText : '<-',
//        prevTitle : 'Previous',
//        showList : false });
     // before.addControl(llist);
     // after.addControl(llist);

	jQuery(document).ready(function($){
		//open the lateral panel
		$('.leaflet-marker-icon').on('click', function(event){
			
		});
		//clode the lateral panel
		$('.cd-panel').on('click', function(event){
			if( $(event.target).is('.cd-panel') || $(event.target).is('.cd-panel-close') ) { 
				$('.cd-panel').removeClass('is-visible');
				event.preventDefault();
			}
		});
	});
	
	$('.cd-panel').on("mousedown", function(e) {
		e.preventDefault()
    // if (e.target.nodeName.toUpperCase() == "IMG") {  //detect images otherwise remove.
        return false;
     });
	
	var handle = $('img[id^="handle"]');
	handle.after('<div id="mySlider"><img src="css/images/arrow_both.png"></img></div>')
	//handle.after('<div id="mySlider"><img src="css/images/arrow_left.png"></img><img src="css/images/arrow_right.png"></img></div>')
	handle.remove();

	$('.to2015').click(function(e){
    	$('a[id^="showright"]').click();
	});
	$('.to1942').click(function(e){
	    $('a[id^="showleft"]').click();
    });
});
