function initializeMarker(latLng) {
    var pulsingIcon = L.icon.pulse({iconSize:[10,10],color:'#C00', animate:true, heatbeat:1});
    var marker = L.marker(latLng, {icon: pulsingIcon});
    marker.on('mouseover', function(e) {
        this._icon.className = this._icon.className.replace("leaflet-not-pulsing-icon", "leaflet-pulsing-icon");
    });
    marker.on('mouseout', function(e) {
        this._icon.className = this._icon.className.replace("leaflet-pulsing-icon", "leaflet-not-pulsing-icon");
    });
    return marker;
}
function markerClickListener(feature, isLeft) {
    before.unsync(after);
    after.unsync(before);
    refreshContentPanel(feature.properties);
    if(isLeft){
        left();
    } else {
        right();
    }
    var flyToZoom = 16;
    var mapWidth = $('#map-base').width();
    var latLng = {'lat' : feature.geometry.coordinates[1], 'lng' : feature.geometry.coordinates[0],}
    var targetPoint = before.project(latLng, flyToZoom).subtract([mapWidth / 4, 0]),
        targetLatLng = before.unproject(targetPoint, flyToZoom);

    before.flyTo(targetLatLng, flyToZoom);
    after.flyTo(targetLatLng, flyToZoom);

    var syncOptions = {noInitialSync : true}
    before.sync(after, syncOptions);
    after.sync(before, syncOptions);
}

function refreshContentPanel(properties) {
    $('#content-title-1942').text(properties.title);
    $('#content-title-2015').text(properties.title);
    $('#content-description-1942').text(properties.desc1942);
    $('#content-description-2015').text(properties.desc2015)
}
function initContentPanel() {
    $('#goto-1942').on('click', function(e) {
         right();
    });
    $('#goto-2015').on('click', function(e) {
         left();
    });
    $('.goto.goto-explore').on('click', function(e) {
        hideContent()
    });
    $('#goto-next').on('click', function(e) {
        var title = $('#content-title-1942').text();
        var index = -1;
        for(var i=0; i < geoJson.length; i++){
            if (geoJson[i].properties.title == title) {
                index = i + 1;
                break;
            }
        }
        if (index >= geoJson.length) index = 0;
        markerClickListener(geoJson[index], false);
    });
    $('#goto-back').on('click', function(e) {
        var title = $('#content-title-1942').text();
        var index = -1;
        for(var i=0; i < geoJson.length; i++){
            if (geoJson[i].properties.title == title) {
                index = i - 1;
                break;
            }
        }
        if (index < 0) index = geoJson.length - 1;
        markerClickListener(geoJson[index], false);
    })
}
geoJson = []
function loadGeoJson() {
    $.ajax("geo.json").done(function (data) {
        geoJson = data;
        L.geoJson(data, {
            pointToLayer: function (feature, latlng) {
                var marker = initializeMarker(latlng);
                marker.on('click', function(e) {
                    markerClickListener(e.target.feature, true);
                });
                return marker;
            }
        }).addTo(after);
        L.geoJson(data, {
            pointToLayer: function (feature, latlng) {
                var marker = initializeMarker(latlng);
                marker.on('click', function(e) {
                    markerClickListener(e.target.feature, false);
                });
                return marker;
            }
        }).addTo(before);
    })
}
function left() {
    $('#control-slider').animate({'left': '0px'}, 'slow', 'linear', function(){showContent()})
    $('#map-clip').animate({'left': '0px'}, 'slow', 'linear', function(){showContent()} )
    $('#map-clip-inner').animate({'left': '1px'}, 'slow', 'linear', function(){showContent()})
}

function right() {
    var docW = $(window).width();
    $('#control-slider').animate({'left': docW + 'px'}, 'slow', 'linear', function(){showContent()})
    $('#map-clip').animate({'left': docW + 'px'}, 'slow', 'linear', function(){showContent()} )
    $('#map-clip-inner').animate({'left': (-docW+1) +'px' }, 'slow', 'linear', function(){showContent()})
}
function center() {
    var docW = $(window).width()/2;
    $('#control-slider').animate({'left': docW + 'px'}, 'slow', 'linear', function(){showContent()})
    $('#map-clip').animate({'left': docW + 'px'}, 'slow', 'linear', function(){showContent()} )
    $('#map-clip-inner').animate({'left': (-docW+1) +'px' }, 'slow', 'linear', function(){showContent()})
}
function showContent(){
    $('.content').fadeIn('slow')
}
function hideContent(){
    $('.content').fadeOut('slow', function() {
        var docW = $(window).width()/2;
        $('#control-slider').animate({'left': docW + 'px'}, 'slow')
        $('#map-clip').animate({'left': docW + 'px'}, 'slow')
        $('#map-clip-inner').animate({'left': (-docW+1) +'px' }, 'slow')
    })
}