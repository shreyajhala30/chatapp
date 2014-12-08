Ext.define('ChatApp.view.LeftMenu', {
    extend: 'Ext.List',
    xtype: 'leftMenu',
    requires: ['Ext.data.Store'],
    config: {
      cls: 'nav-list',
      itemId: 'slideNavListId',
      itemTpl: '<div style="padding-top: 11px;padding-left: 10px;line-height: 1.5em;"><div class="leftMenuIcon" style="-webkit-mask-image:url({iconPath});"></div><span>{name}</span></div>',
      //itemTpl: '<div class="{iconCls}"><span>{name}</span></div>',
      pinHeaders: true,
      store: 'LeftMenuList',
      items: [
        {
          xtype: 'panel',
          docked: 'top',
          style: 'color: white; text-align: center; padding: 12px;',
          itemId: 'namePanLeftMenuId',
          //html: 'Deep Shah'
        }
      ]
    }
});