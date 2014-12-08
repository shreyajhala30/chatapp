Ext.define("ChatApp.store.Language", {
	extend: 'Ext.data.Store',
	config:{
	    storeId: "Language",    
	    model: "ChatApp.model.Language",
	    data : [
	    	{ name:'English', code:'en'},
	        { name:'French',  code:'fr'},
	        { name:'Spanish', code:'es'},
	        { name:'Hindi',   code:'hi'},
	        { name:'German',  code:'de'},
	        { name:'Italian', code:'it'},
	        { name:'Greek',   code:'el'}
	    ]
	}
});