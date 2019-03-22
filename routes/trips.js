const express = require('express');
const router = express.Router();
const {ensureAuthenticated, ensureGuest} = require('../helper/auth')
const mongoose = require('mongoose');

//Load Idea Model
const User = mongoose.model('users');
const Accom = mongoose.model('accom');

// helper method to add hotels
router.get('/admin', (req, res) => {
	const newAccom = {
		name : "Grand Sultan Tea Resort & Golf",
		city : "sylhet",
		location : "Sreemangal - Bhanugach Rd, Sreemangal 3210",
		img : "http://www.grandsultanresort.com/images/gs_front_fb.jpg",
		range: "15000",
		rooms: [{
			type: "Deluxe",
			available: true,
			image:"https://www.grandsultanresort.com/images/rooms-and-suites/queen-deluxe/slider/1.jpg",
			count:"3",
			price: "22000"
		},
		{
			type: "Twin",
			available: false,
			image:"https://www.grandsultanresort.com/images/rooms-and-suites/king-deluxe/slider/1.jpg",
			count:"3",
			price: "18000"
		},
		{
			type: "Single",
			available: true,
			image:"https://www.grandsultanresort.com/images/home/facilities/home-rooms&suites.jpg",
			count:"2",
			price: "15000"
		}]
	}

	//Create Idea
	new Accom(newAccom)
	.save()
	.then(accom => {
		console.log(accom);
		res.redirect('/')
	})

})



//Find Accomodations for selected city
router.get('/accom',ensureAuthenticated, (req, res) => {
	Accom.find({city: req.app.locals.trip.loc})
	.then(accom => {
		console.log(accom);
		res.render("trips/accom", {accom: accom});
	});
})

//Book new accomodation
router.post('/accom', ensureAuthenticated, (req, res) => {
	const booking = {
		name : req.body.name,
		type : req.body.type,
		id : req.body.id,
		price: req.body.price
	};
	req.app.locals.trip.accom = booking;
	res.redirect("/trips/accom");
})

//Book new accomodation
router.get('/accom/:acc',ensureAuthenticated, (req, res) => {
	let acc = req.params.acc;
	req.app.locals.trip.accom = acc;
	res.redirect("/trips/accom");
})

//Set location
router.get('/loc/:loc', (req, res) =>{
	let loc = req.params.loc;
	req.app.locals.trip.loc = loc;
	res.redirect("/");
})

router.get('/transport',(req, res) => {
	res.render("trips/transport");
})

router.get('/transport/:trn',(req, res) => {
	let trn = req.params.trn;
	req.app.locals.trip.transport = trn;
	res.render("trips/transport");
})

//Show details about hotel
router.get('/accom/show/:id',ensureAuthenticated, (req, res) =>{
	Accom.findOne({_id: req.params.id})
	.then(accom =>{
		res.render("trips/accomDetails", {accom: accom})
	});

})

//confirm booking
router.get('/book',ensureAuthenticated, (req, res) => {
		res.render('trips/book')
})


module.exports = router;
