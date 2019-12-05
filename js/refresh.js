function initializeMarker(latLng) {
    var pulsingIcon = L.icon.pulse({iconSize:[10,10],color:'#c00', fillColor:'#c00', animate:false, heatbeat:1});
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
    flyToTargetPoint(feature.geometry.coordinates);
    var syncOptions = {noInitialSync : true}
    before.sync(after, syncOptions);
    after.sync(before, syncOptions);
}
function flyToTargetPoint(coordinates) {
    var flyToZoom = 16;
    var latLng = {'lat' : coordinates[1], 'lng' : coordinates[0]}
    var projection = before.project(latLng, flyToZoom);
    var targetPoint;
    var mapBase = document.querySelector('#map-base')
    if(isSmallWidth()) {
        var mapHeight = mapBase.offsetHeight;
        targetPoint = projection.subtract([0, -mapHeight / 4]);
    } else {
        var mapWidth = mapBase.offsetWidth;
        targetPoint = projection.subtract([mapWidth / 4, 0]);
    }
    var targetLatLng = before.unproject(targetPoint, flyToZoom);
    hideMapControls();
    before.flyTo(targetLatLng, flyToZoom);
    after.flyTo(targetLatLng, flyToZoom);
}
function refreshContentPanel(properties) {
    document.querySelector('#content-title-1942').innerHTML = properties.title;
    document.querySelector('#content-title-2015').innerHTML = properties.title;
    document.querySelector('#content-description-1942').innerHTML = properties.desc1942;
    document.querySelector('#content-description-2015').innerHTML = properties.desc2015;
    document.querySelector('#content-img-1942').src = properties.img1942;
    document.querySelector('#content-img-2015').src = properties.img2015;


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
        var title = document.querySelector('#content-title-1942').innerHTML;
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
        var title = document.querySelector('#content-title-1942').innerHTML;
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
    var docW = document.body.clientWidth;
    $('#control-slider').animate({'left': docW + 'px'}, 'slow', 'linear', function(){showContent()})
    $('#map-clip').animate({'left': docW + 'px'}, 'slow', 'linear', function(){showContent()} )
    $('#map-clip-inner').animate({'left': (-docW+1) +'px' }, 'slow', 'linear', function(){showContent()})
}
function center() {
    var docW = document.body.clientWidth / 2;
    $('#control-slider').animate({'left': docW + 'px'}, 'slow', 'linear', function(){showContent()})
    $('#map-clip').animate({'left': docW + 'px'}, 'slow', 'linear', function(){showContent()} )
    $('#map-clip-inner').animate({'left': (-docW+1) +'px' }, 'slow', 'linear', function(){showContent()})
}
function showContent(){
    $('.content').fadeIn('slow')
}
function hideContent(){
    $('.content').fadeOut('slow', function() {
        var docW = document.body.clientWidth / 2;
        $('#control-slider').animate({'left': docW + 'px'}, 'slow')
        $('#map-clip').animate({'left': docW + 'px'}, 'slow')
        $('#map-clip-inner').animate({'left': (-docW+1) +'px' }, 'slow')
    })
    $('.leaflet-control-container').show();
}
function isSmallWidth() {
    return document.body.clientWidth  < 580;
}
function hideMapControls() {
    $('.leaflet-control-container').hide();
}
function showMapControls() {
    $('.leaflet-control-container').show();
}
