const express = require('express');
const router = express.Router();
const {ensureAuthenticated, ensureGuest} = require('../helper/auth')
//Bring in mongoose and idea model
const mongoose = require('mongoose');
const Idea = mongoose.model('ideas');


router.get('/', ensureGuest, (req, res) => {

	res.render('index/welcome')
})


router.get('/dashboard',ensureAuthenticated , (req, res) => {
	Idea.find({
		user: req.user.id
	})
	.then(ideas => {
		res.render('index/dashboard', {
			ideas: ideas
		})
	});
});



router.get('/about', (req, res) => {

	res.render('index/about')
})

module.exports = router;
