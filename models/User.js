const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//Create User Schema

const UserSchema = new Schema({	
	googleID: { 
		type: String, 
		required: true
	},
	email: {
		type: String,
		required: true
	},
	firstName:{
		type: String
	},
	lastName:{
		type: String
	},
	image:{
		type: String
	}
});

//Create Collection and add Schema
mongoose.model('users', UserSchema);