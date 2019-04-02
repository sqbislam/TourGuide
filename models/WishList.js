
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//Create Idea Schema

const WishSchema = new Schema({

	user:{
		type: String,
		required: true
	},

	accom:{
		type: Object
	},
	transport:{
		type: Object
	}

});


//Create Collection and add Schema
mongoose.model('wishList', WishSchema);