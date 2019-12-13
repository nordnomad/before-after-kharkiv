var after;
var before;

document.addEventListener("DOMContentLoaded", function() {
    var beforeLayerUrl = 'https://17200.selcdn.ru/AerialWWII/Z{z}/{y}/{x}.jpg';
    before = buildMap('map-base', beforeLayerUrl, false);
    L.tileLayer.fallback(beforeLayerUrl, {minNativeZoom: 13}).addTo(before);

    var afterLayerUrl = 'https://api.tiles.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}.png?access_token=';
    var accessKey = 'pk.eyJ1Ijoibm9yZG5vbWFkIiwiYSI6ImNrMjA3emg0cjEyc2YzY2w4MmltYWxqeGMifQ.jGJYfQpF8De6ZhhafArC1Q';
    after = buildMap('map-overlay', afterLayerUrl + accessKey, true);

    var container = document.querySelector('#container');
    var containerClasses = container.classList;

    $('#container').beforeAfter();

    before.sync(after);
    after.sync(before);

    initContentPanel();

    applySmallStyle(containerClasses);

    window.onresize = function(event) {
        applySmallStyle(containerClasses);
    };

    document.querySelector('#button-explore').addEventListener('click', function (event) {
        containerClasses.remove('show-intro');
        showMapControls();
    }, false);
    document.querySelector('#button-start').addEventListener('click', function (event) {
        containerClasses.remove('show-intro');
        markerClickListener(geoJson[0], false);
    }, false);

    $('.leaflet-control-zoom-in').addClass('icon-plus');
    $('.leaflet-control-zoom-out').addClass('icon-minus');
});