var contentTitle42 = document.querySelector('#content-title-1942');
var contentTitle15 = document.querySelector('#content-title-2015');
var contentDescription42 = document.querySelector('#content-description-1942');
var contentDescription15 = document.querySelector('#content-description-2015');
var contentImage42 = document.querySelector('#content-img-1942');
var contentImage15 = document.querySelector('#content-img-2015');
var goto42 = document.querySelector('#goto-1942');
var goto15 = document.querySelector('#goto-2015');
var gotoExplore = document.querySelectorAll('.goto.goto-explore');
var gotoNext = document.querySelector('#goto-next');
var gotoBack = document.querySelector('#goto-back');
var controlSlider = $('#control-slider');
var mapClip = $('#map-clip');
var mapClipInner = $('#map-clip-inner');
var content = $('.content');
var containerClasses = document.querySelector('#container').classList

function applySmallStyle(containerClasses) {
    if(isPortraitOrientation()) {
        containerClasses.add('small');
    } else {
        containerClasses.remove('small');
    }
}

function refreshContentPanel(properties) {
    contentTitle42.innerHTML = properties.title;
    contentTitle15.innerHTML = properties.title;
    contentDescription42.innerHTML = properties.desc1942;
    contentDescription15.innerHTML = properties.desc2015;
    contentImage42.setAttribute('data-src', properties.img1942)
    contentImage15.setAttribute('data-src', properties.img2015);
}

function loadImage(imageName, width, height) {
    return 'https://res.cloudinary.com/dpcafrjml/image/upload/dpr_2.0,h_'+height +',w_' +width +',c_fill/' + imageName
}

function initContentPanel() {
    goto42.addEventListener('click', function () {
         right();
    });
    goto15.addEventListener('click', function () {
         left();
    });
    gotoExplore.forEach(function(element) {
        element.addEventListener('click', function () {
            KH.prototype.unselectMarker();
            hideContent()
        });
    })
    gotoNext.addEventListener('click', function () {
        contentImage42.src = "image/spinner.svg";
        var title = contentTitle42.innerHTML;
        var index = -1;
        for(var i=0; i < geoJson.length; i++){
            if (geoJson[i].properties.title == title) {
                index = i + 1;
                break;
            }
        }
        if (index >= geoJson.length) index = 0;
        KH.prototype.markerClickListener(geoJson[index], false);
    });
    gotoBack.addEventListener('click', function () {
        contentImage42.src = "image/spinner.svg";
        var title = contentTitle42.innerHTML;
        var index = -1;
        for(var i=0; i < geoJson.length; i++){
            if (geoJson[i].properties.title == title) {
                index = i - 1;
                break;
            }
        }
        if (index < 0) index = geoJson.length - 1;
        KH.prototype.markerClickListener(geoJson[index], false);
    })
    document.querySelector('#button-explore').addEventListener('click', function (event) {
        hideIntro();
        showMapControls();
    }, false);
    document.querySelector('#button-start').addEventListener('click', function (event) {
        hideIntro();
        KH.prototype.markerClickListener(geoJson[0], false);
    }, false);

    function hideIntro(){
        containerClasses.remove('show-intro');
    }
}

function markerClickHandler(feature, isLeft){
    refreshContentPanel(feature.properties);
    contentImage42.src = "image/spinner.svg";
    contentImage15.src = "image/spinner.svg";
    hideMapControls();
    if(isLeft){
        left();
    } else {
        right();
    }
}

function left() {
    controlSlider.animate({'left': '0px'}, 'slow', 'linear');
    mapClip.animate({'left': '0px'}, 'slow', 'linear');
    mapClipInner.animate({'left': '1px'}, 'slow', 'linear', function(){showContent()})
}

function right() {
    var docW = document.body.clientWidth;
    controlSlider.animate({'left': docW + 'px'}, 'slow', 'linear')
    mapClip.animate({'left': docW + 'px'}, 'slow', 'linear')
    mapClipInner.animate({'left': (-docW+1) +'px' }, 'slow', 'linear', function(){showContent()})
}
function showContent(){
    content.fadeIn('slow');
    resizeImage();
}
function resizeImage() {
    var width =  Number(contentDescription42.offsetWidth.toFixed(0));
    var height = Number((width * 9 / 16).toFixed(0));

    contentImage42.setAttribute('width', width);
    contentImage42.setAttribute('height', height);
    contentImage15.setAttribute('width', width);
    contentImage15.setAttribute('height', height);

    var imageName42 = contentImage42.getAttribute('data-src');
    if(imageName42 && width > 0 && height > 0) {
        contentImage42.src = loadImage(imageName42, width, height);
    }
    var imageName15 = contentImage15.getAttribute('data-src');
    if(imageName15  && width > 0 && height > 0) {
        contentImage15.src = loadImage(imageName15, width, height);
    }
}
function hideContent(){
    content.fadeOut('slow', function() {
        var docW = document.body.clientWidth / 2;
        controlSlider.animate({'left': docW + 'px'}, 'slow')
        mapClip.animate({'left': docW + 'px'}, 'slow')
        mapClipInner.animate({'left': (-docW+1) +'px' }, 'slow')
    });
    showMapControls()
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
