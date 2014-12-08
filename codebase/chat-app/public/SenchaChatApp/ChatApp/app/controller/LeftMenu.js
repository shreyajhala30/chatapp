Ext.define('ChatApp.controller.LeftMenu', {
	extend: 'Ext.app.Controller',
	config: {
		refs: {
			mainCardGroup: 'mainCardGroup',
			navBtn: 'mainCardGroup #navBtnId',
			backButton: 'mainCardGroup #backButtonId',
			leftMenu: 'leftMenu'
		},
		control: {
			navBtn: {
				tap: 'toggleNav'
			},
			backButton: {
				tap: 'backButtonTapped'
			},
			leftMenu: {
				itemsingletap: 'leftMenuItemTapped'
			}
		}
	},

	/**
	* Toggle the slide navogation view
	*/
	toggleNav: function () {
		var me = this;
		var mainEl = me.getMainCardGroup().element;
		if (mainEl.hasCls('out')) {
			mainEl.removeCls('out').addCls('in');
			me.getMainCardGroup().setMasked(false);
		} else {
			mainEl.removeCls('in').addCls('out');
			me.getMainCardGroup().setMasked(true);
		}
	},

	backButtonTapped: function(){
		ChatApp.app.getController('LeftMenu').showBackBtn(true);
		var currentView = Ext.Viewport.getActiveItem().getActiveItem().getActiveItem();
		if(currentView.getActiveItem().xtype == 'chatView')
		{
			currentView.animateActiveItem('friendsList',{type:'slide', direction:'right'});
		}
		if(currentView.getActiveItem().xtype == 'changePassword' || currentView.getActiveItem().xtype == 'changeLanguage')
		{
			currentView.animateActiveItem('settings',{type:'slide', direction:'right'});
		}
	},

	showBackBtn: function(val){
		Ext.Viewport.getActiveItem().getActiveItem().getActiveItem().down('#mainToolbarId').down('#navBtnId').setHidden(!val);
		Ext.Viewport.getActiveItem().getActiveItem().getActiveItem().down('#mainToolbarId').down('#backButtonId').setHidden(val);
	},

	leftMenuItemTapped: function( ths, index, target, record, e, eOpts ){
		var me = this;
		var menuName = record.data.name;
		me.toggleNav();
		var mainCard = Ext.Viewport.getActiveItem().getActiveItem().getActiveItem(); //.getActiveItem();
		if(menuName == "Home"){
			mainCard.setActiveItem('friendsList');
		}
		else if(menuName == "Invite"){
			mainCard.setActiveItem('invite');
		}
		else if(menuName == "Settings"){
			var currentView = Ext.Viewport.getActiveItem().getActiveItem().getActiveItem();
			var userStore = Ext.getStore('User');
            if(userStore.getCount() > 0)
            {
            	//alert(45)
            	currentView.down('settings').down('#translationToggleId').setValue(userStore.getAt(0).data.translation);
            	//currentView.down('settings').down('#translationToggleId').setValue(false);
            }
			mainCard.setActiveItem('settings');
		}
		else if(menuName == "Logout"){
			clearInterval(refreshVar);
			me.logoutApiCall();
		}
	},

	logoutApiCall: function(){
		var me = this,
	    API = ChatApp.app.getController('API');

		var userStore = Ext.getStore('User');
		var params = {
			authentication_token: userStore.getAt(0).data.auth_token
		};

		Ext.Viewport.getActiveItem().animateActiveItem('signin',{type:'flip'});
		Ext.getStore("ChatList").removeAll(true);
		Ext.getStore("FriendsList").removeAll(true);
		Ext.getStore("User").removeAll(true);

	 	API.doLogout( params,              // params
			function(res){      // Success Function
			},
			function(res){      // Failure Function
		});
	}


});
