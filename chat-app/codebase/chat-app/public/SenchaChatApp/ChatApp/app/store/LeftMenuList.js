Ext.define('ChatApp.store.LeftMenuList', {
  extend: 'Ext.data.Store',
  config: {
    model: 'ChatApp.model.LeftMenuList',
    storeId: 'LeftMenuList',
    data: [
        { name:'Home', iconPath:'resources/images/home.png'},
        { name:'Invite', iconPath:'resources/images/user_add.png'},
        { name:'Settings', iconPath:'resources/images/settings.png'},
        { name:'Logout', iconPath:'resources/images/logout.png'},
    ],
    autoLoad: true
  }
});
