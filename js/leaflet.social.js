L.Control.Social = L.Control.extend({
  options: {
    position: 'bottomleft',
    default_text: "What a nice map",
    links: [
      ['facebook', "Facebook", "https://www.facebook.com/sharer.php?u=_url_&t=_text_"],
//      ['twitter', "Twitter", "http://twitter.com/intent/tweet?text=_text_&url=_url_"],
      ['telegram', "Telegram", "https://telegram.me/share/url?url=_url_&text=_text_"],
    ]
  },

  initialize: function(options) {
    L.Util.setOptions(this, options);
  },

  share: function () {
    var url = this.link;
    url = url.replace(/_text_/, encodeURIComponent(this.self.options.default_text));
    url = url.replace(/_url_/, encodeURIComponent(location.href));
    window.open(url, 'MyWindow',width=300,height=200); return false;
  },

  onAdd: function(map) {
    this.map = map;
    this._container = L.DomUtil.create('div', 'leaflet-control leaflet-bar');
    for (var i = 0; i < this.options.links.length; i++) {
      var infos = this.options.links[i];
      var link = L.DomUtil.create('a', 'leaflet-social-control-'+infos[0] + ' icon-'+infos[0], this._container);
      link.href = infos[2];
      link.title = infos[1];

      L.DomEvent
      .addListener(link, 'click', L.DomEvent.stopPropagation)
      .addListener(link, 'click', L.DomEvent.preventDefault)
      .addListener(link, 'click', this.share, {self: this, link: infos[2]});
    };

    return this._container;
  }
});

L.control.social = function (options) {
  return new L.Control.Social(options);
};
