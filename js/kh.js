(function(window) {
    KH = L.Class.extend({

    	options: {
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
            }
    	},

        _initializeBeforeMap: function () {
            var beforeLayerUrl = 'https://17200.selcdn.ru/AerialWWII/Z{z}/{y}/{x}.jpg';
            var before = this._buildMap('map-base', beforeLayerUrl, false);
            L.tileLayer.fallback(beforeLayerUrl, {minNativeZoom: 13}).addTo(before);
            return before;
        },

        _initializeAfterMap: function() {
            var afterLayerUrl = 'https://api.tiles.mapbox.com/v4/mapbox.satellite/{z}/{x}/{y}.png?access_token=';
            var accessKey = 'pk.eyJ1Ijoibm9yZG5vbWFkIiwiYSI6ImNrMjA3emg0cjEyc2YzY2w4MmltYWxqeGMifQ.jGJYfQpF8De6ZhhafArC1Q';
            return this._buildMap('map-overlay', afterLayerUrl + accessKey, true);
        },

        _buildMap: function(id, layer, isLeft) {
            var bounds = this.options.bounds;
            var southWest = L.latLng(bounds.southWest.lat, bounds.southWest.lng),
                northEast = L.latLng(bounds.northEast.lat, bounds.northEast.lng),
                cityBounds = L.latLngBounds(southWest, northEast);

            var mapOptions = {
                attributionControl: false,
                inertia: true,
                maxZoom: 17,
                minZoom: 13,
                zoom: 16,
                tileSize: 256,
                zoomControl:false,
                center: {
                    lat: 50.005720,
                    lng: 36.229192
                },
                maxBounds: cityBounds
            };
            var map = L.map(id, mapOptions);
            new L.Control.Zoom({position: 'bottomright' , zoomInText: '', zoomOutText: ''}).addTo(map)

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

            L.tileLayer(layer, {detectRetina : true}).addTo(map);
            L.geoJson(geoJson, {
                pointToLayer: function (feature, latLng) {
                    return KH.prototype._initializeMarker(feature, latLng);
                }
            }).addTo(map);

            return map;
        },
        _hideIntro: function(){
            this.containerClasses.remove('show-intro');
        },
        initialize: function (options) {
            var bMap = this._initializeBeforeMap();
            this.before = new Object();
            this.before.map = bMap;
            this.after = new Object();
            this.after.map = this._initializeAfterMap();
            var container = document.querySelector(this.options.containerSelector);
            this.containerClasses = container.classList;
            $(this.options.containerSelector).beforeAfter();
            this.before.map.sync(this.after.map);
            this.after.map.sync(this.before.map);

            document.querySelector('#button-explore').addEventListener('click', function (event) {
                KH.prototype._hideIntro();
                showMapControls();
            }, false);
            document.querySelector('#button-start').addEventListener('click', function (event) {
                KH.prototype._hideIntro();
                /*markerClickListener(geoJson[0], false);*/
            }, false);

        },

        _initializeMarker: function (feature, latLng) {

            var options2 = {
                iconShape: 'circle-dot',
                borderWidth: 5,
                borderColor: '#c00'
            };
            var marker = L.marker(latLng, {icon:  L.BeautifyIcon.icon(options2)});
            marker.on('click', function(e) {
                var iconOptions = {
                          prefix: 'icon',
                          icon: 'info',
                          borderColor: '#c00',
                          backgroundColor: '#c00',
                          textColor: 'white'
                        };
                marker.setIcon(L.BeautifyIcon.icon(iconOptions));
                var left = $('#map-clip').css('left');

                KH.prototype._markerClickListener(e.target.feature, parseInt(left, 10) < e.layerPoint.x);
            });
            return marker;
        },

        _markerClickListener: function(feature, isLeft) {
            this.before.map.unsync(this.after.map);
            this.after.map.unsync(this.before.map);

            refreshContentPanel(feature.properties);
            if(isLeft){
                left();
            } else {
                right();
            }
            selectedPoint = feature.geometry.coordinates;
            this._flyToTargetPoint(feature.geometry.coordinates);
            var syncOptions = {noInitialSync : true}

            this.before.map.sync(this.after.map, syncOptions);
            this.after.map.sync(this.before.map, syncOptions);
        },

        _flyToTargetPoint: function(coordinates) {
            var flyToZoom = 16;
            var latLng = {'lat' : coordinates[1], 'lng' : coordinates[0]}
            var projection = this.before.map.project(latLng, flyToZoom);
            var targetPoint;
            var mapBase = document.querySelector('#map-base')
            if(isPortraitOrientation()) {
                var mapHeight = mapBase.offsetHeight;
                targetPoint = projection.subtract([0, -mapHeight / 4]);
            } else {
                var mapWidth = mapBase.offsetWidth;
                targetPoint = projection.subtract([mapWidth / 4, 0]);
            }
            var targetLatLng = this.before.map.unproject(targetPoint, flyToZoom);
            hideMapControls();

            this.before.map.flyTo(targetLatLng, flyToZoom, {animate:false});
            this.after.map.flyTo(targetLatLng, flyToZoom,{animate:false});
        }
    });

})(window);