L.Control.Bar = L.Control.extend({
  options: {
    position: 'bottomleft'
  },

  initialize: function(options) {
    L.Util.setOptions(this, options);
  },

  onAdd: function(map) {
    this.map = map;
    this._container = L.DomUtil.create('div', 'leaflet-control leaflet-bar');
//    L.DomUtil.create('a', 'leaflet-social-control-'+infos[0] + ' icon-'+infos[0], this._container);
//    L.DomUtil.create('a', 'leaflet-social-control-'+infos[0] + ' icon-'+infos[0], this._container);
//    L.DomUtil.create('a', 'leaflet-social-control-'+infos[0] + ' icon-'+infos[0], this._container);
    L.DomUtil.create('a', 'icon-question', this._container);
    L.DomUtil.create('a', 'icon-map-signs', this._container);
    /*for (var i = 0; i < this.options.links.length; i++) {
      var infos = this.options.links[i];
      var link = L.DomUtil.create('a', 'leaflet-social-control-'+infos[0] + ' icon-'+infos[0], this._container);
      link.href = infos[2];
      link.title = infos[1];

      L.DomEvent
      .addListener(link, 'click', L.DomEvent.stopPropagation)
      .addListener(link, 'click', L.DomEvent.preventDefault)
      .addListener(link, 'click', this.share, {self: this, link: infos[2]});
    }*/

    return this._container;
  }
});

L.control.bar = function (options) {
  return new L.Control.Bar(options);
};
