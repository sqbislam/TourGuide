const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//Create Idea Schema

const TranSchema = new Schema({

	img:{
		type: String
	},

	name:{
		type: String,
		required: true
	},

	category:{
		type: String,
		required: true
	},
	location:{
		type: String,
		required:true
	},
	ticket: [{
		type:{
			type:String
		},
		price:{
			type: Number
		}
	}]

});


//Create Collection and add Schema
mongoose.model('transport', TranSchema);