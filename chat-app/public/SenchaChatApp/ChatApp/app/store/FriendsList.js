Ext.define("ChatApp.store.FriendsList", {
	extend: 'Ext.data.Store',
	config:{
	    storeId: "FriendsList",    
	    model: "ChatApp.model.FriendsList",
	    autoLoad: true,
	/*    data : [
	    	{ image:'./resources/images/user.png',name:'Deep', uid:'1'},
	        { image:'https://smalldesigntools.com/img/category_images/hotel/static.squarespace.jpg',name:'Pinak', uid:'2'},
	        { image:'./resources/images/user.png',name:'Shreya', uid:'3'},
	        { image:'https://smalldesigntools.com/img/category_images/hotel/static.squarespace.jpg',name:'Jinal', uid:'4'},
	        { image:'https://smalldesigntools.com/img/category_images/hotel/static.squarespace.jpg',name:'Nishu', uid:'5'},
	        { image:'https://smalldesigntools.com/img/category_images/hotel/static.squarespace.jpg',name:'Ashish', uid:'6'},
	        { image:'./resources/images/user.png',name:'Aryan', uid:'7'},
	        { image:'https://smalldesigntools.com/img/category_images/hotel/static.squarespace.jpg',name:'Meet', uid:'8'},
	    ] */
	}
});