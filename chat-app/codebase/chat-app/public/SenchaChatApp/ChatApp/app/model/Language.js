Ext.define('ChatApp.model.Language', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            {name: 'name', type: 'string'},
            {name: 'code',   type: 'string'}
        ]
    }
});