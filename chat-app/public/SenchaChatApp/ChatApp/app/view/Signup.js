Ext.define('ChatApp.view.Signup', {
    extend: 'Ext.Panel',
    xtype: 'signup',
    
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
                title: '<span class="loginTitleLblCls"> Sign up </span>',
                cls: 'loginFormTitlebarCls',
                docked: 'top',
                items: [
                    {
                        cls: 'loginTitleBtnCls',
                        icon: './resources/images/arrow-back-home.png',
                        iconCls: 'loginTitleIconBtnCls',
                        align: 'left',
                        handler: function(){
                            //Ext.Viewport.getActiveItem().animateActiveItem('signin',{type:'slide', direction:'right'});
                            Ext.Viewport.getActiveItem().animateActiveItem('signin',{type:'flip'});
                        }
                    }
                ]
            },
            {
                xtype: 'textfield',
                itemId : 'first_nameId',
                //clearIcon : false,
                cls: 'textFieldLoginCls',
                inputCls: 'textFieldInputLoginCls',
                placeHolder: 'First Name'
            },
            {
                xtype: 'textfield',
                itemId : 'last_nameId',
                //clearIcon : false,
                cls: 'textFieldLoginCls',
                inputCls: 'textFieldInputLoginCls',
                placeHolder: 'Last Name'
            },
            {
                xtype: 'textfield',
                itemId : 'emailId',
                //clearIcon : false,
                cls: 'textFieldLoginCls',
                inputCls: 'textFieldInputLoginCls',
                placeHolder: 'Email'
            },
            {
                xtype: 'passwordfield',
                itemId : 'passwordId',
                //clearIcon : false,
                cls: 'textFieldLoginCls',
                inputCls: 'textFieldInputLoginCls',
                placeHolder: 'Password'
            },
            {
                xtype: 'passwordfield',
                itemId : 'password_confirmationId',
                //clearIcon : false,
                cls: 'textFieldLoginCls',
                inputCls: 'textFieldInputLoginCls',
                placeHolder: 'Confirm Password'
            },
            {
                xtype: 'selectfield',
                itemId : 'lanuageId',
                store: 'Language',
                displayField : 'name',
                valueField : 'code',
                cls: 'textFieldLoginCls',
                inputCls: 'textFieldInputLoginCls',
                usePicker : true
            },
            {
                xtype: 'button',
                text: 'SIGN UP',
                action:'doSignup',
                cls: 'loginBtnClsFirstPage'
            },
            {
                xtype: 'panel',
                docked: 'bottom',
                cls: 'termsTextCls',
                html: 'By clicking <b style="font-family: initial;">Sign Up</b> you are agreeing to the <span class="termsOfUseLinkCls">Terms of use</span> and <span class="termsOfUseLinkCls">Privacy policy</span>',
                listeners: {
                    element: 'element',
                    tap: function(ths, target, ele, obj){
                        if(target.outerText == "Terms of use")
                        {
                            window.open("http://www.w3schools.com", '_blank');
                        }
                        if(target.outerText == "Privacy policy")
                        {
                            window.open("http://www.w3schools.com", '_blank');
                        }
                        
                    }
                }
            }  

        ],
        listeners: {
            painted: function(ths){

            }
        }
        
    },

});
