Ext.define('MapInfobubble.view.Main', {
    extend: 'Ext.Container',
    xtype: 'main',
    requires: [
        'Ext.TitleBar',
        'Ext.dataview.List'
    ],
    config: {
        layout: 'card',

        items: [{
            xtype: 'list',
            name: 'country_name_list',
            onItemDisclosure: true,
            itemTpl: new Ext.XTemplate(
                '<div >{name}</div>'
            ),
            store: 'Places',
            items: [{
                docked: 'top',
                xtype: 'titlebar',
                title: 'List of hospitals'
            }]
        }, {
            xtype: 'infomap'
        }, {
            xtype: 'details'
        }]
    }
});
