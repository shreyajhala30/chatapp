Ext.define("ChatApp.store.User", {
	extend: 'Ext.data.Store',
	config:{
	    storeId: "User",    
	    model: "ChatApp.model.User"
	}
});