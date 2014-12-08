Ext.define('ChatApp.view.FriendsList', {
    extend: 'Ext.List',
    xtype: 'friendsList',
    config: {
        //layout: 'vbox',
        store: 'FriendsList',
        pressedCls : 'transparentPressedCls',
        selectedCls :'transparentPressedCls',
        emptyText : "Please invite friends.",
        deferEmptyText:true,
        itemTpl:  new Ext.XTemplate(
                    '<table border="0px" style="padding:0px; margin-bottom:0px;width:100%;" class="friendsItemCls">',
                      '<tr>',
                        //'<td style="width:10%; min-width:50px;"><img src="{uid:this.setAvatar}" height="auto" width="auto"/></td>',
                        //'<td><img src="{image}" height="60px" width="60px"/></td>',
                        '<td style="padding-left:7px;padding-top:7px;width:100%;">',
                            '<div> {first_name} {last_name}  <span class="onLineCls" style="background:{is_online:this.isOnline};"> </span> </div>',
                        '</td>',
                        '</tr><tr>',
                        '<td style="padding-left:7px;padding-bottom:7px;font-size:0.8em;width:100%;">',
                            '<div><span> {email} </span> <span class="unreadMessageCls" {unread_count:this.setUnreadMessage}> {unread_count} </span></div>',
                        '</td>',
                      '</tr>',
                    '</table>',
                    {
                        isOnline: function(isOnline){
                            if(isOnline)
                            {
                                return 'green';
                            }
                            return "lightgray";
                        },

                        setUnreadMessage: function(num){
                            if(num <= 0)
                            {
                                return "hidden";
                            }
                            return "";
                        },
                        setAvatar: function(uid){
                              return "https://graph.facebook.com/" + uid + "/picture?type=small";
                        }
                    }
                ),
        //'<img src="{image}" height="60px" width="60px"/>  {name}'
        listeners: {
            painted: function(){
                Ext.Viewport.getActiveItem().getActiveItem().getActiveItem().down('#mainToolbarId').setTitle("ChatApp");
            },

            itemsingletap: function( ths, index, target, record, e, eOpts ){
                //alert(record);
                var store = Ext.getStore('User');
                //Ext.Viewport.getActiveItem().animateActiveItem('chatView',{type:'slide'});
                //Ext.Viewport.getActiveItem().getActiveItem().getActiveItem().getActiveItem().animateActiveItem('chatView',{type:'slide'});
                Ext.Viewport.getActiveItem().getActiveItem().getActiveItem().animateActiveItem('chatView',{type:'slide'});
                var chatView = Ext.Viewport.getActiveItem().getActiveItem().getActiveItem().down('chatView');
                chatView.setRecordData(record);
                Ext.Viewport.getActiveItem().getActiveItem().getActiveItem().down('#mainToolbarId').setTitle(record.data.first_name + " " + record.data.last_name);
                ChatApp.app.getController('LeftMenu').showBackBtn(false);
                 PUBNUB_demo.history({
                     channel: record.data.channel_id,
                     count: 50,
                     callback: function(msgObj){
                        var chatStore = Ext.getStore('ChatList');
                        chatStore.removeAll(true);
                        for(var i=0; i<msgObj[0].length; i++)
                        {
                            if(msgObj[0][i].sid && msgObj[0][i].rid && msgObj[0][i].message)
                            {
                                if(((msgObj[0][i].isTranslated == true) && (msgObj[0][i].sid == store.getAt(0).data.user_id)))
                                {
                                    
                                }
                                else{
                                    chatStore.add(msgObj[0][i]);
                                }

                            }
                        }
                        chatView.refresh();
                        //var chatView = Ext.Viewport.getActiveItem().getActiveItem().getActiveItem().down('chatView');
                        setTimeout(function(){
                            chatView.getScrollable().getScroller().scrollToEnd();
                        },200);
                        
                        //var chatView = Ext.Viewport.getActiveItem().getActiveItem().getActiveItem().getActiveItem().down('chatView');
                        //chatView.getScrollable().getScroller().scrollToEnd();
                     }
                 });
            }
        }    
    },
    
});
