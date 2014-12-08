Ext.define("ChatApp.view.MainCardGroup", {
    extend: 'Ext.Container',
    xtype: 'mainCardGroup',
    config: {
        layout: 'card',
        items: [
            {
                xtype: 'titlebar',
                title: 'ChatApp',
                cls: 'loginFormTitlebarCls',
                ui:'mainToolbar',
                itemId: 'mainToolbarId',
                margin: '0px',
                docked: 'top',
                items: [
                  {
                      xtype: 'button',
                      itemId: 'navBtnId',
                      iconCls: 'list',
                      style: 'color: white;',
                      ui: 'plain'
                  },
                  {
                      xtype: 'button',
                      hidden: true,
                      itemId: 'backButtonId',
                      cls: 'loginTitleBtnCls',
                      icon: './resources/images/arrow-back-home.png',
                      iconCls: 'loginTitleIconBtnCls'
                      //text: '<',
                      //ui: 'plain'
                  }
                ]
            },
            {
                xtype: 'friendsList'
            },
            {
                xtype: 'chatView'
            },
            {
                xtype: 'settings'
            },
            {
                xtype: 'invite'
            },
            {
                xtype: 'changePassword'
            },
            {
                xtype: 'changeLanguage'
            }

        ]
    }
});