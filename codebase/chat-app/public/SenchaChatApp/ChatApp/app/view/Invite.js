Ext.define('ChatApp.view.Invite', {
    extend: 'Ext.Panel',
    xtype: 'invite',
    
    config: {
        layout: 'vbox',
        cls: 'signupPageCls',
        scrollable:{
           direction:'vertical',
           directionLock:true
        },
        items: [
            {
                xtype: 'panel',
                height: '2em',
                cls : 'transparentPressedCls',
            },
            {
                xtype: 'textfield',
                itemId : 'emailIdInvite',
                //clearIcon : false,
                cls: 'textFieldLoginCls',
                inputCls: 'textFieldInputLoginCls',
                placeHolder: 'Email'
            },
            {
                xtype: 'button',
                text: 'Send Invitation',
                action:'inviteAction',
                cls: 'loginBtnClsFirstPage'
            }
        ],
        listeners: {
            painted: function(ths){
                Ext.Viewport.getActiveItem().getActiveItem().getActiveItem().down('#mainToolbarId').setTitle("Invite People");
            }
        }
        
    },

});
