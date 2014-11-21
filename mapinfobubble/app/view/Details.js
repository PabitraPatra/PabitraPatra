Ext.define('MapInfobubble.view.Details', {
    extend: 'Ext.Container',
    xtype: 'details',
    config: {
        styleHtmlContent:true,
        scrollable: true,
        
        tpl: [
        '<div class="desc">Details: {description}</div>'
        ].join(''),
        
        items:[{
            xtype:'titlebar',
            title: 'Details',
            docked:'top',
            items:[{
                xtype:'button',
                text: 'Back',
                ui:'back',
                name:'backBtnToMap'
            }]
        }]
    }
});
