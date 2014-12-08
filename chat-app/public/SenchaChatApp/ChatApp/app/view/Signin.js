Ext.define('ChatApp.view.Signin', {
    extend: 'Ext.Panel',
    xtype: 'signin',
    
    config: {
        layout: 'vbox',
        cls: 'signupPageCls',
        scrollable:{
           direction:'vertical',
           directionLock:true
        },
        items: [
            {
                xtype: 'titlebar',
                title: '<span class="loginTitleLblCls"> Log in </span>',
                cls: 'loginFormTitlebarCls',
                docked: 'top',
               /* items: [
                    {
                        cls: 'loginTitleBtnCls',
                        icon: './resources/images/arrow-back-home.png',
                        iconCls: 'loginTitleIconBtnCls',
                        align: 'left',
                        handler: function(){
                            Ext.Viewport.down('login').getActiveItem().animateActiveItem('#formLogin',{type:'flip'});
                        }
                    }
                ] */
            },
            {
                xtype: 'textfield',
                itemId : 'emailIdLogin',
                //clearIcon : false,
                cls: 'textFieldLoginCls',
                inputCls: 'textFieldInputLoginCls',
                //value: 'shahdeep1989@gmail.com',
                placeHolder: 'Email'
            },
            {
                xtype: 'passwordfield',
                itemId : 'passwordIdLogin',
                //clearIcon : false,
                cls: 'textFieldLoginCls',
                inputCls: 'textFieldInputLoginCls',
                //value: 'test1234',
                placeHolder: 'Password'
            },
            {
                xtype: 'button',
                text: 'LOG IN',
                action:'doLogin',
                cls: 'loginBtnClsFirstPage'
            },
            {
                xtype: 'button',
                text: 'Forgot Password',
                cls: 'forgotBtn',
                style: 'font-size:0.8em',
                action: 'resetPassword'
            },
            {
                xtype: 'spacer'
            },
            {
                xtype: 'button',
                text: 'SIGN UP FOR FREE',
                docked: 'bottom',
                cls: 'signUpBtnLoginPageCls',
                handler: function(){
                    //Ext.Viewport.getActiveItem().animateActiveItem('signup',{type:'slide'});
                    Ext.Viewport.getActiveItem().animateActiveItem('signup',{type:'flip'});
                }
            },
            {
                xtype: 'label',
                html: "Don't have a account yet?",
                docked: 'bottom',
                cls: 'loginPageLblCls'
            }
        ],
        listeners: {
            painted: function(ths){

            }
        }
        
    },

});
