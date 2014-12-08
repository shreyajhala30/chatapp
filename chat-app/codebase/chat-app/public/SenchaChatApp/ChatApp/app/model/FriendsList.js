Ext.define('ChatApp.model.FriendsList', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            {name: 'first_name', type: 'string'},
            {name: 'last_name',   type: 'string'},
            {name: 'email', type: 'string'},
            {name: 'language',   type: 'string'},
            {name: 'channel_id',   type: 'string'},
            {name: 'user_id',   type: 'string'},
            {name: 'unread_count',   type: 'string'},
            {name: 'is_online',   type: 'boolean'}
        ]
    }
});