Ext.define('ChatApp.controller.API',{
    extend: 'Ext.app.Controller',
    
    config: {
         DOMAIN: "https://chat--app.herokuapp.com", 
           
         LOGIN_URI: "/api/authentication/login",
         SIGNUP_URI: "/api/authentication/sign_up",
         RESET_PASS_URI: "/api/authentication/forgot_password",
         InviteFriend: "/api/authentication/send_friend_request",
         CHANGE_PASSWORD_URI: "/api/authentication/change_password",
         LOGOUT_URI: "/api/authentication/logout?",
         TRANSLATION_URI: "/api/authentication/set_translation"
    },
    

    getFirstTimeSurveyQuestions: function(auth_token, successFn, failureFn){
        var me = this,
        url = me.getDOMAIN() + me.getQUESTIONS_LIST_FIRST_TIME_SURVEY_URI() + auth_token,
        success = successFn || Ext.emptyFn,
        failure = failureFn || this.handleFailureCallback;
        Ext.Ajax.request({
            url : url,
            method:'GET',
            timeout: 8000,
            failure: failure,
            success: success
        });
    },

    changePassword: function(data, successFn, failureFn){
      var me = this,
          url = me.getDOMAIN() + me.getCHANGE_PASSWORD_URI(),
          success = successFn || Ext.emptyFn,
          failure = failureFn || this.handleFailureCallback;
      Ext.Ajax.request({
         url : url,
         method:'POST',
         params: data,
         failure: failure,
         success: success
      });
    },

          
    doLogin: function(data, successFn, failureFn){
      var me = this,
          url = me.getDOMAIN() + me.getLOGIN_URI(),
          success = successFn || Ext.emptyFn,
          failure = failureFn || this.handleFailureCallback;
  		Ext.Ajax.request({
  			 url : url,
  			 method:'POST',
  			 params: data,
  			 failure: failure,
  			 success: success
  		});
    },

    doSignup: function(data,successFn, failureFn){
      var me = this,
          url = me.getDOMAIN() + me.getSIGNUP_URI(),
          success = successFn || Ext.emptyFn,
          failure = failureFn || this.handleFailureCallback;
  		Ext.Ajax.request({
  			 url : url,
  			 method:'POST',
  			 jsonData: data,
  			 failure: failure,
  			 success: success
  		});
    },

    inviteFriend: function(data,successFn, failureFn){
      var me = this,
          url = me.getDOMAIN() + me.getInviteFriend(),
          success = successFn || Ext.emptyFn,
          failure = failureFn || this.handleFailureCallback;
      Ext.Ajax.request({
         url : url,
         method:'POST',
         jsonData: data,
         failure: failure,
         success: success
      });
    },


    resetPassword: function(params){
      var me = this,
          url = me.getDOMAIN() + me.getRESET_PASS_URI();
  	 	Ext.Viewport.setMasked({xtype:'loadmask'});
  		Ext.Ajax.request({
  			 url : url,
  			 method:'POST',
  			 params: params,
  			 failure:this.handleFailureCallback,
  			 success:function(res,ths){
  			 	Ext.Viewport.setMasked(false);
  			 	var data = Ext.decode(res.responseText);
  			 	if(data.errors){
  			 		Ext.Msg.alert("Error",data.errors);
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
  			 },
         failure: function(err){
            Ext.Viewport.setMasked(false);
            Ext.Msg.alert(null,err.statusText);
         }
  		});
    },

    doLogout: function(data, successFn, failureFn){
      var me = this,
          url = me.getDOMAIN() + me.getLOGOUT_URI() + "authentication_token=" + data.authentication_token,
          success = successFn || Ext.emptyFn,
          failure = failureFn || this.handleFailureCallback;
  		Ext.Ajax.request({
  			 url : url,
  			 method:'GET',
  			 jsonData: data,
  			 failure: failure,
  			 success: success
  		});
    },

    setTranslationFlag: function(data, successFn, failureFn){
      var me = this,
          url = me.getDOMAIN() + me.getTRANSLATION_URI(),
          success = successFn || Ext.emptyFn,
          failure = failureFn || this.handleFailureCallback;
      Ext.Ajax.request({
         url : url,
         method:'POST',
         jsonData: data,
         failure: failure,
         success: success
      });
    },
    


    handleFailureCallback: function(res){
  	 	Ext.Viewport.setMasked(false);
  	 	console.log(res);
    }
});
