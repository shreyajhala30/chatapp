Ext.define('ChatApp.view.ChangeLanguage', {
    extend: 'Ext.Panel',
    xtype: 'changeLanguage',
    
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
                xtype: 'selectfield',
                itemId : 'lanuageCLId',
                store: 'Language',
                displayField : 'name',
                valueField : 'code',
                cls: 'textFieldLoginCls',
                inputCls: 'textFieldInputLoginCls',
                usePicker : true
            },
            {
                xtype: 'button',
                text: 'Save',
                action:'changeLanguageAction',
                cls: 'loginBtnClsFirstPage'
            }
        ],
        listeners: {
            painted: function(ths){
                Ext.Viewport.getActiveItem().getActiveItem().getActiveItem().down('#mainToolbarId').setTitle("Change Language");
                ChatApp.app.getController('LeftMenu').showBackBtn(false);
            }
        }
        
    },

});
