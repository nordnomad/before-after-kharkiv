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

//             var selectedIcon = L.BeautifyIcon.icon({
//                            prefix: 'icon',
//                            icon: 'info',
//                            borderColor: '#c00',
//                            backgroundColor: '#c00',
//                            textColor: 'white'
//                        });
//            marker.setIcon(selectedIcon);
            var properties = feature.properties;
            this.before.map.markers.forEach(function(marker){
                layerName = layer.options.name;
                markerName = properties.title
                if(layerName == markerName){

                }

            });

            this.options.markerClickCallback(feature, isLeft);
            selectedPoint = feature.geometry.coordinates;
            this.flyToTargetPoint(feature.geometry.coordinates);
            this._syncMaps({noInitialSync : true});
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