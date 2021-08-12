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
            markerClickCallback : markerClickHandler
    	};

document.addEventListener("DOMContentLoaded", function() {
    KH.prototype.initialize(options);
    initContentPanel();

    var resizeId;
    window.addEventListener('resize', function() {
        clearTimeout(resizeId);
        resizeId = setTimeout(doneResizing, 500);
    });

    function doneResizing() {
        var container = document.getElementById('container');
        var containerClasses = container.classList;
        applySmallStyle(containerClasses);
        KH.prototype.flyToTargetPoint(selectedPoint)
    }
});