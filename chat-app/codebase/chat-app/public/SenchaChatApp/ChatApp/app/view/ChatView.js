Ext.define('ChatApp.view.ChatView', {
    extend: 'Ext.List',
    xtype: 'chatView',
    
    config: {
        recordData: null,
        //layout: 'vbox',
        store: 'ChatList',
        scrollToTopOnRefresh : false,
        itemCls : 'chatListItemCls',
        pressedCls : 'transparentPressedCls',
        selectedCls :'transparentPressedCls',
        itemTpl:  new Ext.XTemplate(
                    '<table border="0px" style="padding:0px; margin-bottom:0px;width:100%;min-height: 42px;" {[this.setHideWHoleTranslated(values.sid, values.isTranslated)]}>',
                      '<tr class="{sid:this.setMessageClass} {isTranslated:this.setBorder}">',
                        '<td style="padding-left:5px;width:5em;padding-right: 5px;">',
                            '<div {isTranslated:this.setHideName}> {sid:this.setName}: </div>',
                        '</td>', 
                        '<td>',
                            '<div style="color:{isTranslated:this.setFontColor}  !important;" > {message} </div>',
                        '</td>',
                      '</tr>',
                    '</table>',
                    {
                        setMessageClass: function(sid){
                            //console.log(sid);
                            if(Ext.getStore('User').getAt(0).data.user_id == sid){
                                return "myMsgCls";
                            }
                            return 'friendMsgCls';  //"senderCls"; //
                        },

                        setHideWHoleTranslated: function(sid, isTranslated){
                            if((Ext.getStore('User').getAt(0).data.user_id == sid) && isTranslated==true){
                                return "";//"hidden";
                            }
                            return "";
                        },

                        setHideName: function(isTranslated){
                            if(isTranslated){
                                return "hidden";
                            }
                            return "";
                        },

                        setName: function(sid){
                            if(Ext.getStore('User').getAt(0).data.user_id == sid){
                                return "Me";
                            }
                            var chatView = Ext.Viewport.getActiveItem().getActiveItem().getActiveItem().down('chatView');

                            return chatView.getRecordData().data.first_name;
                        },

                        setBorder: function(isTranslated){
                            if(isTranslated){
                                return "noBorderCls";
                            }
                            return "borderCls";
                        },

                        setFontColor: function(isTranslated){
                            //console.log(isTranslated)
                            if(isTranslated)
                            {
                                return "green";  "translatedMsgCls"; //
                            }
                            return "black";
                        },

                        setAvatar: function(uid){
                              return "https://graph.facebook.com/" + uid + "/picture?type=small";
                        }
                    }
                ),
    /*    itemTpl:  new Ext.XTemplate(
//                    '<table border="0px" style="padding:0px; margin-bottom:0px;">',
  //                    '<tr>',
                        //'<td style="width:10%; min-width:50px;"><img src="{uid:this.setAvatar}" height="auto" width="auto"/></td>',
                        //'<td><img src="{image}" height="60px" width="60px"/></td>',
                       // '<td style="padding-left:5px;">',
                         //   '<div> {senderName}: </div>',
                        //'</td>', 
                        //'<td class="{sid:this.setMessageClass}">',
                            '<div class="{sid:this.setMessageClass}" style="color:{isTranslated:this.setFontColor}  !important;" > {message} </div>',
                            //'<div class="{sid:this.setMessageClass} {isTranslated:this.setFontColor}" > {message} </div>',
                        //'</td>',
    //                  '</tr>',
      //              '</table>',
                    {
                        setMessageClass: function(sid){
                            //console.log(sid);
                            if(Ext.getStore('User').getAt(0).data.user_id == sid){
                                return "myMsgCls";
                            }
                            return 'friendMsgCls';
                        },

                        setFontColor: function(isTranslated){
                            //console.log(isTranslated)
                            if(isTranslated)
                            {
                                return "green";  "translatedMsgCls"; //
                            }
                            return "black";
                        },

                        setAvatar: function(uid){
                              return "https://graph.facebook.com/" + uid + "/picture?type=small";
                        }
                    }
                ),  */
        //'<img src="{image}" height="60px" width="60px"/>  {name}'
        items: [
            {
                xtype: 'panel',
                docked: 'top',
                hidden: true,
                itemId: 'senderPanId',
                style: 'border-bottom:2px solid black;'
            },
            {
                xtype: 'panel',
                layout: 'hbox',
                docked: 'bottom',
                style: 'border-top: 1px solid lightgray;background: white;',
                items: [
                    {
                        xtype: 'textareafield',
                        flex: '3',
                        itemId: 'msgTextAreaId',
                        inputCls : 'getMsgTextAreaCls',
                        //clearIcon: false,
                        placeHolder: 'Your message'
                    },
                    {
                        xtype: 'button',
                        text: 'Send',
                        cls: 'sendBtnCls',
                        itemId: 'msgSendBtnId',
                        handler: function(){
                            //var chatView = Ext.Viewport.getActiveItem().down('chatView');
                            var chatView = Ext.Viewport.getActiveItem().getActiveItem().getActiveItem().down('chatView');
                            var msgTextArea = chatView.down('#msgTextAreaId');
                            var msg = msgTextArea.getValue()
                            var recordData = chatView.getRecordData();
                            var userStore = Ext.getStore('User');
                            if(!msg){
                                Ext.Msg.alert(null,"Please enter message.");
                                return;
                            }
                            var msgobj = {
                                message: msg,
                                //senderName: userStore.getAt(0).data.first_name,
                                mid: '' + (new Date()).getTime(),
                                sid: userStore.getAt(0).data.user_id,
                                rid: recordData.data.user_id,
                                isTranslated: false
                            };

                            PUBNUB_demo.publish({
                                channel: recordData.data.channel_id,
                                message: msgobj
                            });

                            msgTextArea.setValue('');
                        }
                    }
                ]
            }
        ],
        listeners: {
            painted: function(ths){
              /*  
                var me = this;
                var chatView = Ext.Viewport.getActiveItem().getActiveItem().getActiveItem().getActiveItem().down('chatView');
                chatView.getScrollable().getScroller().scrollToEnd();
                //var chatView = Ext.Viewport.getActiveItem().down('chatView');
                var record = me.getRecord();
                me.down('#senderPanId').setHtml(record.data.first_name + " " + record.data.last_name);
                */
            },

            itemsingletap: function( ths, index, target, record, e, eOpts ){
                //alert(record);
            }
        }
        
    },

});
