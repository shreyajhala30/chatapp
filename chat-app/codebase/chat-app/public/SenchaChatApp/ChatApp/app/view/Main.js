Ext.define('ChatApp.view.Main', {
    extend: 'Ext.Panel',
    xtype: 'main',
    requires: [
        'Ext.TitleBar'
    ],
    config: {
        layout: 'card',
        items: [
            {
                xtype: 'signin'
            },
            {
                xtype: 'signup'
            },
            {
                xtype: 'mainContainer'
            }
        ]
    }
});
