(function(window) {
    KH = L.Class.extend({

    	options: { },
    	selectedCity: "kharkiv",
        _initializeBeforeMap: function () {
            var beforeLayerUrl = 'https://17200.selcdn.ru/AerialWWII/Z{z}/{y}/{x}.jpg';
            var markers = [];
            var before = this._buildMap('map-base', beforeLayerUrl, markers);
            before.markers = markers;
            L.tileLayer.fallback(beforeLayerUrl, {minNativeZoom: 13}).addTo(before);
            return before;
        },

        _initializeAfterMap: function() {
            var afterLayerUrl = 'https://api.tiles.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}.png?access_token=';
            var accessKey = 'pk.eyJ1Ijoibm9yZG5vbWFkIiwiYSI6ImNrMjA3emg0cjEyc2YzY2w4MmltYWxqeGMifQ.jGJYfQpF8De6ZhhafArC1Q';
            var markers = [];
            var after = this._buildMap('map-overlay', afterLayerUrl + accessKey, markers);
            after.markers = markers;
            return after;
        },

        _buildMap: function(id, layer, markers) {
            var bounds = this.options.bounds;
            var center = this.options.center;
            var southWest = L.latLng(bounds.southWest.lat, bounds.southWest.lng),
                northEast = L.latLng(bounds.northEast.lat, bounds.northEast.lng),
                cityBounds = L.latLngBounds(southWest, northEast),
                cityCenter = L.latLng(center.lat, center.lng);

            var mapOptions = {
                attributionControl: false,
                inertia: true,
                maxZoom: 17,
                minZoom: 13,
                zoom: 16,
                tileSize: 256,
                zoomControl:false,
                center: cityCenter,
                maxBounds: cityBounds
            };
            var map = L.map(id, mapOptions);
            new L.Control.Zoom({position: 'bottomright'}).addTo(map)

            var locateOptions = {
                position: 'bottomright',
                icon : 'icon-location-arrow',
                iconLoading : 'spinner icon-spinner',
                iconElementTag: 'a',
                drawCircle : false,
                drawMarker : false,
                showPopup: false,
                strings: {
                    title: "Показать мое местоположение"
                },
                onLocationOutsideMapBounds : function(e) {
                    console.log('You are out of bounds!');
                    console.log(e)
                }
            }
            L.control.locate(locateOptions).addTo(map);

            var options = {default_text: "Как изменился Харьков с 1942го до сегодня", position: 'bottomright'};
            L.control.bar(options).addTo(map);
            L.control.social(options).addTo(map);

            var items = [
              { label: "Харків", value: "kharkiv" },
              { label: "Київ", value: "kyiv" },
              { label: "Черкаси", value: "cherkasy" },
              { label: "Одеса", value: "odesa" },
            ];
            L.control.select({
                position: "topright",
                iconMain: "",
                iconChecked: "",
                iconUnchecked: "",
                selectedDefault: true,
                items: items,
                onSelect: function(newItemValue) {
                  console.log(newItemValue);
                                  KH.prototype.selectedCity = newItemValue;
                                  var cityOptions;
                                  switch (newItemValue) {
                                    case "kyiv":
                                    cityOptions = {
                                       containerSelector : '#container',
                                       bounds: {
                                           southWest: {
                                               lat: 50.316890,
                                               lng: 30.247317
                                           },
                                           northEast: {
                                               lat: 50.600066,
                                               lng: 30.820969
                                           },
                                       },
                                       center: {
                                           lat: 50.450861,
                                           lng: 30.522817
                                       },
                                       markerClickCallback : function(){console.log('marker')}
                                    };
                                    break;
                                    case "odesa":
                                    cityOptions = {
                                         containerSelector : '#container',
                                         bounds: {
                                             southWest: {
                                                 lat: 46.325519,
                                                 lng: 30.610956
                                             },
                                             northEast: {
                                                 lat: 46.601843,
                                                 lng: 30.822774
                                             },
                                         },
                                         center: {
                                             lat: 46.487240,
                                             lng: 30.739251
                                         },
                                         markerClickCallback : function(){console.log('marker')}
                                    };
                                    break;
                                    case "cherkasy":
                                    cityOptions = {
                                       containerSelector : '#container',
                                       bounds: {
                                           southWest: {
                                               lat: 49.371235,
                                               lng: 32.147075
                                           },
                                           northEast: {
                                               lat: 49.496047,
                                               lng: 31.967732
                                           },
                                       },
                                       center: {
                                           lat: 49.445328,
                                           lng: 32.060941
                                       },
                                       markerClickCallback : function(){console.log('marker')}
                                    };
                                    break;
                                    case "Чугуїв":
                                    cityOptions = {
                                         containerSelector : '#container',
                                         bounds: {
                                             southWest: {
                                                 lat: 49.813861,
                                                 lng: 36.721748
                                             },
                                             northEast: {
                                                 lat: 49.856975,
                                                 lng: 36.637754
                                             },
                                         },
                                         center: {
                                             lat: 49.834577,
                                             lng: 36.692798
                                         },
                                         markerClickCallback : function(){console.log('marker')}
                                    };
                                    break;
                                    case "Зміїв":
                                    cityOptions = {
                                           containerSelector : '#container',
                                           bounds: {
                                               southWest: {
                                                   lat: 49.661712,
                                                   lng: 36.413192
                                               },
                                               northEast: {
                                                   lat: 49.710952,
                                                   lng: 36.308050
                                               },
                                           },
                                           center: {
                                               lat: 49.683279,
                                               lng: 36.356204
                                           },
                                           markerClickCallback : function(){console.log('marker')}
                                    };
                                    break;
                                    case "kharkiv":
                                    cityOptions = {
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
                                      }
                                    break;
                                  }
                                  var kyivOptions = {
                                      containerSelector : '#container',
                                      bounds: {
                                          southWest: {
                                              lat: 50.316890,
                                              lng: 30.247317
                                          },
                                          northEast: {
                                              lat: 50.600066,
                                              lng: 30.820969
                                          },
                                      },
                                      center: {
                                          lat: 50.450861,
                                          lng: 30.522817
                                      },
                                      markerClickCallback : function(){console.log('marker')}
                                  };
                                  KH.prototype.before.map.remove();
                                  KH.prototype.after.map.remove();
                                  KH.prototype.initialize(cityOptions);
                                  showMapControls();
                }
              })
            .addTo(map);

            L.tileLayer(layer, {detectRetina : true}).addTo(map);
            L.geoJson(geoJson, {
                pointToLayer: function (feature, latLng) {
                    var marker = KH.prototype._initializeMarker(feature, latLng);
                    markers.push(marker);
                    return marker;
                }
            }).addTo(map);
            $('.leaflet-control-select').find('a').addClass('icon-office')
            return map;
        },

        initialize: function (options) {
            this.options = options;
            this.mapBase = document.querySelector('#map-base')
            var bMap = this._initializeBeforeMap();
            this.before = new Object();
            this.before.map = bMap;
            this.after = new Object();
            this.after.map = this._initializeAfterMap();
            var container = document.querySelector(this.options.containerSelector);
            this.containerClasses = container.classList;
            $(this.options.containerSelector).beforeAfter();
            this._syncMaps({});

            var oldParent = document.querySelector('#map-base .leaflet-control-container');
            oldParent.remove();
            document.querySelector('#map-overlay .leaflet-control-container').remove();
            var newParent = document.querySelector('#my-controls');
            newParent.appendChild(oldParent)

            L.DomEvent
              .on(document.querySelector('.icon-question'), 'click', function() {
                bMap.fire('modal', {
                  content: '<h1>Про сайт</h1> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ac sollicitudin eros, ut imperdiet felis. Pellentesque pretium mi ante, et faucibus ipsum rutrum sed. Proin accumsan luctus consectetur. In sit amet purus id dui scelerisque ultricies non porta dui. Cras sit amet arcu non est efficitur molestie.'
                });
              })
        },

        _initializeMarker: function (feature, latLng) {
            var defaultIcon = L.divIcon({
                            iconSize: [32, 32],
                            iconAnchor: [16, 16],
                            html: '<div class="marker-info"><i class="icon-info"></i></div>',
                            className: "marker-wrapper"
                        })
            var marker = L.marker(latLng, {icon: defaultIcon});

            marker.on('click', function(e) {
                var left = $('#map-clip').css('left');
                KH.prototype.markerClickListener(e.target.feature, parseInt(left, 10) < e.containerPoint.x);
            });
            return marker;
        },

        markerClickListener: function(feature, isLeft) {
            let title = feature.properties.title;
            if(this.before.map.selectedMarker?.feature.properties.title == title) {
                return;
            }
            this.unselectMarker();
            this._selectMarker(title);

            this.options.markerClickCallback(feature, isLeft);
            selectedPoint = feature.geometry.coordinates;
            this.flyToTargetPoint(selectedPoint);
        },

        _selectMarker: function(clickedMarkerTitle){
            var selectedIcon = L.divIcon({
                iconSize: [32, 32],
                iconAnchor: [16, 16],
                html: '<div class="marker-info hover"><i class="icon-info"></i></div>',
                className: "marker-wrapper"
            })
            var markerIndex;
            this.before.map.markers.forEach(function(marker, index){
                var title = marker.feature.properties.title;
                if(clickedMarkerTitle == title){
                    markerIndex = index;
                }
            });
            var markerSelectedAfter = this.after.map.markers[markerIndex];
            $(markerSelectedAfter._icon).addClass('hover')
            this.after.map.selectedMarker = markerSelectedAfter;

            var markerSelectedBefore = this.before.map.markers[markerIndex];
            $(markerSelectedBefore._icon).addClass('hover')
            this.before.map.selectedMarker = markerSelectedBefore;
        },

        unselectMarker: function(){
            var defaultIcon = L.divIcon({
                iconSize: [32, 32],
                iconAnchor: [16, 16],
                html: '<div class="marker-info"><i class="icon-info"></i></div>',
                className: "marker-wrapper"
            })
            if(this.before.map.selectedMarker){
                this.before.map.selectedMarker.setIcon(defaultIcon);
                this.after.map.selectedMarker.setIcon(defaultIcon)
            }
        },

        _syncMaps: function(options) {
            l(this.before.map, this.after.map)
            function l(a, b) {
                    "use strict";
                    var c = false
                      , d = a.dragging._draggable
                      , e = b.dragging._draggable;

                    L.extend(a, {
                        panBy: function(d, e) {
                            c && console.log("panBy"),
                            b.panBy(d, e),
                            L.Map.prototype.panBy.call(a, d, e)
                        },
                        _move: function(d, e, f) {
                            return c && console.log("_move", Date.now() - c),
                            b._move(d, e, f),
                            L.Map.prototype._move.call(a, d, e, f)
                        },
                        _onResize: function(d, e) {
                            return c && console.log("_onResize"),
                            b._onResize(d, !0),
                            L.Map.prototype._onResize.call(a, d)
                        },
                        _tryAnimatedZoom: function(b, d, e) {
                            c && console.log("_tryAnimatedZoom", Date.now() - c, b, d, e);
                            var f = L.Map.prototype._tryAnimatedZoom.call(a, b, d, e);
                            return f
                        },
                        _resetView: function(c, d) {
                            return b._resetView(c, d),
                            L.Map.prototype._resetView.call(a, c, d)
                        }
                    }),
                    a.on("zoomanim", function(a) {
                        c && console.log("zoomanim1", Date.now() - c),
                        b._animateZoom(a.center, a.zoom, !0, a.noUpdate)
                    }),
                    d._updatePosition = function() {
                        c && console.log("_updatePosition", Date.now() - c),
                        L.Draggable.prototype._updatePosition.call(d),
                        L.DomUtil.setPosition(e._element, d._newPos),
                        b.fire("moveend")
                    }
                }

        },

        flyToTargetPoint: function(coordinates) {
            var flyToZoom = 16;
            var latLng = {'lat' : coordinates[1], 'lng' : coordinates[0]}
            var projection = this.before.map.project(latLng, flyToZoom);
            var targetPoint;
            if(isPortraitOrientation()) {
                var mapHeight = this.mapBase.offsetHeight;
                targetPoint = projection.subtract([0, -mapHeight / 4]);
            } else {
                var mapWidth = this.mapBase.offsetWidth;
                targetPoint = projection.subtract([mapWidth / 4, 0]);
            }
            var targetLatLng = this.before.map.unproject(targetPoint, flyToZoom);
            this.before.map.setView(targetLatLng, flyToZoom, {animate:true});
        }
    });

})(window);