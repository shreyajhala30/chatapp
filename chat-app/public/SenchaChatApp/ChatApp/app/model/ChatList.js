Ext.define('ChatApp.model.ChatList', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            {name: 'message', type: 'string'},
            {name: 'senderName',   type: 'string'},
            {name: 'isTranslated', type: 'boolean'},
            {name: 'mid',   type: 'string'},
            {name: 'sid',   type: 'string'},
            {name: 'rid',   type: 'string'}
        ]
    }
});