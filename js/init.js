var after;
var before;

document.addEventListener("DOMContentLoaded", function() {
    KH.prototype.initialize();
    initContentPanel()

    var resizeId;
    window.addEventListener('resize', function() {
        clearTimeout(resizeId);
        resizeId = setTimeout(doneResizing, 500);
    });

    function doneResizing(){
        var container = document.querySelector('#container');
        var containerClasses = container.classList;
        applySmallStyle(containerClasses);
        KH.prototype._flyToTargetPoint(selectedPoint)
    }

    window.addEventListener("click", function(event) {
        console.log("window click")
    });

    $('.leaflet-control-zoom-in').addClass('icon-plus');
    $('.leaflet-control-zoom-out').addClass('icon-minus');
});