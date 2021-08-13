(function($) {
  function drags(dragElement, resizeElement, container) {

    // Initialize the dragging event on mousedown.
    dragElement.on('mousedown.ba-events touchstart.ba-events', function(e) {

      dragElement.addClass('ba-draggable');
      resizeElement.addClass('ba-resizable');

      // Check if it's a mouse or touch event and pass along the correct value
      var startX = (e.pageX != undefined) ? e.pageX : e.originalEvent.touches[0].pageX;

      // Get the initial position
      var dragWidth = dragElement.outerWidth(),
          posX = dragElement.offset().left + dragWidth - startX,
          containerOffset = container.offset().left,
          containerWidth = container.outerWidth(),
          dragElementOffset = dragElement.width()/2

      // Set limits
      var minLeft = containerOffset - dragElementOffset;
      var maxLeft = containerOffset + containerWidth - dragWidth + dragElementOffset;

      // Calculate the dragging distance on mousemove.
      dragElement.parents().on("mousemove.ba-events touchmove.ba-events", function(e) {

        // Check if it's a mouse or touch event and pass along the correct value
        var moveX = (e.pageX != undefined) ? e.pageX : e.originalEvent.touches[0].pageX;

        var leftValue = moveX + posX - dragWidth;

        // Prevent going off limits
        if ( leftValue < minLeft) {
          leftValue = minLeft;
        } else if (leftValue > maxLeft) {
          leftValue = maxLeft;
        }

        // Translate the handle's left value to masked divs width.
//        widthValue = (leftValue + dragWidth/2 - containerOffset)*100/containerWidth+'%';
        var widthValue = (leftValue + dragWidth/2 - containerOffset);

        // Set the new values for the slider and the handle.
        var draggable = document.querySelector('.ba-draggable');
        if(draggable) {
            draggable.style.left = widthValue +'px';
        }
        var resizable = document.querySelector('.ba-resizable');
        if(resizable) {
            resizable.style.left = widthValue +'px';
        }
        var mapClip = document.querySelector('.ba-resizable #map-clip-inner');
        if(mapClip) {
            mapClip.style.left = (-widthValue+1) +'px';
        }
      }).on('mouseup.ba-events touchend.ba-events touchcancel.ba-events', function(){
        dragElement.removeClass('ba-draggable');
        resizeElement.removeClass('ba-resizable');
        // Unbind all events for performance
        $(this).off('.ba-events');
      });
      e.preventDefault();
    });
  }

  // Define plugin
  $.fn.beforeAfter = function() {
    var cur = this;
    // Adjust the slider
    //TODO check if this code is useful
    var width = cur.width()+'px';
    cur.find('.resize #map-clip-inner').css('width', width);

    // Bind dragging events
    drags(cur.find('#control-slider'), cur.find('#map-clip'), cur);

//TODO check if this code is useful
    // Update sliders on resize.
    // Because we all do this: i.imgur.com/YkbaV.gif
    window.addEventListener('resize', function() {
      var width = cur.width()+'px';
      cur.find('.resize #map-clip-inner').css('width', width);
    });
  }
}(jQuery));