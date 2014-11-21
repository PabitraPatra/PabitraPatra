Ext.define('MapInfobubble.store.Places', {
    extend: 'Ext.data.Store',
    config: {
        model: 'MapInfobubble.model.Place',
        autoLoad: true,
        proxy: {
            type: 'ajax',
            useDefaultXhrHeader: false,
            url: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json',
            method: 'GET',
            extraParams: {
                location: '22.599510,88.423729',
                radius: '5000',
                types: 'atm',
                key: 'AIzaSyBmbmtQnXfq22RJhJfitKao60wDgqrC5gA'
            },
            reader: {
                type: 'json',
                rootProperty: 'results'
            }
        }
    }
});
