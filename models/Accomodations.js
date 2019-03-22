const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//Create Idea Schema

const AccomSchema = new Schema({

	name: { type: String, 
		required: true
	},
	city: {
		type: String,
		required: true
	},
	location:{
		type: String,
		required: true
	},
	img:{
		type: String,
		default: "No Image"
	},
	range:{
		type: String,
		default: "Unspecified"
	},

	rooms: [{
		type: {
			type: String,
			required: true
		},
		available: {
			type: Boolean,
			default: true
		},
		image:{
			type: String,
			default: ""
		},
		count:{
			type: String,
			default: "1"
		},
		price:{
			type: String,
			default:"Unspecified"
		}
	}],

	date: {
		type: Date,
		default: Date.now
	}

});


//Create Collection and add Schema
mongoose.model('accom', AccomSchema);