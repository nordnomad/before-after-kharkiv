L.Control.Bar = L.Control.extend({
  options: {
    position: 'bottomleft'
  },

  initialize: function(options) {
    L.Util.setOptions(this, options);
  },

  startTour: function () {
    KH.prototype.markerClickListener(geoJson[0], false);
  },

  showInfo: function () {
//    var win =  L.control.window(KH.prototype.after.map,{title:'Про сайт',modal: true})
//                   .content('')
//                   .show()
//L.DomEvent.on(document.querySelector('.open-modal-long'), 'click', function() {
//    map.fire('modal', {
//      content: '<h1>Про сайт</h1> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ac sollicitudin eros, ut imperdiet felis. Pellentesque pretium mi ante, et faucibus ipsum rutrum sed. Proin accumsan luctus consectetur. In sit amet purus id dui scelerisque ultricies non porta dui. Cras sit amet arcu non est efficitur molestie.'
//    });
//  })
  },

  onAdd: function(map) {
    this.map = map;
    this._container = L.DomUtil.create('div', 'leaflet-control leaflet-bar');
    var question = L.DomUtil.create('a', 'icon-question', this._container);
    question.href='#';
    L.DomEvent
          .addListener(question, 'click', L.DomEvent.stopPropagation)
          .addListener(question, 'click', L.DomEvent.preventDefault)
          .addListener(question, 'click', this.showInfo);
    if(KH.prototype.selectedCity == "kharkiv") {
        var tour = L.DomUtil.create('a', 'icon-map-signs', this._container);
        tour.href='#';
        L.DomEvent
              .addListener(tour, 'click', L.DomEvent.stopPropagation)
              .addListener(tour, 'click', L.DomEvent.preventDefault)
              .addListener(tour, 'click', this.startTour);
    }
    return this._container;
  }
});

L.control.bar = function (options) {
  return new L.Control.Bar(options);
};
