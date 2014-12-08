Ext.define('ChatApp.model.LeftMenuList', {
  extend: 'Ext.data.Model',
  config: {
    identifier: 'uuid',
    fields: [
      'name',
      'iconPath'
    ]
  }
});