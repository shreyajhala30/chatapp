Ext.define('ChatApp.model.User', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            {name: 'first_name', type: 'string'},
            {name: 'last_name', type: 'string'},
            {name: 'email', type: 'string'},
            {name: 'user_id', type: 'string'},
            {name: 'auth_token',   type: 'string'},
            {name: 'translation',   type: 'string'}
        ]
    }
});