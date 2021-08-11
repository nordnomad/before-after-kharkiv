function applySmallStyle(containerClasses) {
    if(isPortraitOrientation() || window.innerHeight < 300) {
        containerClasses.add('small');
    } else {
        containerClasses.remove('small');
    }
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
    document.querySelector('#goto-1942').addEventListener('click', function (event) {
         right();
    });
    document.querySelector('#goto-2015').addEventListener('click', function (event) {
         left();
    });
    document.querySelector('.goto.goto-explore').addEventListener('click', function (event) {
        hideContent()
    });
    document.querySelector('#goto-next').addEventListener('click', function (event) {
        var title = document.querySelector('#content-title-1942').innerHTML;
        var index = -1;
        for(var i=0; i < geoJson.length; i++){
            if (geoJson[i].properties.title == title) {
                index = i + 1;
                break;
            }
        }
        if (index >= geoJson.length) index = 0;
        KH.prototype._markerClickListener(geoJson[index], false);
    });
    document.querySelector('#goto-back').addEventListener('click', function (event) {
        var title = document.querySelector('#content-title-1942').innerHTML;
        var index = -1;
        for(var i=0; i < geoJson.length; i++){
            if (geoJson[i].properties.title == title) {
                index = i - 1;
                break;
            }
        }
        if (index < 0) index = geoJson.length - 1;
        KH.prototype._markerClickListener(geoJson[index], false);
    })
}
function left() {
    [$('#control-slider'), $('#map-clip')].animate({'left': '0px'}, 'slow', 'linear');
//    $('#map-clip').animate({'left': '0px'}, 'slow', 'linear');
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
function isPortraitOrientation() {
    return window.matchMedia("(orientation: portrait)").matches
}
function hideMapControls() {
    $('.leaflet-control-container').hide();
}
function showMapControls() {
    $('.leaflet-control-container').show();
}
