Ext.define('ChatApp.controller.Main', {
	extend: 'Ext.app.Controller',
	config: {
		refs: {
			signup: 'button[action=doSignup]',
			login: 'button[action=doLogin]',
			resetPassword: 'button[action=resetPassword]',
			invite: 'button[action=inviteAction]',
			changePassword: 'button[action=changePasswordAction]',
			changeLanguage: 'button[action=changeLanguageAction]'
		},
		control: {
			signup: {
				tap: 'signupBtnTapped'
			},
			login: {
				tap: 'loginBtnTapped'
			},
			resetPassword: {
				tap: 'resetPasswordBtnTapped'
			},
			invite: {
				tap: 'inviteTapped'
			},
			changePassword: {
				tap: 'changePasswordTapped'
			},
			changeLanguage: {
				tap: 'changeLanguageTapped'
			}
		}
	},

	/**
	 * @method launch
	 * first method to execute when application opens
	 */
	launch:function(){
	},


	refreshFriendList:function(){
		var me = this,
		    API = ChatApp.app.getController('API');
		var params = {
			email     : localStorage.getItem('email'),
			password  : localStorage.getItem('password')
		};
		
	 	API.doLogin(params,             // params
			function(res){      // Success Function
			    data = Ext.decode(res.responseText);

			    if(data.error){
			        //Ext.Msg.alert("Error",data.error);
			        return;
			    }
			    if(data.result){
			    	if(data.result.errorcode)
			    	{
			        	//Ext.Msg.alert("Error",data.result.messages);
			        	return;
			        }
			    }
			    var store = Ext.getStore('User');
			    store.removeAll(true);
			    store.add(data);

			    var friendStore = Ext.getStore('FriendsList');
			    if(friendStore.getCount() < data.friends.length){
				    friendStore.removeAll(true);
				    friendStore.add(data.friends);
    			    Ext.Viewport.getActiveItem().getActiveItem().getActiveItem().down('friendsList').refresh();
				}


				var chatStore = Ext.getStore('ChatList');

			    for(var i=0; i<friendStore.getCount(); i++){
			    	PUBNUB_demo.subscribe({
			            channel: friendStore.getAt(i).data.channel_id, //'demo_deep',
			            message: function(msgObj){
			            	console.log(msgObj);
			            	if(msgObj.mid != null)
			            	{
			            		//for(var i=0; i<msgObj.length; i++){
			            			if(((msgObj.isTranslated == true) && (msgObj.sid == store.getAt(0).data.user_id)))
			            			{
		                        	}
		                        	else{
		                        		chatStore.add(msgObj);
		                        		setTimeout(function(){
		                        			var chatView = Ext.Viewport.getActiveItem().getActiveItem().getActiveItem().down('chatView');
				                            chatView.getScrollable().getScroller().scrollToEnd();
				                        },200);
		                        	}
		                    	//}
		                    }
			            }
			        });
			    }

			    for(var i=0; i<data.new_request.length; i++){
			    	me.acceptFriendToList(data.auth_token,data.new_request[i].user_id);
			    }

			},
			function(res){      // Failure Function
				Ext.Viewport.setMasked(false);
				console.log(res);
		});

	},

	acceptFriendToList: function(auth_token, fid){
		var me = this,
		    API = ChatApp.app.getController('API');
		    
		var params = {
			authentication_token : auth_token,
			friend_id  : fid
		};

	 	Ext.Viewport.setMasked({xtype:'loadmask'});
	 	API.confirmFriendRequest(params,             // params
			function(res){      // Success Function
			    Ext.Viewport.setMasked(false);
			    data = Ext.decode(res.responseText);

			    if(data.error){
			        //Ext.Msg.alert("Error",data.error);
			        return;
			    }
			    if(data.result){
			    	if(data.result.errorcode)
			    	{
			        	//Ext.Msg.alert("Error",data.result.messages);
			        	return;
			        }
			    }


/*
				d = data;
				console.log(data);
			    
			    var friendStore = Ext.getStore('FriendsList');
			    friendStore.add(data);

				var chatStore = Ext.getStore('ChatList');

				PUBNUB_demo.subscribe({
			            channel: data.channel_id,
			            message: function(msgObj){
			            	console.log(msgObj);
			            	if(msgObj.mid != null)
			            	{
			            		//for(var i=0; i<msgObj.length; i++){
			            			if(((msgObj.isTranslated == true) && (msgObj.sid == store.getAt(0).data.user_id)))
			            			{

		                        	}
		                        	else{
		                        		chatStore.add(msgObj);
		                        		setTimeout(function(){
		                        			var chatView = Ext.Viewport.getActiveItem().getActiveItem().getActiveItem().down('chatView');
				                            chatView.getScrollable().getScroller().scrollToEnd();
				                        },200);
		                        	}
		                    	//}
		                    }
			            }
			       });

			    Ext.Viewport.getActiveItem().getActiveItem().getActiveItem().down('friendsList').refresh();

			    */
			},
			function(res){      // Failure Function
				Ext.Viewport.setMasked(false);
				console.log(res);
		});
	},

	loginBtnTapped: function(){
		var me = this,
		    API = ChatApp.app.getController('API'),
		    loginView = Ext.Viewport.getActiveItem().down('signin');
		var email = loginView.down('#emailIdLogin').getValue();
		var password = loginView.down('#passwordIdLogin').getValue();
		var params = {
			email     : email,
			password  : password
		};

		localStorage.setItem('email',email);
		localStorage.setItem('password',password);

	 	Ext.Viewport.setMasked({xtype:'loadmask'});
	 	API.doLogin(params,             // params
			function(res){      // Success Function
			    Ext.Viewport.setMasked(false);
			    data = Ext.decode(res.responseText);

			    if(data.error){
			        Ext.Msg.alert("Error",data.error);
			        return;
			    }
			    if(data.result){
			    	if(data.result.errorcode)
			    	{
			        	Ext.Msg.alert("Error",data.result.messages);
			        	return;
			        }
			    }
			    var store = Ext.getStore('User');
			    store.removeAll(true);
			    store.add(data);

			    var friendStore = Ext.getStore('FriendsList');
			    friendStore.removeAll(true);
			    friendStore.add(data.friends);

				refreshVar = setInterval(function(){
					me.refreshFriendList();
				},30000);
			    


				var chatStore = Ext.getStore('ChatList');

			    for(var i=0; i<friendStore.getCount(); i++){
			    	PUBNUB_demo.subscribe({
			            channel: friendStore.getAt(i).data.channel_id, //'demo_deep',
			            message: function(msgObj){
			            	console.log(msgObj);
			            	if(msgObj.mid != null)
			            	{
			            		//for(var i=0; i<msgObj.length; i++){
			            			if(((msgObj.isTranslated == true) && (msgObj.sid == store.getAt(0).data.user_id)))
			            			{
		                        	}
		                        	else{
		                        		chatStore.add(msgObj);
		                        		setTimeout(function(){
		                        			var chatView = Ext.Viewport.getActiveItem().getActiveItem().getActiveItem().down('chatView');
				                            chatView.getScrollable().getScroller().scrollToEnd();
				                        },200);
		                        	}
		                    	//}
		                    }
			            }
			        });
			    }

			    for(var i=0; i<data.new_request.length; i++){
			    	me.acceptFriendToList(data.auth_token,data.new_request[i].user_id);
			    	//friendStore.insert(0,data.new_request[i]);
			    }

			    Ext.Viewport.getActiveItem().animateActiveItem('mainContainer',{type:'flip'});
			    Ext.Viewport.getActiveItem().getActiveItem().getActiveItem().setActiveItem('friendsList');
			    Ext.Viewport.getActiveItem().getActiveItem().getActiveItem().down('friendsList').refresh();

			    var leftMenuNav = Ext.Viewport.getActiveItem().down('mainContainer').down('leftMenu');
			    leftMenuNav.down('#namePanLeftMenuId').setHtml(data.first_name + " " + data.last_name);

			    if(data.friends.length <= 0 && data.new_request.length <= 0){
			    	Ext.Viewport.getActiveItem().getActiveItem().getActiveItem().setActiveItem('invite');
			    	Ext.Msg.alert(null,"Please invite new friends for communication.");
			    }
			},
			function(res){      // Failure Function
				Ext.Viewport.setMasked(false);
				console.log(res);
		});
	},

	signupBtnTapped: function(){
		var me = this,
		    API = ChatApp.app.getController('API'),
		    signupView = Ext.Viewport.getActiveItem().down('signup');
		var fName = signupView.down('#first_nameId').getValue();
		var lName = signupView.down('#last_nameId').getValue();
		var email = signupView.down('#emailId').getValue();
		var password = signupView.down('#passwordId').getValue();
		var cPassword = signupView.down('#password_confirmationId').getValue();
		var language = signupView.down('#lanuageId').getValue();
		var params = {
			first_name: fName,
			last_name : lName,
			email     : email,
			password  : password,
			password_confirmation: cPassword,
			language  : language
		};

		localStorage.setItem('email',email);
		localStorage.setItem('password',password);

	 	Ext.Viewport.setMasked({xtype:'loadmask'});
	 	API.doSignup({user: params},             // params
			function(res){      // Success Function
			    Ext.Viewport.setMasked(false);
			    var data = Ext.decode(res.responseText);
			    if(data.error){
			        Ext.Msg.alert("Error",data.error);
			        return;
			    }
			    if(data.result){
			    	if(data.result.errorcode)
			    	{
			        	Ext.Msg.alert("Error",data.result.messages);
			        	return;
			        }
			    }
			    var store = Ext.getStore('User');
			    store.removeAll(true);
			    store.add(data);
			    Ext.Viewport.getActiveItem().animateActiveItem('mainContainer',{type:'flip'});
			    Ext.Viewport.getActiveItem().getActiveItem().getActiveItem().setActiveItem('friendsList');
			    Ext.Viewport.getActiveItem().getActiveItem().getActiveItem().down('friendsList').refresh();

				var leftMenuNav = Ext.Viewport.getActiveItem().down('mainContainer').down('leftMenu');
			    leftMenuNav.down('#namePanLeftMenuId').setHtml(data.first_name + " " + data.last_name);

			    if(data.friends.length <= 0 && data.new_request.length <= 0){
			    	Ext.Viewport.getActiveItem().getActiveItem().getActiveItem().setActiveItem('invite');
			    	Ext.Msg.alert(null,"Please invite new friends for communication.");
			    }

			    refreshVar = setInterval(function(){
					me.refreshFriendList();
				},30000);
			},
			function(res){      // Failure Function
				Ext.Viewport.setMasked(false);
				console.log(res);
		});
	},

	resetPasswordBtnTapped: function(){
		var me = this,
		    API = ChatApp.app.getController('API'),
		    loginView = Ext.Viewport.getActiveItem().down('signin');
		var email = loginView.down('#emailIdLogin').getValue();
		var params = {
			email     : email
		};

	 	Ext.Viewport.setMasked({xtype:'loadmask'});
	 	API.resetPassword(params);
	},

	inviteTapped: function(){
		var me = this,
		    API = ChatApp.app.getController('API'),
		    inviteView = Ext.Viewport.getActiveItem().getActiveItem().getActiveItem().down('invite');
		var email = inviteView.down('#emailIdInvite').getValue();
		var userStore = Ext.getStore('User');
		var params = {
			authentication_token: userStore.getAt(0).data.auth_token,
			email     : email
		};

	 	Ext.Viewport.setMasked({xtype:'loadmask'});
	 	API.inviteFriend(params,             // params
			function(res){      // Success Function
			    Ext.Viewport.setMasked(false);
			    var data = Ext.decode(res.responseText);
			    if(data.error){
			        Ext.Msg.alert("Error",data.error);
			        return;
			    }
			    if(data.result){
			    	if(data.result.errorcode)
			    	{
			        	Ext.Msg.alert("Error",data.result.messages);
			        	return;
			        }
			    }
			    Ext.Msg.alert(null,data.data.message);
			    inviteView.down('#emailIdInvite').setValue("");
			    var friendStore = Ext.getStore('FriendsList');
			    //friendStore.add(data.friends);
			},
			function(res){      // Failure Function
				Ext.Viewport.setMasked(false);
				console.log(res);
		});
	},

	changePasswordTapped: function(){
		var me = this,
		    API = ChatApp.app.getController('API'),
		    changePasswordView = Ext.Viewport.getActiveItem().getActiveItem().getActiveItem().down('changePassword');
		var current_password = changePasswordView.down('#oldPasswordCPId').getValue();
		var newPassword = changePasswordView.down('#newPasswordCPId').getValue();
		var cNewPassword = changePasswordView.down('#password_confirmationCPId').getValue();

		if(newPassword != cNewPassword)
		{
			Ext.Msg.alert("Error","New password and confirm password are not matching.");
			return;
		}

		var userStore = Ext.getStore('User');
		var params = {
			authentication_token: userStore.getAt(0).data.auth_token,
			'user[current_password]': current_password,
			'user[password]'     : newPassword
		};

	 	Ext.Viewport.setMasked({xtype:'loadmask'});
	 	API.changePassword( params,              // params
			function(res){      // Success Function
			    Ext.Viewport.setMasked(false);
			    var data = Ext.decode(res.responseText);
			    if(data.error){
			        Ext.Msg.alert("Error",data.error);
			        return;
			    }
			    if(data.result){
			    	if(data.result.errorcode)
			    	{
			        	Ext.Msg.alert("Error",data.result.messages);
			        	return;
			        }
			    }
			    Ext.Msg.alert(null,data.data.messages);
			    //inviteView.down('#emailIdInvite').setValue("");

			},
			function(res){      // Failure Function
				Ext.Viewport.setMasked(false);
				console.log(res);
		});
	},

	changeLanguageTapped: function(){

	},

	setTranslationAPI: function(flag){
		var me = this,
		    API = ChatApp.app.getController('API');
		    
		var userStore = Ext.getStore('User');
		var params = {
			authentication_token: userStore.getAt(0).data.auth_token,
			translation: flag
		};

	 	Ext.Viewport.setMasked({xtype:'loadmask'});
	 	API.setTranslationFlag( params,              // params
			function(res){      // Success Function
			    Ext.Viewport.setMasked(false);
			    var data = Ext.decode(res.responseText);
			    if(data.error){
			        Ext.Msg.alert("Error",data.error);
			        return;
			    }
			    if(data.result){
			    	if(data.result.errorcode)
			    	{
			        	Ext.Msg.alert("Error",data.result.messages);
			        	return;
			        }
			    }
			    Ext.Msg.alert(null,data.data.message);
			    //inviteView.down('#emailIdInvite').setValue("");

			},
			function(res){      // Failure Function
				Ext.Viewport.setMasked(false);
				console.log(res);
		});
	},


});
