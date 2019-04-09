const express = require('express');
const router = express.Router();
const {ensureAuthenticated, ensureGuest} = require('../helper/auth')
//Bring in mongoose and idea model
const mongoose = require('mongoose');


const WishList = mongoose.model('wishList');



router.get('/', ensureGuest, (req, res) => {

	res.render('index/welcome')
})


router.get('/dashboard',ensureAuthenticated , (req, res) => {

		res.render('index/dashboard');
});


router.get('/wishlist', ensureAuthenticated, (req, res) => {
	WishList.find({user: req.user.id})
	.then(wish => {
		console.log(wish);
		res.render('index/wishlist', {wish:wish});
	});
});



router.get('/about', (req, res) => {

	res.render('index/about')
})


router.get('/locations', (req, res) => {

	res.render('index/locations');
})



module.exports = router;
