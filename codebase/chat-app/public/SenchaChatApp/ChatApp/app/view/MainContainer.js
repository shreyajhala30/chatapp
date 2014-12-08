Ext.define('ChatApp.view.MainContainer', {
    extend: 'Ext.Container',
    xtype: 'mainContainer',
    config: {
      fullscreen: true,
      layout: 'hbox',
      items: [
        {
            xtype: 'mainCardGroup',
            cls: 'slide',
            width: '100%'
        },
        {
            xtype: 'leftMenu',
            width: 250
        }
      ]
    }
});
