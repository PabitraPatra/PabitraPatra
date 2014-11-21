Ext.define("MapInfobubble.view.Map", {
    extend: 'Ext.Container',
    xtype: 'infomap',
    requires: ['Ext.Map', 'Ext.TitleBar', 'Ext.field.Search'],
    config: {
        layout: 'fit',
        items: [{
            docked: 'top',
            xtype: 'titlebar',
            title: 'Map with InfoBubble',
            items: [{
                xtype: 'button',
                text: 'Back',
                ui: 'back',
                name: 'backBtnToList'
            }]
        }, {
            xtype: 'map',
            name: 'infoMap'
        }]
    }
});
