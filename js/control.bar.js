L.Control.Bar = L.Control.extend({
  options: {
    position: 'bottomleft'
  },

  initialize: function(options) {
    L.Util.setOptions(this, options);
  },

  startTour: function () {
    markerClickListener(geoJson[0], false);
  },

  showInfo: function () {
    console.log('InfoControl')
  },

  onAdd: function(map) {
    this.map = map;
    this._container = L.DomUtil.create('div', 'leaflet-control leaflet-bar');
    var question = L.DomUtil.create('a', 'icon-question', this._container);
    L.DomEvent
          .addListener(question, 'click', L.DomEvent.stopPropagation)
          .addListener(question, 'click', L.DomEvent.preventDefault)
          .addListener(question, 'click', this.showInfo);
    var tour = L.DomUtil.create('a', 'icon-map-signs', this._container);
    L.DomEvent
          .addListener(tour, 'click', L.DomEvent.stopPropagation)
          .addListener(tour, 'click', L.DomEvent.preventDefault)
          .addListener(tour, 'click', this.startTour);

    return this._container;
  }
});

L.control.bar = function (options) {
  return new L.Control.Bar(options);
};
