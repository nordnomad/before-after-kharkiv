(function(window) {
    KH = L.Class.extend({

    	options: { },
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

            var dropDownId = id + '_city';
            var legend = L.control({position: 'topright'});
            legend.onAdd = function (map) {
                var div = L.DomUtil.create('div', 'info legend');
                div.innerHTML = '<select id="' + dropDownId + '">' +
                                    '<option value="Харків">Харків</option>'+
                                    '<option value="Київ">Київ</option>'+
                                    '<option value="Одеса">Одеса</option>'+
                                    '<option value="Черкаси">Черкаси</option>'+
                                    '<option value="Чугуїв">Чугуїв</option>'+
                                    '<option value="Зміїв">Зміїв</option>'+
                                 '</select>';
                div.firstChild.onmousedown = div.firstChild.ondblclick = L.DomEvent.stopPropagation;
                return div;
            };
            legend.addTo(map);

            $("#" + dropDownId).change(function(e){
                console.log($("#" + dropDownId).val());
                var cityOptions;
                switch ($("#" + dropDownId).val()) {
                  case "Київ":
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
                  case "Одеса":
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
                  case "Черкаси":
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
                  case "Харків":
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
            });

            L.tileLayer(layer, {detectRetina : true}).addTo(map);
            L.geoJson(geoJson, {
                pointToLayer: function (feature, latLng) {
                    var marker = KH.prototype._initializeMarker(feature, latLng);
                    markers.push(marker);
                    return marker;
                }
            }).addTo(map);

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
        },

        _initializeMarker: function (feature, latLng) {
            var defaultIcon = L.BeautifyIcon.icon({
                iconShape: 'circle-dot',
                borderWidth: 5,
                borderColor: '#c00'
            });

            var marker = L.marker(latLng, {icon: defaultIcon});

            marker.on('click', function(e) {
                var left = $('#map-clip').css('left');
                KH.prototype.markerClickListener(e.target.feature, parseInt(left, 10) < e.layerPoint.x);
            });
            return marker;
        },

        markerClickListener: function(feature, isLeft) {
            this._unsyncMaps();
            this.unselectMarker();
            this._selectMarker(feature.properties.title);

            this.options.markerClickCallback(feature, isLeft);
            selectedPoint = feature.geometry.coordinates;
            this.flyToTargetPoint(feature.geometry.coordinates);
            this._syncMaps({noInitialSync : true});
        },

        _selectMarker: function(clickedMarkerTitle){
            var selectedIcon = L.BeautifyIcon.icon({
                    prefix: 'icon',
                    icon: 'info',
                    borderColor: '#c00',
                    backgroundColor: '#c00',
                    textColor: 'white'
            });
            var markerIndex;
            this.before.map.markers.forEach(function(marker, index){
                var title = marker.feature.properties.title;
                if(clickedMarkerTitle == title){
                    markerIndex = index;
                }
            });
            var markerSelectedAfter = this.after.map.markers[markerIndex];
            markerSelectedAfter.setIcon(selectedIcon)
            this.after.map.selectedMarker = markerSelectedAfter;

            var markerSelectedBefore = this.before.map.markers[markerIndex];
            markerSelectedBefore.setIcon(selectedIcon)
            this.before.map.selectedMarker = markerSelectedBefore;
        },

        unselectMarker: function(){
            var defaultIcon = L.BeautifyIcon.icon({
                iconShape: 'circle-dot',
                borderWidth: 5,
                borderColor: '#c00'
            });
            if(this.before.map.selectedMarker){
                this.before.map.selectedMarker.setIcon(defaultIcon);
                this.after.map.selectedMarker.setIcon(defaultIcon)
            }
        },

        _unsyncMaps: function() {
            this.before.map.unsync(this.after.map);
            this.after.map.unsync(this.before.map);
        },
        _syncMaps: function(options) {
            this.before.map.sync(this.after.map, options);
            this.after.map.sync(this.before.map, options);
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
            hideMapControls();

            this.before.map.flyTo(targetLatLng, flyToZoom, {animate:false});
            this.after.map.flyTo(targetLatLng, flyToZoom, {animate:false});
        }
    });

})(window);