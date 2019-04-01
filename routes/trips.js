const express = require('express');
const router = express.Router();
const {ensureAuthenticated, ensureGuest} = require('../helper/auth')
const mongoose = require('mongoose');

//Load Idea Model
const User = mongoose.model('users');
const Accom = mongoose.model('accom');
const Tran = mongoose.model('transport');

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

// helper method to add busses
router.get('/addT', (req, res) => {
	const newTran= {
		name : "Shohag Paribahan",
		category : "Bus Service",
		location : "chittagong",
		img : "http://www.kemnejabo.com/wp-content/uploads/2018/05/qlze9enqpr6ghaszdk9mrm1rpuglfh4uww3itrke.png",
		ticket: [
			{
				type:"AC",
				price: 700
			},
			{
				type:"Non-AC",
				price: 500
			}]
		}

	//Create Idea
	new Tran(newTran)
	.save()
	.then(tran => {
		console.log(tran);
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
	res.redirect("/");
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


//Get Transport according to location to visit
router.get('/transport',(req, res) => {
	Tran.find({location: req.app.locals.trip.loc})
	.then(tran => {
		console.log(tran);
		res.render("trips/transport", {tran: tran});
	});
})

//Post Transport booker
router.post('/transport',(req, res) => {
	const booking = {
		name : req.body.name,
		location : req.body.location,
		category : req.body.category,
		price: req.body.price
	};
	req.app.locals.trip.transport = booking;
	res.redirect("/");
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


//Add to Wish List
router.get('/addWish', ensureAuthenticated, (req, res)=>{
	const wish = {
		accom: req.app.locals.trip.accom,
		transport: req.app.locals.trip.transport
		
	}


})


module.exports = router;
