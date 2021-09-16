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

function isMobile() {
    var isMobile = false; //initiate as false
    // device detection
    if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
        || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) {
        isMobile = true;
    }
    return isMobile;
}

function applySmallStyle(containerClasses) {
    if(isPortraitOrientation() || window.innerHeight < 300 || isMobile()) {
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
    return 'https://res.cloudinary.com/dpcafrjml/image/upload/dpr_2.0,h_'+height +',w_' +width +'/' + imageName
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
    var width =  Number(contentDescription42.offsetWidth.toFixed(0));
    var height = Number((width * 10 / 16).toFixed(0));

    contentImage42.setAttribute('width', width);
    contentImage42.setAttribute('height', height);
    contentImage15.setAttribute('width', width);
    contentImage15.setAttribute('height', height);

    var imageName42 = contentImage42.getAttribute('data-src');
    contentImage42.src = loadImage(imageName42, width, height);

    var imageName15 = contentImage15.getAttribute('data-src');
    contentImage15.src = loadImage(imageName15, width, height);
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
