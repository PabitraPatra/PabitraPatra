Ext.define('MapInfobubble.controller.App', {
    extend: 'Ext.app.Controller',
    config: {
        refs: {
            // Containers
            map: 'map[name="infoMap"]',
            infoMap: 'infomap',
            details: 'details',
            main: 'main',
            countryNameList: 'list[name="country_name_list"]',

            // Button
            backToMap: 'button[name="backBtnToMap"]',
            backToList: 'button[name="backBtnToList"]'
        },

        control: {
            map: {
                maprender: function(thisOb, map, eOpts) {
                    var me = this;
                    me.map = map;
                }
            },

            backToMap: {
                tap: function() {
                    this.getMain().animateActiveItem(this.getInfoMap(), {
                        type: 'slide',
                        direction: 'right'
                    });
                }
            },

            countryNameList: {
                itemtap: function(el, index, target, rec) {
                    this.loadMarker(rec);
                    this.getMain().animateActiveItem(this.getInfoMap(), {
                        type: 'slide',
                        direction: 'left'
                    });
                }
            },

            backToList: {
                tap: function() {
                    //Removing the marker from our map
                    this.marker.setMap(null);

                    this.getMain().animateActiveItem(this.getCountryNameList(), {
                        type: 'slide',
                        direction: 'right'
                    });
                }
            },
        }
    },

    launch: function() {
        Ext.getStore('Places').load();

    },

    /*
     * Function responsible for all the marker and infobubble handling
     **/

    loadMarker: function(rec) {
        var me = this,
            latlngbounds = new google.maps.LatLngBounds(),
            position,
            map = me.map,
            store = Ext.getStore('Places'),
            ib = new InfoBubble({
                hideCloseButton: true,
                disableAutoPan: true,
                maxHeight: 110
            });

        position = new google.maps.LatLng(rec.get('latitude'),
            rec.get('longitude'));
        Ext.defer(function() {
            map.setCenter(position);
        }, 400);
        this.marker = new google.maps.Marker({
            position: position,
            map: map,
            data: rec
        });

        /************* Code for google direction service *************/
        var directionsService = new google.maps.DirectionsService(),
            directionsDisplay = new google.maps.DirectionsRenderer(),
            request = {
                origin: "rudrapur,domjur", //Starting place
                destination: value, //Ending place
                optimizeWaypoints: true, //Shortest path
                travelMode: google.maps.TravelMode.WALKING
            };
        directionsDisplay.setMap(map);
        directionsService.route(request, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
                directionsDisplay.setDirections(response);
                console.log("success");
            } else {
                console.log("error");
            }
        });
        /************* Code for google direction service *************/

        /*
         * Showing InfoBubble
         **/
        (function(data, selfMarker) {
            console.log(selfMarker);
            google.maps.event.addListener(selfMarker, 'mousedown',
                function(event) {
                    ib.record = {
                        places: data
                    };

                    ib.setContent([
                        '<div class="infobox">',
                        '<div class="content">',
                        data.get('description'),
                        '</div>',
                        '<img src="resources/images/arrow.png">',
                        '</div>'
                    ].join(''));

                    /*
                     * center the map on the marker position
                     **/

                    ib.open(map, this);

                    google.maps.event.addListener(map, 'mousedown',
                        function() {
                            ib.close();
                        });

                    /*
                     * Tap on InfoBubble handled here
                     **/
                    google.maps.event.addDomListener(ib.bubble_, 'click',
                        function(e) {
                            if (!me.getDetails()) {
                                me.getMain().add({
                                    xtype: 'details'
                                });
                            }
                            me.getMain().animateActiveItem(me.getDetails(), {
                                type: 'slide',
                                direction: 'left'
                            });

                            me.getDetails().setData(ib.record.places.data);
                            ib.close();
                        });
                });
        }(rec, this.marker));
        latlngbounds.extend(position);

        map.fitBounds(latlngbounds);
        map.setZoom(11);
    }
});
