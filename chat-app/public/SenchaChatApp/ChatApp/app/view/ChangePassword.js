Ext.define('ChatApp.view.ChangePassword', {
    extend: 'Ext.Panel',
    xtype: 'changePassword',
    
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
                xtype: 'passwordfield',
                itemId : 'oldPasswordCPId',
                cls: 'textFieldLoginCls',
                inputCls: 'textFieldInputLoginCls',
                placeHolder: 'Old Password'
            },
            {
                xtype: 'passwordfield',
                itemId : 'newPasswordCPId',
                cls: 'textFieldLoginCls',
                inputCls: 'textFieldInputLoginCls',
                placeHolder: 'New Password'
            },
            {
                xtype: 'passwordfield',
                itemId : 'password_confirmationCPId',
                cls: 'textFieldLoginCls',
                inputCls: 'textFieldInputLoginCls',
                placeHolder: 'Confirm Password'
            },
            {
                xtype: 'button',
                text: 'Save',
                action:'changePasswordAction',
                cls: 'loginBtnClsFirstPage'
            }
        ],
        listeners: {
            painted: function(ths){
                Ext.Viewport.getActiveItem().getActiveItem().getActiveItem().down('#mainToolbarId').setTitle("Change Password");
                ChatApp.app.getController('LeftMenu').showBackBtn(false);
            }
        }
        
    },

});
