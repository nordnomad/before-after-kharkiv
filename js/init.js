var after;
var before;

var options = {
            containerSelector : '#container',
            bounds: {
                southWest: {
                    lat: 49.901689,
                    lng: 36.461400
                },
                northEast: {
                    lat: 50.115857,
                    lng: 36.019992
                }
            },
            center: {
                lat: 50.005720,
                lng: 36.229192
            },
            markerClickCallback : markerClickHandler
    	};

document.addEventListener("DOMContentLoaded", function() {
    KH.prototype.initialize(options);
    initContentPanel();
    doneResizing();

    var resizeId;
    window.addEventListener('resize', function() {
        clearTimeout(resizeId);
        resizeId = setTimeout(doneResizing, 500);
    });

    function doneResizing() {
        var container = document.getElementById('container');
        var containerClasses = container.classList;
        applySmallStyle(containerClasses);
        resizeImage()
        if(typeof selectedPoint !== 'undefined' && selectedPoint) {
            KH.prototype.flyToTargetPoint(selectedPoint)
        }
        if(window.innerHeight < 380) {
            $('.leaflet-control-select').hide()
        } else {
            $('.leaflet-control-select').show()
        }
    }
});

$(document).on('mouseup', function(e) {
    var container = $('.leaflet-control-select-menu');
    if (!container.is(e.target) && container.has(e.target).length === 0) {
        container.remove();
    }
});