function initializeMarker(latLng) {
    var pulsingIcon = L.icon.pulse({iconSize:[10,10],color:'#C00', animate:true, heatbeat:1});
    var marker = L.marker(latLng, {icon: pulsingIcon});
    marker.on('mouseover', function(e) {
        this._icon.className = this._icon.className.replace("leaflet-not-pulsing-icon", "leaflet-pulsing-icon");
    });
    marker.on('mouseout', function(e) {
        this._icon.className = this._icon.className.replace("leaflet-pulsing-icon", "leaflet-not-pulsing-icon");
    });
    marker.on('click', function(e) {
        //TODO load data to content panel
    });
    return marker;
}
function markerClickListener(e, isLeft) {
    before.unsync(after);
    after.unsync(before);
    if(isLeft){
        left();
    } else {
        right();
    }
    var targetPoint = before.project(e.latlng, 13).subtract([docW / 4, 0]),
        targetLatLng = before.unproject(targetPoint, 13);

    before.panTo(targetLatLng, {animate:true});
    after.panTo(targetLatLng, {animate:true});

    before.sync(after, {noInitialSync : true});
    after.sync(before, {noInitialSync : true});
}

function showContent(){
    $('.content').fadeIn('slow')
}
function loadGeoJson(){
    $.ajax("geo.json").done(function (data) {
        L.geoJson(data, {
            pointToLayer: function (feature, latlng) {
                var marker = initializeMarker(latlng);
                marker.on('click', function(e) {
                    markerClickListener(e, true);
                });
                return marker;
            }
        }).addTo(after);
        L.geoJson(data, {
            pointToLayer: function (feature, latlng) {
                var marker = initializeMarker(latlng);
                marker.on('click', function(e) {
                    markerClickListener(e, false);
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
function hideContent(){
    $('.content').fadeOut('slow', function(){
        console.log('click');
        var docW = $(window).width()/2;
            $('#control-slider').animate({'left': docW + 'px'}, 'slow')
            $('#map-clip').animate({'left': docW + 'px'}, 'slow')
            $('#map-clip-inner').animate({'left': (-docW+1) +'px' }, 'slow')
    })
}