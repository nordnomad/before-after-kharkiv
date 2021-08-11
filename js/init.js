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

    function doneResizing() {
        var container = document.getElementById('container');
        var containerClasses = container.classList;
        applySmallStyle(containerClasses);
        KH.prototype._flyToTargetPoint(selectedPoint)
    }
});