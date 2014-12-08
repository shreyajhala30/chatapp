Ext.define('ChatApp.view.Settings', {
    extend: 'Ext.Panel',
    xtype: 'settings',
    
    config: {
        layout: 'vbox',
        cls: 'signupPageCls',
        scrollable:{
           direction:'vertical',
           directionLock:true
        },
        items: [
            {
                xtype:'panel',
                layout:'hbox',
                cls:'togglefield',
                items:[
                    {
                        xtype:'label',
                        html:'Translation',
                        flex:'1'
                    },
                    {
                        xtype:'togglefield',
                        value: 1,
                        itemId:'translationToggleId',
                        listeners:{
                            'change':function(ths, newValue, oldValue){
                                var userStore = Ext.getStore('User');
                                if(userStore.getCount() > 0)
                                {
                                    var currentView = Ext.Viewport.getActiveItem().getActiveItem().getActiveItem();
                                    if(currentView.getActiveItem().xtype == 'settings')
                                    {
                                        if(newValue)
                                        {
                                            ChatApp.app.getController('Main').setTranslationAPI(true);
                                        }
                                        else
                                        {
                                            ChatApp.app.getController('Main').setTranslationAPI(false);
                                        }
                                    }
                                }
                                
                            }
                            //'painted':function(){
                           /* initialize: function(){
                                var userStore = Ext.getStore('User');
                                if(userStore.getCount() > 0)
                                {
                                    this.setValue(userStore.getAt(0).data.translation);
                                }                                
                            } */
                        }
                    }
                ]
            },
            {
                xtype:'button',
                cls:'setButton',
                text:'Change Password',
                handler:function(){
                    Ext.Viewport.getActiveItem().getActiveItem().getActiveItem().animateActiveItem('changePassword',{type:'slide'});
                },
            },
            {
                xtype:'button',
                cls:'setButton',
                text:'Change Language',
                hidden: true,
                handler:function(){
                    Ext.Viewport.getActiveItem().getActiveItem().getActiveItem().animateActiveItem('changeLanguage',{type:'slide'});
                },
            }
        ],
        listeners: {
            painted: function(ths){
                Ext.Viewport.getActiveItem().getActiveItem().getActiveItem().down('#mainToolbarId').setTitle("Settings");
                ChatApp.app.getController('LeftMenu').showBackBtn(true);
            }
        }
        
    },

});
