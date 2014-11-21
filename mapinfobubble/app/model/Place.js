Ext.define('MapInfobubble.model.Place', {
    extend: 'Ext.data.Model',
    config: {
        fields: [{
            name: 'name'
        }, {
            name: 'latitude',
            mapping: 'geometry.location.lat'
        }, {
            name: 'longitude',
            mapping: 'geometry.location.lng'
        }, {
            name: 'description',
            mapping: 'vicinity'
        }],
    }
});
